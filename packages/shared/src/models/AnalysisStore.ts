import { makeAutoObservable, runInAction } from 'mobx';
import StockfishEngine, { AnalysisResult } from '../services/StockfishEngine';
import { ChessAPI } from '../services/ChessAPI';
import type { RootStore } from './RootStore';

export interface AnalysisLine {
    depth: number;
    score: number; // in centipawns
    mate?: number; // mate in X moves
    pv: string[]; // principal variation (moves)
    bestMove: string;
}

export class AnalysisStore {
    private engine: StockfishEngine | null = null;
    private rootStore!: RootStore;
    private analysisApi: ChessAPI | null = null;
    private currentFen: string = '';
    public isAnalyzing: boolean = false;
    public isEngineReady: boolean = false;
    public currentLine: AnalysisLine | null = null;
    public depth: number = 0;
    public error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async initialize() {
        try {
            this.engine = new StockfishEngine();
            const success = await this.engine.initialize();
            
            if (success) {
                this.engine.setAnalysisCallback(this.handleAnalysisResult.bind(this));
                runInAction(() => {
                    this.isEngineReady = true;
                    this.error = null;
                });
            } else {
                runInAction(() => {
                    this.error = 'Failed to initialize Stockfish engine';
                });
            }
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Unknown error';
            });
        }
    }

    startAnalysis(fen: string) {
        if (!this.engine || !this.isEngineReady) {
            console.error('Engine not ready');
            return;
        }

        runInAction(() => {
            this.isAnalyzing = true;
            this.currentLine = null;
            this.depth = 0;
            this.currentFen = fen;
            // Create a new ChessAPI instance for analysis from the current position
            this.analysisApi = new ChessAPI();
            this.analysisApi.loadFen(fen);
        });

        this.engine.analyzePosition(fen);
    }

    stopAnalysis() {
        if (this.engine) {
            this.engine.stopAnalysis();
            runInAction(() => {
                this.isAnalyzing = false;
            });
        }
    }

    private handleAnalysisResult(result: AnalysisResult) {
        if (result.type === 'info') {
            this.parseInfoLine(result.line);
        } else if (result.type === 'bestmove') {
            runInAction(() => {
                this.isAnalyzing = false;
            });
        }
    }

    private parseInfoLine(line: string) {
        // Parse UCI info line
        // Example: info depth 20 seldepth 26 multipv 1 score cp 30 nodes 1234567 nps 2345678 time 527 pv e2e4 e7e5 g1f3
        
        const depthMatch = line.match(/depth (\d+)/);
        const scoreMatch = line.match(/score (cp|mate) (-?\d+)/);
        
        // Find the index of 'pv' in the line and extract everything after it
        const pvIndex = line.indexOf(' pv ');
        const moves: string[] = [];
        if (pvIndex !== -1) {
            const pvString = line.substring(pvIndex + 4).trim();
            // Split by spaces and take only valid moves (4+ characters)
            const allTokens = pvString.split(' ');
            for (const token of allTokens) {
                // UCI moves are at least 4 characters (e.g., e2e4)
                if (token.match(/^[a-h][1-8][a-h][1-8][qrbn]?$/)) {
                    moves.push(token);
                } else {
                    // Stop at first non-move token
                    break;
                }
            }
        }
        
        if (depthMatch) {
            const depth = parseInt(depthMatch[1]);
            
            runInAction(() => {
                this.depth = depth;
                
                if (scoreMatch) {
                    const scoreType = scoreMatch[1];
                    const scoreValue = parseInt(scoreMatch[2]);
                    
                    // Update current line even if no PV (keep previous PV if available)
                    if (!this.currentLine || moves.length > 0) {
                        this.currentLine = {
                            depth,
                            score: scoreType === 'cp' ? scoreValue : 0,
                            mate: scoreType === 'mate' ? scoreValue : undefined,
                            pv: moves.length > 0 ? moves : (this.currentLine?.pv || []),
                            bestMove: moves[0] || (this.currentLine?.bestMove || '')
                        };
                    } else {
                        // Update depth and score but keep existing PV
                        this.currentLine = {
                            ...this.currentLine,
                            depth,
                            score: scoreType === 'cp' ? scoreValue : 0,
                            mate: scoreType === 'mate' ? scoreValue : undefined
                        };
                    }
                }
            });
        }
    }

    get evaluation(): string {
        const evalFromBottomPerspective = this.getEvaluationFromBottomPerspective();
        
        if (this.currentLine?.mate !== undefined) {
            return `M${Math.abs(this.currentLine.mate)}`;
        }
        
        return evalFromBottomPerspective >= 0 ? `+${evalFromBottomPerspective.toFixed(2)}` : evalFromBottomPerspective.toFixed(2);
    }

    get evaluationPercent(): number {
        if (!this.currentLine) return 50;
        
        const evalFromBottomPerspective = this.getEvaluationFromBottomPerspective();
        
        if (this.currentLine.mate !== undefined) {
            // For mate, show full advantage
            return evalFromBottomPerspective > 0 ? 100 : 0;
        }
        
        // Convert evaluation to percentage
        // Clamp between -5 and +5 pawns for visualization
        const clampedEval = Math.max(-5, Math.min(5, evalFromBottomPerspective));
        // Convert to 0-100 scale where 50 is equal
        const percent = 50 + (clampedEval * 10);
        return Math.round(percent);
    }

    get principalVariation(): string {
        if (!this.currentLine || this.currentLine.pv.length === 0) {
            return '';
        }
        if (!this.analysisApi) {
            return '';
        }
        
        try {
            // Create a copy of the analysis API to convert moves
            const tempApi = new ChessAPI();
            tempApi.loadFen(this.analysisApi.getFen());
            
            const sanMoves: string[] = [];
            const maxMoves = Math.min(6, this.currentLine.pv.length);
            
            for (let i = 0; i < maxMoves; i++) {
                const uciMove = this.currentLine.pv[i];
                if (uciMove.length >= 4) {
                    const from = uciMove.substring(0, 2);
                    const to = uciMove.substring(2, 4);
                    const promotion = uciMove.length > 4 ? uciMove.substring(4) : undefined;
                    
                    try {
                        // Make the move and get the SAN
                        const move = tempApi.makeLongAlgebraicMove(from, to, promotion as any);
                        if (move) {
                            sanMoves.push(move.san);
                        } else {
                            // If we can't make the move, stop here
                            break;
                        }
                    } catch (error) {
                        // If we can't convert a move, stop here
                        break;
                    }
                }
            }
            
            // If we couldn't convert any moves, show the raw UCI moves
            if (sanMoves.length === 0 && this.currentLine.pv.length > 0) {
                return this.currentLine.pv.slice(0, 5).join(' ');
            }
        
            // Format the moves with move numbers
            // Get the starting move number from the FEN
            const fenParts = this.currentFen.split(' ');
            const startingMoveNum = fenParts.length > 5 ? parseInt(fenParts[5]) : 1;
            const isBlackToMove = fenParts.length > 1 && fenParts[1] === 'b';
            
            let result = '';
            for (let i = 0; i < sanMoves.length; i++) {
                const globalMoveIndex = (isBlackToMove ? 1 : 0) + i;
                const moveNum = startingMoveNum + Math.floor(globalMoveIndex / 2);
                const isWhite = globalMoveIndex % 2 === 0;
                
                if (i === 0 && isBlackToMove) {
                    result += `${moveNum}...${sanMoves[i]} `;
                } else if (isWhite) {
                    result += `${moveNum}.${sanMoves[i]} `;
                } else {
                    result += `${sanMoves[i]} `;
                }
            }
            
            return result.trim();
        } catch (error) {
            // Fallback: show raw UCI moves
            return this.currentLine.pv.slice(0, 5).join(' ');
        }
    }

    private getEvaluationFromBottomPerspective(): number {
        if (!this.currentLine) return 0;
        
        // Get evaluation in pawns (Stockfish gives it from white's perspective)
        let evalInPawns = this.currentLine.score / 100;
        
        if (this.currentLine.mate !== undefined) {
            // For mate, use extreme values
            evalInPawns = this.currentLine.mate > 0 ? 999 : -999;
        }
        
        // Check if board is flipped (black on bottom)
        // Use the GameStore's shouldShowFlippedBoard which correctly handles
        // playing, observing, and examining perspectives
        const isFlipped = this.rootStore?.gameStore?.shouldShowFlippedBoard || false;
        
        // If black is on bottom, negate the evaluation
        if (isFlipped) {
            evalInPawns = -evalInPawns;
        }
        
        return evalInPawns;
    }
    
    get isBottomPlayerWinning(): boolean {
        return this.getEvaluationFromBottomPerspective() > 0;
    }
    
    dispose() {
        this.stopAnalysis();
        this.engine = null;
    }
}
import {makeAutoObservable, runInAction} from 'mobx';
import {ChessAPI, Color, Variant, GameResult, Move} from '../services/ChessAPI';

// Forward declaration to avoid circular dependency
interface RootStore {
    ficsStore: any;
}

export interface Player {
    name: string;
    rating: number;
    time: number; // in seconds
}

export interface GameState {
    gameId: number;
    white: Player;
    black: Player;
    turn: 'w' | 'b';
    moveNumber: number;
    lastMove?: string;
    result?: string;
    variant: 'standard' | 'chess960' | 'losers' | 'suicide' | 'atomic' | 'crazyhouse' | 'wild';
    timeControl?: string;
}

export class GameStore {
    currentGame: GameState | null = null;
    chessBoard: ChessAPI;
    moveHistory: Move[] = [];
    isAnalyzing = false;
    evaluation: { score: number; depth: number; pv: string } | null = null;
    rootStore?: RootStore;
    private _position: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    constructor() {
        makeAutoObservable(this);
        this.chessBoard = new ChessAPI();
        this._position = this.chessBoard.getFen();
    }

    startNewGame(gameState: GameState, fen?: string) {
        this.currentGame = gameState;
        this.moveHistory = [];
        this.evaluation = null;

        // Convert variant string to enum
        const variant = this.getVariantFromString(gameState.variant);

        if (fen) {
            this.chessBoard = new ChessAPI(variant, fen);
        } else {
            this.chessBoard = new ChessAPI(variant);
        }
        
        runInAction(() => {
            this._position = this.chessBoard.getFen();
        });
    }

    private getVariantFromString(variantStr: string): Variant {
        switch (variantStr) {
            case 'chess960':
                return Variant.CHESS960;
            case 'losers':
                return Variant.LOSERS;
            case 'suicide':
                return Variant.SUICIDE;
            case 'atomic':
                return Variant.ATOMIC;
            case 'crazyhouse':
                return Variant.CRAZYHOUSE;
            case 'wild':
                return Variant.FREESTYLE;
            default:
                return Variant.CLASSIC;
        }
    }

    makeMove(from: string, to: string, promotion?: string) {
        try {
            const move = this.chessBoard.makeLongAlgebraicMove(from, to, promotion as any);
            if (move) {
                runInAction(() => {
                    this.moveHistory.push(move);
                    if (this.currentGame) {
                        this.currentGame.lastMove = move.san;
                        this.currentGame.turn = this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b';
                    }
                    // Update the observable position
                    this._position = this.chessBoard.getFen();
                });

                // Send move to FICS if connected
                this.rootStore?.ficsStore.sendCommand(from + to + (promotion || ''));
                return true;
            }
        } catch (error) {
            console.error('Invalid move:', error);
        }
        return false;
    }

    makeSANMove(san: string) {
        try {
            const move = this.chessBoard.makeMove(san);
            if (move) {
                runInAction(() => {
                    this.moveHistory.push(move);
                    if (this.currentGame) {
                        this.currentGame.lastMove = move.san;
                        this.currentGame.turn = this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b';
                    }
                });
                return true;
            }
        } catch (error) {
            console.error('Invalid move:', error);
        }
        return false;
    }

    updateFromStyle12(style12Data: any) {
        runInAction(() => {
            // Parse Style12 format: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b -1 1 0 1 0 0 1 none (0:00) none 1 0 0 39 39 600 600 1 K/k -1
            const parts = style12Data.split(' ');
            if (parts.length >= 26) {
                const fen = parts.slice(0, 6).join(' ');
                try {
                    this.chessBoard.loadFen(fen);

                    // Update game state from style12
                    if (this.currentGame) {
                        this.currentGame.turn = parts[1] === 'w' ? 'w' : 'b';
                        this.currentGame.moveNumber = parseInt(parts[5]) || 1;

                        // Times are at positions 16 and 17 in Style12 format
                        const whiteTime = parseInt(parts[16]) || 0;
                        const blackTime = parseInt(parts[17]) || 0;
                        this.currentGame.white.time = whiteTime;
                        this.currentGame.black.time = blackTime;
                    }
                } catch (error) {
                    console.error('Failed to parse Style12 data:', error);
                }
            }
        });
    }

    setEvaluation(evaluation: { score: number; depth: number; pv: string }) {
        runInAction(() => {
            this.evaluation = evaluation;
        });
    }

    loadPosition(fen: string): boolean {
        try {
            const isValid = this.chessBoard.loadFen(fen);
            if (isValid) {
                runInAction(() => {
                    // Clear move history when loading a new position
                    this.moveHistory = [];
                    // Create a freestyle game for custom positions
                    this.currentGame = {
                        gameId: -1,
                        white: { name: 'White', rating: 0, time: 0 },
                        black: { name: 'Black', rating: 0, time: 0 },
                        turn: this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b',
                        moveNumber: 1,
                        lastMove: undefined,
                        result: undefined,
                        variant: 'standard'
                    };
                    // Update the observable position
                    this._position = this.chessBoard.getFen();
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to load FEN:', error);
            return false;
        }
    }

    toggleAnalysis() {
        runInAction(() => {
            this.isAnalyzing = !this.isAnalyzing;
        });
    }

    get fen() {
        return this.chessBoard.getFen();
    }
    
    get currentPosition() {
        return this._position;
    }
    
    get lastMove() {
        if (this.moveHistory.length === 0) return null;
        const move = this.moveHistory[this.moveHistory.length - 1];
        return {
            from: move.from,
            to: move.to
        };
    }
    
    get currentGameInfo() {
        if (!this.currentGame) return null;
        return {
            white: this.currentGame.white,
            black: this.currentGame.black,
            timeControl: this.currentGame.timeControl || '?',
            variant: this.currentGame.variant
        };
    }

    get pgn() {
        // Convert move history to PGN format
        return this.moveHistory.map(move => move.san).join(' ');
    }

    get legalMoves() {
        return this.chessBoard.getLegalMoves();
    }

    get isGameOver() {
        return this.chessBoard.isGameOver();
    }

    get gameResult() {
        return this.chessBoard.getGameResult();
    }

    get isInCheck() {
        return this.chessBoard.isInCheck();
    }

    getPiece(square: string) {
        return this.chessBoard.getPiece(square);
    }

    getLegalMovesForSquare(square: string) {
        return this.chessBoard.getLegalMoves(square);
    }
}
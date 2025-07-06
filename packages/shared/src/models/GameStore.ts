import {makeAutoObservable, runInAction, computed} from 'mobx';
import {ChessAPI, Color, Variant, GameResult, Move} from '../services/ChessAPI';
import {Style12} from '../services/FicsProtocol.types';
import {style12ToFen} from '../utils/utils';

// Forward declaration to avoid circular dependency
interface RootStore {
    ficsStore: any;
    preferencesStore?: any;
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
    currentMoveIndex: number = -1; // -1 means at start position
    isAnalyzing = false;
    evaluation: { score: number; depth: number; pv: string } | null = null;
    rootStore?: RootStore;
    private _position: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    private _capturedPieces: { white: string[]; black: string[] } = { white: [], black: [] };
    private _positionHistory: string[] = []; // Store FEN for each position
    
    // Game perspective properties
    gameRelation: number = 0; // -3: isolated, -2: observing examined, -1: playing opponent turn, 0: observing, 1: playing my turn, 2: examining
    shouldFlipBoard: boolean = false; // From style12 flipBoard field

    constructor() {
        makeAutoObservable(this);
        this.chessBoard = new ChessAPI();
        this._position = this.chessBoard.getFen();
        this._positionHistory = [this._position];
    }

    startNewGame(gameState: GameState, fen?: string) {
        this.currentGame = gameState;
        this.moveHistory = [];
        this.currentMoveIndex = -1;
        this.evaluation = null;
        this._capturedPieces = { white: [], black: [] };

        // Convert variant string to enum
        const variant = this.getVariantFromString(gameState.variant);

        if (fen) {
            this.chessBoard = new ChessAPI(variant, fen);
        } else {
            this.chessBoard = new ChessAPI(variant);
        }
        
        runInAction(() => {
            this._position = this.chessBoard.getFen();
            this._positionHistory = [this._position];
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
                    this.currentMoveIndex = this.moveHistory.length - 1;
                    if (this.currentGame) {
                        this.currentGame.lastMove = move.san;
                        this.currentGame.turn = this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b';
                    }
                    // Update the observable position
                    this._position = this.chessBoard.getFen();
                    this._positionHistory.push(this._position);
                    // Update captured pieces
                    this.updateCapturedPieces();
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
                    this.currentMoveIndex = this.moveHistory.length - 1;
                    if (this.currentGame) {
                        this.currentGame.lastMove = move.san;
                        this.currentGame.turn = this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b';
                    }
                    // Update the observable position
                    this._position = this.chessBoard.getFen();
                    this._positionHistory.push(this._position);
                    // Update captured pieces
                    this.updateCapturedPieces();
                });
                return true;
            }
        } catch (error) {
            console.error('Invalid move:', error);
        }
        return false;
    }

    updateFromStyle12(style12: Style12) {
        runInAction(() => {
            try {
                // Convert Style12 board array to string format for style12ToFen
                // Style12 board is already in the correct format (8x8 array of strings)
                const boardRows = style12.board.map(row => row.join(''));
                
                // Create a mock style12 string with the required format
                const mockStyle12Line = '<12> ' + boardRows.join(' ') + ' ' +
                    style12.colorToMove + ' ' +
                    (style12.enPassantSquare === '-' ? '-1' : 
                        (style12.enPassantSquare.charCodeAt(0) - 97)) + ' ' +
                    (style12.castlingRights.includes('K') ? '1' : '0') + ' ' +
                    (style12.castlingRights.includes('Q') ? '1' : '0') + ' ' +
                    (style12.castlingRights.includes('k') ? '1' : '0') + ' ' +
                    (style12.castlingRights.includes('q') ? '1' : '0') + ' ' +
                    style12.halfMoveClock + ' ' +
                    style12.gameNumber + ' ' +
                    style12.whiteName + ' ' +
                    style12.blackName + ' ' +
                    style12.relation + ' ' +
                    style12.initialTime + ' ' +
                    style12.incrementTime + ' ' +
                    style12.whiteMaterialStrength + ' ' +
                    style12.blackMaterialStrength + ' ' +
                    style12.whiteTimeRemaining + ' ' +
                    style12.blackTimeRemaining + ' ' +
                    style12.moveNumber + ' ' +
                    style12.verboseMove + ' ' +
                    style12.timeTaken + ' ' +
                    style12.prettyMove + ' ' +
                    (style12.flipBoard ? '1' : '0');
                
                // Convert to FEN using the utility
                const fen = style12ToFen(mockStyle12Line);
                
                // Load the position
                this.chessBoard.loadFen(fen);

                // Update or create game state
                if (!this.currentGame || this.currentGame.gameId !== style12.gameNumber) {
                    // New game or joining mid-game
                    this.currentGame = {
                        gameId: style12.gameNumber,
                        white: { 
                            name: style12.whiteName, 
                            rating: 0, // Will be updated from game start
                            time: style12.whiteTimeRemaining 
                        },
                        black: { 
                            name: style12.blackName, 
                            rating: 0, // Will be updated from game start
                            time: style12.blackTimeRemaining 
                        },
                        turn: style12.colorToMove.toLowerCase() as 'w' | 'b',
                        moveNumber: style12.moveNumber,
                        lastMove: style12.prettyMove !== 'none' ? style12.prettyMove : undefined,
                        variant: 'standard', // Will be updated from game start
                        timeControl: `${style12.initialTime/60} ${style12.incrementTime}`
                    };
                } else {
                    // Update existing game
                    this.currentGame.turn = style12.colorToMove.toLowerCase() as 'w' | 'b';
                    this.currentGame.moveNumber = style12.moveNumber;
                    this.currentGame.white.time = style12.whiteTimeRemaining;
                    this.currentGame.black.time = style12.blackTimeRemaining;
                    
                    // Apply the move if there is one
                    if (style12.prettyMove !== 'none' && style12.verboseMove !== 'none') {
                        this.currentGame.lastMove = style12.prettyMove;
                        
                        // Add move to history if it's not already there
                        // This handles mid-game joins where we get a style12 with a move
                        const lastHistoryMove = this.moveHistory[this.moveHistory.length - 1];
                        if (!lastHistoryMove || lastHistoryMove.san !== style12.prettyMove) {
                            // Create a move object from the style12 data
                            const move: Move = {
                                from: style12.verboseMove.includes('/') ? 
                                    style12.verboseMove.split('/')[1].split('-')[0] : '',
                                to: style12.verboseMove.includes('/') ? 
                                    style12.verboseMove.split('/')[1].split('-')[1] : '',
                                san: style12.prettyMove,
                                piece: null, // Will be filled by ChessAPI
                                color: style12.colorToMove === 'W' ? Color.BLACK : Color.WHITE, // Previous move color
                                flags: 0,
                                captured: null,
                                promotion: null
                            };
                            this.moveHistory.push(move);
                            this.currentMoveIndex = this.moveHistory.length - 1;
                        }
                    }
                }
                
                // Update position
                this._position = this.chessBoard.getFen();
                
                // If this is a new position, add it to history
                if (this._positionHistory[this._positionHistory.length - 1] !== this._position) {
                    this._positionHistory.push(this._position);
                }
                
                // Update captured pieces
                this.updateCapturedPieces();
                
                // Store the relation for game perspective
                // relation values:
                // -3: isolated position
                // -2: observing examined game  
                // -1: playing, opponent's turn
                //  0: observing a game
                //  1: playing, my turn
                //  2: examining a game
                this.gameRelation = style12.relation;
                this.shouldFlipBoard = style12.flipBoard;
                
            } catch (error) {
                console.error('Failed to parse Style12 data:', error);
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
                    this.currentMoveIndex = -1;
                    this._positionHistory = [this.chessBoard.getFen()];
                    // Reset captured pieces
                    this._capturedPieces = { white: [], black: [] };
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

    get capturedPieces() {
        return this._capturedPieces;
    }
    
    private updateCapturedPieces() {
        this._capturedPieces = {
            white: this.chessBoard.getCapturedPieces(Color.WHITE),
            black: this.chessBoard.getCapturedPieces(Color.BLACK)
        };
        console.log('Updated captured pieces:', this._capturedPieces);
    }
    
    get lastMove() {
        if (this.moveHistory.length === 0) return null;
        const move = this.moveHistory[this.moveHistory.length - 1];
        return {
            from: move.from,
            to: move.to
        };
    }

    goToMove(index: number) {
        // Allow -1 for starting position, but no lower
        const targetIndex = Math.max(-1, Math.min(index, this.moveHistory.length - 1));
        
        // Don't allow going before start if there are no moves
        if (this.moveHistory.length === 0 && targetIndex < 0) {
            return;
        }
        
        runInAction(() => {
            this.currentMoveIndex = targetIndex;
            
            // Load the position at this move index
            if (targetIndex === -1) {
                // Go to starting position
                this._position = this._positionHistory[0];
            } else {
                // Go to position after move at targetIndex
                this._position = this._positionHistory[targetIndex + 1];
            }
            
            // Load the position into ChessAPI
            this.chessBoard.loadFen(this._position);
            
            // Update captured pieces based on position
            this.updateCapturedPieces();
            
            // Update turn in game state
            if (this.currentGame) {
                this.currentGame.turn = this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b';
            }
        });
    }

    goToStart() {
        // If no moves have been made, stay at current position
        if (this.moveHistory.length === 0) {
            return;
        }
        this.goToMove(-1);
    }

    goToEnd() {
        this.goToMove(this.moveHistory.length - 1);
    }

    goToPreviousMove() {
        this.goToMove(this.currentMoveIndex - 1);
    }

    goToNextMove() {
        this.goToMove(this.currentMoveIndex + 1);
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
    
    // Game perspective computed properties
    get isPlaying(): boolean {
        return this.gameRelation === -1 || this.gameRelation === 1;
    }
    
    get isMyTurn(): boolean {
        return this.gameRelation === 1;
    }
    
    get isObserving(): boolean {
        return this.gameRelation === 0 || this.gameRelation === -2;
    }
    
    get isExamining(): boolean {
        return this.gameRelation === 2;
    }
    
    get playingColor(): 'white' | 'black' | null {
        if (!this.isPlaying) return null;
        if (!this.currentGame) return null;
        
        // If it's my turn (relation = 1), I'm the color whose turn it is
        // If it's opponent's turn (relation = -1), I'm the opposite color
        if (this.gameRelation === 1) {
            return this.currentGame.turn === 'w' ? 'white' : 'black';
        } else {
            return this.currentGame.turn === 'w' ? 'black' : 'white';
        }
    }
    
    // Determine if board should be flipped based on game perspective
    get shouldShowFlippedBoard(): boolean {
        // First check if there's a manual override from PreferencesStore
        const preferencesFlipped = this.rootStore?.preferencesStore?.boardFlipped;
        if (preferencesFlipped !== undefined) {
            return preferencesFlipped;
        }
        
        // If playing as black, flip the board
        if (this.playingColor === 'black') {
            return true;
        }
        
        // If observing, use the style12 flipBoard field
        if (this.isObserving || this.isExamining) {
            return this.shouldFlipBoard;
        }
        
        // Default: white at bottom
        return false;
    }
}
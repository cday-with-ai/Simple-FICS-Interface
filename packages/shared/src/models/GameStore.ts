import {makeAutoObservable, runInAction, computed, action, observable} from 'mobx';
import {ChessAPI, Color, Variant, GameResult, Move} from '../services/ChessAPI';
import {Style12} from '../services/FicsProtocol.types';
import {style12ToFen} from '../utils/utils';
import {lookupFromMoveList, lookupFromFEN} from '../services/Eco';

// Forward declaration to avoid circular dependency
interface RootStore {
    ficsStore: any;
    preferencesStore?: any;
    soundStore?: any;
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
    lastGameState: GameState | null = null; // Preserve last game state for freestyle mode
    chessBoard: ChessAPI;
    moveHistory: Move[] = [];
    currentMoveIndex: number = -1; // -1 means at start position
    isAnalyzing = false;
    evaluation: { score: number; depth: number; pv: string } | null = null;
    rootStore?: RootStore;
    _position: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    _capturedPieces: { white: string[]; black: string[] } = { white: [], black: [] };
    private _positionHistory: string[] = []; // Store FEN for each position
    private _lastKnownOpening: string | null = null; // Store the last matched opening
    isProcessingServerUpdate = false; // Flag to indicate we're processing a Style12 update
    
    // Holdings for bughouse/crazyhouse variants
    whiteHoldings: string = '';
    blackHoldings: string = '';
    
    // Premove state
    premove: { from: string; to: string; promotion?: string } | null = null;
    
    // Game perspective properties
    gameRelation: number = 0; // -3: isolated, -2: observing examined, -1: playing opponent turn, 0: observing, 1: playing my turn, 2: examining
    shouldFlipBoard: boolean = false; // From style12 flipBoard field
    private _playingColor: 'white' | 'black' | null = null; // Cache player's color when game starts
    private _lastBoardOrientation: boolean | null = null; // Cache the board orientation to preserve it after game ends
    
    // Clock management
    private clockInterval: NodeJS.Timeout | null = null;
    private lastClockUpdate: number = Date.now();
    private baseWhiteTime: number = 0;
    private baseBlackTime: number = 0;

    constructor() {
        makeAutoObservable(this, {
            chessBoard: false, // Don't make ChessAPI observable
            rootStore: false
        });
        this.chessBoard = new ChessAPI();
        this._position = this.chessBoard.getFen();
        this._positionHistory = [this._position];
    }

    startNewGame(gameState: GameState, fen?: string) {
        // Don't reset the board if we already have a game with this ID and a non-starting position
        if (this.currentGame?.gameId === gameState.gameId && 
            this._position !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
            // Just update game metadata
            this.currentGame = { ...this.currentGame, ...gameState };
            return;
        }
        
        // Check if this is transitioning to freestyle mode (gameId -1 means freestyle)
        const isTransitioningToFreestyle = gameState.gameId === -1;
        
        this.currentGame = gameState;
        this.lastGameState = null; // Clear last game state when starting a new game
        this.moveHistory = [];
        this.currentMoveIndex = -1;
        this.evaluation = null;
        this._capturedPieces = { white: [], black: [] };
        this._lastKnownOpening = null;
        this._playingColor = null; // Reset playing color
        
        // Only reset board orientation when starting a real game (not freestyle)
        // This way:
        // - When transitioning to freestyle after a game: orientation is preserved
        // - When starting a new real game: orientation resets so you're on the correct side
        if (gameState.gameId > 0) {
            this._lastBoardOrientation = null; // Reset for real games
        }
        this.whiteHoldings = ''; // Reset holdings for new game
        this.blackHoldings = ''; // Reset holdings for new game

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
            // First check if the move would be a capture (before making it)
            const targetSquare = this.chessBoard.getPiece(to);
            const isCapture = targetSquare !== null;
            
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
                    
                    // Play move sound - check if it's a capture
                    if (move.san.includes('x')) {
                        this.rootStore?.soundStore?.playCapture();
                    } else {
                        this.rootStore?.soundStore?.playMove();
                    }
                });

                // Send move to FICS if connected
                this.rootStore?.ficsStore.sendCommand(from + to + (promotion || ''));
                return true;
            } else {
                // Move failed - if it was an attempted capture, we need to play illegal sound
                // This will be handled by the caller (ChessGameLayout)
                return false;
            }
        } catch (error) {
            console.error('Invalid move:', error);
            return false;
        }
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
                    
                    // Play move sound - check if it's a capture
                    if (move.san.includes('x')) {
                        this.rootStore?.soundStore?.playCapture();
                    } else {
                        this.rootStore?.soundStore?.playMove();
                    }
                });
                return true;
            }
        } catch (error) {
            console.error('Invalid move:', error);
        }
        return false;
    }

    updateFromStyle12(style12: Style12, pendingMetadata?: { whiteRating: number; blackRating: number; variant: string }) {
        runInAction(() => {
            // Don't process Style12 updates if we just ended this game
            if (this.lastGameState && this.lastGameState.gameId === style12.gameNumber && !this.currentGame) {
                console.log('[GameStore] Ignoring Style12 for recently ended game:', style12.gameNumber);
                return;
            }
            
            try {
                console.log('[GameStore] Processing Style12 move:', {
                    move: style12.prettyMove,
                    relation: style12.relation,
                    verboseMove: style12.verboseMove,
                    turn: style12.colorToMove,
                    gameNumber: style12.gameNumber,
                    pendingMetadata
                });
                
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
                
                // Store the old position for comparison
                const oldPosition = this._position;
                
                // Load the position
                const loadSuccess = this.chessBoard.loadFen(fen);

                // Update or create game state
                if (!this.currentGame || this.currentGame.gameId !== style12.gameNumber) {
                    // Track if we had a previous game to avoid playing start sound on game switches
                    const hadPreviousGame = !!this.currentGame;
                    
                    // New game or joining mid-game - clear move history from previous game
                    this.moveHistory = [];
                    this.currentMoveIndex = -1;
                    
                    // Check if this is the start of a new game (move 1, no previous move)
                    const isNewGameStart = style12.moveNumber === 1 && style12.prettyMove === 'none';
                    
                    // Check if we're observing (relation 0 or -2)
                    const isObserving = style12.relation === 0 || style12.relation === -2;
                    
                    this.currentGame = {
                        gameId: style12.gameNumber,
                        white: { 
                            name: style12.whiteName, 
                            rating: pendingMetadata?.whiteRating || 0,
                            time: style12.whiteTimeRemaining 
                        },
                        black: { 
                            name: style12.blackName, 
                            rating: pendingMetadata?.blackRating || 0,
                            time: style12.blackTimeRemaining 
                        },
                        turn: style12.colorToMove.toLowerCase() as 'w' | 'b',
                        moveNumber: style12.moveNumber,
                        lastMove: style12.prettyMove !== 'none' ? style12.prettyMove : undefined,
                        variant: (pendingMetadata?.variant || 'standard') as GameState['variant'],
                        timeControl: `${style12.initialTime} ${style12.incrementTime}`
                    };
                    
                    // Initialize clock base times
                    this.baseWhiteTime = style12.whiteTimeRemaining;
                    this.baseBlackTime = style12.blackTimeRemaining;
                    this.lastClockUpdate = Date.now();
                    
                    // Play start sound for:
                    // 1. New games starting (move 1, no previous move)
                    // 2. When starting to observe any game (but not when switching from another game)
                    if ((isNewGameStart || (isObserving && !hadPreviousGame)) && this.rootStore?.soundStore) {
                        console.log('[GameStore] Playing game start sound', { 
                            isNewGameStart, 
                            isObserving, 
                            hadPreviousGame,
                            gameId: style12.gameNumber 
                        });
                        this.rootStore.soundStore.playStart();
                    }
                } else {
                    // Update existing game
                    this.currentGame.turn = style12.colorToMove.toLowerCase() as 'w' | 'b';
                    this.currentGame.moveNumber = style12.moveNumber;
                    this.currentGame.white.time = style12.whiteTimeRemaining;
                    this.currentGame.black.time = style12.blackTimeRemaining;
                    
                    // Update clock base times
                    this.baseWhiteTime = style12.whiteTimeRemaining;
                    this.baseBlackTime = style12.blackTimeRemaining;
                    this.lastClockUpdate = Date.now();
                    
                    // Apply the move if there is one
                    if (style12.prettyMove !== 'none' && style12.verboseMove !== 'none') {
                        this.currentGame.lastMove = style12.prettyMove;
                        
                        // Add move to history if it's not already there
                        // This handles mid-game joins where we get a style12 with a move
                        const lastHistoryMove = this.moveHistory[this.moveHistory.length - 1];
                        if (!lastHistoryMove || lastHistoryMove.san !== style12.prettyMove) {
                            console.log('[GameStore] Processing Style12 move:', {
                                move: style12.prettyMove,
                                relation: style12.relation,
                                verboseMove: style12.verboseMove,
                                turn: style12.colorToMove,
                                lastMove: lastHistoryMove?.san || 'none'
                            });
                            
                            // Prevent animations for:
                            // 1. Opponent moves when playing (relation = -1)
                            // 2. All moves when observing (relation = 0 or -2)
                            // Our own moves (relation = 1) already handled by user interaction
                            if (style12.relation !== 1) {
                                this.isProcessingServerUpdate = true;
                            }
                            // Create a move object from the style12 data
                            // verboseMove format is like "P/g2-g3" or "o-o" for castling
                            let from = '';
                            let to = '';
                            
                            if (style12.verboseMove.includes('/')) {
                                const parts = style12.verboseMove.split('/');
                                if (parts[1] && parts[1].includes('-')) {
                                    const moveParts = parts[1].split('-');
                                    from = moveParts[0];
                                    to = moveParts[1];
                                }
                            }
                                
                            const move = new Move(
                                style12.prettyMove,
                                from,
                                to
                            );
                            this.moveHistory.push(move);
                            this.currentMoveIndex = this.moveHistory.length - 1;
                            // Move added to history
                            
                            // Determine who made this move based on:
                            // 1. The current turn (after the move)
                            // 2. Who would have moved to reach this position
                            const moveWasMadeByWhite = style12.colorToMove === 'B'; // If it's Black's turn, White just moved
                            const iAmWhite = (this.isPlaying && this._playingColor === 'white') || 
                                           (!this._playingColor && style12.whiteName === 'GuestFCDC'); // Fallback check
                            const moveWasMadeByMe = (moveWasMadeByWhite && iAmWhite) || (!moveWasMadeByWhite && !iAmWhite);
                            
                            console.log('[GameStore] Move analysis:', {
                                move: style12.prettyMove,
                                relation: style12.relation,
                                colorToMove: style12.colorToMove,
                                moveWasMadeByWhite,
                                iAmWhite,
                                moveWasMadeByMe,
                                playingColor: this._playingColor
                            });
                            
                            // Play sound for opponent moves or when observing
                            // Skip for our own moves (they already played in makeMove())
                            if (!moveWasMadeByMe || style12.relation === 0 || style12.relation === -2) {
                                console.log('[GameStore] Playing sound for opponent/observed move');
                                // Add a small delay to ensure opponent sounds are audible
                                // This helps when moves happen in rapid succession
                                setTimeout(() => {
                                    if (style12.prettyMove.includes('x')) {
                                        this.rootStore?.soundStore?.playSound('capture', 0.7);
                                    } else {
                                        this.rootStore?.soundStore?.playSound('move', 0.7);
                                    }
                                }, 100);
                            } else {
                                console.log('[GameStore] Skipping sound for own move');
                            }
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
                
                // Turn off analysis when switching to playing mode
                if (this.isPlaying && this.isAnalyzing) {
                    this.isAnalyzing = false;
                }
                
                // Cache playing color on first move when playing
                if (this.isPlaying && this._playingColor === null) {
                    // Determine color based on relation and whose turn it is
                    if (style12.relation === 1) {
                        this._playingColor = style12.colorToMove === 'W' ? 'white' : 'black';
                    } else if (style12.relation === -1) {
                        this._playingColor = style12.colorToMove === 'W' ? 'black' : 'white';
                    }
                }
                
                // Update holdings for bughouse/crazyhouse variants
                if (style12.whiteHoldings !== undefined) {
                    this.whiteHoldings = style12.whiteHoldings;
                }
                if (style12.blackHoldings !== undefined) {
                    this.blackHoldings = style12.blackHoldings;
                }
                
                // Start or restart clock
                this.startClock();
                
                // Execute premove if it's now my turn
                if (this.isMyTurn && this.premove) {
                    // Add a small delay to ensure the board state is updated
                    setTimeout(() => {
                        this.executePremove();
                    }, 100);
                }
                
            } catch (error) {
                console.error('Failed to parse Style12 data:', error);
                this.isProcessingServerUpdate = false;
            }
        });
        
        // Reset the flag after a small delay to ensure React components see the change
        if (this.isProcessingServerUpdate) {
            setTimeout(() => {
                runInAction(() => {
                    this.isProcessingServerUpdate = false;
                });
            }, 50);
        }
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
                    // Reset opening
                    this._lastKnownOpening = null;
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
        // Force MobX to track this as a dependency
        const pos = this._position;
        return pos;
    }

    get capturedPieces() {
        return this._capturedPieces;
    }
    
    private updateCapturedPieces() {
        runInAction(() => {
            this._capturedPieces = {
                white: this.chessBoard.getCapturedPieces(Color.WHITE),
                black: this.chessBoard.getCapturedPieces(Color.BLACK)
            };
        });
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
    
    get currentOpening(): string | null {
        if (this.moveHistory.length === 0) return null;
        
        // Only check up to the current move index when browsing history
        const movesToCheck = this.currentMoveIndex >= 0 
            ? this.moveHistory.slice(0, this.currentMoveIndex + 1)
            : this.moveHistory;
        
        // Build move list string in the format ECO expects: "1. e4 e5 2. Nf3 Nc6"
        let moveStr = '';
        for (let i = 0; i < movesToCheck.length; i++) {
            if (i % 2 === 0) {
                // White's move
                moveStr += `${Math.floor(i / 2) + 1}. ${movesToCheck[i].san}`;
            } else {
                // Black's move
                moveStr += ` ${movesToCheck[i].san}`;
            }
            if (i < movesToCheck.length - 1) {
                moveStr += ' ';
            }
        }
        
        // Try to find opening by move list first
        const opening = lookupFromMoveList(moveStr);
        if (opening) {
            this._lastKnownOpening = opening;
            return opening;
        }
        
        // If not found by moves, try by FEN position
        const fenOpening = lookupFromFEN(this._position);
        if (fenOpening && fenOpening !== 'Unknown opening') {
            this._lastKnownOpening = fenOpening;
            return fenOpening;
        }
        
        // Return the last known opening if no current match
        return this._lastKnownOpening;
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
        // Return cached color if available
        if (this._playingColor !== null) {
            return this._playingColor;
        }
        if (!this.currentGame) return null;
        
        // Fallback calculation if color not cached yet
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
        let orientation: boolean;
        
        // For playing perspective, always put player's pieces at bottom by default
        if (this.isPlaying) {
            const color = this.playingColor;
            const baseFlip = color === 'black';
            // When playing, always use the base flip (black at bottom, white at bottom)
            // Ignore manual preferences during active games
            orientation = baseFlip;
            
            console.log('[GameStore] Board orientation calculation:', {
                isPlaying: this.isPlaying,
                playingColor: color,
                baseFlip,
                orientation,
                gameRelation: this.gameRelation,
                currentGame: this.currentGame?.gameId
            });
            
            // Cache the orientation while in a game
            runInAction(() => {
                this._lastBoardOrientation = orientation;
            });
            return orientation;
        }
        
        // In freestyle mode, always use manual preference
        // This allows the flip button to work in freestyle mode
        if (!this.currentGame || this.currentGame.gameId === -1) {
            const preferencesFlipped = this.rootStore?.preferencesStore?.preferences.boardFlipped;
            if (preferencesFlipped !== undefined) {
                return preferencesFlipped;
            }
        }
        
        // For other non-playing modes, use cached orientation if available
        if (this._lastBoardOrientation !== null) {
            return this._lastBoardOrientation;
        }
        
        // Otherwise check manual preference
        const preferencesFlipped = this.rootStore?.preferencesStore?.preferences.boardFlipped;
        if (preferencesFlipped !== undefined) {
            return preferencesFlipped;
        }
        
        // If observing or examining, use the style12 flipBoard field
        if (this.isObserving || this.isExamining) {
            return this.shouldFlipBoard;
        }
        
        // Default: white at bottom
        return false;
    }
    
    // Clock management methods
    private startClock() {
        // Clear any existing interval
        this.stopClock();
        
        // Don't start clock in examine mode
        if (this.isExamining) {
            return;
        }
        
        // Only start clock if we have an active game
        if (this.currentGame && this.currentGame.gameId > 0) {
            this.clockInterval = setInterval(() => {
                runInAction(() => {
                    this.updateClocks();
                });
            }, 100); // Update every 100ms for smooth display
        }
    }
    
    private stopClock() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    }
    
    private updateClocks() {
        if (!this.currentGame) return;
        
        const now = Date.now();
        const elapsed = (now - this.lastClockUpdate) / 1000; // Convert to seconds
        
        // Update the active player's clock
        if (this.currentGame.turn === 'w') {
            this.currentGame.white.time = Math.max(0, this.baseWhiteTime - elapsed);
        } else {
            this.currentGame.black.time = Math.max(0, this.baseBlackTime - elapsed);
        }
        
    }
    
    // Computed property for live clock times
    get liveClocks() {
        if (!this.currentGame) return { white: 0, black: 0 };
        
        const now = Date.now();
        const elapsed = (now - this.lastClockUpdate) / 1000;
        
        return {
            white: this.currentGame.turn === 'w' 
                ? Math.max(0, this.baseWhiteTime - elapsed)
                : this.baseWhiteTime,
            black: this.currentGame.turn === 'b'
                ? Math.max(0, this.baseBlackTime - elapsed)
                : this.baseBlackTime
        };
    }
    
    // Clean up interval when game ends
    endGame() {
        this.stopClock();
        // Preserve the last game state before clearing
        if (this.currentGame) {
            this.lastGameState = { ...this.currentGame };
        }
        this.currentGame = null;
        this._playingColor = null; // Reset playing color
        // Don't reset _lastBoardOrientation here - we want to preserve it for freestyle mode
    }
    
    hasMoveHistory(): boolean {
        return this.moveHistory.length > 0;
    }
    
    // Premove functionality
    setPremove(from: string, to: string, promotion?: string) {
        // Only allow premove in playing perspective when it's not my turn
        if (this.isPlaying && !this.isMyTurn) {
            runInAction(() => {
                this.premove = { from, to, promotion };
            });
        }
    }
    
    clearPremove() {
        runInAction(() => {
            this.premove = null;
        });
    }
    
    // Execute premove if it's now my turn
    executePremove() {
        if (this.premove && this.isMyTurn) {
            const { from, to, promotion } = this.premove;
            this.clearPremove();
            // Send the move to FICS
            this.rootStore?.ficsStore.sendCommand(from + to + (promotion || ''));
        }
    }
    
    loadMovesFromList(moves: string[]) {
        if (!this.currentGame) return;
        
        runInAction(() => {
            // Get the variant for the current game
            const variant = this.getVariantFromString(this.currentGame!.variant);
            
            // Create a new chess board with the same variant to reset to starting position
            this.chessBoard = new ChessAPI(variant);
            const startingFen = this.chessBoard.getFen();
            
            // Clear existing moves and rebuild from the list
            this.moveHistory = [];
            this._positionHistory = [startingFen];
            
            // Apply each move in sequence
            for (const moveStr of moves) {
                try {
                    const move = this.chessBoard.makeMove(moveStr);
                    if (move) {
                        this.moveHistory.push(move);
                        this._positionHistory.push(this.chessBoard.getFen());
                        
                        // Don't play sounds when loading move history
                        // (this happens when observing a game in progress)
                    }
                } catch (error) {
                    console.error('Error applying move from list:', moveStr, error);
                }
            }
            
            // Update current position
            this._position = this.chessBoard.getFen();
            this.currentMoveIndex = this.moveHistory.length - 1;
            
            // Update captured pieces
            this.updateCapturedPieces();
            
            // Update game state
            if (this.currentGame) {
                this.currentGame.turn = this.chessBoard.getActiveColor() === Color.WHITE ? 'w' : 'b';
                if (this.moveHistory.length > 0) {
                    this.currentGame.lastMove = this.moveHistory[this.moveHistory.length - 1].san;
                }
            }
            
            // After loading moves, update the last known opening
            // Build the complete move string to look up the opening
            if (this.moveHistory.length > 0) {
                let moveStr = '';
                for (let i = 0; i < this.moveHistory.length; i++) {
                    if (i % 2 === 0) {
                        moveStr += `${Math.floor(i / 2) + 1}. ${this.moveHistory[i].san}`;
                    } else {
                        moveStr += ` ${this.moveHistory[i].san}`;
                    }
                    if (i < this.moveHistory.length - 1) {
                        moveStr += ' ';
                    }
                }
                
                const opening = lookupFromMoveList(moveStr);
                if (opening) {
                    this._lastKnownOpening = opening;
                } else {
                    const fenOpening = lookupFromFEN(this._position);
                    if (fenOpening && fenOpening !== 'Unknown opening') {
                        this._lastKnownOpening = fenOpening;
                    }
                }
            }
        });
    }
}
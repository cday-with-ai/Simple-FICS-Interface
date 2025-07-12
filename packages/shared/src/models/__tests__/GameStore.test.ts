import {GameStore, GameState} from '../GameStore';
import {runInAction} from 'mobx';
import {ChessAPI, Move, Color, Variant} from '../../services/ChessAPI';
import {Style12} from '../../services/FicsProtocol.types';

// Mock ChessAPI
jest.mock('../../services/ChessAPI', () => {
    const mockMove = {
        san: 'e4',
        from: 'e2',
        to: 'e4',
        capturedPiece: null,
        promotion: null,
        isEnPassant: false,
        isCastling: false,
        castlingSide: null,
        isCapture: () => false,
        isPromotion: () => false,
        toString: () => 'e4',
        toDetailedString: () => 'e4 (e2-e4)'
    };

    return {
        ChessAPI: jest.fn().mockImplementation(() => ({
            loadFen: jest.fn().mockReturnValue(true),
            getFen: jest.fn().mockReturnValue('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
            makeLongAlgebraicMove: jest.fn().mockReturnValue(mockMove),
            makeMove: jest.fn().mockReturnValue(mockMove),
            getActiveColor: jest.fn().mockReturnValue('w'),
            getLegalMoves: jest.fn().mockReturnValue([]),
            isGameOver: jest.fn().mockReturnValue(false),
            getGameResult: jest.fn().mockReturnValue('in_progress'),
            isInCheck: jest.fn().mockReturnValue(false),
            getPiece: jest.fn().mockReturnValue(null),
            getCapturedPieces: jest.fn().mockReturnValue([])
        })),
        Move: jest.fn().mockImplementation(() => mockMove),
        Color: {WHITE: 'w', BLACK: 'b'},
        Variant: {
            CLASSIC: 'classic',
            CHESS960: 'chess960',
            LOSERS: 'losers',
            SUICIDE: 'suicide',
            ATOMIC: 'atomic',
            CRAZYHOUSE: 'crazyhouse',
            FREESTYLE: 'freestyle'
        },
        GameResult: {IN_PROGRESS: 'in_progress', WHITE_WINS: 'white_wins', BLACK_WINS: 'black_wins', DRAW: 'draw'},
        PieceType: {KING: 'k', QUEEN: 'q', ROOK: 'r', BISHOP: 'b', KNIGHT: 'n', PAWN: 'p'}
    };
});

describe('GameStore', () => {
    let gameStore: GameStore;
    let mockRootStore: any;

    beforeEach(() => {
        mockRootStore = {
            ficsStore: {
                sendCommand: jest.fn()
            }
        };

        gameStore = new GameStore();
        (gameStore as any).rootStore = mockRootStore;
    });

    describe('Initialization', () => {
        it('should initialize with default state', () => {
            expect(gameStore.currentGame).toBeNull();
            expect(gameStore.moveHistory).toEqual([]);
            expect(gameStore.isAnalyzing).toBe(false);
            expect(gameStore.evaluation).toBeNull();
            expect(gameStore.chessBoard).toBeDefined();
        });

        it('should be observable', () => {
            expect(gameStore.currentGame).toBeNull();

            runInAction(() => {
                gameStore.isAnalyzing = true;
            });

            expect(gameStore.isAnalyzing).toBe(true);
        });
    });

    describe('Game Management', () => {
        const mockGameState: GameState = {
            gameId: 1,
            white: {name: 'TestPlayer1', rating: 1500, time: 900},
            black: {name: 'TestPlayer2', rating: 1600, time: 900},
            turn: 'w',
            moveNumber: 1,
            variant: 'standard'
        };

        it('should start a new game', () => {
            gameStore.startNewGame(mockGameState);

            expect(gameStore.currentGame).toEqual(mockGameState);
            expect(gameStore.moveHistory).toEqual([]);
            expect(gameStore.evaluation).toBeNull();
            expect(ChessAPI).toHaveBeenCalled();
        });

        it('should start a new game with custom FEN', () => {
            const customFen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2';
            gameStore.startNewGame(mockGameState, customFen);

            expect(ChessAPI).toHaveBeenCalledWith(expect.any(String), customFen);
        });
    });

    describe('Move Handling', () => {
        beforeEach(() => {
            const mockGameState: GameState = {
                gameId: 1,
                white: {name: 'TestPlayer1', rating: 1500, time: 900},
                black: {name: 'TestPlayer2', rating: 1600, time: 900},
                turn: 'w',
                moveNumber: 1,
                variant: 'standard'
            };
            gameStore.startNewGame(mockGameState);
        });

        it('should make a valid move', () => {
            const result = gameStore.makeMove('e2', 'e4');

            expect(result).toBe(true);
            expect(gameStore.moveHistory).toHaveLength(1);
            expect(gameStore.moveHistory[0].san).toBe('e4');
            expect(gameStore.currentGame?.lastMove).toBe('e4');
            expect(mockRootStore.ficsStore.sendCommand).toHaveBeenCalledWith('e2e4');
        });

        it('should reject invalid moves', () => {
            (gameStore.chessBoard.makeLongAlgebraicMove as jest.Mock).mockReturnValue(null);

            const result = gameStore.makeMove('e2', 'e5');

            expect(result).toBe(false);
            expect(gameStore.moveHistory).toEqual([]);
            expect(mockRootStore.ficsStore.sendCommand).not.toHaveBeenCalled();
        });

        it('should handle promotion moves', () => {
            const result = gameStore.makeMove('e7', 'e8', 'q');

            expect(result).toBe(true);
            expect(mockRootStore.ficsStore.sendCommand).toHaveBeenCalledWith('e7e8q');
        });

        it('should handle moves without root store', () => {
            (gameStore as any).rootStore = null;

            const result = gameStore.makeMove('e2', 'e4');

            expect(result).toBe(true);
            expect(gameStore.moveHistory).toHaveLength(1);
        });
    });

    describe('Style12 Updates', () => {
        it('should update game state from Style12 data', () => {
            const mockGameState: GameState = {
                gameId: 1,
                white: {name: 'TestPlayer1', rating: 1500, time: 900},
                black: {name: 'TestPlayer2', rating: 1600, time: 900},
                turn: 'w',
                moveNumber: 1,
                variant: 'standard'
            };
            gameStore.startNewGame(mockGameState);

            // Create a proper Style12 object
            const style12Data: Style12 = {
                board: [
                    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['-', '-', '-', '-', 'P', '-', '-', '-'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['P', 'P', 'P', 'P', '-', 'P', 'P', 'P'],
                    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
                ],
                colorToMove: 'B',
                castlingRights: 'KQkq',
                enPassantSquare: '-',
                halfMoveClock: 0,
                gameNumber: 1,
                whiteName: 'TestWhite',
                blackName: 'TestBlack',
                relation: -1,
                initialTime: 15,
                incrementTime: 0,
                whiteMaterialStrength: 39,
                blackMaterialStrength: 39,
                whiteTimeRemaining: 600,
                blackTimeRemaining: 600,
                moveNumber: 1,
                verboseMove: 'P/e2-e4',
                timeTaken: '(0:00)',
                prettyMove: 'e4',
                flipBoard: false
            };

            gameStore.updateFromStyle12(style12Data);

            expect(gameStore.chessBoard.loadFen).toHaveBeenCalled();
            expect(gameStore.currentGame?.turn).toBe('b');
            expect(gameStore.currentGame?.white.time).toBe(600);
            expect(gameStore.currentGame?.black.time).toBe(600);
        });

        it('should handle invalid Style12 data gracefully', () => {
            const invalidData: any = {
                board: [], // Invalid board
                colorToMove: 'X' as any, // Invalid color
                // Missing required fields
            };

            expect(() => {
                gameStore.updateFromStyle12(invalidData);
            }).not.toThrow();
        });
    });

    describe('Analysis Features', () => {
        it('should toggle analysis mode', () => {
            expect(gameStore.isAnalyzing).toBe(false);

            gameStore.toggleAnalysis();
            expect(gameStore.isAnalyzing).toBe(true);

            gameStore.toggleAnalysis();
            expect(gameStore.isAnalyzing).toBe(false);
        });

        it('should set evaluation', () => {
            const evaluation = {score: 0.5, depth: 20, pv: 'e2e4 e7e5'};

            gameStore.setEvaluation(evaluation);

            expect(gameStore.evaluation).toEqual(evaluation);
        });
    });

    describe('Computed Properties', () => {
        it('should return current FEN', () => {
            const mockFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            (gameStore.chessBoard.getFen as jest.Mock).mockReturnValue(mockFen);

            expect(gameStore.fen).toBe(mockFen);
        });

        it('should return current PGN', () => {
            // Add some moves to history
            gameStore.makeMove('e2', 'e4');
            gameStore.makeMove('e7', 'e5');

            expect(gameStore.pgn).toBe('e4 e4');
        });

        it('should return legal moves', () => {
            const mockMoves = [{san: 'e4'}, {san: 'e3'}];
            (gameStore.chessBoard.getLegalMoves as jest.Mock).mockReturnValue(mockMoves);

            expect(gameStore.legalMoves).toEqual(mockMoves);
        });

        it('should return game over status', () => {
            (gameStore.chessBoard.isGameOver as jest.Mock).mockReturnValue(true);

            expect(gameStore.isGameOver).toBe(true);
        });
    });

    describe('Premove functionality', () => {
        let gameStore: GameStore;
        let rootStore: any;

        beforeEach(() => {
            gameStore = new GameStore();
            rootStore = {
                ficsStore: {
                    sendCommand: jest.fn()
                }
            };
            gameStore.rootStore = rootStore;
        });

        it('should set premove when playing and not my turn', () => {
            // Set up playing state where it's opponent's turn
            gameStore.gameRelation = -1; // Playing, opponent's turn
            gameStore.setPremove('e2', 'e4');
            
            expect(gameStore.premove).toEqual({
                from: 'e2',
                to: 'e4',
                promotion: undefined
            });
        });

        it('should not set premove when it is my turn', () => {
            // Set up playing state where it's my turn
            gameStore.gameRelation = 1; // Playing, my turn
            gameStore.setPremove('e2', 'e4');
            
            expect(gameStore.premove).toBeNull();
        });

        it('should not set premove when not playing', () => {
            // Set up observing state
            gameStore.gameRelation = 0; // Observing
            gameStore.setPremove('e2', 'e4');
            
            expect(gameStore.premove).toBeNull();
        });

        it('should clear premove', () => {
            gameStore.gameRelation = -1;
            gameStore.setPremove('e2', 'e4');
            expect(gameStore.premove).not.toBeNull();
            
            gameStore.clearPremove();
            expect(gameStore.premove).toBeNull();
        });

        it('should execute premove when it becomes my turn', () => {
            gameStore.gameRelation = -1;
            gameStore.setPremove('e2', 'e4', 'q');
            
            // Now it becomes my turn
            gameStore.gameRelation = 1;
            gameStore.executePremove();
            
            expect(rootStore.ficsStore.sendCommand).toHaveBeenCalledWith('e2e4q');
            expect(gameStore.premove).toBeNull();
        });

        it('should not execute premove when not my turn', () => {
            gameStore.gameRelation = -1;
            gameStore.setPremove('e2', 'e4');
            
            // Still opponent's turn
            gameStore.executePremove();
            
            expect(rootStore.ficsStore.sendCommand).not.toHaveBeenCalled();
            expect(gameStore.premove).not.toBeNull();
        });
    });
});
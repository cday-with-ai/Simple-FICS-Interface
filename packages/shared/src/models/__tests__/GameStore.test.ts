import {GameStore, GameState} from '../GameStore';
import {runInAction} from 'mobx';
import {ChessAPI, Move, Color, Variant} from '../../services/chessapi';

// Mock ChessAPI
jest.mock('../../services/chessapi', () => {
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
            getPiece: jest.fn().mockReturnValue(null)
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

            // Style12 format has about 31 fields
            const style12Data = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b -1 1 0 1 0 0 1 TestWhite TestBlack -1 15 0 39 39 600 600 1 none (0:00) e4 0 1 0 extra';

            gameStore.updateFromStyle12(style12Data);

            expect(gameStore.chessBoard.loadFen).toHaveBeenCalled();
            expect(gameStore.currentGame?.turn).toBe('b');
            expect(gameStore.currentGame?.white.time).toBe(600);
            expect(gameStore.currentGame?.black.time).toBe(600);
        });

        it('should handle invalid Style12 data gracefully', () => {
            const invalidData = 'invalid style12 data';

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
});
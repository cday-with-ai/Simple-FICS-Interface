/**
 * Tests for standard chess functionality
 */

import {ChessAPI, Color, PieceType, Variant, GameResult} from '../ChessAPI';

describe('ChessEngine - Standard Chess', () => {
    let board: ChessAPI;

    beforeEach(() => {
        board = new ChessAPI(Variant.CLASSIC);
    });

    describe('Initial Position', () => {
        it('should set up the correct starting position', () => {
            expect(board.getFen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            expect(board.getActiveColor()).toBe(Color.WHITE);
        });

        it('should have correct pieces in starting position', () => {
            // Check white pieces
            expect(board.getPiece('e1')).toEqual({type: PieceType.KING, color: Color.WHITE});
            expect(board.getPiece('d1')).toEqual({type: PieceType.QUEEN, color: Color.WHITE});
            expect(board.getPiece('a1')).toEqual({type: PieceType.ROOK, color: Color.WHITE});
            expect(board.getPiece('h1')).toEqual({type: PieceType.ROOK, color: Color.WHITE});

            // Check black pieces
            expect(board.getPiece('e8')).toEqual({type: PieceType.KING, color: Color.BLACK});
            expect(board.getPiece('d8')).toEqual({type: PieceType.QUEEN, color: Color.BLACK});

            // Check pawns
            for (let file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
                expect(board.getPiece(`${file}2`)).toEqual({type: PieceType.PAWN, color: Color.WHITE});
                expect(board.getPiece(`${file}7`)).toEqual({type: PieceType.PAWN, color: Color.BLACK});
            }
        });
    });

    describe('Basic Moves', () => {
        it('should allow legal pawn moves', () => {
            const move = board.makeMove('e4');
            expect(move).not.toBeNull();
            expect(board.getPiece('e4')).toEqual({type: PieceType.PAWN, color: Color.WHITE});
            expect(board.getPiece('e2')).toBeNull();
            expect(board.getActiveColor()).toBe(Color.BLACK);
        });

        it('should allow two-square pawn advance from starting position', () => {
            board.makeMove('e4');
            board.makeMove('e5');
            board.makeMove('d4');
            const move = board.makeMove('d5');
            expect(move).not.toBeNull();
            expect(board.getPiece('d5')).toEqual({type: PieceType.PAWN, color: Color.BLACK});
        });

        it('should not allow two-square pawn advance after first move', () => {
            board.makeMove('e4');
            board.makeMove('e5');
            board.makeMove('d4');
            board.makeMove('d6');
            board.makeMove('Nf3');
            const illegalMove = board.makeMove('d4'); // Try to move d6-d4
            expect(illegalMove).toBeNull();
        });

        it('should allow knight moves', () => {
            const move = board.makeMove('Nf3');
            expect(move).not.toBeNull();
            expect(board.getPiece('f3')).toEqual({type: PieceType.KNIGHT, color: Color.WHITE});
            expect(board.getPiece('g1')).toBeNull();
        });

        it('should allow bishop moves after pawns move', () => {
            board.makeMove('e4');
            board.makeMove('e5');
            const move = board.makeMove('Bc4');
            expect(move).not.toBeNull();
            expect(board.getPiece('c4')).toEqual({type: PieceType.BISHOP, color: Color.WHITE});
        });
    });

    describe('Captures', () => {
        it('should allow pawn captures', () => {
            board.makeMove('e4');
            board.makeMove('d5');
            const capture = board.makeMove('exd5');
            expect(capture).not.toBeNull();
            expect(capture!.isCapture()).toBe(true);
            expect(board.getPiece('d5')).toEqual({type: PieceType.PAWN, color: Color.WHITE});
            expect(board.getPiece('e4')).toBeNull();
        });

        it('should allow piece captures', () => {
            board.loadFen('rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');
            const capture = board.makeMove('Nxe4'); // Knight takes e4
            expect(capture).not.toBeNull();
            expect(capture!.isCapture()).toBe(true);
            expect(board.getPiece('e4')).toEqual({type: PieceType.KNIGHT, color: Color.BLACK});
        });

        it('should not allow capturing own pieces', () => {
            board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 1 2');
            const illegalCapture = board.makeMove('Nxe4'); // Try to capture own pawn
            expect(illegalCapture).toBeNull();
        });
    });

    describe('En Passant', () => {
        it('should allow en passant capture', () => {
            // Set up position with black having just moved d7-d5
            board.makeMove('e4');
            board.makeMove('c5');
            board.makeMove('e5');
            board.makeMove('d5'); // Creates en passant opportunity

            const enPassant = board.makeMove('exd6'); // En passant capture
            expect(enPassant).not.toBeNull();
            expect(enPassant!.isEnPassant).toBe(true);
            expect(board.getPiece('d6')).toEqual({type: PieceType.PAWN, color: Color.WHITE});
            expect(board.getPiece('d5')).toBeNull(); // Captured pawn removed
        });

        it('should set en passant target after two-square pawn move', () => {
            board.makeMove('e4');
            const move = board.makeMove('d5');
            expect(move).not.toBeNull();
            // After d7-d5, en passant target should be d6
            expect(board.getFen()).toContain('d6');
        });

        it('should clear en passant target after one move', () => {
            board.makeMove('e4');
            board.makeMove('d5');
            board.makeMove('Nf3'); // Any other move
            // En passant should no longer be possible
            expect(board.getFen()).toContain(' - '); // No en passant target
        });
    });

    describe('Castling', () => {
        it('should allow kingside castling', () => {
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
            const castle = board.makeMove('O-O');
            expect(castle).not.toBeNull();
            expect(castle!.isCastling).toBe(true);
            expect(board.getPiece('g1')).toEqual({type: PieceType.KING, color: Color.WHITE});
            expect(board.getPiece('f1')).toEqual({type: PieceType.ROOK, color: Color.WHITE});
            expect(board.getPiece('e1')).toBeNull();
            expect(board.getPiece('h1')).toBeNull();
        });

        it('should allow queenside castling', () => {
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
            const castle = board.makeMove('O-O-O');
            expect(castle).not.toBeNull();
            expect(board.getPiece('c1')).toEqual({type: PieceType.KING, color: Color.WHITE});
            expect(board.getPiece('d1')).toEqual({type: PieceType.ROOK, color: Color.WHITE});
        });

        it('should not allow castling through check', () => {
            board.loadFen('r3k2r/8/8/8/8/8/4r3/R3K2R w KQkq - 0 1');
            const castle = board.makeMove('O-O'); // e2 rook attacks f1
            expect(castle).toBeNull();
        });

        it('should not allow castling when in check', () => {
            board.loadFen('r3k2r/8/8/8/8/8/4r3/R3K3 w Qkq - 0 1'); // King on e1 in check
            const castle = board.makeMove('O-O-O');
            expect(castle).toBeNull();
        });

        it('should update castling rights after king moves', () => {
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
            board.makeMove('Ke2');
            board.makeMove('Ke7');
            // Check that castling is no longer allowed
            const fen = board.getFen();
            expect(fen).toContain(' - '); // No castling rights
        });

        it('should update castling rights after rook moves', () => {
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
            board.makeMove('Ra2');
            const fen = board.getFen();
            expect(fen).toContain(' K'); // Only kingside castling for white
            expect(fen).not.toContain('Q');
        });
    });

    describe('Pawn Promotion', () => {
        it('should promote pawn to queen by default', () => {
            board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
            const promotion = board.makeMove('a8=Q');
            expect(promotion).not.toBeNull();
            expect(promotion!.isPromotion()).toBe(true);
            expect(board.getPiece('a8')).toEqual({type: PieceType.QUEEN, color: Color.WHITE});
        });

        it('should allow underpromotion to knight', () => {
            board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
            const promotion = board.makeMove('a8=N');
            expect(promotion).not.toBeNull();
            expect(board.getPiece('a8')).toEqual({type: PieceType.KNIGHT, color: Color.WHITE});
        });

        it('should allow promotion with capture', () => {
            board.loadFen('r7/1P6/8/8/8/8/8/8 w - - 0 1');
            const promotion = board.makeMove('bxa8=Q');
            expect(promotion).not.toBeNull();
            expect(promotion!.isCapture()).toBe(true);
            expect(promotion!.isPromotion()).toBe(true);
            expect(board.getPiece('a8')).toEqual({type: PieceType.QUEEN, color: Color.WHITE});
        });
    });

    describe('Check and Checkmate', () => {
        it('should detect check', () => {
            board.loadFen('rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 4');
            board.makeMove('Bxf7+'); // Bishop takes f7 with check
            expect(board.isInCheck()).toBe(true);
        });

        it('should detect checkmate', () => {
            board.loadFen('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe(GameResult.BLACK_WINS);
        });

        it('should detect back rank mate', () => {
            board.loadFen('6k1/5ppp/8/8/8/8/8/R6K b - - 0 1');
            board.makeMove('Kh8'); // Only legal move
            const mate = board.makeMove('Ra8#');
            expect(mate).not.toBeNull();
            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe(GameResult.WHITE_WINS);
        });

        it('should not allow moves that leave king in check', () => {
            // Create a position where d2 pawn is pinned by bishop on a5
            board.loadFen('rnbqk1nr/pppp1ppp/8/b3p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 4 3');
            board.makeMove('Ke1'); // Keep king on e1

            // Now the d2 pawn is pinned by the bishop on a5 and can't move
            const pinnedMove = board.makeMove('d3');
            expect(pinnedMove).toBeNull(); // Can't move pinned piece

            // Should allow moving a non-pinned piece
            const legalMove = board.makeMove('Nf3');
            expect(legalMove).not.toBeNull();
        });
    });

    describe('Stalemate', () => {
        it('should detect stalemate', () => {
            board.loadFen('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1'); // Black king trapped in corner by queen, not in check
            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe(GameResult.DRAW);
        });
    });

    describe('Draw Conditions', () => {
        it('should detect insufficient material - K vs K', () => {
            board.loadFen('k7/8/K7/8/8/8/8/8 w - - 0 1');
            expect(board['_isDraw']()).toBe(true);
        });

        it('should detect insufficient material - K+B vs K', () => {
            board.loadFen('k7/8/K7/8/8/8/8/B7 w - - 0 1');
            expect(board['_isDraw']()).toBe(true);
        });

        it('should detect insufficient material - K+N vs K', () => {
            board.loadFen('k7/8/K7/8/8/8/8/N7 w - - 0 1');
            expect(board['_isDraw']()).toBe(true);
        });

        it('should detect 50-move rule', () => {
            board.loadFen('k7/8/K7/8/8/8/8/R7 w - - 100 1');
            expect(board['_isDraw']()).toBe(true);
        });
    });
});
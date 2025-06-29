/**
 * Tests for FEN import/export and edge cases
 */

import {ChessBoard, Color, Variant} from '../ChessEngine';

describe('ChessEngine - FEN Handling', () => {
    let board: ChessBoard;

    beforeEach(() => {
        board = new ChessBoard(Variant.CLASSIC);
    });

    describe('FEN Import', () => {
        it('should load standard starting position', () => {
            const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            expect(board.loadFen(startingFen)).toBe(true);
            expect(board.getFen()).toBe(startingFen);
        });

        it('should load positions with different active colors', () => {
            const blackToMove = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
            expect(board.loadFen(blackToMove)).toBe(true);
            expect(board.getActiveColor()).toBe(Color.BLACK);
        });

        it('should load positions with partial castling rights', () => {
            const limitedCastling = 'r3k2r/8/8/8/8/8/8/R3K2R w Kq - 0 1';
            expect(board.loadFen(limitedCastling)).toBe(true);

            // White can only castle kingside
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w Kq - 0 1');
            expect(board.makeMove('O-O')).not.toBeNull();

            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w Kq - 0 1');
            expect(board.makeMove('O-O-O')).toBeNull();
        });

        it('should load positions with en passant targets', () => {
            const withEnPassant = 'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3';
            expect(board.loadFen(withEnPassant)).toBe(true);
            expect(board.makeMove('exd6')).not.toBeNull(); // En passant capture
        });

        it('should load positions with high move counters', () => {
            const lateMidgame = 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 50';
            expect(board.loadFen(lateMidgame)).toBe(true);
            expect(board.getFen().endsWith('4 50')).toBe(true);
        });

        it('should handle empty squares correctly', () => {
            const sparse = '8/8/8/4K3/8/8/8/4k3 w - - 0 1';
            expect(board.loadFen(sparse)).toBe(true);
            expect(board.getPiece('e5')).not.toBeNull();
            expect(board.getPiece('e1')).not.toBeNull();
            expect(board.getPiece('a1')).toBeNull();
        });

        it('should reject invalid FEN strings', () => {
            // Wrong number of ranks
            expect(board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP')).toBe(false);

            // Invalid piece character
            expect(board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKXNR w KQkq - 0 1')).toBe(false);

            // Too few fields
            expect(board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w')).toBe(false);

            // Invalid active color
            expect(board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR x KQkq - 0 1')).toBe(false);
        });
    });

    describe('FEN Export', () => {
        it('should export correct FEN after moves', () => {
            board.makeMove('e4');
            expect(board.getFen()).toBe('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');

            board.makeMove('e5');
            expect(board.getFen()).toBe('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2');
        });

        it('should update castling rights in FEN', () => {
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
            board.makeMove('Ra2'); // Move rook

            const fen = board.getFen();
            expect(fen).toContain(' Kkq '); // Lost queenside castling
        });

        it('should handle en passant target correctly', () => {
            board.makeMove('e4');
            board.makeMove('a6');
            board.makeMove('e5');
            board.makeMove('d5'); // Creates en passant opportunity

            const fen = board.getFen();
            expect(fen).toContain(' d6 '); // En passant target

            board.makeMove('exd6'); // Take en passant
            const newFen = board.getFen();
            expect(newFen).toContain(' - '); // No en passant target
        });

        it('should increment move counters correctly', () => {
            // Half-move clock resets on pawn move or capture
            board.makeMove('Nf3');
            board.makeMove('Nf6');
            let fen = board.getFen();
            expect(fen).toMatch(/ 2 2$/); // Half-move clock = 2

            board.makeMove('e4'); // Pawn move resets
            fen = board.getFen();
            expect(fen).toMatch(/ 0 2$/); // Half-move clock = 0

            board.makeMove('e5');
            board.makeMove('Nxe5'); // Capture resets
            fen = board.getFen();
            expect(fen).toMatch(/ 0 3$/); // Half-move clock = 0, full moves = 3
        });
    });

    describe('Position History', () => {
        it('should track position history', () => {
            const initialFen = board.getFen();

            board.makeMove('e4');
            board.makeMove('e5');
            board.makeMove('Nf3');

            // Position history should be tracked internally
            // This is used for threefold repetition
            expect(board['positionHistory'].length).toBe(4); // Initial + 3 moves
        });

        it('should detect threefold repetition', () => {
            board.loadFen('8/8/8/8/8/8/8/R3K2k w - - 0 1');

            // Create repetition
            board.makeMove('Ra8+');
            board.makeMove('Kg7');
            board.makeMove('Ra7+');
            board.makeMove('Kh8');
            board.makeMove('Ra8+');
            board.makeMove('Kg7');
            board.makeMove('Ra7+');
            board.makeMove('Kh8');

            // Third repetition
            expect(board['_isDraw']()).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle moves when only kings remain', () => {
            board.loadFen('8/8/8/8/8/8/8/K6k w - - 0 1');

            const move = board.makeMove('Ka2');
            expect(move).not.toBeNull();
            expect(board['_isDraw']()).toBe(true); // Insufficient material
        });

        it('should handle positions with no legal moves', () => {
            board.loadFen('8/8/8/8/8/8/8/k6K b - - 0 1'); // Black king trapped

            const moves = board.getLegalMoves();
            expect(moves.length).toBe(0);
            expect(board.isGameOver()).toBe(true);
        });

        it('should handle positions with many queens', () => {
            board.loadFen('QQQQQQQQ/QQQQQQQQ/8/8/8/8/qqqqqqqq/qqqqqqqk w - - 0 1');

            const moves = board.getLegalMoves();
            expect(moves.length).toBeGreaterThan(0); // Should have many queen moves
        });

        it('should handle unusual but legal positions', () => {
            // All pawns promoted
            board.loadFen('nnnnnnnn/8/8/8/8/8/8/NNNNNNNN w - - 0 1');
            expect(board.getLegalMoves().length).toBeGreaterThan(0);

            // Pawns on wrong ranks (could happen in variants)
            board.loadFen('8/PPPPPPPP/8/8/8/8/pppppppp/8 w - - 0 1');
            const pawnMove = board.makeMove('a8=Q');
            expect(pawnMove).not.toBeNull();
        });

        it('should preserve state after invalid moves', () => {
            const fenBefore = board.getFen();
            const illegalMove = board.makeMove('e5'); // Black move on white's turn

            expect(illegalMove).toBeNull();
            expect(board.getFen()).toBe(fenBefore); // State unchanged
            expect(board.getActiveColor()).toBe(Color.WHITE);
        });

        it('should handle extremely long games', () => {
            // Test 50-move rule
            board.loadFen('8/8/8/8/8/8/8/R3K2k w - - 99 150');

            board.makeMove('Ra8+'); // 100th half-move without pawn/capture
            expect(board.isGameOver()).toBe(true);
            expect(board['_isDraw']()).toBe(true);
        });
    });
});
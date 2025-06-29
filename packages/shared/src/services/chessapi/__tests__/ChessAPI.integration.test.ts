/**
 * Integration and performance tests for the Chess Engine
 */

import {ChessAPI, Color, Variant, GameResult, PieceType} from '../ChessAPI';

describe('ChessEngine - Integration Tests', () => {
    describe('Complete Games', () => {
        it('should play Scholar\'s Mate', () => {
            const board = new ChessAPI();

            // Scholar's Mate sequence
            expect(board.makeMove('e4')).not.toBeNull();
            expect(board.makeMove('e5')).not.toBeNull();
            expect(board.makeMove('Bc4')).not.toBeNull();
            expect(board.makeMove('Nc6')).not.toBeNull();
            expect(board.makeMove('Qh5')).not.toBeNull();
            expect(board.makeMove('Nf6')).not.toBeNull(); // Blocks the mate
            expect(board.makeMove('Qxf7#')).not.toBeNull();

            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe(GameResult.WHITE_WINS);
        });

        it('should play Fool\'s Mate', () => {
            const board = new ChessAPI();

            // Fool's Mate - fastest checkmate possible
            expect(board.makeMove('f3')).not.toBeNull();
            expect(board.makeMove('e5')).not.toBeNull();
            expect(board.makeMove('g4')).not.toBeNull();
            expect(board.makeMove('Qh4#')).not.toBeNull();

            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe(GameResult.BLACK_WINS);
        });

        it('should handle a complex middlegame position', () => {
            const board = new ChessAPI();

            // Italian Game opening with repetition
            const moves = [
                'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'd3', 'Nf6',
                'O-O', 'O-O', 'Re1', 'd6', 'c3', 'a6', 'Bb3', 'Ba7',
                'Nbd2', 'Be6', 'Bxe6', 'fxe6', 'Nb3', 'Qe8', 'Be3', 'Bxe3',
                'Rxe3', 'Qg6', 'Nh4', 'Qg5', 'Nf3', 'Qg6', 'Nh4', 'Qg5',
                'Nf3', 'Qg6', 'Nh4', 'Qg5', 'Nf3' // Creates threefold repetition
            ];

            for (const move of moves) {
                expect(board.makeMove(move)).not.toBeNull();
            }

            // Should detect repetition (same position occurs 3 times)
            expect(board['_isDraw']()).toBe(true);
        });
    });

    describe('Move Generation Performance', () => {
        it('should generate moves quickly in complex positions', () => {
            const board = new ChessAPI();
            board.loadFen('r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4');

            const start = Date.now();
            const moves = board.getLegalMoves();
            const duration = Date.now() - start;

            expect(moves.length).toBeGreaterThan(20); // Many moves available
            expect(duration).toBeLessThan(50); // Should be fast (< 50ms)
        });

        it('should validate moves quickly', () => {
            const board = new ChessAPI();

            const start = Date.now();
            for (let i = 0; i < 100; i++) {
                board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
                board.makeMove('e4');
                board.makeMove('e5');
                board.makeMove('Nf3');
            }
            const duration = Date.now() - start;

            expect(duration).toBeLessThan(100); // 100 game starts in < 100ms
        });
    });

    describe('State Consistency', () => {
        it('should maintain consistent state through game', () => {
            const board = new ChessAPI();
            const moves = ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3'];

            for (const move of moves) {
                const fenBefore = board.getFen();
                const moveMade = board.makeMove(move);
                expect(moveMade).not.toBeNull();

                // FEN should change after each move
                expect(board.getFen()).not.toBe(fenBefore);

                // Active color should alternate
                const expectedColor = moves.indexOf(move) % 2 === 0 ? Color.BLACK : Color.WHITE;
                expect(board.getActiveColor()).toBe(expectedColor);
            }
        });

        it('should track game history correctly', () => {
            const board = new ChessAPI();

            board.makeMove('e4');
            board.makeMove('e5');
            board.makeMove('Nf3');

            // Should have move history
            expect(board['moveHistory'].length).toBe(3);
            expect(board['positionHistory'].length).toBe(4); // Including starting position
        });
    });

    describe('Variant Integration', () => {
        it('should handle variant switching scenarios', () => {
            // Each variant should work independently
            const variants = [
                Variant.CLASSIC,
                Variant.ATOMIC,
                Variant.LOSERS,
                Variant.SUICIDE,
                Variant.CRAZYHOUSE,
                Variant.CHESS960
            ];

            for (const variant of variants) {
                const board = new ChessAPI(variant);
                const moves = board.getLegalMoves();
                expect(moves.length).toBeGreaterThan(0);

                // Make a move and verify state
                const firstMove = moves[0];
                if (firstMove.from !== '@') { // Not a drop move
                    const result = board.makeLongAlgebraicMove(firstMove.from, firstMove.to);
                    expect(result).not.toBeNull();
                }
            }
        });

        it('should handle complex Crazyhouse scenarios', () => {
            const board = new ChessAPI(Variant.CRAZYHOUSE);

            // Play some captures
            board.makeMove('e4');
            board.makeMove('d5');
            board.makeMove('exd5');
            board.makeMove('Nf6');
            board.makeMove('d6');
            board.makeMove('cxd6');

            // Both sides should have pieces to drop
            expect(board.getCapturedPieces(Color.WHITE).length).toBeGreaterThan(0);
            expect(board.getCapturedPieces(Color.BLACK).length).toBeGreaterThan(0);

            // Should be able to drop
            const drop = board.makeDropMove(PieceType.PAWN, 'e5');
            expect(drop).not.toBeNull();
        });
    });

    describe('Error Recovery', () => {
        it('should recover from invalid move attempts', () => {
            const board = new ChessAPI();
            const initialFen = board.getFen();

            // Try various invalid moves
            expect(board.makeMove('e5')).toBeNull(); // Wrong color
            expect(board.makeMove('Ke2')).toBeNull(); // King can't move there
            expect(board.makeMove('invalid')).toBeNull(); // Invalid notation
            expect(board.makeMove('')).toBeNull(); // Empty move

            // Board state should be unchanged
            expect(board.getFen()).toBe(initialFen);
            expect(board.getActiveColor()).toBe(Color.WHITE);

            // Should still accept valid moves
            expect(board.makeMove('e4')).not.toBeNull();
        });

        it('should handle edge case positions gracefully', () => {
            const edgeCases = [
                '8/8/8/8/8/8/8/8 w - - 0 1', // Empty board
                'k7/8/K7/8/8/8/8/8 w - - 50 100', // Only kings
                'KKKKKKKK/KKKKKKKK/KKKKKKKK/KKKKKKKK/kkkkkkkk/kkkkkkkk/kkkkkkkk/kkkkkkkk w - - 0 1', // Invalid but loadable
            ];

            for (const fen of edgeCases) {
                const board = new ChessAPI();
                board.loadFen(fen);

                // Should not crash when getting moves
                expect(() => board.getLegalMoves()).not.toThrow();
                expect(() => board.isGameOver()).not.toThrow();
                expect(() => board.getGameResult()).not.toThrow();
            }
        });
    });

    describe('Real Game Scenarios', () => {
        it('should handle en passant in real game', () => {
            const board = new ChessAPI();

            // Set up en passant scenario
            board.makeMove('e4');
            board.makeMove('a6');
            board.makeMove('e5');
            board.makeMove('d5'); // Creates en passant opportunity

            const enPassant = board.makeMove('exd6'); // Take en passant
            expect(enPassant).not.toBeNull();
            expect(enPassant!.isEnPassant).toBe(true);
            expect(board.getPiece('d5')).toBeNull(); // Pawn captured
            expect(board.getPiece('d6')).not.toBeNull(); // Our pawn moved here
        });

        it('should handle promotion in real game', () => {
            const board = new ChessAPI();
            board.loadFen('r1bqkbnr/pPpppppp/2n5/8/8/8/P1PPPPPP/RNBQKBNR w KQkq - 0 5');

            // Promote to queen
            const promotion = board.makeMove('bxa8=Q');
            expect(promotion).not.toBeNull();
            expect(board.getPiece('a8')).toEqual({type: PieceType.QUEEN, color: Color.WHITE});
        });

        it('should handle complex tactics', () => {
            const board = new ChessAPI();

            // Set up a pin
            board.loadFen('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4');
            board.makeMove('Ng5'); // Attack f7
            board.makeMove('O-O'); // Castle away from danger
            board.makeMove('Qf3'); // Threaten mate

            // Black must defend
            const moves = board.getLegalMoves();
            const defendingMoves = moves.filter(m =>
                m.to === 'f6' || m.to === 'e6' || m.san.includes('Qe7')
            );
            expect(defendingMoves.length).toBeGreaterThan(0);
        });
    });
});
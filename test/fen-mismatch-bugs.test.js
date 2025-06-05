/**
 * Test cases for FEN mismatch bugs found in chess.js
 * These tests reproduce the specific scenarios where makeMoveFromSan fails
 */

import { ChessBoard, Variant } from '../scripts/ChessBoard.js';

describe('FEN Mismatch Bug Fixes', () => {
    let chessBoard;

    beforeEach(() => {
        chessBoard = new ChessBoard(Variant.CLASSIC);
    });

    describe('Bug 1: Capture moves failing', () => {
        test('Queen capture Qxe5 should work', () => {
            // Set up position before Qxe5
            const fenBefore = 'r3k2r/1pq1npbp/p3p1p1/3pP1P1/7P/1N3Q2/PPP2P2/2KR1B1R b kq - 0 17';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('Qxe5');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = 'r3k2r/1p2npbp/p3p1p1/3pq1P1/7P/1N3Q2/PPP2P2/2KR1B1R w kq - 0 18';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });

        test('Pawn capture bxa4 should work', () => {
            // Set up position before bxa4
            const fenBefore = 'r3k2r/2q2pbp/p3p1p1/1p1p1nP1/N6P/2P2Q1B/PP3P2/2KR3R b kq - 1 21';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('bxa4');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = 'r3k2r/2q2pbp/p3p1p1/3p1nP1/p6P/2P2Q1B/PP3P2/2KR3R w kq - 0 22';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });

        test('Pawn capture gxf5 should work', () => {
            // Set up position before gxf5
            const fenBefore = 'r3k2r/2q2pbp/p3p1p1/3p1BP1/p6P/2P2Q2/PP3P2/2KR3R b kq - 0 22';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('gxf5');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = 'r3k2r/2q2pbp/p3p3/3p1pP1/p6P/2P2Q2/PP3P2/2KR3R w kq - 0 23';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });

        test('Pawn capture with check axb2+ should work', () => {
            // Set up position before axb2+
            const fenBefore = 'r3k2r/2q2pbp/p3p3/3Q1pP1/7P/p1P5/PP3P2/2KRR3 b kq - 0 24';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('axb2+');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = 'r3k2r/2q2pbp/p3p3/3Q1pP1/7P/2P5/Pp3P2/2KRR3 w kq - 0 25';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });

        test('Queen capture with checkmate Qxc3# should work', () => {
            // Set up position before Qxc3#
            const fenBefore = '1r2k2r/2q2pbp/p3p3/3Q1pP1/7P/2P5/P1K2P2/3RR3 b k - 2 26';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('Qxc3#');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = '1r2k2r/5pbp/p3p3/3Q1pP1/7P/2q5/P1K2P2/3RR3 w k - 0 27';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });
    });

    describe('Bug 2: Disambiguation moves failing', () => {
        test('Knight move Nf5 should work', () => {
            // Set up position before Nf5
            const fenBefore = 'r3k2r/1p2npbp/p3p1p1/3pq1P1/7P/1NP2Q2/PP3P2/2KR1B1R b kq - 0 18';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('Nf5');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = 'r3k2r/1p3pbp/p3p1p1/3pqnP1/7P/1NP2Q2/PP3P2/2KR1B1R w kq - 1 19';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });

        test('Rook move with check Rb8+ should work', () => {
            // Set up position before Rb8+
            const fenBefore = 'r3k2r/2q2pbp/p3p3/3Q1pP1/7P/2P5/PK3P2/3RR3 b kq - 0 25';
            chessBoard.loadFen(fenBefore);
            
            // This move should succeed
            const result = chessBoard.makeMoveFromSan('Rb8+');
            expect(result).toBe(true);
            
            // Verify the resulting position
            const expectedFen = '1r2k2r/2q2pbp/p3p3/3Q1pP1/7P/2P5/PK3P2/3RR3 w k - 1 26';
            expect(chessBoard.getFen()).toBe(expectedFen);
        });
    });

    describe('Bug 3: Board state corruption', () => {
        test('Board should maintain state through multiple moves', () => {
            // Start from a complex position
            const startFen = 'r3k2r/1pq1npbp/p3p1p1/3pP1P1/7P/1N3Q2/PPP2P2/2KR1B1R b kq - 0 17';
            chessBoard.loadFen(startFen);
            
            // Make a series of moves
            expect(chessBoard.makeMoveFromSan('Qxe5')).toBe(true);
            expect(chessBoard.makeMoveFromSan('c3')).toBe(true);
            expect(chessBoard.makeMoveFromSan('Nf5')).toBe(true);
            
            // Board should not revert to starting position
            const currentFen = chessBoard.getFen();
            expect(currentFen).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            expect(currentFen).toContain('r3k2r'); // Should still have the rooks and king
        });
    });

    describe('Bug 4: SAN parsing edge cases', () => {
        test('Should handle captures with file disambiguation', () => {
            // Test case where multiple pieces can capture
            const fen = 'r3k2r/2q2pbp/p3p1p1/1p1p1nP1/N6P/2P2Q1B/PP3P2/2KR3R b kq - 1 21';
            chessBoard.loadFen(fen);
            
            // b-pawn captures a-knight
            const result = chessBoard.makeMoveFromSan('bxa4');
            expect(result).toBe(true);
        });

        test('Should handle captures with rank disambiguation', () => {
            // Set up a position where rank disambiguation is needed
            const fen = '1r2k2r/2q2pbp/p3p3/3Q1pP1/7P/2P5/PK3P2/3RR3 b k - 2 26';
            chessBoard.loadFen(fen);
            
            // a8-rook moves to b8
            const result = chessBoard.makeMoveFromSan('Rb8+');
            expect(result).toBe(true);
        });
    });
});

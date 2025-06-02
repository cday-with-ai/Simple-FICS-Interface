import { ChessBoard, Variant } from '../scripts/ChessBoard.js';

describe('Rook Movement Bug - Classical Chess', () => {
    let board;

    beforeEach(() => {
        board = new ChessBoard(Variant.CLASSICAL);
    });

    it('should reproduce the rook movement issue from game logs', () => {
        // Set up the position where the bug occurred
        // From the logs: "r3k2r/1p3p2/4p1p1/bP1pP2p/5P1P/2P2NP1/2nRN1K1/7R b k - 2 28"
        const bugPosition = "r3k2r/1p3p2/4p1p1/bP1pP2p/5P1P/2P2NP1/2nRN1K1/7R b k - 2 28";

        expect(board.loadFen(bugPosition)).toBe(true);

        // Test the moves that were failing
        // From logs: Ne3+ was successful
        expect(board.makeMove('Ne3+')).toBe(true);

        // Then Kf2 was successful
        expect(board.makeMove('Kf2')).toBe(true);

        // Then Bb6 was successful
        expect(board.makeMove('Bb6')).toBe(true);

        // Then Ned4 was successful
        expect(board.makeMove('Ned4')).toBe(true);

        // Then Nc4 was successful
        expect(board.makeMove('Nc4')).toBe(true);

        // Then Rdd1 was successful (this is a rook move)
        expect(board.makeMove('Rdd1')).toBe(true);

        // Then Ra3 was successful (this is the rook move that started showing issues)
        expect(board.makeMove('Ra3')).toBe(true);

        // At this point we should have: "4k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/r1P2NP1/5K2/3R3R w k - 9 32"
        const expectedFen = "4k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/r1P2NP1/5K2/3R3R w k - 9 32";
        expect(board.getFen()).toBe(expectedFen);
    });

    it('should handle rook moves on a-file correctly', () => {
        // Test specific rook moves that were failing
        const testPosition = "4k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/r1P2NP1/5K2/3R3R w k - 9 32";
        expect(board.loadFen(testPosition)).toBe(true);

        console.log('Board after loading position:', board.getFen());
        console.log('White rooks on board:', board.board.flat().filter(p => p && p.type === 'r' && p.color === 'w').length);

        // Test Rc1 (rook move that was working)
        const rc1Result = board.makeMove('Rc1');
        console.log('Rc1 result:', rc1Result);
        expect(rc1Result).toBe(true);

        // Reset and test a different rook disambiguation scenario
        // Use a position where Rdd1 would actually be legal (rook not already on d1)
        const testPosition2 = "4k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/r1P2NP1/3R1K2/7R w k - 9 32";
        expect(board.loadFen(testPosition2)).toBe(true);

        // List white rooks for debugging
        console.log('White rooks for Rdd1 test (position 2):');
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const piece = board.board[rank][file];
                if (piece && piece.type === 'r' && piece.color === 'w') {
                    const square = board._coordsToAlgebraic(rank, file);
                    console.log(`White rook at ${square}`);
                }
            }
        }

        // Now Rdd1 should work (rook from d2 to d1)
        const rdd1Result = board.makeMove('Rdd1');
        console.log('Rdd1 result:', rdd1Result);
        expect(rdd1Result).toBe(true);
    });

    it('should handle rook moves on 7th rank correctly', () => {
        // Test position where rook moves on 7th rank were failing
        const testPosition = "r7/1p2kp2/1b2p1P1/1P1pP1N1/2nN1Pp1/2P3K1/r6r/2R4R w - - 3 40";
        expect(board.loadFen(testPosition)).toBe(true);

        // Test the failing rook moves from the logs
        // Ra2 to h2 was failing
        board.loadFen("8/1p2kp2/1b2p1P1/1P1pP1NK/2nN1P2/2P5/r6R/2R5 b - - 0 40");
        expect(board.makeMove('Rxh2+')).toBe(true);
    });

    it('should handle complex rook disambiguation', () => {
        // Test position from the actual game logs where Raa2 was successful
        // From logs: "8/1p2kp2/1b2p1P1/1P1pP1NK/2nN1P2/2P5/r2r4/2R4R w - - 1 38"
        // But the move was "Raa2" by black, so let's use the position before that move
        const testPosition = "r7/1p2kp2/1b2p1P1/1P1pP1NK/2nN1P2/2P5/3r4/2R4R b - - 0 37";
        expect(board.loadFen(testPosition)).toBe(true);

        console.log('Complex disambiguation test - Board:', board.getFen());
        console.log('Black rooks on board:', board.board.flat().filter(p => p && p.type === 'r' && p.color === 'b').length);

        // List all black rooks
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const piece = board.board[rank][file];
                if (piece && piece.type === 'r' && piece.color === 'b') {
                    const square = board._coordsToAlgebraic(rank, file);
                    console.log(`Black rook at ${square}`);
                }
            }
        }

        // Test the move that was successful in the logs: rook from a8 to a2
        const raa2Result = board.makeMove('Raa2');
        console.log('Raa2 result:', raa2Result);
        expect(raa2Result).toBe(true); // This was in the logs as successful
    });

    it('should validate FEN consistency after rook moves', () => {
        // Start from the beginning of the problematic sequence
        const startPosition = "r3k2r/1p3p2/4p1p1/bP1pP2p/5P1P/2P2NP1/2nRN1K1/7R b k - 2 28";
        expect(board.loadFen(startPosition)).toBe(true);

        // Make the sequence of moves and check FEN after each
        const moves = ['Ne3+', 'Kf2', 'Bb6', 'Ned4', 'Nc4', 'Rdd1', 'Ra3'];
        const expectedFens = [
            "r3k2r/1p3p2/4p1p1/bP1pP2p/5P1P/2P1nNP1/3RN1K1/7R w k - 3 29",
            "r3k2r/1p3p2/4p1p1/bP1pP2p/5P1P/2P1nNP1/3RNK2/7R b k - 4 29",
            "r3k2r/1p3p2/1b2p1p1/1P1pP2p/5P1P/2P1nNP1/3RNK2/7R w k - 5 30",
            "r3k2r/1p3p2/1b2p1p1/1P1pP2p/3N1P1P/2P1nNP1/3R1K2/7R b k - 6 30",
            "r3k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/2P2NP1/3R1K2/7R w k - 7 31",
            "r3k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/2P2NP1/5K2/3R3R b k - 8 31",
            "4k2r/1p3p2/1b2p1p1/1P1pP2p/2nN1P1P/r1P2NP1/5K2/3R3R w k - 9 32"
        ];

        for (let i = 0; i < moves.length; i++) {
            expect(board.makeMove(moves[i])).toBe(true);
            expect(board.getFen()).toBe(expectedFens[i]);
        }
    });
});

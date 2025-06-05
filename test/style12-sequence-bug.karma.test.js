/**
 * Test to reproduce the exact Style12 sequence that causes FEN mismatch bugs
 * Based on the logs provided by the user
 */

import { onStyle12, gameState, Perspective } from '../scripts/chess.js';
import { ChessBoard, Variant } from '../scripts/ChessBoard.js';
import { style12ToFen } from '../scripts/utils.js';

// Try to import updateBoardFromStyle12 directly if possible
// Note: This might not work if it's not exported, but let's try

describe('Style12 Sequence Bug Reproduction', () => {
    beforeEach(() => {
        // Reset gameState to a clean state
        gameState.chessBoard = null;
        gameState.variant = Variant.CLASSIC;
        gameState.fen = '';
        gameState.lastMovePretty = '';
        gameState.gameNumber = 0;
        gameState.whitePlayer = { name: '', rating: '' };
        gameState.blackPlayer = { name: '', rating: '' };
        gameState.relation = 0;
        gameState.perspective = null;
        gameState.isWhitesMove = true;
        gameState.isWhiteOnBottom = true;
        gameState.style12WhiteOnBottom = true;

        console.log('Test beforeEach - gameState initialized:', {
            chessBoard: gameState.chessBoard,
            variant: gameState.variant,
            fen: gameState.fen,
            lastMovePretty: gameState.lastMovePretty
        });
    });

    it('should parse Style12 messages correctly with style12ToFen', () => {
        // Test that style12ToFen works with our test data
        const style12_1 = '<12> r---k--r -pq-npbp p---p-p- ---pP-P- -------P -N---Q-- PPP--P-- --KR-B-R B -1 0 0 1 1 0 22 VaclavPoh cday 1 5 0 32 32 113 183 17 P/g4-g5 (0:01) g5 1 1 855';

        console.log('Testing style12ToFen with:', style12_1);
        const fen = style12ToFen(style12_1);
        console.log('Parsed FEN:', fen);

        expect(fen).toBeTruthy();
        expect(fen).toContain('r3k2r'); // Should have rooks and king
        expect(fen).toContain(' b '); // Black to move
        expect(fen).toContain(' 17'); // Move 17
    });

    it('should debug the specific FEN mismatch from logs', () => {
        // This is the exact Style12 message that causes the mismatch
        const style12_b5 = '<12> r---k--r --q--pbp p---p-p- -p-p-nP- N------P --P--Q-B PP---P-- --KR---R W 1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 31 32 77 157 21 P/b7-b5 (0:06) b5 1 1 43';

        console.log('=== Debugging FEN mismatch ===');
        console.log('Style12 message:', style12_b5);

        const parsedFen = style12ToFen(style12_b5);
        console.log('Parsed FEN from style12ToFen:', parsedFen);

        // Let's manually parse the board position to see what's happening
        const parts = style12_b5.trim().split(' ');
        console.log('Style12 parts:');
        console.log('  Board rows (1-8):', parts.slice(1, 9));
        console.log('  Active color (9):', parts[9]);
        console.log('  Castling (11-14):', parts[11], parts[12], parts[13], parts[14]);
        console.log('  En passant (10):', parts[10]);
        console.log('  Halfmove (15):', parts[15]);
        console.log('  Fullmove (26):', parts[26]);

        // Create a ChessBoard with this FEN and see what it produces
        const testBoard = new ChessBoard(Variant.CLASSIC, parsedFen);
        const boardFen = testBoard.getFen();
        console.log('ChessBoard FEN after loading:', boardFen);

        // Compare the two FENs
        console.log('FEN comparison:');
        console.log('  style12ToFen:', parsedFen);
        console.log('  ChessBoard:   ', boardFen);
        console.log('  Match:', parsedFen === boardFen);

        // The FENs should match
        expect(parsedFen).toBe(boardFen);
    });

    it('should preserve FINISHED_PLAYING perspective after game ends', () => {
        console.log('=== Testing perspective preservation after game end ===');

        // Set up a game in progress
        gameState.perspective = Perspective.PLAYING;
        gameState.relation = GameRelation.PLAYING_MY_MOVE;
        console.log('Initial perspective:', gameState.perspective);

        // Simulate game ending with checkmate
        gameState.perspective = Perspective.FINISHED_PLAYING;
        console.log('After game end - perspective:', gameState.perspective);

        // Process a Style12 message that might come after the game ends
        const style12_afterGameEnd = '<12> --rrk--- ----R--p --qp-P-B -p--p--- --n-P--P -p------ PPP-Q--- -K-R---- B -1 0 0 0 0 2 7 cday MIHAILOP -1 3 0 20 27 105 74 30 K/h8-g8 (0:03) Kg8 1 1 37';

        console.log('Processing Style12 after game end...');
        onStyle12(style12_afterGameEnd);

        console.log('After Style12 processing - perspective:', gameState.perspective);

        // The perspective should remain FINISHED_PLAYING
        expect(gameState.perspective).toBe(Perspective.FINISHED_PLAYING);
    });

    it('should manually verify Style12 to FEN conversion', () => {
        // Test the problematic Style12 message from the debug output
        const style12 = '<12> r---k--r -pq--pbp p---p-p- -p-p-nP- N------P --P--Q-B PP---P-- --KR---R W 1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 31 32 77 157 21 P/b7-b5 (0:06) b5 1 1 43';

        console.log('=== Manual Style12 to FEN verification ===');
        console.log('Style12:', style12);

        const parts = style12.trim().split(' ');
        console.log('Parts length:', parts.length);
        console.log('Board rows (parts 1-8):', parts.slice(1, 9));
        console.log('Active color (part 9):', parts[9]);
        console.log('En passant file (part 10):', parts[10]);
        console.log('Castling rights (parts 11-14):', parts.slice(11, 15));
        console.log('Halfmove clock (part 15):', parts[15]);
        console.log('Fullmove number (part 26):', parts[26]);

        const fen = style12ToFen(style12);
        console.log('Generated FEN:', fen);

        // Expected FEN based on manual conversion:
        // Board: r---k--r / -pq--pbp / p---p-p- / -p-p-nP- / N------P / --P--Q-B / PP---P-- / --KR---R
        // Should be: r3k2r/1pq2pbp/p3p1p1/1p1p1nP1/N6P/2P2Q1B/PP3P2/2KR3R
        // Active: W -> w
        // Castling: 0 0 1 1 -> kq (Black kingside and queenside)
        // En passant: 1 -> b6 (file 1=b, White to move so rank 6)
        // Halfmove: 0
        // Fullmove: 21
        const expectedFen = 'r3k2r/1pq2pbp/p3p1p1/1p1p1nP1/N6P/2P2Q1B/PP3P2/2KR3R w kq b6 0 21';

        console.log('Expected FEN:', expectedFen);
        console.log('FEN matches:', fen === expectedFen);

        expect(fen).toBe(expectedFen);
    });

    it('should debug onStyle12 function behavior', () => {
        console.log('=== Debugging onStyle12 function ===');

        // Check initial gameState
        console.log('Initial gameState:', {
            fen: gameState.fen,
            lastMovePretty: gameState.lastMovePretty,
            chessBoard: gameState.chessBoard,
            variant: gameState.variant
        });

        // Test a simple Style12 message
        const style12_1 = '<12> r---k--r -pq-npbp p---p-p- ---pP-P- -------P -N---Q-- PPP--P-- --KR-B-R B -1 0 0 1 1 0 22 VaclavPoh cday 1 5 0 32 32 113 183 17 P/g4-g5 (0:01) g5 1 1 855';

        console.log('Calling onStyle12 with:', style12_1);
        onStyle12(style12_1);

        console.log('After onStyle12 call - gameState:', {
            fen: gameState.fen,
            lastMovePretty: gameState.lastMovePretty,
            chessBoard: gameState.chessBoard ? 'exists' : 'null',
            variant: gameState.variant,
            gameNumber: gameState.gameNumber,
            whitePlayer: gameState.whitePlayer,
            blackPlayer: gameState.blackPlayer
        });

        // The gameState should be updated after calling onStyle12
        expect(gameState.fen).toBeTruthy();
        expect(gameState.lastMovePretty).toBe('g5');
        expect(gameState.chessBoard).not.toBeNull();
    });

    it('should reproduce the Qxe5 FEN mismatch bug', () => {
        console.log('=== Starting Style12 sequence reproduction ===');

        // First Style12 message - position before Qxe5
        const style12_1 = '<12> r---k--r -pq-npbp p---p-p- ---pP-P- -------P -N---Q-- PPP--P-- --KR-B-R B -1 0 0 1 1 0 22 VaclavPoh cday 1 5 0 32 32 113 183 17 P/g4-g5 (0:01) g5 1 1 855';

        console.log('Processing first Style12 message...');
        onStyle12(style12_1);

        console.log('After first Style12:');
        console.log('  gameState.fen:', gameState.fen);
        console.log('  chessBoard.getFen():', gameState.chessBoard ? gameState.chessBoard.getFen() : 'null');
        console.log('  lastMovePretty:', gameState.lastMovePretty);

        // Verify the board state is correct after first message
        expect(gameState.chessBoard).not.toBeNull();
        expect(gameState.lastMovePretty).toBe('g5');

        // Second Style12 message - the problematic Qxe5 move
        const style12_2 = '<12> r---k--r -p--npbp p---p-p- ---pq-P- -------P -N---Q-- PPP--P-- --KR-B-R W -1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 31 32 113 181 18 Q/c7-e5 (0:01) Qxe5 1 1 42';

        console.log('Processing second Style12 message (Qxe5)...');
        onStyle12(style12_2);

        console.log('After second Style12:');
        console.log('  gameState.fen:', gameState.fen);
        console.log('  chessBoard.getFen():', gameState.chessBoard ? gameState.chessBoard.getFen() : 'null');
        console.log('  lastMovePretty:', gameState.lastMovePretty);
        console.log('  FEN match:', gameState.fen === gameState.chessBoard.getFen());

        // This is where the bug should manifest
        expect(gameState.chessBoard).not.toBeNull();
        expect(gameState.lastMovePretty).toBe('Qxe5');

        // The key assertion - FEN should match
        expect(gameState.fen).toBe(gameState.chessBoard.getFen());

        // Verify the board is not reset to starting position
        expect(gameState.chessBoard.getFen()).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('should reproduce the Nf5 FEN mismatch bug', () => {
        console.log('=== Starting Nf5 sequence reproduction ===');

        // Set up the position before Nf5
        const style12_1 = '<12> r---k--r -p--npbp p---p-p- ---pq-P- -------P -NP--Q-- PP---P-- --KR-B-R B -1 0 0 1 1 0 22 VaclavPoh cday 1 5 0 31 32 99 181 18 P/c2-c3 (0:14) c3 1 1 424';

        console.log('Processing setup Style12 message...');
        onStyle12(style12_1);

        console.log('After setup:');
        console.log('  gameState.fen:', gameState.fen);
        console.log('  chessBoard.getFen():', gameState.chessBoard ? gameState.chessBoard.getFen() : 'null');

        // The problematic Nf5 move
        const style12_2 = '<12> r---k--r -p---pbp p---p-p- ---pqnP- -------P -NP--Q-- PP---P-- --KR-B-R W -1 0 0 1 1 1 22 VaclavPoh cday -1 5 0 31 32 99 174 19 N/e7-f5 (0:08) Nf5 1 1 42';

        console.log('Processing Nf5 Style12 message...');
        onStyle12(style12_2);

        console.log('After Nf5:');
        console.log('  gameState.fen:', gameState.fen);
        console.log('  chessBoard.getFen():', gameState.chessBoard ? gameState.chessBoard.getFen() : 'null');
        console.log('  lastMovePretty:', gameState.lastMovePretty);
        console.log('  FEN match:', gameState.fen === gameState.chessBoard.getFen());

        // Verify the move was processed correctly
        expect(gameState.lastMovePretty).toBe('Nf5');
        expect(gameState.fen).toBe(gameState.chessBoard.getFen());
        expect(gameState.chessBoard.getFen()).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('should reproduce the bxa4 FEN mismatch bug', () => {
        console.log('=== Starting bxa4 sequence reproduction ===');

        // Set up the position before bxa4
        const style12_1 = '<12> r---k--r -pq--pbp p---p-p- -p-p-nP- N------P --P--Q-B PP---P-- --KR---R W 1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 31 32 77 157 21 P/b7-b5 (0:06) b5 1 1 43';

        console.log('Processing setup Style12 message...');
        onStyle12(style12_1);

        // The problematic bxa4 move
        const style12_2 = '<12> r---k--r --q--pbp p---p-p- ---p-nP- p------P --P--Q-B PP---P-- --KR---R W -1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 28 32 60 155 22 P/b5-a4 (0:02) bxa4 1 1 41';

        console.log('Processing bxa4 Style12 message...');
        onStyle12(style12_2);

        console.log('After bxa4:');
        console.log('  gameState.fen:', gameState.fen);
        console.log('  chessBoard.getFen():', gameState.chessBoard ? gameState.chessBoard.getFen() : 'null');
        console.log('  lastMovePretty:', gameState.lastMovePretty);
        console.log('  FEN match:', gameState.fen === gameState.chessBoard.getFen());

        // Verify the move was processed correctly
        expect(gameState.lastMovePretty).toBe('bxa4');
        expect(gameState.fen).toBe(gameState.chessBoard.getFen());
        expect(gameState.chessBoard.getFen()).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('should reproduce the complete sequence leading to board corruption', () => {
        console.log('=== Starting complete sequence reproduction ===');

        // Process the complete sequence from the logs
        const style12Messages = [
            '<12> r---k--r -pq-npbp p---p-p- ---pP-P- -------P -N---Q-- PPP--P-- --KR-B-R B -1 0 0 1 1 0 22 VaclavPoh cday 1 5 0 32 32 113 183 17 P/g4-g5 (0:01) g5 1 1 855',
            '<12> r---k--r -p--npbp p---p-p- ---pq-P- -------P -N---Q-- PPP--P-- --KR-B-R W -1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 31 32 113 181 18 Q/c7-e5 (0:01) Qxe5 1 1 42',
            '<12> r---k--r -p--npbp p---p-p- ---pq-P- -------P -NP--Q-- PP---P-- --KR-B-R B -1 0 0 1 1 0 22 VaclavPoh cday 1 5 0 31 32 99 181 18 P/c2-c3 (0:14) c3 1 1 424',
            '<12> r---k--r -p---pbp p---p-p- ---pqnP- -------P -NP--Q-- PP---P-- --KR-B-R W -1 0 0 1 1 1 22 VaclavPoh cday -1 5 0 31 32 99 174 19 N/e7-f5 (0:08) Nf5 1 1 42',
            '<12> r---k--r -pq--pbp p---p-p- --NpqnP- -------P --P--Q-- PP---P-- --KR-B-R B -1 0 0 1 1 2 22 VaclavPoh cday 1 5 0 31 32 92 174 19 N/b3-c5 (0:07) Nc5 1 1 1090'
        ];

        for (let i = 0; i < style12Messages.length; i++) {
            console.log(`Processing Style12 message ${i + 1}...`);
            onStyle12(style12Messages[i]);

            console.log(`After message ${i + 1}:`);
            console.log(`  gameState.fen: ${gameState.fen}`);
            console.log(`  chessBoard.getFen(): ${gameState.chessBoard ? gameState.chessBoard.getFen() : 'null'}`);
            console.log(`  lastMovePretty: ${gameState.lastMovePretty}`);
            console.log(`  FEN match: ${gameState.fen === gameState.chessBoard.getFen()}`);

            // Each step should maintain FEN consistency
            expect(gameState.chessBoard).not.toBeNull();
            expect(gameState.fen).toBe(gameState.chessBoard.getFen());
            expect(gameState.chessBoard.getFen()).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        }
    });

    it('should handle the exact sequence that causes board reset to starting position', () => {
        console.log('=== Testing board reset scenario ===');

        // Start with a complex position
        const style12_1 = '<12> r---k--r --q--pbp p---p-p- -p-p-nP- N------P --P--Q-B PP---P-- --KR---R W 1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 31 32 77 157 21 P/b7-b5 (0:06) b5 1 1 43';

        onStyle12(style12_1);
        const fenAfterFirst = gameState.chessBoard.getFen();
        console.log('Position after first message:', fenAfterFirst);

        // The move that causes the issue
        const style12_2 = '<12> r---k--r --q--pbp p---p-p- ---p-nP- p------P --P--Q-B PP---P-- --KR---R W -1 0 0 1 1 0 22 VaclavPoh cday -1 5 0 28 32 60 155 22 P/b5-a4 (0:02) bxa4 1 1 41';

        onStyle12(style12_2);
        const fenAfterSecond = gameState.chessBoard.getFen();
        console.log('Position after second message:', fenAfterSecond);

        // Check if the board got reset to starting position (this is the bug)
        const startingPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

        if (fenAfterSecond === startingPosition) {
            console.error('BUG REPRODUCED: Board was reset to starting position!');
            console.error('Expected FEN:', gameState.fen);
            console.error('Actual board FEN:', fenAfterSecond);

            // This should fail if the bug is reproduced
            expect(fenAfterSecond).not.toBe(startingPosition);
        } else {
            console.log('Board state maintained correctly');
            expect(gameState.fen).toBe(fenAfterSecond);
        }
    });
});

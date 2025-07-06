import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-005 - Trace move generation', () => {
    it('should trace where Kf6 is being filtered', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // Set up the position directly
        const fen = 'K7/4pk2/3p4/1p4P1/8/8/1PPPPP2/1NBQKBN1 b - - 0 17';
        api.loadFen(fen);
        
        console.log("Position:", fen);
        console.log("\nActive color:", api.getActiveColor());
        
        // Access internal methods for debugging
        const apiAny = api as any;
        
        // First, let's manually generate moves for the King
        const kingCoords = {row: 6, col: 5}; // f7
        const kingPiece = {type: 'k', color: 'b'};
        
        // Import the MoveGenerator
        const { MoveGenerator } = require('../ChessAPI.moveGeneration');
        
        const context = {
            board: apiAny.board,
            activeColor: 'b',
            castlingRights: apiAny.castlingRights,
            enPassantTarget: apiAny.enPassantTarget,
            variant: Variant.SUICIDE
        };
        
        console.log("\n1. Generating raw moves from MoveGenerator:");
        const rawMoves = MoveGenerator.generatePieceMoves(context, kingCoords, kingPiece);
        console.log("Raw moves from King:", rawMoves);
        
        // Check if f6 is in the raw moves
        const f6InRaw = rawMoves.find((m: any) => m.to === 'f6');
        console.log("\nIs f6 in raw moves?", f6InRaw ? "YES" : "NO");
        
        // Now let's see what getLegalMoves returns for f7
        console.log("\n2. Getting legal moves from f7:");
        const legalMovesFromF7 = api.getLegalMoves('f7');
        console.log("Legal moves from f7:", legalMovesFromF7.map(m => m.san));
        
        // Check if Kf6 is in legal moves
        const kf6InLegal = legalMovesFromF7.find(m => m.to === 'f6');
        console.log("\nIs Kf6 in legal moves from f7?", kf6InLegal ? "YES" : "NO");
        
        // Let's also check ALL legal moves for Black
        console.log("\n3. Getting ALL legal moves for Black:");
        const allLegalMoves = api.getLegalMoves();
        console.log("Total legal moves:", allLegalMoves.length);
        console.log("All moves:", allLegalMoves.map(m => m.san));
        
        // Check if any King moves are present
        const kingMoves = allLegalMoves.filter(m => m.from === 'f7');
        console.log("\nKing moves in all legal moves:", kingMoves.map(m => m.san));
        
        // Let's see if there are any captures
        const captures = allLegalMoves.filter(m => m.isCapture());
        console.log("\nCaptures available:", captures.map(m => m.san));
        
        // Now let's manually check if moving to f6 would leave king in check
        console.log("\n4. Checking if Kf6 would leave king in check:");
        const testBoard = JSON.parse(JSON.stringify(apiAny.board));
        testBoard[5][5] = testBoard[6][5]; // Move king to f6
        testBoard[6][5] = null;
        
        const { MoveValidator } = require('../ChessAPI.validation');
        const inCheck = MoveValidator.isKingInCheck(testBoard, 'b', Variant.SUICIDE);
        console.log("Would Kf6 leave king in check?", inCheck ? "YES" : "NO");
    });
});
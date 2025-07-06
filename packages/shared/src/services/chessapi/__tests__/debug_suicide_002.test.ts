import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-002 - King capture', () => {
    it('should debug why King cannot capture pawn', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // Set up the position directly
        const fen = 'K7/4pk2/3p4/1p4P1/8/8/1PPPPP2/1NBQKBN1 b - - 0 17';
        api.loadFen(fen);
        
        console.log("Position:", fen);
        console.log("\nActive color:", api.getActiveColor());
        
        // Get the king position
        const kingPiece = api.getPiece('f7');
        console.log("\nKing on f7:", kingPiece);
        
        // Get the pawn position
        const pawnPiece = api.getPiece('g5');
        console.log("Pawn on g5:", pawnPiece);
        
        // Get all legal moves from f7
        console.log("\nAll legal moves from f7:");
        const movesFromF7 = api.getLegalMoves('f7');
        movesFromF7.forEach(move => {
            console.log(`  ${move.san} (${move.from} -> ${move.to})`);
        });
        
        // Check if Kxg5 is in the moves
        const kxg5 = movesFromF7.find(m => m.to === 'g5');
        if (kxg5) {
            console.log("\nKxg5 IS in the moves from f7!");
        } else {
            console.log("\nKxg5 is NOT in the moves from f7!");
        }
        
        // Now check all legal moves for the position
        console.log("\nAll legal moves for Black:");
        const allMoves = api.getLegalMoves();
        allMoves.forEach(move => {
            console.log(`  ${move.san} (${move.from} -> ${move.to})`);
        });
        
        // Check if there are any captures
        const captures = allMoves.filter(m => m.isCapture());
        console.log(`\nTotal captures available: ${captures.length}`);
        if (captures.length > 0) {
            console.log("Captures:");
            captures.forEach(move => {
                console.log(`  ${move.san} (${move.from} -> ${move.to})`);
            });
        }
        
        // Try to manually check surrounding squares
        console.log("\nManually checking squares around King:");
        const surroundingSquares = ['e8', 'f8', 'g8', 'e7', 'g7', 'e6', 'f6', 'g6'];
        surroundingSquares.forEach(sq => {
            const piece = api.getPiece(sq);
            console.log(`  ${sq}: ${piece ? JSON.stringify(piece) : 'empty'}`);
        });
        
        // Check g5 specifically
        console.log("\nChecking g5 specifically:");
        const g5Piece = api.getPiece('g5');
        console.log(`  g5: ${g5Piece ? JSON.stringify(g5Piece) : 'empty'}`);
    });
});
import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-008 - Carefully examine position', () => {
    it('should carefully check the failing position', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // This is the exact position where Kf6 fails
        const fen = 'K7/4pk2/3p4/1p4P1/8/8/1PPPPP2/1NBQKBN1 b - - 0 17';
        api.loadFen(fen);
        
        console.log("FEN:", fen);
        console.log("\nDetailed board analysis:");
        
        // Let's print the board with coordinates
        const board = (api as any).board;
        console.log("\n  a b c d e f g h");
        for (let row = 7; row >= 0; row--) {
            let line = `${row + 1} `;
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (!piece) {
                    line += '. ';
                } else {
                    const char = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
                    line += char + ' ';
                }
            }
            line += ` ${row + 1}`;
            console.log(line);
        }
        console.log("  a b c d e f g h");
        
        // Let's check each piece explicitly
        console.log("\nPiece positions:");
        console.log("White King on a8:", api.getPiece('a8'));
        console.log("Black pawn on e7:", api.getPiece('e7'));
        console.log("Black King on f7:", api.getPiece('f7'));
        console.log("Black pawn on d6:", api.getPiece('d6'));
        console.log("Black pawn on b5:", api.getPiece('b5'));
        console.log("White PAWN on g5:", api.getPiece('g5'));
        
        // Wait, let me double-check g5
        const g5Coords = {row: 4, col: 6}; // g=6, 5=4 (0-indexed)
        console.log("\nDouble-checking g5 (row 4, col 6):", board[4][6]);
        
        // Check f6
        console.log("\nWhat's on f6?", api.getPiece('f6'));
        const f6Coords = {row: 5, col: 5}; // f=5, 6=5 (0-indexed)
        console.log("f6 (row 5, col 5):", board[5][5]);
        
        // Now let's think about Suicide rules
        console.log("\n=== SUICIDE VARIANT RULES ===");
        console.log("1. If you have a capture available, you MUST capture");
        console.log("2. The goal is to lose all your pieces");
        console.log("3. The King is just another piece - it CAN be captured");
        console.log("4. You can move into check");
        console.log("5. There is no concept of checkmate");
        
        console.log("\n=== KEY QUESTION ===");
        console.log("In Suicide chess, can you move your King into check?");
        console.log("Answer: YES! The King is just a regular piece in Suicide.");
        
        // Let's check if our implementation allows moving into check
        console.log("\n=== CHECKING OUR IMPLEMENTATION ===");
        
        // Get all moves from f7
        const movesFromF7 = api.getLegalMoves('f7');
        console.log("\nMoves from f7:", movesFromF7.map(m => m.san));
        
        // Is Kf6 in the list?
        const hasKf6 = movesFromF7.some(m => m.san === 'Kf6' || m.to === 'f6');
        console.log("Is Kf6 in the legal moves?", hasKf6);
        
        // Let's check what our validation says
        const { MoveValidator } = require('../ChessAPI.validation');
        
        // Test if moving to f6 would put king in check
        const testBoard = JSON.parse(JSON.stringify(board));
        testBoard[5][5] = testBoard[6][5]; // Move king to f6
        testBoard[6][5] = null;
        
        const inCheck = MoveValidator.isKingInCheck(testBoard, 'b', Variant.SUICIDE);
        console.log("\nWould Kf6 put Black King in check?", inCheck);
        
        console.log("\n=== THE PROBLEM ===");
        console.log("Our implementation is preventing moves into check even in Suicide variant!");
        console.log("But in Suicide, the King should be allowed to move into check.");
    });
});
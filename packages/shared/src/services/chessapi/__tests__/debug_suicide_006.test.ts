import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-006 - Find attacking piece', () => {
    it('should find what attacks f6', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // Set up the position directly
        const fen = 'K7/4pk2/3p4/1p4P1/8/8/1PPPPP2/1NBQKBN1 b - - 0 17';
        api.loadFen(fen);
        
        console.log("Position:", fen);
        
        // Let's visualize the full board
        console.log("\nFull board:");
        const board = (api as any).board;
        for (let row = 7; row >= 0; row--) {
            let line = `${row + 1}: `;
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (!piece) {
                    line += '. ';
                } else {
                    const char = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
                    line += char + ' ';
                }
            }
            console.log(line);
        }
        console.log("   a b c d e f g h");
        
        // Check what white pieces can attack f6
        console.log("\nChecking what white pieces can attack f6:");
        
        const { MoveValidator } = require('../ChessAPI.validation');
        
        // Check all white pieces
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === 'w') {
                    const file = String.fromCharCode('a'.charCodeAt(0) + col);
                    const rank = row + 1;
                    const square = `${file}${rank}`;
                    
                    // Check if this piece can attack f6
                    const canAttack = MoveValidator.canPieceAttackSquare(
                        board,
                        {row, col},
                        {row: 5, col: 5}, // f6
                        piece,
                        Variant.SUICIDE
                    );
                    
                    if (canAttack) {
                        console.log(`  ${piece.type.toUpperCase()} on ${square} CAN attack f6`);
                    }
                }
            }
        }
        
        // Let's specifically check the white King on a8
        console.log("\nSpecifically checking white King on a8:");
        const whiteKing = board[7][0];
        console.log("White King:", whiteKing);
        console.log("Can it attack f6?", MoveValidator.canPieceAttackSquare(
            board,
            {row: 7, col: 0}, // a8
            {row: 5, col: 5}, // f6
            whiteKing,
            Variant.SUICIDE
        ));
        
        // Let's check the distance
        console.log("\nDistance from a8 to f6:");
        console.log("Row difference:", Math.abs(7 - 5));
        console.log("Col difference:", Math.abs(0 - 5));
        console.log("King can only move 1 square, so this should be NO");
        
        // Let's check if there's a pawn giving check
        console.log("\nChecking pawn on g5:");
        const g5Piece = api.getPiece('g5');
        console.log("Piece on g5:", g5Piece);
        
        // A pawn on g5 can attack f6 diagonally!
        console.log("\nCan white pawn on g5 attack f6?");
        console.log("Pawn attacks diagonally, g5 to f6 is one square diagonal - YES!");
    });
});
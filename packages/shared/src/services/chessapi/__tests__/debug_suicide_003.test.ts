import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-003 - Direct move generation', () => {
    it('should check move generation directly', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // Set up the position directly
        const fen = 'K7/4pk2/3p4/1p4P1/8/8/1PPPPP2/1NBQKBN1 b - - 0 17';
        api.loadFen(fen);
        
        console.log("Position:", fen);
        
        // Let's calculate what g5 is in coordinates
        // g = column 6 (0-indexed), 5 = row 4 (0-indexed)
        console.log("\nCoordinate calculation:");
        console.log("g5 = column", 'g'.charCodeAt(0) - 'a'.charCodeAt(0), "row", 5 - 1);
        console.log("f7 = column", 'f'.charCodeAt(0) - 'a'.charCodeAt(0), "row", 7 - 1);
        
        // Check what's on the board at these positions
        const board = (api as any).board;
        console.log("\nBoard positions:");
        console.log("board[6][5] (f7):", board[6][5]); // f7
        console.log("board[4][6] (g5):", board[4][6]); // g5
        
        // Wait, let me double-check the coordinates
        // In chess, row 1 is index 0, row 8 is index 7
        // So f7 = column 5, row 6
        // And g5 = column 6, row 4
        console.log("\nCorrected coordinates:");
        console.log("f7 should be at board[6][5]");
        console.log("g5 should be at board[4][6]");
        
        // Let's check all squares to find where the pieces actually are
        console.log("\nScanning board for king and pawn:");
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    if ((piece.type === 'k' && piece.color === 'b') || 
                        (piece.type === 'p' && piece.color === 'w' && row >= 3 && row <= 5)) {
                        const file = String.fromCharCode('a'.charCodeAt(0) + col);
                        const rank = row + 1;
                        console.log(`  ${file}${rank} (board[${row}][${col}]):`, piece);
                    }
                }
            }
        }
        
        // Now let's manually check the distance between f7 and g5
        // f7 = (6, 5), g5 = (4, 6)
        const f7 = {row: 6, col: 5};
        const g5 = {row: 4, col: 6};
        console.log("\nDistance check:");
        console.log(`Row diff: ${Math.abs(f7.row - g5.row)}`);
        console.log(`Col diff: ${Math.abs(f7.col - g5.col)}`);
        console.log(`King can move one square, so max diff should be 1`);
        
        // The problem is clear! The distance from f7 to g5 is 2 rows!
        // f7 (row 6) to g5 (row 4) is 2 squares vertically
        // So the King cannot reach g5 in one move
        
        // Let's check f6 instead
        const f6 = {row: 5, col: 5};
        console.log("\nDistance from f7 to f6:");
        console.log(`Row diff: ${Math.abs(f7.row - f6.row)}`);
        console.log(`Col diff: ${Math.abs(f7.col - f6.col)}`);
        
        // And from f6 to g5
        console.log("\nDistance from f6 to g5:");
        console.log(`Row diff: ${Math.abs(f6.row - g5.row)}`);
        console.log(`Col diff: ${Math.abs(f6.col - g5.col)}`);
    });
});
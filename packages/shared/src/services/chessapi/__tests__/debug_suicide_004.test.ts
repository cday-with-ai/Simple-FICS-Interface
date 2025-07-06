import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-004 - Check f6', () => {
    it('should check what is on f6', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // Set up the position directly
        const fen = 'K7/4pk2/3p4/1p4P1/8/8/1PPPPP2/1NBQKBN1 b - - 0 17';
        api.loadFen(fen);
        
        console.log("Position:", fen);
        console.log("\nActive color:", api.getActiveColor());
        
        // Check what's on f6
        const f6Piece = api.getPiece('f6');
        console.log("\nPiece on f6:", f6Piece);
        
        // Check Kf6 specifically
        const allMoves = api.getLegalMoves();
        const kf6Move = allMoves.find(m => m.san === 'Kf6' || (m.from === 'f7' && m.to === 'f6'));
        console.log("\nIs Kf6 in legal moves?", kf6Move ? "YES" : "NO");
        
        // Let's visualize the board
        console.log("\nBoard visualization (ranks 8-5):");
        const board = (api as any).board;
        for (let row = 7; row >= 4; row--) {
            let line = `${row + 1}: `;
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (!piece) {
                    line += '. ';
                } else {
                    const char = piece.color === 'w' ? piece.type.toUpperCase() : piece.type;
                    line += char + ' ';
                }
            }
            console.log(line);
        }
        
        // Let's check if there are ANY captures available
        console.log("\nChecking all pieces for captures:");
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === 'b') {
                    const from = String.fromCharCode('a'.charCodeAt(0) + col) + (row + 1);
                    const moves = api.getLegalMoves(from);
                    const captures = moves.filter(m => m.isCapture());
                    if (captures.length > 0) {
                        console.log(`  ${from} (${piece.type}) can capture:`, captures.map(m => m.san).join(', '));
                    }
                }
            }
        }
        
        // Now the key question: are there ANY captures available for Black?
        const captures = allMoves.filter(m => m.isCapture());
        console.log(`\nTotal captures available for Black: ${captures.length}`);
        
        // If there are no captures, then all moves should be allowed
        // If there ARE captures, then ONLY captures should be allowed
        console.log("\nSince there are no captures, Kf6 should be allowed!");
        console.log("But it's not in the legal moves list.");
        
        // Let's try making the move directly
        console.log("\nTrying to make Kf6 directly:");
        const result = api.makeMove('Kf6');
        console.log("Result:", result ? "Success" : "Failed");
    });
});
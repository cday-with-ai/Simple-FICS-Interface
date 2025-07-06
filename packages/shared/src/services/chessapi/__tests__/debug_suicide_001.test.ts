import { ChessAPI, Variant } from '../ChessAPI';

describe('Debug Suicide-001', () => {
    it('should debug move 34 (Kd2)', () => {
        const api = new ChessAPI(Variant.SUICIDE);
        
        // Moves from the game up to move 33
        const moves = [
            'h3', 'Nh6', 'a3', 'Ng4', 'hxg4', 'f5', 'gxf5', 'g6', 'fxg6', 'hxg6',
            'Rxh8', 'Na6', 'Rxf8', 'Kxf8', 'Ra2', 'Nb4', 'axb4', 'c5', 'Rxa7', 'Rxa7',
            'bxc5', 'Qb6', 'cxb6', 'd6', 'bxa7', 'Bh3', 'gxh3', 'b5', 'a8=K', 'Kf7',
            'h4', 'g5', 'hxg5', 'Kf6', 'gxf6', 'exf6', 'Nh3', 'f5', 'Ng1', 'f4',
            'Ka7', 'f3', 'Nxf3', 'd5', 'Nh4', 'd4', 'd3', 'b4', 'Nc3', 'bxc3',
            'bxc3', 'dxc3', 'Bb2', 'cxb2', 'Qa1', 'bxa1=B', 'd4', 'Bxd4', 'f4', 'Bxa7',
            'e3', 'Bxe3', 'c3', 'Bxf4'
        ];
        
        console.log("Playing moves up to move 33...");
        
        // Play only up to move 33 (Kf6 is move 34)
        for (let i = 0; i < 33; i++) {
            const move = moves[i];
            try {
                const result = api.makeMove(move);
                if (!result) {
                    throw new Error(`Move ${i + 1} (${move}) failed`);
                }
            } catch (error) {
                console.error(`Failed at move ${i + 1} (${move}):`, error);
                console.error(`Position: ${api.getFen()}`);
                console.error(`Legal moves:`, api.getLegalMoves().map(m => m.san));
                throw error;
            }
        }
        
        console.log("\nPosition after move 33 (hxg5):");
        console.log(api.getFen());
        
        console.log("\nActive color:", api.getActiveColor());
        
        // Next move should be Kf6 (Black's move 34)
        console.log("\nTrying to make Black's move 34: Kf6...");
        
        // Get all legal moves
        console.log("\nAll legal moves:");
        const legalMoves = api.getLegalMoves();
        legalMoves.forEach(move => {
            console.log(`  ${move.san} (${move.from} -> ${move.to})`);
        });
        
        // Check if there are any captures available (required in Suicide)
        const captures = legalMoves.filter(m => m.isCapture());
        console.log(`\nCapture moves available: ${captures.length}`);
        if (captures.length > 0) {
            console.log("Captures:");
            captures.forEach(move => {
                console.log(`  ${move.san} (${move.from} -> ${move.to})`);
            });
        }
        
        // Check if Kf6 is available (it should capture the pawn on g5)
        const kf6Move = legalMoves.find(m => m.san === 'Kf6' || (m.from === 'f7' && m.to === 'f6'));
        if (kf6Move) {
            console.log("\nKf6 is in legal moves!");
        } else {
            console.log("\nKf6 is NOT in legal moves");
            console.log("But there's a white pawn on g5, so Kxg5 should be available");
            
            // Check the board position
            const g5Piece = api.getPiece('g5');
            console.log("\nPiece on g5:", g5Piece);
            
            // Look for Kxg5
            const kxg5Move = legalMoves.find(m => m.san === 'Kxg5' || (m.from === 'f7' && m.to === 'g5'));
            if (kxg5Move) {
                console.log("Kxg5 is available!");
            }
        }
        
        // Try to make the correct move
        console.log("\nTrying to make move Kf6...");
        try {
            const result = api.makeMove('Kf6');
            if (result) {
                console.log("Move succeeded!");
            } else {
                console.log("Move failed - returned null");
                // Try Kxg5 instead
                console.log("\nTrying Kxg5 instead...");
                const result2 = api.makeMove('Kxg5');
                if (result2) {
                    console.log("Kxg5 succeeded!");
                } else {
                    console.log("Kxg5 also failed");
                }
            }
        } catch (error) {
            console.log("Move failed with error:", error);
        }
    });
});
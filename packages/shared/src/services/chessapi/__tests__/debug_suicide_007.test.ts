import { ChessAPI, Variant } from '../ChessAPI';
import { getTestGamesByVariant } from './testGames';

describe('Debug Suicide-007 - Test specific suicide game', () => {
    it('should debug suicide-001 failure', () => {
        const suicideGames = getTestGamesByVariant('SUICIDE');
        console.log(`Found ${suicideGames.length} suicide test games`);
        
        if (suicideGames.length === 0) {
            console.log("No suicide games found!");
            return;
        }
        
        const game = suicideGames[0]; // suicide-001
        console.log("\nGame ID:", game.id);
        console.log("PGN:", game.pgn);
        console.log("Expected moves:", game.expectedMoveCount);
        
        const api = new ChessAPI(Variant.SUICIDE);
        const moves = game.pgn.split(/\s+/);
        
        let moveCount = 0;
        let lastPosition = api.getFen();
        
        for (const moveStr of moves) {
            // Skip move numbers and result
            if (/^\d+\./.test(moveStr) || moveStr === game.expectedResult) {
                continue;
            }
            
            console.log(`\nMove ${moveCount + 1}: ${moveStr}`);
            console.log("Position before:", lastPosition);
            
            const move = api.makeMove(moveStr);
            if (!move) {
                console.log("FAILED TO MAKE MOVE!");
                console.log("Legal moves:", api.getLegalMoves().map(m => m.san));
                
                // Check if this is a forced capture situation
                const allMoves = api.getLegalMoves();
                const captures = allMoves.filter(m => m.isCapture());
                console.log("Available captures:", captures.map(m => m.san));
                console.log("Total legal moves:", allMoves.length);
                
                break;
            }
            
            moveCount++;
            lastPosition = api.getFen();
            console.log("Position after:", lastPosition);
            console.log("Move successful:", move.san);
        }
        
        console.log(`\nCompleted ${moveCount} moves out of ${game.expectedMoveCount} expected`);
    });
});
// Use ts-node to run TypeScript directly
require('ts-node/register');
const { ChessAPI, Variant } = require('./src/services/ChessAPI/ChessAPI.ts');

// Test the specific failing game
const pgn = "1. c4 e6 2. Nc3 Nc6 3. d4 Nf6 4. Nf3 Be7 5. Bg5 O-O 6. e4 d5 7. Bxf6 Bxf6 8. cxd5 exd5 9. Nxd5 Bg4 10. Nxf6+ Qxf6 11. N@d5 Qe6 12. Nc3 P@b4 13. B@d5 Qe8 14. Bxc6 bxc6 15. P@b7 Rd8 16. N@e2 bxc3 17. Nxc3 Bxf3 18. gxf3 N@h4 19. P@g2 N@f4 20. Rg1 c5 21. B@a4 c6 22. Bxc6 Qxc6 23. P@e7 cxd4 24. exd8=Q Rxd8 25. P@e7 B@b4 26. exd8=Q+ B@f8 27. b8=Q P@e3 28. Qxf4 exf2+ 29. Kxf2 B@e3+ 30. Qxe3 dxe3+ 31. Kxe3 Bc5+ 32. P@d4 P@f4+ 33. Kd2 P@e3+ 34. Kc1 P@d2+ 35. Kb1 Be7 36. Qd5 Qxd5 37. Nxd5 N@f2 38. Nxe7+ Bxe7 39. Q@e8+ N@f8 40. Bc4 P@e6 41. N@e5 h6 42. Qxf7+ Kh7 43. R@g8 Nhg6 44. Qxg7# {Black checkmated}";

function parsePGNMoves(pgn) {
  // Extract termination comments before removing them
  const terminationComments = [];
  let cleanPgn = pgn.replace(/\{[^}]*\}/g, (match) => {
    // Check if this looks like a termination comment
    if (match.toLowerCase().includes('resign') || 
        match.toLowerCase().includes('forfeit') || 
        match.toLowerCase().includes('abort') ||
        match.toLowerCase().includes('disconnect') ||
        match.toLowerCase().includes('time') ||
        match.toLowerCase().includes('wins by') ||
        match.toLowerCase().includes('loses by') ||
        match.toLowerCase().includes('material') ||
        match.toLowerCase().includes('checkmate') ||
        match.toLowerCase().includes('stalemate')) {
      terminationComments.push(match);
    }
    return '';
  });
  
  // Remove other comments and variations
  cleanPgn = cleanPgn.replace(/\([^)]*\)/g, '');
  
  // Remove game termination markers
  cleanPgn = cleanPgn.replace(/1-0|0-1|1\/2-1\/2|\*/g, '');
  
  // Split by move numbers and flatten
  const moves = [];
  const tokens = cleanPgn.split(/\s+/);
  
  tokens.forEach(token => {
    // Skip empty tokens
    if (!token) {
      return;
    }
    
    // Skip result markers
    if (['1-0', '0-1', '1/2-1/2', '*'].includes(token)) {
      return;
    }
    
    // Handle tokens like "1.e4" by extracting just the move part
    if (/^\d+\./.test(token)) {
      const move = token.replace(/^\d+\./, '');
      if (move) {
        moves.push(move);
      }
      return;
    }
    
    moves.push(token);
  });
  
  // Add termination comments at the end
  moves.push(...terminationComments);
  
  return moves;
}

console.log("Testing Crazyhouse game...");
const api = new ChessAPI(Variant.CRAZYHOUSE);
const moves = parsePGNMoves(pgn);

console.log("Total moves to process:", moves.length);
console.log("First 10 moves:", moves.slice(0, 10));
console.log("Last 10 moves:", moves.slice(-10));

let moveCount = 0;
for (let i = 0; i < moves.length; i++) {
  const move = moves[i];
  console.log(`\nMove ${i + 1}: "${move}"`);
  
  // Check if this is a termination comment
  if (move.startsWith('{') && move.endsWith('}')) {
    console.log("  -> Termination comment, stopping");
    break;
  }
  
  try {
    const result = api.makeMove(move);
    if (!result) {
      console.log(`  -> FAILED: Invalid move`);
      console.log(`  -> Current position: ${api.getFen()}`);
      console.log(`  -> Legal moves: ${api.getLegalMoves().map(m => m.san).join(', ')}`);
      break;
    } else {
      moveCount++;
      console.log(`  -> Success: ${result.san}`);
    }
  } catch (error) {
    console.log(`  -> ERROR: ${error.message}`);
    console.log(`  -> Current position: ${api.getFen()}`);
    break;
  }
}

console.log(`\nProcessed ${moveCount} moves successfully`);
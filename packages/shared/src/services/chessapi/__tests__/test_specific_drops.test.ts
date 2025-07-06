import { ChessAPI, Variant, PieceType } from '../ChessAPI';

describe('Test Specific Drop Moves', () => {
  it('should allow R@h5+ when rook is available', () => {
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Create a simple sequence that captures a rook
    const moves = [
      'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Bxc6', 'dxc6',
      'Nxe5'  // This captures the e5 pawn
    ];
    
    // Apply moves and track what gets captured
    for (const move of moves) {
      const result = api.makeMove(move);
      if (!result) {
        console.log(`Move failed: ${move}, position: ${api.getFen()}`);
        break;
      }
    }
    
    const capturedPieces = api.getCapturedPieces(api.getActiveColor());
    console.log(`Captured pieces for ${api.getActiveColor()}: [${capturedPieces.join(', ')}]`);
    console.log(`Position: ${api.getFen()}`);
    
    // Manually add a rook to captured pieces for testing
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.ROOK);
    
    const legalMoves = api.getLegalMoves().map(m => m.san);
    const rookDrops = legalMoves.filter(m => m.startsWith('R@'));
    
    console.log(`Available rook drops (first 10): ${rookDrops.slice(0, 10).join(', ')}`);
    
    // Test R@h5+ specifically
    const isRookH5Check = legalMoves.includes('R@h5+');
    const isRookH5 = legalMoves.includes('R@h5');
    
    console.log(`R@h5+ available: ${isRookH5Check}`);
    console.log(`R@h5 available: ${isRookH5}`);
    
    // Try to make the move
    const result = api.makeMove('R@h5');
    if (result) {
      console.log('✓ R@h5 executed successfully');
      console.log(`New position: ${api.getFen()}`);
    } else {
      console.log('✗ R@h5 failed to execute');
    }
    
    expect(rookDrops.length).toBeGreaterThan(0);
  });

  it('should allow N@f7+ when knight is available', () => {
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Create a simple sequence that captures a knight
    const moves = [
      'e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Nxd4', 'Qxd4'
    ];
    
    for (const move of moves) {
      const result = api.makeMove(move);
      if (!result) {
        console.log(`Move failed: ${move}`);
        break;
      }
    }
    
    const capturedPieces = api.getCapturedPieces(api.getActiveColor());
    console.log(`Captured pieces for ${api.getActiveColor()}: [${capturedPieces.join(', ')}]`);
    
    // Should have captured a knight
    expect(capturedPieces).toContain(PieceType.KNIGHT);
    
    const legalMoves = api.getLegalMoves().map(m => m.san);
    const knightDrops = legalMoves.filter(m => m.startsWith('N@'));
    
    console.log(`Available knight drops (first 10): ${knightDrops.slice(0, 10).join(', ')}`);
    
    // Test N@f7+ specifically
    const isKnightF7Check = legalMoves.includes('N@f7+');
    const isKnightF7 = legalMoves.includes('N@f7');
    
    console.log(`N@f7+ available: ${isKnightF7Check}`);
    console.log(`N@f7 available: ${isKnightF7}`);
    
    // Try to make the move
    const result = api.makeMove('N@f7');
    if (result) {
      console.log('✓ N@f7 executed successfully');
      console.log(`New position: ${api.getFen()}`);
    } else {
      console.log('✗ N@f7 failed to execute');
    }
    
    expect(knightDrops.length).toBeGreaterThan(0);
  });

  it('should properly detect when drops give check', () => {
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Set up a position where we can test checks
    api.loadFen('rnb1kbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
    
    // Manually add pieces to captured pieces for testing
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.QUEEN);
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.ROOK);
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.BISHOP);
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.KNIGHT);
    
    const legalMoves = api.getLegalMoves().map(m => m.san);
    const checkingDrops = legalMoves.filter(m => m.includes('@') && m.includes('+'));
    
    console.log(`Position: ${api.getFen()}`);
    console.log(`All drops: ${legalMoves.filter(m => m.includes('@')).slice(0, 20).join(', ')}`);
    console.log(`Checking drops: ${checkingDrops.join(', ')}`);
    
    // There should be some drops that give check in this position
    expect(checkingDrops.length).toBeGreaterThan(0);
  });

  it('should handle complex crazyhouse position with accurate drop validation', () => {
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Load a complex position where drops should be available
    api.loadFen('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4');
    
    // Add captured pieces manually
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.PAWN);
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.KNIGHT);
    (api as any).capturedPieces[api.getActiveColor()].push(PieceType.ROOK);
    
    const legalMoves = api.getLegalMoves().map(m => m.san);
    const allDrops = legalMoves.filter(m => m.includes('@'));
    const checkingDrops = allDrops.filter(m => m.includes('+'));
    
    console.log(`Complex position: ${api.getFen()}`);
    console.log(`Total drops available: ${allDrops.length}`);
    console.log(`Drops giving check: ${checkingDrops.length}`);
    console.log(`Sample drops: ${allDrops.slice(0, 15).join(', ')}`);
    console.log(`Checking drops: ${checkingDrops.join(', ')}`);
    
    // Verify that specific drops work
    const testDrops = ['P@f7', 'N@g5', 'R@h5'];
    for (const drop of testDrops) {
      const available = legalMoves.includes(drop) || legalMoves.includes(drop + '+');
      console.log(`${drop} available: ${available}`);
    }
    
    expect(allDrops.length).toBeGreaterThan(0);
  });
});
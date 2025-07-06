const { ChessAPI, Variant } = require('./src/services/ChessAPI/ChessAPI');

describe('Debug Crazyhouse failures', () => {
  it('should debug crazyhouse-046 failure at move 62', () => {
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Play the game up to move 61
    const moves = [
      'c4', 'e6', 'Nc3', 'Nc6', 'd4', 'Nf6', 'Nf3', 'Be7', 'Bg5', 'O-O',
      'e4', 'd5', 'Bxf6', 'Bxf6', 'cxd5', 'exd5', 'Nxd5', 'Bg4', 'Nxf6+', 'Qxf6',
      'N@d5', 'Qe6', 'Nc3', 'P@b4', 'B@d5', 'Qe8', 'Bxc6', 'bxc6', 'P@b7', 'Rd8',
      'N@e2', 'bxc3', 'Nxc3', 'Bxf3', 'gxf3', 'N@h4', 'P@g2', 'N@f4', 'Rg1', 'c5',
      'B@a4', 'c6', 'Bxc6', 'Qxc6', 'P@e7', 'cxd4', 'exd8=Q', 'Rxd8', 'P@e7', 'B@b4',
      'exd8=Q+', 'B@f8', 'b8=Q', 'P@e3', 'Qxf4', 'exf2+', 'Kxf2', 'B@e3+', 'Qxe3', 'dxe3+',
      'Kxe3', 'Bc5+', 'P@d4', 'P@f4+', 'Kd2', 'P@e3+', 'Kc1', 'P@d2+', 'Kb1', 'Be7',
      'Qd5', 'Qxd5', 'Nxd5', 'N@f2', 'Nxe7+', 'Bxe7', 'Q@e8+', 'N@f8', 'Bc4', 'P@e6',
      'N@e5', 'h6', 'Qxf7+', 'Kh7', 'R@g8', 'Nhg6', 'Qxg7#'
    ];
    
    let moveCount = 0;
    let lastSuccessfulMove = '';
    
    for (const move of moves) {
      const result = api.makeMove(move);
      if (!result) {
        console.log(`Failed at move ${moveCount + 1}: "${move}"`);
        console.log(`Last successful move: "${lastSuccessfulMove}"`);
        console.log(`Current position: ${api.getFen()}`);
        console.log(`Legal moves: ${api.getLegalMoves().map(m => m.san).join(', ')}`);
        break;
      }
      moveCount++;
      lastSuccessfulMove = move;
    }
    
    console.log(`Processed ${moveCount} moves successfully`);
    expect(moveCount).toBeGreaterThan(0);
  });

  it('should debug drop move failures', () => {
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Test individual drop moves that are failing
    const dropMoves = ['P@g7', 'P@g5', 'P@g2+'];
    
    dropMoves.forEach(move => {
      console.log(`Testing drop move: ${move}`);
      
      // Reset to starting position
      const freshApi = new ChessAPI(Variant.CRAZYHOUSE);
      
      // Check if the move is in the legal moves list
      const legalMoves = freshApi.getLegalMoves().map(m => m.san);
      console.log(`Legal drop moves: ${legalMoves.filter(m => m.includes('@')).join(', ')}`);
      
      // Try to parse the move
      const parseResult = (freshApi as any)._parseFlexibleSan(move);
      console.log(`Parse result for ${move}:`, parseResult);
    });
  });
});
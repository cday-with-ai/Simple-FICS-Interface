const { ChessAPI, Variant } = require('./dist/services/ChessAPI/ChessAPI');

// Debug crazyhouse-109 failing at R@h5+
const api = new ChessAPI(Variant.CRAZYHOUSE);

// Play the EXACT moves from crazyhouse-109 PGN up to the failure point
const moves = [
  'd4', 'e6', 'Nf3', 'd6', 'Bf4', 'Be7', 'e3', 'Nf6', 'Be2', 'O-O',
  'O-O', 'Nd5', 'Bg3', 'f5', 'c4', 'Nf6', 'Nc3', 'Bd7', 'Rc1', 'Nc6',
  'a3', 'Nh5', 'b4', 'Nxg3', 'hxg3', 'B@b2', 'Qb3', 'Bxc1', 'Rxc1', 'a5',
  'b5', 'Nb8', 'a4', 'Kh8', 'e4', 'fxe4', 'Nxe4', 'R@b4', 'Qd1', 'P@b2',
  'Rb1', 'd5', 'cxd5', 'exd5', 'Nc5', 'P@a2', 'Rxb2', 'Rxb2', 'Nxd7', 'Qxd7',
  'N@e5', 'R@b1', 'Nxd7', 'Rxd1+', 'Bxd1', 'Nxd7', 'P@g5', 'a1=Q', 'R@f1', 'Rxf2',
  'Rxf2', 'Qxd1+', 'R@f1', 'P@e2', 'P@h6', 'exf1=Q+', 'Rxf1', 'N@e2+', 'Kh2', 'N@g4+',
  'Kh3', 'Nxh6', 'B@e6', 'Qxf1', 'B@h2'
];

let moveCount = 0;
for (const move of moves) {
  const result = api.makeMove(move);
  if (!result) {
    console.log(`Failed at move ${moveCount + 1}: "${move}"`);
    break;
  }
  moveCount++;
}

console.log(`Processed ${moveCount} moves successfully`);

// Check captured pieces
const capturedPieces = api.capturedPieces || (api.getCapturedPieces ? {
  w: api.getCapturedPieces('w'),
  b: api.getCapturedPieces('b')
} : {w: [], b: []});

console.log(`\nCaptured pieces:`);
console.log(`White has: [${capturedPieces.w.join(', ')}]`);
console.log(`Black has: [${capturedPieces.b.join(', ')}]`);

// Check if R@h5+ is legal
const legalMoves = api.getLegalMoves().map(m => m.san);
const rookDrops = legalMoves.filter(m => m.includes('R@'));
console.log(`\nAvailable rook drops: [${rookDrops.slice(0, 10).join(', ')}]${rookDrops.length > 10 ? '...' : ''}`);

// Try the specific move that's failing: R@h5+
const testMove = 'R@h5+';
console.log(`\nTesting ${testMove}:`);
const result = api.makeMove(testMove);
if (result) {
  console.log(`✓ ${testMove} executed successfully`);
} else {
  console.log(`✗ ${testMove} failed`);
  console.log(`Legal moves: ${legalMoves.slice(0, 10).join(', ')}...`);
}
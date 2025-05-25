// Debug script to test navigation issues
import { ChessBoard } from '../scripts/ChessBoard.js';

console.log('=== Testing Navigation Issues ===');

// Test 1: Create a board and add move history
const board = new ChessBoard();
console.log('1. Created new board');
console.log('   Initial position history length:', board.positionHistory.length);
console.log('   Initial position history[0]:', board.positionHistory[0]);

// Make some moves
board.makeMove('e4');
board.makeMove('e5');
console.log('2. Made moves e4, e5');
console.log('   Position history length:', board.positionHistory.length);
console.log('   Position history[0]:', board.positionHistory[0]);
console.log('   Position history[1]:', board.positionHistory[1]);
console.log('   Position history[2]:', board.positionHistory[2]);

// Test getFenBeforeHalfmove
console.log('3. Testing getFenBeforeHalfmove:');
console.log('   getFenBeforeHalfmove(0):', board.getFenBeforeHalfmove(0));
console.log('   getFenBeforeHalfmove(1):', board.getFenBeforeHalfmove(1));
console.log('   getFenBeforeHalfmove(2):', board.getFenBeforeHalfmove(2));

// Test 2: Load mid-game FEN and use prependMoveHistory
console.log('\n=== Testing with prependMoveHistory ===');
const board2 = new ChessBoard();
const midGameFen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2';
board2.loadFen(midGameFen);
console.log('1. Loaded mid-game FEN');
console.log('   Position history length:', board2.positionHistory.length);
console.log('   Position history[0]:', board2.positionHistory[0]);

board2.prependMoveHistory(['e4', 'e5']);
console.log('2. Called prependMoveHistory');
console.log('   Position history length:', board2.positionHistory.length);
console.log('   Position history[0]:', board2.positionHistory[0]);
console.log('   Position history[1]:', board2.positionHistory[1]);
console.log('   Position history[2]:', board2.positionHistory[2]);

// Test getFenBeforeHalfmove
console.log('3. Testing getFenBeforeHalfmove:');
console.log('   getFenBeforeHalfmove(0):', board2.getFenBeforeHalfmove(0));
console.log('   getFenBeforeHalfmove(1):', board2.getFenBeforeHalfmove(1));
console.log('   getFenBeforeHalfmove(2):', board2.getFenBeforeHalfmove(2));

// Test 3: Test start() method
console.log('\n=== Testing start() method ===');
console.log('Before start():');
console.log('   Current FEN:', board2.getFen());
console.log('   originalLoadedPosition:', board2.originalLoadedPosition);

board2.start();
console.log('After start():');
console.log('   Current FEN:', board2.getFen());
console.log('   Position history length:', board2.positionHistory.length);
console.log('   Position history[0]:', board2.positionHistory[0]);

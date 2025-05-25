// Debug script to test navigation functions
import { ChessBoard } from './scripts/ChessBoard.js';
import { jumpToFirstMove, jumpToLastMove, jumpToMove } from '../scripts/chess.js';

console.log('=== Testing Navigation Functions ===');

// Set up a mock gameState
window.gameState = {
    chessBoard: null,
    fen: null
};

// Mock UI functions
window.updateBoardGraphicsAndSquareListeners = (param) => {
    console.log('   updateBoardGraphicsAndSquareListeners called with:', param);
};

window.updateBoardBottomLabels = () => {
    console.log('   updateBoardBottomLabels called');
};

window.unselectMoveInMoveList = () => {
    console.log('   unselectMoveInMoveList called');
};

window.highlightSelectedMoveInternal = (moveNumber, color) => {
    console.log('   highlightSelectedMoveInternal called with:', moveNumber, color);
};

// Test 1: Create a board with move history
const board = new ChessBoard();
const midGameFen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2';
board.loadFen(midGameFen);
board.prependMoveHistory(['e4', 'e5']);

window.gameState.chessBoard = board;
window.gameState.fen = board.getFen();

console.log('1. Set up board with prependMoveHistory');
console.log('   Current gameState.fen:', window.gameState.fen);
console.log('   Position history length:', board.positionHistory.length);
console.log('   getFenBeforeHalfmove(0):', board.getFenBeforeHalfmove(0));
console.log('   getFenBeforeHalfmove(1):', board.getFenBeforeHalfmove(1));
console.log('   getFenBeforeHalfmove(2):', board.getFenBeforeHalfmove(2));

// Test jumpToFirstMove
console.log('\n2. Testing jumpToFirstMove:');
jumpToFirstMove();
console.log('   After jumpToFirstMove, gameState.fen:', window.gameState.fen);

// Test jumpToMove
console.log('\n3. Testing jumpToMove(1, "w"):');
jumpToMove(1, 'w');
console.log('   After jumpToMove(1, "w"), gameState.fen:', window.gameState.fen);

// Test jumpToLastMove
console.log('\n4. Testing jumpToLastMove:');
jumpToLastMove();
console.log('   After jumpToLastMove, gameState.fen:', window.gameState.fen);

// Test with empty move history
console.log('\n=== Testing with empty move history ===');
const emptyBoard = new ChessBoard();
window.gameState.chessBoard = emptyBoard;
window.gameState.fen = emptyBoard.getFen();

console.log('5. Testing jumpToFirstMove with empty history:');
jumpToFirstMove();
console.log('   After jumpToFirstMove, gameState.fen:', window.gameState.fen);

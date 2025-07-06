import { ChessAPI } from '../ChessAPI';

// Test specific disambiguation moves
const api = new ChessAPI();

// Set up position from the game where Nfg4 occurs
const moves = [
    'e4', 'c5', 'Nf3', 'd6', 'Bb5+', 'Nd7', 'Ba4', 'Nf6', 'O-O', 'e6', 
    'd3', 'Be7', 'c4', 'O-O', 'Nc3', 'h6', 'a3', 'Ne5', 'b4', 'Bd7', 
    'Bc2', 'Nfg4'
];

console.log('Testing disambiguation moves...');
console.log('Initial position:', api.getFen());

for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    console.log(`\nMove ${i + 1}: ${move}`);
    const result = api.makeMove(move);
    if (!result) {
        console.error(`Failed to make move: ${move}`);
        console.log('Current position:', api.getFen());
        console.log('Legal moves:', api.getLegalMoves().map(m => m.san));
        break;
    } else {
        console.log('Success! New position:', api.getFen());
    }
}
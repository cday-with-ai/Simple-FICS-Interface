// Stockfish loader that imports the ES module and exposes it globally
import Sf167Web from './sf16-7.js';

// Make it available globally
window.Stockfish = Sf167Web;
window.Sf167Web = Sf167Web;

// Signal that Stockfish is ready
window.stockfishReady = true;

console.log('Stockfish loaded and exposed globally');
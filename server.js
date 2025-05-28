import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Set CORS and security headers for all responses
app.use((req, res, next) => {
    // Critical headers for SharedArrayBuffer support (Cross-Origin-Isolation)
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    // Additional headers for WebAssembly and Web Workers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Specific headers for .wasm files
    if (req.url.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    }

    // Specific headers for .js files
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    }

    // Headers for HTML files
    if (req.url.endsWith('.html') || req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
    }

    next();
});

// Serve static files from current directory
app.use(express.static('.', {
    // Set proper MIME types
    setHeaders: (res, path) => {
        if (path.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Chess server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔧 CORS headers configured for Stockfish`);
    console.log(`\n✅ Open http://localhost:${PORT} in your browser`);
});

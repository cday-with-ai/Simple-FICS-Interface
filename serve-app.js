#!/usr/bin/env node

/**
 * Simple HTTP server to serve the built web app with proper CORS headers
 * Required for Stockfish WebAssembly to work with SharedArrayBuffer
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'packages', 'web', 'dist');

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wasm': 'application/wasm',
    '.ico': 'image/x-icon',
    '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    
    // Default to index.html
    if (pathname === './') {
        pathname = './index.html';
    }
    
    // Resolve file path
    const filePath = path.join(DIST_DIR, pathname);
    
    // Check if file exists
    fs.exists(filePath, (exist) => {
        if (!exist) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }
        
        // Check if it's a directory
        if (fs.statSync(filePath).isDirectory()) {
            const indexPath = path.join(filePath, 'index.html');
            if (fs.existsSync(indexPath)) {
                serveFile(indexPath, res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            }
            return;
        }
        
        // Serve the file
        serveFile(filePath, res);
    });
});

function serveFile(filePath, res) {
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Read and serve file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Set headers including CORS headers required for SharedArrayBuffer
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin'
            });
            res.end(content, 'utf-8');
        }
    });
}

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    console.error(`Error: Distribution directory not found at ${DIST_DIR}`);
    console.error('Please build the web app first with: cd packages/web && npm run build');
    process.exit(1);
}

server.listen(PORT, () => {
    console.log(`Simple FICS Interface server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${DIST_DIR}`);
    console.log('\nPress Ctrl+C to stop the server');
});
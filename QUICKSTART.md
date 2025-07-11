# Quick Start Guide

## Opening the App

### Option 1: Direct File Access (Limited Functionality)
Simply open `index.html` in your browser. This will show a launcher page with a link to the built app.

**Note:** When opened as a file:// URL, Stockfish analysis will not work due to browser security restrictions with SharedArrayBuffer.

### Option 2: Serve with Proper Headers (Full Functionality)
For full functionality including Stockfish analysis:

```bash
# Build the web app (if not already built)
yarn build:web

# Serve the app with proper CORS headers
yarn serve
```

Then open http://localhost:3000 in your browser.

### Option 3: Development Server
For development with hot reload:

```bash
yarn web
```

Then open http://localhost:5173 in your browser.

## Integration Notes

The `index.html` file in the root directory is provided for integration compatibility with tools that expect an HTML file at the project root. It serves as a launcher that:

1. Can be opened directly in a browser
2. Provides information about the app
3. Links to the actual built application
4. Includes instructions for proper serving

For production deployments, ensure your web server sets these headers:
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

These headers are required for Stockfish WebAssembly to use SharedArrayBuffer for optimal performance.
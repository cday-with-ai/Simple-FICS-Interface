# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Simple-FICS-Interface** - A web-based chess interface for the Free Internet Chess Server (FICS)
- Language: JavaScript (ES modules)
- Framework: Vanilla JavaScript with modern web APIs
- Purpose: Minimalist chess playing interface with chat functionality for FICS

## Development Commands

### Running the Development Server
```bash
node server.js
```
The server runs on http://localhost:8000 with special CORS headers required for WebAssembly SharedArrayBuffer support.

### Testing
```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:debug    # Run tests with Chrome debugging
```

### Building
Currently no production build script. The project runs directly from source with ES modules.

## Architecture Overview

### Core Modules
- `scripts/ChessBoard.js` - Chess board rendering and piece interaction
- `scripts/chess.js` - Chess game logic and move validation (using chess.js library)
- `scripts/fics.js` - WebSocket communication with FICS servers
- `scripts/chat.js` - Chat system implementation with channel tabs
- `scripts/stockfishEngine.js` - Stockfish 16 WebAssembly integration for analysis
- `scripts/eco.js` - Chess opening database
- `scripts/utils.js` - Utility functions
- `scripts/index.js` - Main entry point

### Critical Technical Requirements

1. **WebAssembly Support**: The server must set these headers for SharedArrayBuffer:
   - `Cross-Origin-Embedder-Policy: require-corp`
   - `Cross-Origin-Opener-Policy: same-origin`

2. **Chess Variants**: Supports multiple variants (Chess960, Losers, Suicide, Atomic, etc.)

3. **Real-time Communication**: Uses WebSocket for FICS server connection

## Testing Framework

- **Karma** browser-based test runner with Jasmine
- Tests use `.karma.test.js` naming convention
- Browser APIs (WebSocket, localStorage, Audio) are mocked in tests
- Webpack + Babel transpilation for ES modules in tests

## Important Notes

- No linting configuration (ESLint/Prettier) currently in place
- Uses ES modules throughout - ensure proper import/export syntax
- Chess piece assets are SVG files in `/pieces/` directory
- Sound files for game events in `/sounds/` directory
- Project lacks production build configuration
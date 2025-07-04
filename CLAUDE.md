# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Simple-FICS-Interface** - A cross-platform chess client for the Free Internet Chess Server (FICS), currently migrating from vanilla JavaScript to a React/React Native monorepo architecture.

- **Current Branch**: `react-native` (active migration)
- **Architecture**: Monorepo using Yarn workspaces
- **Main Packages**:
  - `@fics/shared`: Core business logic, chess engine, FICS protocol
  - `@fics/web`: React web application (Vite)
  - `@fics/mobile`: React Native mobile app

## Development Commands

### Running the Applications

```bash
# Web development server
yarn web

# Mobile development
yarn ios       # iOS simulator
yarn android   # Android emulator
yarn mobile    # Metro bundler only
```

### Testing

```bash
# Run all tests
yarn test

# Package-specific tests
yarn workspace @fics/shared test
yarn workspace @fics/shared test:watch
yarn workspace @fics/shared test:coverage
yarn workspace @fics/web test
```

### Code Quality

```bash
# Type checking
yarn typecheck

# Linting (when configured)
yarn lint
```

## Architecture & Key Components

### Core Services (packages/shared/src/services/)

- **ChessAPI**: Custom chess engine supporting multiple variants (Standard, Chess960, Crazyhouse, Suicide, Atomic, Losers, Wild)
  - `ChessAPI.ts`: Main API interface
  - `ChessAPI.execution.ts`: Move execution logic
  - `ChessAPI.moveGeneration.ts`: Legal move generation
  - `ChessAPI.validation.ts`: Move validation
  - `ChessAPI.variants.ts`: Variant-specific rules

- **FICSProtocol**: WebSocket-based FICS server communication
  - Comprehensive parsing of FICS messages
  - Security hardened against XSS
  - 400+ tests with ~98% coverage

- **StockfishEngine**: WebAssembly integration for chess analysis
  - Stockfish 16 WASM
  - Requires proper CORS headers for SharedArrayBuffer

### State Management (packages/shared/src/models/)

All state is managed with MobX stores:
- `GameStore`: Chess game state and move history
- `FICSStore`: Server connection and protocol state
- `ChatStore`: Tab-based chat system
- `PreferencesStore`: User settings and preferences

### Web Application Structure

The web app uses:
- React 18 with TypeScript
- Vite for bundling
- styled-components (with transient props pattern)
- React Router v7
- PWA support

## Current Migration Status

**Phase 1 (Core Logic)**: ✅ COMPLETED
- All business logic migrated to TypeScript
- Comprehensive test coverage
- MobX stores implemented

**Phase 2 (Web React App)**: 🚧 IN PROGRESS
- Basic layout components created
- Stockfish test page working
- Main game interface pending

**Phase 3 (React Native)**: 📅 PLANNED

## Important Technical Notes

1. **WebAssembly Requirements**: When running the web app, ensure these headers are set:
   ```
   Cross-Origin-Embedder-Policy: require-corp
   Cross-Origin-Opener-Policy: same-origin
   ```

2. **Chess Variants**: The ChessAPI supports multiple variants. Each variant has specific rules implemented in `ChessAPI.variants.ts`.

3. **Test Failures**: Some variant-specific tests are currently failing. Check test output before making changes to chess logic.

4. **Styled Components**: Use transient props (prefixed with `$`) to avoid React warnings about DOM props.

## Common Development Tasks

### Adding a New Chess Variant
1. Update variant types in `ChessAPI.types.ts`
2. Implement rules in `ChessAPI.variants.ts`
3. Add comprehensive tests in `__tests__/`

### Working with FICS Protocol
1. Parser logic is in `FICSProtocol.parser.ts`
2. Add new message types to `FICSProtocol.types.ts`
3. Security: All user input must be sanitized

### Running Specific Tests
```bash
# Run a specific test file
yarn workspace @fics/shared test ChessAPI.test.ts

# Run tests matching a pattern
yarn workspace @fics/shared test --testNamePattern="crazyhouse"
```

### Debugging Chess Moves
The ChessAPI has detailed error messages. Enable debug logging:
```typescript
const api = new ChessAPI({ debug: true });
```
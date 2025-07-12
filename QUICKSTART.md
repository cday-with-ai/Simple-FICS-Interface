# Quick Start Guide

## Opening the App

Simply open `index.html` in your browser or serve it through your web server (like Cloudflare).

The app is built to `packages/web/dist/`, and the root `index.html` references all assets there with relative paths.

## Building the App

```bash
# Install dependencies
yarn install

# Build the web app
yarn build:web
```

This will build the app to `packages/web/dist/`.

## Development

For development with hot reload:

```bash
yarn web
```

Then open http://localhost:5173 in your browser.

## Deployment Notes

When deploying through services like Cloudflare, ensure these headers are set for Stockfish WebAssembly to work properly:
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

The app assets (pieces, fonts, etc.) are properly organized in `packages/web/public/` and get built to `packages/web/dist/`. There are no duplicate assets at the root level.
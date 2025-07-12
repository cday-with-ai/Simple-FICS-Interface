# Quick Start Guide

## Opening the App

### Option 1: Direct Browser Access
Simply open `index.html` in your browser. The app is pre-built and ready to use!

### Option 2: Web Server (Cloudflare Pages)
The app is already deployed at: https://simple-fics-interface.pages.dev/

For your own deployment, just serve the repository - all assets are pre-built in `packages/web/dist/`.

## Development Setup

### Prerequisites
- Node.js 18+ 
- Yarn 1.22+

### Installation
```bash
# Clone the repository
git clone https://github.com/cday-with-ai/Simple-FICS-Interface.git
cd Simple-FICS-Interface

# Install dependencies
yarn install
```

### Running Development Server
```bash
# Start the web development server
yarn web
```

Open http://localhost:5173 in your browser.

## Building the App

```bash
# Build the web app
yarn build:web
```

This builds the app to `packages/web/dist/`. The built files are already committed to the repository for easy deployment.

## Project Structure

```
Simple-FICS-Interface/
├── index.html              # Entry point (loads pre-built app)
├── _headers               # Cloudflare Pages headers config
├── packages/
│   ├── shared/            # Core logic (chess engine, FICS protocol)
│   ├── web/               # React web application
│   │   ├── dist/         # Pre-built app (committed to repo)
│   │   ├── public/       # Static assets (pieces, fonts, etc.)
│   │   └── src/          # Source code
│   └── mobile/           # React Native app (in development)
```

## Connecting to FICS

1. Click the "Connect" button in the app
2. Enter your FICS username and password (or login as guest)
3. Start playing chess!

## Key Features

- **Chess Variants**: Standard, Chess960, Crazyhouse, Suicide, Atomic, etc.
- **Analysis**: Stockfish 16 integration
- **Chat**: Multi-tab support for channels and private messages
- **UI**: Responsive design, dark/light themes, 30+ piece sets

## Deployment Notes

### Cloudflare Pages
The `_headers` file is already configured with the necessary CORS headers for Stockfish:
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

### Other Web Servers
Ensure your server sets the above headers for WebAssembly/SharedArrayBuffer support.

## Troubleshooting

### Stockfish Not Working?
- Check browser console for CORS errors
- Verify headers are being set correctly
- Ensure you're using a modern browser with SharedArrayBuffer support

### Can't Connect to FICS?
- Check your internet connection
- Verify FICS server is online (www.freechess.org)
- Try logging in as guest first

### UI Issues?
- Clear browser cache
- Try a different browser
- Check console for JavaScript errors

## Development Tips

- Run `yarn test` to execute the test suite
- Use `yarn typecheck` to check TypeScript types
- The app uses MobX for state management - components need `observer` wrapper
- See `CLAUDE.md` for detailed development guidelines

## Support

- Report issues: https://github.com/cday-with-ai/Simple-FICS-Interface/issues
- FICS help: https://www.freechess.org/Help/
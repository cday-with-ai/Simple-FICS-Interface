# React Web App Deployment Guide

## Required CORS Headers for Stockfish WebAssembly

This application uses Stockfish chess engine which requires specific CORS headers for SharedArrayBuffer support.

### Development

Headers are automatically configured in `vite.config.ts` for the development server.

### Production Deployment

#### Apache (.htaccess)

```apache
Header always set Cross-Origin-Embedder-Policy "require-corp"
Header always set Cross-Origin-Opener-Policy "same-origin"

# Additional security headers
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

#### Nginx

```nginx
server {
    # ... other configuration

    # Required for Stockfish WebAssembly
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    
    # Additional security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Serve WASM files with correct MIME type
    location ~* \.wasm$ {
        add_header Content-Type "application/wasm";
        add_header Cross-Origin-Embedder-Policy "require-corp" always;
        add_header Cross-Origin-Opener-Policy "same-origin" always;
    }
}
```

#### Cloudflare Workers / Pages

```javascript
export default {
  async fetch(request, env, ctx) {
    const response = await env.ASSETS.fetch(request);
    
    // Clone the response to modify headers
    const newResponse = new Response(response.body, response);
    
    // Add required CORS headers
    newResponse.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    newResponse.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    
    return newResponse;
  },
};
```

#### Netlify (_headers file)

```
/*
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff

/*.wasm
  Content-Type: application/wasm
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
```

#### Vercel (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy", 
          "value": "same-origin"
        }
      ]
    },
    {
      "source": "/(.*).wasm",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/wasm"
        }
      ]
    }
  ]
}
```

### Browser Compatibility

These headers enable SharedArrayBuffer which requires:

- Chrome 68+
- Firefox 79+
- Safari 15.2+

For older browsers, Stockfish will fall back to single-threaded mode automatically.

### Testing Headers

You can verify the headers are correctly set using browser developer tools:

1. Open Network tab
2. Reload the page
3. Check response headers for the main document
4. Verify both `Cross-Origin-Embedder-Policy` and `Cross-Origin-Opener-Policy` are present

### Troubleshooting

If Stockfish fails to load:

1. Check browser console for CORS-related errors
2. Verify headers are set in Network tab
3. Ensure `sf16-7.js` and `sf16-7.wasm` are served from the same origin
4. Test with different browser to isolate compatibility issues
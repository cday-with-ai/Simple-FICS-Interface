import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}']
            }
        })
    ],

    // Required for Stockfish WebAssembly with SharedArrayBuffer
    server: {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
        },
        fs: {
            // Allow serving files from one level up to access shared package
            allow: ['..']
        }
    },

    // Production build headers
    preview: {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
        }
    },

    // Optimize WebAssembly handling
    optimizeDeps: {
        exclude: ['@fics/shared']
    },

    // Build configuration
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mobx: ['mobx', 'mobx-react-lite'],
                    shared: ['@fics/shared']
                }
            }
        }
    },

    // Resolve configuration for TypeScript paths
    resolve: {
        alias: {
            '@': '/src',
            '@fics/shared': '../shared/src'
        }
    },

    // Define global constants
    define: {
        __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    }
})
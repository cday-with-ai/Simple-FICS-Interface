import {defineConfig, Plugin} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'

// Custom plugin to move registerSW.js to assets directory
function moveRegisterSW(): Plugin {
    return {
        name: 'move-register-sw',
        apply: 'build',
        closeBundle() {
            const srcPath = path.resolve(__dirname, 'dist/registerSW.js')
            const destPath = path.resolve(__dirname, 'dist/assets/registerSW.js')
            
            if (fs.existsSync(srcPath)) {
                // Ensure assets directory exists
                const assetsDir = path.dirname(destPath)
                if (!fs.existsSync(assetsDir)) {
                    fs.mkdirSync(assetsDir, { recursive: true })
                }
                
                // Move the file
                fs.renameSync(srcPath, destPath)
                
                // Update index.html to reference the new location
                const indexPath = path.resolve(__dirname, 'dist/index.html')
                if (fs.existsSync(indexPath)) {
                    let html = fs.readFileSync(indexPath, 'utf-8')
                    html = html.replace('src="/registerSW.js"', 'src="/assets/registerSW.js"')
                    fs.writeFileSync(indexPath, html)
                }
            }
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}']
            },
            filename: 'assets/sw.js',
            strategies: 'generateSW',
            injectRegister: 'script',
            manifest: {
                name: 'Simple FICS Interface',
                short_name: 'FICS Chess',
                description: 'A responsive chess interface for FICS',
                theme_color: '#1e40af',
                icons: [
                    {
                        src: '/simpleficsinterface.svg',
                        sizes: 'any',
                        type: 'image/svg+xml'
                    }
                ]
            }
        }),
        moveRegisterSW()
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
        },
        // Copy Stockfish files to assets during build
        copyPublicDir: true
    },

    // Configure asset handling
    publicDir: 'public',
    assetsInclude: ['**/*.wasm'],

    // Resolve configuration for TypeScript paths
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@fics/shared': path.resolve(__dirname, '../shared/src')
        }
    },

    // Define global constants
    define: {
        __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    }
})
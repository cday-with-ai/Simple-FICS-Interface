/**
 * Simple Stockfish Engine Wrapper
 * Based on official Lichess stockfish.wasm documentation
 */

// Type definitions for Stockfish WebAssembly module
interface StockfishConfig {
    listen: (line: string) => void;
    onError: (error: Error) => void;
}

interface StockfishWasmEngine {
    uci: (command: string) => void;
}

interface AnalysisResult {
    type: 'info' | 'bestmove';
    line: string;
    move?: string;
}

interface AnalysisOptions {
    depth?: number;
    time?: number;
    nodes?: number;
}

interface PendingAnalysis {
    fen: string;
    options: AnalysisOptions;
}

type AnalysisCallback = (result: AnalysisResult) => void;

// Global window extensions
declare global {
    interface Window {
        Stockfish: (config: StockfishConfig) => Promise<StockfishWasmEngine>;
        Sf167Web?: (config: StockfishConfig) => Promise<StockfishWasmEngine>;
        stockfishReady?: boolean;
        stockfishError?: { message: string };
        StockfishEngine: typeof StockfishEngine;
    }
}

class StockfishEngine {
    private engine: StockfishWasmEngine | null = null;
    private isReady: boolean = false;
    private uciReady: boolean = false;
    private analysisCallback: AnalysisCallback | null = null;
    private pendingAnalysis: PendingAnalysis | null = null;
    private isReactEnvironment: boolean = false;

    constructor() {
        this.engine = null;
        this.isReady = false;
        this.uciReady = false;
        this.analysisCallback = null;
        this.pendingAnalysis = null;

        // Detect if we're in a React/browser environment
        this.isReactEnvironment = typeof window !== 'undefined' &&
            typeof document !== 'undefined';
    }

    /**
     * Load Stockfish script dynamically (for React environments)
     */
    private loadStockfishScript(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // Check if Stockfish is already loaded
            if (typeof window !== 'undefined' && (typeof window.Stockfish === 'function' || typeof window.Sf167Web === 'function')) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.type = 'module'; // Important: sf16-7.js uses ES modules

            script.onload = () => {
                console.log('Stockfish script loaded successfully');
                // Give it a moment to initialize
                setTimeout(() => {
                    console.log('Checking for Sf167Web after load...');
                    if (window.Sf167Web) {
                        console.log('Sf167Web found!');
                        window.Stockfish = window.Sf167Web;
                    }
                    resolve();
                }, 100);
            };

            script.onerror = () => {
                reject(new Error(`Failed to load Stockfish script from ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Initialize the Stockfish engine
     */
    async initialize(): Promise<boolean> {
        try {
            console.log('Initializing Stockfish engine...');

            // Handle React environment - load from public directory
            if (this.isReactEnvironment) {
                if (typeof window.Stockfish !== 'function' && typeof window.Sf167Web !== 'function') {
                    console.log('Loading Stockfish from public assets...');
                    // Load the wrapper that properly imports the ES module
                    await this.loadStockfishScript('/stockfish-loader.js');

                    // Wait a bit for the script to fully initialize
                    await new Promise(resolve => setTimeout(resolve, 100));

                    // Check if Sf167Web is available (the actual export name)
                    if (typeof window.Sf167Web === 'function') {
                        console.log('Found Sf167Web, assigning to window.Stockfish');
                        window.Stockfish = window.Sf167Web;
                    }
                }
            }

            // Check if Stockfish failed to load
            if (window.stockfishError) {
                throw new Error('Stockfish module failed to load: ' + window.stockfishError.message);
            }

            // Check for sf16-7 Stockfish function (may be named Sf167Web)
            if (typeof window.Stockfish !== 'function') {
                if (typeof window.Sf167Web === 'function') {
                    console.log('Found Sf167Web, using it as Stockfish');
                    window.Stockfish = window.Sf167Web;
                } else {
                    console.log('Stockfish not found globally, waiting for load...');
                    console.log('Available globals:', Object.keys(window).filter(k => k.toLowerCase().includes('sf') || k.toLowerCase().includes('stock')));

                    // Wait for the stockfishReady event or timeout (for non-React environments)
                    await new Promise<void>((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Stockfish loading timeout. Make sure sf16-7.js is loaded correctly.'));
                        }, 10000);

                        if (window.stockfishReady) {
                            clearTimeout(timeout);
                            resolve();
                            return;
                        }

                        if (window.stockfishError) {
                            clearTimeout(timeout);
                            reject(new Error('Stockfish module failed to load: ' + window.stockfishError.message));
                            return;
                        }

                        const handleStockfishReady = (): void => {
                            clearTimeout(timeout);
                            window.removeEventListener('stockfishReady', handleStockfishReady);
                            window.removeEventListener('stockfishError', handleStockfishError);
                            resolve();
                        };

                        const handleStockfishError = (event: Event): void => {
                            const customEvent = event as CustomEvent<{ error: Error }>;
                            clearTimeout(timeout);
                            window.removeEventListener('stockfishReady', handleStockfishReady);
                            window.removeEventListener('stockfishError', handleStockfishError);
                            reject(new Error('Stockfish module failed to load: ' + customEvent.detail.error.message));
                        };

                        window.addEventListener('stockfishReady', handleStockfishReady);
                        window.addEventListener('stockfishError', handleStockfishError);
                    });

                    if (typeof window.Stockfish !== 'function') {
                        throw new Error('Stockfish function not found after loading event.');
                    }
                }
            }

            console.log('Found window.Stockfish, creating engine instance...');

            // Create Stockfish engine instance
            this.engine = await window.Stockfish({
                // Set up message handlers
                listen: (line: string) => {
                    this.handleMessage(line);
                },
                onError: (error: Error) => {
                    console.error('Stockfish error:', error);
                }
            });

            console.log('Stockfish engine loaded successfully');

            // Start UCI handshake
            this.startUCIHandshake();

            return true;
        } catch (error) {
            console.error('Failed to initialize Stockfish:', error);
            return false;
        }
    }

    /**
     * Start the UCI handshake sequence
     */
    private startUCIHandshake(): void {
        console.log('Starting UCI handshake...');
        if (this.engine) {
            this.engine.uci('uci');
        }

        // Add timeout to force handshake completion if needed
        setTimeout(() => {
            if (!this.uciReady) {
                console.log('UCI timeout - forcing handshake completion');
                this.uciReady = true;
                if (this.engine) {
                    this.engine.uci('isready');
                }
            }
        }, 3000);

        setTimeout(() => {
            if (!this.isReady) {
                console.log('Ready timeout - forcing engine ready');
                this.isReady = true;
            }
        }, 5000);
    }

    /**
     * Handle messages from the engine
     */
    private handleMessage(line: string): void {
        console.log('Stockfish message:', line);

        // Handle UCI handshake
        if (line === 'uciok') {
            console.log('Received uciok, setting uciReady = true');
            this.uciReady = true;
            if (this.engine) {
                this.engine.uci('isready');
            }
            return;
        }

        if (line === 'readyok') {
            console.log('Received readyok, setting isReady = true');
            this.isReady = true;
            this.uciReady = true; // Ensure both flags are set

            // If there's a pending analysis request, execute it now
            if (this.pendingAnalysis) {
                console.log('Executing pending analysis...');
                const {fen, options} = this.pendingAnalysis;
                this.pendingAnalysis = null;
                this.analyzePosition(fen, options);
            }
            return;
        }

        // Handle analysis info
        if (line.startsWith('info ')) {
            this.handleAnalysisInfo(line);
            return;
        }

        // Handle best move
        if (line.startsWith('bestmove ')) {
            this.handleBestMove(line);
            return;
        }

        // Handle engine identification (silently)
        if (line.startsWith('id ')) {
            return;
        }
    }

    /**
     * Handle analysis information
     */
    private handleAnalysisInfo(line: string): void {
        if (this.analysisCallback) {
            this.analysisCallback({
                type: 'info',
                line: line
            });
        }
    }

    /**
     * Handle best move
     */
    private handleBestMove(line: string): void {
        const parts = line.split(' ');
        const bestMove = parts[1];

        if (this.analysisCallback) {
            this.analysisCallback({
                type: 'bestmove',
                move: bestMove,
                line: line
            });
        }
    }

    /**
     * Analyze a position
     */
    analyzePosition(fen: string, options: AnalysisOptions = {}): void {
        console.log("Call to analyzePosition with fen:", fen);
        console.log("Engine ready state:", {isReady: this.isReady, uciReady: this.uciReady, hasEngine: !!this.engine});

        if (!this.isReady || !this.uciReady) {
            console.log('Engine not ready, storing pending analysis');
            this.pendingAnalysis = {fen, options};
            return;
        }
        if (this.engine) {
            console.log('Sending UCI commands for analysis...');
            this.engine.uci('stop');
            this.engine.uci(`position fen ${fen}`);
            this.engine.uci(`go infinite`);
        } else {
            console.error('Engine is null, cannot analyze position');
        }
    }

    /**
     * Stop current analysis
     */
    stopAnalysis(): void {
        console.log("Call to stop analysis.");
        if (this.engine) {
            this.engine.uci('stop');
        }
    }

    /**
     * Set analysis callback
     */
    setAnalysisCallback(callback: AnalysisCallback): void {
        this.analysisCallback = callback;
    }

    /**
     * Check if engine is ready
     */
    isEngineReady(): boolean {
        return this.isReady;
    }
}

// Export for use
window.StockfishEngine = StockfishEngine;

export default StockfishEngine;
export type {AnalysisResult, AnalysisOptions, AnalysisCallback};
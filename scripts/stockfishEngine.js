/**
 * Simple Stockfish Engine Wrapper
 * Based on official Lichess stockfish.wasm documentation
 */
class StockfishEngine {
    constructor() {
        this.engine = null;
        this.isReady = false;
        this.uciReady = false;
        this.analysisCallback = null;
    }

    /**
     * Initialize the Stockfish engine
     */
    async initialize() {
        try {
            console.log('Initializing Stockfish engine...');

            // Check if Stockfish failed to load
            if (window.stockfishError) {
                throw new Error('Stockfish module failed to load: ' + window.stockfishError.message);
            }

            // Check for sf16-7 Stockfish function
            if (typeof window.Stockfish !== 'function') {
                console.log('Stockfish not found globally, waiting for load...');
                console.log('Available globals:', Object.keys(window).filter(k => k.toLowerCase().includes('stock')));

                // Wait for the stockfishReady event or timeout
                await new Promise((resolve, reject) => {
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

                    const handleStockfishReady = () => {
                        clearTimeout(timeout);
                        window.removeEventListener('stockfishReady', handleStockfishReady);
                        window.removeEventListener('stockfishError', handleStockfishError);
                        resolve();
                    };

                    const handleStockfishError = (event) => {
                        clearTimeout(timeout);
                        window.removeEventListener('stockfishReady', handleStockfishReady);
                        window.removeEventListener('stockfishError', handleStockfishError);
                        reject(new Error('Stockfish module failed to load: ' + event.detail.error.message));
                    };

                    window.addEventListener('stockfishReady', handleStockfishReady);
                    window.addEventListener('stockfishError', handleStockfishError);
                });

                if (typeof window.Stockfish !== 'function') {
                    throw new Error('Stockfish function not found after loading event.');
                }
            }

            console.log('Found window.Stockfish, creating engine instance...');

            // Create Stockfish engine instance
            this.engine = await window.Stockfish({
                // Set up message handlers
                listen: (line) => {
                    this.handleMessage(line);
                },
                onError: (error) => {
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
    startUCIHandshake() {
        console.log('Starting UCI handshake...');
        this.engine.uci('uci');

        // Add timeout to force handshake completion if needed
        setTimeout(() => {
            if (!this.uciReady) {
                console.log('UCI timeout - forcing handshake completion');
                this.uciReady = true;
                this.engine.uci('isready');
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
    handleMessage(line) {
        console.log(`Received message from Stockfish: ${line}`);
        // Handle UCI handshake
        if (line === 'uciok') {
            this.uciReady = true;
            this.engine.uci('isready');
            return;
        }

        if (line === 'readyok') {
            this.isReady = true;
            return
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
    handleAnalysisInfo(line) {
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
    handleBestMove(line) {
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
    analyzePosition(fen, options = {}) {
        this.engine.uci('stop');
        this.engine.uci('position fen ${fen}');
        this.engine.uci('go infinite');
    }

    /**
     * Stop current analysis
     */
    stopAnalysis() {
        this.engine.uci('stop');
    }

    /**
     * Reset the engine if it gets stuck
     */
    resetEngine() {
        console.log('Resetting Stockfish engine...');
        this.engine.uci('stop');
        this.isReady = false;
        this.engine.uci('ucinewgame');

        // Re-initialize
        setTimeout(() => {
            this.engine.uci('isready');
        }, 100);
    }

    /**
     * Set analysis callback
     */
    setAnalysisCallback(callback) {
        this.analysisCallback = callback;
    }

    /**
     * Check if engine is ready
     */
    isEngineReady() {
        return this.isReady;
    }
}

// Export for use
window.StockfishEngine = StockfishEngine;

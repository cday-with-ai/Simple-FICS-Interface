import {useEffect, useState, useCallback, useRef} from 'react';
import {StockfishEngine, AnalysisResult, AnalysisCallback} from '@fics/shared';

interface StockfishHookOptions {
    autoInitialize?: boolean;
    onAnalysis?: AnalysisCallback;
}

export interface StockfishHookReturn {
    engine: StockfishEngine | null;
    isLoading: boolean;
    isReady: boolean;
    error: string | null;
    initialize: () => Promise<boolean>;
    analyzePosition: (fen: string) => void;
    stopAnalysis: () => void;
    setAnalysisCallback: (callback: AnalysisCallback) => void;
}

/**
 * React hook for Stockfish chess engine integration
 *
 * @param options Configuration options for the hook
 * @returns Object with engine instance and control methods
 *
 * @example
 * ```tsx
 * const { engine, isLoading, isReady, analyzePosition } = useStockfish({
 *   autoInitialize: true,
 *   onAnalysis: (result) => {
 *     if (result.type === 'bestmove') {
 *       console.log('Best move:', result.move);
 *     }
 *   }
 * });
 *
 * // Analyze a position
 * if (isReady) {
 *   analyzePosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
 * }
 * ```
 */
export const useStockfish = (options: StockfishHookOptions = {}): StockfishHookReturn => {
    const {autoInitialize = true, onAnalysis} = options;

    const [engine, setEngine] = useState<StockfishEngine | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasInitialized, setHasInitialized] = useState(false);

    // Use ref to avoid stale closure issues with callbacks
    const analysisCallbackRef = useRef<AnalysisCallback | undefined>(onAnalysis);

    // Update callback ref when onAnalysis changes
    useEffect(() => {
        analysisCallbackRef.current = onAnalysis;
    }, [onAnalysis]);

    const initialize = useCallback(async (): Promise<boolean> => {
        if (engine?.isEngineReady()) {
            return true;
        }

        setIsLoading(true);
        setError(null);
        setHasInitialized(true);

        try {
            console.log('useStockfish: Initializing Stockfish engine...');
            const stockfish = new StockfishEngine();

            // Set up analysis callback if provided
            if (analysisCallbackRef.current) {
                stockfish.setAnalysisCallback(analysisCallbackRef.current);
            }

            const success = await stockfish.initialize();

            if (success) {
                setEngine(stockfish);
                setIsReady(true);
                console.log('useStockfish: Stockfish engine initialized successfully');
                return true;
            } else {
                throw new Error('Stockfish initialization failed');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            console.error('useStockfish: Failed to initialize Stockfish:', errorMessage);
            setError(errorMessage);
            setIsReady(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [engine]);

    const analyzePosition = useCallback((fen: string) => {
        if (!engine || !isReady) {
            console.warn('useStockfish: Engine not ready for analysis');
            return;
        }

        try {
            engine.analyzePosition(fen);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
            console.error('useStockfish: Analysis error:', errorMessage);
            setError(errorMessage);
        }
    }, [engine, isReady]);

    const stopAnalysis = useCallback(() => {
        if (!engine) return;

        try {
            engine.stopAnalysis();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to stop analysis';
            console.error('useStockfish: Stop analysis error:', errorMessage);
            setError(errorMessage);
        }
    }, [engine]);

    const setAnalysisCallback = useCallback((callback: AnalysisCallback) => {
        analysisCallbackRef.current = callback;
        if (engine) {
            engine.setAnalysisCallback(callback);
        }
    }, [engine]);

    // Auto-initialize if requested
    useEffect(() => {
        if (autoInitialize && !hasInitialized) {
            console.log('useStockfish: Auto-initializing engine...');
            initialize();
        }
    }, [autoInitialize, hasInitialized, initialize]);

    // Update engine callback when it changes
    useEffect(() => {
        if (engine && analysisCallbackRef.current) {
            engine.setAnalysisCallback(analysisCallbackRef.current);
        }
    }, [engine]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (engine) {
                engine.stopAnalysis();
            }
        };
    }, [engine]);

    return {
        engine,
        isLoading,
        isReady,
        error,
        initialize,
        analyzePosition,
        stopAnalysis,
        setAnalysisCallback,
    };
};

export default useStockfish;
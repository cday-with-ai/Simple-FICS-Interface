import React, {useState} from 'react';
import {useStockfish} from '../hooks/useStockfish';
import type {AnalysisResult} from '@fics/shared';

/**
 * Test component to verify Stockfish integration in React
 * This component demonstrates how to use the useStockfish hook
 */
export const StockfishTest: React.FC = () => {
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [currentFen, setCurrentFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

    console.log('StockfishTest component rendering');

    const {
        engine,
        isLoading,
        isReady,
        error,
        initialize,
        analyzePosition,
        stopAnalysis
    } = useStockfish({
        autoInitialize: true,
        onAnalysis: (result: AnalysisResult) => {
            console.log('Analysis result received:', result);
            if (result.type === 'info') {
                setAnalysisResult(prev => prev + '\n' + result.line);
            } else if (result.type === 'bestmove') {
                setAnalysisResult(prev => prev + '\n' + `Best move: ${result.move}`);
            }
        }
    });

    console.log('Stockfish hook state:', { isLoading, isReady, error, hasEngine: !!engine });

    const handleAnalyze = () => {
        console.log('Analyze button clicked', { isReady, currentFen });
        if (!isReady) {
            console.log('Engine not ready, returning');
            return;
        }
        setAnalysisResult('Starting analysis...\n');
        console.log('Calling analyzePosition with FEN:', currentFen);
        analyzePosition(currentFen);
    };

    const handleStop = () => {
        stopAnalysis();
        setAnalysisResult(prev => prev + '\nAnalysis stopped.\n');
    };

    const handleManualInit = async () => {
        const success = await initialize();
        if (success) {
            setAnalysisResult('Engine initialized successfully!\n');
        } else {
            setAnalysisResult('Engine initialization failed.\n');
        }
    };

    return (
        <div style={{
            padding: '20px',
            fontFamily: 'monospace',
            border: '1px solid #ccc',
            borderRadius: '8px',
            margin: '20px',
            backgroundColor: '#f9f9f9'
        }}>
            <h2>Stockfish Integration Test</h2>

            <div style={{marginBottom: '20px'}}>
                <h3>Engine Status</h3>
                <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
                <p><strong>Ready:</strong> {isReady ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {error || 'None'}</p>
                <p><strong>Engine Instance:</strong> {engine ? 'Available' : 'Not Available'}</p>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>Controls</h3>
                <button
                    onClick={handleManualInit}
                    disabled={isLoading || isReady}
                    style={{
                        marginRight: '10px', 
                        padding: '8px 16px',
                        cursor: (isLoading || isReady) ? 'not-allowed' : 'pointer',
                        opacity: (isLoading || isReady) ? 0.5 : 1,
                        backgroundColor: (isLoading || isReady) ? '#ccc' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    {isLoading ? 'Initializing...' : 'Initialize Engine'}
                </button>

                <button
                    onClick={handleAnalyze}
                    disabled={!isReady}
                    style={{
                        marginRight: '10px', 
                        padding: '8px 16px',
                        cursor: isReady ? 'pointer' : 'not-allowed',
                        opacity: isReady ? 1 : 0.5,
                        backgroundColor: isReady ? '#4CAF50' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Analyze Position
                </button>

                <button
                    onClick={handleStop}
                    disabled={!isReady}
                    style={{
                        padding: '8px 16px',
                        cursor: isReady ? 'pointer' : 'not-allowed',
                        opacity: isReady ? 1 : 0.5,
                        backgroundColor: isReady ? '#f44336' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Stop Analysis
                </button>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>FEN Position</h3>
                <input
                    type="text"
                    value={currentFen}
                    onChange={(e) => setCurrentFen(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        fontFamily: 'monospace',
                        fontSize: '12px'
                    }}
                    placeholder="Enter FEN position to analyze"
                />
                <p style={{fontSize: '12px', color: '#666'}}>
                    Default: Starting position. Try: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 4 4"
                </p>
            </div>

            <div>
                <h3>Analysis Output</h3>
                <textarea
                    value={analysisResult}
                    readOnly
                    style={{
                        width: '100%',
                        height: '200px',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: '#fff'
                    }}
                    placeholder="Analysis results will appear here..."
                />
            </div>

            <div style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
                <h4>Instructions:</h4>
                <ol>
                    <li>Check that "Ready" shows "Yes" (engine should auto-initialize)</li>
                    <li>Click "Analyze Position" to start analysis</li>
                    <li>Watch for analysis output in the textarea</li>
                    <li>Click "Stop Analysis" to halt the engine</li>
                    <li>Try different FEN positions to test various scenarios</li>
                </ol>

                <h4>Troubleshooting:</h4>
                <ul>
                    <li>If loading hangs, check browser console for CORS errors</li>
                    <li>Ensure CORS headers are set correctly (see DEPLOYMENT.md)</li>
                    <li>Verify sf16-7.js and sf16-7.wasm are in the public directory</li>
                    <li>Try in different browsers to test compatibility</li>
                </ul>
            </div>
        </div>
    );
};

export default StockfishTest;
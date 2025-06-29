/**
 * Integration tests for chess analysis functionality
 */

// Mock the Stockfish engine for testing
class MockStockfishEngine {
    constructor() {
        this.isReady = false;
        this.isAnalyzing = false;
        this.analysisCallback = null;
    }

    async initialize() {
        this.isReady = true;
        return true;
    }

    analyzePosition(fen, callback) {
        this.isAnalyzing = true;
        this.analysisCallback = callback;

        // Simulate analysis result after a short delay
        setTimeout(() => {
            if (this.analysisCallback) {
                this.analysisCallback({
                    evaluation: 0.25,
                    bestMove: 'e2e4',
                    mateInMoves: null,
                    principalVariation: ['e2e4', 'e7e5'],
                    isComplete: true
                });
            }
            this.isAnalyzing = false;
        }, 100);
    }

    stopAnalysis() {
        this.isAnalyzing = false;
        this.analysisCallback = null;
    }

    longToShortAlgebraic(longMove, chessBoard) {
        // Simple conversion for testing
        if (longMove === 'e2e4') return 'e4';
        if (longMove === 'e7e5') return 'e5';
        return longMove;
    }

    destroy() {
        this.isReady = false;
        this.isAnalyzing = false;
        this.analysisCallback = null;
    }
}

describe('Chess Analysis Integration', () => {
    let originalStockfishEngine;
    let mockEngine;

    beforeEach(() => {
        // Mock the StockfishEngine class
        originalStockfishEngine = window.StockfishEngine;
        window.StockfishEngine = MockStockfishEngine;

        // Reset game state
        if (window.gameState) {
            window.gameState.perspective = window.Perspective.FREESTYLE;
            window.gameState.analysis = {
                engine: null,
                isActive: false,
                bestMove: '',
                evaluation: 0,
                mateInMoves: null,
                principalVariation: [],
                isEngineReady: false
            };
        }

        // Create mock DOM elements for analysis UI
        const analysisContainer = document.createElement('div');
        analysisContainer.id = 'analysisContainer';
        analysisContainer.style.display = 'none';

        const bestMoveElement = document.createElement('div');
        bestMoveElement.id = 'analysisBestMove';

        const evaluationElement = document.createElement('div');
        evaluationElement.id = 'analysisEvaluation';

        const whiteBar = document.createElement('div');
        whiteBar.id = 'analysisWhiteBar';

        const blackBar = document.createElement('div');
        blackBar.id = 'analysisBlackBar';

        analysisContainer.appendChild(bestMoveElement);
        analysisContainer.appendChild(evaluationElement);
        analysisContainer.appendChild(whiteBar);
        analysisContainer.appendChild(blackBar);

        document.body.appendChild(analysisContainer);

        // Create main console for analysis UI creation
        const mainConsole = document.createElement('div');
        mainConsole.className = 'main-console';
        document.body.appendChild(mainConsole);
    });

    afterEach(() => {
        // Restore original StockfishEngine
        window.StockfishEngine = originalStockfishEngine;

        // Clean up DOM
        const analysisContainer = document.getElementById('analysisContainer');
        if (analysisContainer) {
            analysisContainer.remove();
        }

        const mainConsole = document.querySelector('.main-console');
        if (mainConsole) {
            mainConsole.remove();
        }
    });

    describe('Analysis Perspective', () => {
        it('should be included in Perspective enum', () => {
            expect(window.Perspective.ANALYSIS).toBeDefined();
            expect(window.Perspective.ANALYSIS).toBe(8);
        });

        it('should initialize analysis state in gameState', () => {
            expect(window.gameState.analysis).toBeDefined();
            expect(window.gameState.analysis.engine).toBe(null);
            expect(window.gameState.analysis.isActive).toBe(false);
            expect(window.gameState.analysis.isEngineReady).toBe(false);
        });
    });

    describe('Analysis Engine Integration', () => {
        it('should initialize Stockfish engine when entering analysis mode', async () => {
            // Call onAnalysis function
            await window.onAnalysis();

            expect(window.gameState.analysis.engine).toBeDefined();
            expect(window.gameState.analysis.isEngineReady).toBe(true);
            expect(window.gameState.perspective).toBe(window.Perspective.ANALYSIS);
        });

        it('should start position analysis when engine is ready', async () => {
            await window.onAnalysis();

            // Verify analysis starts
            expect(window.gameState.analysis.isActive).toBe(true);
        });

        it('should update analysis display with engine results', (done) => {
            window.onAnalysis().then(() => {
                // Wait for analysis to complete
                setTimeout(() => {
                    const bestMoveElement = document.getElementById('analysisBestMove');
                    const evaluationElement = document.getElementById('analysisEvaluation');

                    expect(bestMoveElement.textContent).toContain('Best move: e4');
                    expect(evaluationElement.textContent).toBe('+0.25');

                    done();
                }, 200);
            });
        });
    });

    describe('Analysis UI Components', () => {
        it('should show analysis container in analysis perspective', async () => {
            await window.onAnalysis();

            const analysisContainer = document.getElementById('analysisContainer');
            expect(analysisContainer.style.display).toBe('block');
        });

        it('should hide analysis container in other perspectives', async () => {
            await window.onAnalysis();

            // Switch to different perspective
            window.gameState.perspective = window.Perspective.FREESTYLE;
            window.updateUIForPerspective();

            const analysisContainer = document.getElementById('analysisContainer');
            expect(analysisContainer.style.display).toBe('none');
        });

        it('should update strength bars based on evaluation', async () => {
            await window.onAnalysis();

            // Wait for analysis to complete
            setTimeout(() => {
                const whiteBar = document.getElementById('analysisWhiteBar');
                const blackBar = document.getElementById('analysisBlackBar');

                // With +0.25 evaluation, white should have slight advantage
                expect(parseFloat(whiteBar.style.height)).toBeGreaterThan(50);
                expect(parseFloat(blackBar.style.height)).toBeLessThan(50);
            }, 200);
        });
    });

    describe('Analysis Integration with Navigation', () => {
        it('should trigger analysis when navigating moves in analysis mode', async () => {
            await window.onAnalysis();

            // Mock the startPositionAnalysis function to track calls
            let analysisCalled = false;
            const originalStartAnalysis = window.startPositionAnalysis;
            window.startPositionAnalysis = () => {
                analysisCalled = true;
                if (originalStartAnalysis) originalStartAnalysis();
            };

            // Simulate move navigation
            if (window.jumpToFirstMove) {
                window.jumpToFirstMove();
                expect(analysisCalled).toBe(true);
            }

            // Restore original function
            window.startPositionAnalysis = originalStartAnalysis;
        });
    });

    describe('Analysis Cleanup', () => {
        it('should properly cleanup when exiting analysis mode', async () => {
            await window.onAnalysis();

            // Exit analysis mode
            window.exitAnalysisMode();

            expect(window.gameState.perspective).toBe(window.Perspective.FREESTYLE);
            expect(window.gameState.analysis.isActive).toBe(false);

            const analysisContainer = document.getElementById('analysisContainer');
            expect(analysisContainer).toBe(null);
        });
    });
});

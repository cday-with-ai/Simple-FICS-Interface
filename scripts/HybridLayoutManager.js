/**
 * Hybrid Layout Manager - Fast CSS + JavaScript positioning
 * Uses CSS custom properties for instant responsive updates
 * JavaScript only calculates values, CSS handles the positioning
 */

class HybridLayoutManager {
    constructor() {
        this.currentMode = 'standard';
        this.elements = {};
        this.isCalculating = false;
        
        this.init();
    }
    
    /**
     * Initialize the layout manager
     */
    init() {
        this.findElements();
        this.setupCSSProperties();
        this.bindEvents();
        this.calculateDimensions();
        
        console.log('HybridLayoutManager: Initialized');
    }
    
    /**
     * Find all layout elements
     */
    findElements() {
        this.elements = {
            container: document.querySelector('.chess-layout-container'),
            gameInfo: document.querySelector('.chess-game-info'),
            board: document.getElementById('chessBoard'),
            boardWrapper: document.querySelector('.chess-board-wrapper'),
            playerSection: document.querySelector('.chess-player-section')
        };
    }
    
    /**
     * Setup CSS custom properties for dynamic values
     */
    setupCSSProperties() {
        const root = document.documentElement;
        
        // Set initial values
        root.style.setProperty('--window-width', `${window.innerWidth}px`);
        root.style.setProperty('--window-height', `${window.innerHeight}px`);
        root.style.setProperty('--board-size', '400px');
        root.style.setProperty('--player-panel-width', '200px');
        root.style.setProperty('--layout-gap', '15px');
        root.style.setProperty('--font-scale', '1');
        
        // Position properties
        root.style.setProperty('--game-info-x', '10px');
        root.style.setProperty('--game-info-y', '10px');
        root.style.setProperty('--board-x', '10px');
        root.style.setProperty('--board-y', '50px');
        root.style.setProperty('--player-x', '425px');
        root.style.setProperty('--player-y', '50px');
    }
    
    /**
     * Bind events with optimized handling
     */
    bindEvents() {
        let resizeTimer;
        let rafId;
        
        // Optimized resize handler
        window.addEventListener('resize', () => {
            // Cancel previous animation frame
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            // Update window dimensions immediately (CSS handles the rest)
            this.updateWindowDimensions();
            
            // Debounce the heavy calculations
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                rafId = requestAnimationFrame(() => {
                    this.calculateDimensions();
                });
            }, 50); // Very short debounce for responsiveness
        });
        
        // Layout mode changes
        document.addEventListener('layoutModeChange', (e) => {
            this.currentMode = e.detail.mode;
            this.calculateDimensions();
        });
    }
    
    /**
     * Update window dimensions immediately for CSS
     */
    updateWindowDimensions() {
        const root = document.documentElement;
        root.style.setProperty('--window-width', `${window.innerWidth}px`);
        root.style.setProperty('--window-height', `${window.innerHeight}px`);
    }
    
    /**
     * Calculate and update all dimensions
     */
    calculateDimensions() {
        if (this.isCalculating) return;
        this.isCalculating = true;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate dimensions based on mode
        let boardSize, playerPanelWidth, fontScale;
        let gameInfoX, gameInfoY, boardX, boardY, playerX, playerY;
        
        if (this.currentMode === 'standard') {
            // Standard layout calculations
            playerPanelWidth = Math.max(150, Math.min(250, windowWidth * 0.2));
            const availableWidth = windowWidth - playerPanelWidth - 35; // margins + gap
            const availableHeight = windowHeight - 70; // game info + margins
            
            boardSize = Math.min(availableWidth, availableHeight);
            boardSize = Math.max(200, Math.min(boardSize, 800));
            
            // Positions
            gameInfoX = 10;
            gameInfoY = 10;
            boardX = 10;
            boardY = 50;
            playerX = boardX + boardSize + 15;
            playerY = boardY;
            
        } else {
            // Compact layout calculations
            playerPanelWidth = Math.min(windowWidth - 40, 400);
            const availableWidth = windowWidth - 40;
            const availableHeight = windowHeight - 150; // game info + player areas + margins
            
            boardSize = Math.min(availableWidth, availableHeight);
            boardSize = Math.max(200, Math.min(boardSize, 600));
            
            // Center positions
            const centerX = (windowWidth - boardSize) / 2;
            gameInfoX = centerX;
            gameInfoY = 10;
            boardX = centerX;
            boardY = 70;
            playerX = centerX;
            playerY = boardY + boardSize + 15;
        }
        
        // Font scaling
        if (windowWidth > 1200) {
            fontScale = 1.0;
        } else if (windowWidth > 768) {
            fontScale = 0.85;
        } else if (windowWidth > 480) {
            fontScale = 0.7;
        } else {
            fontScale = 0.55;
        }
        
        // Update CSS properties (this is instant)
        this.updateCSSProperties({
            boardSize,
            playerPanelWidth,
            fontScale,
            gameInfoX,
            gameInfoY,
            boardX,
            boardY,
            playerX,
            playerY
        });
        
        this.isCalculating = false;
    }
    
    /**
     * Update CSS custom properties (instant)
     */
    updateCSSProperties(values) {
        const root = document.documentElement;
        
        root.style.setProperty('--board-size', `${values.boardSize}px`);
        root.style.setProperty('--player-panel-width', `${values.playerPanelWidth}px`);
        root.style.setProperty('--font-scale', values.fontScale);
        
        root.style.setProperty('--game-info-x', `${values.gameInfoX}px`);
        root.style.setProperty('--game-info-y', `${values.gameInfoY}px`);
        root.style.setProperty('--board-x', `${values.boardX}px`);
        root.style.setProperty('--board-y', `${values.boardY}px`);
        root.style.setProperty('--player-x', `${values.playerX}px`);
        root.style.setProperty('--player-y', `${values.playerY}px`);
    }
    
    /**
     * Public methods
     */
    setMode(mode) {
        this.currentMode = mode;
        
        // Update container class immediately
        const container = this.elements.container;
        if (container) {
            container.className = `chess-layout-container layout-${mode}`;
        }
        
        // Recalculate positions
        requestAnimationFrame(() => {
            this.calculateDimensions();
        });
    }
    
    getCurrentMode() {
        return this.currentMode;
    }
    
    getBoardSize() {
        const root = document.documentElement;
        const boardSize = root.style.getPropertyValue('--board-size');
        return parseInt(boardSize) || 400;
    }
    
    recalculate() {
        requestAnimationFrame(() => {
            this.calculateDimensions();
        });
    }
    
    getDimensions() {
        const root = document.documentElement;
        return {
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            board: {
                size: parseInt(root.style.getPropertyValue('--board-size')) || 400,
                x: parseInt(root.style.getPropertyValue('--board-x')) || 10,
                y: parseInt(root.style.getPropertyValue('--board-y')) || 50
            },
            playerPanel: {
                width: parseInt(root.style.getPropertyValue('--player-panel-width')) || 200
            },
            fontScale: parseFloat(root.style.getPropertyValue('--font-scale')) || 1
        };
    }
}

// Export for use
window.HybridLayoutManager = HybridLayoutManager;

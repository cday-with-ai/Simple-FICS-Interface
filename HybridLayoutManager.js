/**
 * HYBRID LAYOUT MANAGER - Replace your existing layout manager with this
 * 
 * This handles switching between standard and compact modes with proper positioning
 */

class HybridLayoutManager {
    constructor() {
        this.mode = 'standard';
        this.recalculate();
    }

    /**
     * Set the layout mode
     * @param {string} mode - 'standard' or 'compact'
     */
    setMode(mode) {
        this.mode = mode;
        const container = document.querySelector('.chess-layout-container');
        if (container) {
            container.className = `chess-layout-container layout-${mode}`;
        }
        this.recalculate();
    }

    /**
     * Get current layout mode
     * @returns {string} Current mode
     */
    getCurrentMode() {
        return this.mode;
    }

    /**
     * Recalculate and update all positioning
     * Call this on window resize or mode changes
     */
    recalculate() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate board size (responsive)
        const maxBoardSize = Math.min(windowWidth * 0.6, windowHeight * 0.8);
        const boardSize = Math.max(300, Math.min(500, maxBoardSize));
        
        // Position calculations based on mode
        let boardX, boardY, playerX, playerY;
        
        if (this.mode === 'compact') {
            // Compact mode: center board, player info above/below
            boardX = Math.max(45, (windowWidth - boardSize) / 2); // Leave space for strength bar
            boardY = 100; // More space for top player info to avoid overlap
            playerX = boardX; // Align with board
            playerY = 50;
        } else {
            // Standard mode: board left, player panel right
            boardX = 45; // Leave space for strength bar
            boardY = 50;
            playerX = boardSize + 70; // Account for strength bar offset
            playerY = 50;
        }
        
        // Update CSS variables
        document.documentElement.style.setProperty('--board-size', `${boardSize}px`);
        document.documentElement.style.setProperty('--board-x', `${boardX}px`);
        document.documentElement.style.setProperty('--board-y', `${boardY}px`);
        document.documentElement.style.setProperty('--player-x', `${playerX}px`);
        document.documentElement.style.setProperty('--player-y', `${playerY}px`);
        document.documentElement.style.setProperty('--player-panel-width', '200px');
        document.documentElement.style.setProperty('--font-scale', '1');
    }

    /**
     * Get current dimensions for debugging
     * @returns {Object} Dimension information
     */
    getDimensions() {
        return {
            window: { width: window.innerWidth, height: window.innerHeight },
            board: { 
                size: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-size')), 
                x: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-x')), 
                y: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-y'))
            },
            playerPanel: { width: 200 },
            fontScale: 1,
            mode: this.mode
        };
    }

    /**
     * Auto-detect best mode based on screen size
     * @returns {string} Recommended mode
     */
    getRecommendedMode() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Use compact mode for smaller screens or mobile
        if (windowWidth < 800 || windowHeight < 600) {
            return 'compact';
        }
        
        return 'standard';
    }

    /**
     * Set mode based on screen size
     */
    autoSetMode() {
        const recommendedMode = this.getRecommendedMode();
        this.setMode(recommendedMode);
    }
}

// Export for use in your main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HybridLayoutManager;
}

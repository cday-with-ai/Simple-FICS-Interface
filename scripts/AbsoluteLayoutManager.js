/**
 * Absolute Layout Manager - Manual positioning system for chess interface
 * Uses JavaScript calculations and absolute positioning for pixel-perfect control
 */

class AbsoluteLayoutManager {
    constructor() {
        this.currentMode = 'standard';
        this.elements = {};
        this.dimensions = {
            window: { width: 0, height: 0 },
            board: { size: 400, x: 0, y: 0 },
            playerPanel: { width: 200, height: 0 },
            gameInfo: { height: 30 },
            margins: { top: 10, left: 10, gap: 15 }
        };
        
        this.fontScales = {
            large: 1.0,    // > 1200px
            medium: 0.85,  // 768-1200px  
            small: 0.7,    // 480-768px
            tiny: 0.55     // < 480px
        };
        
        this.init();
    }
    
    /**
     * Initialize the layout manager
     */
    init() {
        this.findElements();
        this.setupContainers();
        this.bindEvents();
        this.calculateAndPosition();
        
        console.log('AbsoluteLayoutManager: Initialized');
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
            playerSection: document.querySelector('.chess-player-section'),
            playerTop: document.querySelector('.chess-player-top'),
            playerBottom: document.querySelector('.chess-player-bottom'),
            actionButtons: document.querySelector('.chess-action-buttons')
        };
        
        // Log found elements
        const found = Object.keys(this.elements).filter(key => this.elements[key]);
        console.log(`AbsoluteLayoutManager: Found elements: ${found.join(', ')}`);
    }
    
    /**
     * Setup containers for absolute positioning
     */
    setupContainers() {
        if (this.elements.container) {
            this.elements.container.style.position = 'relative';
            this.elements.container.style.width = '100vw';
            this.elements.container.style.height = '100vh';
            this.elements.container.style.overflow = 'hidden';
            this.elements.container.style.padding = '0';
            this.elements.container.style.margin = '0';
        }
        
        // Set all major elements to absolute positioning
        const absoluteElements = [
            'gameInfo', 'boardWrapper', 'playerSection', 
            'playerTop', 'playerBottom', 'actionButtons'
        ];
        
        absoluteElements.forEach(key => {
            if (this.elements[key]) {
                this.elements[key].style.position = 'absolute';
                this.elements[key].style.margin = '0';
            }
        });
    }
    
    /**
     * Bind window resize and other events
     */
    bindEvents() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateAndPosition();
            }, 100);
        });
        
        // Listen for layout mode changes
        document.addEventListener('layoutModeChange', (e) => {
            this.currentMode = e.detail.mode;
            this.calculateAndPosition();
        });
    }
    
    /**
     * Main calculation and positioning function
     */
    calculateAndPosition() {
        this.updateDimensions();
        this.calculateBoardSize();
        this.calculateFontScale();
        
        if (this.currentMode === 'standard') {
            this.positionStandardLayout();
        } else if (this.currentMode === 'compact') {
            this.positionCompactLayout();
        }
        
        this.applyFontScaling();
        
        console.log(`AbsoluteLayoutManager: Positioned ${this.currentMode} layout`, this.dimensions);
    }
    
    /**
     * Update window and available dimensions
     */
    updateDimensions() {
        this.dimensions.window.width = window.innerWidth;
        this.dimensions.window.height = window.innerHeight;
        
        // Calculate available space for different modes
        if (this.currentMode === 'standard') {
            this.dimensions.playerPanel.width = Math.max(150, Math.min(250, this.dimensions.window.width * 0.2));
        } else {
            this.dimensions.playerPanel.width = Math.min(this.dimensions.window.width - 40, 400);
        }
    }
    
    /**
     * Calculate optimal board size
     */
    calculateBoardSize() {
        const margins = this.dimensions.margins;
        
        if (this.currentMode === 'standard') {
            // Standard: Board on left, player panel on right
            const availableWidth = this.dimensions.window.width - this.dimensions.playerPanel.width - margins.left - margins.gap - 20;
            const availableHeight = this.dimensions.window.height - this.dimensions.gameInfo.height - margins.top - 20;
            
            this.dimensions.board.size = Math.min(availableWidth, availableHeight);
            this.dimensions.board.size = Math.max(200, Math.min(this.dimensions.board.size, 800));
            
        } else {
            // Compact: Board in center, players top/bottom
            const availableWidth = this.dimensions.window.width - margins.left - 20;
            const availableHeight = this.dimensions.window.height - this.dimensions.gameInfo.height - 120 - margins.top; // 120 for player areas
            
            this.dimensions.board.size = Math.min(availableWidth, availableHeight);
            this.dimensions.board.size = Math.max(200, Math.min(this.dimensions.board.size, 600));
        }
    }
    
    /**
     * Calculate font scale based on screen size
     */
    calculateFontScale() {
        const width = this.dimensions.window.width;
        
        if (width > 1200) {
            this.currentFontScale = this.fontScales.large;
        } else if (width > 768) {
            this.currentFontScale = this.fontScales.medium;
        } else if (width > 480) {
            this.currentFontScale = this.fontScales.small;
        } else {
            this.currentFontScale = this.fontScales.tiny;
        }
    }
    
    /**
     * Position elements for standard (side-by-side) layout
     */
    positionStandardLayout() {
        const margins = this.dimensions.margins;
        const boardSize = this.dimensions.board.size;
        
        // Game info at top left
        if (this.elements.gameInfo) {
            this.elements.gameInfo.style.left = `${margins.left}px`;
            this.elements.gameInfo.style.top = `${margins.top}px`;
            this.elements.gameInfo.style.width = `${boardSize}px`;
            this.elements.gameInfo.style.height = `${this.dimensions.gameInfo.height}px`;
        }
        
        // Board wrapper below game info
        if (this.elements.boardWrapper) {
            this.dimensions.board.x = margins.left;
            this.dimensions.board.y = margins.top + this.dimensions.gameInfo.height + 10;
            
            this.elements.boardWrapper.style.left = `${this.dimensions.board.x}px`;
            this.elements.boardWrapper.style.top = `${this.dimensions.board.y}px`;
            this.elements.boardWrapper.style.width = `${boardSize}px`;
            this.elements.boardWrapper.style.height = `${boardSize}px`;
        }
        
        // Board itself
        if (this.elements.board) {
            this.elements.board.style.width = `${boardSize}px`;
            this.elements.board.style.height = `${boardSize}px`;
        }
        
        // Player section to the right of board
        if (this.elements.playerSection) {
            const playerX = this.dimensions.board.x + boardSize + margins.gap;
            const playerY = this.dimensions.board.y;
            
            this.elements.playerSection.style.left = `${playerX}px`;
            this.elements.playerSection.style.top = `${playerY}px`;
            this.elements.playerSection.style.width = `${this.dimensions.playerPanel.width}px`;
            this.elements.playerSection.style.height = `${boardSize}px`;
        }
    }
    
    /**
     * Position elements for compact (top/bottom) layout
     */
    positionCompactLayout() {
        const margins = this.dimensions.margins;
        const boardSize = this.dimensions.board.size;
        const centerX = (this.dimensions.window.width - boardSize) / 2;
        
        // Game info at top center
        if (this.elements.gameInfo) {
            this.elements.gameInfo.style.left = `${centerX}px`;
            this.elements.gameInfo.style.top = `${margins.top}px`;
            this.elements.gameInfo.style.width = `${boardSize}px`;
            this.elements.gameInfo.style.height = `${this.dimensions.gameInfo.height}px`;
        }
        
        // Top player
        if (this.elements.playerTop) {
            this.elements.playerTop.style.left = `${centerX}px`;
            this.elements.playerTop.style.top = `${margins.top + this.dimensions.gameInfo.height + 10}px`;
            this.elements.playerTop.style.width = `${boardSize}px`;
            this.elements.playerTop.style.height = '50px';
        }
        
        // Board in center
        if (this.elements.boardWrapper) {
            this.dimensions.board.x = centerX;
            this.dimensions.board.y = margins.top + this.dimensions.gameInfo.height + 70;
            
            this.elements.boardWrapper.style.left = `${this.dimensions.board.x}px`;
            this.elements.boardWrapper.style.top = `${this.dimensions.board.y}px`;
            this.elements.boardWrapper.style.width = `${boardSize}px`;
            this.elements.boardWrapper.style.height = `${boardSize}px`;
        }
        
        if (this.elements.board) {
            this.elements.board.style.width = `${boardSize}px`;
            this.elements.board.style.height = `${boardSize}px`;
        }
        
        // Bottom player
        if (this.elements.playerBottom) {
            this.elements.playerBottom.style.left = `${centerX}px`;
            this.elements.playerBottom.style.top = `${this.dimensions.board.y + boardSize + 10}px`;
            this.elements.playerBottom.style.width = `${boardSize}px`;
            this.elements.playerBottom.style.height = '50px';
        }
        
        // Hide side player section in compact mode
        if (this.elements.playerSection) {
            this.elements.playerSection.style.display = 'none';
        }
    }
    
    /**
     * Apply font scaling to all text elements
     */
    applyFontScaling() {
        document.documentElement.style.setProperty('--font-scale', this.currentFontScale);
        
        // Apply to specific elements
        const textElements = document.querySelectorAll('.chess-player-name, .chess-player-rating, .chess-player-clock, .chess-game-info');
        textElements.forEach(el => {
            const baseFontSize = parseFloat(getComputedStyle(el).fontSize);
            el.style.fontSize = `${baseFontSize * this.currentFontScale}px`;
        });
    }
    
    /**
     * Public methods
     */
    setMode(mode) {
        this.currentMode = mode;
        this.calculateAndPosition();
    }
    
    getCurrentMode() {
        return this.currentMode;
    }
    
    getBoardSize() {
        return this.dimensions.board.size;
    }
    
    getDimensions() {
        return { ...this.dimensions };
    }
    
    recalculate() {
        this.calculateAndPosition();
    }
}

// Export for use
window.AbsoluteLayoutManager = AbsoluteLayoutManager;

/**
 * HYBRID LAYOUT MANAGER - Replaces old layout system
 * Handles switching between standard and compact modes with absolute positioning
 */

class LayoutManager {
    constructor() {
        this.mode = 'standard';
        this.availableLayouts = ['standard', 'compact'];
        this.perspective = 'OBSERVING'; // PLAYING, OBSERVING, EXAMINING, FREESTYLE
        this.playerColor = 'white'; // white or black (when playing)
        this.boardFlipped = false; // Track board orientation
        this.initialized = false;
        this.elements = {}; // Cache for DOM elements

        this.init();
    }
    
    /**
     * Initialize the layout manager
     */
    init() {
        if (this.initialized) return;

        console.log('HybridLayoutManager: Initializing...');

        // Set up event listeners
        this.setupEventListeners();

        // Apply initial layout
        this.setMode(this.mode);

        this.initialized = true;
        console.log('HybridLayoutManager: Initialized successfully');
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.recalculate();
        });
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

    /**
     * Set the game perspective and update UI accordingly
     * @param {string} perspective - 'PLAYING', 'OBSERVING', 'EXAMINING', 'FREESTYLE'
     * @param {string} playerColor - 'white' or 'black' (when playing)
     */
    setPerspective(perspective, playerColor = 'white') {
        this.perspective = perspective;
        this.playerColor = playerColor;

        console.log(`LayoutManager: Setting perspective to ${perspective} (${playerColor})`);

        // Update UI elements based on perspective
        this.updateUIForPerspective();

        // Trigger custom event
        document.dispatchEvent(new CustomEvent('perspectiveChanged', {
            detail: { perspective, playerColor }
        }));
    }

    /**
     * Get current perspective
     * @returns {Object} Current perspective info
     */
    getPerspective() {
        return {
            perspective: this.perspective,
            playerColor: this.playerColor
        };
    }

    /**
     * Update UI elements based on current perspective
     */
    updateUIForPerspective() {
        this.updateActionButtons();
        this.updateMoveList();
        this.updateAutoPromotion();
        this.updatePlayerInfo();
    }

    /**
     * Update action buttons visibility based on perspective
     */
    updateActionButtons() {
        // Update standard mode action buttons
        const actionButtons = document.querySelectorAll('.chess-action-buttons');

        actionButtons.forEach(container => {
            // Clear existing buttons
            container.innerHTML = '';

            let buttons = this.getButtonsForPerspective();

            // Create and append all buttons for standard mode
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = `chess-action-button ${btn.class}`;
                button.textContent = btn.text;
                button.dataset.action = btn.action;
                if (btn.id) button.id = btn.id;
                container.appendChild(button);
            });
        });

        // Update compact mode hamburger menu
        this.updateHamburgerMenu();
    }

    /**
     * Get buttons for current perspective
     */
    getButtonsForPerspective() {
        let buttons = [];

        if (this.perspective === 'PLAYING') {
            // Playing: Show game control buttons
            buttons = [
                { text: 'Resign', class: 'primary', action: 'resign' },
                { text: 'Draw', class: 'secondary', action: 'draw' },
                { text: 'Abort', class: 'secondary', action: 'abort', id: 'abortBtn' },
                { text: 'Flip Board', class: 'secondary', action: 'flip' },
                { text: 'Analysis', class: 'secondary', action: 'analysis' }
            ];

        } else if (this.perspective === 'OBSERVING') {
            // Observing: Show analysis and rematch buttons
            buttons = [
                { text: 'Analysis', class: 'secondary', action: 'analysis' },
                { text: 'Flip Board', class: 'secondary', action: 'flip' },
                { text: 'Rematch', class: 'secondary', action: 'rematch' }
            ];

        } else if (this.perspective === 'EXAMINING' || this.perspective === 'FREESTYLE') {
            // Examining/Freestyle: Show examination controls
            buttons = [
                { text: 'Analysis', class: 'secondary', action: 'analysis' },
                { text: 'Flip Board', class: 'secondary', action: 'flip' },
                { text: 'Setup FEN', class: 'secondary', action: 'setupfen' },
                { text: 'Clear Board', class: 'secondary', action: 'clear' }
            ];
        }

        return buttons;
    }

    /**
     * Update hamburger menu items for compact mode
     */
    updateHamburgerMenu() {
        const hamburgerDropdown = document.querySelector('.chess-hamburger-dropdown');
        if (!hamburgerDropdown) return;

        // Clear existing items
        hamburgerDropdown.innerHTML = '';

        // Get buttons for current perspective
        const buttons = this.getButtonsForPerspective();

        // Create menu items
        buttons.forEach(btn => {
            const menuItem = document.createElement('button');
            menuItem.className = 'chess-hamburger-item';
            menuItem.textContent = btn.text;
            menuItem.dataset.action = btn.action;
            if (btn.id) menuItem.id = btn.id + 'Compact';
            hamburgerDropdown.appendChild(menuItem);
        });
    }
    
    /**
     * Legacy method for compatibility - maps to setMode
     */
    setLayout(layoutName) {
        if (layoutName === 'standard' || layoutName === 'compact') {
            this.setMode(layoutName);
        } else {
            console.warn(`HybridLayoutManager: Layout "${layoutName}" not supported. Use 'standard' or 'compact'.`);
        }
    }

    /**
     * Update move list visibility based on perspective
     */
    updateMoveList() {
        const moveLists = document.querySelectorAll('.chess-move-list');

        moveLists.forEach(moveList => {
            if (this.perspective === 'PLAYING') {
                // Hide move list during active play to reduce distractions
                moveList.style.display = 'none';
            } else {
                // Show move list for observing/examining
                moveList.style.display = 'block';
            }
        });
    }

    /**
     * Update auto promotion visibility based on perspective
     */
    updateAutoPromotion() {
        const autoPromotions = document.querySelectorAll('.chess-auto-promotion, .chess-auto-promotion-compact');

        autoPromotions.forEach(promotion => {
            if (this.perspective === 'PLAYING') {
                // Show auto promotion when playing
                promotion.style.display = this.mode === 'standard' ? 'block' : 'none';
            } else {
                // Hide auto promotion when not playing
                promotion.style.display = 'none';
            }
        });
    }

    /**
     * Update player info based on perspective and color
     */
    updatePlayerInfo() {
        // Update player positions based on playing color
        if (this.perspective === 'PLAYING' && this.playerColor === 'black') {
            // When playing as black, flip the player positions
            this.updatePlayerPositions(true);
        } else {
            // Default: white on bottom
            this.updatePlayerPositions(false);
        }
    }

    /**
     * Update player positions (flip for black perspective)
     * @param {boolean} blackOnBottom - Whether black player should be on bottom
     */
    updatePlayerPositions(blackOnBottom) {
        // This will be implemented when we connect to actual game state
        // For now, just log the intended behavior
        console.log(`LayoutManager: Player positions - black on bottom: ${blackOnBottom}`);
    }

    /**
     * Toggle board flip state
     */
    toggleBoardFlip() {
        this.boardFlipped = !this.boardFlipped;
        console.log(`LayoutManager: Board flipped - ${this.boardFlipped}`);

        // Trigger custom event for board flip
        document.dispatchEvent(new CustomEvent('boardFlipped', {
            detail: { flipped: this.boardFlipped }
        }));

        return this.boardFlipped;
    }

    /**
     * Get current board flip state
     * @returns {boolean} Whether board is flipped
     */
    isBoardFlipped() {
        return this.boardFlipped;
    }

    /**
     * Set board flip state
     * @param {boolean} flipped - Whether board should be flipped
     */
    setBoardFlipped(flipped) {
        if (this.boardFlipped !== flipped) {
            this.toggleBoardFlip();
        }
    }

    /**
     * Create the hybrid layout structure dynamically
     * @param {HTMLElement} container - Container element to create layout in
     * @param {Object} gameState - Current game state
     */
    createLayout(container, gameState = {}) {
        console.log('LayoutManager: Creating hybrid layout structure...');

        // Clear existing content
        container.innerHTML = '';

        // Create main layout container
        const layoutContainer = document.createElement('div');
        layoutContainer.className = `chess-layout-container layout-${this.mode}`;

        // Create all layout components
        const components = {
            gameInfo: this.createGameInfo(gameState),
            boardWrapper: this.createBoardWrapper(),
            playerSection: this.createPlayerSection(gameState),
            moveOpeningInfoStandard: this.createMoveOpeningInfo('standard'),
            playerTop: this.createPlayerTop(gameState),
            gameInfoCompact: this.createGameInfoCompact(gameState),
            moveOpeningInfo: this.createMoveOpeningInfo('compact'),
            playerBottom: this.createPlayerBottom(gameState)
        };

        // Assemble layout
        Object.values(components).forEach(component => {
            if (component) layoutContainer.appendChild(component);
        });

        // Add to container
        container.appendChild(layoutContainer);

        // Cache elements
        this.cacheElements();

        // Update UI for current perspective
        this.updateUIForPerspective();

        // Recalculate positioning
        this.recalculate();

        console.log('LayoutManager: Layout created successfully');
        return layoutContainer;
    }

    /**
     * Create game info component
     */
    createGameInfo(gameState) {
        const gameInfo = document.createElement('div');
        gameInfo.className = 'chess-game-info';
        gameInfo.innerHTML = `
            <span class="chess-game-number">Game ${gameState.gameNumber || 'N/A'}</span>
            <span class="chess-game-type">${gameState.gameType || 'Unknown'}</span>
        `;
        return gameInfo;
    }

    /**
     * Create compact game info component with hamburger menu
     */
    createGameInfoCompact(gameState) {
        const gameInfoCompact = document.createElement('div');
        gameInfoCompact.className = 'chess-game-info-compact';

        // Create game number span
        const gameNumber = document.createElement('span');
        gameNumber.className = 'chess-game-number';
        gameNumber.textContent = `Game ${gameState.gameNumber || 'N/A'}`;

        // Create hamburger menu
        const hamburgerMenu = this.createHamburgerMenu();

        // Create game type span
        const gameType = document.createElement('span');
        gameType.className = 'chess-game-type';
        gameType.textContent = gameState.gameType || 'Unknown';

        // Assemble compact game info
        gameInfoCompact.appendChild(gameNumber);
        gameInfoCompact.appendChild(hamburgerMenu);
        gameInfoCompact.appendChild(gameType);

        return gameInfoCompact;
    }

    /**
     * Create hamburger menu for compact mode
     */
    createHamburgerMenu() {
        const hamburgerMenu = document.createElement('div');
        hamburgerMenu.className = 'chess-hamburger-menu';

        // Create hamburger button
        const hamburgerButton = document.createElement('button');
        hamburgerButton.className = 'chess-hamburger-button';
        hamburgerButton.setAttribute('aria-label', 'Game menu');

        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'chess-hamburger-dropdown';

        // Assemble menu
        hamburgerMenu.appendChild(hamburgerButton);
        hamburgerMenu.appendChild(dropdown);

        // Set up click handler
        hamburgerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Close menu when clicking menu items
        dropdown.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });

        return hamburgerMenu;
    }

    /**
     * Create board wrapper component
     */
    createBoardWrapper() {
        const boardWrapper = document.createElement('div');
        boardWrapper.className = 'chess-board-wrapper';

        // Create chess board
        const board = document.createElement('div');
        board.id = 'chessBoard';
        board.className = 'chess-board';
        boardWrapper.appendChild(board);

        return boardWrapper;
    }

    /**
     * Create player section for standard mode
     */
    createPlayerSection(gameState) {
        const playerSection = document.createElement('div');
        playerSection.className = 'chess-player-section';

        // Top player info
        const topPlayerInfo = this.createPlayerInfo('top', gameState);
        playerSection.appendChild(topPlayerInfo);

        // Action buttons (will be populated by updateUIForPerspective)
        const actionButtons = document.createElement('div');
        actionButtons.className = 'chess-action-buttons';
        playerSection.appendChild(actionButtons);

        // Move list
        const moveList = this.createMoveList();
        playerSection.appendChild(moveList);

        // Auto promotion (will be shown/hidden by updateUIForPerspective)
        const autoPromotion = this.createAutoPromotion();
        playerSection.appendChild(autoPromotion);

        // Bottom player info
        const bottomPlayerInfo = this.createPlayerInfo('bottom', gameState);
        playerSection.appendChild(bottomPlayerInfo);

        return playerSection;
    }

    /**
     * Create player info component
     */
    createPlayerInfo(position, gameState) {
        const playerInfo = document.createElement('div');
        playerInfo.className = 'chess-player-info';

        const isTop = position === 'top';
        const playerData = isTop ? gameState.topPlayer : gameState.bottomPlayer;

        playerInfo.innerHTML = `
            <div class="chess-player-clock ${isTop ? 'active' : ''}" id="${position}PlayerClock">
                ${playerData?.time || '05:00'}
            </div>
            <div class="chess-player-name-rating">
                <div class="chess-player-name" id="${position}PlayerName">
                    ${playerData?.name || (isTop ? 'Opponent' : 'You')}
                </div>
                <div class="chess-player-rating" id="${position}PlayerRating">
                    (${playerData?.rating || '----'})
                </div>
            </div>
        `;

        return playerInfo;
    }

    /**
     * Create move list component
     */
    createMoveList() {
        const moveList = document.createElement('div');
        moveList.className = 'chess-move-list';
        moveList.innerHTML = `
            <div class="move-list-header">Moves</div>
            <div class="move-list-content" id="moveListContent">
                <!-- Moves will be populated dynamically -->
            </div>
        `;
        return moveList;
    }

    /**
     * Create auto promotion component
     */
    createAutoPromotion() {
        const autoPromotion = document.createElement('div');
        autoPromotion.className = 'chess-auto-promotion';
        autoPromotion.innerHTML = `
            <div class="auto-promotion-header">Auto Promotion</div>
            <div class="auto-promotion-options">
                <label class="auto-promotion-option">
                    <input type="checkbox" checked data-piece="q">
                    <span class="checkmark"></span>
                    <span class="piece-symbol">♕</span>
                </label>
                <label class="auto-promotion-option">
                    <input type="checkbox" data-piece="r">
                    <span class="checkmark"></span>
                    <span class="piece-symbol">♖</span>
                </label>
                <label class="auto-promotion-option">
                    <input type="checkbox" data-piece="b">
                    <span class="checkmark"></span>
                    <span class="piece-symbol">♗</span>
                </label>
                <label class="auto-promotion-option">
                    <input type="checkbox" data-piece="n">
                    <span class="checkmark"></span>
                    <span class="piece-symbol">♘</span>
                </label>
            </div>
        `;
        return autoPromotion;
    }

    /**
     * Create compact mode player components
     */
    createPlayerTop(gameState) {
        const playerTop = document.createElement('div');
        playerTop.className = 'chess-player-top';

        const playerData = gameState.topPlayer || {};
        playerTop.innerHTML = `
            <div>
                <div class="chess-player-name" id="topPlayerNameCompact">
                    ${playerData.name || 'Opponent'}
                </div>
                <div class="chess-player-rating" id="topPlayerRatingCompact">
                    (${playerData.rating || '----'})
                </div>
            </div>
            <div class="chess-player-clock active" id="topPlayerClockCompact">
                ${playerData.time || '05:00'}
            </div>
        `;
        return playerTop;
    }

    createPlayerBottom(gameState) {
        const playerBottom = document.createElement('div');
        playerBottom.className = 'chess-player-bottom';

        const playerData = gameState.bottomPlayer || {};
        playerBottom.innerHTML = `
            <div>
                <div class="chess-player-name" id="bottomPlayerNameCompact">
                    ${playerData.name || 'You'}
                </div>
                <div class="chess-player-rating" id="bottomPlayerRatingCompact">
                    (${playerData.rating || '----'})
                </div>
            </div>
            <div class="chess-player-clock" id="bottomPlayerClockCompact">
                ${playerData.time || '05:00'}
            </div>
        `;
        return playerBottom;
    }

    /**
     * Create move/opening info components
     */
    createMoveOpeningInfo(mode) {
        const moveOpeningInfo = document.createElement('div');
        moveOpeningInfo.className = mode === 'standard' ?
            'chess-move-opening-info-standard' : 'chess-move-opening-info';

        if (mode === 'standard') {
            moveOpeningInfo.innerHTML = `
                <div class="chess-last-move" id="lastMoveStandard">Last: --</div>
                <div class="chess-opening" id="openingStandard">Opening</div>
            `;
        } else {
            moveOpeningInfo.innerHTML = `
                <span class="chess-last-move" id="lastMoveCompact">Last: --</span>
                <span class="chess-opening" id="openingCompact">Opening</span>
            `;
        }

        return moveOpeningInfo;
    }

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            layoutContainer: document.querySelector('.chess-layout-container'),
            boardWrapper: document.querySelector('.chess-board-wrapper'),
            chessBoard: document.getElementById('chessBoard'),
            playerSection: document.querySelector('.chess-player-section'),
            actionButtons: document.querySelectorAll('.chess-action-buttons'),
            moveList: document.querySelector('.chess-move-list'),
            autoPromotion: document.querySelector('.chess-auto-promotion'),
            playerTop: document.querySelector('.chess-player-top'),
            playerBottom: document.querySelector('.chess-player-bottom')
        };
    }

    /**
     * Legacy method for compatibility - maps to getCurrentMode
     */
    getCurrentLayout() {
        return this.getCurrentMode();
    }

}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayoutManager;
} else {
    window.LayoutManager = LayoutManager;
}

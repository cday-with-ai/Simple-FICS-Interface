/**
 * Chess Layout Integration - Bridges new layout system with existing code
 * Handles migration from old system to new clean architecture
 */

// Global layout manager instance
let layoutManager = null;

/**
 * Initialize the new layout system
 */
function initializeNewLayoutSystem() {
    console.log('Chess Layout Integration: Initializing new layout system...');
    
    // Load new CSS files
    loadNewCSSFiles();
    
    // Initialize layout manager
    layoutManager = new LayoutManager();
    
    // Migrate existing player data
    migrateExistingPlayerData();
    
    // Set up integration with existing systems
    setupIntegrationHooks();
    
    console.log('Chess Layout Integration: New layout system initialized');
}

/**
 * Load new CSS files
 */
function loadNewCSSFiles() {
    const cssFiles = [
        'css/chess-layouts.css',
        'css/chess-board.css', 
        'css/chess-players.css',
        'css/chess-responsive.css'
    ];
    
    cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        link.onload = () => console.log(`Loaded: ${file}`);
        link.onerror = () => console.error(`Failed to load: ${file}`);
        document.head.appendChild(link);
    });
}

/**
 * Migrate existing player data to new system
 */
function migrateExistingPlayerData() {
    // Find existing player elements
    const existingElements = {
        topPlayerName: document.getElementById('topPlayerName'),
        topPlayerClock: document.getElementById('topPlayerClock'),
        bottomPlayerName: document.getElementById('bottomPlayerName'),
        bottomPlayerClock: document.getElementById('bottomPlayerClock'),
        gameNumber: document.querySelector('.game-number'),
        gameType: document.querySelector('.game-type-info')
    };
    
    // Migrate to new structure
    if (layoutManager && layoutManager.elements) {
        const newElements = layoutManager.elements;
        
        // Migrate player names and clocks
        migratePlayerInfo(existingElements, newElements);
        
        // Migrate game info
        migrateGameInfo(existingElements, newElements);
    }
}

/**
 * Migrate player information
 */
function migratePlayerInfo(existing, newElements) {
    // Top player
    if (existing.topPlayerName && existing.topPlayerClock) {
        const topInfo = createPlayerInfoHTML(
            existing.topPlayerName.textContent,
            existing.topPlayerClock.textContent,
            'top'
        );
        
        if (newElements.playerTopInfo) {
            newElements.playerTopInfo.innerHTML = topInfo;
        }
        if (newElements.topPlayerInfo) {
            newElements.topPlayerInfo.innerHTML = topInfo;
        }
    }
    
    // Bottom player
    if (existing.bottomPlayerName && existing.bottomPlayerClock) {
        const bottomInfo = createPlayerInfoHTML(
            existing.bottomPlayerName.textContent,
            existing.bottomPlayerClock.textContent,
            'bottom'
        );
        
        if (newElements.playerBottomInfo) {
            newElements.playerBottomInfo.innerHTML = bottomInfo;
        }
        if (newElements.bottomPlayerInfo) {
            newElements.bottomPlayerInfo.innerHTML = bottomInfo;
        }
    }
}

/**
 * Create player info HTML
 */
function createPlayerInfoHTML(name, clock, position) {
    return `
        <div class="chess-player-clock ${position}-player-clock" id="new${position.charAt(0).toUpperCase() + position.slice(1)}PlayerClock">
            ${clock || '00:00'}
        </div>
        <div class="chess-player-name" id="new${position.charAt(0).toUpperCase() + position.slice(1)}PlayerName">
            ${name || 'Player'}
        </div>
        <div class="chess-player-rating">
            ----
        </div>
    `;
}

/**
 * Migrate game information
 */
function migrateGameInfo(existing, newElements) {
    if (newElements.gameInfo) {
        const gameNumber = existing.gameNumber?.textContent || 'Game 1';
        const gameType = existing.gameType?.textContent || 'Standard';
        
        newElements.gameInfo.innerHTML = `
            <div class="chess-game-number">${gameNumber}</div>
            <div class="chess-game-type">${gameType}</div>
        `;
    }
}

/**
 * Set up integration hooks with existing systems
 */
function setupIntegrationHooks() {
    // Hook into existing layout switching
    const originalSetLayout = window.setLayoutMode;
    if (originalSetLayout) {
        window.setLayoutMode = function(mode) {
            // Map old layout names to new ones
            const layoutMap = {
                'Chess': 'standard',
                'ChessCompact': 'compact', 
                'ChessAndChat': 'side-by-side',
                'ChessCompactAndChat': 'side-by-side',
                'Chat': 'chat'
            };
            
            const newLayout = layoutMap[mode] || 'standard';
            
            if (layoutManager) {
                layoutManager.setLayout(newLayout);
            }
            
            // Call original function for compatibility
            originalSetLayout.call(this, mode);
        };
    }
    
    // Hook into player info updates
    const originalUpdatePlayerInfo = window.updatePlayerInfoAndClockUI;
    if (originalUpdatePlayerInfo) {
        window.updatePlayerInfoAndClockUI = function() {
            // Call original function
            originalUpdatePlayerInfo.call(this);
            
            // Update new system
            updateNewPlayerInfo();
        };
    }
    
    // Hook into board resizing
    const originalResizeBoard = window.resizeChessBoard;
    if (originalResizeBoard) {
        window.resizeChessBoard = function() {
            if (layoutManager) {
                layoutManager.updateBoardSize();
            } else {
                // Fallback to original
                originalResizeBoard.call(this);
            }
        };
    }
}

/**
 * Update player info in new system
 */
function updateNewPlayerInfo() {
    if (!layoutManager || !layoutManager.elements) return;
    
    // Get current player data from existing system
    const topName = document.getElementById('topPlayerName')?.textContent || 'Black';
    const topClock = document.getElementById('topPlayerClock')?.textContent || '00:00';
    const bottomName = document.getElementById('bottomPlayerName')?.textContent || 'You';
    const bottomClock = document.getElementById('bottomPlayerClock')?.textContent || '00:00';
    
    // Update new elements
    const newTopName = document.getElementById('newTopPlayerName');
    const newTopClock = document.getElementById('newTopPlayerClock');
    const newBottomName = document.getElementById('newBottomPlayerName');
    const newBottomClock = document.getElementById('newBottomPlayerClock');
    
    if (newTopName) newTopName.textContent = topName;
    if (newTopClock) newTopClock.textContent = topClock;
    if (newBottomName) newBottomName.textContent = bottomName;
    if (newBottomClock) newBottomClock.textContent = bottomClock;
    
    // Update clock states
    updateClockStates();
}

/**
 * Update clock visual states
 */
function updateClockStates() {
    const clocks = document.querySelectorAll('.chess-player-clock');
    
    clocks.forEach(clock => {
        const timeText = clock.textContent;
        const [minutes, seconds] = timeText.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;
        
        // Remove existing state classes
        clock.classList.remove('active', 'finished', 'low-time', 'critical-time');
        
        // Add appropriate state class
        if (totalSeconds === 0) {
            clock.classList.add('finished');
        } else if (totalSeconds < 30) {
            clock.classList.add('critical-time');
        } else if (totalSeconds < 60) {
            clock.classList.add('low-time');
        }
    });
}

/**
 * Switch to new layout system
 */
function switchToNewLayoutSystem() {
    console.log('Chess Layout Integration: Switching to new layout system...');
    
    // Hide old system
    const oldChessCSS = document.querySelector('link[href*="chess.css"]');
    if (oldChessCSS) {
        oldChessCSS.disabled = true;
    }
    
    // Initialize new system
    initializeNewLayoutSystem();
    
    // Set initial layout based on current mode
    const currentMode = document.body.className.match(/layout-(\w+)/);
    if (currentMode && layoutManager) {
        const layoutMap = {
            'chess': 'standard',
            'chesscompact': 'compact',
            'chessandchat': 'side-by-side',
            'chesscompactandchat': 'side-by-side',
            'chat': 'chat'
        };
        
        const newLayout = layoutMap[currentMode[1]] || 'standard';
        layoutManager.setLayout(newLayout);
    }
    
    console.log('Chess Layout Integration: Successfully switched to new system');
}

/**
 * Fallback to old system if needed
 */
function fallbackToOldSystem() {
    console.log('Chess Layout Integration: Falling back to old system...');
    
    // Re-enable old CSS
    const oldChessCSS = document.querySelector('link[href*="chess.css"]');
    if (oldChessCSS) {
        oldChessCSS.disabled = false;
    }
    
    // Destroy new layout manager
    if (layoutManager) {
        layoutManager.destroy();
        layoutManager = null;
    }
    
    console.log('Chess Layout Integration: Fallback complete');
}

/**
 * Test the new layout system
 */
function testNewLayoutSystem() {
    console.log('Chess Layout Integration: Testing new layout system...');
    
    if (!layoutManager) {
        console.error('Layout manager not initialized');
        return false;
    }
    
    // Test layout switching
    const layouts = layoutManager.getAvailableLayouts();
    let testsPassed = 0;
    
    layouts.forEach(layout => {
        try {
            layoutManager.setLayout(layout);
            console.log(`✓ Layout "${layout}" works`);
            testsPassed++;
        } catch (error) {
            console.error(`✗ Layout "${layout}" failed:`, error);
        }
    });
    
    console.log(`Chess Layout Integration: ${testsPassed}/${layouts.length} layout tests passed`);
    return testsPassed === layouts.length;
}

// Export functions for global use
window.initializeNewLayoutSystem = initializeNewLayoutSystem;
window.switchToNewLayoutSystem = switchToNewLayoutSystem;
window.fallbackToOldSystem = fallbackToOldSystem;
window.testNewLayoutSystem = testNewLayoutSystem;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNewLayoutSystem);
} else {
    // DOM already loaded
    setTimeout(initializeNewLayoutSystem, 100);
}

/**
 * Responsive utilities for Simple FICS Interface
 * Handles mobile detection, screen dimensions, and responsive behavior
 */

// Screen dimension and device detection state
let currentScreenInfo = {
    width: 0,
    height: 0,
    deviceType: 'desktop',
    orientation: 'landscape',
    isTouch: false,
    breakpoint: 'xl'
};

// Breakpoints (mobile-first approach)
const BREAKPOINTS = {
    xs: 0,      // Extra small devices (phones)
    sm: 576,    // Small devices (landscape phones)
    md: 768,    // Medium devices (tablets)
    lg: 992,    // Large devices (desktops)
    xl: 1200,   // Extra large devices (large desktops)
    xxl: 1400   // Extra extra large devices
};

// Compact mode threshold
const COMPACT_MODE_THRESHOLD = 1024;

// Debug overlay element
let debugOverlay = null;
let showDebugOverlay = false;

/**
 * Initialize the responsive system
 */
export function initResponsive() {
    console.log('Initializing responsive system...');

    // Detect initial screen info
    updateScreenInfo();

    // Set up event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Create debug overlay
    createDebugOverlay();

    // Apply initial responsive styles
    applyResponsiveStyles();

    // Make functions available globally for other modules
    window.getScreenInfo = getScreenInfo;
    window.shouldUseCompactMode = shouldUseCompactMode;
    window.isMobile = isMobile;
    window.isTablet = isTablet;
    window.isDesktop = isDesktop;
    window.isTouchDevice = isTouchDevice;
    window.toggleDebugOverlay = toggleDebugOverlay;
    window.updateDebugOverlay = updateDebugOverlay;

    console.log('Responsive system initialized:', currentScreenInfo);
}

/**
 * Update screen information
 */
function updateScreenInfo() {
    const oldInfo = { ...currentScreenInfo };
    
    currentScreenInfo.width = window.innerWidth;
    currentScreenInfo.height = window.innerHeight;
    currentScreenInfo.deviceType = detectDeviceType();
    currentScreenInfo.orientation = detectOrientation();
    currentScreenInfo.isTouch = detectTouchSupport();
    currentScreenInfo.breakpoint = detectBreakpoint();
    
    // Check if significant changes occurred
    const hasChanged = (
        oldInfo.width !== currentScreenInfo.width ||
        oldInfo.height !== currentScreenInfo.height ||
        oldInfo.deviceType !== currentScreenInfo.deviceType ||
        oldInfo.orientation !== currentScreenInfo.orientation ||
        oldInfo.breakpoint !== currentScreenInfo.breakpoint
    );
    
    if (hasChanged) {
        console.log('Screen info updated:', currentScreenInfo);
        
        // Dispatch custom event for other modules to listen to
        window.dispatchEvent(new CustomEvent('screenInfoChanged', {
            detail: { 
                current: currentScreenInfo, 
                previous: oldInfo 
            }
        }));
    }
    
    // Update debug overlay
    updateDebugOverlay();
}

/**
 * Detect device type based on screen size and user agent
 */
function detectDeviceType() {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Check for mobile devices in user agent
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    if (width < BREAKPOINTS.md) {
        return 'mobile';
    } else if (width < BREAKPOINTS.lg || (isMobileUA && width < BREAKPOINTS.xl)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

/**
 * Detect screen orientation
 */
function detectOrientation() {
    if (window.innerWidth > window.innerHeight) {
        return 'landscape';
    } else {
        return 'portrait';
    }
}

/**
 * Detect touch support
 */
function detectTouchSupport() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Detect current breakpoint
 */
function detectBreakpoint() {
    const width = window.innerWidth;
    
    if (width >= BREAKPOINTS.xxl) return 'xxl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    return 'xs';
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Debounce resize events
    clearTimeout(handleResize.timeout);
    handleResize.timeout = setTimeout(() => {
        updateScreenInfo();
        applyResponsiveStyles();
    }, 100);
}

/**
 * Handle orientation change events
 */
function handleOrientationChange() {
    // Wait for orientation change to complete
    setTimeout(() => {
        updateScreenInfo();
        applyResponsiveStyles();
    }, 500);
}

/**
 * Apply responsive styles based on current screen info
 */
function applyResponsiveStyles() {
    const root = document.documentElement;
    
    // Set CSS custom properties for responsive behavior
    root.style.setProperty('--screen-width', `${currentScreenInfo.width}px`);
    root.style.setProperty('--screen-height', `${currentScreenInfo.height}px`);
    root.style.setProperty('--device-type', currentScreenInfo.deviceType);
    root.style.setProperty('--orientation', currentScreenInfo.orientation);
    root.style.setProperty('--breakpoint', currentScreenInfo.breakpoint);
    
    // Add/remove CSS classes based on device type
    document.body.classList.remove('device-mobile', 'device-tablet', 'device-desktop');
    document.body.classList.add(`device-${currentScreenInfo.deviceType}`);
    
    // Add/remove orientation classes
    document.body.classList.remove('orientation-landscape', 'orientation-portrait');
    document.body.classList.add(`orientation-${currentScreenInfo.orientation}`);
    
    // Add/remove touch support class
    document.body.classList.toggle('touch-device', currentScreenInfo.isTouch);
    
    // Add/remove breakpoint classes
    Object.keys(BREAKPOINTS).forEach(bp => {
        document.body.classList.remove(`bp-${bp}`);
    });
    document.body.classList.add(`bp-${currentScreenInfo.breakpoint}`);
}

/**
 * Create debug overlay for development
 */
function createDebugOverlay() {
    debugOverlay = document.createElement('div');
    debugOverlay.id = 'responsive-debug-overlay';
    debugOverlay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        display: none;
        min-width: 200px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(debugOverlay);
}

/**
 * Update debug overlay content
 */
function updateDebugOverlay() {
    if (!debugOverlay) return;

    // Get chess board info if available
    let chessBoardInfo = '';
    const chessBoardArea = document.querySelector('.chess-board-area');
    const chessBoard = document.querySelector('.chess-board');
    if (chessBoardArea && chessBoard) {
        const areaRect = chessBoardArea.getBoundingClientRect();
        const boardRect = chessBoard.getBoundingClientRect();
        const availableWidth = areaRect.width - 302 - 30;
        const availableHeight = areaRect.height - 40;
        const maxAvailableSize = Math.min(availableWidth, availableHeight);
        const currentBoardSize = Math.min(boardRect.width, boardRect.height);

        chessBoardInfo = `
            <div><strong>Chess Board Info</strong></div>
            <div>Board Size: ${Math.round(currentBoardSize)}px</div>
            <div>Available: ${Math.round(maxAvailableSize)}px</div>
            <div>Area: ${Math.round(areaRect.width)} × ${Math.round(areaRect.height)}</div>
        `;
    }

    debugOverlay.innerHTML = `
        <div><strong>Screen Info</strong></div>
        <div>Size: ${currentScreenInfo.width} × ${currentScreenInfo.height}</div>
        <div>Device: ${currentScreenInfo.deviceType}</div>
        <div>Orientation: ${currentScreenInfo.orientation}</div>
        <div>Breakpoint: ${currentScreenInfo.breakpoint}</div>
        <div>Touch: ${currentScreenInfo.isTouch ? 'Yes' : 'No'}</div>
        <div>Compact Mode: ${shouldUseCompactMode() ? 'Yes' : 'No'}</div>
        ${chessBoardInfo}
    `;
}

/**
 * Toggle debug overlay visibility
 */
export function toggleDebugOverlay() {
    showDebugOverlay = !showDebugOverlay;
    if (debugOverlay) {
        debugOverlay.style.display = showDebugOverlay ? 'block' : 'none';
    }
    console.log('Debug overlay:', showDebugOverlay ? 'shown' : 'hidden');
}

/**
 * Get current screen information
 */
export function getScreenInfo() {
    return { ...currentScreenInfo };
}

/**
 * Check if compact mode should be used based on screen size
 */
export function shouldUseCompactMode() {
    return currentScreenInfo.width < COMPACT_MODE_THRESHOLD;
}

/**
 * Check if device is mobile
 */
export function isMobile() {
    return currentScreenInfo.deviceType === 'mobile';
}

/**
 * Check if device is tablet
 */
export function isTablet() {
    return currentScreenInfo.deviceType === 'tablet';
}

/**
 * Check if device is desktop
 */
export function isDesktop() {
    return currentScreenInfo.deviceType === 'desktop';
}

/**
 * Check if device supports touch
 */
export function isTouchDevice() {
    return currentScreenInfo.isTouch;
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint() {
    return currentScreenInfo.breakpoint;
}

/**
 * Check if screen width is at or above a specific breakpoint
 */
export function isBreakpointUp(breakpoint) {
    const currentWidth = currentScreenInfo.width;
    const targetWidth = BREAKPOINTS[breakpoint];
    return currentWidth >= targetWidth;
}

/**
 * Check if screen width is below a specific breakpoint
 */
export function isBreakpointDown(breakpoint) {
    const currentWidth = currentScreenInfo.width;
    const targetWidth = BREAKPOINTS[breakpoint];
    return currentWidth < targetWidth;
}

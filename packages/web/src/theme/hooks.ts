import {useState, useEffect} from 'react';
import {useWindowSize, useOrientation} from 'react-use';
import {useTheme} from './ThemeProvider';
import type { ViewMode, ChessOrientation } from '@fics/shared';

// Viewport dimensions interface
export interface ViewportDimensions {
    width: number;
    height: number;
}

// Breakpoint type
export type Breakpoint = 'mobilePortrait' | 'mobileLandscape' | 'tablet' | 'desktop' | 'large';

// Orientation type
export type OrientationType = 'portrait' | 'landscape';

// Layout state interface
export interface LayoutState {
    orientation: OrientationType;
    breakpoint: Breakpoint;
    dimensions: ViewportDimensions;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTouch: boolean;
    isMobileDevice: boolean; // True mobile device, not just small window
}

// Hook to get current viewport dimensions
export const useViewport = (): ViewportDimensions => {
    const {width = 0, height = 0} = useWindowSize();

    return {
        width,
        height,
    };
};

// Hook to get current orientation
export const useResponsiveOrientation = (): OrientationType => {
    const {width = 0, height = 0} = useWindowSize();

    // Determine orientation based on dimensions
    return width > height ? 'landscape' : 'portrait';
};

// Hook to get current breakpoint
export const useBreakpoint = (): Breakpoint => {
    const {width} = useViewport();
    const {theme} = useTheme();

    // Parse breakpoint values (remove 'px' suffix)
    const breakpoints = {
        mobilePortrait: 0,
        mobileLandscape: parseInt(theme.breakpoints.mobileLandscape),
        tablet: parseInt(theme.breakpoints.tablet),
        desktop: parseInt(theme.breakpoints.desktop),
        large: parseInt(theme.breakpoints.large),
    };

    if (width >= breakpoints.large) return 'large';
    if (width >= breakpoints.desktop) return 'desktop';
    if (width >= breakpoints.tablet) return 'tablet';
    if (width >= breakpoints.mobileLandscape) return 'mobileLandscape';
    return 'mobilePortrait';
};

// Hook to detect touch capability
export const useTouch = (): boolean => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                // @ts-ignore - IE10/11
                navigator.msMaxTouchPoints > 0
            );
        };

        setIsTouch(checkTouch());
    }, []);

    return isTouch;
};

// Hook to detect if device is actually mobile (not just small window)
export const useMobileDevice = (): boolean => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const isTouch = useTouch();
    const { width } = useViewport();

    useEffect(() => {
        const checkMobile = () => {
            // Check user agent for mobile devices
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            const isMobileUA = mobileRegex.test(navigator.userAgent);
            
            // Check for touch + small screen (not just touch, as many laptops have touch)
            const isSmallTouchDevice = isTouch && width < 768;
            
            // Check for mobile-specific features
            const hasMobileFeatures = 'orientation' in window && 'ondeviceorientation' in window;
            
            return isMobileUA || (isSmallTouchDevice && hasMobileFeatures);
        };

        setIsMobileDevice(checkMobile());
    }, [isTouch, width]);

    return isMobileDevice;
};

// Main layout hook that combines all responsive information
export const useLayout = (): LayoutState => {
    const dimensions = useViewport();
    const orientation = useResponsiveOrientation();
    const breakpoint = useBreakpoint();
    const isTouch = useTouch();
    const isMobileDevice = useMobileDevice();

    const isMobile = breakpoint === 'mobilePortrait' || breakpoint === 'mobileLandscape';
    const isTablet = breakpoint === 'tablet';
    const isDesktop = breakpoint === 'desktop' || breakpoint === 'large';

    return {
        orientation,
        breakpoint,
        dimensions,
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        isMobileDevice,
    };
};

// Hook to check if current viewport matches specific breakpoint
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
};

// Hook for responsive values based on breakpoints
export const useResponsiveValue = <T>(
    values: Partial<Record<Breakpoint | 'default', T>>
): T => {
    const breakpoint = useBreakpoint();

    // Priority order: specific breakpoint -> larger breakpoints -> default
    const priority: (Breakpoint | 'default')[] = [
        breakpoint,
        'large',
        'desktop',
        'tablet',
        'mobileLandscape',
        'mobilePortrait',
        'default'
    ];

    for (const key of priority) {
        if (values[key] !== undefined) {
            return values[key]!;
        }
    }

    // Fallback to first available value
    const firstKey = Object.keys(values)[0] as keyof typeof values;
    return values[firstKey]!;
};

// Hook to track layout changes with debouncing
export const useLayoutChange = (callback: (layout: LayoutState) => void, delay = 100) => {
    const layout = useLayout();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            callback(layout);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [layout.orientation, layout.breakpoint, callback, delay]);
};

// Utility function to get breakpoint-specific CSS media query
export const getBreakpointQuery = (breakpoint: Breakpoint, theme: any): string => {
    const queries = {
        mobilePortrait: `(max-width: ${parseInt(theme.breakpoints.mobileLandscape) - 1}px)`,
        mobileLandscape: `(min-width: ${theme.breakpoints.mobileLandscape}) and (max-width: ${parseInt(theme.breakpoints.tablet) - 1}px)`,
        tablet: `(min-width: ${theme.breakpoints.tablet}) and (max-width: ${parseInt(theme.breakpoints.desktop) - 1}px)`,
        desktop: `(min-width: ${theme.breakpoints.desktop}) and (max-width: ${parseInt(theme.breakpoints.large) - 1}px)`,
        large: `(min-width: ${theme.breakpoints.large})`,
    };

    return queries[breakpoint];
};

// Hook to get available view modes based on device and viewport
export const useAvailableViewModes = (): ViewMode[] => {
    const layout = useLayout();
    const { width } = layout.dimensions;
    const { isMobileDevice } = layout;
    
    // Mobile or width < 1200: no chess-and-chat mode
    if (isMobileDevice || width < 1200) {
        return ['chess-only', 'chat-only'];
    }
    
    // Desktop with sufficient width: all modes
    return ['chess-only', 'chess-and-chat', 'chat-only'];
};

// Hook to get available orientations based on device and viewport
export const useAvailableOrientations = (): ChessOrientation[] => {
    const layout = useLayout();
    const { width } = layout.dimensions;
    const { isMobileDevice } = layout;
    
    // Mobile or width < 768: portrait only
    if (isMobileDevice || width < 768) {
        return ['portrait'];
    }
    
    // Tablet and desktop: both orientations
    return ['portrait', 'landscape'];
};

// Hook to get recommended initial settings based on device
export const useRecommendedSettings = (): { viewMode: ViewMode; orientation: ChessOrientation } => {
    const layout = useLayout();
    const { width } = layout.dimensions;
    const { isMobileDevice } = layout;
    
    if (isMobileDevice || width < 768) {
        // Mobile: portrait only, chess-only mode
        return { viewMode: 'chess-only', orientation: 'portrait' };
    } else if (width < 1200) {
        // Tablet/small desktop: landscape, chess-only
        return { viewMode: 'chess-only', orientation: 'landscape' };
    } else {
        // Large desktop: landscape, chess-and-chat
        return { viewMode: 'chess-and-chat', orientation: 'landscape' };
    }
};
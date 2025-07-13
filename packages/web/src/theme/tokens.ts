// Theme token definitions and types

export interface ThemeColors {
    // Primary colors
    primary: string;
    primaryHover: string;
    primaryActive: string;

    // Secondary colors
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;

    // Background colors
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;

    // Surface colors
    surface: string;
    surfaceElevated: string;
    surfaceHover: string;

    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // Border colors
    border: string;
    borderHover: string;
    borderFocus: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Chess-specific colors
    chessBoardLight: string;
    chessBoardDark: string;
    chessHighlight: string;
    chessLastMove: string;
    chessCheck: string;
    chessLegalMove: string;
    
    // Chess board UI colors
    board: {
        light: string;
        dark: string;
        border: string;
        lastMoveLight: string;
        lastMoveDark: string;
        selected: string;
        hoverLight: string;
        hoverDark: string;
        highlight: string;
        coordinateLight: string;
        coordinateDark: string;
    };

    // Chat colors
    chatOwnMessage: string;
    chatMention: string;
    chatSystem: string;
}

export interface ThemeSpacing {
    xs: string;    // 4px
    sm: string;    // 8px
    md: string;    // 16px
    lg: string;    // 24px
    xl: string;    // 32px
    xxl: string;   // 48px
    xxxl: string;  // 64px
    // Numeric indices for easier access
    0: string;  // 0px
    1: string;  // 4px
    2: string;  // 8px
    3: string;  // 12px
    4: string;  // 16px
    5: string;  // 20px
    6: string;  // 24px
    8: string;  // 32px
    10: string; // 40px
    12: string; // 48px
    16: string; // 64px
}

export interface ThemeTypography {
    fontFamily: string;
    fontFamilyMono: string;
    fontFamilyDigital: string;

    // Font sizes
    fontSize: {
        xs: string;    // 12px
        sm: string;    // 14px
        md: string;    // 16px
        lg: string;    // 18px
        xl: string;    // 20px
        xxl: string;   // 24px
        xxxl: string;  // 32px
    };
    
    // Alias for sizes (for backward compatibility)
    sizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
    };

    // Font weights
    fontWeight: {
        light: number;    // 300
        normal: number;   // 400
        medium: number;   // 500
        semibold: number; // 600
        bold: number;     // 700
    };

    // Line heights
    lineHeight: {
        tight: number;  // 1.2
        normal: number; // 1.5
        relaxed: number; // 1.8
    };
}

export interface ThemeShadows {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    focus: string;
    board: string;
    container: string;
}

export interface ThemeBreakpoints {
    mobilePortrait: string;   // 0px (iPhone SE: 375px)
    mobileLandscape: string;  // 480px
    tablet: string;           // 768px
    desktop: string;          // 1024px
    large: string;            // 1440px
}

export interface ThemeTransitions {
    fast: string;    // 150ms
    normal: string;  // 250ms
    slow: string;    // 350ms

    easing: {
        easeInOut: string;
        easeOut: string;
        easeIn: string;
    };
}

export interface ThemeZIndices {
    dropdown: number;     // 10
    modal: number;        // 100
    overlay: number;      // 200
    tooltip: number;      // 300
    notification: number; // 400
}

export interface ThemeBorderRadius {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
    container: string;
}

// Main theme interface
export interface Theme {
    colors: ThemeColors;
    spacing: ThemeSpacing;
    typography: ThemeTypography;
    shadows: ThemeShadows;
    borderRadius: ThemeBorderRadius;
    breakpoints: ThemeBreakpoints;
    transitions: ThemeTransitions;
    zIndices: ThemeZIndices;
}

// Base tokens that are shared between themes
export const baseTokens = {
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
    } as ThemeSpacing,

    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontFamilyMono: 'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", Consolas, "Courier New", monospace',
        fontFamilyDigital: '"DigitalFont", "Courier New", "Monaco", monospace',

        fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '20px',
            xxl: '24px',
            xxxl: '32px',
        },
        
        // Alias for sizes
        sizes: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '20px',
            xxl: '24px',
            xxxl: '32px',
        },

        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },

        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.8,
        },
    } as ThemeTypography,

    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        board: '0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
        container: '0 4px 6px rgba(0, 0, 0, 0.75)',
    } as ThemeShadows,
    
    borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
        container: '10px',
    } as ThemeBorderRadius,

    breakpoints: {
        mobilePortrait: '0px',      // iPhone SE minimum: 375px
        mobileLandscape: '480px',
        tablet: '768px',
        desktop: '1024px',
        large: '1440px',
    } as ThemeBreakpoints,

    transitions: {
        fast: '150ms ease-in-out',
        normal: '250ms ease-in-out',
        slow: '350ms ease-in-out',

        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        },
    } as ThemeTransitions,

    zIndices: {
        dropdown: 10,
        modal: 100,
        overlay: 200,
        tooltip: 300,
        notification: 400,
    } as ThemeZIndices,
};

// Theme type for styled-components
export type StyledComponentsTheme = Theme;
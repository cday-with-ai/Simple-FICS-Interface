import {Theme, ThemeColors, baseTokens} from './tokens';

// Re-export Theme type for styled.d.ts
export type {Theme};

// Light theme colors
const lightColors: ThemeColors = {
    // Primary colors (Chess-themed blue)
    primary: '#1e40af',
    primaryHover: '#1d4ed8',
    primaryActive: '#1e3a8a',

    // Secondary colors (Warm gray)
    secondary: '#6b7280',
    secondaryHover: '#4b5563',
    secondaryActive: '#374151',

    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f9fafb',
    backgroundTertiary: '#f3f4f6',

    // Surface colors
    surface: '#f3f4f6',
    surfaceElevated: '#f9fafb',
    surfaceHover: '#e5e7eb',

    // Text colors
    text: '#111827',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    textInverse: '#ffffff',

    // Border colors
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    borderFocus: '#3b82f6',

    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Chess-specific colors
    chessBoardLight: '#f0d9b5',
    chessBoardDark: '#b58863',
    chessHighlight: '#ffff00',
    chessLastMove: '#9bc53d',
    chessCheck: '#ff6b6b',
    chessLegalMove: 'rgba(0, 255, 0, 0.4)',

    // Chat colors
    chatOwnMessage: '#dbeafe',
    chatMention: '#fef3c7',
    chatSystem: '#f3f4f6',
    
    // Chess board UI colors
    board: {
        light: '#f0d9b5',
        dark: '#b58863',
        border: '#8b7355',
        lastMoveLight: '#cdd26a',
        lastMoveDark: '#aaa23a',
        selected: '#7fb876',
        hoverLight: '#f6f8ca',
        hoverDark: '#c3a562',
        highlight: 'rgba(255, 255, 0, 0.4)',
        coordinateLight: '#8b7355',
        coordinateDark: '#f0d9b5',
    },
};

// Dark theme colors
const darkColors: ThemeColors = {
    // Primary colors (Brighter blue for dark theme)
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryActive: '#1d4ed8',

    // Secondary colors
    secondary: '#9ca3af',
    secondaryHover: '#d1d5db',
    secondaryActive: '#e5e7eb',

    // Background colors
    background: '#111827',
    backgroundSecondary: '#1f2937',
    backgroundTertiary: '#374151',

    // Surface colors
    surface: '#1f2937',
    surfaceElevated: '#374151',
    surfaceHover: '#4b5563',

    // Text colors
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    textInverse: '#111827',

    // Border colors
    border: '#374151',
    borderHover: '#4b5563',
    borderFocus: '#3b82f6',

    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Chess-specific colors (adjusted for dark theme)
    chessBoardLight: '#4a5568',
    chessBoardDark: '#2d3748',
    chessHighlight: '#ecc94b',
    chessLastMove: '#68d391',
    chessCheck: '#fc8181',
    chessLegalMove: 'rgba(104, 211, 145, 0.4)',

    // Chat colors
    chatOwnMessage: '#1e3a8a',
    chatMention: '#92400e',
    chatSystem: '#374151',
    
    // Chess board UI colors (dark theme)
    board: {
        light: '#f0d9b5',
        dark: '#b58863',
        border: '#5e5248',
        lastMoveLight: '#cdd26a',
        lastMoveDark: '#aaa23a', 
        selected: '#646f40',
        hoverLight: '#f4e5c1',
        hoverDark: '#a07a4a',
        highlight: 'rgba(255, 235, 0, 0.5)',
        coordinateLight: '#b58863',
        coordinateDark: '#f0d9b5',
    },
};

// Light theme
export const lightTheme: Theme = {
    colors: lightColors,
    ...baseTokens,
};

// Dark theme
export const darkTheme: Theme = {
    colors: darkColors,
    ...baseTokens,
};

// Theme map for easy access
export const themes = {
    light: lightTheme,
    dark: darkTheme,
} as const;

// Theme type for theme switching
export type ThemeName = keyof typeof themes;

// Default theme
export const defaultTheme = lightTheme;
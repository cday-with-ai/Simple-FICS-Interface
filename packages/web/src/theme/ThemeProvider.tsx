import React, {createContext, useContext, ReactNode, useEffect} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {usePreferencesStore} from '@fics/shared';
import {Theme} from './tokens';
import {themes, ThemeName, defaultTheme} from './themes';

// Theme context for theme switching
interface ThemeContextType {
    theme: Theme;
    themeName: ThemeName;
    themePreference: 'light' | 'dark' | 'system';
    setTheme: (themeName: 'light' | 'dark' | 'system') => void;
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook to use theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// System theme detection
const getSystemTheme = (): ThemeName => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
};

// Theme provider component
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const preferencesStore = usePreferencesStore();

    // Get current theme preference
    const themePreference = preferencesStore.preferences.theme || 'system';

    // Determine active theme
    const getActiveTheme = (): ThemeName => {
        if (themePreference === 'system') {
            return getSystemTheme();
        }
        return themePreference as ThemeName;
    };

    const activeThemeName = getActiveTheme();
    const activeTheme = themes[activeThemeName] || defaultTheme;

    // Theme context value
    const contextValue: ThemeContextType = {
        theme: activeTheme,
        themeName: activeThemeName,
        themePreference: themePreference as 'light' | 'dark' | 'system',
        setTheme: (themeName: 'light' | 'dark' | 'system') => {
            preferencesStore.updatePreference('theme', themeName);
        },
        toggleTheme: () => {
            const newTheme = activeThemeName === 'light' ? 'dark' : 'light';
            preferencesStore.updatePreference('theme', newTheme);
        },
        isDarkMode: activeThemeName === 'dark',
    };

    // Listen for system theme changes
    useEffect(() => {
        if (themePreference === 'system' && typeof window !== 'undefined' && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const handleChange = () => {
                // Force re-render by updating a dummy preference
                preferencesStore.updatePreference('lastSystemThemeCheck', Date.now());
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [themePreference, preferencesStore]);

    // Apply theme to document root for CSS custom properties
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;

            // Set CSS custom properties for global styling
            Object.entries(activeTheme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key}`, value);
            });

            Object.entries(activeTheme.spacing).forEach(([key, value]) => {
                root.style.setProperty(`--spacing-${key}`, value);
            });

            // Set theme class on body for global theme detection
            document.body.className = document.body.className.replace(
                /\b(light|dark)-theme\b/g,
                ''
            );
            document.body.classList.add(`${activeThemeName}-theme`);
        }
    }, [activeTheme, activeThemeName]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <StyledThemeProvider theme={activeTheme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
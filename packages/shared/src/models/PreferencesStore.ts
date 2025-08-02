import {makeAutoObservable, runInAction} from 'mobx';
import { SettingsRegistry } from '../services/SettingsRegistry';

// Forward declaration to avoid circular dependency
interface RootStore {
    // No dependencies needed for PreferencesStore currently
}

export type ViewMode = 'chess-only' | 'chat-only' | 'chess-and-chat';
export type ChessOrientation = 'landscape' | 'portrait';

export interface ChatAppearance {
    fontSize: number; // Font size in pixels
    backgroundColor: string;
    textColor: string;
}

export interface Preferences {
    // Display preferences
    boardTheme: 'brown' | 'blue' | 'green' | 'purple';
    pieceSet: string; // Dynamic based on available piece sets
    showCoordinates: boolean;
    showLegalMoves: boolean;
    boardFlipped: boolean;
    animateMoves: boolean;
    animationDuration: number; // in milliseconds
    disableAnimationsThreshold: number; // Disable animations when time falls below this (in seconds)
    autoPromoteToQueen: boolean;
    autoPromotionPiece: 'Q' | 'R' | 'B' | 'N'; // Piece to auto-promote to in playing mode

    // UI Theme preferences
    theme: 'light' | 'dark' | 'system';
    layout: 'auto' | 'landscape' | 'portrait';
    
    // View mode preferences
    viewMode: ViewMode;
    chessOrientation: ChessOrientation;
    autoViewMode: boolean; // Whether to automatically select view mode based on screen size

    // Game display preferences
    showCapturedPieces: boolean;
    
    // Sound preferences
    enableSounds: boolean;
    moveSound: boolean;
    captureSound: boolean;
    checkSound: boolean;

    // Chat preferences
    showTimestamps: boolean;
    highlightMentions: boolean;
    openChannelsInTabs: boolean;
    openTellsInTabs: boolean;
    
    // Chat appearance
    chatAppearanceLight: ChatAppearance;
    chatAppearanceDark: ChatAppearance;

    // Game preferences
    autoAcceptRematch: boolean;
    confirmResign: boolean;
    defaultTimeControl: string;

    // Analysis preferences
    autoAnalyze: boolean;
    engineDepth: number;
    showEvaluation: boolean;

    // Board color preferences
    lightSquareColor: string;
    darkSquareColor: string;
    coordinateColorLight: string; // Color for coordinates on light squares
    coordinateColorDark: string;  // Color for coordinates on dark squares
    lastMoveHighlightColor: string;
    premoveHighlightColor: string;

    // Context menu preferences
    playerContextCommands: Array<{ label: string; command: string } | { divider: true }>;
    
    // FICS preferences
    postLoginCommands: string; // Multi-line string of commands to send after login
    
    // Internal preferences (for theme system)
    lastSystemThemeCheck?: number;
}

const DEFAULT_PREFERENCES: Preferences = {
    boardTheme: 'brown',
    pieceSet: 'cburnett',
    showCoordinates: true,
    showLegalMoves: true,
    boardFlipped: false,
    animateMoves: true,
    animationDuration: 200, // 0.2 seconds
    disableAnimationsThreshold: 10, // Default to 10 seconds
    autoPromoteToQueen: false,
    autoPromotionPiece: 'Q', // Default to queen
    theme: 'system',
    layout: 'auto',
    viewMode: 'chess-and-chat',
    chessOrientation: 'landscape',
    autoViewMode: true,
    showCapturedPieces: false, // Off by default
    enableSounds: true,
    moveSound: true,
    captureSound: true,
    checkSound: true,
    showTimestamps: true,
    highlightMentions: true,
    openChannelsInTabs: true,
    openTellsInTabs: true,
    chatAppearanceLight: {
        fontSize: 11,
        backgroundColor: '#ffffff',
        textColor: '#000000'
    },
    chatAppearanceDark: {
        fontSize: 11,
        backgroundColor: '#1e1e1e',
        textColor: '#cccccc'
    },
    autoAcceptRematch: false,
    confirmResign: true,
    defaultTimeControl: '15 0',
    autoAnalyze: false,
    engineDepth: 20,
    showEvaluation: true,
    lightSquareColor: '#f0d9b5',
    darkSquareColor: '#b58863',
    coordinateColorLight: '#b58863', // Use dark square color on light squares
    coordinateColorDark: '#f0d9b5',  // Use light square color on dark squares
    lastMoveHighlightColor: '#cdd26a',
    premoveHighlightColor: '#ffa500',
    playerContextCommands: [
        { label: 'Finger', command: 'finger {player}' },
        { label: 'History', command: 'hi {player}' },
        { label: 'Variables', command: 'vars {player}' },
        { divider: true },
        { label: 'Censor', command: '+censor {player}' },
        { label: 'No Play', command: '+noplay {player}' }
    ],
    postLoginCommands: `set style 12
set prompt
set bell off
set gin off
set interface Simple FICS Interface`
};

export class PreferencesStore {
    preferences: Preferences = DEFAULT_PREFERENCES;
    rootStore?: RootStore;
    settingsRegistry: SettingsRegistry;

    constructor() {
        makeAutoObservable(this);
        this.settingsRegistry = new SettingsRegistry();
        this.loadPreferences();
        this.syncWithRegistry();
    }

    updatePreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
        runInAction(() => {
            this.preferences[key] = value;
            // Also update in registry if it exists there
            const setting = this.settingsRegistry.get(key as string);
            if (setting) {
                // Special handling for playerContextCommands - convert to JSON string
                if (key === 'playerContextCommands') {
                    setting.value = JSON.stringify(value, null, 2);
                } else {
                    setting.value = value;
                }
            }
        });
        this.savePreferences();
    }
    
    // Sync current preferences with the settings registry
    private syncWithRegistry() {
        // Sync chat appearance to individual settings
        const appearance = this.getChatAppearance();
        const fontSizeSetting = this.settingsRegistry.get('chatFontSize');
        if (fontSizeSetting) {
            fontSizeSetting.value = appearance.fontSize;
            fontSizeSetting.onChange = (newValue) => {
                runInAction(() => {
                    this.preferences.chatAppearanceLight.fontSize = newValue;
                    this.preferences.chatAppearanceDark.fontSize = newValue;
                    this.savePreferences();
                });
            };
        }
        
        const bgColorSetting = this.settingsRegistry.get('chatBackgroundColor');
        if (bgColorSetting) {
            bgColorSetting.value = appearance.backgroundColor;
            bgColorSetting.onChange = (newValue) => {
                runInAction(() => {
                    const isDark = this.preferences.theme === 'dark' || 
                        (this.preferences.theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
                    if (isDark) {
                        this.preferences.chatAppearanceDark.backgroundColor = newValue;
                    } else {
                        this.preferences.chatAppearanceLight.backgroundColor = newValue;
                    }
                    this.savePreferences();
                });
            };
        }
        
        const textColorSetting = this.settingsRegistry.get('chatTextColor');
        if (textColorSetting) {
            textColorSetting.value = appearance.textColor;
            textColorSetting.onChange = (newValue) => {
                runInAction(() => {
                    const isDark = this.preferences.theme === 'dark' || 
                        (this.preferences.theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
                    if (isDark) {
                        this.preferences.chatAppearanceDark.textColor = newValue;
                    } else {
                        this.preferences.chatAppearanceLight.textColor = newValue;
                    }
                    this.savePreferences();
                });
            };
        }
        
        // Update registry values with current preferences
        Object.entries(this.preferences).forEach(([key, value]) => {
            const setting = this.settingsRegistry.get(key);
            if (setting && key !== 'chatAppearanceLight' && key !== 'chatAppearanceDark') {
                // Special handling for playerContextCommands - convert to JSON string
                if (key === 'playerContextCommands') {
                    setting.value = JSON.stringify(value, null, 2);
                } else {
                    setting.value = value;
                }
                // Set up onChange handler to sync back to preferences
                setting.onChange = (newValue) => {
                    runInAction(() => {
                        // Parse JSON string back to array for playerContextCommands
                        if (key === 'playerContextCommands' && typeof newValue === 'string') {
                            try {
                                (this.preferences as any)[key] = JSON.parse(newValue);
                            } catch (e) {
                                console.error('Failed to parse playerContextCommands:', e);
                                return;
                            }
                        } else {
                            (this.preferences as any)[key] = newValue;
                        }
                        this.savePreferences();
                    });
                };
            }
        });
    }

    resetToDefaults() {
        runInAction(() => {
            this.preferences = {...DEFAULT_PREFERENCES};
        });
        this.savePreferences();
    }

    private loadPreferences() {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem('fics-preferences');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    runInAction(() => {
                        // Validate and merge with defaults
                        const validatedPreferences = {...DEFAULT_PREFERENCES};
                        
                        // Handle migration from old chatFontSize to new chatAppearance
                        if (parsed.chatFontSize && !parsed.chatAppearanceLight) {
                            const fontSizeMap = { small: 10, medium: 11, large: 13 };
                            const fontSize = fontSizeMap[parsed.chatFontSize as keyof typeof fontSizeMap] || 11;
                            validatedPreferences.chatAppearanceLight.fontSize = fontSize;
                            validatedPreferences.chatAppearanceDark.fontSize = fontSize;
                        }
                        
                        // Ensure chat appearance has all required fields
                        if (parsed.chatAppearanceLight) {
                            validatedPreferences.chatAppearanceLight = {
                                ...DEFAULT_PREFERENCES.chatAppearanceLight,
                                ...parsed.chatAppearanceLight
                            };
                        }
                        if (parsed.chatAppearanceDark) {
                            validatedPreferences.chatAppearanceDark = {
                                ...DEFAULT_PREFERENCES.chatAppearanceDark,
                                ...parsed.chatAppearanceDark
                            };
                        }
                        
                        for (const [key, value] of Object.entries(parsed)) {
                            if (key !== 'chatAppearanceLight' && key !== 'chatAppearanceDark' &&
                                key in DEFAULT_PREFERENCES && value != null && 
                                this.isValidPreferenceValue(key as keyof Preferences, value)) {
                                // Migration: fix old pieceSet values
                                if (key === 'pieceSet' && (value === 'standard' || value === 'modern' || value === 'classic')) {
                                    (validatedPreferences as any)[key] = 'cburnett';
                                } else {
                                    (validatedPreferences as any)[key] = value;
                                }
                            }
                        }
                        
                        // Migration: handle old coordinateColor
                        if (parsed.coordinateColor && !parsed.coordinateColorLight && !parsed.coordinateColorDark) {
                            // Use contrasting colors based on the old coordinate color
                            validatedPreferences.coordinateColorLight = validatedPreferences.darkSquareColor;
                            validatedPreferences.coordinateColorDark = validatedPreferences.lightSquareColor;
                        }
                        this.preferences = validatedPreferences;
                    });
                } catch (error) {
                    console.error('Failed to load preferences:', error);
                }
            }
        }
    }

    private savePreferences() {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                window.localStorage.setItem('fics-preferences', JSON.stringify(this.preferences));
            } catch (error) {
                console.error('Failed to save preferences:', error);
            }
        }
    }

    private isValidPreferenceValue(key: keyof Preferences, value: any): boolean {
        const defaultValue = DEFAULT_PREFERENCES[key];

        // Check if the type matches the default
        if (typeof value !== typeof defaultValue) {
            return false;
        }

        // Additional validation for specific keys
        switch (key) {
            case 'engineDepth':
                return typeof value === 'number' && value >= 1 && value <= 50;
            case 'animationDuration':
                return typeof value === 'number' && value >= 0 && value <= 1000;
            case 'autoPromotionPiece':
                return ['Q', 'R', 'B', 'N'].includes(value);
            case 'boardTheme':
                return ['brown', 'blue', 'green', 'purple'].includes(value);
            case 'pieceSet':
                return typeof value === 'string' && value.length > 0;
            case 'theme':
                return ['light', 'dark', 'system'].includes(value);
            case 'layout':
                return ['auto', 'landscape', 'portrait'].includes(value);
            case 'viewMode':
                return ['chess-only', 'chat-only', 'chess-and-chat'].includes(value);
            case 'chessOrientation':
                return ['landscape', 'portrait'].includes(value);
            case 'lastSystemThemeCheck':
                return typeof value === 'number';
            case 'postLoginCommands':
                return typeof value === 'string';
            default:
                return true; // For other boolean and basic types, type check is sufficient
        }
    }
    
    // Convenience getters
    get boardFlipped(): boolean {
        return this.preferences.boardFlipped;
    }
    
    toggleBoardFlip() {
        this.updatePreference('boardFlipped', !this.preferences.boardFlipped);
    }
    
    // Get chat appearance based on current theme
    getChatAppearance(): ChatAppearance {
        const isDark = this.preferences.theme === 'dark' || 
            (this.preferences.theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
        
        return isDark ? this.preferences.chatAppearanceDark : this.preferences.chatAppearanceLight;
    }
    
    // Get console color based on message type and current theme (kept for backward compatibility)
    getConsoleColor(messageType: string, channelNumber?: string): string | null {
        // Return null - no longer using console colors
        return null;
    }
    
    // Get console font based on message type and current theme (kept for backward compatibility)
    getConsoleFont(messageType: string, channelNumber?: string): string | null {
        // Return null - no longer using console fonts
        return null;
    }
    
    // Get console font style based on message type and current theme (kept for backward compatibility)
    getConsoleFontStyle(messageType: string, channelNumber?: string): string | null {
        // Return null - no longer using console font styles
        return null;
    }
}
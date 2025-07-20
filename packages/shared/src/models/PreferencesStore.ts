import {makeAutoObservable, runInAction} from 'mobx';
import { SettingsRegistry } from '../services/SettingsRegistry';

// Forward declaration to avoid circular dependency
interface RootStore {
    // No dependencies needed for PreferencesStore currently
}

export type ViewMode = 'chess-only' | 'chat-only' | 'chess-and-chat';
export type ChessOrientation = 'landscape' | 'portrait';

// Console message color configuration
export interface ConsoleColors {
    // Communication
    notification: string;
    channelTell: string;      // Default channel tell color
    channel1: string;
    channel2: string;
    channel10: string;
    channel24: string;
    channel36: string;
    channel39: string;
    channel40: string;
    channel41: string;
    channel49: string;
    channel50: string;
    channel88: string;
    directTell: string;
    shout: string;
    cshout: string;
    
    // Game related
    style12: string;
    gameStart: string;
    gameNotification: string;
    gameEnd: string;
    movesList: string;
    illegalMove: string;
    drawOffer: string;
    unobserve: string;
    
    // Match/seek related
    matchRequest: string;
    seek: string;
    seekAnnouncement: string;
    
    // Output commands
    fingerNotes: string;
    fingerOutput: string;
    history: string;
    historyOutput: string;
    journal: string;
    journalOutput: string;
    games: string;
    gamesOutput: string;
    who: string;
    whoOutput: string;
    sought: string;
    soughtOutput: string;
    in: string;
    inOutput: string;
    newsOutput: string;
    channelListOutput: string;
    
    // System messages
    login: string;
    password: string;
    sessionStart: string;
    system: string;
    raw: string;
}

// Font family configuration for console messages
export interface ConsoleFonts {
    // Communication
    notification?: string;
    channelTell?: string;
    channel1?: string;
    channel2?: string;
    channel10?: string;
    channel24?: string;
    channel36?: string;
    channel39?: string;
    channel40?: string;
    channel41?: string;
    channel49?: string;
    channel50?: string;
    channel88?: string;
    directTell?: string;
    shout?: string;
    cshout?: string;
    
    // Game related
    style12?: string;
    gameStart?: string;
    gameNotification?: string;
    gameEnd?: string;
    movesList?: string;
    illegalMove?: string;
    drawOffer?: string;
    unobserve?: string;
    
    // Match/seek related
    matchRequest?: string;
    seek?: string;
    seekAnnouncement?: string;
    
    // Output commands
    fingerNotes?: string;
    fingerOutput?: string;
    history?: string;
    historyOutput?: string;
    journal?: string;
    journalOutput?: string;
    games?: string;
    gamesOutput?: string;
    who?: string;
    whoOutput?: string;
    sought?: string;
    soughtOutput?: string;
    in?: string;
    inOutput?: string;
    newsOutput?: string;
    channelListOutput?: string;
    
    // System messages
    login?: string;
    password?: string;
    sessionStart?: string;
    system?: string;
    raw?: string;
}

// Font style configuration for console messages
export interface ConsoleFontStyles {
    // Communication
    notification?: string;
    channelTell?: string;
    channel1?: string;
    channel2?: string;
    channel10?: string;
    channel24?: string;
    channel36?: string;
    channel39?: string;
    channel40?: string;
    channel41?: string;
    channel49?: string;
    channel50?: string;
    channel88?: string;
    directTell?: string;
    shout?: string;
    cshout?: string;
    
    // Game related
    style12?: string;
    gameStart?: string;
    gameNotification?: string;
    gameEnd?: string;
    movesList?: string;
    illegalMove?: string;
    drawOffer?: string;
    unobserve?: string;
    
    // Match/seek related
    matchRequest?: string;
    seek?: string;
    seekAnnouncement?: string;
    
    // Output commands
    fingerNotes?: string;
    fingerOutput?: string;
    history?: string;
    historyOutput?: string;
    journal?: string;
    journalOutput?: string;
    games?: string;
    gamesOutput?: string;
    who?: string;
    whoOutput?: string;
    sought?: string;
    soughtOutput?: string;
    in?: string;
    inOutput?: string;
    newsOutput?: string;
    channelListOutput?: string;
    
    // System messages
    login?: string;
    password?: string;
    sessionStart?: string;
    system?: string;
    raw?: string;
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
    chatFontSize: 'small' | 'medium' | 'large';
    highlightMentions: boolean;
    openChannelsInTabs: boolean;
    openTellsInTabs: boolean;

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
    
    // Console color preferences
    consoleColorsLight: ConsoleColors;
    consoleColorsDark: ConsoleColors;
    
    // Console font preferences
    consoleFontsLight: ConsoleFonts;
    consoleFontsDark: ConsoleFonts;
    
    // Console font style preferences
    consoleFontStylesLight: ConsoleFontStyles;
    consoleFontStylesDark: ConsoleFontStyles;
    
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
    animationDuration: 250, // 0.25 seconds
    disableAnimationsThreshold: 30, // Default to 30 seconds
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
    chatFontSize: 'medium',
    highlightMentions: true,
    openChannelsInTabs: true,
    openTellsInTabs: true,
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
set interface Simple FICS Interface`,
    consoleColorsLight: {
        // Communication
        notification: '#0066cc',  // Blue
        channelTell: '#555555',   // Default gray for unlisted channels
        channel1: '#008000',      // Green
        channel2: '#800080',      // Purple  
        channel10: '#4d4d00',     // Dark Yellow
        channel24: '#003366',     // Navy
        channel36: '#ff6600',     // Orange
        channel39: '#cc0000',     // Red
        channel40: '#009999',     // Teal
        channel41: '#663300',     // Brown
        channel49: '#666600',     // Olive
        channel50: '#ff0080',     // Pink
        channel88: '#4d0099',     // Indigo
        directTell: '#0066cc',    // Blue
        shout: '#006600',         // Dark Green
        cshout: '#990099',        // Magenta
        
        // Game related
        style12: '#333333',       // Dark Gray (low visibility for board updates)
        gameStart: '#008000',     // Green
        gameNotification: '#4169e1', // RoyalBlue
        gameEnd: '#cc0000',       // Red
        movesList: '#4682b4',     // SteelBlue
        illegalMove: '#dc143c',   // Crimson
        drawOffer: '#ff8c00',     // DarkOrange
        unobserve: '#696969',     // DimGray
        
        // Match/seek related
        matchRequest: '#ff0000',  // Bright Red
        seek: '#666666',          // Gray
        seekAnnouncement: '#666666', // Gray
        
        // Output commands (kept original + new)
        fingerNotes: '#8b008b',   // DarkMagenta
        fingerOutput: '#8b008b',  // DarkMagenta
        history: '#2e8b57',       // SeaGreen
        historyOutput: '#2e8b57', // SeaGreen
        journal: '#b8860b',       // DarkGoldenrod
        journalOutput: '#b8860b', // DarkGoldenrod
        games: '#1e90ff',         // DodgerBlue
        gamesOutput: '#1e90ff',   // DodgerBlue
        who: '#ff6347',           // Tomato
        whoOutput: '#ff6347',     // Tomato
        sought: '#9932cc',        // DarkOrchid
        soughtOutput: '#9932cc',  // DarkOrchid
        in: '#008b8b',            // DarkCyan
        inOutput: '#008b8b',      // DarkCyan
        newsOutput: '#4169e1',    // RoyalBlue
        channelListOutput: '#20b2aa', // LightSeaGreen
        
        // System messages
        login: '#2f4f4f',         // DarkSlateGray
        password: '#2f4f4f',      // DarkSlateGray
        sessionStart: '#228b22',  // ForestGreen
        system: '#696969',        // DimGray
        raw: '#000000'            // Black
    },
    consoleColorsDark: {
        // Communication
        notification: '#66b3ff',  // Light Blue
        channelTell: '#888888',   // Light gray for unlisted channels
        channel1: '#66ff66',      // Light Green
        channel2: '#cc99ff',      // Light Purple
        channel10: '#ffff66',     // Light Yellow
        channel24: '#6699ff',     // Sky Blue
        channel36: '#ffaa66',     // Light Orange
        channel39: '#ff6666',     // Light Red
        channel40: '#66ffff',     // Light Cyan
        channel41: '#cc9966',     // Light Brown
        channel49: '#cccc66',     // Light Olive
        channel50: '#ff99cc',     // Light Pink
        channel88: '#9966ff',     // Light Indigo
        directTell: '#66b3ff',    // Light Blue
        shout: '#99ff99',         // Bright Green
        cshout: '#ff66ff',        // Bright Magenta
        
        // Game related
        style12: '#666666',       // Medium Gray (low visibility for board updates)
        gameStart: '#66ff66',     // Light Green
        gameNotification: '#6495ed', // CornflowerBlue
        gameEnd: '#ff6666',       // Light Red
        movesList: '#87ceeb',     // SkyBlue
        illegalMove: '#ff6b6b',   // Light Crimson
        drawOffer: '#ffb347',     // Light Orange
        unobserve: '#999999',     // Light Gray
        
        // Match/seek related
        matchRequest: '#ff6666',  // Bright Red
        seek: '#999999',          // Light Gray
        seekAnnouncement: '#999999', // Light Gray
        
        // Output commands
        fingerNotes: '#dda0dd',   // Plum
        fingerOutput: '#dda0dd',  // Plum
        history: '#66cdaa',       // MediumAquamarine
        historyOutput: '#66cdaa', // MediumAquamarine
        journal: '#ffd700',       // Gold
        journalOutput: '#ffd700', // Gold
        games: '#87ceeb',         // SkyBlue
        gamesOutput: '#87ceeb',   // SkyBlue
        who: '#ffa07a',           // LightSalmon
        whoOutput: '#ffa07a',     // LightSalmon
        sought: '#dda0dd',        // Plum
        soughtOutput: '#dda0dd',  // Plum
        in: '#40e0d0',            // Turquoise
        inOutput: '#40e0d0',      // Turquoise
        newsOutput: '#87cefa',    // LightSkyBlue
        channelListOutput: '#40e0d0', // Turquoise
        
        // System messages
        login: '#708090',         // SlateGray
        password: '#708090',      // SlateGray
        sessionStart: '#90ee90',  // LightGreen
        system: '#999999',        // Light Gray
        raw: '#cccccc'            // Very Light Gray
    },
    
    // Default fonts are empty - inherit from parent
    consoleFontsLight: {},
    consoleFontsDark: {},
    
    // Default font styles are empty - normal style
    consoleFontStylesLight: {},
    consoleFontStylesDark: {}
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
        // Update registry values with current preferences
        Object.entries(this.preferences).forEach(([key, value]) => {
            const setting = this.settingsRegistry.get(key);
            if (setting) {
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
                        // Validate and merge with defaults, filtering out invalid values
                        const validatedPreferences = {...DEFAULT_PREFERENCES};
                        
                        // Ensure console colors have all required fields
                        // This handles the case where new colors are added after preferences were saved
                        validatedPreferences.consoleColorsLight = {
                            ...DEFAULT_PREFERENCES.consoleColorsLight,
                            ...(parsed.consoleColorsLight || {})
                        };
                        validatedPreferences.consoleColorsDark = {
                            ...DEFAULT_PREFERENCES.consoleColorsDark,
                            ...(parsed.consoleColorsDark || {})
                        };
                        
                        // Ensure console fonts and styles
                        validatedPreferences.consoleFontsLight = {
                            ...DEFAULT_PREFERENCES.consoleFontsLight,
                            ...(parsed.consoleFontsLight || {})
                        };
                        validatedPreferences.consoleFontsDark = {
                            ...DEFAULT_PREFERENCES.consoleFontsDark,
                            ...(parsed.consoleFontsDark || {})
                        };
                        validatedPreferences.consoleFontStylesLight = {
                            ...DEFAULT_PREFERENCES.consoleFontStylesLight,
                            ...(parsed.consoleFontStylesLight || {})
                        };
                        validatedPreferences.consoleFontStylesDark = {
                            ...DEFAULT_PREFERENCES.consoleFontStylesDark,
                            ...(parsed.consoleFontStylesDark || {})
                        };
                        
                        for (const [key, value] of Object.entries(parsed)) {
                            if (key !== 'consoleColorsLight' && key !== 'consoleColorsDark' && 
                                key !== 'consoleFontsLight' && key !== 'consoleFontsDark' &&
                                key !== 'consoleFontStylesLight' && key !== 'consoleFontStylesDark' &&
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
            case 'chatFontSize':
                return ['small', 'medium', 'large'].includes(value);
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
    
    // Get console color based on message type and current theme
    getConsoleColor(messageType: string, channelNumber?: string): string | null {
        const isDark = this.preferences.theme === 'dark' || 
            (this.preferences.theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
        
        const colors = isDark ? this.preferences.consoleColorsDark : this.preferences.consoleColorsLight;
        
        // Handle channel colors
        if (messageType === 'channelTell' && channelNumber) {
            const channelKey = `channel${channelNumber}` as keyof ConsoleColors;
            // Return specific channel color if defined, otherwise use default channelTell color
            return colors[channelKey] || colors.channelTell;
        }
        
        // Handle other message types
        const colorKey = messageType as keyof ConsoleColors;
        return colors[colorKey] || null;
    }
    
    // Get console font based on message type and current theme
    getConsoleFont(messageType: string, channelNumber?: string): string | null {
        const isDark = this.preferences.theme === 'dark' || 
            (this.preferences.theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
        
        const fonts = isDark ? this.preferences.consoleFontsDark : this.preferences.consoleFontsLight;
        
        // Handle channel fonts
        if (messageType === 'channelTell' && channelNumber) {
            const channelKey = `channel${channelNumber}` as keyof ConsoleFonts;
            // Return specific channel font if defined, otherwise use default channelTell font
            return fonts[channelKey] || fonts.channelTell || null;
        }
        
        // Handle other message types
        const fontKey = messageType as keyof ConsoleFonts;
        return fonts[fontKey] || null;
    }
    
    // Get console font style based on message type and current theme
    getConsoleFontStyle(messageType: string, channelNumber?: string): string | null {
        const isDark = this.preferences.theme === 'dark' || 
            (this.preferences.theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
        
        const fontStyles = isDark ? this.preferences.consoleFontStylesDark : this.preferences.consoleFontStylesLight;
        
        // Handle channel font styles
        if (messageType === 'channelTell' && channelNumber) {
            const channelKey = `channel${channelNumber}` as keyof ConsoleFontStyles;
            // Return specific channel font style if defined, otherwise use default channelTell font style
            return fontStyles[channelKey] || fontStyles.channelTell || null;
        }
        
        // Handle other message types
        const fontStyleKey = messageType as keyof ConsoleFontStyles;
        return fontStyles[fontStyleKey] || null;
    }

    // Method to refresh console colors with new defaults
    refreshConsoleColors() {
        runInAction(() => {
            this.preferences.consoleColorsLight = {
                ...DEFAULT_PREFERENCES.consoleColorsLight
            };
            this.preferences.consoleColorsDark = {
                ...DEFAULT_PREFERENCES.consoleColorsDark
            };
            this.savePreferences();
        });
    }
}
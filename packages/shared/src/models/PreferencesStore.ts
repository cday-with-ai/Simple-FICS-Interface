import {makeAutoObservable, runInAction} from 'mobx';

// Forward declaration to avoid circular dependency
interface RootStore {
    // No dependencies needed for PreferencesStore currently
}

export type ViewMode = 'chess-only' | 'chat-only' | 'chess-and-chat';
export type ChessOrientation = 'landscape' | 'portrait';

export interface Preferences {
    // Display preferences
    boardTheme: 'brown' | 'blue' | 'green' | 'purple';
    pieceSet: 'standard' | 'modern' | 'classic';
    showCoordinates: boolean;
    boardFlipped: boolean;
    animateMoves: boolean;
    animationDuration: number; // in milliseconds
    disableAnimationLowTime: boolean; // Disable animations when under 10 seconds
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

    // Game preferences
    autoAcceptRematch: boolean;
    confirmResign: boolean;
    defaultTimeControl: string;

    // Analysis preferences
    autoAnalyze: boolean;
    engineDepth: number;
    showEvaluation: boolean;

    // Context menu preferences
    playerContextCommands: Array<{ label: string; command: string } | { divider: true }>;
    
    // Internal preferences (for theme system)
    lastSystemThemeCheck?: number;
}

const DEFAULT_PREFERENCES: Preferences = {
    boardTheme: 'brown',
    pieceSet: 'standard',
    showCoordinates: true,
    boardFlipped: false,
    animateMoves: true,
    animationDuration: 250, // 0.25 seconds
    disableAnimationLowTime: true, // Default to disabling animations when low on time
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
    autoAcceptRematch: false,
    confirmResign: true,
    defaultTimeControl: '15 0',
    autoAnalyze: false,
    engineDepth: 20,
    showEvaluation: true,
    playerContextCommands: [
        { label: 'Finger', command: 'finger {player}' },
        { label: 'History', command: 'hi {player}' },
        { label: 'Variables', command: 'vars {player}' },
        { divider: true },
        { label: 'Censor', command: '+censor {player}' },
        { label: 'No Play', command: '+noplay {player}' }
    ]
};

export class PreferencesStore {
    preferences: Preferences = DEFAULT_PREFERENCES;
    rootStore?: RootStore;

    constructor() {
        makeAutoObservable(this);
        this.loadPreferences();
    }

    updatePreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
        runInAction(() => {
            this.preferences[key] = value;
        });
        this.savePreferences();
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
                        for (const [key, value] of Object.entries(parsed)) {
                            if (key in DEFAULT_PREFERENCES && value != null && this.isValidPreferenceValue(key as keyof Preferences, value)) {
                                (validatedPreferences as any)[key] = value;
                            }
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
                return ['standard', 'modern', 'classic'].includes(value);
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
}
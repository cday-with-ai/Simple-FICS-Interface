import {makeAutoObservable, runInAction} from 'mobx';

// Forward declaration to avoid circular dependency
interface RootStore {
    // No dependencies needed for PreferencesStore currently
}

export interface Preferences {
    // Display preferences
    boardTheme: 'brown' | 'blue' | 'green' | 'purple';
    pieceSet: 'standard' | 'modern' | 'classic';
    showCoordinates: boolean;
    animateMoves: boolean;
    autoPromoteToQueen: boolean;

    // UI Theme preferences
    theme: 'light' | 'dark' | 'system';
    layout: 'auto' | 'landscape' | 'portrait';

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

    // Internal preferences (for theme system)
    lastSystemThemeCheck?: number;
}

const DEFAULT_PREFERENCES: Preferences = {
    boardTheme: 'brown',
    pieceSet: 'standard',
    showCoordinates: true,
    animateMoves: true,
    autoPromoteToQueen: false,
    theme: 'system',
    layout: 'auto',
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
    showEvaluation: true
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
            case 'lastSystemThemeCheck':
                return typeof value === 'number';
            default:
                return true; // For other boolean and basic types, type check is sufficient
        }
    }
}
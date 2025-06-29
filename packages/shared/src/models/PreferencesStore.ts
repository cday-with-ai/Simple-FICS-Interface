import { makeAutoObservable } from 'mobx';

export interface Preferences {
  // Display preferences
  boardTheme: 'brown' | 'blue' | 'green' | 'purple';
  pieceSet: 'standard' | 'modern' | 'classic';
  showCoordinates: boolean;
  animateMoves: boolean;
  autoPromoteToQueen: boolean;
  
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
}

const DEFAULT_PREFERENCES: Preferences = {
  boardTheme: 'brown',
  pieceSet: 'standard',
  showCoordinates: true,
  animateMoves: true,
  autoPromoteToQueen: false,
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

  constructor() {
    makeAutoObservable(this);
    this.loadPreferences();
  }

  updatePreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    this.preferences[key] = value;
    this.savePreferences();
  }

  resetToDefaults() {
    this.preferences = { ...DEFAULT_PREFERENCES };
    this.savePreferences();
  }

  private loadPreferences() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('fics-preferences');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.preferences = { ...DEFAULT_PREFERENCES, ...parsed };
        } catch (error) {
          console.error('Failed to load preferences:', error);
        }
      }
    }
  }

  private savePreferences() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('fics-preferences', JSON.stringify(this.preferences));
      } catch (error) {
        console.error('Failed to save preferences:', error);
      }
    }
  }
}
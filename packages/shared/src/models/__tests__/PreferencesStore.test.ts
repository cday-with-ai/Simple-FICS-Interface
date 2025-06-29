import {PreferencesStore, Preferences} from '../PreferencesStore';
import {runInAction} from 'mobx';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

// Mock window object for test environment
Object.defineProperty(global, 'window', {
    value: {
        localStorage: localStorageMock
    },
    writable: true
});

describe('PreferencesStore', () => {
    let preferencesStore: PreferencesStore;
    let mockRootStore: any;

    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();

        // Reset localStorage mock to original implementation
        let store: Record<string, string> = {};
        localStorageMock.getItem.mockImplementation((key: string) => store[key] || null);
        localStorageMock.setItem.mockImplementation((key: string, value: string) => {
            store[key] = value.toString();
        });
        localStorageMock.removeItem.mockImplementation((key: string) => {
            delete store[key];
        });
        localStorageMock.clear.mockImplementation(() => {
            store = {};
        });

        mockRootStore = {
            // No dependencies needed for PreferencesStore currently
        };

        preferencesStore = new PreferencesStore();
        (preferencesStore as any).rootStore = mockRootStore;
    });

    describe('Initialization', () => {
        it('should initialize with default preferences', () => {
            expect(preferencesStore.preferences).toEqual({
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
            });
        });

        it('should be observable', () => {
            expect(preferencesStore.preferences.boardTheme).toBe('brown');

            runInAction(() => {
                preferencesStore.preferences.boardTheme = 'blue';
            });

            expect(preferencesStore.preferences.boardTheme).toBe('blue');
        });

        it('should load preferences from localStorage on initialization', () => {
            const savedPreferences = {
                boardTheme: 'blue',
                pieceSet: 'modern',
                enableSounds: false
            };

            localStorageMock.setItem('fics-preferences', JSON.stringify(savedPreferences));

            const newStore = new PreferencesStore();

            expect(newStore.preferences.boardTheme).toBe('blue');
            expect(newStore.preferences.pieceSet).toBe('modern');
            expect(newStore.preferences.enableSounds).toBe(false);
            // Should keep defaults for unspecified preferences
            expect(newStore.preferences.showCoordinates).toBe(true);
        });

        it('should handle invalid JSON in localStorage gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            localStorageMock.setItem('fics-preferences', 'invalid json');

            const newStore = new PreferencesStore();

            expect(newStore.preferences.boardTheme).toBe('brown'); // Should use defaults
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('should handle missing localStorage gracefully', () => {
            // Mock environment without localStorage (like Node.js)
            const originalWindow = global.window;
            delete (global as any).window;

            const newStore = new PreferencesStore();

            expect(newStore.preferences.boardTheme).toBe('brown'); // Should use defaults

            // Restore window
            (global as any).window = originalWindow;
        });
    });

    describe('Preference Updates', () => {
        it('should update individual preferences', () => {
            preferencesStore.updatePreference('boardTheme', 'blue');

            expect(preferencesStore.preferences.boardTheme).toBe('blue');
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'fics-preferences',
                expect.stringContaining('"boardTheme":"blue"')
            );
        });

        it('should update multiple preferences', () => {
            preferencesStore.updatePreference('boardTheme', 'blue');
            preferencesStore.updatePreference('pieceSet', 'modern');
            preferencesStore.updatePreference('enableSounds', false);

            expect(preferencesStore.preferences.boardTheme).toBe('blue');
            expect(preferencesStore.preferences.pieceSet).toBe('modern');
            expect(preferencesStore.preferences.enableSounds).toBe(false);
        });

        it('should save preferences to localStorage after each update', () => {
            preferencesStore.updatePreference('boardTheme', 'blue');
            preferencesStore.updatePreference('enableSounds', false);

            expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
        });

        it('should handle localStorage save errors gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            localStorageMock.setItem.mockImplementation(() => {
                throw new Error('Storage full');
            });

            preferencesStore.updatePreference('boardTheme', 'blue');

            expect(preferencesStore.preferences.boardTheme).toBe('blue');
            expect(consoleSpy).toHaveBeenCalled();

            // Clean up mocks
            consoleSpy.mockRestore();
            jest.clearAllMocks();
        });
    });

    describe('Board Preferences', () => {
        it('should update board theme', () => {
            const themes: Preferences['boardTheme'][] = ['brown', 'blue', 'green', 'purple'];

            themes.forEach(theme => {
                preferencesStore.updatePreference('boardTheme', theme);
                expect(preferencesStore.preferences.boardTheme).toBe(theme);
            });
        });

        it('should update piece set', () => {
            const pieceSets: Preferences['pieceSet'][] = ['standard', 'modern', 'classic'];

            pieceSets.forEach(pieceSet => {
                preferencesStore.updatePreference('pieceSet', pieceSet);
                expect(preferencesStore.preferences.pieceSet).toBe(pieceSet);
            });
        });

        it('should update board display options', () => {
            preferencesStore.updatePreference('showCoordinates', false);
            preferencesStore.updatePreference('animateMoves', false);
            preferencesStore.updatePreference('autoPromoteToQueen', true);

            expect(preferencesStore.preferences.showCoordinates).toBe(false);
            expect(preferencesStore.preferences.animateMoves).toBe(false);
            expect(preferencesStore.preferences.autoPromoteToQueen).toBe(true);
        });
    });

    describe('Sound Preferences', () => {
        it('should update sound settings', () => {
            preferencesStore.updatePreference('enableSounds', false);
            preferencesStore.updatePreference('moveSound', false);
            preferencesStore.updatePreference('captureSound', false);
            preferencesStore.updatePreference('checkSound', false);

            expect(preferencesStore.preferences.enableSounds).toBe(false);
            expect(preferencesStore.preferences.moveSound).toBe(false);
            expect(preferencesStore.preferences.captureSound).toBe(false);
            expect(preferencesStore.preferences.checkSound).toBe(false);
        });
    });

    describe('Chat Preferences', () => {
        it('should update chat settings', () => {
            preferencesStore.updatePreference('showTimestamps', false);
            preferencesStore.updatePreference('chatFontSize', 'large');
            preferencesStore.updatePreference('highlightMentions', false);

            expect(preferencesStore.preferences.showTimestamps).toBe(false);
            expect(preferencesStore.preferences.chatFontSize).toBe('large');
            expect(preferencesStore.preferences.highlightMentions).toBe(false);
        });

        it('should handle all chat font sizes', () => {
            const fontSizes: Preferences['chatFontSize'][] = ['small', 'medium', 'large'];

            fontSizes.forEach(fontSize => {
                preferencesStore.updatePreference('chatFontSize', fontSize);
                expect(preferencesStore.preferences.chatFontSize).toBe(fontSize);
            });
        });
    });

    describe('Game Preferences', () => {
        it('should update game settings', () => {
            preferencesStore.updatePreference('autoAcceptRematch', true);
            preferencesStore.updatePreference('confirmResign', false);
            preferencesStore.updatePreference('defaultTimeControl', '5 0');

            expect(preferencesStore.preferences.autoAcceptRematch).toBe(true);
            expect(preferencesStore.preferences.confirmResign).toBe(false);
            expect(preferencesStore.preferences.defaultTimeControl).toBe('5 0');
        });
    });

    describe('Analysis Preferences', () => {
        it('should update analysis settings', () => {
            preferencesStore.updatePreference('autoAnalyze', true);
            preferencesStore.updatePreference('engineDepth', 15);
            preferencesStore.updatePreference('showEvaluation', false);

            expect(preferencesStore.preferences.autoAnalyze).toBe(true);
            expect(preferencesStore.preferences.engineDepth).toBe(15);
            expect(preferencesStore.preferences.showEvaluation).toBe(false);
        });
    });

    describe('Reset to Defaults', () => {
        it('should reset all preferences to defaults', () => {
            // Change some preferences first
            preferencesStore.updatePreference('boardTheme', 'blue');
            preferencesStore.updatePreference('enableSounds', false);
            preferencesStore.updatePreference('chatFontSize', 'large');

            preferencesStore.resetToDefaults();

            expect(preferencesStore.preferences.boardTheme).toBe('brown');
            expect(preferencesStore.preferences.enableSounds).toBe(true);
            expect(preferencesStore.preferences.chatFontSize).toBe('medium');

            expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
                'fics-preferences',
                expect.stringContaining('"boardTheme":"brown"')
            );
        });

        it('should save defaults to localStorage', () => {
            preferencesStore.resetToDefaults();

            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'fics-preferences',
                expect.any(String)
            );
        });
    });

    describe('Persistence', () => {
        it('should persist and load complex preferences', () => {
            const complexPreferences: Partial<Preferences> = {
                boardTheme: 'purple',
                pieceSet: 'classic',
                showCoordinates: false,
                animateMoves: false,
                autoPromoteToQueen: true,
                theme: 'dark',
                layout: 'landscape',
                enableSounds: false,
                moveSound: false,
                captureSound: true,
                checkSound: false,
                showTimestamps: false,
                chatFontSize: 'small',
                highlightMentions: false,
                autoAcceptRematch: true,
                confirmResign: false,
                defaultTimeControl: '1 0',
                autoAnalyze: true,
                engineDepth: 25,
                showEvaluation: false
            };

            // Update all preferences
            Object.entries(complexPreferences).forEach(([key, value]) => {
                preferencesStore.updatePreference(key as keyof Preferences, value as any);
            });

            // Create new store to test loading
            const newStore = new PreferencesStore();

            // Verify all preferences were loaded correctly
            Object.entries(complexPreferences).forEach(([key, value]) => {
                expect(newStore.preferences[key as keyof Preferences]).toBe(value);
            });
        });

        it('should handle partial preferences in localStorage', () => {
            const partialPreferences = {
                boardTheme: 'green',
                enableSounds: false,
                engineDepth: 30
            };

            localStorageMock.setItem('fics-preferences', JSON.stringify(partialPreferences));

            const newStore = new PreferencesStore();

            // Should have updated values
            expect(newStore.preferences.boardTheme).toBe('green');
            expect(newStore.preferences.enableSounds).toBe(false);
            expect(newStore.preferences.engineDepth).toBe(30);

            // Should have default values for unspecified preferences
            expect(newStore.preferences.pieceSet).toBe('standard');
            expect(newStore.preferences.showCoordinates).toBe(true);
            expect(newStore.preferences.chatFontSize).toBe('medium');
        });

        it('should handle empty localStorage', () => {
            localStorageMock.getItem.mockReturnValue(null);

            const newStore = new PreferencesStore();

            expect(newStore.preferences.boardTheme).toBe('brown');
            expect(newStore.preferences.enableSounds).toBe(true);
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints for preferences', () => {
            // These should compile without TypeScript errors
            preferencesStore.updatePreference('boardTheme', 'blue');
            preferencesStore.updatePreference('enableSounds', true);
            preferencesStore.updatePreference('engineDepth', 25);

            // Verify the updates worked
            expect(preferencesStore.preferences.boardTheme).toBe('blue');
            expect(preferencesStore.preferences.enableSounds).toBe(true);
            expect(preferencesStore.preferences.engineDepth).toBe(25);
        });
    });

    describe('Edge Cases', () => {
        it('should handle localStorage quota exceeded error', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            localStorageMock.setItem.mockImplementation(() => {
                const error = new Error('QuotaExceededError');
                error.name = 'QuotaExceededError';
                throw error;
            });

            preferencesStore.updatePreference('boardTheme', 'blue');

            expect(preferencesStore.preferences.boardTheme).toBe('blue');
            expect(consoleSpy).toHaveBeenCalledWith('Failed to save preferences:', expect.any(Error));

            // Clean up mocks
            consoleSpy.mockRestore();
            jest.clearAllMocks();
        });

        it('should handle concurrent preference updates', async () => {
            const promises = [];

            // Simulate rapid concurrent updates
            for (let i = 0; i < 10; i++) {
                promises.push(
                    new Promise<void>(resolve => {
                        setTimeout(() => {
                            preferencesStore.updatePreference('engineDepth', 10 + i);
                            resolve();
                        }, Math.random() * 10);
                    })
                );
            }

            await Promise.all(promises);

            // Final depth should be valid
            expect(preferencesStore.preferences.engineDepth).toBeGreaterThanOrEqual(10);
            expect(preferencesStore.preferences.engineDepth).toBeLessThan(20);
        });

        it('should handle null/undefined values in localStorage', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            localStorageMock.setItem('fics-preferences', JSON.stringify({
                boardTheme: null,
                enableSounds: undefined,
                engineDepth: 'invalid'
            }));

            const newStore = new PreferencesStore();

            // Should fallback to defaults for invalid values
            expect(newStore.preferences.boardTheme).toBe('brown');
            expect(newStore.preferences.enableSounds).toBe(true);
            expect(newStore.preferences.engineDepth).toBe(20);

            consoleSpy.mockRestore();
        });
    });
});
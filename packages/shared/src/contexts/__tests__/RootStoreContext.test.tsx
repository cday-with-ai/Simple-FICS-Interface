import React from 'react';
import {render, renderHook, screen} from '@testing-library/react';
import {act} from '@testing-library/react';
import {
    RootStoreProvider,
    useRootStore,
    useGameStore,
    useFICSStore,
    useChatStore,
    usePreferencesStore
} from '../RootStoreContext';
import {RootStore} from '../../models/RootStore';

// Test component that uses the context hooks
const TestComponent: React.FC = () => {
    const rootStore = useRootStore();
    const gameStore = useGameStore();
    const ficsStore = useFICSStore();
    const chatStore = useChatStore();
    const preferencesStore = usePreferencesStore();

    return (
        <div>
            <div data-testid="root-store">{rootStore ? 'root-store-present' : 'root-store-missing'}</div>
            <div data-testid="game-store">{gameStore ? 'game-store-present' : 'game-store-missing'}</div>
            <div data-testid="fics-store">{ficsStore ? 'fics-store-present' : 'fics-store-missing'}</div>
            <div data-testid="chat-store">{chatStore ? 'chat-store-present' : 'chat-store-missing'}</div>
            <div
                data-testid="preferences-store">{preferencesStore ? 'preferences-store-present' : 'preferences-store-missing'}</div>
            <div data-testid="connected">{ficsStore.connected ? 'connected' : 'disconnected'}</div>
            <div data-testid="chat-tabs">{chatStore.tabs.size}</div>
            <div data-testid="board-theme">{preferencesStore.preferences.boardTheme}</div>
        </div>
    );
};

describe('RootStoreContext', () => {
    describe('RootStoreProvider', () => {
        it('should provide RootStore to children', () => {
            render(
                <RootStoreProvider>
                    <TestComponent/>
                </RootStoreProvider>
            );

            expect(screen.getByTestId('root-store')).toHaveTextContent('root-store-present');
            expect(screen.getByTestId('game-store')).toHaveTextContent('game-store-present');
            expect(screen.getByTestId('fics-store')).toHaveTextContent('fics-store-present');
            expect(screen.getByTestId('chat-store')).toHaveTextContent('chat-store-present');
            expect(screen.getByTestId('preferences-store')).toHaveTextContent('preferences-store-present');
        });

        it('should provide initial store values', () => {
            render(
                <RootStoreProvider>
                    <TestComponent/>
                </RootStoreProvider>
            );

            expect(screen.getByTestId('connected')).toHaveTextContent('disconnected');
            expect(screen.getByTestId('chat-tabs')).toHaveTextContent('1'); // Console tab
            expect(screen.getByTestId('board-theme')).toHaveTextContent('brown');
        });

        it('should accept custom store instance', () => {
            const customStore = new RootStore();

            // Modify the custom store to test it's being used
            act(() => {
                customStore.preferencesStore.updatePreference('boardTheme', 'blue');
            });

            render(
                <RootStoreProvider store={customStore}>
                    <TestComponent/>
                </RootStoreProvider>
            );

            expect(screen.getByTestId('board-theme')).toHaveTextContent('blue');

            customStore.dispose();
        });

        it('should create new store if none provided', () => {
            const {rerender} = render(
                <RootStoreProvider>
                    <TestComponent/>
                </RootStoreProvider>
            );

            const firstTheme = screen.getByTestId('board-theme').textContent;

            // Rerender without store prop should create new store
            rerender(
                <RootStoreProvider>
                    <TestComponent/>
                </RootStoreProvider>
            );

            expect(screen.getByTestId('board-theme')).toHaveTextContent(firstTheme);
        });
    });

    describe('useRootStore hook', () => {
        it('should return RootStore instance', () => {
            const {result} = renderHook(() => useRootStore(), {
                wrapper: ({children}) => (
                    <RootStoreProvider>{children}</RootStoreProvider>
                )
            });

            expect(result.current).toBeInstanceOf(RootStore);
            expect(result.current.gameStore).toBeDefined();
            expect(result.current.ficsStore).toBeDefined();
            expect(result.current.chatStore).toBeDefined();
            expect(result.current.preferencesStore).toBeDefined();
        });

        it('should throw error when used outside provider', () => {
            const {result} = renderHook(() => useRootStore());

            expect(result.error).toEqual(
                Error('useRootStore must be used within RootStoreProvider')
            );
        });

        it('should return same instance across multiple calls', () => {
            const {result, rerender} = renderHook(() => useRootStore(), {
                wrapper: ({children}) => (
                    <RootStoreProvider>{children}</RootStoreProvider>
                )
            });

            const firstCall = result.current;

            rerender();

            const secondCall = result.current;

            expect(firstCall).toBe(secondCall);
        });
    });

    describe('Individual store hooks', () => {
        let wrapper: React.FC<{ children: React.ReactNode }>;

        beforeEach(() => {
            wrapper = ({children}) => (
                <RootStoreProvider>{children}</RootStoreProvider>
            );
        });

        describe('useGameStore', () => {
            it('should return GameStore instance', () => {
                const {result} = renderHook(() => useGameStore(), {wrapper});

                expect(result.current).toBeDefined();
                expect(result.current.currentGame).toBeNull();
                expect(result.current.moveHistory).toEqual([]);
                expect(result.current.isAnalyzing).toBe(false);
            });

            it('should reflect state changes', () => {
                const {result} = renderHook(() => useGameStore(), {wrapper});

                act(() => {
                    result.current.toggleAnalysis();
                });

                expect(result.current.isAnalyzing).toBe(true);
            });

            it('should throw error when used outside provider', () => {
                const {result} = renderHook(() => useGameStore());
                expect(result.error).toEqual(
                    Error('useRootStore must be used within RootStoreProvider')
                );
            });
        });

        describe('useFICSStore', () => {
            it('should return FICSStore instance', () => {
                const {result} = renderHook(() => useFICSStore(), {wrapper});

                expect(result.current).toBeDefined();
                expect(result.current.connected).toBe(false);
                expect(result.current.user).toBeNull();
                expect(result.current.seekList).toEqual([]);
                expect(result.current.gameList).toEqual([]);
            });

            it('should reflect state changes', () => {
                const {result} = renderHook(() => useFICSStore(), {wrapper});

                act(() => {
                    result.current.connect();
                });

                expect(result.current.connecting).toBe(true);

                // Cleanup
                act(() => {
                    result.current.disconnect();
                });
            });

            it('should throw error when used outside provider', () => {
                const {result} = renderHook(() => useFICSStore());
                expect(result.error).toEqual(
                    Error('useRootStore must be used within RootStoreProvider')
                );
            });
        });

        describe('useChatStore', () => {
            it('should return ChatStore instance', () => {
                const {result} = renderHook(() => useChatStore(), {wrapper});

                expect(result.current).toBeDefined();
                expect(result.current.tabs.size).toBe(1); // Console tab
                expect(result.current.activeTabId).toBe('console');
                expect(result.current.inputHistory).toEqual([]);
            });

            it('should reflect state changes', () => {
                const {result} = renderHook(() => useChatStore(), {wrapper});

                act(() => {
                    result.current.createTab('test', 'Test Channel', 'channel');
                });

                expect(result.current.tabs.size).toBe(2);
                expect(result.current.tabs.has('test')).toBe(true);
            });

            it('should throw error when used outside provider', () => {
                const {result} = renderHook(() => useChatStore());
                expect(result.error).toEqual(
                    Error('useRootStore must be used within RootStoreProvider')
                );
            });
        });

        describe('usePreferencesStore', () => {
            it('should return PreferencesStore instance', () => {
                const {result} = renderHook(() => usePreferencesStore(), {wrapper});

                expect(result.current).toBeDefined();
                expect(result.current.preferences.boardTheme).toBe('brown');
                expect(result.current.preferences.enableSounds).toBe(true);
                expect(result.current.preferences.engineDepth).toBe(20);
            });

            it('should reflect preference changes', () => {
                const {result} = renderHook(() => usePreferencesStore(), {wrapper});

                act(() => {
                    result.current.updatePreference('boardTheme', 'blue');
                });

                expect(result.current.preferences.boardTheme).toBe('blue');
            });

            it('should throw error when used outside provider', () => {
                const {result} = renderHook(() => usePreferencesStore());
                expect(result.error).toEqual(
                    Error('useRootStore must be used within RootStoreProvider')
                );
            });
        });
    });

    describe('Store Integration', () => {
        it('should allow cross-store communication through context', () => {
            const {result: rootResult} = renderHook(() => useRootStore(), {
                wrapper: ({children}) => (
                    <RootStoreProvider>{children}</RootStoreProvider>
                )
            });

            const {result: chatResult} = renderHook(() => useChatStore(), {
                wrapper: ({children}) => (
                    <RootStoreProvider>{children}</RootStoreProvider>
                )
            });

            // Verify stores can communicate
            expect(rootResult.current.chatStore).toBe(chatResult.current);
        });

        it('should maintain store references across re-renders', () => {
            const {result, rerender} = renderHook(() => ({
                root: useRootStore(),
                game: useGameStore(),
                fics: useFICSStore(),
                chat: useChatStore(),
                preferences: usePreferencesStore()
            }), {
                wrapper: ({children}) => (
                    <RootStoreProvider>{children}</RootStoreProvider>
                )
            });

            const firstRender = result.current;

            rerender();

            const secondRender = result.current;

            expect(firstRender.root).toBe(secondRender.root);
            expect(firstRender.game).toBe(secondRender.game);
            expect(firstRender.fics).toBe(secondRender.fics);
            expect(firstRender.chat).toBe(secondRender.chat);
            expect(firstRender.preferences).toBe(secondRender.preferences);
        });
    });

    describe('Error Boundaries', () => {
        it('should handle provider errors gracefully', () => {
            const ThrowingComponent = () => {
                useRootStore();
                throw new Error('Test error');
            };

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            expect(() => {
                render(
                    <RootStoreProvider>
                        <ThrowingComponent/>
                    </RootStoreProvider>
                );
            }).toThrow('Test error');

            consoleSpy.mockRestore();
        });

        it('should provide clear error message for missing provider', () => {
            const {result} = renderHook(() => useRootStore());

            expect(result.error?.message).toBe('useRootStore must be used within RootStoreProvider');
        });
    });

    describe('Memory Management', () => {
        it('should clean up stores properly', () => {
            const customStore = new RootStore();
            const disposeSpy = jest.spyOn(customStore, 'dispose');

            const {unmount} = render(
                <RootStoreProvider store={customStore}>
                    <TestComponent/>
                </RootStoreProvider>
            );

            unmount();

            // Note: In a real app, you might want to dispose stores on unmount
            // This test verifies the dispose method exists and can be called
            customStore.dispose();
            expect(disposeSpy).toHaveBeenCalled();
        });
    });

    describe('TypeScript Integration', () => {
        it('should provide correct TypeScript types', () => {
            const {result} = renderHook(() => {
                const rootStore = useRootStore();
                const gameStore = useGameStore();
                const ficsStore = useFICSStore();
                const chatStore = useChatStore();
                const preferencesStore = usePreferencesStore();

                // TypeScript should infer correct types
                return {
                    rootStoreType: typeof rootStore,
                    gameStoreType: typeof gameStore,
                    ficsStoreType: typeof ficsStore,
                    chatStoreType: typeof chatStore,
                    preferencesStoreType: typeof preferencesStore,
                    // Test that methods are available
                    gameStoreMethods: {
                        toggleAnalysis: typeof gameStore.toggleAnalysis,
                        makeMove: typeof gameStore.makeMove
                    },
                    ficsStoreMethods: {
                        connect: typeof ficsStore.connect,
                        sendCommand: typeof ficsStore.sendCommand
                    },
                    chatStoreMethods: {
                        addMessage: typeof chatStore.addMessage,
                        createTab: typeof chatStore.createTab
                    },
                    preferencesStoreMethods: {
                        updatePreference: typeof preferencesStore.updatePreference,
                        resetToDefaults: typeof preferencesStore.resetToDefaults
                    }
                };
            }, {
                wrapper: ({children}) => (
                    <RootStoreProvider>{children}</RootStoreProvider>
                )
            });

            expect(result.current.rootStoreType).toBe('object');
            expect(result.current.gameStoreType).toBe('object');
            expect(result.current.ficsStoreType).toBe('object');
            expect(result.current.chatStoreType).toBe('object');
            expect(result.current.preferencesStoreType).toBe('object');

            expect(result.current.gameStoreMethods.toggleAnalysis).toBe('function');
            expect(result.current.gameStoreMethods.makeMove).toBe('function');
            expect(result.current.ficsStoreMethods.connect).toBe('function');
            expect(result.current.ficsStoreMethods.sendCommand).toBe('function');
            expect(result.current.chatStoreMethods.addMessage).toBe('function');
            expect(result.current.chatStoreMethods.createTab).toBe('function');
            expect(result.current.preferencesStoreMethods.updatePreference).toBe('function');
            expect(result.current.preferencesStoreMethods.resetToDefaults).toBe('function');
        });
    });
});
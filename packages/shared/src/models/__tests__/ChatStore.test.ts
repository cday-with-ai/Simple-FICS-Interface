import {ChatStore, ChatMessage, ChatTab} from '../ChatStore';
import {runInAction} from 'mobx';

describe('ChatStore', () => {
    let chatStore: ChatStore;
    let mockRootStore: any;

    beforeEach(() => {
        mockRootStore = {
            // No dependencies needed for ChatStore currently
        };

        chatStore = new ChatStore();
        (chatStore as any).rootStore = mockRootStore;
    });

    describe('Initialization', () => {
        it('should initialize with console tab', () => {
            expect(chatStore.tabs.size).toBe(1);
            expect(chatStore.tabs.has('console')).toBe(true);
            expect(chatStore.activeTabId).toBe('console');
            expect(chatStore.inputHistory).toEqual([]);
            expect(chatStore.historyIndex).toBe(-1);
        });

        it('should have console tab with correct properties', () => {
            const consoleTab = chatStore.tabs.get('console');
            expect(consoleTab).toEqual({
                id: 'console',
                name: 'Console',
                type: 'console',
                unreadCount: 0,
                messages: [],
                order: 0
            });
        });

        it('should be observable', () => {
            expect(chatStore.activeTabId).toBe('console');

            runInAction(() => {
                chatStore.activeTabId = 'test';
            });

            expect(chatStore.activeTabId).toBe('test');
        });
    });

    describe('Tab Management', () => {
        it('should create new tabs', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');

            expect(chatStore.tabs.size).toBe(2);
            expect(chatStore.tabs.has('channel1')).toBe(true);

            const newTab = chatStore.tabs.get('channel1');
            expect(newTab).toEqual({
                id: 'channel1',
                name: 'Channel 1',
                type: 'channel',
                order: 1,
                unreadCount: 0,
                messages: []
            });
        });

        it('should not create duplicate tabs', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.createTab('channel1', 'Channel 1 Duplicate', 'channel');

            expect(chatStore.tabs.size).toBe(2);
            const tab = chatStore.tabs.get('channel1');
            expect(tab?.name).toBe('Channel 1'); // Should keep original name
        });

        it('should set active tab', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.setActiveTab('channel1');

            expect(chatStore.activeTabId).toBe('channel1');
        });

        it('should clear unread count when setting active tab', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');

            // Add unread count
            runInAction(() => {
                const tab = chatStore.tabs.get('channel1')!;
                tab.unreadCount = 5;
            });

            chatStore.setActiveTab('channel1');

            const tab = chatStore.tabs.get('channel1');
            expect(tab?.unreadCount).toBe(0);
        });

        it('should not set active tab for non-existent tab', () => {
            const originalActiveTab = chatStore.activeTabId;
            chatStore.setActiveTab('nonexistent');

            expect(chatStore.activeTabId).toBe(originalActiveTab);
        });

        it('should close tabs except console', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.createTab('private1', 'Private Chat', 'private');

            chatStore.closeTab('channel1');

            expect(chatStore.tabs.has('channel1')).toBe(false);
            expect(chatStore.tabs.has('console')).toBe(true);
            expect(chatStore.tabs.has('private1')).toBe(true);
        });

        it('should not close console tab', () => {
            chatStore.closeTab('console');

            expect(chatStore.tabs.has('console')).toBe(true);
        });

        it('should switch to console when closing active tab', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.setActiveTab('channel1');

            chatStore.closeTab('channel1');

            expect(chatStore.activeTabId).toBe('console');
        });

        it('should not change active tab when closing non-active tab', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.createTab('channel2', 'Channel 2', 'channel');
            chatStore.setActiveTab('channel1');

            chatStore.closeTab('channel2');

            expect(chatStore.activeTabId).toBe('channel1');
        });
    });

    describe('Message Management', () => {
        const sampleMessage: Omit<ChatMessage, 'id'> = {
            channel: 'console',
            sender: 'TestUser',
            content: 'Hello world!',
            timestamp: new Date(),
            type: 'message'
        };

        it('should add messages to existing tabs', () => {
            chatStore.addMessage('console', sampleMessage);

            const consoleTab = chatStore.tabs.get('console');
            expect(consoleTab?.messages).toHaveLength(1);
            expect(consoleTab?.messages[0]).toMatchObject(sampleMessage);
            expect(consoleTab?.messages[0].id).toBeDefined();
        });

        it('should create new tab when adding message to non-existent tab', () => {
            chatStore.addMessage('channel1', {
                ...sampleMessage,
                channel: 'channel1'
            });

            expect(chatStore.tabs.has('channel1')).toBe(true);
            const newTab = chatStore.tabs.get('channel1');
            expect(newTab?.messages).toHaveLength(1);
        });

        it('should increment unread count for inactive tabs', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.setActiveTab('console'); // Make sure console is active

            chatStore.addMessage('channel1', {
                ...sampleMessage,
                channel: 'channel1'
            });

            const tab = chatStore.tabs.get('channel1');
            expect(tab?.unreadCount).toBe(1);
        });

        it('should not increment unread count for active tab', () => {
            chatStore.addMessage('console', sampleMessage);

            const consoleTab = chatStore.tabs.get('console');
            expect(consoleTab?.unreadCount).toBe(0);
        });

        it('should limit message history to 1000 messages', () => {
            // Add 1001 messages to trigger the trim
            for (let i = 0; i < 1001; i++) {
                chatStore.addMessage('console', {
                    ...sampleMessage,
                    content: `Message ${i}`
                });
            }

            const consoleTab = chatStore.tabs.get('console');
            // After adding 1001 messages, it should trim to 800 (since 1001 > 1000)
            expect(consoleTab?.messages.length).toBe(800);
        });

        it('should generate unique IDs for messages', () => {
            chatStore.addMessage('console', sampleMessage);
            chatStore.addMessage('console', sampleMessage);

            const consoleTab = chatStore.tabs.get('console');
            const ids = consoleTab?.messages.map(m => m.id) || [];
            expect(new Set(ids).size).toBe(2); // All IDs should be unique
        });
    });

    describe('Input History', () => {
        it('should add commands to history', () => {
            chatStore.addToHistory('tell player hello');
            chatStore.addToHistory('say good game');

            expect(chatStore.inputHistory).toEqual(['tell player hello', 'say good game']);
            expect(chatStore.historyIndex).toBe(2);
        });

        it('should limit history to 100 items', () => {
            // Add 101 commands to trigger the trim
            for (let i = 0; i < 101; i++) {
                chatStore.addToHistory(`command ${i}`);
            }

            expect(chatStore.inputHistory.length).toBe(80); // Should be trimmed to 80
            expect(chatStore.historyIndex).toBe(80);
        });

        it('should navigate up through history', () => {
            chatStore.addToHistory('first command');
            chatStore.addToHistory('second command');
            chatStore.addToHistory('third command');

            const up1 = chatStore.navigateHistory('up');
            expect(up1).toBe('third command');
            expect(chatStore.historyIndex).toBe(2);

            const up2 = chatStore.navigateHistory('up');
            expect(up2).toBe('second command');
            expect(chatStore.historyIndex).toBe(1);

            const up3 = chatStore.navigateHistory('up');
            expect(up3).toBe('first command');
            expect(chatStore.historyIndex).toBe(0);
        });

        it('should navigate down through history', () => {
            chatStore.addToHistory('first command');
            chatStore.addToHistory('second command');
            chatStore.addToHistory('third command');

            // Go up twice
            chatStore.navigateHistory('up');
            chatStore.navigateHistory('up');

            const down1 = chatStore.navigateHistory('down');
            expect(down1).toBe('third command');
            expect(chatStore.historyIndex).toBe(2);
        });

        it('should not navigate beyond history bounds', () => {
            chatStore.addToHistory('only command');

            // Try to go up beyond beginning
            chatStore.navigateHistory('up');
            const beyondStart = chatStore.navigateHistory('up');
            expect(beyondStart).toBeNull();
            expect(chatStore.historyIndex).toBe(0);

            // Try to go down beyond end
            const beyondEnd = chatStore.navigateHistory('down');
            expect(beyondEnd).toBeNull();
        });

        it('should handle empty history navigation', () => {
            const up = chatStore.navigateHistory('up');
            const down = chatStore.navigateHistory('down');

            expect(up).toBeNull();
            expect(down).toBeNull();
            expect(chatStore.historyIndex).toBe(-1);
        });
    });

    describe('Computed Properties', () => {
        it('should return active tab', () => {
            expect(chatStore.activeTab).toBe(chatStore.tabs.get('console'));

            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.setActiveTab('channel1');

            expect(chatStore.activeTab).toBe(chatStore.tabs.get('channel1'));
        });

        it('should return null for non-existent active tab', () => {
            runInAction(() => {
                chatStore.activeTabId = 'nonexistent';
            });

            expect(chatStore.activeTab).toBeUndefined();
        });

        it('should return sorted tabs by order', () => {
            chatStore.createTab('zebra', 'Zebra Channel', 'channel');
            chatStore.createTab('alpha', 'Alpha Channel', 'channel');
            chatStore.createTab('beta', 'Beta Channel', 'private');

            const sortedTabs = chatStore.sortedTabs;

            // Tabs are sorted by order (creation time), not alphabetically
            expect(sortedTabs[0].id).toBe('console'); // Console is always first (order 0)
            expect(sortedTabs[1].id).toBe('zebra');   // Created first
            expect(sortedTabs[2].id).toBe('alpha');   // Created second
            expect(sortedTabs[3].id).toBe('beta');    // Created third
        });

        it('should handle empty tabs in sorting', () => {
            // Clear all tabs (this shouldn't happen in real usage)
            runInAction(() => {
                chatStore.tabs.clear();
            });

            const sortedTabs = chatStore.sortedTabs;
            expect(sortedTabs).toEqual([]);
        });
    });

    describe('Message Types', () => {
        it('should handle different message types', () => {
            const messageTypes: ChatMessage['type'][] = ['message', 'system', 'whisper', 'announcement'];

            messageTypes.forEach(type => {
                chatStore.addMessage('console', {
                    channel: 'console',
                    sender: 'TestUser',
                    content: `Test ${type} message`,
                    timestamp: new Date(),
                    type
                });
            });

            const consoleTab = chatStore.tabs.get('console');
            expect(consoleTab?.messages).toHaveLength(4);

            const types = consoleTab?.messages.map(m => m.type) || [];
            expect(types).toEqual(messageTypes);
        });
    });

    describe('Tab Types', () => {
        it('should handle different tab types', () => {
            chatStore.createTab('channel1', 'Channel 1', 'channel');
            chatStore.createTab('private1', 'Private Chat', 'private');
            chatStore.createTab('console2', 'Console 2', 'console');

            const channelTab = chatStore.tabs.get('channel1');
            const privateTab = chatStore.tabs.get('private1');
            const consoleTab2 = chatStore.tabs.get('console2');

            expect(channelTab?.type).toBe('channel');
            expect(privateTab?.type).toBe('private');
            expect(consoleTab2?.type).toBe('console');
        });
    });

    describe('Edge Cases', () => {
        it('should handle rapid message additions', () => {
            const promises: Promise<void>[] = [];

            // Add 100 messages rapidly
            for (let i = 0; i < 100; i++) {
                promises.push(new Promise(resolve => {
                    setTimeout(() => {
                        chatStore.addMessage('console', {
                            channel: 'console',
                            sender: 'TestUser',
                            content: `Rapid message ${i}`,
                            timestamp: new Date(),
                            type: 'message'
                        });
                        resolve();
                    }, Math.random() * 10);
                }));
            }

            return Promise.all(promises).then(() => {
                const consoleTab = chatStore.tabs.get('console');
                expect(consoleTab?.messages.length).toBe(100);
            });
        });

        it('should handle message with very long content', () => {
            const longContent = 'A'.repeat(10000);

            chatStore.addMessage('console', {
                channel: 'console',
                sender: 'TestUser',
                content: longContent,
                timestamp: new Date(),
                type: 'message'
            });

            const consoleTab = chatStore.tabs.get('console');
            expect(consoleTab?.messages[0].content).toBe(longContent);
        });

        it('should handle special characters in tab names and content', () => {
            const specialTabName = 'Channel with émojis 🎯 and símböls';
            const specialContent = 'Message with émojis 🎮 and special chars: <>&"\'';

            chatStore.createTab('special', specialTabName, 'channel');
            chatStore.addMessage('special', {
                channel: 'special',
                sender: 'TestUser',
                content: specialContent,
                timestamp: new Date(),
                type: 'message'
            });

            const specialTab = chatStore.tabs.get('special');
            expect(specialTab?.name).toBe(specialTabName);
            expect(specialTab?.messages[0].content).toBe(specialContent);
        });
    });
});
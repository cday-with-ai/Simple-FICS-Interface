import {makeAutoObservable, runInAction} from 'mobx';

// Forward declaration to avoid circular dependency
interface RootStore {
    // No dependencies needed for ChatStore currently
}

export interface ChatMessage {
    id: string;
    channel: string;
    sender: string;
    content: string;
    timestamp: Date | string | number;  // Allow flexibility for MobX serialization
    type: 'message' | 'system' | 'whisper' | 'announcement';
    metadata?: {
        consoleType?: 'notification' | 'channel' | 'directTell' | 'shout' | 'cshout' | 'matchRequest' | 'seek' | 
                       'finger' | 'who' | 'history' | 'journal' | 'sought' | 'games' | 'channelList' | 'news' | 'in';
        channelNumber?: string;
        parsedMessage?: any; // ParsedMessage from FicsProtocol
    };
}

export interface ChatTab {
    id: string;
    name: string;
    type: 'channel' | 'private' | 'console';
    unreadCount: number;
    messages: ChatMessage[];
    order: number;
}

export class ChatStore {
    tabs: Map<string, ChatTab> = new Map();
    activeTabId = 'console';
    inputHistory: string[] = [];
    historyIndex = -1;
    rootStore?: RootStore;

    constructor() {
        makeAutoObservable(this, {
            tabs: true,
            activeTabId: true,
            inputHistory: true,
            historyIndex: true
        });

        // Initialize with console tab
        this.tabs.set('console', {
            id: 'console',
            name: 'Console',
            type: 'console',
            unreadCount: 0,
            messages: [],
            order: 0
        });
    }

    addMessage(tabId: string, message: Omit<ChatMessage, 'id'>) {
        runInAction(() => {
            const tab = this.tabs.get(tabId);
            if (!tab) {
                this.createTab(tabId, message.channel, 'channel');
            }

            const targetTab = this.tabs.get(tabId)!;
            
            // Check for duplicate messages (common with FICS seeks)
            // Look at the last few messages, not just the last one
            const recentMessages = targetTab.messages.slice(-5); // Check last 5 messages
            for (const recentMsg of recentMessages) {
                // If the content is identical and timestamps are within 1 second, skip
                if (recentMsg.content === message.content && 
                    Math.abs(new Date(recentMsg.timestamp).getTime() - new Date(message.timestamp).getTime()) < 1000) {
                    return; // Skip duplicate
                }
            }

            const fullMessage: ChatMessage = {
                ...message,
                id: `${Date.now()}-${Math.random()}`
            };

            targetTab.messages.push(fullMessage);

            // Keep message history manageable
            if (targetTab.messages.length > 1000) {
                targetTab.messages = targetTab.messages.slice(-800);
            }

            if (tabId !== this.activeTabId) {
                targetTab.unreadCount++;
            }
        });
    }


    createTab(id: string, name: string, type: ChatTab['type']) {
        runInAction(() => {
            if (!this.tabs.has(id)) {
                // Find the highest order number
                const maxOrder = Math.max(...Array.from(this.tabs.values()).map(tab => tab.order));
                
                this.tabs.set(id, {
                    id,
                    name,
                    type,
                    unreadCount: 0,
                    messages: [],
                    order: maxOrder + 1
                });
            }
        });
    }

    setActiveTab(tabId: string) {
        runInAction(() => {
            if (this.tabs.has(tabId)) {
                this.activeTabId = tabId;
                const tab = this.tabs.get(tabId)!;
                tab.unreadCount = 0;
            }
        });
    }

    closeTab(tabId: string) {
        runInAction(() => {
            if (tabId !== 'console' && this.tabs.has(tabId)) {
                this.tabs.delete(tabId);
                if (this.activeTabId === tabId) {
                    this.activeTabId = 'console';
                }
            }
        });
    }

    addToHistory(command: string) {
        runInAction(() => {
            this.inputHistory.push(command);
            if (this.inputHistory.length > 100) {
                this.inputHistory = this.inputHistory.slice(-80);
            }
            this.historyIndex = this.inputHistory.length;
        });
    }

    navigateHistory(direction: 'up' | 'down'): string | null {
        let result: string | null = null;

        runInAction(() => {
            if (direction === 'up' && this.historyIndex > 0) {
                this.historyIndex--;
                result = this.inputHistory[this.historyIndex];
            } else if (direction === 'down' && this.historyIndex < this.inputHistory.length - 1) {
                this.historyIndex++;
                result = this.inputHistory[this.historyIndex];
            }
        });

        return result;
    }

    get activeTab() {
        return this.tabs.get(this.activeTabId);
    }

    get sortedTabs() {
        return Array.from(this.tabs.values()).sort((a, b) => a.order - b.order);
    }
    
    reorderTabs(fromId: string, toId: string) {
        runInAction(() => {
            const fromTab = this.tabs.get(fromId);
            const toTab = this.tabs.get(toId);
            
            if (!fromTab || !toTab || fromId === toId) return;
            
            const tabs = this.sortedTabs;
            const fromIndex = tabs.findIndex(t => t.id === fromId);
            const toIndex = tabs.findIndex(t => t.id === toId);
            
            // Remove the tab from its current position
            tabs.splice(fromIndex, 1);
            // Insert it at the new position
            tabs.splice(toIndex, 0, fromTab);
            
            // Update order values
            tabs.forEach((tab, index) => {
                tab.order = index;
            });
        });
    }
}
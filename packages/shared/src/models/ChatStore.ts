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
}

export interface ChatTab {
    id: string;
    name: string;
    type: 'channel' | 'private' | 'console';
    unreadCount: number;
    messages: ChatMessage[];
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
            messages: []
        });
    }

    addMessage(tabId: string, message: Omit<ChatMessage, 'id'>) {
        runInAction(() => {
            const tab = this.tabs.get(tabId);
            if (!tab) {
                this.createTab(tabId, message.channel, 'channel');
            }

            const fullMessage: ChatMessage = {
                ...message,
                id: `${Date.now()}-${Math.random()}`
            };

            const targetTab = this.tabs.get(tabId)!;
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

    appendToLastMessage(additionalContent: string) {
        runInAction(() => {
            // Find the most recent chat message across all tabs (within last 30 seconds)
            let lastChatMessage: ChatMessage | null = null;
            let lastChatTab: string | null = null;
            let lastTimestamp = 0;
            const thirtySecondsAgo = Date.now() - 30000;

            for (const [tabId, tab] of this.tabs.entries()) {
                if (tab.messages.length > 0) {
                    const lastMessage = tab.messages[tab.messages.length - 1];
                    const messageTime = new Date(lastMessage.timestamp).getTime();
                    
                    // Consider all chat messages (not system messages) for continuation
                    const isChatMessage = lastMessage.type === 'message' || 
                                        lastMessage.type === 'whisper' || 
                                        lastMessage.type === 'announcement';
                    
                    if (isChatMessage && messageTime > lastTimestamp && messageTime > thirtySecondsAgo) {
                        lastTimestamp = messageTime;
                        lastChatMessage = lastMessage;
                        lastChatTab = tabId;
                    }
                }
            }

            // Append to the last chat message if found and recent
            if (lastChatMessage && lastChatTab) {
                lastChatMessage.content += ' ' + additionalContent;
            }
        });
    }

    createTab(id: string, name: string, type: ChatTab['type']) {
        runInAction(() => {
            if (!this.tabs.has(id)) {
                this.tabs.set(id, {
                    id,
                    name,
                    type,
                    unreadCount: 0,
                    messages: []
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
        return Array.from(this.tabs.values()).sort((a, b) => {
            if (a.type === 'console') return -1;
            if (b.type === 'console') return 1;
            return a.name.localeCompare(b.name);
        });
    }
}
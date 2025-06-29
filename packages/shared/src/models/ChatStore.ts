import { makeAutoObservable } from 'mobx';

export interface ChatMessage {
  id: string;
  channel: string;
  sender: string;
  content: string;
  timestamp: Date;
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

  constructor() {
    makeAutoObservable(this);
    
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
    
    if (tabId !== this.activeTabId) {
      targetTab.unreadCount++;
    }
  }

  createTab(id: string, name: string, type: ChatTab['type']) {
    if (!this.tabs.has(id)) {
      this.tabs.set(id, {
        id,
        name,
        type,
        unreadCount: 0,
        messages: []
      });
    }
  }

  setActiveTab(tabId: string) {
    if (this.tabs.has(tabId)) {
      this.activeTabId = tabId;
      const tab = this.tabs.get(tabId)!;
      tab.unreadCount = 0;
    }
  }

  closeTab(tabId: string) {
    if (tabId !== 'console' && this.tabs.has(tabId)) {
      this.tabs.delete(tabId);
      if (this.activeTabId === tabId) {
        this.activeTabId = 'console';
      }
    }
  }

  addToHistory(command: string) {
    this.inputHistory.push(command);
    this.historyIndex = this.inputHistory.length;
  }

  navigateHistory(direction: 'up' | 'down'): string | null {
    if (direction === 'up' && this.historyIndex > 0) {
      this.historyIndex--;
      return this.inputHistory[this.historyIndex];
    } else if (direction === 'down' && this.historyIndex < this.inputHistory.length - 1) {
      this.historyIndex++;
      return this.inputHistory[this.historyIndex];
    }
    return null;
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
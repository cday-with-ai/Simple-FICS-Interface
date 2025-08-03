import { makeAutoObservable } from 'mobx';
import { BackendAPI, ChannelMessage, WhoRecord, ApiResponse } from '../services/BackendAPI';

export class BackendStore {
  api: BackendAPI;
  
  // Channel messages state
  channelMessages: Map<number, ChannelMessage[]> = new Map();
  channelMessagesLoading: Map<number, boolean> = new Map();
  channelMessagesError: Map<number, string | null> = new Map();
  
  // User history state
  userHistory: Map<string, WhoRecord[]> = new Map();
  userHistoryLoading: Map<string, boolean> = new Map();
  userHistoryError: Map<string, string | null> = new Map();
  
  // Who snapshot state
  latestWhoSnapshot: WhoRecord[] = [];
  whoSnapshotLoading = false;
  whoSnapshotError: string | null = null;
  
  // Logged-in users cache
  loggedInUsers: Set<string> = new Set();
  lastUsersRefresh: Date | null = null;
  
  // Backend health
  isBackendHealthy = false;
  lastHealthCheck: Date | null = null;

  constructor() {
    makeAutoObservable(this);
    this.api = new BackendAPI();
    
    // Check backend health on initialization
    this.checkBackendHealth();
    
    // Load logged-in users on initialization
    this.refreshLoggedInUsers();
    
    // Periodically check backend health
    setInterval(() => this.checkBackendHealth(), 30000); // Every 30 seconds
    
    // Periodically refresh logged-in users
    setInterval(() => this.refreshLoggedInUsers(), 60000); // Every 60 seconds
  }

  async checkBackendHealth() {
    try {
      const health = await this.api.checkHealth();
      this.isBackendHealthy = health.status === 'ok';
      this.lastHealthCheck = new Date();
    } catch (error) {
      this.isBackendHealthy = false;
      console.error('Backend health check failed:', error);
    }
  }

  async loadChannelMessages(channel: number, limit = 100, offset = 0) {
    this.channelMessagesLoading.set(channel, true);
    this.channelMessagesError.set(channel, null);
    
    try {
      const response = await this.api.getChannelMessages(channel, limit, offset);
      const messages = response.messages || [];
      
      if (offset === 0) {
        this.channelMessages.set(channel, messages);
      } else {
        const existing = this.channelMessages.get(channel) || [];
        this.channelMessages.set(channel, [...existing, ...messages]);
      }
    } catch (error) {
      this.channelMessagesError.set(channel, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.channelMessagesLoading.set(channel, false);
    }
  }

  async loadUserHistory(username: string, limit = 100, offset = 0) {
    this.userHistoryLoading.set(username, true);
    this.userHistoryError.set(username, null);
    
    try {
      const response = await this.api.getUserHistory(username, limit, offset);
      const records = response.records || [];
      
      if (offset === 0) {
        this.userHistory.set(username, records);
      } else {
        const existing = this.userHistory.get(username) || [];
        this.userHistory.set(username, [...existing, ...records]);
      }
    } catch (error) {
      this.userHistoryError.set(username, error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.userHistoryLoading.set(username, false);
    }
  }

  async loadLatestWhoSnapshot() {
    this.whoSnapshotLoading = true;
    this.whoSnapshotError = null;
    
    try {
      const response = await this.api.getLatestWhoSnapshot();
      this.latestWhoSnapshot = response.users || [];
    } catch (error) {
      this.whoSnapshotError = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      this.whoSnapshotLoading = false;
    }
  }

  async refreshLoggedInUsers() {
    // For testing, hardcode the users from "Present company includes"
    const hardcodedUsers = ['Crown', 'Introspection', 'krell', 'PawnPawn', 'skumbumuk'];
    
    // Clear and repopulate the Set with lowercase usernames for case-insensitive matching
    this.loggedInUsers.clear();
    hardcodedUsers.forEach(username => {
      this.loggedInUsers.add(username.toLowerCase());
    });
    
    this.lastUsersRefresh = new Date();
    console.log(`Refreshed logged-in users: ${this.loggedInUsers.size} users (hardcoded for testing)`);
    
    // Also try the API in case backend is working
    if (!this.isBackendHealthy) return;
    
    try {
      const response = await this.api.getLatestWhoSnapshot();
      const users = response.users || [];
      
      if (users.length > 0) {
        // If we got real data, use it instead
        this.loggedInUsers.clear();
        users.forEach(user => {
          // Extract username without title (e.g., "PlayerName(GM)" -> "PlayerName")
          const username = user.username.replace(/\([^)]*\)/g, '').trim().toLowerCase();
          this.loggedInUsers.add(username);
        });
        
        console.log(`Refreshed logged-in users: ${this.loggedInUsers.size} users from backend`);
      }
    } catch (error) {
      console.error('Failed to refresh logged-in users from backend:', error);
    }
  }

  isUserLoggedIn(username: string): boolean {
    // Case-insensitive check
    return this.loggedInUsers.has(username.toLowerCase());
  }

  getChannelMessages(channel: number): ChannelMessage[] {
    return this.channelMessages.get(channel) || [];
  }

  getUserHistory(username: string): WhoRecord[] {
    return this.userHistory.get(username) || [];
  }

  isChannelLoading(channel: number): boolean {
    return this.channelMessagesLoading.get(channel) || false;
  }

  isUserLoading(username: string): boolean {
    return this.userHistoryLoading.get(username) || false;
  }

  getChannelError(channel: number): string | null {
    return this.channelMessagesError.get(channel) || null;
  }

  getUserError(username: string): string | null {
    return this.userHistoryError.get(username) || null;
  }

  clearChannelMessages(channel: number) {
    this.channelMessages.delete(channel);
    this.channelMessagesLoading.delete(channel);
    this.channelMessagesError.delete(channel);
  }

  clearUserHistory(username: string) {
    this.userHistory.delete(username);
    this.userHistoryLoading.delete(username);
    this.userHistoryError.delete(username);
  }
}
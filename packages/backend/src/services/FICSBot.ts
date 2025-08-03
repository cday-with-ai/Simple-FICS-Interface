import { RootStore } from '@fics/shared/src/models/RootStore';
import { Database, WhoRecord } from '../models/database';
import winston from 'winston';
import { reaction } from 'mobx';

export class FICSBot {
  private rootStore: RootStore;
  private database: Database;
  private logger: winston.Logger;
  private channels: number[] = [39, 49, 50, 10, 1, 2, 36, 37, 38, 40];
  private isConnected: boolean = false;
  private disposers: Array<() => void> = [];
  private processedMessages = new Set<string>();

  constructor(database: Database, logger: winston.Logger) {
    this.database = database;
    this.logger = logger;
    this.rootStore = new RootStore();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // Monitor connection status
    const connectionDisposer = reaction(
      () => this.rootStore.ficsStore.connected,
      (connected) => {
        if (connected && !this.isConnected) {
          this.onConnected();
        } else if (!connected && this.isConnected) {
          this.isConnected = false;
          this.logger.warn('🔴 Disconnected from FICS');
        }
      }
    );
    this.disposers.push(connectionDisposer);

    // Monitor chat messages
    const chatDisposer = reaction(
      () => {
        const messages: any[] = [];
        this.rootStore.chatStore.tabs.forEach((tab) => {
          messages.push(...tab.messages);
        });
        return messages.length;
      },
      () => {
        this.checkForNewMessages();
      }
    );
    this.disposers.push(chatDisposer);
  }

  private checkForNewMessages(): void {
    this.rootStore.chatStore.tabs.forEach((tab, tabId) => {
      if (tabId.startsWith('channel-')) {
        const channelNumber = parseInt(tabId.replace('channel-', ''));
        if (this.channels.includes(channelNumber)) {
          // Get latest messages
          const messages = tab.messages.slice(-10); // Check last 10 messages
          messages.forEach(async (msg) => {
            // Create unique message ID
            const messageId = `${msg.timestamp}-${msg.content}`;
            
            // Check if this is a channel message we haven't processed
            if (msg.metadata?.parsedMessage?.metadata?.username && 
                msg.metadata?.parsedMessage?.metadata?.message &&
                !this.processedMessages.has(messageId)) {
              const parsed = msg.metadata.parsedMessage.metadata;
              await this.saveChannelMessage(
                channelNumber,
                parsed.username,
                parsed.message,
                msg.content
              );
              // Mark as processed
              this.processedMessages.add(messageId);
              
              // Clean up old processed messages to prevent memory leak
              if (this.processedMessages.size > 1000) {
                const messagesToKeep = Array.from(this.processedMessages).slice(-500);
                this.processedMessages = new Set(messagesToKeep);
              }
            }
          });
        }
      }
    });
  }

  private async saveChannelMessage(
    channel: number,
    username: string,
    message: string,
    rawMessage: string
  ): Promise<void> {
    try {
      await this.database.saveChannelMessage({
        channel,
        username,
        message,
        timestamp: new Date(),
        raw_message: rawMessage
      });
      this.logger.info(`[CH ${channel}] ${username}: ${message}`);
    } catch (error) {
      this.logger.error('Failed to save channel message:', error);
    }
  }

  private onConnected(): void {
    this.isConnected = true;
    this.logger.info('🟢 FICS Bot connected successfully');

    // Join all channels
    this.logger.info(`📢 Joining ${this.channels.length} channels...`);
    this.channels.forEach(channel => {
      this.rootStore.ficsStore.sendCommand(`+channel ${channel}`);
      this.logger.info(`  ✓ Joined channel ${channel}`);
    });

    // Monitor console for user notifications
    this.monitorUserNotifications();
  }

  private monitorUserNotifications(): void {
    // Monitor console messages for user arrivals/departures
    const consoleTab = this.rootStore.chatStore.tabs.get('console');
    if (!consoleTab) {
      this.logger.warn('No console tab found for monitoring users');
      return;
    }

    // React to new console messages
    const disposer = reaction(
      () => consoleTab.messages.length,
      () => {
        const latestMessages = consoleTab.messages.slice(-10);
        
        latestMessages.forEach(msg => {
          const content = msg.content;
          
          // Parse "Present company includes: user1 user2 user3."
          const presentMatch = content.match(/Present company includes:\s+(.+)\.$/);
          if (presentMatch) {
            const userList = presentMatch[1].split(/\s+/);
            this.logger.info(`📋 Found ${userList.length} users online: ${userList.join(', ')}`);
            this.saveOnlineUsers(userList);
          }
          
          // Parse "PlayerName has arrived."
          const arrivalMatch = content.match(/^(\w+) has arrived\.$/);
          if (arrivalMatch) {
            const username = arrivalMatch[1];
            this.logger.info(`➕ User arrived: ${username}`);
            this.saveOnlineUsers([username]);
          }
          
          // Parse "PlayerName has departed."
          const departureMatch = content.match(/^(\w+) has departed\.$/);
          if (departureMatch) {
            const username = departureMatch[1];
            this.logger.info(`➖ User departed: ${username}`);
            // Still save as a who record for history
            this.saveOnlineUsers([username]);
          }
        });
      }
    );
    
    this.disposers.push(disposer);
  }
  
  private async saveOnlineUsers(usernames: string[]): Promise<void> {
    const timestamp = new Date();
    
    for (const username of usernames) {
      try {
        await this.database.saveWhoRecord({
          username,
          rating: '',
          status: 'online',
          timestamp,
          raw_data: `${username} online at ${timestamp.toISOString()}`
        });
      } catch (error) {
        this.logger.error(`Failed to save who record for ${username}:`, error);
      }
    }
  }


  async connect(): Promise<void> {
    this.logger.info('🔌 Connecting to FICS as guest bot...');
    this.rootStore.ficsStore.connect();
  }

  async disconnect(): Promise<void> {
    if (this.whoInterval) {
      clearInterval(this.whoInterval);
      this.whoInterval = null;
    }
    
    // Dispose of all reactions
    this.disposers.forEach(dispose => dispose());
    this.disposers = [];
    
    if (this.isConnected) {
      this.rootStore.ficsStore.disconnect();
      this.isConnected = false;
    }
  }
}
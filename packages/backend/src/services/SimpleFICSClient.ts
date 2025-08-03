import WebSocket from 'ws';
import { Database, WhoRecord } from '../models/database';
import winston from 'winston';

interface ChannelMessage {
  channel: number;
  username: string;
  message: string;
  raw: string;
}

export class SimpleFICSClient {
  private ws: WebSocket | null = null;
  private database: Database;
  private logger: winston.Logger;
  private channels: number[] = [39, 49, 50, 10, 1, 2, 36, 37, 38, 40];
  private whoInterval: NodeJS.Timeout | null = null;
  private isConnected: boolean = false;
  private messageBuffer: string = '';
  private processedMessages = new Set<string>();
  private isCollectingWho = false;
  private whoData: string[] = [];

  constructor(database: Database, logger: winston.Logger) {
    this.database = database;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.logger.info('🔌 Connecting to FICS...');
    
    this.ws = new WebSocket('wss://www.freechess.org:5001');
    
    this.ws.on('open', () => {
      this.logger.info('🟢 WebSocket connected');
      this.isConnected = true;
      // FICS expects guest login
      this.send('guest');
    });

    this.ws.on('message', (data: Buffer) => {
      const text = data.toString();
      this.handleMessage(text);
    });

    this.ws.on('error', (error) => {
      this.logger.error('WebSocket error:', error);
    });

    this.ws.on('close', () => {
      this.logger.warn('🔴 WebSocket closed');
      this.isConnected = false;
      this.reconnect();
    });
  }

  private send(command: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(command + '\n');
    }
  }

  private handleMessage(data: string): void {
    this.messageBuffer += data;
    const lines = this.messageBuffer.split('\n');
    
    // Keep the last incomplete line in the buffer
    this.messageBuffer = lines.pop() || '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Log all messages for debugging
      if (trimmed.length > 0 && !trimmed.includes('fics%')) {
        this.logger.debug(`FICS: ${trimmed}`);
      }

      // Handle login success
      if (trimmed.includes('Press return to enter the server as')) {
        this.send('');
        this.onLoggedIn();
      }

      // Parse channel messages
      this.parseChannelMessage(trimmed);

      // Handle who data
      this.handleWhoData(trimmed);
    }
  }

  private onLoggedIn(): void {
    this.logger.info('✅ Logged in as guest');
    
    // Join channels
    this.logger.info(`📢 Joining ${this.channels.length} channels...`);
    this.channels.forEach(channel => {
      this.send(`+channel ${channel}`);
      this.logger.info(`  ✓ Joined channel ${channel}`);
    });

    // Start who polling
    this.startWhoPolling();
  }

  private parseChannelMessage(line: string): void {
    // Match channel tell format: username(channel): message
    const channelMatch = line.match(/^(\w+)\((\d+)\):\s+(.*)$/);
    if (channelMatch) {
      const [, username, channelStr, message] = channelMatch;
      const channel = parseInt(channelStr);
      
      if (this.channels.includes(channel)) {
        const messageId = `${Date.now()}-${line}`;
        if (!this.processedMessages.has(messageId)) {
          this.saveChannelMessage({
            channel,
            username,
            message,
            raw: line
          });
          this.processedMessages.add(messageId);
          
          // Cleanup old messages
          if (this.processedMessages.size > 1000) {
            const toKeep = Array.from(this.processedMessages).slice(-500);
            this.processedMessages = new Set(toKeep);
          }
        }
      }
    }
  }

  private async saveChannelMessage(msg: ChannelMessage): Promise<void> {
    try {
      await this.database.saveChannelMessage({
        channel: msg.channel,
        username: msg.username,
        message: msg.message,
        timestamp: new Date(),
        raw_message: msg.raw
      });
      this.logger.info(`[CH ${msg.channel}] ${msg.username}: ${msg.message}`);
    } catch (error) {
      this.logger.error('Failed to save channel message:', error);
    }
  }

  private startWhoPolling(): void {
    // Run immediately
    this.runWhoCommand();

    // Then every 5 minutes
    this.whoInterval = setInterval(() => {
      this.runWhoCommand();
    }, 5 * 60 * 1000);
  }

  private runWhoCommand(): void {
    if (!this.isConnected) return;
    
    this.logger.info('👥 Running who command...');
    this.isCollectingWho = false;
    this.whoData = [];
    this.send('who');
  }

  private handleWhoData(line: string): void {
    if (line.includes('------ who ------')) {
      this.isCollectingWho = true;
      this.whoData = [];
      return;
    }

    if (this.isCollectingWho) {
      if (line.match(/^\d+ players? displayed/)) {
        this.isCollectingWho = false;
        this.processWhoData();
      } else if (line.trim()) {
        this.whoData.push(line);
      }
    }
  }

  private async processWhoData(): Promise<void> {
    const timestamp = new Date();
    const records: WhoRecord[] = [];

    for (const line of this.whoData) {
      // Parse various who line formats
      // Standard: username(rating) status
      // Guest: GuestABCD status
      const match = line.match(/^(\w+)(?:\(([^)]+)\))?\s+(.*)$/);
      if (match) {
        const [, username, rating, status] = match;
        records.push({
          username,
          rating: rating || '',
          status: status.trim(),
          timestamp,
          raw_data: line
        });
      }
    }

    // Save all records
    for (const record of records) {
      try {
        await this.database.saveWhoRecord(record);
      } catch (error) {
        this.logger.error('Failed to save who record:', error);
      }
    }

    this.logger.info(`✓ Saved ${records.length} who records`);
  }

  private reconnect(): void {
    if (this.whoInterval) {
      clearInterval(this.whoInterval);
      this.whoInterval = null;
    }

    this.logger.info('🔄 Reconnecting in 5 seconds...');
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  async disconnect(): Promise<void> {
    if (this.whoInterval) {
      clearInterval(this.whoInterval);
      this.whoInterval = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.isConnected = false;
  }
}
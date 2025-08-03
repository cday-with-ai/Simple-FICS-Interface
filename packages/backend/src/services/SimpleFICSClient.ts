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
    
    // Debug logging
    this.logger.debug(`Raw data received (${data.length} chars): ${JSON.stringify(data.substring(0, 100))}`);
    this.logger.debug(`Buffer size: ${this.messageBuffer.length}, Contains fics%: ${this.messageBuffer.includes('fics%')}`);
    
    // Check for login prompt immediately (before waiting for fics%)
    if (this.messageBuffer.includes('Press return to enter the server as')) {
      this.logger.info('Found login prompt, sending empty line');
      this.send('');
      this.onLoggedIn();
    }
    
    // Split messages by FICS prompt (like the client does)
    const messages: string[] = [];
    let lastPromptIndex = this.messageBuffer.indexOf('fics%');
    
    while (lastPromptIndex !== -1) {
      const message = this.messageBuffer.substring(0, lastPromptIndex);
      messages.push(message);
      this.messageBuffer = this.messageBuffer.substring(lastPromptIndex + 5); // Skip 'fics%'
      lastPromptIndex = this.messageBuffer.indexOf('fics%');
    }
    
    this.logger.debug(`Found ${messages.length} complete messages`);
    
    // Process each complete message (which may contain multiple lines)
    for (const message of messages) {
      if (message.trim() === '') continue;
      
      // Log the full message for debugging
      this.logger.info(`Processing FICS Message: ${JSON.stringify(message.substring(0, 200))}`);
      
      // Parse channel messages from the full message
      this.parseChannelMessage(message);
      
      // Handle who data
      this.handleWhoData(message);
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

  private parseChannelMessage(message: string): void {
    // Split the message into lines
    const lines = message.split('\n');
    
    // Look for channel messages in the format: username(channel): message
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const channelMatch = line.match(/^\s*(\w+(?:\([^)]*\))*)\((\d+)\):\s(.*)$/);
      
      if (channelMatch) {
        this.logger.info(`Found channel message: ${line.substring(0, 100)}`);
        const [, username, channelStr, firstLine] = channelMatch;
        const channel = parseInt(channelStr);
        
        if (this.channels.includes(channel)) {
          let fullMessage = firstLine;
          let rawMessage = line;
          
          // Check for multi-line messages
          let j = i + 1;
          let continuationFound = false;
          
          // Look for a "(told X players in channel Y)" line that ends multi-line messages
          let toldLineIndex = -1;
          for (let k = j; k < lines.length; k++) {
            if (lines[k].match(/^\(told \d+ players? in channel \d+/)) {
              toldLineIndex = k;
              break;
            }
          }
          
          if (toldLineIndex > i + 1) {
            // Collect all lines between the channel tell and the "told" line
            const messageLines = [fullMessage];
            for (let k = i + 1; k < toldLineIndex; k++) {
              const continuationLine = lines[k];
              rawMessage += '\n' + continuationLine;
              
              // Handle continuation lines that start with \
              if (continuationLine.match(/^\s*\\/)) {
                const continuationText = continuationLine.replace(/^\s*\\/, '').trim();
                if (continuationText && messageLines.length > 0) {
                  messageLines[messageLines.length - 1] += ' ' + continuationText;
                }
              } else {
                messageLines.push(continuationLine);
              }
            }
            fullMessage = messageLines.join('\n');
            i = toldLineIndex; // Skip past the processed lines
          } else {
            // Handle simple continuation lines (starting with \)
            while (j < lines.length && lines[j].match(/^\s*\\/)) {
              continuationFound = true;
              const continuationLine = lines[j];
              rawMessage += '\n' + continuationLine;
              
              const continuationText = continuationLine.replace(/^\s*\\/, '').trim();
              if (continuationText) {
                fullMessage += ' ' + continuationText;
              }
              j++;
            }
            
            if (continuationFound) {
              i = j - 1; // Skip past the continuation lines
            }
          }
          
          const messageId = `${Date.now()}-${channel}-${username}-${fullMessage.substring(0, 50)}`;
          if (!this.processedMessages.has(messageId)) {
            this.saveChannelMessage({
              channel,
              username: username.replace(/\([^)]*\)/g, ''), // Strip titles
              message: fullMessage,
              raw: rawMessage
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
  }

  private async saveChannelMessage(msg: ChannelMessage): Promise<void> {
    try {
      await this.database.saveChannelMessage({
        channel: msg.channel,
        username: msg.username,
        message: msg.message,
        timestamp: Date.now(), // Use UTC milliseconds instead of Date object
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

  private handleWhoData(message: string): void {
    // Check if this message contains who data
    if (!message.includes('------ who ------')) {
      return;
    }
    
    // Extract who data from the message
    const lines = message.split('\n');
    const whoStartIndex = lines.findIndex(line => line.includes('------ who ------'));
    const whoEndIndex = lines.findIndex((line, idx) => idx > whoStartIndex && line.match(/^\d+ players? displayed/));
    
    if (whoStartIndex !== -1 && whoEndIndex !== -1) {
      // Extract the who data lines
      this.whoData = [];
      for (let i = whoStartIndex + 1; i < whoEndIndex; i++) {
        const line = lines[i].trim();
        if (line) {
          this.whoData.push(line);
        }
      }
      
      // Process the collected who data
      this.processWhoData();
    }
  }

  private async processWhoData(): Promise<void> {
    const timestamp = Date.now(); // Use UTC milliseconds
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
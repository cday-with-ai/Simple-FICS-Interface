import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

export interface ChannelMessage {
  id?: number;
  channel: number;
  username: string;
  message: string;
  timestamp: Date;
  raw_message: string;
}

export interface WhoRecord {
  id?: number;
  username: string;
  rating: string;
  status: string;
  timestamp: Date;
  raw_data: string;
}

export class Database {
  private db: sqlite3.Database;
  private run: (sql: string, params?: any[]) => Promise<void>;
  private get: (sql: string, params?: any[]) => Promise<any>;
  private all: (sql: string, params?: any[]) => Promise<any[]>;

  constructor(dbPath?: string) {
    const defaultPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'fics-backend.db');
    const finalPath = dbPath || defaultPath;
    
    // Ensure directory exists
    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new sqlite3.Database(finalPath);
    this.run = promisify(this.db.run.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
  }

  async initialize(): Promise<void> {
    // Create channel_messages table
    await this.run(`
      CREATE TABLE IF NOT EXISTS channel_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        channel INTEGER NOT NULL,
        username TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        raw_message TEXT NOT NULL
      )
    `);

    // Create who_records table
    await this.run(`
      CREATE TABLE IF NOT EXISTS who_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        rating TEXT,
        status TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        raw_data TEXT NOT NULL
      )
    `);

    // Create indexes for better query performance
    await this.run(`
      CREATE INDEX IF NOT EXISTS idx_channel_messages_channel 
      ON channel_messages(channel)
    `);

    await this.run(`
      CREATE INDEX IF NOT EXISTS idx_channel_messages_username 
      ON channel_messages(username)
    `);

    await this.run(`
      CREATE INDEX IF NOT EXISTS idx_channel_messages_timestamp 
      ON channel_messages(timestamp)
    `);

    await this.run(`
      CREATE INDEX IF NOT EXISTS idx_who_records_username 
      ON who_records(username)
    `);

    await this.run(`
      CREATE INDEX IF NOT EXISTS idx_who_records_timestamp 
      ON who_records(timestamp)
    `);
  }

  async saveChannelMessage(message: ChannelMessage): Promise<void> {
    await this.run(
      `INSERT INTO channel_messages (channel, username, message, timestamp, raw_message) 
       VALUES (?, ?, ?, ?, ?)`,
      [message.channel, message.username, message.message, message.timestamp, message.raw_message]
    );
  }

  async saveWhoRecord(record: WhoRecord): Promise<void> {
    await this.run(
      `INSERT INTO who_records (username, rating, status, timestamp, raw_data) 
       VALUES (?, ?, ?, ?, ?)`,
      [record.username, record.rating, record.status, record.timestamp, record.raw_data]
    );
  }

  async getChannelMessages(
    channel?: number,
    limit: number = 100,
    offset: number = 0
  ): Promise<ChannelMessage[]> {
    let query = 'SELECT * FROM channel_messages';
    const params: any[] = [];

    if (channel !== undefined) {
      query += ' WHERE channel = ?';
      params.push(channel);
    }

    query += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    return await this.all(query, params);
  }

  async getWhoRecords(
    username?: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<WhoRecord[]> {
    let query = 'SELECT * FROM who_records';
    const params: any[] = [];

    if (username) {
      query += ' WHERE username = ?';
      params.push(username);
    }

    query += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    return await this.all(query, params);
  }

  async getLatestWhoSnapshot(): Promise<WhoRecord[]> {
    const latestTimestamp = await this.get(
      'SELECT MAX(timestamp) as latest FROM who_records'
    );

    if (!latestTimestamp?.latest) {
      return [];
    }

    return await this.all(
      'SELECT * FROM who_records WHERE timestamp = ?',
      [latestTimestamp.latest]
    );
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
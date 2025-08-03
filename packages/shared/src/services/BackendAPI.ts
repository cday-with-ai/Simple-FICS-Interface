export interface ChannelMessage {
  id: number;
  channel: number;
  username: string;
  message: string;
  timestamp: string;
}

export interface WhoRecord {
  id: number;
  username: string;
  rating: string;
  title: string | null;
  status: string;
  flags: string;
  rating_type: string;
  time_control: string | null;
  opponent: string | null;
  game_info: string | null;
  timestamp: string;
}

export interface ApiResponse<T> {
  count: number;
  limit?: number;
  offset?: number;
  channel?: number;
  username?: string;
  timestamp?: string | null;
  messages?: T[];
  records?: T[];
  users?: T[];
  channels?: number[];
  status?: string;
}

export class BackendAPI {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3011/api') {
    this.baseUrl = baseUrl;
  }

  private async fetchJSON<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getChannelMessages(channel: number, limit = 100, offset = 0): Promise<ApiResponse<ChannelMessage>> {
    const url = `${this.baseUrl}/channels/${channel}/messages?limit=${limit}&offset=${offset}`;
    return this.fetchJSON<ApiResponse<ChannelMessage>>(url);
  }

  async getAllMessages(limit = 100, offset = 0): Promise<ApiResponse<ChannelMessage>> {
    const url = `${this.baseUrl}/messages?limit=${limit}&offset=${offset}`;
    return this.fetchJSON<ApiResponse<ChannelMessage>>(url);
  }

  async getUserHistory(username: string, limit = 100, offset = 0): Promise<ApiResponse<WhoRecord>> {
    const url = `${this.baseUrl}/users/${encodeURIComponent(username)}/history?limit=${limit}&offset=${offset}`;
    return this.fetchJSON<ApiResponse<WhoRecord>>(url);
  }

  async getLatestWhoSnapshot(): Promise<ApiResponse<WhoRecord>> {
    const url = `${this.baseUrl}/who/latest`;
    return this.fetchJSON<ApiResponse<WhoRecord>>(url);
  }

  async getAllWhoRecords(limit = 100, offset = 0): Promise<ApiResponse<WhoRecord>> {
    const url = `${this.baseUrl}/who?limit=${limit}&offset=${offset}`;
    return this.fetchJSON<ApiResponse<WhoRecord>>(url);
  }

  async getMonitoredChannels(): Promise<ApiResponse<never>> {
    const url = `${this.baseUrl}/channels`;
    return this.fetchJSON<ApiResponse<never>>(url);
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const url = `${this.baseUrl}/health`;
    return this.fetchJSON<{ status: string; timestamp: string }>(url);
  }
}
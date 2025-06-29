import { makeAutoObservable, runInAction } from 'mobx';

export interface FICSUser {
  handle: string;
  rating: Record<string, number>;
  isGuest: boolean;
}

export class FICSStore {
  connected = false;
  connecting = false;
  user: FICSUser | null = null;
  seekList: any[] = [];
  gameList: any[] = [];
  error: string | null = null;

  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  connect(credentials?: { username: string; password: string }) {
    this.connecting = true;
    this.error = null;

    try {
      this.ws = new WebSocket('wss://www.freechess.org:5001');
      
      this.ws.onopen = () => {
        runInAction(() => {
          this.connected = true;
          this.connecting = false;
        });
        
        if (credentials) {
          this.login(credentials.username, credentials.password);
        } else {
          this.loginAsGuest();
        }
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onclose = () => {
        runInAction(() => {
          this.connected = false;
          this.connecting = false;
        });
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        runInAction(() => {
          this.error = 'Connection error';
          this.connecting = false;
        });
      };
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to connect';
        this.connecting = false;
      });
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.connected = false;
    this.user = null;
  }

  sendCommand(command: string) {
    if (this.ws && this.connected) {
      this.ws.send(command + '\\n');
    }
  }

  private login(username: string, password: string) {
    this.sendCommand(username);
    this.sendCommand(password);
  }

  private loginAsGuest() {
    this.sendCommand('guest');
  }

  private handleMessage(data: string) {
    // Message parsing logic will be migrated from existing code
    console.log('FICS message:', data);
  }

  private scheduleReconnect() {
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, 5000);
  }
}
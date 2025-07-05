import {makeAutoObservable, runInAction} from 'mobx';
import {FicsProtocol} from '../services/FicsProtocol';
import {GameStart} from '../services/FicsProtocol.types';

// Forward declaration to avoid circular dependency
interface RootStore {
    gameStore: any;
    chatStore: any;
}

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
    lastPing = 0;
    rootStore?: RootStore;

    private ws: WebSocket | null = null;
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private pingInterval: NodeJS.Timeout | null = null;

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

        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        runInAction(() => {
            this.connected = false;
            this.user = null;
        });
    }

    sendCommand(command: string) {
        if (this.ws && this.connected) {
            this.ws.send(command + '\n');

            // Add to chat history if it's a chat command
            if (command.startsWith('tell ') || command.startsWith('say ') || command.startsWith('shout ')) {
                this.rootStore?.chatStore.addToHistory(command);
            }
        } else {
            console.warn('Cannot send command: not connected to FICS');
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
        runInAction(() => {
            this.lastPing = Date.now();
        });

        // Parse FICS protocol messages using the protocol parser
        const messages = FicsProtocol.parseMessage(data);

        for (const message of messages) {
            try {
                switch (message.type) {
                    case 'sessionStart':
                        this.handleLogin();
                        this.user = {
                            handle: message.data.username,
                            rating: {},
                            isGuest: message.data.username.startsWith('Guest')
                        };
                        break;

                    case 'style12':
                        this.rootStore?.gameStore.updateFromStyle12(message.data);
                        break;

                    case 'gameStart':
                        this.handleGameStart(message.data);
                        break;

                    case 'channelTell':
                        // Create channel tab if it doesn't exist
                        const channelId = `channel-${message.data.channelNumber}`;
                        this.rootStore?.chatStore.createTab(
                            channelId,
                            message.data.channelNumber,
                            'channel'
                        );
                        
                        // Add message to channel
                        this.rootStore?.chatStore.addMessage(channelId, {
                            channel: channelId,
                            sender: message.data.username,
                            content: message.data.message,
                            timestamp: new Date(),
                            type: 'message'
                        });
                        break;

                    case 'directTell':
                        // Create private tab if it doesn't exist
                        const privateTabId = message.data.username.toLowerCase();
                        this.rootStore?.chatStore.createTab(
                            privateTabId,
                            message.data.username,
                            'private'
                        );
                        
                        // Add message to private chat
                        this.rootStore?.chatStore.addMessage(privateTabId, {
                            channel: privateTabId,
                            sender: message.data.username,
                            content: message.data.message,
                            timestamp: new Date(),
                            type: 'whisper'
                        });
                        break;

                    case 'gameEnd':
                        // TODO: Handle game end
                        break;

                    case 'illegalMove':
                        // Show error in console
                        this.rootStore?.chatStore.addMessage('console', {
                            channel: 'console',
                            sender: 'FICS',
                            content: `Illegal move: ${message.data.move}`,
                            timestamp: new Date(),
                            type: 'system'
                        });
                        break;

                    case 'raw':
                    default:
                        // Route raw messages to console
                        if (message.type === 'raw' && message.data && message.data.trim()) {
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data,
                                timestamp: new Date(),
                                type: 'system'
                            });
                        }
                        break;
                }
            } catch (error) {
                console.error('Error handling FICS message:', error, message);
            }
        }
    }

    private scheduleReconnect() {
        this.reconnectTimeout = setTimeout(() => {
            this.connect();
        }, 5000);
    }

    private handleLogin() {
        runInAction(() => {
            // Initialize ping mechanism
            this.pingInterval = setInterval(() => {
                this.sendCommand('date');
            }, 30000);
        });
    }

    private handleStyle12(line: string) {
        // Extract Style12 data and update game store
        const style12Match = line.match(/Style 12: (.+)/);
        if (style12Match) {
            this.rootStore?.gameStore.updateFromStyle12(style12Match[1]);
        }
    }

    private handleGameStart(gameStart: GameStart) {
        const gameState = {
            gameId: gameStart.gameNumber,
            white: {
                name: gameStart.whiteName,
                rating: parseInt(gameStart.whiteRating) || 0,
                time: gameStart.minutes * 60
            },
            black: {
                name: gameStart.blackName,
                rating: parseInt(gameStart.blackRating) || 0,
                time: gameStart.minutes * 60
            },
            turn: 'w' as const,
            moveNumber: 1,
            variant: this.mapGameTypeToVariant(gameStart.gameType),
            timeControl: `${gameStart.minutes} ${gameStart.increment}`
        };

        this.rootStore?.gameStore.startNewGame(gameState);
    }

    private mapGameTypeToVariant(gameType: string): 'standard' | 'chess960' | 'losers' | 'suicide' | 'atomic' | 'crazyhouse' | 'wild' {
        // Map FICS game types to our variant types
        const typeMap: Record<string, any> = {
            'standard': 'standard',
            'blitz': 'standard',
            'lightning': 'standard',
            'untimed': 'standard',
            'chess960': 'chess960',
            'fischerandom': 'chess960',
            'losers': 'losers',
            'suicide': 'suicide',
            'atomic': 'atomic',
            'crazyhouse': 'crazyhouse',
            'wild': 'wild'
        };

        const normalized = gameType.toLowerCase();
        return typeMap[normalized] || 'standard';
    }

    get username(): string | null {
        return this.user?.handle || null;
    }

    private handleSeekOrGame(line: string) {
        // Simple parsing - could be enhanced
        runInAction(() => {
            if (line.includes('seeking')) {
                // Add to seek list
                this.seekList = [...this.seekList.slice(-19), {id: Date.now(), data: line}];
            } else if (line.match(/^\d+\s+\d+/)) {
                // Might be a game list entry
                this.gameList = [...this.gameList.slice(-19), {id: Date.now(), data: line}];
            }
        });
    }
}
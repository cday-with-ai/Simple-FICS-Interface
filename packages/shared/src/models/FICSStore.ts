import {makeAutoObservable, runInAction} from 'mobx';

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

        // Parse FICS protocol messages
        const lines = data.split('\n');

        for (const line of lines) {
            if (!line.trim()) continue;

            try {
                // Handle different message types
                if (line.includes('Starting FICS session')) {
                    this.handleLogin();
                } else if (line.includes('Style 12:')) {
                    this.handleStyle12(line);
                } else if (line.includes('Creating:')) {
                    this.handleGameStart(line);
                } else if (line.match(/^\d+\s+\w+/)) {
                    // Possible seek or game list entry
                    this.handleSeekOrGame(line);
                } else {
                    // Route to chat for display
                    this.rootStore?.chatStore.addMessage('console', {
                        channel: 'console',
                        sender: 'FICS',
                        content: line,
                        timestamp: new Date(),
                        type: 'system'
                    });
                }
            } catch (error) {
                console.error('Error parsing FICS message:', error, line);
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

    private handleGameStart(line: string) {
        // Parse game creation message
        const gameMatch = line.match(/Creating: (\w+) \((\d+)\) (\w+) \((\d+)\)/);
        if (gameMatch) {
            const [, whiteName, whiteRating, blackName, blackRating] = gameMatch;

            const gameState = {
                gameId: Date.now(), // Temporary ID until we get the real one
                white: {name: whiteName, rating: parseInt(whiteRating), time: 0},
                black: {name: blackName, rating: parseInt(blackRating), time: 0},
                turn: 'w' as const,
                moveNumber: 1,
                variant: 'standard' as const
            };

            this.rootStore?.gameStore.startNewGame(gameState);
        }
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
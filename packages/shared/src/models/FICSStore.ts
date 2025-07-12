import {makeAutoObservable, runInAction} from 'mobx';
import {FicsProtocol} from '../services/FicsProtocol';
import {GameStart, GameEnd, MovesList} from '../services/FicsProtocol.types';

// Forward declaration to avoid circular dependency
interface RootStore {
    gameStore: any;
    chatStore: any;
    soundStore?: any;
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
    
    // Timeseal protocol constants
    private readonly timesealConnect = "TIMESEAL2|openseal|simpleficsinterface|";
    private readonly timesealKey = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";
    
    // Message buffer for handling FICS protocol delimiter
    private messageBuffer = "";
    
    // Track login state
    private loginState: 'pre-login' | 'logging-in' | 'logged-in' = 'pre-login';
    private credentials: { username: string; password: string } | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    
    // Helper to strip titles from usernames
    private stripTitles(username: string): string {
        // Remove all parenthetical titles like (TD), (*), (C), etc.
        return username.replace(/\([^)]*\)/g, '').trim();
    }

    connect(credentials?: { username: string; password: string }) {
        this.connecting = true;
        this.error = null;
        this.credentials = credentials || null;

        try {
            // Connect to FICS WebSocket server directly
            // This works in the browser because FICS provides a WebSocket endpoint
            this.ws = new WebSocket('wss://www.freechess.org:5001');

            this.ws.onopen = () => {
                // Send timeseal connect string WITH encoding (like the original does)
                const encoded = this.encodeTimeseal(this.timesealConnect);
                this.ws!.send(encoded);
                
                runInAction(() => {
                    this.connected = true;
                    this.connecting = false;
                });

                // Connected to FICS WebSocket with timeseal
            };

            this.ws.onmessage = async (event) => {
                // Handle different data types from WebSocket
                let data: string;
                if (event.data instanceof Blob) {
                    data = await event.data.text();
                } else if (event.data instanceof ArrayBuffer) {
                    const decoder = new TextDecoder();
                    data = decoder.decode(event.data);
                } else {
                    data = event.data;
                }
                this.handleMessage(data);
            };

            this.ws.onclose = (event) => {
                runInAction(() => {
                    this.connected = false;
                    this.connecting = false;
                    if (event.code !== 1000) { // 1000 is normal closure
                        this.error = `Connection closed: ${event.reason || 'Unknown reason'}`;
                    }
                });
                // Don't auto-reconnect, let user manually reconnect
                // this.scheduleReconnect();
            };

            this.ws.onerror = (error) => {
                runInAction(() => {
                    this.error = 'Connection error - check your internet connection';
                    this.connecting = false;
                });
                console.error('WebSocket error:', error);
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
            // Send quit command before closing
            if (this.connected) {
                this.sendCommand('quit');
            }
            this.ws.close(1000, 'User requested disconnect');
            this.ws = null;
        }

        runInAction(() => {
            this.connected = false;
            this.connecting = false;
            this.user = null;
            this.error = null;
            this.loginState = 'pre-login';
            this.messageBuffer = '';
        });
    }

    sendCommand(command: string) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // console.log('Sending command to FICS:', command);
            // Encode with timeseal protocol
            const encoded = this.encodeTimeseal(command);
            this.ws.send(encoded);
            
            // Update last activity time
            runInAction(() => {
                this.lastPing = Date.now();
            });

            // Add to chat history if it's a chat command
            if (command.startsWith('tell ') || command.startsWith('say ') || command.startsWith('shout ')) {
                this.rootStore?.chatStore.addToHistory(command);
            }
        } else {
            console.warn('Cannot send command: not connected to FICS');
        }
    }
    
    private encodeTimeseal(e: string): Uint8Array {
        let t = e.length;
        const n = new Uint8Array(t + 30);
        
        // Copy message to array
        for (let i = 0; i < e.length; i++)
            n[i] = e.charCodeAt(i);
        
        n[t] = 24;
        t++;
        
        // Add timestamp - exact same calculation as original
        const o = (new Date).getTime();
        const A = Math.floor(o / 1e3);
        const s = (A % 1e4 * 1e3 + (o - 1e3 * A)).toString();
        
        for (let i = 0; i < s.length; i++)
            n[t + i] = s.charCodeAt(i);
        
        t += s.length;
        n[t] = 25;
        t++;
        
        // Pad to multiple of 12
        while (t % 12 != 0) {
            n[t] = 49;
            t++;
        }
        
        // Scramble
        for (let i = 0; i < t; i += 12) {
            n[i] ^= n[i + 11];
            n[i + 11] ^= n[i];
            n[i] ^= n[i + 11];
            n[i + 2] ^= n[i + 9];
            n[i + 9] ^= n[i + 2];
            n[i + 2] ^= n[i + 9];
            n[i + 4] ^= n[i + 7];
            n[i + 7] ^= n[i + 4];
            n[i + 4] ^= n[i + 7];
        }
        
        // XOR with key
        for (let i = 0; i < t; i++) {
            const keyChar = this.timesealKey.charCodeAt(i % 50);
            n[i] = ((128 | n[i]) ^ keyChar) - 32;
        }
        
        n[t] = 128;
        t++;
        n[t] = 10;
        t++;
        
        return n.slice(0, t);
    }

    private login(username: string, password: string) {
        this.sendCommand(username);
        this.sendCommand(password);
    }

    private loginAsGuest() {
        this.sendCommand('guest');
    }

    private handleMessage(data: string) {
        console.log('FICS message received:', data);
        
        runInAction(() => {
            this.lastPing = Date.now();
        });
        
        // Handle timeseal acknowledgements
        const { cleanedMessage, needsAck } = FicsProtocol.handleTimesealAcknowledgement(data);
        if (needsAck) {
            // Send timeseal acknowledgement
            const ack = FicsProtocol.createTimesealAck();
            this.ws!.send(ack);
        }
        
        // Use cleaned message for processing
        const processData = cleanedMessage;

        // Don't buffer messages until we're actually logged in
        if (this.loginState !== 'logged-in') {
            // Process the message immediately without buffering
            const messages = FicsProtocol.parseMessage(processData);
            this.processMessages(messages);
            return;
        }

        // After login, buffer messages until we see \nfics%
        this.messageBuffer += processData;
        
        // Debug: Buffer state logging removed for cleaner console
        
        // Process complete messages ending with fics%
        // FICS uses \n\r before fics% on some systems
        const delimiters = ['\n\rfics%', '\nfics%', '\rfics%'];
        let delimiterIndex = -1;
        let delimiterLength = 0;
        
        // Find which delimiter is present
        for (const delim of delimiters) {
            const index = this.messageBuffer.indexOf(delim);
            if (index !== -1) {
                delimiterIndex = index;
                delimiterLength = delim.length;
                break;
            }
        }
        
        // Also check for just 'fics%' at the start of buffer (for cases where \n was in previous chunk)
        if (delimiterIndex === -1 && this.messageBuffer.startsWith('fics%')) {
            delimiterIndex = 0;
            delimiterLength = 5;
        }
        
        while (delimiterIndex !== -1) {
            let completeMessage;
            
            if (delimiterIndex === 0 && delimiterLength === 5) {
                // Handle case where fics% is at the start
                completeMessage = '';
                this.messageBuffer = this.messageBuffer.substring(5);
            } else {
                // Extract the complete message (up to but not including the delimiter)
                completeMessage = this.messageBuffer.substring(0, delimiterIndex);
                
                // Remove the processed message and delimiter from the buffer
                this.messageBuffer = this.messageBuffer.substring(delimiterIndex + delimiterLength);
            }
            
            if (completeMessage) {
                // Parse the complete message
                // Processing complete message
                const messages = FicsProtocol.parseMessage(completeMessage);
                // Parsed messages processed
                this.processMessages(messages);
            }
            
            // Look for the next delimiter
            delimiterIndex = -1;
            delimiterLength = 0;
            
            for (const delim of delimiters) {
                const index = this.messageBuffer.indexOf(delim);
                if (index !== -1) {
                    delimiterIndex = index;
                    delimiterLength = delim.length;
                    break;
                }
            }
            
            if (delimiterIndex === -1 && this.messageBuffer.startsWith('fics%')) {
                delimiterIndex = 0;
                delimiterLength = 5;
            }
        }
        
        // Buffer processing complete
    }

    private processMessages(messages: any[]) {
        for (const message of messages) {
            try {
                switch (message.type) {
                    case 'login':
                        // User needs to enter username
                        runInAction(() => {
                            this.loginState = 'logging-in';
                        });
                        
                        // Also show in console
                        if (this.rootStore?.chatStore) {
                            this.rootStore.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: 'login: ',
                                timestamp: new Date(),
                                type: 'system'
                            });
                        }
                        
                        if (this.credentials) {
                            this.sendCommand(this.credentials.username);
                        }
                        // Don't auto-login as guest - wait for user input
                        break;
                        
                    case 'password':
                        // User needs to enter password
                        runInAction(() => {
                            this.loginState = 'logging-in';
                        });
                        if (this.credentials) {
                            this.sendCommand(this.credentials.password);
                        }
                        break;

                    case 'sessionStart':
                        this.handleLogin();
                        runInAction(() => {
                            this.loginState = 'logged-in';
                            this.user = {
                                handle: message.data.username,
                                rating: {},
                                isGuest: message.data.username.startsWith('Guest')
                            };
                        });
                        
                        // Send FICS initialization commands
                        this.sendCommand('set style 12');
                        this.sendCommand('set prompt');
                        this.sendCommand('set bell off');
                        this.sendCommand('set interface Simple FICS Interface');
                        break;

                    case 'style12':
                        this.rootStore?.gameStore.updateFromStyle12(message.data);
                        // If we're observing and not at move 1, request the moves
                        if (message.data.moveNumber > 1 && 
                            (message.data.relation === 0 || message.data.relation === -2)) {
                            // Check if we already have moves for this game
                            if (!this.rootStore?.gameStore.hasMoveHistory()) {
                                this.sendCommand(`moves ${message.data.gameNumber}`);
                            }
                        }
                        break;

                    case 'gameStart':
                        this.handleGameStart(message.data);
                        // Play start sound when a game starts (playing or observing)
                        this.rootStore?.soundStore?.playStart();
                        break;

                    case 'channelTell':
                        // Handling channelTell
                        // Create channel tab if it doesn't exist
                        const channelId = `channel-${message.data.channelNumber}`;
                        this.rootStore?.chatStore.createTab(
                            channelId,
                            message.data.channelNumber,
                            'channel'
                        );
                        
                        // Create corrected timestamp
                        const channelNow = new Date();
                        const channelIsInGMT = channelNow.getTimezoneOffset() === 0;
                        let channelLocalTime = channelNow;
                        
                        if (channelIsInGMT) {
                            const edtOffset = -4 * 60; // EDT is UTC-4
                            channelLocalTime = new Date(channelNow.getTime() + (edtOffset * 60 * 1000));
                        }
                        
                        // Add message to channel
                        this.rootStore?.chatStore.addMessage(channelId, {
                            channel: channelId,
                            sender: this.stripTitles(message.data.username),
                            content: message.data.message,
                            timestamp: channelLocalTime,
                            type: 'message'
                        });
                        break;


                    case 'directTell':
                        // Strip titles from username
                        const cleanUsername = this.stripTitles(message.data.username);
                        // Create private tab if it doesn't exist
                        const privateTabId = cleanUsername.toLowerCase();
                        this.rootStore?.chatStore.createTab(
                            privateTabId,
                            cleanUsername,
                            'private'
                        );
                        
                        // Create corrected timestamp
                        const privateNow = new Date();
                        const privateIsInGMT = privateNow.getTimezoneOffset() === 0;
                        let privateLocalTime = privateNow;
                        
                        if (privateIsInGMT) {
                            const edtOffset = -4 * 60; // EDT is UTC-4
                            privateLocalTime = new Date(privateNow.getTime() + (edtOffset * 60 * 1000));
                        }
                        
                        // Add message to private chat
                        this.rootStore?.chatStore.addMessage(privateTabId, {
                            channel: privateTabId,
                            sender: cleanUsername,
                            content: message.data.message,
                            timestamp: privateLocalTime,
                            type: 'whisper'
                        });
                        break;

                    case 'movesList':
                        this.handleMovesList(message.data);
                        break;

                    case 'gameEnd':
                        this.handleGameEnd(message.data);
                        // Play end sound when a game ends
                        this.rootStore?.soundStore?.playEnd();
                        break;
                        
                    case 'unobserve':
                        // If we're unobserving the current game, end it
                        if (this.rootStore?.gameStore.currentGame?.gameId === message.data.gameNumber) {
                            this.rootStore?.gameStore.endGame();
                        }
                        // Show message in console
                        this.rootStore?.chatStore.addMessage('console', {
                            channel: 'console',
                            sender: 'FICS',
                            content: `Removing game ${message.data.gameNumber} from observation list.`,
                            timestamp: new Date(),
                            type: 'system'
                        });
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
                        // Play illegal move sound
                        this.rootStore?.soundStore?.playIllegal();
                        break;

                    case 'drawOffer':
                        // Handle draw offer
                        this.rootStore?.chatStore.addMessage('console', {
                            channel: 'console',
                            sender: 'FICS',
                            content: `${message.data.username} offers you a draw.`,
                            timestamp: new Date(),
                            type: 'system'
                        });
                        // Play draw sound
                        this.rootStore?.soundStore?.playDraw();
                        break;
                    
                    case 'raw':
                    default:
                        // Check if it's a seek or game list message
                        if (message.data) {
                            this.handleSeekOrGame(message.data);
                            
                            // Check for specific patterns in raw messages
                            const msgData = message.data.toLowerCase();
                            
                            // Check for abort request
                            if (msgData.includes('abort') && msgData.includes('request')) {
                                this.rootStore?.soundStore?.playAbort();
                            }
                            // Check for match/challenge requests - be more specific to avoid false positives
                            else if (msgData.startsWith('challenge:') || 
                                     msgData.includes('challenges you') ||
                                     msgData.includes('your seek has been posted') ||
                                     (msgData.includes('seeking') && msgData.includes('match'))) {
                                this.rootStore?.soundStore?.playChallenge();
                            }
                            // Check for notifications/alerts - check for player notifications
                            else if (msgData.includes('notification:') || 
                                     msgData.includes('[alert]') ||
                                     msgData.includes('has arrived.') || 
                                     msgData.includes('has departed.')) {
                                this.rootStore?.soundStore?.playAlert();
                            }
                        }
                        
                        // Route raw messages to console
                        if (message.type === 'raw' && message.data !== null && message.data !== undefined) {
                            // Create timestamp and force it to be in local timezone
                            const now = new Date();
                            
                            // Check if we're in GMT when we shouldn't be
                            const isInGMT = now.getTimezoneOffset() === 0;
                            let localTime = now;
                            
                            if (isInGMT) {
                                // If we're in GMT but should be in EDT (UTC-4), subtract 4 hours
                                // This is a workaround for the timezone issue
                                const edtOffset = -4 * 60; // EDT is UTC-4 (240 minutes behind UTC)
                                localTime = new Date(now.getTime() + (edtOffset * 60 * 1000));
                            }
                            
                            
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data,
                                timestamp: localTime,
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
            // Initialize keepalive mechanism - only send if no activity for 50 minutes
            this.pingInterval = setInterval(() => {
                const now = Date.now();
                const timeSinceLastActivity = now - this.lastPing;
                const fiftyMinutes = 50 * 60 * 1000; // 50 minutes in milliseconds
                
                if (timeSinceLastActivity >= fiftyMinutes) {
                    this.sendCommand('date');
                }
            }, 60000); // Check every minute
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
    
    private handleGameEnd(gameEnd: GameEnd) {
        // Check if this is the game we're currently observing/playing
        if (this.rootStore?.gameStore.currentGame?.gameId === gameEnd.gameNumber) {
            // Update the game result and set the reason as the last move
            if (this.rootStore.gameStore.currentGame) {
                this.rootStore.gameStore.currentGame.result = gameEnd.result;
                this.rootStore.gameStore.currentGame.lastMove = gameEnd.reason;
            }
            
            // End the game and switch to freestyle for both observing and playing
            // This will preserve the current game state (including our updated lastMove) in lastGameState
            if (this.rootStore.gameStore.isObserving || this.rootStore.gameStore.isPlaying) {
                this.rootStore.gameStore.endGame();
            }
            
            // Show game end message in console
            this.rootStore?.chatStore.addMessage('console', {
                channel: 'console',
                sender: 'FICS',
                content: `Game ${gameEnd.gameNumber} (${gameEnd.whiteName} vs. ${gameEnd.blackName}) ${gameEnd.reason} ${gameEnd.result}`,
                timestamp: new Date(),
                type: 'system'
            });
        }
    }

    private handleMovesList(movesList: MovesList) {
        // Update the game store with the moves list
        if (this.rootStore?.gameStore.currentGame?.gameId === movesList.gameNumber) {
            this.rootStore.gameStore.loadMovesFromList(movesList.moves);
        }
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
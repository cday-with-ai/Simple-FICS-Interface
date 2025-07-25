import {makeAutoObservable, runInAction} from 'mobx';
import {FicsProtocol} from '../services/FicsProtocol';
import {GameStart, GameEnd, MovesList} from '../services/FicsProtocol.types';
import type {RootStore} from './RootStore';
import {unicodeToMaciejgFormat, maciejgFormatToUnicode} from '../utils/MaciejgFormat';

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
    averagePing: number | null = null;
    lastPingUpdate: Date | null = null;
    rootStore?: RootStore;

    private ws: WebSocket | null = null;
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private pingMonitorInterval: NodeJS.Timeout | null = null;
    private waitingForPing = false;
    
    // Timeseal protocol constants
    private readonly timesealConnect = "TIMESEAL2|openseal|simpleficsinterface|";
    private readonly timesealKey = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";
    
    // Track login state
    loginState: 'pre-login' | 'logging-in' | 'logged-in' = 'pre-login';
    
    // Track if we're clearing a list
    private clearingListType: string | null = null;
    private clearingListBuffer: string[] = [];
    credentials: { username: string; password: string } | null = null;
    
    // Track multi-line channel member lists
    private channelListBuffer: string[] = [];
    private isCollectingChannelList = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    // Helper to strip titles from usernames
    private stripTitles(username: string): string {
        // Remove all parenthetical titles like (TD), (*), (C), etc.
        return username.replace(/\([^)]*\)/g, '').trim();
    }

    connect(credentials?: { username: string; password: string }) {
        // Don't create multiple connections
        if (this.connected || this.connecting || this.ws) {
            console.log('Connection already exists or in progress');
            return;
        }
        
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

        if (this.pingMonitorInterval) {
            clearInterval(this.pingMonitorInterval);
            this.pingMonitorInterval = null;
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
        });
    }

    sendCommand(command: string) {
        // Handle special commands that need custom logic
        const cmd = command.trim().toLowerCase();
        
        // Handle clear commands
        if (cmd.startsWith('clear ')) {
            const listType = cmd.substring(6); // Get everything after "clear "
            if (['censor', 'noplay', 'gnotify', 'notify', 'channel'].includes(listType)) {
                this.executeClearList(listType);
                return;
            }
        }
        
        // Handle refresh colors command
        if (cmd === 'refresh colors') {
            this.rootStore?.preferencesStore.refreshConsoleColors();
            this.rootStore?.chatStore.addMessage('console', {
                channel: 'console',
                sender: 'System',
                content: 'Console colors refreshed with latest defaults.',
                timestamp: new Date(),
                type: 'system'
            });
            return;
        }
        
        // Handle set theme command
        if (cmd.startsWith('set theme ')) {
            const theme = cmd.substring(10).trim(); // Get everything after "set theme "
            if (['light', 'dark', 'system'].includes(theme)) {
                this.rootStore?.preferencesStore.updatePreference('theme', theme as 'light' | 'dark' | 'system');
                this.rootStore?.chatStore.addMessage('console', {
                    channel: 'console',
                    sender: 'System',
                    content: `Theme set to ${theme}.`,
                    timestamp: new Date(),
                    type: 'system'
                });
                return;
            } else {
                this.rootStore?.chatStore.addMessage('console', {
                    channel: 'console',
                    sender: 'System',
                    content: `Invalid theme. Use: set theme light|dark|system`,
                    timestamp: new Date(),
                    type: 'system'
                });
                return;
            }
        }
        
        // Handle set orient command
        if (cmd === 'set orient' || cmd === 'set flip') {
            this.rootStore?.preferencesStore.toggleBoardFlip();
            const flipped = this.rootStore?.preferencesStore.boardFlipped;
            this.rootStore?.chatStore.addMessage('console', {
                channel: 'console',
                sender: 'System',
                content: `Board orientation ${flipped ? 'flipped' : 'normal'}.`,
                timestamp: new Date(),
                type: 'system'
            });
            return;
        }
        
        // Handle set mode command
        if (cmd.startsWith('set mode ')) {
            const mode = cmd.substring(9).trim(); // Get everything after "set mode "
            const modeMap: Record<string, 'chess-only' | 'chat-only' | 'chess-and-chat'> = {
                'chess': 'chess-only',
                'chess-only': 'chess-only',
                'chat': 'chat-only',
                'chat-only': 'chat-only',
                'both': 'chess-and-chat',
                'chess-and-chat': 'chess-and-chat'
            };
            
            if (mode in modeMap) {
                this.rootStore?.preferencesStore.updatePreference('viewMode', modeMap[mode]);
                this.rootStore?.chatStore.addMessage('console', {
                    channel: 'console',
                    sender: 'System',
                    content: `View mode set to ${modeMap[mode]}.`,
                    timestamp: new Date(),
                    type: 'system'
                });
                return;
            } else {
                this.rootStore?.chatStore.addMessage('console', {
                    channel: 'console',
                    sender: 'System',
                    content: `Invalid mode. Use: set mode chess|chat|both`,
                    timestamp: new Date(),
                    type: 'system'
                });
                return;
            }
        }
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // Log the raw command being sent
            console.log('[FICSStore] Sending command:', JSON.stringify(command));
            
            // Convert Unicode to Maciejg format for user text
            const processedCommand = unicodeToMaciejgFormat(command);
            console.log('[FICSStore] After Unicode processing:', JSON.stringify(processedCommand));
            
            // Encode with timeseal protocol
            const encoded = this.encodeTimeseal(processedCommand);
            console.log('[FICSStore] Encoded bytes:', Array.from(encoded.slice(0, Math.min(encoded.length, 50))));
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
    
    private executeClearList(listType: string) {
        // First, get the list contents
        this.sendCommand(`=${listType}`);
        
        // Track which list we're clearing
        this.clearingListType = listType;
        
        // Show feedback to user
        this.rootStore?.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'System',
            content: `Clearing ${listType} list...`,
            timestamp: new Date(),
            type: 'system'
        });
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
        
        // Log raw FICS message before any processing
        console.log('[FICS Raw]:', JSON.stringify(data));
        
        // Handle timeseal acknowledgements
        const { cleanedMessage, needsAck } = FicsProtocol.handleTimesealAcknowledgement(data);
        if (needsAck) {
            // Send timeseal acknowledgement
            const ack = FicsProtocol.createTimesealAck();
            this.ws!.send(ack);
        }
        
        // Use cleaned message for processing
        let processData = cleanedMessage;
        
        // Convert Maciejg format to Unicode for incoming text
        processData = maciejgFormatToUnicode(processData);
        
        // Normalize line endings before parsing
        processData = processData.replace(/\n\r/g, '\n').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Remove FICS prompts - they appear at the end of messages
        processData = processData.replace(/\nfics%\s*$/g, '\n');
        processData = processData.replace(/^fics%\s*\n/g, '');

        // Process all messages immediately
        // FICS sends complete messages, so we don't need buffering
        const messages = FicsProtocol.parseMessageWithStores(processData, this.rootStore!);
        this.processMessages(messages);
    }

    private processMessages(messages: any[]) {
        for (const message of messages) {
            try {
                switch (message.type) {
                    case 'login':
                        // Handled by parser
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
                        // Handled by SessionStartParser
                        break;

                    case 'style12':
                        const style12Data = message.data.metadata || message.data;
                        this.rootStore?.gameStore.updateFromStyle12(style12Data);
                        // If we're observing and not at move 1, request the moves
                        if (style12Data.moveNumber > 1 && 
                            (style12Data.relation === 0 || style12Data.relation === -2)) {
                            // Check if we already have moves for this game
                            if (!this.rootStore?.gameStore.hasMoveHistory()) {
                                this.sendCommand(`moves ${style12Data.gameNumber}`);
                            }
                        }
                        break;

                    case 'gameStart':
                        // Handled by parser
                        break;

                    case 'channelTell':
                        // Handled by parser
                        break;


                    case 'directTell':
                        // Handled by parser
                        break;

                    case 'movesList':
                        this.handleMovesList(message.data);
                        // Also show in console with proper color
                        if (message.data) {
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: `Movelist for game ${message.data.gameNumber}`,
                                timestamp: new Date(),
                                type: 'system',
                                metadata: {
                                    consoleType: 'movesList'
                                }
                            });
                        }
                        break;

                    case 'gameEnd':
                        // Handled by parser
                        break;
                        
                    case 'unobserve':
                        const gameNumber = message.data.metadata?.gameNumber;
                        console.log('[FICSStore] Handling unobserve:', {
                            gameNumber: gameNumber,
                            currentGameId: this.rootStore?.gameStore.currentGame?.gameId,
                            metadata: message.data
                        });
                        // If we're unobserving the current game, end it
                        if (this.rootStore?.gameStore.currentGame?.gameId === gameNumber) {
                            console.log('[FICSStore] Ending current game due to unobserve');
                            this.rootStore?.gameStore.endGame();
                        }
                        // Show message in console
                        this.rootStore?.chatStore.addMessage('console', {
                            channel: 'console',
                            sender: 'FICS',
                            content: `Removing game ${gameNumber} from observation list.`,
                            timestamp: new Date(),
                            type: 'system',
                            metadata: {
                                consoleType: 'unobserve'
                            }
                        });
                        break;

                    case 'illegalMove':
                        // Show error in console
                        this.rootStore?.chatStore.addMessage('console', {
                            channel: 'console',
                            sender: 'FICS',
                            content: `Illegal move: ${message.data.move}`,
                            timestamp: new Date(),
                            type: 'system',
                            metadata: {
                                consoleType: 'illegalMove'
                            }
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
                            type: 'system',
                            metadata: {
                                consoleType: 'drawOffer'
                            }
                        });
                        // Play draw sound
                        this.rootStore?.soundStore?.playDraw();
                        break;
                    
                    case 'seekAnnouncement':
                        // Handle seek announcement with interactive elements
                        if (message.data) {
                            // Don't play sounds for seek announcements
                            
                            // Add to console with parsed data
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data.content,
                                timestamp: new Date(),
                                type: 'system',
                                metadata: {
                                    consoleType: 'seekAnnouncement',
                                    parsedMessage: message.data
                                }
                            });
                        }
                        break;
                        
                    case 'notification':
                        // Handle player arrival/departure notifications
                        if (message.data) {
                            this.rootStore?.soundStore?.playAlert();
                            
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data.content,
                                timestamp: new Date(),
                                type: 'system',
                                metadata: {
                                    consoleType: 'notification',
                                    parsedMessage: message.data
                                }
                            });
                        }
                        break;
                        
                    case 'gameNotification':
                        // Handle game notifications
                        if (message.data) {
                            this.rootStore?.soundStore?.playAlert();
                            
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data.content,
                                timestamp: new Date(),
                                type: 'system',
                                metadata: {
                                    consoleType: 'gameNotification',
                                    parsedMessage: message.data
                                }
                            });
                        }
                        break;
                        
                    case 'shout':
                    case 'cshout':
                        // Handled by parser
                        break;
                        
                    case 'fingerOutput':
                    case 'whoOutput':
                    case 'historyOutput':
                    case 'journalOutput':
                    case 'soughtOutput':
                    case 'gamesOutput':
                    case 'channelListOutput':
                    case 'newsOutput':
                    case 'inOutput':
                        // Handle structured outputs with interactive elements
                        if (message.data) {
                            // Use the full type name for console coloring (e.g., 'fingerOutput' not 'finger')
                            const consoleType = message.type;
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data.content,
                                timestamp: new Date(),
                                type: 'system',
                                metadata: {
                                    consoleType,
                                    parsedMessage: message.data
                                }
                            });
                        }
                        break;
                    
                    case 'matchRequest':
                        // Handle match requests with consistent coloring
                        if (message.data) {
                            this.rootStore?.chatStore.addMessage('console', {
                                channel: 'console',
                                sender: 'FICS',
                                content: message.data.content,
                                timestamp: new Date(),
                                type: 'system',
                                metadata: {
                                    consoleType: 'matchRequest',
                                    parsedMessage: message.data
                                }
                            });
                        }
                        break;
                    
                    case 'raw':
                    case 'system':
                    default:
                        // Check if it's a seek or game list message (for old compatibility)
                        if (message.data && typeof message.data === 'string') {
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
                            
                            // Handle list response when clearing
                            if (this.clearingListType) {
                                if (message.data.includes(`-- ${this.clearingListType} list:`)) {
                                    this.handleListForClearing(message.data, this.clearingListType);
                                } else if (this.clearingListBuffer.length >= 0) {
                                    // We're collecting list names
                                    const trimmedData = message.data.trim();
                                    if (trimmedData) {
                                        // Check if this line contains player names (not other messages)
                                        if (!trimmedData.includes(':') && !trimmedData.startsWith('>') && 
                                            !trimmedData.includes('tells you') && !trimmedData.includes('--')) {
                                            // This looks like a line of player names
                                            const names = trimmedData.split(/\s+/).filter((name: string) => name.length > 0);
                                            for (const name of names) {
                                                this.clearingListBuffer.push(name);
                                                this.sendCommand(`-${this.clearingListType} ${name}`);
                                            }
                                        } else {
                                            // We've hit the end of the list or another message type
                                            this.finishClearingList();
                                        }
                                    } else {
                                        // Empty line - end of list
                                        this.finishClearingList();
                                    }
                                }
                            }
                        }
                        
                        // Check for ping response before routing to console
                        if (message.type === 'raw' && message.data !== null && message.data !== undefined) {
                            const rawContent = typeof message.data === 'string' ? message.data : message.data.content;
                            
                            // Check if this is a ping response
                            const pingMatch = rawContent.match(/Average ping time for (\w+) is (\d+)ms\./);
                            if (pingMatch && this.waitingForPing) {
                                runInAction(() => {
                                    this.averagePing = parseInt(pingMatch[2]);
                                    this.lastPingUpdate = new Date();
                                    this.waitingForPing = false;
                                });
                                // Don't show ping messages in console
                                break;
                            }
                            
                            // Handle multi-line channel member lists
                            if (rawContent.match(/^\s*Channel\s+\d+(?:\s+"[^"]+")?\s*:/)) {
                                // Start of a channel list
                                this.isCollectingChannelList = true;
                                this.channelListBuffer = [rawContent];
                                // Don't display yet
                                break;
                            } else if (this.isCollectingChannelList && rawContent.trim().startsWith('\\')) {
                                // Continuation line
                                this.channelListBuffer.push(rawContent);
                                // Don't display yet
                                break;
                            } else if (this.isCollectingChannelList && rawContent.match(/^\d+\s+players?\s+are\s+in\s+channel\s+\d+\./)) {
                                // End of channel list
                                this.channelListBuffer.push(rawContent);
                                
                                // Now display the complete channel list
                                const completeMessage = this.channelListBuffer.join('\n');
                                this.isCollectingChannelList = false;
                                this.channelListBuffer = [];
                                
                                // Create timestamp and force it to be in local timezone
                                const now = new Date();
                                const isInGMT = now.getTimezoneOffset() === 0;
                                let localTime = now;
                                
                                if (isInGMT) {
                                    const edtOffset = -4 * 60; // EDT is UTC-4 (240 minutes behind UTC)
                                    localTime = new Date(now.getTime() + (edtOffset * 60 * 1000));
                                }
                                
                                // Detect message type for console coloring
                                const metadata = this.detectConsoleMessageType(completeMessage);
                                
                                this.rootStore?.chatStore.addMessage('console', {
                                    channel: 'console',
                                    sender: 'FICS',
                                    content: completeMessage,
                                    timestamp: localTime,
                                    type: 'system',
                                    metadata
                                });
                                break;
                            } else if (this.isCollectingChannelList) {
                                // Something went wrong, flush the buffer
                                this.isCollectingChannelList = false;
                                // Display what we have so far
                                for (const bufferedMsg of this.channelListBuffer) {
                                    const now = new Date();
                                    const isInGMT = now.getTimezoneOffset() === 0;
                                    let localTime = now;
                                    
                                    if (isInGMT) {
                                        const edtOffset = -4 * 60;
                                        localTime = new Date(now.getTime() + (edtOffset * 60 * 1000));
                                    }
                                    
                                    const metadata = this.detectConsoleMessageType(bufferedMsg);
                                    
                                    this.rootStore?.chatStore.addMessage('console', {
                                        channel: 'console',
                                        sender: 'FICS',
                                        content: bufferedMsg,
                                        timestamp: localTime,
                                        type: 'system',
                                        metadata
                                    });
                                }
                                this.channelListBuffer = [];
                                // Continue with current message
                            }
                            
                            // Raw and system messages are handled by their parsers now
                        }
                        break;
                }
            } catch (error) {
                console.error('Error handling FICS message:', error, message);
            }
        }
        
        // After processing all messages, check if we need to finish a list clear operation
        // This handles the case where the list ends at the end of a message batch
        if (this.clearingListType && this.clearingListBuffer.length > 0) {
            // If we've processed messages and still have a buffer, it means the list has ended
            this.finishClearingList();
        }
    }

    private scheduleReconnect() {
        this.reconnectTimeout = setTimeout(() => {
            this.connect();
        }, 5000);
    }

    handleLogin() {
        runInAction(() => {
            // Initialize ping monitoring - run every minute
            this.pingMonitorInterval = setInterval(() => {
                if (!this.waitingForPing && this.connected) {
                    this.waitingForPing = true;
                    this.sendCommand('ping');
                    // Update lastPing to track activity
                    this.lastPing = Date.now();
                }
            }, 60000); // Run every minute
            
            // Run first ping immediately after login
            if (this.connected) {
                this.waitingForPing = true;
                this.sendCommand('ping');
                this.lastPing = Date.now();
            }
        });
    }

    // Style12 is now handled by the Style12Parser

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
            
            // Update player ratings if available (from FICS format parsing)
            if (movesList.whiteElo || movesList.blackElo) {
                const currentGame = this.rootStore.gameStore.currentGame;
                if (currentGame) {
                    if (movesList.whiteElo) {
                        currentGame.white.rating = parseInt(movesList.whiteElo);
                    }
                    if (movesList.blackElo) {
                        currentGame.black.rating = parseInt(movesList.blackElo);
                    }
                }
            }
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
    
    private handleListForClearing(data: string, listType: string) {
        // This is called when we see the header line
        // We need to collect subsequent lines until we have the full list
        
        if (data.includes(`-- ${listType} list:`)) {
            // Check if it's an empty list (0 names)
            const emptyMatch = data.match(/-- \w+ list: 0 names --/);
            if (emptyMatch) {
                // Reset the flag
                this.clearingListType = null;
                
                this.rootStore?.chatStore.addMessage('console', {
                    channel: 'console',
                    sender: 'System',
                    content: `${listType} list is already empty.`,
                    timestamp: new Date(),
                    type: 'system'
                });
                return;
            }
            
            // Start collecting - we'll process the names from subsequent raw messages
            this.clearingListBuffer = [];
            return;
        }
    }
    
    private finishClearingList() {
        if (!this.clearingListType || !this.clearingListBuffer) return;
        
        const removedCount = this.clearingListBuffer.length;
        if (removedCount > 0) {
            this.rootStore?.chatStore.addMessage('console', {
                channel: 'console',
                sender: 'System',
                content: `Removed ${removedCount} players from ${this.clearingListType} list.`,
                timestamp: new Date(),
                type: 'system'
            });
        }
        
        this.clearingListType = null;
        this.clearingListBuffer = [];
    }
    
    private detectConsoleMessageType(message: string): { consoleType?: 'journal' | 'history' | 'fingerOutput' | 'notification' | 'directTell' | 'channelTell' | 'shout' | 'cshout' | 'matchRequest' | 'seek' | 'finger' | 'who' | 'sought' | 'games' | 'channel' | 'seekAnnouncement' | 'gameNotification' | 'system'; channelNumber?: string } | undefined {
        // Skip empty messages
        if (!message || !message.trim()) return undefined;
        
        // Check for journal output
        if (
            message.match(/^Journal for \w+:/) || // Header (e.g., "Journal for cday:")
            message.match(/^\s+White\s+Rating\s+Black/) || // Column headers
            message.match(/^%\d+:/) // Journal lines (e.g., "%01: cday")
        ) {
            return { consoleType: 'journal' };
        }
        
        // Check for history output (more specific pattern)
        if (
            message.match(/^History for \w+:/) || // Header (e.g., "History for cday:")
            message.match(/^\s+Opponent\s+Type\s+ECO/) || // Column headers
            message.match(/^\d+:\s+[=+-]\s+\d+\s+[WB]\s+\d+/) // History lines (e.g., "29: = 1630 W 1824")
        ) {
            return { consoleType: 'history' };
        }
        
        // Check for finger output - various patterns that appear in finger command output
        if (
            message.match(/^\s*\d+:/) || // Finger notes with or without space (e.g., "1:" or " 1:")
            message.match(/^\s*Finger of \w+(?:\([^)]+\))*/) || // Header (e.g., "Finger of MAd(*)(SR)(TM):" or "Finger of GuestZLKY(U):")
            message.match(/^On for:/) || // Online status
            message.match(/^Idle:/) || // Idle time
            message.match(/^Sanctions\s*:/) || // Sanctions line
            message.match(/^Last disconnected:/) || // Last disconnected
            message.match(/^\s+rating\s+RD/) || // Rating header
            message.match(/^(Blitz|Standard|Lightning|Wild|Bughouse|Crazyhouse|Suicide|Atomic|Losers)\s+\d+/) || // Rating lines
            message.match(/^Timeseal \d+ :/) || // Timeseal status
            message.match(/^Admin Level:/) || // Admin level
            message.match(/^Email\s*:/) || // Email line
            message.match(/^Total time online:/) || // Total time
            message.match(/^% of life online:/) // Percentage online
        ) {
            return { consoleType: 'fingerOutput' };
        }
        
        // Notification messages
        if (message.includes('Notification:') || message.includes('has arrived.') || message.includes('has departed.')) {
            return { consoleType: 'notification' };
        }
        
        // Direct tells - various formats
        if (message.match(/^\w+(?:\([A-Z*]+\))? tells you:/) || 
            message.match(/^\w+(?:\([A-Z*]+\))? says:/) ||
            message.includes('(told ') && !message.includes('players in channel')) {
            return { consoleType: 'directTell' };
        }
        
        // Channel tells (but not the echo when you send)
        const channelMatch = message.match(/^\w+(?:\([A-Z*]+\))?\((\d+)\):/);
        if (channelMatch) {
            return { consoleType: 'channelTell', channelNumber: channelMatch[1] };
        }
        
        // Shouts
        if (message.match(/^\w+(?:\([A-Z*]+\))? shouts:/) || message.includes('shouts:')) {
            return { consoleType: 'shout' };
        }
        
        // C-Shouts
        if (message.match(/^\w+(?:\([A-Z*]+\))? c-shouts:/) || message.includes('c-shouts:')) {
            return { consoleType: 'cshout' };
        }
        
        // Match requests/challenges
        if (message.includes('Challenge:') || 
            message.includes('seeks a match') ||
            message.includes('would like to play') ||
            message.includes('Accepting the match offer') ||
            message.includes('Creating:') ||
            message.match(/^You can "accept" or "decline"/) || // Follow-up line for challenges
            message.includes('propose different parameters')) { // Part of challenge follow-up
            return { consoleType: 'matchRequest' };
        }
        
        // Seeks
        if (message.includes('seeking') && message.includes('to respond')) {
            return { consoleType: 'seek' };
        }
        
        return undefined;
    }
}
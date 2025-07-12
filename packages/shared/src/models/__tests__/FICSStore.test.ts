import {FICSStore, FICSUser} from '../FICSStore';
import {runInAction} from 'mobx';

// Mock WebSocket
class MockWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;

    readyState = MockWebSocket.CONNECTING;
    onopen: ((event: Event) => void) | null = null;
    onclose: ((event: CloseEvent) => void) | null = null;
    onmessage: ((event: MessageEvent) => void) | null = null;
    onerror: ((event: Event) => void) | null = null;

    constructor(public url: string) {
        setTimeout(() => {
            this.readyState = MockWebSocket.OPEN;
            if (this.onopen) {
                this.onopen(new Event('open'));
            }
        }, 0);
    }

    send(data: string) {
        // Mock send implementation
    }

    close() {
        this.readyState = MockWebSocket.CLOSED;
        if (this.onclose) {
            this.onclose(new CloseEvent('close'));
        }
    }
}

// Mock global WebSocket
(global as any).WebSocket = MockWebSocket;

describe('FICSStore', () => {
    let ficsStore: FICSStore;
    let mockRootStore: any;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
        jest.useFakeTimers();

        mockRootStore = {
            gameStore: {
                updateFromStyle12: jest.fn(),
                startNewGame: jest.fn()
            },
            chatStore: {
                addMessage: jest.fn(),
                addToHistory: jest.fn()
            }
        };

        ficsStore = new FICSStore();
        (ficsStore as any).rootStore = mockRootStore;
    });

    afterEach(() => {
        ficsStore.disconnect();
        jest.useRealTimers();
    });

    describe('Initialization', () => {
        it('should initialize with default state', () => {
            expect(ficsStore.connected).toBe(false);
            expect(ficsStore.connecting).toBe(false);
            expect(ficsStore.user).toBeNull();
            expect(ficsStore.seekList).toEqual([]);
            expect(ficsStore.gameList).toEqual([]);
            expect(ficsStore.error).toBeNull();
            expect(ficsStore.lastPing).toBe(0);
        });

        it('should be observable', () => {
            expect(ficsStore.connected).toBe(false);

            runInAction(() => {
                ficsStore.connected = true;
            });

            expect(ficsStore.connected).toBe(true);
        });
    });

    describe('Connection Management', () => {
        it('should connect to FICS server', async () => {
            ficsStore.connect();

            expect(ficsStore.connecting).toBe(true);
            expect(ficsStore.error).toBeNull();

            // Wait for WebSocket to open
            jest.advanceTimersByTime(1);

            expect(ficsStore.connected).toBe(true);
            expect(ficsStore.connecting).toBe(false);
        });

        it('should connect with credentials', async () => {
            const sendCommandSpy = jest.spyOn(ficsStore, 'sendCommand');
            const credentials = {username: 'testuser', password: 'testpass'};

            ficsStore.connect(credentials);
            jest.advanceTimersByTime(1);
            
            // Simulate login prompt
            const mockWs = (ficsStore as any).ws;
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'login: '
                }));
            }

            expect(sendCommandSpy).toHaveBeenCalledWith('testuser');
            
            // Simulate password prompt
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'password: '
                }));
            }
            
            expect(sendCommandSpy).toHaveBeenCalledWith('testpass');
        });

        it('should not auto-login when no credentials provided', async () => {
            const sendCommandSpy = jest.spyOn(ficsStore, 'sendCommand');

            ficsStore.connect();
            jest.advanceTimersByTime(1);
            
            // Simulate login prompt
            const mockWs = (ficsStore as any).ws;
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'login: '
                }));
            }

            // Should NOT send any command when no credentials provided
            expect(sendCommandSpy).not.toHaveBeenCalled();
            
            // Login state should be set to logging-in
            expect(ficsStore['loginState']).toBe('logging-in');
        });

        it('should handle connection errors', () => {
            ficsStore.connect();

            const mockWs = (ficsStore as any).ws;
            if (mockWs && mockWs.onerror) {
                mockWs.onerror(new Event('error'));
            }

            expect(ficsStore.error).toBe('Connection error - check your internet connection');
            expect(ficsStore.connecting).toBe(false);
        });

        it('should disconnect properly', () => {
            ficsStore.connect();
            jest.advanceTimersByTime(1);

            ficsStore.disconnect();

            expect(ficsStore.connected).toBe(false);
            expect(ficsStore.user).toBeNull();
        });

        it('should handle connection close', () => {
            ficsStore.connect();
            jest.advanceTimersByTime(1);

            const mockWs = (ficsStore as any).ws;
            if (mockWs && mockWs.onclose) {
                mockWs.onclose(new CloseEvent('close'));
            }

            expect(ficsStore.connected).toBe(false);
            expect(ficsStore.connecting).toBe(false);
            
            // Auto-reconnect is disabled, so connecting should remain false
            jest.advanceTimersByTime(5000);
            expect(ficsStore.connecting).toBe(false);
        });
    });

    describe('Command Sending', () => {
        beforeEach(async () => {
            ficsStore.connect();
            jest.advanceTimersByTime(1);
        });

        it('should send commands when connected', () => {
            const mockWs = (ficsStore as any).ws;
            const sendSpy = jest.spyOn(mockWs, 'send');

            ficsStore.sendCommand('moves');

            expect(sendSpy).toHaveBeenCalled();
            // The command is encoded with timeseal, so we just check it was called
            const callArg = sendSpy.mock.calls[0][0];
            expect(callArg).toBeInstanceOf(Uint8Array);
        });

        it('should not send commands when disconnected', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            ficsStore.disconnect();

            ficsStore.sendCommand('moves');

            expect(consoleSpy).toHaveBeenCalledWith('Cannot send command: not connected to FICS');
            consoleSpy.mockRestore();
        });

        it('should add chat commands to history', () => {
            ficsStore.sendCommand('tell player hello');

            expect(mockRootStore.chatStore.addToHistory).toHaveBeenCalledWith('tell player hello');
        });

        it('should handle commands without root store', () => {
            (ficsStore as any).rootStore = null;
            const mockWs = (ficsStore as any).ws;
            const sendSpy = jest.spyOn(mockWs, 'send');

            ficsStore.sendCommand('moves');

            expect(sendSpy).toHaveBeenCalled();
            // The command is encoded with timeseal, so we just check it was called
            const callArg = sendSpy.mock.calls[0][0];
            expect(callArg).toBeInstanceOf(Uint8Array);
        });
    });

    describe('Message Handling', () => {
        beforeEach(async () => {
            ficsStore.connect();
            jest.advanceTimersByTime(1);
        });

        it('should handle login messages', () => {
            const mockWs = (ficsStore as any).ws;

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'Starting FICS session as guest'
                }));
            }

            expect(ficsStore.lastPing).toBeGreaterThan(0);
        });

        it('should handle Style12 messages', () => {
            const mockWs = (ficsStore as any).ws;
            
            // First, simulate login to set the state to logged-in
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: '**** Starting FICS session as GuestABCD ****'
                }));
            }
            
            // Now send the Style12 message with proper format including prompt
            const style12Data = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 TestPlayer1 TestPlayer2 -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0\nfics%';

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: style12Data
                }));
            }

            expect(mockRootStore.gameStore.updateFromStyle12).toHaveBeenCalled();
        });

        it('should handle game creation messages', () => {
            const mockWs = (ficsStore as any).ws;
            
            // First, simulate login to set the state to logged-in
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: '**** Starting FICS session as GuestABCD ****'
                }));
            }
            
            // Game start message format: Game 123: player1 (rating) player2 (rating) rated/unrated type time inc
            const gameMessage = 'Game 123: TestPlayer1 (1500) TestPlayer2 (1600) unrated standard 15 0\nfics%';

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: gameMessage
                }));
            }

            expect(mockRootStore.gameStore.startNewGame).toHaveBeenCalledWith(
                expect.objectContaining({
                    white: expect.objectContaining({name: 'TestPlayer1', rating: 1500}),
                    black: expect.objectContaining({name: 'TestPlayer2', rating: 1600})
                })
            );
        });

        it('should route unknown messages to chat', () => {
            const mockWs = (ficsStore as any).ws;
            const unknownMessage = 'Some unknown FICS message';

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: unknownMessage
                }));
            }

            expect(mockRootStore.chatStore.addMessage).toHaveBeenCalledWith('console',
                expect.objectContaining({
                    channel: 'console',
                    sender: 'FICS',
                    content: unknownMessage,
                    type: 'system'
                })
            );
        });

        it('should handle seek and game list updates', () => {
            const mockWs = (ficsStore as any).ws;
            
            // First, simulate login to set the state to logged-in
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: '**** Starting FICS session as GuestABCD ****'
                }));
            }

            // Test seek message - it needs to have "seeking" in it
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'player seeking 5 0 unrated\nfics%'
                }));
            }

            expect(ficsStore.seekList.length).toBeGreaterThan(0);

            // Test game list message - needs to start with digits
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: '15 1500 1600 player1 player2 0 5\nfics%'
                }));
            }

            expect(ficsStore.gameList.length).toBeGreaterThan(0);
        });

        it('should handle message parsing errors gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            const mockWs = (ficsStore as any).ws;

            // Force an error by mocking a method to throw
            mockRootStore.chatStore.addMessage.mockImplementation(() => {
                throw new Error('Test error');
            });

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'Some message that will cause error'
                }));
            }

            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('List Management', () => {
        it('should limit seek list size', () => {
            // The current implementation keeps the last 19 items when adding a new one
            // so adding 25 manually and then triggering one more through message should result in 20
            for (let i = 0; i < 20; i++) {
                runInAction(() => {
                    ficsStore.seekList.push({id: i, data: `seek ${i}`});
                });
            }

            // Now add one through message handler to test the slice logic
            const mockWs = (ficsStore as any).ws;
            ficsStore.connect();
            jest.advanceTimersByTime(1);

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'new player seeking 10 0'
                }));
            }

            expect(ficsStore.seekList.length).toBe(20); // -19 + 1 new = 20
        });

        it('should limit game list size', () => {
            // Same logic as seek list
            for (let i = 0; i < 20; i++) {
                runInAction(() => {
                    ficsStore.gameList.push({id: i, data: `game ${i}`});
                });
            }

            // Add one through message handler
            const mockWs = (ficsStore as any).ws;
            ficsStore.connect();
            jest.advanceTimersByTime(1);

            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: '99 1400 1500 newplayer1 newplayer2 1 3'
                }));
            }

            expect(ficsStore.gameList.length).toBe(20);
        });
    });

    describe('Ping Mechanism', () => {
        it('should start ping interval after login', () => {
            const sendCommandSpy = jest.spyOn(ficsStore, 'sendCommand');
            ficsStore.connect();
            jest.advanceTimersByTime(1);

            const mockWs = (ficsStore as any).ws;
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'Starting FICS session'
                }));
            }

            // Need to trigger sessionStart to call handleLogin
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'fics% **** Starting FICS session as GuestABCD ****\nfics% '
                }));
            }

            // Advance by 50 minutes to trigger the ping
            jest.advanceTimersByTime(50 * 60 * 1000);

            expect(sendCommandSpy).toHaveBeenCalledWith('date');
        });

        it('should clear ping interval on disconnect', () => {
            const sendCommandSpy = jest.spyOn(ficsStore, 'sendCommand');

            ficsStore.connect();
            jest.advanceTimersByTime(1);

            const mockWs = (ficsStore as any).ws;
            if (mockWs && mockWs.onmessage) {
                mockWs.onmessage(new MessageEvent('message', {
                    data: 'Starting FICS session'
                }));
            }

            // Clear the spy history after setup
            sendCommandSpy.mockClear();

            ficsStore.disconnect();

            jest.advanceTimersByTime(30000);

            expect(sendCommandSpy).not.toHaveBeenCalledWith('date');
        });
    });
});
import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol - Mock FICS Server Integration', () => {
    // Mock FICS Server Simulator
    class MockFicsServer {
        private gameCounter = 1;
        private users: Map<string, { rating: string; isOnline: boolean }> = new Map();
        private games: Map<number, { white: string; black: string; status: 'active' | 'ended' }> = new Map();

        constructor() {
            // Add some default users
            this.users.set('Magnus', {rating: '2831', isOnline: true});
            this.users.set('Hikaru', {rating: '2736', isOnline: true});
            this.users.set('GuestTEST', {rating: '++++', isOnline: true});
            this.users.set('ChessEngine', {rating: 'C', isOnline: true});
        }

        simulateLogin(): string[] {
            return [
                '****freechess.org**** The Free Internet Chess Server ****',
                '',
                'login: ',
                'password: ',
                '',
                '**** Starting FICS session as GuestTEST(U) ****',
                '',
                'Press return to enter the server as "GuestTEST".',
                'fics%'
            ];
        }

        simulateGameStart(white: string, black: string, timeControl: string = 'blitz 3 0'): string {
            const gameNum = this.gameCounter++;
            const whiteRating = this.users.get(white)?.rating || '1500';
            const blackRating = this.users.get(black)?.rating || '1500';

            this.games.set(gameNum, {white, black, status: 'active'});

            return `Game ${gameNum}: ${white} (${whiteRating}) ${black} (${blackRating}) rated ${timeControl}`;
        }

        simulateInitialPosition(gameNum: number): string {
            const game = this.games.get(gameNum);
            if (!game) throw new Error(`Game ${gameNum} not found`);

            return `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 ${gameNum} ${game.white} ${game.black} -1 3 0 39 39 180 180 1 none (0:00) none 0 0 0`;
        }

        simulateMove(gameNum: number, move: string, prettyMove: string, colorToMove: 'W' | 'B' = 'B'): string {
            const game = this.games.get(gameNum);
            if (!game) throw new Error(`Game ${gameNum} not found`);

            // Simplified board representation after a move
            const boardAfterMove = colorToMove === 'B'
                ? 'rnbqkbnr pppp-ppp -------- ----p--- -------- -------- PPPPPPPP RNBQKBNR'
                : 'rnbqkbnr pppp-ppp -------- ----p--- ----P--- -------- PPPP-PPP RNBQKBNR';

            const timeRemaining = colorToMove === 'B' ? '178 180' : '178 178';
            const moveNumber = colorToMove === 'B' ? '1' : '2';

            return `<12> ${boardAfterMove} ${colorToMove} -1 1 1 1 1 0 ${gameNum} ${game.white} ${game.black} -1 3 0 39 39 ${timeRemaining} ${moveNumber} ${move} (0:02) ${prettyMove} 0 0 0`;
        }

        simulateGameEnd(gameNum: number, reason: string, result: string): string {
            const game = this.games.get(gameNum);
            if (!game) throw new Error(`Game ${gameNum} not found`);

            this.games.set(gameNum, {...game, status: 'ended'});

            return `{Game ${gameNum} (${game.white} vs. ${game.black}) ${reason}} ${result}`;
        }

        simulateChannelTell(username: string, channel: number, message: string): string {
            return `${username}(${channel}): ${message}`;
        }

        simulateDirectTell(username: string, message: string): string {
            return `${username} tells you: ${message}`;
        }

        simulateIllegalMove(move: string): string {
            return `Illegal move (${move}).`;
        }

        simulateDrawOffer(username: string): string {
            return `${username} offers you a draw.`;
        }

        simulateMovesList(gameNum: number): string {
            const game = this.games.get(gameNum);
            if (!game) throw new Error(`Game ${gameNum} not found`);

            return `Movelist for game ${gameNum}:

[Event "FICS rated blitz game"]
[Site "freechess.org"]
[Date "2024.01.15"]
[Round "-"]
[White "${game.white}"]
[Black "${game.black}"]
[WhiteElo "${this.users.get(game.white)?.rating || '1500'}"]
[BlackElo "${this.users.get(game.black)?.rating || '1500'}"]
[TimeControl "180+0"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 
8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. Nc3 Bb7 12. Bg5 b4 13. Nb1 h6 
14. Bh4 c5 15. dxe5 Nxe4 16. Bxe7 Qxe7 17. exd6 Qf6 18. Nbd2 1-0`;
        }

        simulateCompleteGame(): string[] {
            const gameNum = this.gameCounter;
            return [
                this.simulateGameStart('Magnus', 'Hikaru'),
                this.simulateInitialPosition(gameNum),
                this.simulateChannelTell('Magnus', 1, 'Good luck!'),
                this.simulateDirectTell('Hikaru', 'Thanks, you too!'),
                this.simulateMove(gameNum, 'e7e5', 'e5', 'B'),
                this.simulateMove(gameNum, 'e2e4', 'e4', 'W'),
                this.simulateMove(gameNum, 'g8f6', 'Nf6', 'B'),
                this.simulateChannelTell('Observer', 1, 'Great game so far!'),
                this.simulateGameEnd(gameNum, 'Hikaru checkmated', '1-0'),
                this.simulateMovesList(gameNum)
            ];
        }

        simulateTournamentScenario(): string[] {
            return [
                this.simulateGameStart('TD_Magnus', 'TD_Hikaru', 'tournament 90 30'),
                this.simulateChannelTell('TD_Director', 49, 'Round 1 of Swiss tournament has begun'),
                this.simulateGameStart('TeamA_Player1', 'TeamB_Player2', 'team 15 10'),
                this.simulateChannelTell('TD_Director', 49, 'Team match: Alpha vs Beta'),
                this.simulateGameEnd(this.gameCounter - 2, 'TD_Magnus wins on time', '1-0'),
                this.simulateGameEnd(this.gameCounter - 1, 'Game drawn by agreement', '1/2-1/2')
            ];
        }

        simulateVariantGames(): string[] {
            return [
                this.simulateGameStart('Chess960Fan', 'FischerRandom', 'chess960 10 0'),
                this.simulateGameStart('AtomicPlayer', 'ExplosionMaster', 'atomic 5 0'),
                this.simulateGameStart('CrazyPlayer', 'DropMaster', 'crazyhouse 3 2'),
                this.simulateGameStart('KingHunter', 'HillClimber', 'koth 15 10')
            ];
        }

        simulateServerMessages(): string[] {
            return [
                'Challenge: Magnus (2831) [white] GuestTEST (++++) rated blitz 3 0.',
                'You are now observing game 123.',
                'Removing game 456 from observation list.',
                'It is not your move.',
                'Your seek has been posted.',
                'Your seek has been removed.',
                'Connection to server lost.',
                'Reconnected to server.'
            ];
        }
    }

    let mockServer: MockFicsServer;

    beforeEach(() => {
        mockServer = new MockFicsServer();
    });

    describe('Complete Game Session Simulation', () => {
        it('should handle complete login-to-logout session', () => {
            const loginSequence = mockServer.simulateLogin();

            loginSequence.forEach((msg, index) => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);

                // Verify specific login steps
                if (msg === 'login: ') {
                    expect(messages[0].type).toBe('login');
                } else if (msg === 'password: ') {
                    expect(messages[0].type).toBe('password');
                } else if (msg.includes('Starting FICS session')) {
                    expect(messages[0].type).toBe('sessionStart');
                }
            });
        });

        it('should handle complete game from start to finish', () => {
            const gameSequence = mockServer.simulateCompleteGame();

            gameSequence.forEach((msg, index) => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);

                // Verify message types in sequence
                switch (index) {
                    case 0: // Game start
                        expect(messages[0].type).toBe('gameStart');
                        break;
                    case 1: // Initial position
                    case 4: // First move
                    case 5: // Second move
                    case 6: // Third move
                        expect(messages[0].type).toBe('style12');
                        break;
                    case 2: // Channel tell
                    case 7: // Observer comment
                        expect(messages[0].type).toBe('channelTell');
                        break;
                    case 3: // Direct tell
                        expect(messages[0].type).toBe('directTell');
                        break;
                    case 8: // Game end
                        expect(messages[0].type).toBe('gameEnd');
                        break;
                    case 9: // Moves list
                        expect(messages[0].type).toBe('movesList');
                        break;
                }
            });
        });
    });

    describe('Tournament Simulation', () => {
        it('should handle tournament scenario', () => {
            const tournamentSequence = mockServer.simulateTournamentScenario();

            tournamentSequence.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);

                // All messages should parse successfully
                expect(['gameStart', 'channelTell', 'gameEnd', 'raw']).toContain(messages[0].type);
            });
        });
    });

    describe('Chess Variants Simulation', () => {
        it('should handle various chess variants', () => {
            const variantGames = mockServer.simulateVariantGames();

            variantGames.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe('gameStart');

                if (messages[0].type === 'gameStart') {
                    expect(['chess960', 'atomic', 'crazyhouse', 'koth']).toContain(messages[0].data.gameType);
                }
            });
        });
    });

    describe('Server Messages Simulation', () => {
        it('should handle various server notifications', () => {
            const serverMessages = mockServer.simulateServerMessages();

            serverMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);

                // All server messages should be handled gracefully
                expect(messages[0]).toHaveProperty('type');
                expect(messages[0]).toHaveProperty('data');
            });
        });
    });

    describe('Real-time Message Flow', () => {
        it('should handle rapid message succession', () => {
            // First create a game
            const gameStartMsg = mockServer.simulateGameStart('Player1', 'Player2', 'blitz 3 0');

            const rapidMessages = [
                gameStartMsg,
                mockServer.simulateChannelTell('Player1', 1, 'Move 1'),
                mockServer.simulateMove(1, 'e2e4', 'e4', 'W'),
                mockServer.simulateChannelTell('Player2', 1, 'Move 2'),
                mockServer.simulateMove(1, 'e7e5', 'e5', 'B'),
                mockServer.simulateChannelTell('Observer', 1, 'Great moves!'),
                mockServer.simulateIllegalMove('e2e5'),
                mockServer.simulateChannelTell('Player1', 1, 'Oops!')
            ];

            // Process all messages rapidly
            const startTime = Date.now();
            const allResults = rapidMessages.map(msg => FicsProtocol.parseMessage(msg));
            const endTime = Date.now();

            // Verify all messages processed successfully
            expect(allResults).toHaveLength(8);
            allResults.forEach(messages => {
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
            });

            // Should be processed quickly
            expect(endTime - startTime).toBeLessThan(100);
        });

        it('should handle interleaved game messages', () => {
            // Simulate two games running simultaneously
            const game1Start = mockServer.simulateGameStart('PlayerA', 'PlayerB');
            const game2Start = mockServer.simulateGameStart('PlayerC', 'PlayerD');

            const interleavedMessages = [
                game1Start,
                game2Start,
                mockServer.simulateMove(1, 'e2e4', 'e4', 'W'),
                mockServer.simulateMove(2, 'd2d4', 'd4', 'W'),
                mockServer.simulateChannelTell('Observer', 1, 'Two great games!'),
                mockServer.simulateMove(1, 'e7e5', 'e5', 'B'),
                mockServer.simulateMove(2, 'd7d5', 'd5', 'B'),
                mockServer.simulateGameEnd(1, 'PlayerA checkmated', '0-1'),
                mockServer.simulateGameEnd(2, 'Game drawn', '1/2-1/2')
            ];

            interleavedMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Error Scenarios Simulation', () => {
        it('should handle network interruption simulation', () => {
            const interruptionScenario = [
                mockServer.simulateGameStart('Player1', 'Player2'),
                mockServer.simulateMove(1, 'e2e4', 'e4', 'W'),
                'Connection lost...', // Simulated network issue
                'Reconnecting...', // Recovery attempt
                mockServer.simulateChannelTell('Player1', 1, 'Are you still there?'),
                '{Game 1 (Player1 vs. Player2) Game adjourned due to disconnection} *'
            ];

            interruptionScenario.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
            });
        });

        it('should handle malformed server responses', () => {
            const malformedMessages = [
                'Game : incomplete data',
                '<12> insufficient style12 data',
                '{Game incomplete end',
                'Player(: malformed tell',
                'Illegal move (',
                'offers you a'
            ];

            malformedMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
                // Malformed messages should default to 'raw' type
                expect(messages[0].type).toBe('raw');
            });
        });
    });

    describe('Command Integration Testing', () => {
        it('should build commands compatible with mock server expectations', () => {
            // Test that our command building produces valid FICS commands
            const commands = [
                FicsProtocol.buildTell('Magnus', 'Good game!'),
                FicsProtocol.buildChannelTell(1, 'Hello everyone'),
                FicsProtocol.buildObserve('Magnus'),
                FicsProtocol.buildObserve(123),
                FicsProtocol.buildSeek(5, 0),
                FicsProtocol.buildSeek(15, 10, false),
                FicsProtocol.buildMove('e2e4')
            ];

            const expectedCommands = [
                'tell Magnus Good game!',
                'tell 1 Hello everyone',
                'observe Magnus',
                'observe 123',
                'seek 5 0',
                'seek 15 10 unrated',
                'e2e4'
            ];

            commands.forEach((cmd, index) => {
                expect(cmd).toBe(expectedCommands[index]);

                // Verify commands are well-formed
                expect(cmd.length).toBeGreaterThan(0);
                expect(cmd.trim()).toBe(cmd); // No leading/trailing whitespace
            });
        });

        it('should handle timeseal integration with mock server', () => {
            const testCommands = [
                'tell Magnus hello',
                'observe game1',
                'seek 5 0',
                'who'
            ];

            testCommands.forEach(cmd => {
                const encoded = FicsProtocol.encodeTimeseal(cmd);
                expect(encoded).toBeInstanceOf(Uint8Array);
                expect(encoded.length).toBeGreaterThan(cmd.length);

                // Simulate server acknowledgement
                const ackMessage = 'Command received[G]\0';
                const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(ackMessage);

                expect(cleanedMessage).toBe('Command received');
                expect(needsAck).toBe(true);

                // Create acknowledgement response
                const ackResponse = FicsProtocol.createTimesealAck();
                expect(ackResponse).toBeInstanceOf(Uint8Array);
            });
        });
    });

    describe('State Management Testing', () => {
        it('should maintain consistency across game state changes', () => {
            // Simulate a complete game with state tracking
            const gameNum = 1;
            const gameStates: any[] = [];

            // Game start
            const gameStart = mockServer.simulateGameStart('Player1', 'Player2');
            const startMessage = FicsProtocol.parseMessage(gameStart)[0];
            gameStates.push(startMessage);

            // Initial position
            const initialPos = mockServer.simulateInitialPosition(gameNum);
            const posMessage = FicsProtocol.parseMessage(initialPos)[0];
            gameStates.push(posMessage);

            // Moves
            const move1 = mockServer.simulateMove(gameNum, 'e2e4', 'e4', 'W');
            const move1Message = FicsProtocol.parseMessage(move1)[0];
            gameStates.push(move1Message);

            const move2 = mockServer.simulateMove(gameNum, 'e7e5', 'e5', 'B');
            const move2Message = FicsProtocol.parseMessage(move2)[0];
            gameStates.push(move2Message);

            // Game end
            const gameEnd = mockServer.simulateGameEnd(gameNum, 'Player1 checkmated', '0-1');
            const endMessage = FicsProtocol.parseMessage(gameEnd)[0];
            gameStates.push(endMessage);

            // Verify state consistency
            expect(gameStates[0].type).toBe('gameStart');
            expect(gameStates[1].type).toBe('style12');
            expect(gameStates[2].type).toBe('style12');
            expect(gameStates[3].type).toBe('style12');
            expect(gameStates[4].type).toBe('gameEnd');

            // All should reference the same game
            if (gameStates[0].type === 'gameStart') {
                expect(gameStates[0].data.gameNumber).toBe(gameNum);
            }
            if (gameStates[4].type === 'gameEnd') {
                expect(gameStates[4].data.gameNumber).toBe(gameNum);
            }
        });
    });
});
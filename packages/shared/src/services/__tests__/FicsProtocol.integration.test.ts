import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol - Integration Tests', () => {
    describe('Real-World FICS Message Parsing', () => {
        it('should parse a complete game session', () => {
            const sessionMessages = [
                // Login sequence
                'login: ',
                'password: ',

                // Session start
                '**** Starting FICS session as TestUser ****',

                // Game start
                'Game 123: Player1 (1500) Player2 (1600) rated standard 15 10',

                // Initial board position
                '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 123 Player1 Player2 -1 15 10 39 39 900 900 1 none (0:00) none 0 0 0',

                // Channel chat
                'Player1(1): Good luck!',
                'Player2(1): You too!',

                // Game move
                '<12> rnbqkbnr pppp-ppp -------- ----p--- -------- -------- PPPPPPPP RNBQKBNR B -1 1 1 1 1 0 123 Player1 Player2 -1 15 10 39 39 898 900 1 e7e5 (0:02) e5 0 0 0',

                // Direct tell
                'Friend tells you: How\'s your game going?',

                // Game end
                '{Game 123 (Player1 vs. Player2) Player2 checkmated} 1-0'
            ];

            sessionMessages.forEach((msg, index) => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);

                switch (index) {
                    case 0: // login
                        expect(messages[0].type).toBe('login');
                        break;
                    case 1: // password
                        expect(messages[0].type).toBe('password');
                        break;
                    case 2: // session start
                        expect(messages[0].type).toBe('sessionStart');
                        break;
                    case 3: // game start
                        expect(messages[0].type).toBe('gameStart');
                        break;
                    case 4: // initial position
                    case 7: // game move
                        expect(messages[0].type).toBe('style12');
                        break;
                    case 5: // channel chat
                    case 6:
                        expect(messages[0].type).toBe('channelTell');
                        break;
                    case 8: // direct tell
                        expect(messages[0].type).toBe('directTell');
                        break;
                    case 9: // game end
                        expect(messages[0].type).toBe('gameEnd');
                        break;
                }
            });
        });
    });

    describe('Protocol Stress Testing', () => {
        it('should handle burst of messages efficiently', () => {
            const burstMessages = [
                'Player1(1): Message 1',
                'Player2(1): Message 2',
                'Player3(1): Message 3',
                'Friend tells you: Direct message',
                'Illegal move (e2e5).',
                'Player4 offers you a draw.',
                'Removing game 42 from observation list.'
            ];

            const startTime = Date.now();

            // Parse each message 100 times
            for (let i = 0; i < 100; i++) {
                burstMessages.forEach(msg => {
                    const messages = FicsProtocol.parseMessage(msg);
                    expect(messages).toHaveLength(1);
                });
            }

            const endTime = Date.now();
            expect(endTime - startTime).toBeLessThan(200); // Should be fast
        });

        it('should parse complex multi-game scenario', () => {
            const complexScenario = `Game 100: Player1 (1800) Player2 (1750) rated blitz 5 0
<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 100 Player1 Player2 -1 5 0 39 39 300 300 1 none (0:00) none 0 0 0
Player1(50): Anyone want to play next?
Game 101: Player3 (1600) Player4 (1650) unrated standard 15 10
{Game 100 (Player1 vs. Player2) Player1 wins on time} 1-0`;

            const messages = FicsProtocol.parseMessage(complexScenario);

            // Should parse multiple different message types
            const types = messages.map(m => m.type);
            expect(types).toContain('gameStart');
            expect(types).toContain('style12');
            expect(types).toContain('channelTell');
            expect(types).toContain('gameEnd');
        });
    });

    describe('Command Building Integration', () => {
        it('should build various FICS commands correctly', () => {
            const commands = [
                {fn: () => FicsProtocol.buildTell('opponent', 'Good game!'), expected: 'tell opponent Good game!'},
                {fn: () => FicsProtocol.buildChannelTell(1, 'Hello channel'), expected: 'tell 1 Hello channel'},
                {fn: () => FicsProtocol.buildObserve('grandmaster'), expected: 'observe grandmaster'},
                {fn: () => FicsProtocol.buildObserve(123), expected: 'observe 123'},
                {fn: () => FicsProtocol.buildSeek(5, 0), expected: 'seek 5 0'},
                {fn: () => FicsProtocol.buildSeek(15, 10, false), expected: 'seek 15 10 unrated'},
                {fn: () => FicsProtocol.buildMove('e2e4'), expected: 'e2e4'}
            ];

            commands.forEach(({fn, expected}) => {
                expect(fn()).toBe(expected);
            });
        });
    });

    describe('Timeseal Integration', () => {
        it('should handle full timeseal workflow', () => {
            const config = FicsProtocol.getTimesealConfig();
            expect(config.connectString).toBeDefined();
            expect(config.key).toBeDefined();

            // Test encoding
            const message = 'tell friend hello';
            const encoded = FicsProtocol.encodeTimeseal(message);
            expect(encoded).toBeInstanceOf(Uint8Array);
            expect(encoded.length).toBeGreaterThan(message.length);

            // Test acknowledgement handling
            const msgWithAck = 'Hello[G]\0World';
            const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(msgWithAck);
            expect(cleanedMessage).toBe('HelloWorld');
            expect(needsAck).toBe(true);

            // Test ack creation
            const ack = FicsProtocol.createTimesealAck();
            expect(ack).toBeInstanceOf(Uint8Array);
        });
    });

    describe('Message Cleanup Integration', () => {
        it('should properly clean various message types', () => {
            const testCases = [
                {
                    input: 'Normal message',
                    expectedClean: 'Normal message',
                    expectedFiltered: 'Normal message'
                },
                {
                    input: 'Message\u0007with\u0007bells',
                    expectedBell: true,
                    expectedCleanBell: 'Messagewithbells'
                },
                {
                    input: 'Message\n\rwith\n\\line\nbreaks',
                    expectedCleanup: 'Message\nwith\nline\nbreaks\n'
                },
                {
                    input: '\u201CHello\u201D world\u2019s \u2026',
                    expectedOutgoing: '"Hello" world\'s ...'
                }
            ];

            testCases.forEach(testCase => {
                if (testCase.expectedClean) {
                    const {filtered} = FicsProtocol.filterInvalidCharacters(testCase.input);
                    expect(filtered).toBe(testCase.expectedFiltered);
                }

                if (testCase.expectedBell) {
                    expect(FicsProtocol.containsBell(testCase.input)).toBe(true);
                    expect(FicsProtocol.removeBell(testCase.input)).toBe(testCase.expectedCleanBell);
                }

                if (testCase.expectedCleanup) {
                    expect(FicsProtocol.cleanupMessage(testCase.input)).toBe(testCase.expectedCleanup);
                }

                if (testCase.expectedOutgoing) {
                    expect(FicsProtocol.cleanupOutgoingMessage(testCase.input)).toBe(testCase.expectedOutgoing);
                }
            });
        });
    });

    describe('Error Recovery', () => {
        it('should gracefully handle malformed inputs', () => {
            const malformedInputs = [
                '',
                '   ',
                null,
                undefined,
                'Game incomplete:',
                'Player(: malformed',
                '<12> insufficient parts',
                '{Game incomplete',
                'Illegal move (',
                'offers you a draw'
            ];

            malformedInputs.forEach(input => {
                expect(() => {
                    const messages = FicsProtocol.parseMessage(input as any);
                    expect(Array.isArray(messages)).toBe(true);
                    expect(messages.length).toBeGreaterThan(0);
                }).not.toThrow();
            });
        });

        it('should maintain performance with large inputs', () => {
            const largeInput = 'A'.repeat(50000);

            const startTime = Date.now();
            const messages = FicsProtocol.parseMessage(largeInput);
            const endTime = Date.now();

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
            expect(endTime - startTime).toBeLessThan(2000); // Allow up to 2 seconds for large inputs
        });
    });

    describe('Type Safety', () => {
        it('should return properly typed message objects', () => {
            const testMessages = [
                {input: 'Player(1): Hello', expectedType: 'channelTell'},
                {input: 'Friend tells you: Hi', expectedType: 'directTell'},
                {input: 'Game 123: A (1500) B (1600) rated blitz 3 0', expectedType: 'gameStart'},
                {input: '{Game 123 (A vs. B) A resigns} 0-1', expectedType: 'gameEnd'},
                {input: 'Illegal move (e2e5).', expectedType: 'illegalMove'},
                {input: 'Player offers you a draw.', expectedType: 'drawOffer'}
            ];

            testMessages.forEach(({input, expectedType}) => {
                const messages = FicsProtocol.parseMessage(input);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe(expectedType);
                expect(messages[0].data).toBeDefined();
            });
        });
    });
});
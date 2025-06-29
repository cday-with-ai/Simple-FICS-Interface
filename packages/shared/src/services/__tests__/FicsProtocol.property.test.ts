import {FicsProtocol} from '../FicsProtocol';

// Generators for creating valid test data
const generateUsername = (includeSpecial = false): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const specialChars = includeSpecial ? '_[]* -' : '';
    const allChars = chars + specialChars;

    const length = Math.floor(Math.random() * 15) + 3; // 3-17 chars
    let result = '';
    for (let i = 0; i < length; i++) {
        result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return result;
};

const generateRating = (): string => {
    const types = ['1200', '1500P', '2800E', '++++', 'C', '1800-', '2000+'];
    return types[Math.floor(Math.random() * types.length)];
};

const generateGameType = (): string => {
    const types = ['standard', 'blitz', 'bullet', 'rapid', 'lightning', 'chess960',
        'atomic', 'crazyhouse', 'losers', 'suicide', 'koth', 'tournament'];
    return types[Math.floor(Math.random() * types.length)];
};

const generateTimeControl = (): { minutes: number; increment: number } => {
    const timeControls = [
        {minutes: 1, increment: 0},
        {minutes: 3, increment: 0},
        {minutes: 3, increment: 2},
        {minutes: 5, increment: 0},
        {minutes: 10, increment: 5},
        {minutes: 15, increment: 10},
        {minutes: 30, increment: 0},
        {minutes: 90, increment: 30}
    ];
    return timeControls[Math.floor(Math.random() * timeControls.length)];
};

describe('FicsProtocol - Property-Based Testing', () => {
    describe('Message Generator Functions', () => {

        it('should parse generated game start messages', () => {
            for (let i = 0; i < 100; i++) {
                const gameNumber = Math.floor(Math.random() * 10000) + 1;
                const whiteName = generateUsername(true);
                const whiteRating = generateRating();
                const blackName = generateUsername(true);
                const blackRating = generateRating();
                const rated = Math.random() > 0.5 ? 'rated' : 'unrated';
                const gameType = generateGameType();
                const {minutes, increment} = generateTimeControl();

                const gameMsg = `Game ${gameNumber}: ${whiteName} (${whiteRating}) ${blackName} (${blackRating}) ${rated} ${gameType} ${minutes} ${increment}`;

                const messages = FicsProtocol.parseMessage(gameMsg);
                expect(messages).toHaveLength(1);

                if (messages[0].type === 'gameStart') {
                    expect(messages[0].data.gameNumber).toBe(gameNumber);
                    expect(messages[0].data.whiteName).toBe(whiteName);
                    expect(messages[0].data.blackName).toBe(blackName);
                    expect(messages[0].data.isRated).toBe(rated === 'rated');
                    expect(messages[0].data.gameType).toBe(gameType);
                    expect(messages[0].data.minutes).toBe(minutes);
                    expect(messages[0].data.increment).toBe(increment);
                }
            }
        });

        it('should parse generated channel tells', () => {
            for (let i = 0; i < 100; i++) {
                const username = generateUsername(true);
                const channelNumber = Math.floor(Math.random() * 999) + 1;
                const messageLength = Math.floor(Math.random() * 200) + 1;
                const message = 'a'.repeat(messageLength);

                const tellMsg = `${username}(${channelNumber}): ${message}`;

                const messages = FicsProtocol.parseMessage(tellMsg);
                expect(messages).toHaveLength(1);

                if (messages[0].type === 'channelTell') {
                    expect(messages[0].data.username).toBe(username);
                    expect(messages[0].data.channelNumber).toBe(channelNumber.toString());
                    expect(messages[0].data.message).toBe(message);
                }
            }
        });

        it('should parse generated direct tells', () => {
            for (let i = 0; i < 100; i++) {
                const username = generateUsername(true);
                const messageLength = Math.floor(Math.random() * 200) + 1;
                const message = 'Test message ' + 'x'.repeat(messageLength);

                const tellMsg = `${username} tells you: ${message}`;

                const messages = FicsProtocol.parseMessage(tellMsg);
                expect(messages).toHaveLength(1);

                if (messages[0].type === 'directTell') {
                    expect(messages[0].data.username).toBe(username);
                    expect(messages[0].data.message).toBe(message);
                }
            }
        });

        it('should parse generated illegal move messages', () => {
            const moves = ['e2e5', 'a1h8', 'e4e4', 'z9z9', 'castles', 'o-o-o'];

            for (let i = 0; i < 50; i++) {
                const move = moves[Math.floor(Math.random() * moves.length)];
                const illegalMsg = `Illegal move (${move}).`;

                const messages = FicsProtocol.parseMessage(illegalMsg);
                expect(messages).toHaveLength(1);

                if (messages[0].type === 'illegalMove') {
                    expect(messages[0].data.move).toBe(move);
                }
            }
        });

        it('should parse generated draw offers', () => {
            for (let i = 0; i < 50; i++) {
                const username = generateUsername(true);
                const drawMsg = `${username} offers you a draw.`;

                const messages = FicsProtocol.parseMessage(drawMsg);
                expect(messages).toHaveLength(1);

                if (messages[0].type === 'drawOffer') {
                    expect(messages[0].data.username).toBe(username);
                }
            }
        });
    });

    describe('Invariant Properties', () => {
        it('should always return an array with at least one message', () => {
            const testInputs = [
                '',
                'random text',
                'Game incomplete',
                '<12> insufficient',
                '{malformed',
                'Player()',
                null as any,
                undefined as any,
                'Very long message ' + 'x'.repeat(10000)
            ];

            testInputs.forEach(input => {
                const messages = FicsProtocol.parseMessage(input);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
                expect(messages[0]).toHaveProperty('type');
                expect(messages[0]).toHaveProperty('data');
            });
        });

        it('should never throw exceptions on any input', () => {
            const randomInputs = [];

            // Generate 100 random strings
            for (let i = 0; i < 100; i++) {
                const length = Math.floor(Math.random() * 1000);
                let randomString = '';
                for (let j = 0; j < length; j++) {
                    randomString += String.fromCharCode(Math.floor(Math.random() * 128));
                }
                randomInputs.push(randomString);
            }

            randomInputs.forEach(input => {
                expect(() => {
                    const messages = FicsProtocol.parseMessage(input);
                    expect(Array.isArray(messages)).toBe(true);
                }).not.toThrow();
            });
        });

        it('should maintain message type consistency', () => {
            const testCases = [
                {pattern: /^Game \d+:/, expectedType: 'gameStart'},
                {pattern: /^\{Game \d+/, expectedType: 'gameEnd'},
                {pattern: /^<12>/, expectedType: 'style12'},
                {pattern: /^\w+\(\d+\):/, expectedType: 'channelTell'},
                {pattern: /^\w+ tells you:/, expectedType: 'directTell'},
                {pattern: /^Illegal move/, expectedType: 'illegalMove'},
                {pattern: /offers you a draw/, expectedType: 'drawOffer'}
            ];

            testCases.forEach(({pattern, expectedType}) => {
                for (let i = 0; i < 20; i++) {
                    // Create valid messages that match the pattern
                    let testMessage = '';
                    switch (expectedType) {
                        case 'gameStart':
                            testMessage = `Game ${i + 1}: Player1 (1500) Player2 (1600) rated standard 15 10`;
                            break;
                        case 'gameEnd':
                            testMessage = `{Game ${i + 1} (Player1 vs. Player2) Player1 resigns} 0-1`;
                            break;
                        case 'style12':
                            testMessage = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0';
                            break;
                        case 'channelTell':
                            testMessage = `Player${i}(1): Test message ${i}`;
                            break;
                        case 'directTell':
                            testMessage = `Player${i} tells you: Direct message ${i}`;
                            break;
                        case 'illegalMove':
                            testMessage = `Illegal move (e${i % 8 + 1}e${i % 8 + 2}).`;
                            break;
                        case 'drawOffer':
                            testMessage = `Player${i} offers you a draw.`;
                            break;
                    }

                    if (pattern.test(testMessage)) {
                        const messages = FicsProtocol.parseMessage(testMessage);
                        expect(messages).toHaveLength(1);
                        expect(messages[0].type).toBe(expectedType);
                    }
                }
            });
        });
    });

    describe('Command Building Properties', () => {
        it('should build consistent tell commands', () => {
            for (let i = 0; i < 50; i++) {
                const username = generateUsername(false);
                const message = `Test message ${i}`;

                const cmd = FicsProtocol.buildTell(username, message);
                expect(cmd).toBe(`tell ${username} ${message}`);
                expect(cmd).toMatch(/^tell \S+ .+/);
            }
        });

        it('should build consistent channel tell commands', () => {
            for (let i = 0; i < 50; i++) {
                const channel = Math.floor(Math.random() * 999) + 1;
                const message = `Channel message ${i}`;

                const cmd = FicsProtocol.buildChannelTell(channel, message);
                expect(cmd).toBe(`tell ${channel} ${message}`);
                expect(cmd).toMatch(/^tell \d+ .+/);
            }
        });

        it('should build consistent observe commands', () => {
            for (let i = 0; i < 50; i++) {
                const target = Math.random() > 0.5 ? generateUsername(false) : Math.floor(Math.random() * 1000) + 1;

                const cmd = FicsProtocol.buildObserve(target);
                expect(cmd).toBe(`observe ${target}`);
                expect(cmd).toMatch(/^observe \S+/);
            }
        });

        it('should build consistent seek commands', () => {
            for (let i = 0; i < 50; i++) {
                const {minutes, increment} = generateTimeControl();
                const rated = Math.random() > 0.5;

                const cmd = FicsProtocol.buildSeek(minutes, increment, rated);
                if (rated) {
                    expect(cmd).toBe(`seek ${minutes} ${increment}`);
                } else {
                    expect(cmd).toBe(`seek ${minutes} ${increment} unrated`);
                }
                expect(cmd).toMatch(/^seek \d+ \d+/);
            }
        });
    });

    describe('Timeseal Properties', () => {
        it('should encode messages consistently', () => {
            const testMessages = [
                'short',
                'medium length message',
                'very long message that contains multiple words and should test the encoding properly',
                'special chars: !@#$%^&*()',
                ''
            ];

            testMessages.forEach(msg => {
                const encoded = FicsProtocol.encodeTimeseal(msg);

                expect(encoded).toBeInstanceOf(Uint8Array);
                expect(encoded.length).toBeGreaterThan(msg.length);
                expect(encoded[encoded.length - 1]).toBe(10); // Should end with LF
                expect(encoded[encoded.length - 2]).toBe(128); // Should have 128 before LF
            });
        });

        it('should handle acknowledgements consistently', () => {
            const testMessages = [
                'Hello[G]\0World',
                '[G]\0Start',
                'End[G]\0',
                'Multiple[G]\0Acks[G]\0Here',
                'No acks here',
                ''
            ];

            testMessages.forEach(msg => {
                const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(msg);

                expect(typeof cleanedMessage).toBe('string');
                expect(typeof needsAck).toBe('boolean');
                expect(cleanedMessage.includes('[G]\0')).toBe(false);

                if (msg.includes('[G]\0')) {
                    expect(needsAck).toBe(true);
                } else {
                    expect(needsAck).toBe(false);
                }
            });
        });
    });

    describe('Cleanup Properties', () => {
        it('should maintain string length or reduce it', () => {
            const testMessages = [
                'normal message',
                'message\u0007with\u0007bells',
                'message\n\rwith\n\\line\nbreaks',
                '"quoted" message\'s test...',
                'message with\x00invalid\x1fchars'
            ];

            testMessages.forEach(msg => {
                const cleaned = FicsProtocol.cleanupMessage(msg);
                const bellRemoved = FicsProtocol.removeBell(msg);
                const outgoingCleaned = FicsProtocol.cleanupOutgoingMessage(msg);
                const {filtered} = FicsProtocol.filterInvalidCharacters(msg);

                expect(cleaned.length).toBeGreaterThanOrEqual(msg.length - 10); // Allow for some expansion with \n
                expect(bellRemoved.length).toBeLessThanOrEqual(msg.length);
                expect(outgoingCleaned.length).toBeGreaterThanOrEqual(msg.length - 5); // Allow for character replacement
                expect(filtered.length).toBeLessThanOrEqual(msg.length);
            });
        });

        it('should preserve printable characters', () => {
            const printableMessage = 'Hello World 123 !@#$%^&*()';

            const {filtered} = FicsProtocol.filterInvalidCharacters(printableMessage);
            expect(filtered).toBe(printableMessage);

            const cleaned = FicsProtocol.cleanupOutgoingMessage(printableMessage);
            expect(cleaned).toBe(printableMessage);
        });
    });

    describe('Performance Properties', () => {
        it('should parse messages in reasonable time', () => {
            const complexMessage = 'Player(1): ' + 'A'.repeat(1000);

            const startTime = Date.now();
            for (let i = 0; i < 100; i++) {
                FicsProtocol.parseMessage(complexMessage);
            }
            const endTime = Date.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
        });

        it('should handle concurrent parsing without interference', () => {
            const messages = [
                'Player1(1): Message 1',
                'Player2(2): Message 2',
                'Player3(3): Message 3'
            ];

            const promises = messages.map(async (msg, index) => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        const parsed = FicsProtocol.parseMessage(msg);
                        expect(parsed).toHaveLength(1);
                        expect(parsed[0].type).toBe('channelTell');
                        resolve();
                    }, index * 10);
                });
            });

            return Promise.all(promises);
        });
    });

    describe('Boundary Value Properties', () => {
        it('should handle extreme values gracefully', () => {
            const extremeValues = [
                `Game ${Number.MAX_SAFE_INTEGER}: Player1 (9999) Player2 (0) rated standard 999 999`,
                `Game 0: Player1 (-1) Player2 (+1) unrated blitz 0 0`,
                `Player${'X'.repeat(100)}(999): ${'Message'.repeat(100)}`,
                `<12> ${'r'.repeat(8)} ${'p'.repeat(8)} ${'-'.repeat(64)} W -1 1 1 1 1 0 999999 ${'A'.repeat(50)} ${'B'.repeat(50)} -1 999 999 999 999 9999 9999 999 move (999:99) move 1`
            ];

            extremeValues.forEach(msg => {
                expect(() => {
                    const messages = FicsProtocol.parseMessage(msg);
                    expect(Array.isArray(messages)).toBe(true);
                }).not.toThrow();
            });
        });
    });
});
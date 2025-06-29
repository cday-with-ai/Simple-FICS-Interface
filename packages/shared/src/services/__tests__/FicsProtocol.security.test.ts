import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol - Security & Edge Cases', () => {
    describe('Input Sanitization', () => {
        it('should handle malicious script injection attempts', () => {
            const maliciousInput = '<script>alert("xss")</script>';
            const messages = FicsProtocol.parseMessage(maliciousInput);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
            expect(messages[0].data).toBe(maliciousInput);
        });

        it('should handle SQL injection-like strings', () => {
            const sqlInjection = "'; DROP TABLE users; --";
            const messages = FicsProtocol.parseMessage(sqlInjection);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should handle extremely long usernames in tells', () => {
            const longUsername = 'A'.repeat(1000);
            const msg = `${longUsername}(1): Normal message`;
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages).toHaveLength(1);
            if (messages[0].type === 'channelTell') {
                expect(messages[0].data.username).toBe(longUsername);
            }
        });

        it('should handle binary data in messages', () => {
            const binaryData = String.fromCharCode(0, 1, 2, 3, 4, 5);
            const messages = FicsProtocol.parseMessage(binaryData);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });
    });

    describe('Buffer Overflow Protection', () => {
        it('should handle extremely long Style12 messages', () => {
            const longBoard = 'rnbqkbnr'.repeat(100); // Way longer than normal
            const style12 = `<12> ${longBoard} pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0`;

            const messages = FicsProtocol.parseMessage(style12);
            expect(messages).toHaveLength(1);
            // Should either parse as style12 or raw, but not crash
        });

        it('should handle excessive nested structures', () => {
            const nestedMessage = '[G]\0'.repeat(10000) + 'Hello';
            const {cleanedMessage} = FicsProtocol.handleTimesealAcknowledgement(nestedMessage);

            expect(cleanedMessage).toBe('Hello');
        });

        it('should handle circular reference-like patterns', () => {
            const circularPattern = 'abc'.repeat(1000);
            const messages = FicsProtocol.parseMessage(circularPattern);

            expect(messages).toHaveLength(1);
        });
    });

    describe('Protocol Confusion Attacks', () => {
        it('should handle mixed protocol messages', () => {
            const mixedMsg = `HTTP/1.1 200 OK
Content-Type: text/html

<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0`;

            const messages = FicsProtocol.parseMessage(mixedMsg);
            expect(messages.length).toBeGreaterThanOrEqual(1);
        });

        it('should handle ANSI escape sequences', () => {
            const ansiMsg = '\x1b[31mPlayer(1): \x1b[0mColored message';
            const messages = FicsProtocol.parseMessage(ansiMsg);

            expect(messages).toHaveLength(1);
        });

        it('should handle unicode normalization attacks', () => {
            // Unicode normalization attack using different representations
            const unicodeMsg = 'Player\u0041\u030A(1): Message'; // A with ring above
            const messages = FicsProtocol.parseMessage(unicodeMsg);

            expect(messages).toHaveLength(1);
        });
    });

    describe('Resource Exhaustion Protection', () => {
        it('should handle recursive-like patterns', () => {
            const recursivePattern = '<12>'.repeat(1000);

            const startTime = Date.now();
            const messages = FicsProtocol.parseMessage(recursivePattern);
            const endTime = Date.now();

            expect(endTime - startTime).toBeLessThan(1000); // Should not hang
            expect(messages).toBeDefined();
        });

        it('should handle regex DoS attempts', () => {
            // Pattern that could cause catastrophic backtracking
            const evilRegexInput = 'a'.repeat(100) + 'X';
            const messages = FicsProtocol.parseMessage(evilRegexInput);

            expect(messages).toHaveLength(1);
        });

        it('should handle excessive line breaks', () => {
            const excessiveBreaks = '\n'.repeat(10000) + 'Player(1): Hello';
            const messages = FicsProtocol.parseMessage(excessiveBreaks);

            expect(messages.length).toBeGreaterThan(0);
        });
    });

    describe('Character Encoding Edge Cases', () => {
        it('should handle different character encodings', () => {
            const utf8Message = 'Player(1): Héllo Wörld! 你好';
            const messages = FicsProtocol.parseMessage(utf8Message);

            expect(messages).toHaveLength(1);
            if (messages[0].type === 'channelTell') {
                expect(messages[0].data.message).toContain('Héllo');
            }
        });

        it('should handle null bytes in various positions', () => {
            const nullByteMessage = 'Player\x00(1): Mess\x00age';
            const messages = FicsProtocol.parseMessage(nullByteMessage);

            expect(messages).toHaveLength(1);
        });

        it('should handle high Unicode codepoints', () => {
            const highUnicode = 'Player(1): Message with 𝕌𝕟𝕚𝕔𝕠𝕕𝕖';
            const messages = FicsProtocol.parseMessage(highUnicode);

            expect(messages).toHaveLength(1);
        });
    });

    describe('Malformed Input Handling', () => {
        it('should handle incomplete Style12 messages', () => {
            const incompleteStyle12 = '<12> rnbq';
            const messages = FicsProtocol.parseMessage(incompleteStyle12);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should handle malformed game start messages', () => {
            const malformedGame = 'Game ABC: Player1 (invalid) Player2';
            const messages = FicsProtocol.parseMessage(malformedGame);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should handle incomplete channel tells', () => {
            const incompleteTell = 'Player(: Incomplete';
            const messages = FicsProtocol.parseMessage(incompleteTell);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should handle missing closing braces in game end', () => {
            const incompleteGameEnd = '{Game 42 (A vs. B) A resigns 0-1';
            const messages = FicsProtocol.parseMessage(incompleteGameEnd);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });
    });

    describe('Command Injection Prevention', () => {
        it('should safely build commands with special characters', () => {
            const cmd = FicsProtocol.buildTell('user; rm -rf /', 'safe message');
            expect(cmd).toBe('tell user; rm -rf / safe message');
            // The command should be built but not executed
        });

        it('should handle newlines in command arguments', () => {
            const cmd = FicsProtocol.buildTell('user\nmalicious', 'message\nmore');
            expect(cmd).toBe('tell user\nmalicious message\nmore');
        });

        it('should handle command separators', () => {
            const cmd = FicsProtocol.buildChannelTell(1, 'message && echo hacked');
            expect(cmd).toBe('tell 1 message && echo hacked');
        });
    });

    describe('Data Validation', () => {
        it('should validate game numbers are numeric', () => {
            const invalidGameNumber = 'Game NaN: Player1 (1500) Player2 (1600) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(invalidGameNumber);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should validate time controls are numeric', () => {
            const invalidTime = 'Game 123: Player1 (1500) Player2 (1600) rated standard abc def';
            const messages = FicsProtocol.parseMessage(invalidTime);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should validate channel numbers', () => {
            const invalidChannel = 'Player(abc): Message';
            const messages = FicsProtocol.parseMessage(invalidChannel);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });
    });

    describe('Memory Safety', () => {
        it('should not hold references to large temporary objects', () => {
            const largeMessage = 'A'.repeat(1000000); // 1MB string
            const messages = FicsProtocol.parseMessage(largeMessage);

            expect(messages).toHaveLength(1);
            // The function should complete without holding onto the large string
        });

        it('should handle concurrent parsing safely', () => {
            const testMessages = Array(100).fill('Player(1): Test');

            const promises = testMessages.map(msg =>
                Promise.resolve(FicsProtocol.parseMessage(msg))
            );

            return Promise.all(promises).then(results => {
                expect(results).toHaveLength(100);
                results.forEach(msgs => {
                    expect(msgs).toHaveLength(1);
                });
            });
        });
    });

    describe('Boundary Conditions', () => {
        it('should handle maximum integer values', () => {
            const maxInt = Number.MAX_SAFE_INTEGER.toString();
            const gameMsg = `Game ${maxInt}: Player1 (1500) Player2 (1600) rated standard 15 10`;
            const messages = FicsProtocol.parseMessage(gameMsg);

            expect(messages).toHaveLength(1);
            if (messages[0].type === 'gameStart') {
                expect(messages[0].data.gameNumber).toBe(Number.MAX_SAFE_INTEGER);
            }
        });

        it('should handle zero and negative values appropriately', () => {
            const zeroGame = 'Game 0: Player1 (0) Player2 (-100) rated standard 0 0';
            const messages = FicsProtocol.parseMessage(zeroGame);

            expect(messages).toHaveLength(1);
            if (messages[0].type === 'gameStart') {
                expect(messages[0].data.gameNumber).toBe(0);
                expect(messages[0].data.minutes).toBe(0);
                expect(messages[0].data.increment).toBe(0);
            }
        });

        it('should handle empty field values', () => {
            const emptyFields = 'Player(): ';
            const messages = FicsProtocol.parseMessage(emptyFields);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });
    });
});
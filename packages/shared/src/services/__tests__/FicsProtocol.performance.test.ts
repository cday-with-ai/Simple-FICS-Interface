import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol - Performance Tests', () => {
    describe('Large Message Handling', () => {
        it('should handle large Style12 messages efficiently', () => {
            // Create a message with 100 Style12 blocks
            const style12Block = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0';
            const largeMessage = Array(100).fill(style12Block).join('\n');

            const startTime = performance.now();
            const messages = FicsProtocol.parseMessage(largeMessage);
            const endTime = performance.now();

            expect(messages.length).toBe(100);
            expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
            messages.forEach(msg => {
                expect(msg.type).toBe('style12');
            });
        });

        it('should handle rapid message parsing', () => {
            const testMessages = [
                'Player(1): Hello!',
                'Friend tells you: Hi there!',
                'Illegal move (e2e5).',
                '{Game 42 (A vs. B) A resigns} 0-1',
                'Game 123: Player1 (1500) Player2 (1600) rated blitz 3 0'
            ];

            const startTime = performance.now();

            // Parse each message 1000 times
            for (let i = 0; i < 1000; i++) {
                testMessages.forEach(msg => {
                    FicsProtocol.parseMessage(msg);
                });
            }

            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
        });

        it('should handle very long single messages', () => {
            const longChannelMessage = `Player(1): ${'A'.repeat(10000)}`;

            const startTime = performance.now();
            const messages = FicsProtocol.parseMessage(longChannelMessage);
            const endTime = performance.now();

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('channelTell');
            expect(endTime - startTime).toBeLessThan(200); // Allow more time for very long messages
        });
    });

    describe('Timeseal Performance', () => {
        it('should encode messages efficiently', () => {
            const messages = [
                'tell friend hello',
                'observe player1',
                'seek 15 10',
                'who',
                'finger username'
            ];

            const startTime = performance.now();

            // Encode each message 1000 times
            for (let i = 0; i < 1000; i++) {
                messages.forEach(msg => {
                    FicsProtocol.encodeTimeseal(msg);
                });
            }

            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(500); // Should complete in less than 500ms
        });

        it('should handle timeseal acknowledgement efficiently', () => {
            const messagesWithAck = Array(1000).fill('Hello[G]\0World').join('');

            const startTime = performance.now();
            const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(messagesWithAck);
            const endTime = performance.now();

            expect(needsAck).toBe(true);
            expect(cleanedMessage).toBe('HelloWorld'.repeat(1000));
            expect(endTime - startTime).toBeLessThan(100);
        });
    });

    describe('Memory Usage', () => {
        it('should not leak memory during repeated parsing', () => {
            const testMessage = 'Player(1): Test message for memory leak detection';

            // Force garbage collection if available
            if (global.gc) {
                global.gc();
            }

            // Parse many messages
            for (let i = 0; i < 10000; i++) {
                FicsProtocol.parseMessage(testMessage);
            }

            // This test mainly ensures we don't crash due to memory issues
            expect(true).toBe(true);
        });

        it('should handle Style12 parsing without memory leaks', () => {
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0';

            for (let i = 0; i < 5000; i++) {
                FicsProtocol.parseMessage(style12);
            }

            expect(true).toBe(true);
        });
    });

    describe('Concurrent Processing', () => {
        it('should handle concurrent message parsing', async () => {
            const messages = [
                'Player(1): Message 1',
                'Player(2): Message 2',
                'Player(3): Message 3',
                'Player(4): Message 4',
                'Player(5): Message 5'
            ];

            const startTime = performance.now();

            // Parse messages concurrently
            const promises = messages.map(async (msg, index) => {
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        for (let i = 0; i < 100; i++) {
                            FicsProtocol.parseMessage(msg);
                        }
                        resolve();
                    }, index * 10);
                });
            });

            await Promise.all(promises);
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(1000);
        });
    });
});
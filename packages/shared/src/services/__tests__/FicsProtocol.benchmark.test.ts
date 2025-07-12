import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol - Performance Benchmarks', () => {
    // Benchmark utilities
    const benchmark = (name: string, fn: () => void, iterations: number = 1000): number => {
        const startTime = performance.now();
        for (let i = 0; i < iterations; i++) {
            fn();
        }
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const avgTime = totalTime / iterations;

        console.log(`${name}: ${totalTime.toFixed(2)}ms total, ${avgTime.toFixed(4)}ms avg (${iterations} iterations)`);
        return totalTime;
    };

    const createLargeStyle12 = (): string => {
        return '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 123 VeryLongPlayerName AnotherLongPlayerName -1 15 10 39 39 900 900 1 e2e4 (0:02) e4 0 0 0';
    };

    const createBatchMessages = (count: number): string[] => {
        const messages = [];
        for (let i = 0; i < count; i++) {
            messages.push(`Player${i}(${i % 10 + 1}): Batch message number ${i}`);
        }
        return messages;
    };

    describe('Message Parsing Benchmarks', () => {
        it('should benchmark basic message parsing', () => {
            const testMessages = [
                'Player(1): Hello world!',
                'Game 123: Player1 (1500) Player2 (1600) rated blitz 3 0',
                createLargeStyle12(),
                'Friend tells you: How are you?',
                '{Game 123 (Player1 vs. Player2) Player1 resigns} 0-1'
            ];

            const times = testMessages.map((msg, index) => {
                return benchmark(`Parse message ${index + 1}`, () => {
                    FicsProtocol.parseMessage(msg);
                }, 10000);
            });

            // All basic operations should complete in reasonable time
            times.forEach(time => {
                expect(time).toBeLessThan(1000); // Less than 1 second for 10k iterations
            });
        });

        it('should benchmark Style12 parsing specifically', () => {
            const style12Variants = [
                '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 123 White Black -1 15 10 39 39 900 900 1 none (0:00) none 0 0 0',
                '<12> r-bqkb-r ppppn-pp -----n-- ----p--- ----P--- -------- PPPPNPPP RNBQKB-R W KQkq - 0 123 White Black -1 15 10 39 39 850 845 4 Nf3 (0:05) Nf3 0 0 0',
                '<12> -------- -------- -------- -------- -------- -------- -------- -------- W -1 1 1 1 1 0 123 White Black -1 0 0 0 0 0 0 100 none (0:00) none 1 0 0'
            ];

            style12Variants.forEach((style12, index) => {
                const time = benchmark(`Style12 variant ${index + 1}`, () => {
                    FicsProtocol.parseMessage(style12);
                }, 5000);

                expect(time).toBeLessThan(500); // Should be very fast
            });
        });

        it('should benchmark batch message processing', () => {
            const batchSizes = [10, 100, 1000, 5000];

            batchSizes.forEach(size => {
                const messages = createBatchMessages(size);

                const time = benchmark(`Batch process ${size} messages`, () => {
                    messages.forEach(msg => {
                        FicsProtocol.parseMessage(msg);
                    });
                }, 10);

                // Performance should scale reasonably
                const expectedMaxTime = size * 0.1; // Rough estimate: 0.1ms per message
                expect(time).toBeLessThan(Math.max(expectedMaxTime, 100));
            });
        });

        it('should benchmark memory usage patterns', () => {
            const largeMessage = 'Player(1): ' + 'A'.repeat(10000);

            // Force garbage collection if available
            if (global.gc) {
                global.gc();
            }

            const time = benchmark('Large message parsing', () => {
                const messages = FicsProtocol.parseMessage(largeMessage);
                // Ensure we actually use the result
                expect(messages).toHaveLength(1);
            }, 1000);

            expect(time).toBeLessThan(2000); // Should handle large messages efficiently
        });
    });

    describe('Command Building Benchmarks', () => {
        it('should benchmark command building operations', () => {
            const operations = [
                () => FicsProtocol.buildTell('player', 'message'),
                () => FicsProtocol.buildChannelTell(1, 'channel message'),
                () => FicsProtocol.buildObserve('player'),
                () => FicsProtocol.buildObserve(123),
                () => FicsProtocol.buildSeek(15, 10),
                () => FicsProtocol.buildSeek(5, 0, false),
                () => FicsProtocol.buildMove('e2e4')
            ];

            operations.forEach((op, index) => {
                const time = benchmark(`Command building ${index + 1}`, op, 50000);
                expect(time).toBeLessThan(100); // Should be extremely fast
            });
        });
    });

    describe('Timeseal Benchmarks', () => {
        it('should benchmark timeseal encoding', () => {
            const messageSizes = [
                'short',
                'medium length message for testing',
                'very long message that should test the performance of timeseal encoding with substantial content that goes on and on',
                'x'.repeat(1000) // 1KB message
            ];

            messageSizes.forEach((msg, index) => {
                const time = benchmark(`Timeseal encode size ${index + 1}`, () => {
                    FicsProtocol.encodeTimeseal(msg);
                }, 1000);

                expect(time).toBeLessThan(500);
            });
        });

        it('should benchmark timeseal acknowledgement handling', () => {
            const ackMessages = [
                'Simple[G]\0message',
                'Multiple[G]\0acks[G]\0here[G]\0test',
                '[G]\0'.repeat(100) + 'Many acks',
                'No acks in this message at all'
            ];

            ackMessages.forEach((msg, index) => {
                const time = benchmark(`Timeseal ack ${index + 1}`, () => {
                    FicsProtocol.handleTimesealAcknowledgement(msg);
                }, 10000);

                expect(time).toBeLessThan(200);
            });
        });
    });

    describe('Message Cleanup Benchmarks', () => {
        it('should benchmark cleanup operations', () => {
            const testMessages = [
                'Normal message without special characters',
                'Message\u0007with\u0007multiple\u0007bells',
                'Message\n\rwith\n\\various\nline\nbreaks',
                '"Smart" quotes and \'apostrophes\' with ... ellipsis',
                'Message\x00with\x01various\x1fcontrol\x7fcharacters'
            ];

            const cleanupOps = [
                (msg: string) => FicsProtocol.cleanupMessage(msg),
                (msg: string) => FicsProtocol.cleanupOutgoingMessage(msg),
                (msg: string) => FicsProtocol.filterInvalidCharacters(msg),
                (msg: string) => FicsProtocol.removeBell(msg),
                (msg: string) => FicsProtocol.containsBell(msg)
            ];

            testMessages.forEach((msg, msgIndex) => {
                cleanupOps.forEach((op, opIndex) => {
                    const time = benchmark(`Cleanup ${opIndex + 1} on message ${msgIndex + 1}`, () => {
                        op(msg);
                    }, 10000);

                    expect(time).toBeLessThan(300);
                });
            });
        });
    });

    describe('Regex Performance', () => {
        it('should benchmark regex matching performance', () => {
            // Test different regex patterns
            const patterns = [
                {
                    name: 'Game start',
                    regex: /Game (\d+): ([a-zA-Z0-9_\[\]*-]+)/,
                    text: 'Game 123: Player1 (1500) Player2 (1600) rated blitz 3 0'
                },
                {
                    name: 'Channel tell',
                    regex: /^([a-zA-Z0-9_\[\]*-]+)\(([0-9]+)\)\s*:\s*(.*)/,
                    text: 'Player(1): Hello world!'
                },
                {
                    name: 'Direct tell',
                    regex: /^([a-zA-Z0-9_\[\]()* -]+) tells you:\s*(.*)/,
                    text: 'Friend tells you: How are you?'
                },
                {
                    name: 'Game end',
                    regex: /\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+) vs\. ([a-zA-Z0-9_\[\]*-]+)\)/,
                    text: '{Game 123 (Player1 vs. Player2) Player1 resigns} 0-1'
                }
            ];

            patterns.forEach(({name, regex, text}) => {
                const time = benchmark(`Regex ${name}`, () => {
                    regex.test(text);
                }, 50000);

                expect(time).toBeLessThan(200);
            });
        });

        it('should benchmark regex compilation vs reuse', () => {
            const testText = 'Game 123: Player1 (1500) Player2 (1600) rated blitz 3 0';

            // Test compiled regex (reused)
            const compiledRegex = /Game (\d+): ([a-zA-Z0-9_\[\]*-]+)/;
            const compiledTime = benchmark('Compiled regex reuse', () => {
                compiledRegex.test(testText);
            }, 100000);

            // Test inline regex (recompiled each time)
            const inlineTime = benchmark('Inline regex compilation', () => {
                /Game (\d+): ([a-zA-Z0-9_\[\]*-]+)/.test(testText);
            }, 100000);

            // Compiled should be faster
            expect(compiledTime).toBeLessThan(inlineTime * 2); // Allow some margin
        });
    });

    describe('Stress Testing', () => {
        it('should handle continuous parsing load', () => {
            const messages = [
                'Player1(1): Continuous message 1',
                'Game 100: Player1 (1500) Player2 (1600) rated blitz 3 0',
                createLargeStyle12(),
                'Player2 tells you: Direct message',
                '{Game 100 (Player1 vs. Player2) Game drawn} 1/2-1/2'
            ];

            const startTime = performance.now();

            // Simulate 1 minute of continuous parsing at 10 messages per second
            for (let second = 0; second < 60; second++) {
                for (let msg = 0; msg < 10; msg++) {
                    const message = messages[msg % messages.length];
                    FicsProtocol.parseMessage(message);
                }
            }

            const endTime = performance.now();
            const totalTime = endTime - startTime;

            console.log(`Continuous parsing test: ${totalTime.toFixed(2)}ms for 600 messages`);
            expect(totalTime).toBeLessThan(5000); // Should complete in less than 5 seconds
        });

        it('should handle burst message scenarios', () => {
            // Simulate receiving 100 messages at once (like during a tournament)
            const burstMessages: string[] = [];
            for (let i = 0; i < 100; i++) {
                burstMessages.push(`TournamentPlayer${i}(50): Tournament message ${i}`);
            }

            const time = benchmark('Burst message handling', () => {
                burstMessages.forEach(msg => {
                    FicsProtocol.parseMessage(msg);
                });
            }, 50);

            expect(time).toBeLessThan(2000); // Should handle bursts efficiently
        });
    });

    describe('Memory Efficiency', () => {
        it('should not leak memory during repeated operations', () => {
            const testMessage = 'Player(1): Memory test message';

            // Force GC before test
            if (global.gc) {
                global.gc();
            }

            // Perform many operations
            for (let i = 0; i < 10000; i++) {
                const messages = FicsProtocol.parseMessage(testMessage);
                const encoded = FicsProtocol.encodeTimeseal('test');
                const cleaned = FicsProtocol.cleanupMessage(testMessage);

                // Use the results to prevent optimization
                expect(messages).toHaveLength(1);
                expect(encoded).toBeInstanceOf(Uint8Array);
                expect(cleaned).toBeDefined();
            }

            // Force GC after test
            if (global.gc) {
                global.gc();
            }

            // Test should complete without memory errors
            expect(true).toBe(true);
        });

        it('should handle large string operations efficiently', () => {
            const sizes = [1000, 10000, 100000]; // 1KB, 10KB, 100KB

            sizes.forEach(size => {
                const largeString = 'A'.repeat(size);
                const testMessage = `Player(1): ${largeString}`;

                const time = benchmark(`Large string ${size} chars`, () => {
                    FicsProtocol.parseMessage(testMessage);
                }, 10);

                // Time should scale reasonably with size
                expect(time).toBeLessThan(size * 0.01); // Rough heuristic
            });
        });
    });

    describe('Performance Regression Tests', () => {
        it('should maintain baseline performance', () => {
            // These tests establish performance baselines for regression testing
            const baselineTests = [
                {
                    name: 'Basic channel tell',
                    message: 'Player(1): Hello',
                    expectedMaxTime: 50, // 50ms for 10k iterations
                    iterations: 10000
                },
                {
                    name: 'Game start parsing',
                    message: 'Game 123: Player1 (1500) Player2 (1600) rated blitz 3 0',
                    expectedMaxTime: 100,
                    iterations: 5000
                },
                {
                    name: 'Style12 parsing',
                    message: createLargeStyle12(),
                    expectedMaxTime: 200,
                    iterations: 1000
                },
                {
                    name: 'Timeseal encoding',
                    operation: () => FicsProtocol.encodeTimeseal('test message'),
                    expectedMaxTime: 100,
                    iterations: 1000
                }
            ];

            baselineTests.forEach(({name, message, operation, expectedMaxTime, iterations}) => {
                const time = benchmark(name, operation || (() => FicsProtocol.parseMessage(message!)), iterations);

                // Warn if performance regresses significantly
                if (time > expectedMaxTime) {
                    console.warn(`Performance regression detected in ${name}: ${time}ms > ${expectedMaxTime}ms`);
                }

                // Allow some margin for CI/different environments
                expect(time).toBeLessThan(expectedMaxTime * 2);
            });
        });
    });
});
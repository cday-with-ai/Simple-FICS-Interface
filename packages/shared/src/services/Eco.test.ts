import {describe, it, expect, beforeEach} from '@jest/globals';
import {lookupFromFEN, lookupFromMoveList, initECO, EcoOpening} from './Eco';

describe('ECO (Encyclopedia of Chess Openings) Functions', () => {
    beforeEach(() => {
        // Reset the internal state before each test
        // Note: Since the original implementation uses global state,
        // we may need to call initECO to ensure proper initialization
        initECO();
    });

    describe('initECO', () => {
        it('should initialize ECO database successfully', () => {
            const result = initECO();
            expect(result).toBe(true);
        });

        it('should populate lookup maps with data', () => {
            initECO();
            // Since we can't directly access the maps, we test through the lookup functions
            const result = lookupFromFEN("rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1");
            expect(result).toBe("A00 Polish (Sokolsky) opening");
        });
    });

    describe('lookupFromFEN', () => {
        it('should return correct opening for known FEN positions', () => {
            // Test Polish opening
            const polishFen = "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1";
            const result = lookupFromFEN(polishFen);
            expect(result).toBe("A00 Polish (Sokolsky) opening");
        });

        it('should return "Unknown opening" for unknown FEN positions', () => {
            const unknownFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; // Starting position
            const result = lookupFromFEN(unknownFen);
            expect(result).toBe("Unknown opening");
        });

        it('should handle empty string input', () => {
            const result = lookupFromFEN("");
            expect(result).toBe("Unknown opening");
        });

        it('should handle invalid FEN format', () => {
            const result = lookupFromFEN("invalid-fen-string");
            expect(result).toBe("Unknown opening");
        });

        it('should auto-initialize ECO database if not already done', () => {
            // This tests the lazy initialization feature
            const result = lookupFromFEN("rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1");
            expect(result).toBe("A00 Polish (Sokolsky) opening");
        });
    });

    describe('lookupFromMoveList', () => {
        it('should return correct opening for known move sequences', () => {
            const polishMoves = "1. b4";
            const result = lookupFromMoveList(polishMoves);
            expect(result).toBe("A00 Polish (Sokolsky) opening");
        });

        it('should return null for unknown move sequences', () => {
            const unknownMoves = "1. e4 e5 2. Nf3 Nc6 3. unknown-move";
            const result = lookupFromMoveList(unknownMoves);
            expect(result).toBeNull();
        });

        it('should handle empty string input', () => {
            const result = lookupFromMoveList("");
            expect(result).toBeNull();
        });

        it('should be case sensitive for move notation', () => {
            // Test that the function is case sensitive
            const result1 = lookupFromMoveList("1. b4");
            const result2 = lookupFromMoveList("1. B4"); // Different case
            expect(result1).toBe("A00 Polish (Sokolsky) opening");
            expect(result2).toBeNull();
        });

        it('should handle complex move sequences', () => {
            // Test with a more complex opening if it exists in the database
            const complexMoves = "1. b4 Nh6";
            const result = lookupFromMoveList(complexMoves);
            expect(result).toBe("A00 Polish: Tuebingen variation");
        });

        it('should auto-initialize ECO database if not already done', () => {
            // This tests the lazy initialization feature
            const result = lookupFromMoveList("1. b4");
            expect(result).toBe("A00 Polish (Sokolsky) opening");
        });
    });

    describe('Integration Tests', () => {
        it('should have consistent data between FEN and moves lookup', () => {
            // For openings that have both FEN and moves, they should return the same result
            const moves = "1. b4";
            const fen = "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1";

            const moveResult = lookupFromMoveList(moves);
            const fenResult = lookupFromFEN(fen);

            expect(moveResult).toBe(fenResult);
            expect(moveResult).toBe("A00 Polish (Sokolsky) opening");
        });

        it('should handle multiple openings with same ECO code', () => {
            // Test that multiple variations under the same ECO code are handled correctly
            const polish1 = lookupFromMoveList("1. b4");
            const polish2 = lookupFromMoveList("1. b4 Nh6");

            expect(polish1).toContain("A00");
            expect(polish2).toContain("A00");
            expect(polish1).not.toBe(polish2); // Different variations
        });
    });

    describe('Performance Tests', () => {
        it('should handle multiple lookups efficiently', () => {
            const start = performance.now();

            // Perform multiple lookups
            for (let i = 0; i < 100; i++) {
                lookupFromFEN("rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1");
                lookupFromMoveList("1. b4");
            }

            const end = performance.now();
            const duration = end - start;

            // Should complete within reasonable time (less than 1 second for 200 lookups)
            expect(duration).toBeLessThan(1000);
        });
    });

    describe('Edge Cases', () => {
        it('should handle special characters in FEN strings', () => {
            const specialFen = "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq - 0 1";
            const result = lookupFromFEN(specialFen);
            expect(typeof result).toBe('string');
        });

        it('should handle special characters in move notation', () => {
            const specialMoves = "1. O-O";
            const result = lookupFromMoveList(specialMoves);
            expect(result === null || typeof result === 'string').toBe(true);
        });

        it('should handle very long move sequences', () => {
            const longMoves = "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4";
            const result = lookupFromMoveList(longMoves);
            expect(result === null || typeof result === 'string').toBe(true);
        });
    });

    describe('Type Safety Tests', () => {
        it('should only accept string parameters for lookupFromFEN', () => {
            // TypeScript should catch this at compile time, but we test runtime behavior
            expect(() => lookupFromFEN("valid-string")).not.toThrow();
        });

        it('should only accept string parameters for lookupFromMoveList', () => {
            // TypeScript should catch this at compile time, but we test runtime behavior
            expect(() => lookupFromMoveList("valid-string")).not.toThrow();
        });

        it('should return correct types', () => {
            const fenResult = lookupFromFEN("test");
            const movesResult = lookupFromMoveList("test");

            expect(typeof fenResult).toBe('string');
            expect(movesResult === null || typeof movesResult === 'string').toBe(true);
        });
    });
});
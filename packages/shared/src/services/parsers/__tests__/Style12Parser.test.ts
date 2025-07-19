import { Style12Parser } from '../game/Style12Parser';

describe('Style12Parser', () => {
    let parser: Style12Parser;

    beforeEach(() => {
        parser = new Style12Parser();
    });

    describe('canParse', () => {
        it('should return true for messages containing <12>', () => {
            expect(parser.canParse('<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 TestPlayer Opponent 1 5 0 39 39 300 300 1 none (0:00) none 0 0 0')).toBe(true);
        });

        it('should return false for messages without <12>', () => {
            expect(parser.canParse('This is a regular message')).toBe(false);
        });
    });

    describe('parse', () => {
        it('should parse a standard Style12 message', () => {
            const message = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 TestPlayer Opponent 1 5 0 39 39 300 300 1 none (0:00) none 0 0 0';
            const result = parser.parse(message);

            expect(result).not.toBeNull();
            expect(result?.metadata).toMatchObject({
                board: [
                    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['-', '-', '-', '-', '-', '-', '-', '-'],
                    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
                ],
                colorToMove: 'W',
                gameNumber: 1,
                whiteName: 'TestPlayer',
                blackName: 'Opponent'
            });
        });

        it('should parse Style12 message with <b1> holdings', () => {
            const message = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 TestPlayer Opponent 1 5 0 39 39 300 300 1 none (0:00) none 0 0 0\n<b1> 1 PN [pn]';
            const result = parser.parse(message);

            expect(result).not.toBeNull();
            expect(result?.metadata).toMatchObject({
                gameNumber: 1,
                whiteHoldings: 'PN',
                blackHoldings: 'pn'
            });
        });

        it('should parse Style12 message with empty <b1> holdings', () => {
            const message = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 TestPlayer Opponent 1 5 0 39 39 300 300 1 none (0:00) none 0 0 0\n<b1> 1  []';
            const result = parser.parse(message);

            expect(result).not.toBeNull();
            expect(result?.metadata).toMatchObject({
                gameNumber: 1,
                whiteHoldings: '',
                blackHoldings: ''
            });
        });

        it('should ignore <b1> message for different game number', () => {
            const message = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 TestPlayer Opponent 1 5 0 39 39 300 300 1 none (0:00) none 0 0 0\n<b1> 2 PN [pn]';
            const result = parser.parse(message);

            expect(result).not.toBeNull();
            expect(result?.metadata).toMatchObject({
                gameNumber: 1
            });
            expect(result?.metadata?.whiteHoldings).toBeUndefined();
            expect(result?.metadata?.blackHoldings).toBeUndefined();
        });

        it('should handle Style12 without <b1> message', () => {
            const message = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 TestPlayer Opponent 1 5 0 39 39 300 300 1 none (0:00) none 0 0 0';
            const result = parser.parse(message);

            expect(result).not.toBeNull();
            expect(result?.metadata?.whiteHoldings).toBeUndefined();
            expect(result?.metadata?.blackHoldings).toBeUndefined();
        });
    });
});
import { GameNotificationParser } from '../GameNotificationParser';

describe('GameNotificationParser', () => {
    let parser: GameNotificationParser;
    
    beforeEach(() => {
        parser = new GameNotificationParser();
    });
    
    it('should parse game notification messages', () => {
        const message = 'Game notification: mukulakivi (1406) vs. Naomi (1444) rated blitz 3 0: Game 14';
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        
        expect(result).not.toBeNull();
        expect(result?.metadata).toEqual({
            gameNumber: 14,
            whiteName: 'mukulakivi',
            whiteRating: '1406',
            blackName: 'Naomi',
            blackRating: '1444',
            isRated: true,
            gameType: 'blitz',
            minutes: 3,
            increment: 0
        });
        
        // Check interactive elements - entire line should be clickable
        expect(result?.elements).toHaveLength(1);
        
        // Entire line is clickable to observe the game
        const gameElement = result?.elements?.[0];
        expect(gameElement?.type).toBe('command');
        expect(gameElement?.text).toBe(message.trim());
        expect(gameElement?.action).toBe('observe 14');
    });
    
    it('should handle unrated games', () => {
        const message = 'Game notification: PlayerA (1500) vs. PlayerB (1600) unrated standard 15 10: Game 42';
        
        const result = parser.parse(message);
        
        expect(result?.metadata?.isRated).toBe(false);
        expect(result?.metadata?.gameType).toBe('standard');
        expect(result?.metadata?.minutes).toBe(15);
        expect(result?.metadata?.increment).toBe(10);
        expect(result?.metadata?.gameNumber).toBe(42);
    });
    
    it('should not parse non-game notification messages', () => {
        const message = 'Notification: PlayerA has arrived.';
        
        expect(parser.canParse(message)).toBe(false);
        expect(parser.parse(message)).toBeNull();
    });
});
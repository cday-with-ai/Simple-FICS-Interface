import { GamesParser } from '../GamesParser';

describe('GamesParser', () => {
    let parser: GamesParser;
    
    beforeEach(() => {
        parser = new GamesParser();
    });
    
    it('should parse games output with player names', () => {
        const message = `  14 1406 mukulakivi    1444 Naomi          [ br  3   0]   1:39 -  1:47 (39-39) W: 19
  27 1851 GuestXYZZ     1794 BlunderKing(C) [ br  5   0]   3:14 -  2:58 (38-38) W: 14

   2 games displayed.`;
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        
        expect(result).not.toBeNull();
        expect(result?.elements).toBeDefined();
        
        // Should have elements for: game 14 number, mukulakivi, Naomi, game 27 number, GuestXYZZ, BlunderKing
        const elements = result?.elements || [];
        
        // Check first game elements
        const game14Elements = elements.filter(e => e.start < 100);
        
        // Game number 14
        const game14Num = game14Elements.find(e => e.type === 'gameNumber' && e.text === '14');
        expect(game14Num).toBeDefined();
        expect(game14Num?.action).toBe('observe 14');
        
        // White player
        const white14 = game14Elements.find(e => e.type === 'player' && e.text === 'mukulakivi');
        expect(white14).toBeDefined();
        expect(white14?.action).toBe('finger mukulakivi');
        
        // Black player
        const black14 = game14Elements.find(e => e.type === 'player' && e.text === 'Naomi');
        expect(black14).toBeDefined();
        expect(black14?.action).toBe('finger Naomi');
        
        // Check second game elements - the second line starts after the first line
        // Game number 27
        const game27Num = elements.find(e => e.type === 'gameNumber' && e.text === '27');
        expect(game27Num).toBeDefined();
        expect(game27Num?.action).toBe('observe 27');
        
        // Player with title - should strip (C) for the action
        const blackWithTitle = elements.find(e => e.type === 'player' && e.text === 'BlunderKing');
        expect(blackWithTitle).toBeDefined();
        expect(blackWithTitle?.action).toBe('finger BlunderKing');
    });
    
    it('should handle games with special ratings', () => {
        const message = `  42 ---- GuestABC      ++++ SuperGM(GM)    [ lr  1   0]   0:59 -  0:58 (14-14) B:  3

   1 game displayed.`;
        
        const result = parser.parse(message);
        
        expect(result).not.toBeNull();
        
        const elements = result?.elements || [];
        
        // Should still parse player names even with ---- and ++++ ratings
        const guestElement = elements.find(e => e.type === 'player' && e.text === 'GuestABC');
        expect(guestElement).toBeDefined();
        
        const gmElement = elements.find(e => e.type === 'player' && e.text === 'SuperGM');
        expect(gmElement).toBeDefined();
        expect(gmElement?.action).toBe('finger SuperGM'); // Title stripped from action
    });
    
    it('should handle FICS line endings correctly', () => {
        // Using actual FICS format with \n\r line endings
        const message = "\n\r  3 (Exam. 1573 AFCERGY     1482 elrukapill) [pbr  3   0] B: 46\n\r  6 ++++ GuestWDBZ   ++++ GuestQYGG  [ bu  5   2]   4:30 -  4:35 (35-38) B:  9\n\r  8 ++++ GuestWFGM   ++++ GuestKNJJ  [ bu 10   5]  10:10 - 10:04 (35-35) W:  7\n\r\n\r  3 games displayed.\n\r";
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        
        expect(result).not.toBeNull();
        expect(result?.elements).toBeDefined();
        
        const elements = result?.elements || [];
        
        // Should have elements for all 3 games
        // Game 3 is examination mode, should not have player elements but may have observe command
        const game3Elements = elements.filter(e => e.text === '3' && e.type === 'gameNumber');
        expect(game3Elements.length).toBeGreaterThan(0);
        
        // Game 6 should have player elements
        const game6Num = elements.find(e => e.type === 'gameNumber' && e.text === '6');
        expect(game6Num).toBeDefined();
        
        const guestWDBZ = elements.find(e => e.type === 'player' && e.text === 'GuestWDBZ');
        expect(guestWDBZ).toBeDefined();
        
        const guestQYGG = elements.find(e => e.type === 'player' && e.text === 'GuestQYGG');
        expect(guestQYGG).toBeDefined();
        
        // Game 8 should also have player elements
        const game8Num = elements.find(e => e.type === 'gameNumber' && e.text === '8');
        expect(game8Num).toBeDefined();
    });
});
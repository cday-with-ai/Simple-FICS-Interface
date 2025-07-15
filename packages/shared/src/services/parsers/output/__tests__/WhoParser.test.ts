import { WhoParser } from '../WhoParser';

describe('WhoParser', () => {
    let parser: WhoParser;
    
    beforeEach(() => {
        parser = new WhoParser();
    });
    
    it('should parse who output with player names', () => {
        const message = `2902 Abysses(C)          1602^Shengdaana           985.borell              ++++:GuestFBLN(U)
2731 BorkaTower(C)       1579.omomom              ----.abuseBOT(TD)        ++++^GuestHRWR(U)

   4 players displayed (of 4). (*) indicates system administrator.`;
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        
        expect(result).not.toBeNull();
        expect(result?.metadata?.totalPlayers).toBe(4);
        
        // Check that players were parsed
        const players = result?.metadata?.players || [];
        expect(players.length).toBeGreaterThan(0);
        
        // Check for specific players
        const abysses = players.find(p => p.handle === 'Abysses');
        expect(abysses).toBeDefined();
        expect(abysses?.blitz).toBe(2902);
        
        const shengdaana = players.find(p => p.handle === 'Shengdaana');
        expect(shengdaana).toBeDefined();
        expect(shengdaana?.blitz).toBe(1602);
        expect(shengdaana?.status).toContain('idle');
        
        // Check interactive elements
        const elements = result?.elements || [];
        expect(elements.length).toBeGreaterThan(0);
        
        // Check that player names are clickable
        const abyssesElement = elements.find(e => e.type === 'player' && e.text === 'Abysses');
        expect(abyssesElement).toBeDefined();
        expect(abyssesElement?.action).toBe('finger Abysses');
    });
    
    it('should handle status indicators', () => {
        const message = ` 1234.inactive          2345^idle               3456:playing           
 4567#examining         5678~simul              6789&admin             

   6 players displayed.`;
        
        const result = parser.parse(message);
        const players = result?.metadata?.players || [];
        
        expect(players.find(p => p.handle === 'inactive')?.status).toContain('inactive');
        expect(players.find(p => p.handle === 'idle')?.status).toContain('idle');
        expect(players.find(p => p.handle === 'playing')?.status).toContain('playing');
        expect(players.find(p => p.handle === 'examining')?.status).toContain('examining');
        expect(players.find(p => p.handle === 'simul')?.status).toContain('simul');
        expect(players.find(p => p.handle === 'admin')?.status).toContain('admin');
    });
});
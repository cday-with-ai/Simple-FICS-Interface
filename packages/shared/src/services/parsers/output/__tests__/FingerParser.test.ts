import { FingerParser } from '../FingerParser';

describe('FingerParser', () => {
    let parser: FingerParser;
    
    beforeEach(() => {
        parser = new FingerParser();
    });
    
    it('should parse finger output with URLs and quoted commands', () => {
        const message = `Finger of BOTCHvinik:

On for: 1 day, 9 hrs, 8 mins   Idle: 8 mins

 1: More information at www.thechessemporium.weebly.com/channelbot.html
 2: Visit http://thechessemporium.weebly.com/ for details
 3: Try "tell channelbot join 348" to join the biking channel
 4: Use 'help intro_basics' for more information`;
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        expect(result).not.toBeNull();
        if (!result) return;
        
        expect(result.elements).toBeDefined();
        expect(result.elements!.length).toBeGreaterThan(0);
        
        // Should find the player name
        const playerElement = result.elements!.find(e => e.type === 'player');
        expect(playerElement?.text).toBe('BOTCHvinik');
        
        // Should find URLs (both with and without protocol)
        const urlElements = result.elements!.filter(e => e.type === 'url') || [];
        expect(urlElements.length).toBe(2);
        
        // Check www URL without protocol
        const wwwUrl = urlElements.find(e => e.text.includes('www.thechessemporium'));
        expect(wwwUrl).toBeDefined();
        expect(wwwUrl?.action).toBe('https://www.thechessemporium.weebly.com/channelbot.html');
        
        // Check http URL
        const httpUrl = urlElements.find(e => e.text.includes('http://'));
        expect(httpUrl).toBeDefined();
        expect(httpUrl?.action).toBe('http://thechessemporium.weebly.com/');
        
        // Should find quoted commands
        const commandElements = result.elements!.filter(e => e.type === 'command') || [];
        expect(commandElements.length).toBe(2);
        
        // Check double-quoted command
        const tellCommand = commandElements.find(e => e.text.includes('tell channelbot'));
        expect(tellCommand).toBeDefined();
        expect(tellCommand?.action).toBe('tell channelbot join 348');
        
        // Check single-quoted command
        const helpCommand = commandElements.find(e => e.text.includes('help intro_basics'));
        expect(helpCommand).toBeDefined();
        expect(helpCommand?.action).toBe('help intro_basics');
    });
    
    it('should handle not logged in message', () => {
        const message = 'cday is not logged in.';
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        expect(result).not.toBeNull();
        if (!result) return;
        
        expect(result.metadata?.player).toBe('cday');
        
        // Should create player element
        expect(result.elements).toBeDefined();
        const playerElement = result.elements!.find(e => e.type === 'player');
        expect(playerElement?.text).toBe('cday');
    });
    
    it('should handle multiple URLs in one line', () => {
        const message = `Finger of TestPlayer:

 9: Check http://chessdb.sourceforge.net/ and http://scid.sourceforge.net/index.html`;
        
        const result = parser.parse(message);
        if (!result) return;
        
        const urlElements = result.elements?.filter(e => e.type === 'url') || [];
        expect(urlElements.length).toBe(2);
        expect(urlElements[0].action).toBe('http://chessdb.sourceforge.net/');
        expect(urlElements[1].action).toBe('http://scid.sourceforge.net/index.html');
    });
});
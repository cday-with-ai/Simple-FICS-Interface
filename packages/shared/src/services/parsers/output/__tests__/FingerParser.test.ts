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
    
    it('should handle multi-line continuation in finger notes', () => {
        const message = `Finger of TestPlayer:

On for: 10 mins   Idle: 1 min

 1: This is a long note that continues across multiple lines
\\   and should be parsed as a single note with all content
\\   included. Visit www.example.com for more info.
 2: Another note with "tell channelbot help" command
\\   that also continues on the next line
 3: Simple single line note`;
        
        expect(parser.canParse(message)).toBe(true);
        
        const result = parser.parse(message);
        expect(result).not.toBeNull();
        if (!result) return;
        
        // Check that the notes section contains all content including continuations
        const notesSection = result.metadata?.sections.find(s => s.type === 'notes');
        expect(notesSection).toBeDefined();
        expect(notesSection?.content).toContain('continues across multiple lines');
        expect(notesSection?.content).toContain('and should be parsed');
        expect(notesSection?.content).toContain('continues on the next line');
        
        // Should find URL in multi-line note
        const urlElements = result.elements?.filter(e => e.type === 'url') || [];
        expect(urlElements.length).toBe(1);
        expect(urlElements[0].action).toBe('https://www.example.com');
        
        // Should find command in multi-line note
        const commandElements = result.elements?.filter(e => e.type === 'command') || [];
        expect(commandElements.length).toBe(1);
        expect(commandElements[0].action).toBe('tell channelbot help');
    });
    
    it('should handle FICS line endings in multi-line notes', () => {
        const message = "Finger of TestPlayer:\n\r\n\r 1: First line of note\n\r\\   continuation with FICS line ending\n\r 2: Second note";
        
        const result = parser.parse(message);
        expect(result).not.toBeNull();
        if (!result) return;
        
        const notesSection = result.metadata?.sections.find(s => s.type === 'notes');
        expect(notesSection).toBeDefined();
        expect(notesSection?.content).toContain('First line of note');
        expect(notesSection?.content).toContain('continuation with FICS line ending');
    });
});
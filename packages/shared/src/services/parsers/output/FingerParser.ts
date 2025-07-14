import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, FingerOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class FingerParser extends BaseParser {
    name = 'fingerOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^\s*Finger of\s+\w+/m) || 
               !!message.match(/^\w+\s+is\s+not\s+logged\s+in/m);
    }
    
    parse(message: string): ParsedMessage<FingerOutputData> | null {
        const lines = this.splitLines(message);
        
        // Check for "not logged in" message
        const notLoggedInMatch = message.match(/^(\w+)\s+is\s+not\s+logged\s+in/m);
        if (notLoggedInMatch) {
            const player = notLoggedInMatch[1];
            const elements: InteractiveElement[] = [];
            elements.push(ParserUtils.createPlayerElement(player, message.indexOf(player)));
            
            return {
                content: message,
                elements,
                metadata: {
                    player,
                    sections: [{
                        type: 'header',
                        content: message
                    }]
                }
            };
        }
        
        // Look for finger header
        const headerMatch = lines[0].match(/^\s*Finger of\s+(\w+)(?:\([^)]*\))?/);
        if (!headerMatch) return null;
        
        const player = headerMatch[1];
        const sections: FingerOutputData['sections'] = [];
        const elements: InteractiveElement[] = [];
        
        // Add player element in header
        const playerIndex = message.indexOf(player);
        if (playerIndex !== -1) {
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
        }
        
        // Parse sections and find interactive elements
        let currentSection: FingerOutputData['sections'][0] | null = null;
        let offset = 0;
        
        for (const line of lines) {
            if (line.match(/^\s*Finger of\s+\w+/)) {
                currentSection = { type: 'header', content: line };
                sections.push(currentSection);
            } else if (line.includes('Sanctions :')) {
                currentSection = { type: 'sanctions', content: line };
                sections.push(currentSection);
            } else if (line.includes('rating:') || line.includes('RD:')) {
                if (!currentSection || currentSection.type !== 'ratings') {
                    currentSection = { type: 'ratings', content: line };
                    sections.push(currentSection);
                } else {
                    currentSection.content += '\n' + line;
                }
            } else if (line.match(/^\s*\d+:\s*/)) {
                // Finger notes - check for URLs
                const urlsInLine = ParserUtils.findUrlsInText(line);
                for (const url of urlsInLine) {
                    elements.push({
                        ...url,
                        start: offset + url.start,
                        end: offset + url.end
                    });
                }
                
                if (!currentSection || currentSection.type !== 'notes') {
                    currentSection = { type: 'notes', content: line };
                    sections.push(currentSection);
                } else {
                    currentSection.content += '\n' + line;
                }
            } else if (line.trim() && currentSection) {
                // Add to current section
                currentSection.content += '\n' + line;
            }
            
            offset += line.length + 1; // +1 for newline
        }
        
        return {
            content: message,
            elements,
            metadata: { player, sections }
        };
    }
}
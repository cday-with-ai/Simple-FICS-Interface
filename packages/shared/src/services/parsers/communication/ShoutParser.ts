import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class ShoutParser extends BaseParser {
    name = 'shout';
    priority = 70;
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ username: string; message: string }> | null {
        const parsed = this.parse(message);
        if (!parsed) return parsed;
        
        // Add to console with proper color
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: parsed.content,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'shout',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        return !!message.match(/^\w+(?:\([^)]*\))*\s+shouts:/m);
    }
    
    parse(message: string): ParsedMessage<{ username: string; message: string }> | null {
        const lines = this.splitLines(message);
        
        // Handle multi-line shouts
        let fullMessage = '';
        let username = '';
        let firstLineMatch: RegExpMatchArray | null = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (i === 0) {
                // First line should contain the shout pattern
                // Match username with optional titles in parentheses
                firstLineMatch = line.match(/^(\w+(?:\([^)]*\))*)\s+shouts:\s*(.*)$/);
                if (!firstLineMatch) return null;
                
                username = firstLineMatch[1];
                fullMessage = firstLineMatch[2];
            } else if (line.trim().startsWith('\\')) {
                // Continuation line
                fullMessage += '\n ' + line.replace(/^\\\s*/, '');
            } else {
                // Not a continuation line, stop processing
                break;
            }
        }
        
        if (!firstLineMatch || !username) return null;
        
        const elements: InteractiveElement[] = [];
        
        // Add player element - use the full username with titles for correct positioning
        elements.push(ParserUtils.createPlayerElement(username, 0));
        
        // Add URLs in the message
        const urlElements = ParserUtils.findUrlsInText(fullMessage);
        // Adjust URL positions to account for username and "shouts: "
        const offset = lines[0].indexOf(fullMessage);
        urlElements.forEach(el => {
            el.start += offset;
            el.end += offset;
        });
        elements.push(...urlElements);
        
        return {
            content: message,
            elements,
            metadata: { username, message: fullMessage }
        };
    }
}
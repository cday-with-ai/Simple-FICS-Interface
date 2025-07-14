import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, GamesOutputData } from '../../FicsProtocol.types';

export class GamesParser extends BaseParser {
    name = 'gamesOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return message.includes('games displayed') && 
               !!message.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})/m);
    }
    
    parse(message: string): ParsedMessage<GamesOutputData> | null {
        const lines = this.splitLines(message);
        const entries: GamesOutputData['entries'] = [];
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        
        for (const line of lines) {
            // Skip headers, footers, and empty lines
            if (line.includes('games displayed') || line.trim() === '') {
                offset += line.length + 1;
                continue;
            }
            
            // Check if this line starts with a game number
            const gameMatch = line.match(/^\s*(\d+)\s+/);
            if (gameMatch) {
                const gameNum = gameMatch[1];
                
                // Make the entire line clickable to observe the game
                elements.push(this.createCommandElement(
                    line.trim(),
                    `observe ${gameNum}`,
                    offset
                ));
            }
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { entries }
        };
    }
    
    private createCommandElement(text: string, command: string, start: number): InteractiveElement {
        return {
            type: 'command',
            text,
            action: command,
            start,
            end: start + text.length
        };
    }
}
import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, GamesOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class GamesParser extends BaseParser {
    name = 'gamesOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return message.includes('games displayed') && 
               !!message.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})/m);
    }
    
    parse(message: string): ParsedMessage<GamesOutputData> | null {
        // Don't use splitLines - work with the original message to preserve exact positions
        const entries: GamesOutputData['entries'] = [];
        const elements: InteractiveElement[] = [];
        
        // Split on actual line endings to preserve structure
        const lineEndings = message.includes('\n\r') ? '\n\r' : '\n';
        const lines = message.split(lineEndings);
        
        let offset = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Skip headers, footers, and empty lines
            if (line.includes('games displayed') || line.trim() === '') {
                offset += line.length + (i < lines.length - 1 ? lineEndings.length : 0);
                continue;
            }
            
            // Check if this line starts with a game number
            const gameMatch = line.match(/^\s*(\d+)\s+/);
            if (gameMatch) {
                const gameNum = gameMatch[1];
                
                // Make the entire game line clickable to observe the game
                const trimmedLine = line.trim();
                const lineStartIndex = line.indexOf(trimmedLine);
                elements.push(ParserUtils.createCommandElement(
                    trimmedLine,
                    `observe ${gameNum}`,
                    offset + lineStartIndex
                ));
            }
            
            // Update offset - include line ending length except for last line
            offset += line.length + (i < lines.length - 1 ? lineEndings.length : 0);
        }
        
        return {
            content: message,
            elements,
            metadata: { entries }
        };
    }
}
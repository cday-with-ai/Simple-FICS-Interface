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
                
                // Parse the game line to extract player names
                // Format: "14 1406 mukulakivi    1444 Naomi          [ br  3   0]   1:39 -  1:47 (39-39) W: 19"
                const gameLineRegex = /^\s*\d+\s+(\d{3,4}|----|\+{4})\s+(\w+(?:\([^)]*\))*)\s+(\d{3,4}|----|\+{4})\s+(\w+(?:\([^)]*\))*)/;
                const gameLineMatch = line.match(gameLineRegex);
                
                if (gameLineMatch) {
                    const [, , white, , black] = gameLineMatch;
                    
                    // Strip titles for the action but keep them in the display
                    const whiteClean = this.stripTitles(white);
                    const blackClean = this.stripTitles(black);
                    
                    // Add white player element
                    const whiteIndex = offset + line.indexOf(white);
                    elements.push(ParserUtils.createPlayerElement(whiteClean, whiteIndex));
                    
                    // Add black player element
                    const blackIndex = offset + line.indexOf(black, whiteIndex + white.length);
                    elements.push(ParserUtils.createPlayerElement(blackClean, blackIndex));
                    
                    // Add game number element
                    const gameNumIndex = offset + line.indexOf(gameNum);
                    elements.push(ParserUtils.createGameNumberElement(gameNum, parseInt(gameNum), gameNumIndex));
                } else {
                    // Fallback: make the entire line clickable to observe the game
                    elements.push(ParserUtils.createCommandElement(
                        line.trim(),
                        `observe ${gameNum}`,
                        offset
                    ));
                }
            }
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { entries }
        };
    }
}
import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, InOutputData } from '../../FicsProtocol.types';

export class InParser extends BaseParser {
    name = 'inOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^\w+\s+is\s+in\s+the\s+following|^\w+\s+is\s+(not available|idle|active|in|playing)/m) || 
               !!message.match(/^(Total|Channels|Games|Shouts|All|Players|Other):/m);
    }
    
    parse(message: string): ParsedMessage<InOutputData> | null {
        const lines = this.splitLines(message);
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        for (const line of lines) {
            // Find player names in "in" output
            // Look for patterns like "username is active" or "username is playing game 123"
            const playerMatch = line.match(/^([*\w_\[\]{}%]+)\s+(?:is not available|is idle|is active|is in|is playing|\*\*UNKNOWN\*\*)/);
            if (playerMatch) {
                const playerName = playerMatch[1];
                const playerIndex = offset + line.indexOf(playerName);
                elements.push(this.createPlayerElement(playerName, playerIndex));
                
                // Look for game numbers in "is playing game X"
                const gameMatch = line.match(/is playing game (\d+)/);
                if (gameMatch) {
                    const gameNumber = parseInt(gameMatch[1]);
                    const gameIndex = offset + line.indexOf(gameMatch[1]);
                    elements.push(this.createGameNumberElement(gameMatch[1], gameNumber, gameIndex));
                }
            }
            
            // Find any URLs in the line
            const urls = this.findUrlsInText(line);
            urls.forEach(url => {
                url.start += offset;
                url.end += offset;
                elements.push(url);
            });
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { content: message }
        };
    }
    
    private createPlayerElement(text: string, start: number): InteractiveElement {
        return {
            type: 'player',
            text,
            action: `finger ${text}`,
            start,
            end: start + text.length
        };
    }
    
    private createGameNumberElement(text: string, gameNumber: number, start: number): InteractiveElement {
        return {
            type: 'gameNumber',
            text,
            action: `observe ${gameNumber}`,
            start,
            end: start + text.length
        };
    }
    
    private findUrlsInText(text: string): InteractiveElement[] {
        const elements: InteractiveElement[] = [];
        const urlRegex = /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;
        let match;
        
        while ((match = urlRegex.exec(text)) !== null) {
            elements.push(this.createUrlElement(match[0], match.index));
        }
        
        return elements;
    }
    
    private createUrlElement(text: string, start: number): InteractiveElement {
        let url = text;
        if (!text.match(/^(?:https?|ftp):\/\//)) {
            url = 'https://' + text;
        }
        return {
            type: 'url',
            text,
            action: url,
            start,
            end: start + text.length
        };
    }
}
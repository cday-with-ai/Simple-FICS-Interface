import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class NotificationParser extends BaseParser {
    name = 'notification';
    priority = 60;
    
    canParse(message: string): boolean {
        return !!message.match(/^Notification:\s+\w+\s+has\s+(arrived|departed)/m) ||
               !!message.match(/has\s+arrived|has\s+departed|notification:|^\*{2}|announcement/i);
    }
    
    parse(message: string): ParsedMessage<{ type: string; player?: string }> | null {
        const lines = this.splitLines(message);
        const elements: InteractiveElement[] = [];
        
        // Check for arrival/departure notifications
        const arrivalMatch = message.match(/^Notification:\s+(\w+)\s+has\s+arrived\./m);
        if (arrivalMatch) {
            const player = arrivalMatch[1];
            const playerIndex = message.indexOf(player);
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
            
            return {
                content: message,
                elements,
                metadata: { type: 'arrival', player }
            };
        }
        
        const departureMatch = message.match(/^Notification:\s+(\w+)\s+has\s+departed\./m);
        if (departureMatch) {
            const player = departureMatch[1];
            const playerIndex = message.indexOf(player);
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
            
            return {
                content: message,
                elements,
                metadata: { type: 'departure', player }
            };
        }
        
        // General notifications - find any player names
        let offset = 0;
        for (const line of lines) {
            // Find player names in notifications
            const playerMatches = line.matchAll(/\b(\w{3,17})\b/g);
            for (const match of playerMatches) {
                const possiblePlayer = match[1];
                // Simple heuristic: if it looks like a player name
                if (!['the', 'and', 'you', 'are', 'has', 'can', 'not', 'for', 'with', 'has', 'arrived', 'departed'].includes(possiblePlayer.toLowerCase())) {
                    const playerIndex = offset + (match.index || 0);
                    elements.push(ParserUtils.createPlayerElement(possiblePlayer, playerIndex));
                }
            }
            
            // Find any URLs
            const urls = ParserUtils.findUrlsInText(line);
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
            metadata: { type: 'notification' }
        };
    }
}
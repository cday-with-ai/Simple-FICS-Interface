import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, GameStart } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class GameNotificationParser extends BaseParser {
    name = 'gameNotification';
    priority = 85; // Higher than NotificationParser but lower than GameStartParser
    
    canParse(message: string): boolean {
        return !!message.match(/^Game notification:/i);
    }
    
    parse(message: string): ParsedMessage<GameStart> | null {
        // Pattern: Game notification: player1 (rating1) vs. player2 (rating2) rated/unrated gameType time inc: Game num
        const match = message.match(/^Game notification:\s+([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\s+\(([0-9+CEP-]+)\)\s+vs\.\s+([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\s+\(([0-9+CEP-]+)\)\s+(rated|unrated)\s+([a-zA-Z0-9-]+)\s+(\d+)\s+(\d+):\s+Game\s+(\d+)/i);
        
        if (!match) {
            return null;
        }
        
        const gameNotification: GameStart = {
            gameNumber: parseInt(match[9]),
            whiteName: this.stripTitles(match[1]),
            whiteRating: match[2],
            blackName: this.stripTitles(match[3]),
            blackRating: match[4],
            isRated: match[5] === 'rated',
            gameType: match[6],
            minutes: parseInt(match[7]),
            increment: parseInt(match[8])
        };
        
        const elements: InteractiveElement[] = [];
        
        // Clean up the message content to avoid duplication issues from line endings
        let cleanContent = message.replace(/\n\r?/g, '').trim();
        
        // Make the entire notification clickable to observe the game
        elements.push({
            type: 'command',
            text: cleanContent,
            action: `observe ${gameNotification.gameNumber}`,
            start: 0,
            end: cleanContent.length
        });
        
        return {
            content: cleanContent,
            elements,
            metadata: gameNotification
        };
    }
}
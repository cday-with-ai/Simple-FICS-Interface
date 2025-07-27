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
        const match = message.match(/Game\s+(\d+)/i);
        
        if (!match) {
            return null;
        }
        
        const gameNumber = parseInt(match[1]);
        
        const elements: InteractiveElement[] = [];
        
        // Make the entire notification clickable to observe the game
        elements.push({
            type: 'command',
            text: message.trim(),
            action: `observe ${gameNumber}`,
            start: 0,
            end: message.trim().length
        });
        
        return {
            content: message,
            elements,
            metadata: { gameNumber }
        };
    }
}
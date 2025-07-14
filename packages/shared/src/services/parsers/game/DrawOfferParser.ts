import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class DrawOfferParser extends BaseParser {
    name = 'drawOffer';
    priority = 85;
    
    canParse(message: string): boolean {
        return !!message.match(/offers you a draw\.$/) ||
               !!message.match(/offers a draw\.$/) ||
               !!message.match(/^You offer a draw\.$/);
    }
    
    parse(message: string): ParsedMessage<{ username?: string }> | null {
        const elements: InteractiveElement[] = [];
        
        // "PlayerName offers you a draw."
        const match = message.match(/^([a-zA-Z0-9_\[\]()* -]+) offers you a draw\.$/);
        if (match) {
            const username = match[1];
            const playerIndex = message.indexOf(username);
            elements.push(ParserUtils.createPlayerElement(username, playerIndex));
            
            return {
                content: message,
                elements,
                metadata: { username }
            };
        }
        
        // "PlayerName offers a draw."
        const offerMatch = message.match(/^([a-zA-Z0-9_\[\]()* -]+) offers a draw\.$/);
        if (offerMatch) {
            const username = offerMatch[1];
            const playerIndex = message.indexOf(username);
            elements.push(ParserUtils.createPlayerElement(username, playerIndex));
            
            return {
                content: message,
                elements,
                metadata: { username }
            };
        }
        
        // "You offer a draw."
        if (message === "You offer a draw.") {
            return {
                content: message,
                elements: [],
                metadata: {}
            };
        }
        
        return null;
    }
}
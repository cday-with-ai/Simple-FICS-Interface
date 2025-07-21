import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class UnobserveParser extends BaseParser {
    name = 'unobserve';
    priority = 85;
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ gameNumber: number }> | null {
        const parsed = this.parse(message);
        if (parsed && parsed.metadata) {
            console.log('[UnobserveParser] Parsed unobserve message:', parsed.metadata);
        }
        return parsed;
    }
    
    canParse(message: string): boolean {
        const canParse = !!message.match(/Removing game \d+ from observation list/);
        if (canParse) {
            console.log('[UnobserveParser] Can parse unobserve message:', message);
        }
        return canParse;
    }
    
    parse(message: string): ParsedMessage<{ gameNumber: number }> | null {
        // This parser handles multiple unobserve messages in one
        const gameNumbers: number[] = [];
        const elements: InteractiveElement[] = [];
        const regex = /Removing game (\d+) from observation list/g;
        let match;

        while ((match = regex.exec(message)) !== null) {
            const gameNumber = parseInt(match[1]);
            gameNumbers.push(gameNumber);
            
            // Add game number as interactive element
            const gameNumIndex = match.index + match[0].indexOf(match[1]);
            elements.push(ParserUtils.createGameNumberElement(match[1], gameNumber, gameNumIndex));
        }
        
        if (gameNumbers.length === 0) return null;
        
        // Return the first game number as primary, but include all in a custom field
        return {
            content: message,
            elements,
            metadata: { 
                gameNumber: gameNumbers[0],
                allGameNumbers: gameNumbers 
            } as any
        };
    }
}
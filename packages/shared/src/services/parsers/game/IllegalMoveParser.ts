import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';

export class IllegalMoveParser extends BaseParser {
    name = 'illegalMove';
    priority = 85;
    
    canParse(message: string): boolean {
        return !!message.match(/Illegal move \([^)]+\)/);
    }
    
    parse(message: string): ParsedMessage<{ move: string }> | null {
        const match = message.match(/Illegal move \(([^)]+)\)/);
        if (!match) return null;
        
        return {
            content: message,
            elements: [],
            metadata: { move: match[1] }
        };
    }
}
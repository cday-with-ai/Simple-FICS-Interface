import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class ObservingGameParser extends BaseParser {
    name = 'observingGame';
    priority = 85; // Higher than other parsers but lower than GameStartParser
    
    override handle(message: string, stores: RootStore): ParsedMessage<null> | null {
        const parsed = this.parse(message);
        if (!parsed) return null;
        
        // Play start sound when beginning to observe a game
        console.log('[ObservingGameParser] Playing game start sound for observation');
        stores.soundStore?.playStart();
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        const canParse = !!message.match(/You are now observing game \d+\./);
        if (message.includes('You are now observing')) {
            console.log('[ObservingGameParser] Checking message:', message.substring(0, 50), 'canParse:', canParse);
        }
        return canParse;
    }
    
    parse(message: string): ParsedMessage<null> | null {
        const match = message.match(/You are now observing game (\d+)\./);
        if (!match) return null;
        
        return {
            content: message,
            elements: [],
            metadata: null
        };
    }
}
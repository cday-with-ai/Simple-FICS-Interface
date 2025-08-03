import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class ChannelToldParser extends BaseParser {
    name = 'channelTold';
    priority = 72; // Higher than ChannelTellParser to catch these first
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ players: number; channel: string }> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        // Simply return the parsed message without adding it to any chat
        // This effectively suppresses the "(told X players in channel Y)" message
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Match "(told X players in channel Y)" format - with or without channel description after
        return !!message.match(/^\(told \d+ players? in channel \d+\)/m);
    }
    
    parse(message: string): ParsedMessage<{ players: number; channel: string }> | null {
        // Match the pattern and capture everything including potential channel description
        // Using /s flag to match across newlines if needed
        const match = message.match(/^\(told (\d+) players? in channel (\d+)\)(.*)$/s);
        if (!match) return null;
        
        const players = parseInt(match[1], 10);
        const channel = match[2];
        
        return {
            content: message,
            elements: [],
            metadata: {
                players,
                channel
            }
        };
    }
}
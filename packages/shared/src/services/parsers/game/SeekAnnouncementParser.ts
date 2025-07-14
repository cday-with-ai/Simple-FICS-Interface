import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, SeekAnnouncementData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class SeekAnnouncementParser extends BaseParser {
    name = 'seekAnnouncement';
    priority = 75;
    
    canParse(message: string): boolean {
        return !!message.match(/\w+(?:\([^)]*\))?\s+\((?:\d+|\+{4})\)\s+seeking.*?\("play\s+\d+"\s+to\s+respond\)/) ||
               !!message.match(/seeking\s+\d+\s+\d+|your\s+seek\s+has\s+been\s+posted/i);
    }
    
    parse(message: string): ParsedMessage<SeekAnnouncementData> | null {
        // Handle individual seek announcements
        const match = message.match(/(\w+(?:\([^)]*\))?)\s+\(((?:\d+|\+{4}))\)\s+seeking\s+(\d+)\s+(\d+)\s+(rated|unrated)\s+(\w+)(?:\s+.*?)?\s*\("play\s+(\d+)"\s+to\s+respond\)/);
        if (match) {
            const [fullMatch, player, rating, time, increment, ratedStr, gameType, seekNumber] = match;
            const elements: InteractiveElement[] = [];
            
            // Make the entire line clickable as a seek
            elements.push({
                type: 'seekNumber',
                text: message.trim(),
                action: `play ${seekNumber}`,
                start: 0,
                end: message.trim().length
            });

            return {
                content: message,
                elements,
                metadata: {
                    player,
                    rating,
                    seekNumber: parseInt(seekNumber),
                    gameType,
                    time: parseInt(time),
                    increment: parseInt(increment),
                    rated: ratedStr === 'rated'
                }
            };
        }
        
        // Handle "your seek has been posted" type messages
        if (message.includes('your seek has been posted')) {
            const elements: InteractiveElement[] = [];
            let seekNumber: number | undefined;
            
            // Try to find seek number
            const seekNumMatch = message.match(/seek\s+(\d+)/i);
            if (seekNumMatch) {
                seekNumber = parseInt(seekNumMatch[1]);
                const seekIndex = message.indexOf(seekNumMatch[1]);
                elements.push(ParserUtils.createSeekNumberElement(seekNumMatch[1], seekNumber, seekIndex));
            }
            
            return {
                content: message,
                elements,
                metadata: { seekNumber } as any
            };
        }
        
        return null;
    }
}
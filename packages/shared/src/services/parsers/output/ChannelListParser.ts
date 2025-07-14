import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, ChannelListOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class ChannelListParser extends BaseParser {
    name = 'channelListOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^Channel\s+\d+:/m) || 
               message.includes('is in the following channels:') ||
               message.includes('channels displayed');
    }
    
    parse(message: string): ParsedMessage<ChannelListOutputData> | null {
        const lines = this.splitLines(message);
        const channels: ChannelListOutputData['channels'] = [];
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        for (const line of lines) {
            // Parse channel info: "Channel 1: Help and General Chat (50 members)"
            const channelMatch = line.match(/^Channel\s+(\d+):\s+([^(]+)(?:\((\d+)\s+members?\))?/);
            if (channelMatch) {
                const [, number, name, memberCount] = channelMatch;
                channels.push({
                    number: parseInt(number),
                    name: name.trim(),
                    members: memberCount ? parseInt(memberCount) : undefined
                });
                
                // Add channel number as clickable
                const numIndex = offset + line.indexOf(number);
                elements.push(ParserUtils.createChannelElement(number, numIndex));
            }
            
            // Parse simple channel list: "1 4 7 50"
            const simpleListMatch = line.match(/^[\d\s]+$/);
            if (simpleListMatch) {
                const channelNumbers = line.match(/\d+/g);
                if (channelNumbers) {
                    channelNumbers.forEach(num => {
                        const numIndex = offset + line.indexOf(num);
                        elements.push(ParserUtils.createChannelElement(num, numIndex));
                        channels.push({ number: parseInt(num), name: '' });
                    });
                }
            }
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { channels }
        };
    }
}
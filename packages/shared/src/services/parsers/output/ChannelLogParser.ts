import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, ChannelLogOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class ChannelLogParser extends BaseParser {
    name = 'channelLog';
    priority = 80;
    
    override handle(message: string, stores: RootStore): ParsedMessage<ChannelLogOutputData> | null {
        const parsed = this.parse(message);
        if (!parsed) return parsed;
        
        // Add to console with proper styling
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: parsed.content,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'channelLog',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        return !!message.match(/^:chLog\(.*?\):/) || 
               !!message.match(/^:Channel \d+ log for the last/m);
    }
    
    parse(message: string): ParsedMessage<ChannelLogOutputData> | null {
        const lines = message.split('\n');
        const elements: InteractiveElement[] = [];
        
        // Parse header
        let channel = '';
        let duration = '';
        let startLine = 0;
        
        // Check for chLog header
        const chLogMatch = lines[0].match(/^:chLog\((.*?)\):/);
        if (chLogMatch) {
            startLine = 2; // Skip chLog line and channel info line
            const channelMatch = lines[1].match(/^:Channel (\d+) log for the last (.+):/);
            if (channelMatch) {
                channel = channelMatch[1];
                duration = channelMatch[2];
            }
        } else {
            // Direct channel log format
            const channelMatch = lines[0].match(/^:Channel (\d+) log for the last (.+):/);
            if (channelMatch) {
                channel = channelMatch[1];
                duration = channelMatch[2];
                startLine = 1;
            }
        }
        
        if (!channel) return null;
        
        // Parse log entries
        const entries: ChannelLogOutputData['entries'] = [];
        let currentOffset = 0;
        
        // Calculate offset to the start of log entries
        for (let i = 0; i < startLine; i++) {
            currentOffset += lines[i].length + 1; // +1 for newline
        }
        
        for (let i = startLine; i < lines.length; i++) {
            const line = lines[i];
            
            // Skip empty lines or lines starting with :
            if (!line.trim() || line.startsWith(':')) {
                currentOffset += line.length + 1;
                continue;
            }
            
            // Match log entry: :[HH:MM:SS] username: message
            const entryMatch = line.match(/^:\[(\d{2}:\d{2}:\d{2})\]\s+(\w+(?:\([^)]*\))*)\s*:\s*(.*)$/);
            if (entryMatch) {
                const [, timestamp, fullUsername, entryMessage] = entryMatch;
                const username = this.stripTitles(fullUsername);
                
                entries.push({
                    timestamp,
                    username,
                    message: entryMessage
                });
                
                // Add player element at the correct position in the full message
                const usernameIndex = currentOffset + line.indexOf(fullUsername);
                elements.push(ParserUtils.createPlayerElement(username, usernameIndex));
            }
            
            currentOffset += line.length + 1;
        }
        
        // Add channel element in header
        if (channel) {
            const channelIndex = message.indexOf(`Channel ${channel}`);
            if (channelIndex !== -1) {
                elements.push({
                    type: 'channelNumber',
                    text: channel,
                    action: `+channel ${channel}`,
                    start: channelIndex + 8, // After "Channel "
                    end: channelIndex + 8 + channel.length
                });
            }
        }
        
        return {
            content: message,
            elements,
            metadata: {
                channel,
                duration,
                entries
            }
        };
    }
}
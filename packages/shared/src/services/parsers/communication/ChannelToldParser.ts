import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class ChannelToldParser extends BaseParser {
    name = 'channelTold';
    priority = 72; // Higher than ChannelTellParser to catch these first
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ players: number; channel: string }> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        const { players, channel } = parsed.metadata;
        const channelId = `channel-${channel}`;
        
        // Add this as a system message to the channel tab if it exists and channels are open in tabs
        if (stores.preferencesStore.preferences.openChannelsInTabs && stores.chatStore.tabs.has(channelId)) {
            stores.chatStore.addMessage(channelId, {
                channel: channelId,
                sender: '',
                content: `(told ${players} players in channel ${channel})`,
                timestamp: new Date(),
                type: 'system',
                metadata: {
                    consoleType: 'channelTold',
                    parsedMessage: parsed
                }
            });
        } else {
            // Otherwise add to console
            stores.chatStore.addMessage('console', {
                channel: 'console',
                sender: 'FICS',
                content: parsed.content,
                timestamp: new Date(),
                type: 'system',
                metadata: {
                    consoleType: 'channelTold',
                    parsedMessage: parsed
                }
            });
        }
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Match "(told X players in channel Y)" format
        return !!message.match(/^\(told \d+ players? in channel \d+\)/m);
    }
    
    parse(message: string): ParsedMessage<{ players: number; channel: string }> | null {
        const match = message.match(/^\(told (\d+) players? in channel (\d+)\)/);
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
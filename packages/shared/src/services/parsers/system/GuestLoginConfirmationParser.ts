import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';
import { runInAction } from 'mobx';

export class GuestLoginConfirmationParser extends BaseParser {
    name = 'guestLoginConfirmation';
    priority = 96; // Higher than normal login parser
    
    canParse(message: string): boolean {
        // Match the guest login confirmation prompt
        return message.includes('Press return to enter the server as');
    }
    
    parse(message: string): ParsedMessage<{ guestName: string }> | null {
        if (!this.canParse(message)) return null;
        
        // Extract the guest name from the message
        const match = message.match(/Press return to enter the server as "([^"]+)":/);
        const guestName = match ? match[1] : 'guest';
        
        return {
            content: message,
            elements: [],
            metadata: { guestName }
        };
    }
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ guestName: string }> | null {
        const parsed = this.parse(message);
        if (!parsed) return parsed;
        
        // Show in console
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: parsed.content,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'guestLoginConfirmation',
                parsedMessage: parsed
            }
        });
        
        // Automatically send empty command (press return) to confirm
        setTimeout(() => {
            stores.ficsStore.sendCommand('');
        }, 100);
        
        return parsed;
    }
}
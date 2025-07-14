import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class PasswordParser extends BaseParser {
    name = 'password';
    priority = 95; // High priority for password prompts
    
    canParse(message: string): boolean {
        // Match if the message contains "password:" 
        // Handle both with and without timeseal control characters
        const cleanMessage = message.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
        return cleanMessage.toLowerCase().includes('password:');
    }
    
    parse(message: string): ParsedMessage<null> | null {
        if (!this.canParse(message)) return null;
        
        // Clean up control characters from timeseal but preserve newlines and carriage returns
        const cleanContent = message.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
        
        return {
            content: cleanContent,
            elements: [],
            metadata: null
        };
    }
    
    override handle(message: string, stores: RootStore): ParsedMessage<null> | null {
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
                consoleType: 'login',
                parsedMessage: parsed
            }
        });
        
        // Auto-login if credentials are available
        if (stores.ficsStore.credentials && stores.ficsStore.credentials.password) {
            stores.ficsStore.sendCommand(stores.ficsStore.credentials.password);
        }
        
        return parsed;
    }
}
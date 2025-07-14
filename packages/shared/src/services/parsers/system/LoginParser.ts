import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';
import { runInAction } from 'mobx';
import { ParserUtils } from '../utils';

export class LoginParser extends BaseParser {
    name = 'login';
    priority = 95; // High priority for login prompts
    
    canParse(message: string): boolean {
        // Match if the message contains "login:" 
        return message.toLowerCase().includes('login:');
    }
    
    parse(message: string): ParsedMessage<null> | null {
        if (!this.canParse(message)) return null;
        
        // Let InteractiveContent handle all element detection universally
        return {
            content: message,
            elements: [],
            metadata: null
        };
    }
    
    override handle(message: string, stores: RootStore): ParsedMessage<null> | null {
        const parsed = this.parse(message);
        if (!parsed) return parsed;
        
        // Update login state
        runInAction(() => {
            stores.ficsStore.loginState = 'logging-in';
        });
        
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
        if (stores.ficsStore.credentials) {
            stores.ficsStore.sendCommand(stores.ficsStore.credentials.username);
        }
        
        return parsed;
    }
}
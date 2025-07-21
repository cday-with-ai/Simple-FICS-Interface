import { BaseParser } from '../BaseParser';
import { ParsedMessage } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';
import { runInAction } from 'mobx';

export class SessionStartParser extends BaseParser {
    name = 'sessionStart';
    priority = 90;
    
    canParse(message: string): boolean {
        return !!message.match(/\*{4} Starting FICS session as ([a-zA-Z0-9]+)/) ||
               !!message.match(/Logging you in as "([a-zA-Z0-9]+)"/);
    }
    
    parse(message: string): ParsedMessage<{ username: string }> | null {
        // Check for regular session start
        const sessionStartMatch = message.match(/\*{4} Starting FICS session as ([a-zA-Z0-9]+)/);
        if (sessionStartMatch) {
            return {
                content: message,
                elements: [],
                metadata: { username: sessionStartMatch[1] }
            };
        }
        
        // Check for guest login pattern
        const guestMatch = message.match(/Logging you in as "([a-zA-Z0-9]+)"/);
        if (guestMatch) {
            return {
                content: message,
                elements: [],
                metadata: { username: guestMatch[1] }
            };
        }
        
        return null;
    }
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ username: string }> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        const { username } = parsed.metadata;
        
        // Handle login
        stores.ficsStore.handleLogin();
        runInAction(() => {
            stores.ficsStore.loginState = 'logged-in';
            stores.ficsStore.user = {
                handle: username,
                rating: {},
                isGuest: username.startsWith('Guest')
            };
        });
        
        // Send post-login commands from preferences
        const commands = stores.preferencesStore.preferences.postLoginCommands;
        if (commands) {
            // Split by newlines and send each non-empty command
            const commandLines = commands.split('\n').filter(cmd => cmd.trim());
            // Add a delay before sending commands to ensure FICS is ready
            setTimeout(() => {
                commandLines.forEach((command, index) => {
                    // Add a small delay between each command
                    setTimeout(() => {
                        stores.ficsStore.sendCommand(command.trim());
                    }, index * 100);
                });
            }, 500);
        }
        
        // Show in console
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: parsed.content,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'sessionStart',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
}
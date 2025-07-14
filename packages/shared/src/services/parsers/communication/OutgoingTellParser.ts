import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, DirectTell } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class OutgoingTellParser extends BaseParser {
    name = 'outgoingTell';
    priority = 80; // Higher priority than DirectTellParser
    
    override handle(message: string, stores: RootStore): ParsedMessage<DirectTell> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        // Strip titles from username
        const cleanUsername = this.stripTitles(parsed.metadata.username);
        const privateTabId = cleanUsername.toLowerCase();
        
        // Check if we should open tells in tabs
        if (stores.preferencesStore.preferences.openTellsInTabs) {
            // Create private tab if it doesn't exist
            stores.chatStore.createTab(
                privateTabId,
                cleanUsername,
                'private'
            );
        }
        
        // Create corrected timestamp
        const now = new Date();
        const isInGMT = now.getTimezoneOffset() === 0;
        let localTime = now;
        
        if (isInGMT) {
            const edtOffset = -4 * 60; // EDT is UTC-4
            localTime = new Date(now.getTime() + (edtOffset * 60 * 1000));
        }
        
        // Add message to appropriate location
        const targetId = stores.preferencesStore.preferences.openTellsInTabs ? privateTabId : 'console';
        stores.chatStore.addMessage(targetId, {
            channel: targetId,
            sender: 'You',
            content: stores.preferencesStore.preferences.openTellsInTabs 
                ? parsed.metadata.message 
                : parsed.content,
            timestamp: localTime,
            type: 'whisper',
            metadata: {
                consoleType: 'outgoingTell',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Match messages that start with "You: tell username message"
        return !!message.match(/^You:\s*tell\s+\w+\s+/m);
    }
    
    parse(message: string): ParsedMessage<DirectTell> | null {
        const lines = this.splitLines(message);
        const elements: InteractiveElement[] = [];
        
        // Match the first line for outgoing tell pattern
        const firstLine = lines[0];
        const tellMatch = firstLine.match(/^You:\s*tell\s+(\w+)\s+(.*)$/);
        if (!tellMatch) return null;
        
        const username = tellMatch[1];
        let fullMessage = tellMatch[2];
        
        // Handle multi-line tells (continuation lines starting with \)
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim().startsWith('\\')) {
                fullMessage += '\n ' + lines[i].replace(/^\\\s*/, '');
            } else {
                break;
            }
        }
        
        // Add player element for the recipient
        const recipientStart = firstLine.indexOf(username);
        elements.push(this.createPlayerElement(username, recipientStart));
        
        // Find URLs in the message
        const urls = this.findUrlsInText(fullMessage);
        const messagePrefixLength = firstLine.indexOf(fullMessage);
        urls.forEach(url => {
            url.start += messagePrefixLength;
            url.end += messagePrefixLength;
            elements.push(url);
        });
        
        return {
            content: message,
            elements,
            metadata: {
                username,
                message: fullMessage
            }
        };
    }
    
    private createPlayerElement(text: string, start: number): InteractiveElement {
        return {
            type: 'player',
            text,
            action: `finger ${text}`,
            start,
            end: start + text.length
        };
    }
    
    private findUrlsInText(text: string): InteractiveElement[] {
        const elements: InteractiveElement[] = [];
        const urlRegex = /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;
        let match;
        
        while ((match = urlRegex.exec(text)) !== null) {
            elements.push(this.createUrlElement(match[0], match.index));
        }
        
        return elements;
    }
    
    private createUrlElement(text: string, start: number): InteractiveElement {
        let url = text;
        if (!text.match(/^(?:https?|ftp):\/\//)) {
            url = 'https://' + text;
        }
        return {
            type: 'url',
            text,
            action: url,
            start,
            end: start + text.length
        };
    }
}
import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, DirectTell } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class DirectTellParser extends BaseParser {
    name = 'directTell';
    priority = 70;
    
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
            sender: cleanUsername,
            content: parsed.content, // Always use the full FICS format
            timestamp: localTime,
            type: 'whisper',
            metadata: {
                consoleType: 'directTell',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Handle multiple parenthetical suffixes like (*)(TD)
        return !!message.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:/m);
    }
    
    parse(message: string): ParsedMessage<DirectTell> | null {
        const lines = this.splitLines(message);
        const elements: InteractiveElement[] = [];
        
        // Match the first line for tell pattern - handle multiple parenthetical suffixes
        const firstLine = lines[0];
        const tellMatch = firstLine.match(/^(\w+)((?:\([^)]*\))*)\s*tells\s+you:\s(.*)$/);
        if (!tellMatch) return null;
        
        const username = tellMatch[1];  // Just the username without parentheses
        let fullMessage = tellMatch[3];
        
        // Handle multi-line tells (continuation lines starting with \)
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim().startsWith('\\')) {
                fullMessage += '\n ' + lines[i].replace(/^\\\s*/, '');
            } else {
                break;
            }
        }
        
        // Don't add elements here - let the renderer handle interactive content detection
        // since we're passing the reformatted message, not the original
        
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
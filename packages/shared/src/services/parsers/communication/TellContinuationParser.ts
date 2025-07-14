import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, DirectTell } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class TellContinuationParser extends BaseParser {
    name = 'tellContinuation';
    priority = 71; // Higher than DirectTellParser and TellReplyParser
    
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
            content: stores.preferencesStore.preferences.openTellsInTabs 
                ? parsed.metadata.message 
                : parsed.content,
            timestamp: localTime,
            type: 'whisper',
            metadata: {
                consoleType: 'tellContinuation',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Match messages that start with ":" followed by a username with optional titles
        // Format: :username(*)(TD) message or :username message
        // Must be in the specific FICS tell continuation format
        return !!message.match(/^:\w+(?:\([^)]*\))*\s/);
    }
    
    parse(message: string): ParsedMessage<DirectTell> | null {
        const lines = this.splitLines(message);
        if (lines.length === 0 || !lines[0].startsWith(':')) return null;
        
        // Match the standard tell continuation format
        const firstLine = lines[0];
        const tellMatch = firstLine.match(/^:(\w+)((?:\([^)]*\))*)\s+(.*)$/);
        if (!tellMatch) return null;
        
        const username = tellMatch[1];
        const titles = tellMatch[2] || '';
        const firstLineContent = tellMatch[3] || '';
        
        // Collect the message from all lines
        const messageLines: string[] = [];
        
        // Add the first line content if any
        if (firstLineContent && firstLineContent.trim()) {
            messageLines.push(firstLineContent);
        }
        
        // Add subsequent lines, stripping the : prefix if present
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].startsWith(':')) {
                messageLines.push(lines[i].substring(1));
            } else {
                messageLines.push(lines[i]);
            }
        }
        
        const messageContent = messageLines.join('\n').trim();
        
        // If there's no actual message content, don't create a message
        if (!messageContent) {
            return null;
        }
        
        const elements: InteractiveElement[] = [];
        
        // Add player element for the sender (skip the initial ":")
        elements.push(this.createPlayerElement(username + titles, 1));
        
        // Find URLs in the message content
        if (messageContent) {
            const urls = this.findUrlsInText(messageContent);
            const messageStartPos = message.indexOf(messageContent);
            urls.forEach(url => {
                url.start += messageStartPos;
                url.end += messageStartPos;
                elements.push(url);
            });
        }
        
        return {
            content: message,
            elements,
            metadata: {
                username,
                message: messageContent
            }
        };
    }
    
    private createPlayerElement(text: string, start: number): InteractiveElement {
        // Extract just the username for the action
        const username = text.match(/^(\w+)/)?.[1] || text;
        return {
            type: 'player',
            text,
            action: `finger ${username}`,
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
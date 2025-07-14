import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, DirectTell } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';
import { runInAction } from 'mobx';

export class TellReplyParser extends BaseParser {
    name = 'tellReply';
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
        
        // If this is just a (told username) confirmation, append it to the last message
        const isToldConfirmation = parsed.metadata.message === `(told ${parsed.metadata.username})`;
        
        if (isToldConfirmation && stores.preferencesStore.preferences.openTellsInTabs) {
            // Find the last message in the target channel
            const tab = stores.chatStore.tabs.get(targetId);
            if (tab && tab.messages.length > 0) {
                const lastMessage = tab.messages[tab.messages.length - 1];
                // If the last message was from "You", append the (told username) to it
                if (lastMessage.sender === 'You') {
                    runInAction(() => {
                        lastMessage.content += ` (told ${parsed.metadata.username})`;
                    });
                    return parsed;
                }
            }
        }
        
        // Otherwise add as a normal message
        stores.chatStore.addMessage(targetId, {
            channel: targetId,
            sender: isToldConfirmation ? '' : cleanUsername,
            content: stores.preferencesStore.preferences.openTellsInTabs 
                ? (isToldConfirmation ? `(told ${parsed.metadata.username})` : parsed.metadata.message)
                : parsed.content,
            timestamp: localTime,
            type: isToldConfirmation ? 'system' : 'whisper',
            metadata: {
                consoleType: 'tellReply',
                parsedMessage: parsed,
                isSystemMessage: isToldConfirmation
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Must start with (told username) pattern
        return !!message.match(/^\(told \w+\)/m);
    }
    
    parse(message: string): ParsedMessage<DirectTell> | null {
        const lines = this.splitLines(message);
        const elements: InteractiveElement[] = [];
        
        // Match the first line for (told username) pattern
        const firstLine = lines[0];
        const toldMatch = firstLine.match(/^\(told (\w+)\)$/);
        if (!toldMatch) return null;
        
        const username = toldMatch[1];
        
        // Collect all lines starting with : as the message content
        const messageLines: string[] = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].startsWith(':')) {
                // Strip the : prefix and add to message
                messageLines.push(lines[i].substring(1));
            }
        }
        
        // Even if no message lines found, we still want to show the (told username) in the tab
        // This happens when FICS sends the reply lines separately
        
        // If we have message lines, join them, otherwise just show the told confirmation
        const fullMessage = messageLines.length > 0 
            ? messageLines.join('\n')
            : `(told ${username})`;
        
        // Add player element for the sender
        elements.push(this.createPlayerElement(username, 6)); // Start after "(told "
        
        // Find URLs in the message
        const urls = this.findUrlsInText(fullMessage);
        const messageStartOffset = firstLine.length + 1; // After (told username)\n
        urls.forEach(url => {
            url.start += messageStartOffset;
            url.end += messageStartOffset;
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
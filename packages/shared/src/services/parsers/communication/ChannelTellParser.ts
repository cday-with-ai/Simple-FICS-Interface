import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, ChannelTell } from '../../FicsProtocol.types';
import { RootStore } from '../../../models/RootStore';

export class ChannelTellParser extends BaseParser {
    name = 'channelTell';
    priority = 70;
    
    override handle(message: string, stores: RootStore): ParsedMessage<ChannelTell> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        const { username, channelNumber, message: tellMessage } = parsed.metadata!;
        const channelId = `channel-${channelNumber}`;
        
        
        // Check if we should open channels in tabs
        if (stores.preferencesStore.preferences.openChannelsInTabs) {
            // Only create tab if it doesn't already exist
            if (!stores.chatStore.tabs.has(channelId)) {
                stores.chatStore.createTab(
                    channelId,
                    channelNumber,
                    'channel'
                );
            }
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
        const targetId = stores.preferencesStore.preferences.openChannelsInTabs ? channelId : 'console';
        stores.chatStore.addMessage(targetId, {
            channel: targetId,
            sender: this.stripTitles(username),
            content: parsed.content, // Always use the full FICS format
            timestamp: localTime,
            type: 'message',
            metadata: {
                consoleType: 'channelTell',
                channelNumber: channelNumber,
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Use multiline mode (m) to match after newlines
        return !!message.match(/^\s*\w+(?:\([^)]*\))*\((\d+)\):/m);
    }
    
    parse(message: string): ParsedMessage<ChannelTell> | null {
        // Normalize line endings from FICS (\n\r or \r\n to just \n)
        const normalizedMessage = message.replace(/\r\n/g, '\n').replace(/\n\r/g, '\n').replace(/\r/g, '\n');
        // Don't use splitLines here as it filters empty lines
        const lines = normalizedMessage.split('\n');
        const elements: InteractiveElement[] = [];
        
        // Find the first non-empty line with channel tell pattern
        let firstLine = '';
        let lineIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim()) {
                firstLine = lines[i];
                lineIndex = i;
                break;
            }
        }
        
        const channelMatch = firstLine.match(/^\s*(\w+(?:\([^)]*\))*)\((\d+)\):\s(.*)$/);
        if (!channelMatch) return null;
        
        const fullUsername = channelMatch[1];
        const username = this.stripTitles(fullUsername);
        const channelNumber = channelMatch[2];
        let fullMessage = channelMatch[3];
        
        // Check if there's a "(told X players...)" line indicating end of multi-line message
        let toldLineIndex = -1;
        for (let i = lineIndex + 1; i < lines.length; i++) {
            if (lines[i].match(/^\(told \d+ players? in channel \d+/)) {
                toldLineIndex = i;
                break;
            }
        }
        
        let continuationFound = false;
        
        if (toldLineIndex > lineIndex + 1) {
            // This is a multi-line channel message
            // Collect all lines between the channel tell and the "told" line
            const messageLines = [fullMessage];
            for (let i = lineIndex + 1; i < toldLineIndex; i++) {
                const line = lines[i];
                // Check if this is a continuation line with backslash
                if (line.match(/^\s*\\/)) {
                    continuationFound = true;
                    // Remove the backslash and preserve the rest
                    const continuationText = line.replace(/^\s*\\/, '').trim();
                    if (continuationText) {
                        // Add to the previous line with a space
                        if (messageLines.length > 0) {
                            messageLines[messageLines.length - 1] += ' ' + continuationText;
                        } else {
                            messageLines.push(continuationText);
                        }
                    }
                } else {
                    // Regular line, add it as-is
                    messageLines.push(line);
                }
            }
            fullMessage = messageLines.join('\n');
        } else {
            // Handle multi-line channel tells (continuation lines starting with \)
            for (let i = lineIndex + 1; i < lines.length; i++) {
                // Check if line starts with backslash after any whitespace
                if (lines[i].match(/^\s*\\/)) {
                    continuationFound = true;
                    // Remove the backslash and leading/trailing whitespace, preserve internal spacing
                    const continuationText = lines[i].replace(/^\s*\\/, '').trim();
                    if (continuationText) {
                        fullMessage += ' ' + continuationText;
                    }
                } else if (continuationFound) {
                    // Stop at first non-continuation line after finding continuations
                    break;
                }
            }
        }
        
        // For channel tabs, we don't need interactive elements in the sender/channel
        // since they're already shown in the tab. Only add elements for console view.
        const isMultiLine = toldLineIndex > lineIndex + 1 || continuationFound;
        if (!isMultiLine) {
            // Only add elements if this is a simple single-line message
            // Multi-line messages have position calculation issues
            
            // Add player element for the sender (in the original message position)
            const usernameIndex = message.indexOf(fullUsername);
            if (usernameIndex !== -1) {
                elements.push(this.createPlayerElement(username, usernameIndex));
            }
            
            // Add channel number as clickable (in the original message position)
            const channelIndex = message.indexOf(`(${channelNumber})`);
            if (channelIndex !== -1) {
                elements.push(this.createChannelElement(channelNumber, channelIndex + 1));
            }
        }
        
        return {
            content: message,
            elements,
            metadata: {
                username,
                channelNumber,
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
    
    private createChannelElement(channelNumber: string, start: number): InteractiveElement {
        return {
            type: 'channelNumber',
            text: channelNumber,
            action: `+channel ${channelNumber}`,
            start,
            end: start + channelNumber.length
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
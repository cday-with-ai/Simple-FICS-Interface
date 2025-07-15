import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, InOutputData } from '../../FicsProtocol.types';

export class InParser extends BaseParser {
    name = 'inOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^\w+\s+is\s+in\s+the\s+following|^\w+\s+is\s+(not available|idle|active|in|playing)/m) || 
               !!message.match(/^(Total|Channels|Games|Shouts|All|Players|Other):/m);
    }
    
    parse(message: string): ParsedMessage<InOutputData> | null {
        const lines = this.splitLines(message);
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        let inChannelList = false;
        
        for (const line of lines) {
            // Check if this is a channel member list
            const channelHeaderMatch = line.match(/^Channel\s+\d+\s+"[^"]+"\s*:/);
            if (channelHeaderMatch) {
                inChannelList = true;
                // Parse player names after the channel header
                const afterHeader = line.substring(channelHeaderMatch[0].length);
                this.parsePlayerNames(afterHeader, offset + channelHeaderMatch[0].length, elements);
            } else if (inChannelList && line.match(/^\s*\\/)) {
                // Continuation line starting with backslash
                const playersLine = line.replace(/^\s*\\/, '');
                this.parsePlayerNames(playersLine, offset + line.indexOf(playersLine), elements);
            } else if (inChannelList && line.match(/^\d+\s+players?\s+are\s+in\s+channel/)) {
                // End of channel list
                inChannelList = false;
            } else {
                // Reset channel list flag if we hit a different type of line
                if (inChannelList && !line.trim()) {
                    // Empty line might be part of channel list
                } else {
                    inChannelList = false;
                }
                
                // Original player matching for "username is active" etc.
                const playerMatch = line.match(/^([*\w_\[\]{}%]+)\s+(?:is not available|is idle|is active|is in|is playing|\*\*UNKNOWN\*\*)/);
                if (playerMatch) {
                    const playerName = playerMatch[1];
                    const playerIndex = offset + line.indexOf(playerName);
                    elements.push(this.createPlayerElement(playerName, playerIndex));
                    
                    // Look for game numbers in "is playing game X"
                    const gameMatch = line.match(/is playing game (\d+)/);
                    if (gameMatch) {
                        const gameNumber = parseInt(gameMatch[1]);
                        const gameIndex = offset + line.indexOf(gameMatch[1]);
                        elements.push(this.createGameNumberElement(gameMatch[1], gameNumber, gameIndex));
                    }
                }
            }
            
            // Find any URLs in the line
            const urls = this.findUrlsInText(line);
            urls.forEach(url => {
                url.start += offset;
                url.end += offset;
                elements.push(url);
            });
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { content: message }
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
    
    private createGameNumberElement(text: string, gameNumber: number, start: number): InteractiveElement {
        return {
            type: 'gameNumber',
            text,
            action: `observe ${gameNumber}`,
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
    
    private parsePlayerNames(text: string, baseOffset: number, elements: InteractiveElement[]): void {
        // Player name pattern: word characters, underscores, or names in curly braces
        // Also handles suffixes like (TD), (U), etc.
        const playerRegex = /\{([^}]+)\}|([a-zA-Z][a-zA-Z0-9_]*(?:\([A-Z]+\))?)/g;
        let match;
        
        while ((match = playerRegex.exec(text)) !== null) {
            const playerName = match[1] || match[2]; // match[1] for {name}, match[2] for regular name
            const fullMatch = match[0];
            const startPos = baseOffset + match.index;
            
            // Skip if this looks like a title suffix without a name
            if (playerName.match(/^\([A-Z]+\)$/)) {
                continue;
            }
            
            // For names with suffixes like "blikII(TD)", extract just the name part
            const nameWithoutSuffix = playerName.replace(/\([A-Z]+\)$/, '');
            
            elements.push({
                type: 'player',
                text: fullMatch, // Keep the full text including {} or (TD) suffix
                action: `finger ${nameWithoutSuffix}`,
                start: startPos,
                end: startPos + fullMatch.length
            });
        }
    }
}
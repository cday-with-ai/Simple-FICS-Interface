import { InteractiveElement } from '../FicsProtocol.types';

export class ParserUtils {
    static createPlayerElement(text: string, start: number): InteractiveElement {
        return {
            type: 'player',
            text,
            action: `finger ${text}`,
            start,
            end: start + text.length
        };
    }

    static createCommandElement(text: string, command: string, start: number): InteractiveElement {
        return {
            type: 'command',
            text,
            action: command,
            start,
            end: start + text.length
        };
    }

    static createGameNumberElement(text: string, gameNumber: number, start: number): InteractiveElement {
        return {
            type: 'gameNumber',
            text,
            action: `observe ${gameNumber}`,
            start,
            end: start + text.length
        };
    }

    static createSeekNumberElement(text: string, seekNumber: number, start: number): InteractiveElement {
        return {
            type: 'seekNumber',
            text,
            action: `play ${seekNumber}`,
            start,
            end: start + text.length
        };
    }

    static createUrlElement(text: string, start: number): InteractiveElement {
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
    
    static createChannelElement(channelNumber: string, start: number): InteractiveElement {
        return {
            type: 'channelNumber',
            text: channelNumber,
            action: `+channel ${channelNumber}`,
            start,
            end: start + channelNumber.length
        };
    }

    static findUrlsInText(text: string): InteractiveElement[] {
        const elements: InteractiveElement[] = [];
        // Only match full URLs with protocol - this is what FICS actually uses for clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/gi;
        let match;
        
        while ((match = urlRegex.exec(text)) !== null) {
            elements.push(this.createUrlElement(match[1], match.index));
        }
        
        return elements;
    }
    
    static findQuotedCommandsInText(text: string): InteractiveElement[] {
        const elements: InteractiveElement[] = [];
        // Match commands in single quotes like 'help intro_basics'
        const commandRegex = /'([^']+)'/g;
        let match;
        
        while ((match = commandRegex.exec(text)) !== null) {
            const command = match[1];
            // Only treat as command if it starts with a word character
            if (/^\w/.test(command)) {
                elements.push(this.createCommandElement(match[0], command, match.index));
            }
        }
        
        return elements;
    }
}
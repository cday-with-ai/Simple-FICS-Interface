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
        // Match URLs with protocol or www. domains
        const urlRegex = /(?:https?:\/\/[^\s]+|www\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
        let match;
        
        while ((match = urlRegex.exec(text)) !== null) {
            elements.push(this.createUrlElement(match[0], match.index));
        }
        
        return elements;
    }
    
    static findQuotedCommandsInText(text: string): InteractiveElement[] {
        const elements: InteractiveElement[] = [];
        // Match commands in single quotes 'command' or double quotes "command"
        const commandRegex = /(['"])([^'"]+)\1/g;
        let match;
        
        while ((match = commandRegex.exec(text)) !== null) {
            const command = match[2];
            // Only treat as command if it starts with a word character (looks like a command)
            if (/^\w/.test(command)) {
                elements.push(this.createCommandElement(match[0], command, match.index));
            }
        }
        
        return elements;
    }
    
    static findPlayersInText(text: string, offset: number = 0): InteractiveElement[] {
        const elements: InteractiveElement[] = [];
        
        // FICS player names pattern: word characters followed by optional titles in parentheses
        // Player names are 3-17 characters, can be followed by titles like (GM), (*), (C), etc.
        const playerRegex = /\b([a-zA-Z][a-zA-Z0-9_]{2,16})(?:\([^)]*\))*/g;
        let match;
        
        // Common words to exclude from being treated as player names
        const excludeWords = new Set([
            'the', 'and', 'you', 'are', 'has', 'can', 'not', 'for', 'with',
            'was', 'will', 'but', 'had', 'have', 'been', 'from', 'this', 'that',
            'game', 'games', 'rated', 'unrated', 'seek', 'match', 'player', 'players',
            'white', 'black', 'draw', 'win', 'loss', 'time', 'move', 'moves',
            'blitz', 'standard', 'lightning', 'bullet', 'wild', 'crazyhouse', 'atomic',
            'chess', 'board', 'piece', 'pieces', 'king', 'queen', 'rook', 'bishop', 'knight', 'pawn',
            'check', 'checkmate', 'stalemate', 'resign', 'flag', 'abort', 'adjourn',
            'tell', 'say', 'shout', 'kibitz', 'whisper', 'channel', 'observe', 'examine',
            'finger', 'history', 'stored', 'journal', 'news', 'help', 'who', 'games', 'sought',
            'message', 'messages', 'notification', 'arrived', 'departed', 'logged', 'disconnected'
        ]);
        
        while ((match = playerRegex.exec(text)) !== null) {
            const playerName = match[1];
            const fullMatch = match[0];
            
            // Skip common English words and FICS commands
            if (excludeWords.has(playerName.toLowerCase())) {
                continue;
            }
            
            // Skip if it looks like a number or time
            if (/^\d+$/.test(playerName)) {
                continue;
            }
            
            const playerIndex = offset + (match.index || 0);
            elements.push(this.createPlayerElement(playerName, playerIndex));
        }
        
        return elements;
    }
}
import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class SystemMessageParser extends BaseParser {
    name = 'system';
    priority = 10; // Very low priority - catches everything else
    
    override handle(message: string, stores: RootStore): ParsedMessage<{ type: string; content: string }> | null {
        const parsed = this.parse(message);
        if (!parsed) return parsed;
        
        // Add to console
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: parsed.content,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'system',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // This parser can parse any message as a last resort
        return true;
    }
    
    parse(message: string): ParsedMessage<{ type: string; content: string }> | null {
        const elements: InteractiveElement[] = [];
        
        // Try to find any player names in system messages
        const playerMatches = message.matchAll(/\b([A-Z][a-zA-Z0-9_]{2,16})\b/g);
        for (const match of playerMatches) {
            const possiblePlayer = match[1];
            // Skip common words and FICS commands
            const commonWords = [
                'The', 'You', 'Your', 'Game', 'White', 'Black', 'Result',
                'Time', 'Rating', 'Type', 'Rated', 'Unrated', 'Standard',
                'Blitz', 'Lightning', 'Wild', 'Crazyhouse', 'Suicide',
                'Atomic', 'Losers', 'Chess', 'FICS', 'Guest', 'Removing',
                'Creating', 'Movelist', 'History', 'Journal', 'Finger',
                'Challenge', 'Notification', 'Starting', 'Ending', 'Draw',
                'Illegal', 'Move', 'Check', 'Checkmate', 'Stalemate'
            ];
            
            if (!commonWords.includes(possiblePlayer)) {
                const playerIndex = match.index || 0;
                elements.push(ParserUtils.createPlayerElement(possiblePlayer, playerIndex));
            }
        }
        
        // Find any URLs
        elements.push(...ParserUtils.findUrlsInText(message));
        
        // Find any game numbers
        const gameMatches = message.matchAll(/\bgame\s+(\d+)\b/gi);
        for (const match of gameMatches) {
            const gameNumber = parseInt(match[1]);
            const gameIndex = (match.index || 0) + match[0].indexOf(match[1]);
            elements.push(ParserUtils.createGameNumberElement(match[1], gameNumber, gameIndex));
        }
        
        // Determine system message type based on content
        let type = 'info';
        if (message.includes('Error') || message.includes('error')) {
            type = 'error';
        } else if (message.includes('Warning') || message.includes('warning')) {
            type = 'warning';
        } else if (message.includes('Setting') || message.includes('variable')) {
            type = 'setting';
        } else if (message.includes('command') || message.includes('usage')) {
            type = 'help';
        }
        
        return {
            content: message,
            elements,
            metadata: { type, content: message }
        };
    }
}
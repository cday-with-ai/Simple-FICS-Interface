import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, GameEnd } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class GameEndParser extends BaseParser {
    name = 'gameEnd';
    priority = 90;
    
    override handle(message: string, stores: RootStore): ParsedMessage<GameEnd> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        const gameEnd = parsed.metadata;
        
        // Only end the game if it's the current one
        if (stores.gameStore.currentGame?.gameId === gameEnd.gameNumber) {
            stores.gameStore.endGame();
        }
        
        // Play end sound
        stores.soundStore?.playEnd();
        
        // Show in console with proper formatting - use the original message
        console.log('[GameEndParser] Adding to console:', JSON.stringify(message));
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: message,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'gameEnd',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        // Only match game end messages, not game creation messages or active games
        // Game end: {Game X (player vs. player) reason} result
        // Game creation: {Game X (player vs. player) Creating...}
        
        // If there's a Style12 board update in this message, check if game is still active
        if (message.includes('<12>')) {
            // Extract the relation field from Style12 (it's the 19th field)
            const style12Match = message.match(/<12>.*?([WB])\s+(-?\d+)\s+\d+\s+\d+/);
            if (style12Match) {
                const relation = parseInt(style12Match[2]);
                // If relation is -1 or 1, the game is still active (playing)
                // If relation is 0 or -2, we're observing
                // Only relation -3 means the game is truly over
                if (relation !== -3) {
                    if (message.includes('{Game')) {
                        console.log('[GameEndParser] Skipping - game still active, relation:', relation);
                    }
                    return false;
                }
            }
        }
        
        const canParse = (!!message.match(/\{Game \d+ \(.+ vs\. .+\) .+\}\s*(?:1-0|0-1|1\/2-1\/2|\*)/) &&
                         !message.includes('Creating')) ||
                        !!message.match(/You are no longer examining game \d+/);
        if (message.includes('{Game')) {
            console.log('[GameEndParser] canParse check:', JSON.stringify(message), 'result:', canParse);
        }
        return canParse;
    }
    
    parse(message: string): ParsedMessage<GameEnd> | null {
        // First try to match game end with result on same line
        let match = message.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) vs\. ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\) ([^}]+)\}\s*(.+?)(?:\n|$)/);
        
        // If not found, try matching across lines (for cases where result is on next line)
        if (!match) {
            match = message.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) vs\. ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\) ([^}]+)\}[\s\n]*(.+?)(?:\n|$)/);
        }
        
        if (match) {
            const gameEnd: GameEnd = {
                gameNumber: parseInt(match[1]),
                whiteName: this.stripTitles(match[2]),
                blackName: this.stripTitles(match[3]),
                reason: match[4],
                result: match[5].trim()
            };
            
            const elements: InteractiveElement[] = [];
            
            // Add player elements (strip titles for the element)
            const whiteIndex = message.indexOf(match[2]);
            elements.push(ParserUtils.createPlayerElement(gameEnd.whiteName, whiteIndex));
            
            const blackIndex = message.indexOf(match[3], whiteIndex + match[2].length);
            elements.push(ParserUtils.createPlayerElement(gameEnd.blackName, blackIndex));
            
            // Add game number element
            const gameNumIndex = message.indexOf(match[1]);
            elements.push(ParserUtils.createGameNumberElement(match[1], gameEnd.gameNumber, gameNumIndex));
            
            return {
                content: message,  // Return the full message including rating adjustments
                elements,
                metadata: gameEnd
            };
        }

        // Check for examination end
        const examMatch = message.match(/You are no longer examining game (\d+)/);
        if (examMatch) {
            const gameEnd: GameEnd = {
                gameNumber: parseInt(examMatch[1]),
                whiteName: 'examiner',
                blackName: 'examiner',
                reason: 'Examination terminated',
                result: '*'
            };
            
            const elements: InteractiveElement[] = [];
            
            // Add game number element
            const gameNumIndex = message.indexOf(examMatch[1]);
            elements.push(ParserUtils.createGameNumberElement(examMatch[1], gameEnd.gameNumber, gameNumIndex));
            
            return {
                content: message,
                elements,
                metadata: gameEnd
            };
        }

        return null;
    }
}
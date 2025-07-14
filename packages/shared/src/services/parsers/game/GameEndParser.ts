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
        
        // Show in console with proper color
        const endInfo = `{Game ${gameEnd.gameNumber} (${gameEnd.whiteName} vs ${gameEnd.blackName}) ${gameEnd.reason}} ${gameEnd.result}`;
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: endInfo,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'gameEnd'
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        return !!message.match(/\{Game \d+ \(.+ vs\. .+\) .+\}/) ||
               !!message.match(/You are no longer examining game \d+/);
    }
    
    parse(message: string): ParsedMessage<GameEnd> | null {
        const match = message.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) vs\. ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\) ([^}]+)\}\s*(.+)/);
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
                content: message,
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
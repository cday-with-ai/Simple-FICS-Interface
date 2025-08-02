import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, GameStart } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class GameStartParser extends BaseParser {
    name = 'gameStart';
    priority = 90;
    
    private mapGameTypeToVariant(gameType: string): 'standard' | 'chess960' | 'losers' | 'suicide' | 'atomic' | 'crazyhouse' | 'wild' {
        const variantMap: Record<string, string> = {
            'standard': 'standard',
            'blitz': 'standard',
            'lightning': 'standard',
            'bullet': 'standard',
            'crazyhouse': 'crazyhouse',
            'atomic': 'atomic',
            'losers': 'losers',
            'suicide': 'suicide',
            'wild/0': 'chess960',
            'wild/1': 'standard',
            'wild/2': 'standard',
            'wild/3': 'standard',
            'wild/4': 'standard',
            'wild/5': 'standard',
            'wild/8': 'standard',
            'wild/8a': 'standard'
        };
        
        return (variantMap[gameType.toLowerCase()] || 'standard') as 'standard' | 'chess960' | 'losers' | 'suicide' | 'atomic' | 'crazyhouse' | 'wild';
    }
    
    override handle(message: string, stores: RootStore): ParsedMessage<GameStart> | null {
        const parsed = this.parse(message);
        console.log('[GameStartParser] Parse result:', parsed);
        if (!parsed || !parsed.metadata) {
            console.log('[GameStartParser] No metadata, returning early');
            return parsed;
        }
        
        const gameStart = parsed.metadata;
        
        console.log('[GameStartParser] Handling game start:', gameStart);
        
        // Note: We don't call startNewGame here because the game might already be in progress
        // The Style12 update will handle creating/updating the game state
        
        // Always play start sound when observing a game (even mid-game)
        console.log('[GameStartParser] Playing game start sound for observation');
        stores.soundStore?.playStart();
        
        // Show the full original message in console to preserve all information
        // This is important when starting a game while observing another
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: message,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'gameStart',
                parsedMessage: parsed
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        const canParse = !!message.match(/Game \d+: \S+ \(\d+\) \S+ \(\d+\) (rated|unrated)/) ||
                        !!message.match(/Creating: .+ \(.+\) .+ \(.+\) (rated|unrated) \w+ \d+ \d+/) ||
                        !!message.match(/\{Game \d+ \(.+ vs\. .+\) Creating (rated|unrated) .+ match\.\}/) ||
                        !!message.match(/You are now observing game \d+/);
        if (canParse) {
            console.log('[GameStartParser] Can parse game start:', message);
        }
        return canParse;
    }
    
    parse(message: string): ParsedMessage<GameStart> | null {
        console.log('[GameStartParser] Full message to parse:', JSON.stringify(message));
        // Extract just the Game line from multi-line messages
        const gameLineMatch = message.match(/Game \d+: .* \(.*\) .* \(.*\) (?:rated|unrated) .*/);
        const gameLine = gameLineMatch ? gameLineMatch[0] : message;
        console.log('[GameStartParser] Extracted game line:', gameLine);
        
        // Check for observing game format
        // Rating pattern includes: numbers, ++++, ---- , CEP (computer ratings)
        const obsMatch = gameLine.match(/Game (\d+): ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) \(([0-9\+\-CEP]+)\) ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) \(([0-9\+\-CEP]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
        console.log('[GameStartParser] Trying to parse, obsMatch:', !!obsMatch, obsMatch);
        if (obsMatch) {
            const gameStart: GameStart = {
                gameNumber: parseInt(obsMatch[1]),
                whiteName: this.stripTitles(obsMatch[2]),
                whiteRating: obsMatch[3],
                blackName: this.stripTitles(obsMatch[4]),
                blackRating: obsMatch[5],
                isRated: obsMatch[6] === 'rated',
                gameType: obsMatch[7],
                minutes: parseInt(obsMatch[8]),
                increment: parseInt(obsMatch[9])
            };
            
            const elements: InteractiveElement[] = [];
            
            // Add player elements (strip titles for the element)
            const whiteIndex = message.indexOf(obsMatch[2]);
            elements.push(ParserUtils.createPlayerElement(gameStart.whiteName, whiteIndex));
            
            const blackIndex = message.indexOf(obsMatch[4], whiteIndex + obsMatch[2].length);
            elements.push(ParserUtils.createPlayerElement(gameStart.blackName, blackIndex));
            
            // Add game number element
            const gameNumIndex = message.indexOf(obsMatch[1]);
            elements.push(ParserUtils.createGameNumberElement(obsMatch[1], gameStart.gameNumber, gameNumIndex));
            
            return {
                content: message,
                elements,
                metadata: gameStart
            };
        }

        // Check for creating game format
        // Rating pattern includes: numbers, ++++, ---- , CEP (computer ratings)
        const createMatch = message.match(/Creating: ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) \(([0-9\+\-CEP]+)\) ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) \(([0-9\+\-CEP]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
        const gameMatch = message.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) vs\. ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\)/);

        console.log('[GameStartParser] Creating format - createMatch:', !!createMatch, 'gameMatch:', !!gameMatch);
        if (createMatch) {
            console.log('[GameStartParser] Extracted ratings - white:', createMatch[2], 'black:', createMatch[4]);
        }

        if (createMatch && gameMatch) {
            const gameStart: GameStart = {
                gameNumber: parseInt(gameMatch[1]),
                whiteName: this.stripTitles(createMatch[1]),
                whiteRating: createMatch[2],
                blackName: this.stripTitles(createMatch[3]),
                blackRating: createMatch[4],
                isRated: createMatch[5] === 'rated',
                gameType: createMatch[6],
                minutes: parseInt(createMatch[7]),
                increment: parseInt(createMatch[8])
            };
            
            const elements: InteractiveElement[] = [];
            
            // Add player elements (strip titles for the element)
            const whiteIndex = message.indexOf(createMatch[1]);
            elements.push(ParserUtils.createPlayerElement(gameStart.whiteName, whiteIndex));
            
            const blackIndex = message.indexOf(createMatch[3], whiteIndex + createMatch[1].length);
            elements.push(ParserUtils.createPlayerElement(gameStart.blackName, blackIndex));
            
            // Add game number element
            const gameNumIndex = message.indexOf(gameMatch[1]);
            elements.push(ParserUtils.createGameNumberElement(gameMatch[1], gameStart.gameNumber, gameNumIndex));
            
            console.log('[GameStartParser] Returning gameStart:', gameStart);
            return {
                content: message,
                elements,
                metadata: gameStart
            };
        }

        console.log('[GameStartParser] No match found, returning null');
        return null;
    }
}
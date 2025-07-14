import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, GameStart } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';
import { RootStore } from '../../../models/RootStore';

export class GameStartParser extends BaseParser {
    name = 'gameStart';
    priority = 90;
    
    private mapGameTypeToVariant(gameType: string): string {
        const variantMap: Record<string, string> = {
            'standard': 'standard',
            'blitz': 'standard',
            'lightning': 'standard',
            'bullet': 'standard',
            'crazyhouse': 'crazyhouse',
            'atomic': 'atomic',
            'losers': 'antichess',
            'suicide': 'antichess',
            'wild/0': 'chess960',
            'wild/1': 'standard',
            'wild/2': 'standard',
            'wild/3': 'standard',
            'wild/4': 'standard',
            'wild/5': 'standard',
            'wild/8': 'standard',
            'wild/8a': 'standard'
        };
        
        return variantMap[gameType.toLowerCase()] || 'standard';
    }
    
    override handle(message: string, stores: RootStore): ParsedMessage<GameStart> | null {
        const parsed = this.parse(message);
        if (!parsed || !parsed.metadata) return parsed;
        
        const gameStart = parsed.metadata;
        
        // Handle game start in GameStore
        const gameState = {
            gameId: gameStart.gameNumber,
            white: {
                name: gameStart.whiteName,
                rating: parseInt(gameStart.whiteRating) || 0,
                time: gameStart.minutes * 60
            },
            black: {
                name: gameStart.blackName,
                rating: parseInt(gameStart.blackRating) || 0,
                time: gameStart.minutes * 60
            },
            turn: 'w' as const,
            moveNumber: 1,
            variant: this.mapGameTypeToVariant(gameStart.gameType),
            timeControl: `${gameStart.minutes} ${gameStart.increment}`
        };

        stores.gameStore.startNewGame(gameState);
        
        // Play start sound
        stores.soundStore?.playStart();
        
        // Show in console with proper color
        const gameInfo = `Game ${gameStart.gameNumber}: ${gameStart.whiteName} (${gameStart.whiteRating}) vs ${gameStart.blackName} (${gameStart.blackRating})`;
        stores.chatStore.addMessage('console', {
            channel: 'console',
            sender: 'FICS',
            content: gameInfo,
            timestamp: new Date(),
            type: 'system',
            metadata: {
                consoleType: 'gameStart'
            }
        });
        
        return parsed;
    }
    
    canParse(message: string): boolean {
        return !!message.match(/Game \d+: .+ vs\. .+ (rated|unrated)/) ||
               !!message.match(/Creating: .+ \(\d+\) .+ \(\d+\) (rated|unrated)/);
    }
    
    parse(message: string): ParsedMessage<GameStart> | null {
        // Check for observing game format
        const obsMatch = message.match(/Game (\d+): ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
        if (obsMatch) {
            const gameStart: GameStart = {
                gameNumber: parseInt(obsMatch[1]),
                whiteName: obsMatch[2],
                whiteRating: obsMatch[3],
                blackName: obsMatch[4],
                blackRating: obsMatch[5],
                isRated: obsMatch[6] === 'rated',
                gameType: obsMatch[7],
                minutes: parseInt(obsMatch[8]),
                increment: parseInt(obsMatch[9])
            };
            
            const elements: InteractiveElement[] = [];
            
            // Add player elements
            const whiteIndex = message.indexOf(gameStart.whiteName);
            elements.push(ParserUtils.createPlayerElement(gameStart.whiteName, whiteIndex));
            
            const blackIndex = message.indexOf(gameStart.blackName, whiteIndex + gameStart.whiteName.length);
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
        const createMatch = message.match(/Creating: ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
        const gameMatch = message.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+) vs\. ([a-zA-Z0-9_\[\]*-]+)\)/);

        if (createMatch && gameMatch) {
            const gameStart: GameStart = {
                gameNumber: parseInt(gameMatch[1]),
                whiteName: createMatch[1],
                whiteRating: createMatch[2],
                blackName: createMatch[3],
                blackRating: createMatch[4],
                isRated: createMatch[5] === 'rated',
                gameType: createMatch[6],
                minutes: parseInt(createMatch[7]),
                increment: parseInt(createMatch[8])
            };
            
            const elements: InteractiveElement[] = [];
            
            // Add player elements
            const whiteIndex = message.indexOf(gameStart.whiteName);
            elements.push(ParserUtils.createPlayerElement(gameStart.whiteName, whiteIndex));
            
            const blackIndex = message.indexOf(gameStart.blackName, whiteIndex + gameStart.whiteName.length);
            elements.push(ParserUtils.createPlayerElement(gameStart.blackName, blackIndex));
            
            // Add game number element
            const gameNumIndex = message.indexOf(gameMatch[1]);
            elements.push(ParserUtils.createGameNumberElement(gameMatch[1], gameStart.gameNumber, gameNumIndex));
            
            return {
                content: message,
                elements,
                metadata: gameStart
            };
        }

        return null;
    }
}
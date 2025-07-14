import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class MatchRequestParser extends BaseParser {
    name = 'matchRequest';
    priority = 75;
    
    canParse(message: string): boolean {
        return !!message.match(/Challenge:|challenges you|would like to play|match request|accepting/i);
    }
    
    parse(message: string): ParsedMessage<{ type: string; player?: string; gameParams?: string }> | null {
        const elements: InteractiveElement[] = [];
        let player: string | undefined;
        let type = 'matchRequest';
        let gameParams: string | undefined;
        
        // Handle various match request formats
        
        // "PlayerName challenges you to a match."
        const challengeMatch = message.match(/(\w+(?:\([^)]*\))*)\s+challenges you to a match/);
        if (challengeMatch) {
            player = this.stripTitles(challengeMatch[1]);
            type = 'challenge';
            const playerIndex = message.indexOf(challengeMatch[1]);
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
        }
        
        // "Challenge: PlayerName (rating) gameType time inc rated/unrated"
        const challengeDetailMatch = message.match(/Challenge:\s+(\w+(?:\([^)]*\))*)\s+\(([^)]+)\)\s+(.+)/);
        if (challengeDetailMatch) {
            player = this.stripTitles(challengeDetailMatch[1]);
            gameParams = challengeDetailMatch[3];
            type = 'challenge';
            const playerIndex = message.indexOf(challengeDetailMatch[1]);
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
        }
        
        // "PlayerName would like to play gameType time inc with you."
        const wouldLikeMatch = message.match(/(\w+(?:\([^)]*\))*)\s+would like to play\s+(.+)\s+with you/);
        if (wouldLikeMatch) {
            player = this.stripTitles(wouldLikeMatch[1]);
            gameParams = wouldLikeMatch[2];
            type = 'request';
            const playerIndex = message.indexOf(wouldLikeMatch[1]);
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
        }
        
        // "Accepting match request from PlayerName."
        const acceptingMatch = message.match(/Accepting match request from\s+(\w+(?:\([^)]*\))*)/);
        if (acceptingMatch) {
            player = this.stripTitles(acceptingMatch[1]);
            type = 'accepting';
            const playerIndex = message.indexOf(acceptingMatch[1]);
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
        }
        
        // Find any other player names that might be in the message
        const playerPattern = /\b([A-Z][a-zA-Z0-9_]{2,16})\b/g;
        let match;
        while ((match = playerPattern.exec(message)) !== null) {
            const possiblePlayer = match[1];
            // Skip common words
            if (!['Challenge', 'Accepting', 'Your', 'The'].includes(possiblePlayer)) {
                elements.push(ParserUtils.createPlayerElement(possiblePlayer, match.index));
            }
        }
        
        return {
            content: message,
            elements,
            metadata: { type, player, gameParams }
        };
    }
}
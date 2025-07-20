import { BaseParser } from '../BaseParser';
import { ParsedMessage, MovesList } from '../../FicsProtocol.types';

export class MovesListParser extends BaseParser {
    name = 'movesList';
    priority = 85;
    
    canParse(message: string): boolean {
        return !!message.match(/Movelist for game \d+:/);
    }
    
    parse(message: string): ParsedMessage<MovesList> | null {
        const match = message.match(/Movelist for game (\d+):/);
        if (!match) return null;

        const gameNumber = parseInt(match[1]);
        const moves: string[] = [];

        // Extract PGN headers if present
        const headers: Partial<MovesList> = {gameNumber, moves};
        
        // First, try to parse FICS format: "player1 (rating1) vs. player2 (rating2)"
        const vsMatch = message.match(/(\w+)\s+\((\d+)\)\s+vs\.\s+(\w+)\s+\((\d+)\)/);
        if (vsMatch) {
            headers.white = vsMatch[1];
            headers.whiteElo = vsMatch[2];
            headers.black = vsMatch[3];
            headers.blackElo = vsMatch[4];
        }

        // Parse PGN headers
        const eventMatch = message.match(/\[Event "([^"]+)"\]/);
        if (eventMatch) headers.event = eventMatch[1];

        const siteMatch = message.match(/\[Site "([^"]+)"\]/);
        if (siteMatch) headers.site = siteMatch[1];

        const dateMatch = message.match(/\[Date "([^"]+)"\]/);
        if (dateMatch) headers.date = dateMatch[1];

        const whiteMatch = message.match(/\[White "([^"]+)"\]/);
        if (whiteMatch) headers.white = whiteMatch[1];

        const blackMatch = message.match(/\[Black "([^"]+)"\]/);
        if (blackMatch) headers.black = blackMatch[1];

        const whiteEloMatch = message.match(/\[WhiteElo "([^"]+)"\]/);
        if (whiteEloMatch) headers.whiteElo = whiteEloMatch[1];

        const blackEloMatch = message.match(/\[BlackElo "([^"]+)"\]/);
        if (blackEloMatch) headers.blackElo = blackEloMatch[1];

        const timeControlMatch = message.match(/\[TimeControl "([^"]+)"\]/);
        if (timeControlMatch) headers.timeControl = timeControlMatch[1];

        const resultMatch = message.match(/\[Result "([^"]+)"\]/);
        if (resultMatch) headers.result = resultMatch[1];

        // Extract moves (simplified - in real implementation would need proper PGN parsing)
        const movesSection = message.substring(message.lastIndexOf(']') + 1).trim();
        if (movesSection) {
            // Match move patterns like "1. e4 e5 2. Nf3 Nc6"
            const movePattern = /\b([KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?[+#]?|O-O(?:-O)?)\b/g;
            const moveMatches = movesSection.match(movePattern);
            if (moveMatches) {
                headers.moves = moveMatches;
            }
        }

        return {
            content: message,
            elements: [],
            metadata: headers as MovesList
        };
    }
}
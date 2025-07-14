import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, HistoryOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class HistoryParser extends BaseParser {
    name = 'historyOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^History for \w+:/m);
    }
    
    parse(message: string): ParsedMessage<HistoryOutputData> | null {
        const lines = this.splitLines(message);
        
        // Look for history header
        const headerLine = lines.find(line => line.includes('History for'));
        if (!headerLine) return null;
        
        const headerMatch = headerLine.match(/History for (\w+):/);
        if (!headerMatch) return null;
        
        const player = headerMatch[1];
        const entries: HistoryOutputData['entries'] = [];
        const elements: InteractiveElement[] = [];
        
        // Add player element in header
        const headerIndex = message.indexOf(player);
        if (headerIndex !== -1) {
            elements.push(ParserUtils.createPlayerElement(player, headerIndex));
        }
        
        let offset = 0;
        for (const line of lines) {
            // Parse history entry: "33: + 1631 B 1174 vise          [ br  5   0] B06 Res Wed Jun 25, 19:07 EDT 2025"
            const entryMatch = line.match(/(\d+):\s+([+-=])\s+(\d+)\s+([WBN])\s+(\d+)\s+(\w+)/);
            if (entryMatch) {
                const [, index, result, rating, color, opponentRating, opponent] = entryMatch;
                
                entries.push({
                    index: parseInt(index),
                    result: result as '+' | '-' | '=',
                    rating: parseInt(rating),
                    color: color as 'W' | 'B' | 'N',
                    opponentRating: parseInt(opponentRating),
                    opponent,
                    moves: 0, // Will be parsed from rest of line
                    date: '' // Will be parsed from rest of line
                });
                
                // Add opponent as clickable
                const opponentIndex = offset + line.indexOf(opponent, 20); // Start search after ratings
                elements.push(ParserUtils.createPlayerElement(opponent, opponentIndex));
                
                // Make the whole line clickable to examine the game
                elements.push(ParserUtils.createCommandElement(
                    line.trim(),
                    `examine ${player} ${index}`,
                    offset
                ));
            }
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { player, entries }
        };
    }
}
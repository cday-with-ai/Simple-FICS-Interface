import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, JournalOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class JournalParser extends BaseParser {
    name = 'journalOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/Journal for \w+:/m) && message.includes('%');
    }
    
    parse(message: string): ParsedMessage<JournalOutputData> | null {
        const lines = this.splitLines(message);
        
        // Look for journal header
        const headerLine = lines.find(line => line.includes('Journal for'));
        if (!headerLine) return null;
        
        const headerMatch = headerLine.match(/Journal for (\w+):/);
        if (!headerMatch) return null;
        
        const player = headerMatch[1];
        const entries: JournalOutputData['entries'] = [];
        const elements: InteractiveElement[] = [];
        
        // Add player element in header
        const headerIndex = message.indexOf(player);
        if (headerIndex !== -1) {
            elements.push(ParserUtils.createPlayerElement(player, headerIndex));
        }
        
        let offset = 0;
        for (const line of lines) {
            // Parse journal entry: "%01: cday          1740    ronaldobergma 1760    [ br  3   0] B53 Mat 0-1"
            const entryMatch = line.match(/%(\d+):\s+(\S+)\s+(\d+|----)\s+(\S+)\s+(\d+|----)\s+\[([^\]]+)\]\s+(\S+)\s+(\S+)\s+(.+)$/);
            if (entryMatch) {
                const [, index, white, whiteRating, black, blackRating, gameInfo, eco, endType, result] = entryMatch;
                
                entries.push({
                    index: `%${index}`,
                    whiteName: white,
                    whiteRating: whiteRating !== '----' ? parseInt(whiteRating) : 0,
                    blackName: black,
                    blackRating: blackRating !== '----' ? parseInt(blackRating) : 0,
                    result,
                    eco: eco || undefined,
                    endType,
                    gameInfo
                });
                
                // Make the whole line clickable to examine the game
                // Don't add individual player elements as they would overlap
                elements.push(ParserUtils.createCommandElement(
                    line.trim(),
                    `examine ${player} %${index}`,
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
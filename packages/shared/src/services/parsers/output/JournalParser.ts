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
        // Look for journal header first
        const headerMatch = message.match(/Journal for (\w+):/);
        if (!headerMatch) return null;
        
        const player = headerMatch[1];
        const entries: JournalOutputData['entries'] = [];
        const elements: InteractiveElement[] = [];
        
        // Add player element in header
        const headerIndex = message.indexOf(player);
        if (headerIndex !== -1) {
            elements.push(ParserUtils.createPlayerElement(player, headerIndex));
        }
        
        // Work with the raw message to preserve exact positions
        const lineEndings = message.includes('\n\r') ? '\n\r' : '\n';
        const lines = message.split(lineEndings);
        
        let offset = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
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
                const trimmedLine = line.trim();
                const lineStartIndex = line.indexOf(trimmedLine);
                elements.push(ParserUtils.createCommandElement(
                    trimmedLine,
                    `examine ${player} %${index}`,
                    offset + lineStartIndex
                ));
            }
            
            // Update offset - include line ending length except for last line
            offset += line.length + (i < lines.length - 1 ? lineEndings.length : 0);
        }
        
        return {
            content: message,
            elements,
            metadata: { player, entries }
        };
    }
}
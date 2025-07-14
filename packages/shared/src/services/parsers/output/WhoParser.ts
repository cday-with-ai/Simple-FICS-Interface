import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, WhoOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class WhoParser extends BaseParser {
    name = 'whoOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return message.includes('players displayed') && 
               !!message.match(/(?:\d{3,4}|----|\+{4})\s+\w+|^\d{4}:\w+/m);
    }
    
    parse(message: string): ParsedMessage<WhoOutputData> | null {
        const lines = this.splitLines(message);
        const players: WhoOutputData['players'] = [];
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        let totalPlayers = 0;
        
        for (const line of lines) {
            // Check for footer with total count
            const footerMatch = line.match(/(\d+)\s+players?\s+displayed/);
            if (footerMatch) {
                totalPlayers = parseInt(footerMatch[1]);
                offset += line.length + 1;
                continue;
            }
            
            // Skip empty lines
            if (line.trim() === '') {
                offset += line.length + 1;
                continue;
            }
            
            // Parse multiple players per line
            // Format: "rating[.^#:]player(flags) rating[.^#:]player(flags) ..."
            const playerRegex = /(\d{3,4}|----|\+{4})([.^~&#:]*)?(\w+)(?:\([^)]*\))?/g;
            let match;
            
            while ((match = playerRegex.exec(line)) !== null) {
                const [fullMatch, rating, statusPrefix, handle] = match;
                const playerIndex = offset + match.index + fullMatch.indexOf(handle);
                
                // Parse status indicators
                let status = '';
                if (statusPrefix) {
                    if (statusPrefix.includes('^')) status += 'idle ';
                    if (statusPrefix.includes('~')) status += 'simul ';
                    if (statusPrefix.includes('&')) status += 'admin ';
                    if (statusPrefix.includes('.')) status += 'inactive ';
                    if (statusPrefix.includes('#')) status += 'examining ';
                    if (statusPrefix.includes(':')) status += 'playing ';
                }
                status = status.trim();
                
                players.push({
                    handle,
                    blitz: rating !== '----' && rating !== '++++' ? parseInt(rating) : undefined,
                    status: status || undefined
                });
                
                elements.push(ParserUtils.createPlayerElement(handle, playerIndex));
            }
            
            offset += line.length + 1;
        }
        
        // If we didn't find a footer, use the count
        if (totalPlayers === 0) {
            totalPlayers = players.length;
        }
        
        return {
            content: message,
            elements,
            metadata: { players, totalPlayers }
        };
    }
}
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
        // Check what line endings we have
        const hasCarriageReturn = message.includes('\r');
        
        // If we have \r characters, we need to handle line endings differently
        let lines: string[];
        let lineEndingLength: number;
        
        if (hasCarriageReturn) {
            // Message has \n\r line endings
            lines = message.split('\n\r').filter(line => line.length > 0);
            lineEndingLength = 2;
        } else {
            // Message has only \n line endings
            lines = message.split('\n').filter(line => line.length > 0);
            lineEndingLength = 1;
        }
        
        
        const players: WhoOutputData['players'] = [];
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        let totalPlayers = 0;
        
        for (const line of lines) {
            // Check for footer with total count
            const footerMatch = line.match(/(\d+)\s+players?\s+displayed/);
            if (footerMatch) {
                totalPlayers = parseInt(footerMatch[1]);
                offset += line.length + lineEndingLength;
                continue;
            }
            
            // Skip empty lines
            if (line.trim() === '') {
                offset += line.length + lineEndingLength;
                continue;
            }
            
            
            
            // Parse multiple players per line
            // Format: "rating[.^#:]player(flags) rating[.^#:]player(flags) ..."
            // More flexible regex to capture all player names
            // Updated to handle multiple sets of parentheses like (*)(TD) or (*)(SR)(TD)
            const playerRegex = /(\d{3,4}|----|\+{4})([.^~&#:]*)\s*([a-zA-Z][a-zA-Z0-9_]*)(?:\([^)]*\))*/g;
            let match;
            let foundAny = false;
            
            while ((match = playerRegex.exec(line)) !== null) {
                const [fullMatch, rating, statusPrefix, handle] = match;
                
                // Skip empty handles
                if (!handle) continue;
                
                foundAny = true;
                
                // Find the actual position of the handle in the message
                // First, let's find where this match starts in the overall message
                const matchStartInMessage = offset + match.index;
                
                // Now find where the handle starts within the match
                const handleStartInMatch = fullMatch.indexOf(handle);
                if (handleStartInMatch === -1) {
                    console.error(`[WhoParser] Could not find handle ${handle} in match ${fullMatch}`);
                    continue;
                }
                
                const playerIndex = matchStartInMessage + handleStartInMatch;
                
                
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
            
            
            offset += line.length + lineEndingLength;
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
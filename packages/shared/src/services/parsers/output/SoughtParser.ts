import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, SoughtOutputData } from '../../FicsProtocol.types';

export class SoughtParser extends BaseParser {
    name = 'soughtOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return message.includes('ads displayed') && 
               !!message.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})/m);
    }
    
    parse(message: string): ParsedMessage<SoughtOutputData> | null {
        const lines = this.splitLines(message);
        const entries: SoughtOutputData['entries'] = [];
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        
        for (const line of lines) {
            // Skip headers, footers, and empty lines
            if (line.includes('ads displayed') || line.trim() === '' || line.includes('Seek ads:')) {
                offset += line.length + 1;
                continue;
            }
            
            // Check if this line starts with a seek number
            const seekMatch = line.match(/^\s*(\d+)\s+/);
            if (seekMatch) {
                const seekNum = seekMatch[1];
                
                // Make the entire line clickable to play the seek
                elements.push(this.createCommandElement(
                    line.trim(),
                    `play ${seekNum}`,
                    offset
                ));
            }
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { entries }
        };
    }
    
    private createCommandElement(text: string, command: string, start: number): InteractiveElement {
        return {
            type: 'command',
            text,
            action: command,
            start,
            end: start + text.length
        };
    }
}
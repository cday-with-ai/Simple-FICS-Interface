import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, NewsOutputData } from '../../FicsProtocol.types';

export class NewsParser extends BaseParser {
    name = 'newsOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^NEWS\s+\d+\s+\(/m) || 
               !!message.match(/^Index of /m) ||
               message.includes('news items');
    }
    
    parse(message: string): ParsedMessage<NewsOutputData> | null {
        const lines = this.splitLines(message);
        const items: NewsOutputData['items'] = [];
        const elements: InteractiveElement[] = [];
        
        let offset = 0;
        for (const line of lines) {
            // Parse news item: "NEWS 123 (Posted by Admin on Mon, 01 Jan 2024): Title here"
            const itemMatch = line.match(/^NEWS\s+(\d+)\s+\(Posted by (\w+) on ([^)]+)\):\s*(.*)$/);
            if (itemMatch) {
                const [, id, poster, date, title] = itemMatch;
                items.push({
                    id: parseInt(id),
                    poster,
                    date,
                    title
                });
                
                // Add news ID as clickable (to read the news item)
                const idIndex = offset + line.indexOf(id);
                elements.push({
                    type: 'command',
                    text: id,
                    action: `news ${id}`,
                    start: idIndex,
                    end: idIndex + id.length
                });
            }
            
            offset += line.length + 1;
        }
        
        return {
            content: message,
            elements,
            metadata: { items }
        };
    }
}
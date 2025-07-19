import { BaseParser } from '../BaseParser';
import { ParsedMessage, InteractiveElement, FingerOutputData } from '../../FicsProtocol.types';
import { ParserUtils } from '../utils';

export class FingerParser extends BaseParser {
    name = 'fingerOutput';
    priority = 80;
    
    canParse(message: string): boolean {
        return !!message.match(/^\s*Finger of\s+\w+/m) || 
               !!message.match(/^\w+\s+is\s+not\s+logged\s+in/m);
    }
    
    parse(message: string): ParsedMessage<FingerOutputData> | null {
        const lines = this.splitLines(message);
        
        // Check for "not logged in" message
        const notLoggedInMatch = message.match(/^(\w+)\s+is\s+not\s+logged\s+in/m);
        if (notLoggedInMatch) {
            const player = notLoggedInMatch[1];
            const elements: InteractiveElement[] = [];
            elements.push(ParserUtils.createPlayerElement(player, message.indexOf(player)));
            
            return {
                content: message,
                elements,
                metadata: {
                    player,
                    sections: [{
                        type: 'header',
                        content: message
                    }]
                }
            };
        }
        
        // Look for finger header
        const headerMatch = lines[0].match(/^\s*Finger of\s+(\w+)(?:\([^)]*\))?/);
        if (!headerMatch) return null;
        
        const player = headerMatch[1];
        const sections: FingerOutputData['sections'] = [];
        const elements: InteractiveElement[] = [];
        
        // Add player element in header
        const playerIndex = message.indexOf(player);
        if (playerIndex !== -1) {
            elements.push(ParserUtils.createPlayerElement(player, playerIndex));
        }
        
        // Parse sections and find interactive elements
        let currentSection: FingerOutputData['sections'][0] | null = null;
        let offset = 0;
        let inNote = false;
        let noteContent = '';
        let noteStartOffset = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.match(/^\s*Finger of\s+\w+/)) {
                // Process any pending note
                if (inNote && noteContent) {
                    this.processNoteContent(noteContent, noteStartOffset, elements);
                    inNote = false;
                    noteContent = '';
                }
                
                currentSection = { type: 'header', content: line };
                sections.push(currentSection);
            } else if (line.includes('Sanctions :')) {
                // Process any pending note
                if (inNote && noteContent) {
                    this.processNoteContent(noteContent, noteStartOffset, elements);
                    inNote = false;
                    noteContent = '';
                }
                
                currentSection = { type: 'sanctions', content: line };
                sections.push(currentSection);
            } else if (line.includes('rating:') || line.includes('RD:')) {
                // Process any pending note
                if (inNote && noteContent) {
                    this.processNoteContent(noteContent, noteStartOffset, elements);
                    inNote = false;
                    noteContent = '';
                }
                
                if (!currentSection || currentSection.type !== 'ratings') {
                    currentSection = { type: 'ratings', content: line };
                    sections.push(currentSection);
                } else {
                    currentSection.content += '\n' + line;
                }
            } else if (line.match(/^\s*\d+:\s*/)) {
                // Process any previous note
                if (inNote && noteContent) {
                    this.processNoteContent(noteContent, noteStartOffset, elements);
                }
                
                // Start a new note
                inNote = true;
                noteContent = line;
                noteStartOffset = offset;
                
                if (!currentSection || currentSection.type !== 'notes') {
                    currentSection = { type: 'notes', content: line };
                    sections.push(currentSection);
                } else {
                    currentSection.content += '\n' + line;
                }
            } else if (inNote && line.trim().startsWith('\\')) {
                // Continuation of the current note
                const continuationContent = line.replace(/^\s*\\\s*/, '');
                noteContent += '\n' + continuationContent;
                
                if (currentSection && currentSection.type === 'notes') {
                    currentSection.content += '\n' + line;
                }
            } else if (line.trim() && currentSection) {
                // Process any pending note if we're no longer in a note section
                if (inNote && !line.match(/^\s*\\/)) {
                    this.processNoteContent(noteContent, noteStartOffset, elements);
                    inNote = false;
                    noteContent = '';
                }
                
                // Add to current section
                currentSection.content += '\n' + line;
            }
            
            offset += line.length + 1; // +1 for newline
        }
        
        // Process any final pending note
        if (inNote && noteContent) {
            this.processNoteContent(noteContent, noteStartOffset, elements);
        }
        
        return {
            content: message,
            elements,
            metadata: { player, sections }
        };
    }
    
    private processNoteContent(noteContent: string, startOffset: number, elements: InteractiveElement[]): void {
        // Find URLs in the complete note content
        const urlsInNote = ParserUtils.findUrlsInText(noteContent);
        for (const url of urlsInNote) {
            elements.push({
                ...url,
                start: startOffset + url.start,
                end: startOffset + url.end
            });
        }
        
        // Find quoted commands in the complete note content
        const commandsInNote = ParserUtils.findQuotedCommandsInText(noteContent);
        for (const cmd of commandsInNote) {
            elements.push({
                ...cmd,
                start: startOffset + cmd.start,
                end: startOffset + cmd.end
            });
        }
    }
}
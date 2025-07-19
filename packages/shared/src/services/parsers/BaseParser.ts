import { ParsedMessage } from '../FicsProtocol.types';
import { RootStore } from '../../models/RootStore';

export interface Parser {
    name: string;
    priority: number; // Higher priority parsers are checked first
    
    canParse(message: string): boolean;
    parse(message: string): ParsedMessage | null;
    handle(message: string, stores: RootStore): ParsedMessage | null;
}

export abstract class BaseParser implements Parser {
    abstract name: string;
    abstract priority: number;
    
    abstract canParse(message: string): boolean;
    abstract parse(message: string): ParsedMessage | null;
    
    // Default implementation that just parses - subclasses can override
    handle(message: string, stores: RootStore): ParsedMessage | null {
        return this.parse(message);
    }
    
    // Common utility methods for all parsers
    protected splitLines(message: string): string[] {
        // Split on FICS line endings (\n\r or \r\n) and regular newlines
        // FICS uses \n\r as line endings
        return message.split(/\r?\n\r?/).filter(line => line.trim().length > 0);
    }
    
    // Utility method to strip titles from usernames
    protected stripTitles(username: string): string {
        // Remove all titles in parentheses, e.g., "MAd(*)" -> "MAd"
        return username.replace(/\([^)]*\)/g, '');
    }
}
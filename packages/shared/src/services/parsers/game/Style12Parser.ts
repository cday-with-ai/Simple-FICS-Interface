import { BaseParser } from '../BaseParser';
import { ParsedMessage, Style12 } from '../../FicsProtocol.types';

export class Style12Parser extends BaseParser {
    name = 'style12';
    priority = 100; // High priority for game messages
    
    canParse(message: string): boolean {
        return message.includes('<12>');
    }
    
    parse(message: string): ParsedMessage<Style12> | null {
        const style12Start = message.indexOf('<12>');
        if (style12Start === -1) return null;
        
        const end = message.indexOf('\n', style12Start + 5);
        const style12Line = end >= 0 ? message.substring(style12Start, end) : message.substring(style12Start);
        
        const style12 = this.parseStyle12(style12Line);
        if (!style12) return null;
        
        // Check for <b1> holdings message after the Style12 line
        if (end >= 0) {
            const remainingMessage = message.substring(end + 1);
            const b1Match = remainingMessage.match(/^<b1>\s+(\d+)\s+([PNBRQK]*)\s*\[([pnbrqk]*)]/i);
            if (b1Match) {
                const [, gameNumber, whiteHoldings, blackHoldings] = b1Match;
                // Verify it's for the same game
                if (parseInt(gameNumber) === style12.gameNumber) {
                    style12.whiteHoldings = whiteHoldings || '';
                    style12.blackHoldings = blackHoldings || '';
                }
            }
        }
        
        // Style12 messages don't need interactive elements
        return {
            content: message,
            elements: [],
            metadata: style12
        };
    }
    
    private parseStyle12(style12Line: string): Style12 | null {
        // Remove <12> prefix and trim
        const cleanLine = style12Line.replace('<12>', '').trim();
        const parts = cleanLine.split(' ').filter(p => p.length > 0);
        
        if (parts.length < 31) {
            // Style12 requires at least 31 fields
            return null;
        }

        // Parse the board (first 8 parts are the board ranks)
        const board: string[][] = [];
        for (let i = 0; i < 8; i++) {
            const rank = parts[i];
            if (!rank || rank.length !== 8) {
                // Invalid board rank
                return null;
            }
            board.push(rank.split(''));
        }

        return {
            board,
            colorToMove: parts[8] as 'W' | 'B',
            castlingRights: parts[9],
            enPassantSquare: parts[10],
            halfMoveClock: parseInt(parts[11]),
            gameNumber: parseInt(parts[15]),
            whiteName: parts[16],
            blackName: parts[17],
            relation: parseInt(parts[18]),
            initialTime: parseInt(parts[19]),
            incrementTime: parseInt(parts[20]),
            whiteMaterialStrength: parseInt(parts[21]),
            blackMaterialStrength: parseInt(parts[22]),
            whiteTimeRemaining: parseInt(parts[23]),
            blackTimeRemaining: parseInt(parts[24]),
            moveNumber: parseInt(parts[25]),
            verboseMove: parts[26],
            timeTaken: parts[27],
            prettyMove: parts[28],
            flipBoard: parts[29] === '1'
        };
    }
}
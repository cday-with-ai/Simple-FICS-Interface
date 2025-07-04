import * as fs from 'fs';
import * as path from 'path';
import { parsePgnFile, ParsedGame } from './pgnParser';

export interface TestGame {
    id: string;
    variant: 'CLASSIC' | 'LOSERS' | 'SUICIDE' | 'ATOMIC' | 'CRAZYHOUSE' | 'CHESS960';
    pgn: string;
    description?: string;
    expectedMoveCount: number;
    expectedResult: '1-0' | '0-1' | '1/2-1/2' | '*';
    tags?: Record<string, string>;
}

export interface TestGameCollection {
    variant: string;
    games: TestGame[];
}

function loadAllGames(): TestGameCollection[] {
    const collections: TestGameCollection[] = [];
    
    // Load classic chess games from chess.pgn
    const chessPgnPath = path.join(__dirname, 'chess.pgn');
    const chessPgnContent = fs.readFileSync(chessPgnPath, 'utf8');
    const chessGames = parsePgnFile(chessPgnContent);
    
    const classicGames: TestGame[] = chessGames.map((game, index) => ({
        id: `classic-${String(index + 1).padStart(3, '0')}`,
        variant: 'CLASSIC' as TestGame['variant'],
        pgn: game.moves,
        description: game.headers.Event || undefined,
        expectedMoveCount: game.expectedMoveCount,
        expectedResult: game.expectedResult,
        tags: game.headers
    }));
    
    // Include all games from chess.pgn without filtering
    collections.push({ variant: 'CLASSIC', games: classicGames });
    
    // Load variant games from variants.pgn
    const variantsPgnPath = path.join(__dirname, 'variants.pgn');
    const variantsPgnContent = fs.readFileSync(variantsPgnPath, 'utf8');
    const variantGames = parsePgnFile(variantsPgnContent);
    
    // Group variant games by variant type
    const variantGroups: Record<string, TestGame[]> = {};
    
    variantGames.forEach((game, index) => {
        const variantHeader = game.headers.Variant;
        if (!variantHeader) return;
        
        const variant = variantHeader.toUpperCase();
        
        // Map FICS variant names to our variant names if necessary
        let mappedVariant = variant;
        if (variant === 'WILD/FR' || variant === 'FISCHERANDOM') {
            mappedVariant = 'CHESS960';
        }
        
        if (!['LOSERS', 'SUICIDE', 'ATOMIC', 'CRAZYHOUSE', 'CHESS960'].includes(mappedVariant)) {
            return; // Skip unknown variants
        }
        
        if (!variantGroups[mappedVariant]) {
            variantGroups[mappedVariant] = [];
        }
        
        variantGroups[mappedVariant].push({
            id: `${mappedVariant.toLowerCase()}-${String(variantGroups[mappedVariant].length + 1).padStart(3, '0')}`,
            variant: mappedVariant as TestGame['variant'],
            pgn: game.moves,
            description: game.headers.Event || undefined,
            expectedMoveCount: game.expectedMoveCount,
            expectedResult: game.expectedResult,
            tags: game.headers
        });
    });
    
    // Add variant collections
    Object.entries(variantGroups).forEach(([variant, games]) => {
        collections.push({ variant, games });
    });
    
    return collections;
}

export const testGameCollections: TestGameCollection[] = loadAllGames();

export const getAllTestGames = (): TestGame[] => {
    return testGameCollections.flatMap(collection => collection.games);
};

export const getTestGamesByVariant = (variant: string): TestGame[] => {
    const collection = testGameCollections.find(c => c.variant === variant);
    return collection ? collection.games : [];
};
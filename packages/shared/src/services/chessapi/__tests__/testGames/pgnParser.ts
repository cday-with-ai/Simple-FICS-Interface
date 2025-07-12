export interface ParsedGame {
    event?: string;
    site?: string;
    date?: string;
    round?: string;
    white?: string;
    black?: string;
    result?: string;
    variant?: string;
    moves: string;
    headers: { [key: string]: string };
    expectedMoveCount?: number;
    expectedResult?: string;
}

export function parsePgnFile(content: string): ParsedGame[] {
    const games: ParsedGame[] = [];
    const lines = content.split('\n');
    
    let currentGame: ParsedGame | null = null;
    let moves = '';
    let inMoves = false;
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Empty line could signal end of headers or end of game
        if (!trimmedLine) {
            if (currentGame && inMoves && moves) {
                currentGame.moves = moves.trim();
                games.push(currentGame);
                currentGame = null;
                moves = '';
                inMoves = false;
            } else if (currentGame && !inMoves) {
                inMoves = true;
            }
            continue;
        }
        
        // Header line
        if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
            if (currentGame && moves) {
                currentGame.moves = moves.trim();
                games.push(currentGame);
                moves = '';
                inMoves = false;
            }
            
            if (!currentGame) {
                currentGame = { moves: '', headers: {} };
            }
            
            const match = trimmedLine.match(/\[(\w+)\s+"([^"]+)"\]/);
            if (match) {
                const [, key, value] = match;
                currentGame.headers[key] = value;
                
                // Set common properties
                switch (key.toLowerCase()) {
                    case 'event': currentGame.event = value; break;
                    case 'site': currentGame.site = value; break;
                    case 'date': currentGame.date = value; break;
                    case 'round': currentGame.round = value; break;
                    case 'white': currentGame.white = value; break;
                    case 'black': currentGame.black = value; break;
                    case 'result': currentGame.result = value; break;
                    case 'variant': currentGame.variant = value; break;
                }
            }
        } else if (inMoves || (currentGame && !trimmedLine.startsWith('['))) {
            // Move line
            inMoves = true;
            moves += ' ' + trimmedLine;
        }
    }
    
    // Don't forget the last game
    if (currentGame && moves) {
        currentGame.moves = moves.trim();
        games.push(currentGame);
    }
    
    return games;
}
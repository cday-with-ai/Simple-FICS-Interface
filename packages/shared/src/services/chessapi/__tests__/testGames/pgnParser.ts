export interface ParsedGame {
    headers: Record<string, string>;
    moves: string;
    expectedMoveCount: number;
    expectedResult: '1-0' | '0-1' | '1/2-1/2' | '*';
}

export function parsePgnFile(pgnContent: string): ParsedGame[] {
    const games: ParsedGame[] = [];
    const gameTexts = pgnContent.split(/\n\n(?=\[)/);
    
    for (const gameText of gameTexts) {
        if (!gameText.trim()) continue;
        
        const lines = gameText.split('\n');
        const headers: Record<string, string> = {};
        let movesStartIndex = 0;
        
        // Parse headers
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('[')) {
                const match = line.match(/\[(\w+)\s+"([^"]+)"\]/);
                if (match) {
                    headers[match[1]] = match[2];
                }
            } else if (line) {
                movesStartIndex = i;
                break;
            }
        }
        
        // Extract moves
        let moves = lines.slice(movesStartIndex).join(' ').trim();
        
        // Remove the result from the end of the moves string
        moves = moves.replace(/\s*(1-0|0-1|1\/2-1\/2|\*)$/, '');
        
        // Count moves by counting the number of move number indicators
        const moveNumbers = moves.match(/\d+\./g) || [];
        const lastMoveNumber = moveNumbers.length > 0 
            ? parseInt(moveNumbers[moveNumbers.length - 1].replace('.', '')) 
            : 0;
            
        // Check if the last move is only white's move (game ends after white moves)
        const lastMoveTokens = moves.trim().split(/\s+/).slice(-2);
        const hasBlackLastMove = lastMoveTokens.length === 2 && !lastMoveTokens[1].match(/^\d+\./);
        
        // Total moves = lastMoveNumber * 2 if black moved last, or lastMoveNumber * 2 - 1 if only white moved
        const expectedMoveCount = hasBlackLastMove ? lastMoveNumber * 2 : lastMoveNumber * 2 - 1;
        const expectedResult = (headers.Result || '*') as '1-0' | '0-1' | '1/2-1/2' | '*';
        
        games.push({
            headers,
            moves,
            expectedMoveCount,
            expectedResult
        });
    }
    
    return games;
}
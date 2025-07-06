import * as fs from 'fs';

// Parse the Chennai 2024 PGN file
const pgnContent = fs.readFileSync('/Users/carsonday/Downloads/Chennai2024.pgn', 'utf-8');

// Split into individual games
const games = pgnContent.split(/\n\n(?=\[Event)/);

interface ParsedGame {
  event: string;
  white: string;
  black: string;
  result: string;
  moves: string;
  moveCount: number;
}

function parseGame(gameText: string): ParsedGame | null {
  const lines = gameText.trim().split('\n');
  
  let event = '';
  let white = '';
  let black = '';
  let result = '';
  let moves = '';
  
  for (const line of lines) {
    if (line.startsWith('[Event')) {
      event = line.match(/"([^"]+)"/)![1];
    } else if (line.startsWith('[White ')) {
      white = line.match(/"([^"]+)"/)![1];
    } else if (line.startsWith('[Black ')) {
      black = line.match(/"([^"]+)"/)![1];
    } else if (line.startsWith('[Result')) {
      result = line.match(/"([^"]+)"/)![1];
    } else if (line.trim() && !line.startsWith('[') && line.includes('.')) {
      // Found moves - accumulate all move lines
      moves += ' ' + line.trim();
    }
  }
  
  if (!moves) return null;
  
  moves = moves.trim();
  
  // Count actual moves by removing move numbers and results
  const cleanMoves = moves
    .replace(/\d+\./g, '') // Remove move numbers
    .replace(/1-0|0-1|1\/2-1\/2|\*/g, '') // Remove results
    .trim()
    .split(/\s+/)
    .filter(m => m.length > 0);
  
  const actualMoveCount = cleanMoves.length;
  
  return {
    event,
    white,
    black,
    result,
    moves,
    moveCount: actualMoveCount
  };
}

// Parse all games
const parsedGames = games
  .map(parseGame)
  .filter(g => g !== null) as ParsedGame[];

// Convert to test format
const testGames = parsedGames.slice(0, 20).map((game, index) => ({
  id: `classic-${String(index + 1).padStart(3, '0')}`,
  variant: 'CLASSIC',
  pgn: game.moves,
  description: `${game.white} vs ${game.black} - ${game.event}`,
  expectedMoveCount: game.moveCount,
  expectedResult: game.result
}));

// Output as JSON
console.log(JSON.stringify(testGames, null, 2));
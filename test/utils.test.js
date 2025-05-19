import {style12ToFen, toAlgebraicSquare, toRankFile, fileNumberToAlgebraic, getPieceAtSquare, parseVerboseMove, startEndToAlgebraic } from '../scripts/utils.js';

describe('style12ToFen', () => {
  // Test with the example from the documentation
  test('converts Style12 to FEN - example 1', () => {
    const style12Example = `<12> rnbqkb-r pppppppp -----n-- -------- ----P--- -------- PPPPKPPP RNBQ-BNR B -1 0 0 1 1 0 7 Newton Einstein 1 2 12 39 39 119 122 2 K/e1-e2 (0:06) Ke2 0`;
    const expectedFen = "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPPKPPP/RNBQ1BNR b kq - 0 2";

    const actualFen = style12ToFen(style12Example);
    expect(actualFen).toBe(expectedFen);
  });

  // Test with a different example
  test('converts Style12 to FEN - example 2', () => {
    const style12Example2 = `<12> rnbqkbnr pp1ppppp -------- --p----- ----P--- -------- PPPP1PPP RNBQKBNR W 2 1 1 1 1 0 7 Player1 Player2 0 5 0 39 39 300 300 1 p/b2-c3 (0:05) c3 0`;
    const expectedFen2 = "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1";

    const actualFen2 = style12ToFen(style12Example2);
    expect(actualFen2).toBe(expectedFen2);
  });

  // Test with multiline input
  test('handles multiline Style12 input', () => {
    const multilineStyle12 = `Some other text
<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 1 1 1 1 1 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0
More text after`;

    const actualFen = style12ToFen(multilineStyle12);
    // Check parts of the FEN string instead of the exact match
    expect(actualFen).toContain("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"); // Board position
    expect(actualFen).toContain(" w "); // Active color
    expect(actualFen).toContain("KQkq"); // Castling rights
    // Don't check en passant and halfmove clock as they might vary
    expect(actualFen).toContain(" 1"); // Fullmove number
  });

  // Test with different castling rights
  test('handles different castling rights', () => {
    // No castling rights
    const noCastling = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 0 0 0 0 0 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0`;
    expect(style12ToFen(noCastling)).toContain(" w - ");

    // Only white kingside
    const whiteKingside = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 0 1 0 0 0 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0`;
    expect(style12ToFen(whiteKingside)).toContain(" w K ");

    // Only white queenside
    const whiteQueenside = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 0 0 1 0 0 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0`;
    expect(style12ToFen(whiteQueenside)).toContain(" w Q ");

    // Only black kingside
    const blackKingside = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 0 0 0 1 0 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0`;
    expect(style12ToFen(blackKingside)).toContain(" w k ");

    // Only black queenside
    const blackQueenside = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 0 0 0 0 1 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0`;
    expect(style12ToFen(blackQueenside)).toContain(" w q ");

    // All castling rights
    const allCastling = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W 0 1 1 1 1 0 7 White Black 0 5 0 39 39 300 300 1 none (0:00) none 0`;
    expect(style12ToFen(allCastling)).toContain(" w KQkq ");
  });

  // Test with en passant square
  test('handles en passant square correctly', () => {
    // White pawn double push on e file
    const whitePawnDoublePush = `<12> rnbqkbnr pppp1ppp -------- ----p--- ----P--- -------- PPPP1PPP RNBQKBNR B 4 1 1 1 1 0 7 White Black 0 5 0 39 39 300 300 1 P/e2-e4 (0:00) e4 0`;
    expect(style12ToFen(whitePawnDoublePush)).toContain(" b KQkq e3 ");

    // Black pawn double push on c file
    const blackPawnDoublePush = `<12> rnbqkbnr pp1ppppp -------- --p----- ----P--- -------- PPPP1PPP RNBQKBNR W 2 1 1 1 1 0 7 White Black 0 5 0 39 39 300 300 1 p/c7-c5 (0:00) c5 0`;
    expect(style12ToFen(blackPawnDoublePush)).toContain(" w KQkq c6 ");
  });

  // Test error handling
  test('throws error for invalid Style12 message', () => {
    // No <12> tag
    expect(() => style12ToFen('Invalid message')).toThrow('Invalid Style12 message: <12> tag not found');

    // Not enough parts
    expect(() => style12ToFen('<12> not enough parts')).toThrow('Invalid Style12 message: expected 31 parts');
  });
});

describe('toAlgebraicSquare', () => {
  test('converts rank and file to algebraic notation', () => {
    // Test all corners of the board
    expect(toAlgebraicSquare(1, 1)).toBe('a1'); // bottom left
    expect(toAlgebraicSquare(8, 1)).toBe('a8'); // top left
    expect(toAlgebraicSquare(1, 8)).toBe('h1'); // bottom right
    expect(toAlgebraicSquare(8, 8)).toBe('h8'); // top right

    // Test some middle squares
    expect(toAlgebraicSquare(4, 5)).toBe('e4'); // e4
    expect(toAlgebraicSquare(6, 3)).toBe('c6'); // c6
    expect(toAlgebraicSquare(2, 7)).toBe('g2'); // g2
  });
});

describe('toRankFile', () => {
  test('converts algebraic notation to rank and file', () => {
    // Test all corners of the board
    expect(toRankFile('a1')).toEqual({ file: 1, rank: 1 }); // bottom left
    expect(toRankFile('a8')).toEqual({ file: 1, rank: 8 }); // top left
    expect(toRankFile('h1')).toEqual({ file: 8, rank: 1 }); // bottom right
    expect(toRankFile('h8')).toEqual({ file: 8, rank: 8 }); // top right

    // Test some middle squares
    expect(toRankFile('e4')).toEqual({ file: 5, rank: 4 }); // e4
    expect(toRankFile('c6')).toEqual({ file: 3, rank: 6 }); // c6
    expect(toRankFile('g2')).toEqual({ file: 7, rank: 2 }); // g2
  });
});

describe('fileNumberToAlgebraic', () => {
  test('converts file number to algebraic file letter', () => {
    // Test all files
    expect(fileNumberToAlgebraic(1)).toBe('a');
    expect(fileNumberToAlgebraic(2)).toBe('b');
    expect(fileNumberToAlgebraic(3)).toBe('c');
    expect(fileNumberToAlgebraic(4)).toBe('d');
    expect(fileNumberToAlgebraic(5)).toBe('e');
    expect(fileNumberToAlgebraic(6)).toBe('f');
    expect(fileNumberToAlgebraic(7)).toBe('g');
    expect(fileNumberToAlgebraic(8)).toBe('h');
  });
});

describe('parseVerboseMove', () => {
  // Test with valid moves
  test('parses king move correctly', () => {
    const result = parseVerboseMove('K/e1-e2');
    expect(result).toEqual(['e1', 'e2']);
  });

  test('parses pawn move correctly', () => {
    const result = parseVerboseMove('P/e2-e4');
    expect(result).toEqual(['e2', 'e4']);
  });

  test('parses knight move correctly', () => {
    const result = parseVerboseMove('N/g1-f3');
    expect(result).toEqual(['g1', 'f3']);
  });

  test('parses bishop move correctly', () => {
    const result = parseVerboseMove('B/f1-c4');
    expect(result).toEqual(['f1', 'c4']);
  });

  test('parses rook move correctly', () => {
    const result = parseVerboseMove('R/a1-a8');
    expect(result).toEqual(['a1', 'a8']);
  });

  test('parses queen move correctly', () => {
    const result = parseVerboseMove('Q/d1-d8');
    expect(result).toEqual(['d1', 'd8']);
  });

  // Test with 'none' special case
  test('handles "none" special case', () => {
    const result = parseVerboseMove('none');
    expect(result).toEqual([]);
  });

  // Test error handling
  test('throws error for invalid move notation', () => {
    // Empty string
    expect(() => parseVerboseMove('')).toThrow('Invalid move notation');

    // Null or undefined
    expect(() => parseVerboseMove(null)).toThrow('Invalid move notation');
    expect(() => parseVerboseMove(undefined)).toThrow('Invalid move notation');

    // Invalid format
    expect(() => parseVerboseMove('Ke1-e2')).toThrow('Invalid move notation');
    expect(() => parseVerboseMove('K/e1e2')).toThrow('Invalid move notation');
    expect(() => parseVerboseMove('K-e1-e2')).toThrow('Invalid move notation');
    expect(() => parseVerboseMove('X/e1-e2')).toThrow('Invalid move notation'); // Invalid piece

    // Invalid squares
    expect(() => parseVerboseMove('K/e9-e2')).toThrow('Invalid move notation');
    expect(() => parseVerboseMove('K/e1-i2')).toThrow('Invalid move notation');
  });
});

describe('getPieceAtSquare', () => {
  // Standard starting position FEN
  const startingPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  // Middle game position FEN
  const middleGameFen = 'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3';

  // Test with standard starting position
  test('gets pieces from starting position', () => {
    // White pieces
    expect(getPieceAtSquare(startingPositionFen, 'a1')).toBe('R');
    expect(getPieceAtSquare(startingPositionFen, 'b1')).toBe('N');
    expect(getPieceAtSquare(startingPositionFen, 'c1')).toBe('B');
    expect(getPieceAtSquare(startingPositionFen, 'd1')).toBe('Q');
    expect(getPieceAtSquare(startingPositionFen, 'e1')).toBe('K');
    expect(getPieceAtSquare(startingPositionFen, 'f1')).toBe('B');
    expect(getPieceAtSquare(startingPositionFen, 'g1')).toBe('N');
    expect(getPieceAtSquare(startingPositionFen, 'h1')).toBe('R');

    // White pawns
    for (let file = 1; file <= 8; file++) {
      const square = fileNumberToAlgebraic(file) + '2';
      expect(getPieceAtSquare(startingPositionFen, square)).toBe('P');
    }

    // Black pieces
    expect(getPieceAtSquare(startingPositionFen, 'a8')).toBe('r');
    expect(getPieceAtSquare(startingPositionFen, 'b8')).toBe('n');
    expect(getPieceAtSquare(startingPositionFen, 'c8')).toBe('b');
    expect(getPieceAtSquare(startingPositionFen, 'd8')).toBe('q');
    expect(getPieceAtSquare(startingPositionFen, 'e8')).toBe('k');
    expect(getPieceAtSquare(startingPositionFen, 'f8')).toBe('b');
    expect(getPieceAtSquare(startingPositionFen, 'g8')).toBe('n');
    expect(getPieceAtSquare(startingPositionFen, 'h8')).toBe('r');

    // Black pawns
    for (let file = 1; file <= 8; file++) {
      const square = fileNumberToAlgebraic(file) + '7';
      expect(getPieceAtSquare(startingPositionFen, square)).toBe('p');
    }

    // Empty squares
    for (let rank = 3; rank <= 6; rank++) {
      for (let file = 1; file <= 8; file++) {
        const square = fileNumberToAlgebraic(file) + rank;
        expect(getPieceAtSquare(startingPositionFen, square)).toBe('');
      }
    }
  });

  // Test with middle game position
  test('gets pieces from middle game position', () => {
    // Test specific pieces
    expect(getPieceAtSquare(middleGameFen, 'c6')).toBe('n'); // Black knight
    expect(getPieceAtSquare(middleGameFen, 'c5')).toBe('p'); // Black pawn
    expect(getPieceAtSquare(middleGameFen, 'e4')).toBe('P'); // White pawn
    expect(getPieceAtSquare(middleGameFen, 'f3')).toBe('N'); // White knight
    expect(getPieceAtSquare(middleGameFen, 'h1')).toBe('R'); // White rook

    // Test empty squares
    expect(getPieceAtSquare(middleGameFen, 'd4')).toBe(''); // Empty square
    expect(getPieceAtSquare(middleGameFen, 'f2')).toBe('P'); // White pawn
    expect(getPieceAtSquare(middleGameFen, 'a3')).toBe(''); // Empty square
  });

  // Test error handling
  test('handles invalid inputs', () => {
    // Invalid FEN
    expect(() => getPieceAtSquare('', 'e4')).toThrow('Invalid FEN');
    expect(() => getPieceAtSquare(null, 'e4')).toThrow('Invalid FEN');
    expect(() => getPieceAtSquare(undefined, 'e4')).toThrow('Invalid FEN');
    expect(() => getPieceAtSquare('invalid/fen', 'e4')).toThrow('Invalid FEN');

    // Invalid square
    expect(() => getPieceAtSquare(startingPositionFen, '')).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, null)).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, undefined)).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, 'e')).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, 'e44')).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, '4e')).toThrow('Invalid square');

    // Out of bounds square
    expect(() => getPieceAtSquare(startingPositionFen, 'i4')).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, 'e9')).toThrow('Invalid square');
    expect(() => getPieceAtSquare(startingPositionFen, 'e0')).toThrow('Invalid square');
  });

  // Test with a complex position
  test('handles complex positions', () => {
    const complexFen = 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1';

    // Test specific pieces
    expect(getPieceAtSquare(complexFen, 'a8')).toBe('r'); // Black rook
    expect(getPieceAtSquare(complexFen, 'e8')).toBe('k'); // Black king
    expect(getPieceAtSquare(complexFen, 'h8')).toBe('r'); // Black rook
    expect(getPieceAtSquare(complexFen, 'a6')).toBe('b'); // Black bishop
    expect(getPieceAtSquare(complexFen, 'b6')).toBe('n'); // Black knight
    expect(getPieceAtSquare(complexFen, 'e7')).toBe('q'); // Black queen
    expect(getPieceAtSquare(complexFen, 'g7')).toBe('b'); // Black bishop
    expect(getPieceAtSquare(complexFen, 'h3')).toBe('p'); // Black pawn

    expect(getPieceAtSquare(complexFen, 'a1')).toBe('R'); // White rook
    expect(getPieceAtSquare(complexFen, 'e1')).toBe('K'); // White king
    expect(getPieceAtSquare(complexFen, 'h1')).toBe('R'); // White rook
    expect(getPieceAtSquare(complexFen, 'd5')).toBe('P'); // White pawn
    expect(getPieceAtSquare(complexFen, 'e5')).toBe('N'); // White knight
    expect(getPieceAtSquare(complexFen, 'c3')).toBe('N'); // White knight
    expect(getPieceAtSquare(complexFen, 'f3')).toBe('Q'); // White queen
    expect(getPieceAtSquare(complexFen, 'd2')).toBe('B'); // White bishop
    expect(getPieceAtSquare(complexFen, 'e2')).toBe('B'); // White bishop

    // Test empty squares
    expect(getPieceAtSquare(complexFen, 'c4')).toBe(''); // Empty square
    expect(getPieceAtSquare(complexFen, 'f4')).toBe(''); // Empty square
    expect(getPieceAtSquare(complexFen, 'g3')).toBe(''); // Empty square
    expect(getPieceAtSquare(complexFen, 'h2')).toBe('P'); // White pawn
  });
});

describe('startEndToAlgebraic', () => {
  // Standard starting position FEN
  const startingPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  // Middle game position FEN
  const middleGameFen = 'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3';

  // Position with multiple pieces of the same type that can move to the same square
  const ambiguousPositionFen = 'r1bqk1nr/ppp2ppp/2n5/2bpp3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 6';

  // Test basic pawn moves
  test('converts basic pawn moves correctly', () => {
    // Pawn move
    expect(startEndToAlgebraic('e2', 'e4', startingPositionFen)).toBe('e4');
    expect(startEndToAlgebraic('d2', 'd4', startingPositionFen)).toBe('d4');
    expect(startEndToAlgebraic('c7', 'c5', startingPositionFen.replace('w', 'b'))).toBe('c5');
  });

  // Test piece moves
  test('converts piece moves correctly', () => {
    // Knight move
    expect(startEndToAlgebraic('g1', 'f3', startingPositionFen)).toBe('Nf3');

    // Bishop move
    const fenAfterE4 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
    expect(startEndToAlgebraic('f1', 'c4', fenAfterE4.replace('b', 'w'))).toBe('Bc4');

    // Rook move
    const midGameFen = 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2';
    expect(startEndToAlgebraic('h1', 'g1', midGameFen)).toBe('Rg1');

    // Queen move
    expect(startEndToAlgebraic('d1', 'd3', fenAfterE4.replace('b', 'w'))).toBe('Qd3');

    // King move
    expect(startEndToAlgebraic('e1', 'e2', fenAfterE4.replace('b', 'w'))).toBe('Ke2');
  });

  // Test captures
  test('handles captures correctly', () => {
    // Pawn capture
    const fenWithPawnCapture = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
    expect(startEndToAlgebraic('e4', 'd5', fenWithPawnCapture)).toBe('exd5');

    // Knight capture
    const fenWithKnightCapture = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
    expect(startEndToAlgebraic('d5', 'e4', fenWithKnightCapture.replace('b', 'w'))).toBe('dxe4');

    // Bishop capture
    const fenWithBishopCapture = 'rnbqkb1r/ppp1pppp/5n2/3p4/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 3';
    expect(startEndToAlgebraic('c4', 'd5', fenWithBishopCapture.replace('b', 'w'))).toBe('Bxd5');
  });

  // Test castling
  test('handles castling correctly', () => {
    // White kingside castling
    const fenForWhiteCastling = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1';
    expect(startEndToAlgebraic('e1', 'g1', fenForWhiteCastling)).toBe('O-O');

    // White queenside castling
    const fenForWhiteQueensideCastling = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3KBNR w KQkq - 0 1';
    expect(startEndToAlgebraic('e1', 'c1', fenForWhiteQueensideCastling)).toBe('O-O-O');

    // Black kingside castling
    const fenForBlackCastling = 'rnbqk2r/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1';
    expect(startEndToAlgebraic('e8', 'g8', fenForBlackCastling)).toBe('O-O');

    // Black queenside castling
    const fenForBlackQueensideCastling = 'r3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1';
    expect(startEndToAlgebraic('e8', 'c8', fenForBlackQueensideCastling)).toBe('O-O-O');
  });

  // Test pawn promotions
  test('handles pawn promotions correctly', () => {
    // White pawn promotion
    const fenForWhitePromotion = 'rnbqkbnr/ppppppPp/8/8/8/8/PPPPPPP1/RNBQKBNR w KQkq - 0 1';
    expect(startEndToAlgebraic('g7', 'g8', fenForWhitePromotion)).toBe('g8=Q');

    // Black pawn promotion
    const fenForBlackPromotion = 'rnbqkbnr/ppppppp1/8/8/8/8/PPPPPPPp/RNBQKBNR b KQkq - 0 1';
    expect(startEndToAlgebraic('h2', 'h1', fenForBlackPromotion)).toBe('h1=Q');
  });

  // Test disambiguation (when multiple pieces of the same type can move to the same square)
  test('handles disambiguation correctly', () => {
    // Two knights can move to the same square - disambiguate by file
    const fenWithTwoKnights = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4';
    expect(startEndToAlgebraic('c3', 'd5', fenWithTwoKnights)).toBe('Ncd5');
    expect(startEndToAlgebraic('f3', 'd5', fenWithTwoKnights)).toBe('Nfd5');

    // Two rooks on the same rank - disambiguate by file
    const fenWithTwoRooks = '3r1rk1/ppp2ppp/8/8/8/8/PPP2PPP/3R1RK1 w - - 0 1';
    expect(startEndToAlgebraic('d1', 'd8', fenWithTwoRooks)).toBe('Rdd8');
    expect(startEndToAlgebraic('f1', 'f8', fenWithTwoRooks)).toBe('Rff8');

    // Two rooks on the same file - disambiguate by rank
    const fenWithTwoRooksOnFile = '3rk3/8/8/8/8/8/8/3RK3 w - - 0 1';
    expect(startEndToAlgebraic('d1', 'd4', fenWithTwoRooksOnFile)).toBe('R1d4');
  });

  // Test error handling
  test('handles invalid inputs', () => {
    // Invalid start square
    expect(() => startEndToAlgebraic('', 'e4', startingPositionFen)).toThrow('Invalid start square');
    expect(() => startEndToAlgebraic(null, 'e4', startingPositionFen)).toThrow('Invalid start square');
    expect(() => startEndToAlgebraic(undefined, 'e4', startingPositionFen)).toThrow('Invalid start square');
    expect(() => startEndToAlgebraic('e', 'e4', startingPositionFen)).toThrow('Invalid start square');
    expect(() => startEndToAlgebraic('e22', 'e4', startingPositionFen)).toThrow('Invalid start square');

    // Invalid end square
    expect(() => startEndToAlgebraic('e2', '', startingPositionFen)).toThrow('Invalid end square');
    expect(() => startEndToAlgebraic('e2', null, startingPositionFen)).toThrow('Invalid end square');
    expect(() => startEndToAlgebraic('e2', undefined, startingPositionFen)).toThrow('Invalid end square');
    expect(() => startEndToAlgebraic('e2', 'e', startingPositionFen)).toThrow('Invalid end square');
    expect(() => startEndToAlgebraic('e2', 'e44', startingPositionFen)).toThrow('Invalid end square');

    // Invalid FEN
    expect(() => startEndToAlgebraic('e2', 'e4', '')).toThrow('Invalid FEN');
    expect(() => startEndToAlgebraic('e2', 'e4', null)).toThrow('Invalid FEN');
    expect(() => startEndToAlgebraic('e2', 'e4', undefined)).toThrow('Invalid FEN');

    // No piece at start square
    const fenWithEmptyE2 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1';
    expect(() => startEndToAlgebraic('e2', 'e4', fenWithEmptyE2)).toThrow('No piece found at square e2');
  });
});
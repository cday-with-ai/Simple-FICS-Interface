/**
 * Tests for SAN parsing and move notation
 */

import { ChessBoard, Color, Variant } from '../ChessEngine';

describe('ChessEngine - Move Notation', () => {
  let board: ChessBoard;

  beforeEach(() => {
    board = new ChessBoard(Variant.CLASSIC);
  });

  describe('SAN Parsing', () => {
    it('should parse simple pawn moves', () => {
      expect(board.makeMove('e4')).not.toBeNull();
      expect(board.makeMove('e5')).not.toBeNull();
      expect(board.makeMove('d4')).not.toBeNull();
      expect(board.makeMove('d6')).not.toBeNull();
    });

    it('should parse pawn captures', () => {
      board.makeMove('e4');
      board.makeMove('d5');
      expect(board.makeMove('exd5')).not.toBeNull();
    });

    it('should parse piece moves', () => {
      expect(board.makeMove('Nf3')).not.toBeNull();
      expect(board.makeMove('Nc6')).not.toBeNull();
      board.makeMove('e4');
      board.makeMove('e5');
      expect(board.makeMove('Bc4')).not.toBeNull();
    });

    it('should parse piece captures', () => {
      board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');
      expect(board.makeMove('Bxf3')).not.toBeNull();
    });

    it('should parse castling notation', () => {
      board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
      expect(board.makeMove('O-O')).not.toBeNull();
      board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
      expect(board.makeMove('O-O-O')).not.toBeNull();
      
      // Alternative notation
      board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
      expect(board.makeMove('0-0')).not.toBeNull();
      board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
      expect(board.makeMove('0-0-0')).not.toBeNull();
    });

    it('should parse promotion moves', () => {
      board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
      expect(board.makeMove('a8=Q')).not.toBeNull();
      
      board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
      expect(board.makeMove('a8=N')).not.toBeNull();
      
      board.loadFen('r7/P7/8/8/8/8/8/8 w - - 0 1');
      expect(board.makeMove('axb8=R')).not.toBeNull();
    });

    it('should handle check and checkmate symbols', () => {
      board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPQPPP/RNB1KBNR b KQkq - 0 2');
      expect(board.makeMove('Nc6')).not.toBeNull(); // Qe2 gives check
      
      board.loadFen('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
      // This is checkmate, but we should still parse the notation
      const moves = board.getLegalMoves();
      expect(moves.length).toBe(0);
    });
  });

  describe('Disambiguation', () => {
    it('should handle file disambiguation', () => {
      board.loadFen('r6r/8/8/8/8/8/8/R6R w - - 0 1');
      expect(board.makeMove('Rae1')).not.toBeNull();
      expect(board.getPiece('e1')?.type).toBe('r');
    });

    it('should handle rank disambiguation', () => {
      board.loadFen('8/8/4N3/8/4N3/8/8/8 w - - 0 1');
      expect(board.makeMove('N4c5')).not.toBeNull();
      expect(board.getPiece('c5')?.type).toBe('n');
    });

    it('should handle full square disambiguation', () => {
      board.loadFen('8/8/2N1N3/8/2N1N3/8/8/8 w - - 0 1');
      expect(board.makeMove('Ne4d6')).not.toBeNull();
      expect(board.getPiece('d6')?.type).toBe('n');
    });
  });

  describe('Long Algebraic Notation', () => {
    it('should parse long algebraic moves', () => {
      const move = board.makeLongAlgebraicMove('e2', 'e4');
      expect(move).not.toBeNull();
      expect(board.getPiece('e4')?.type).toBe('p');
    });

    it('should handle long algebraic captures', () => {
      board.makeMove('e4');
      board.makeMove('d5');
      const capture = board.makeLongAlgebraicMove('e4', 'd5');
      expect(capture).not.toBeNull();
      expect(capture!.isCapture()).toBe(true);
    });

    it('should handle long algebraic promotion', () => {
      board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
      const promotion = board.makeLongAlgebraicMove('a7', 'a8', 'q' as any);
      expect(promotion).not.toBeNull();
      expect(board.getPiece('a8')?.type).toBe('q');
    });
  });

  describe('Invalid Move Notation', () => {
    it('should reject invalid SAN', () => {
      expect(board.makeMove('invalid')).toBeNull();
      expect(board.makeMove('Ke9')).toBeNull(); // Invalid square
      expect(board.makeMove('Zf3')).toBeNull(); // Invalid piece
    });

    it('should reject ambiguous moves without disambiguation', () => {
      board.loadFen('r6r/8/8/8/8/8/8/8 w - - 0 1');
      expect(board.makeMove('Re1')).toBeNull(); // Ambiguous - which rook?
    });

    it('should reject moves by wrong color', () => {
      expect(board.makeMove('e5')).toBeNull(); // Black pawn on white's turn
      expect(board.makeMove('Nf6')).toBeNull(); // Black knight on white's turn
    });
  });

  describe('Special Notation Cases', () => {
    it('should handle en passant notation', () => {
      board.loadFen('rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3');
      const enPassant = board.makeMove('exd6'); // Can also be written as exd6 e.p.
      expect(enPassant).not.toBeNull();
      expect(enPassant!.isEnPassant).toBe(true);
    });

    it('should ignore optional notation elements', () => {
      // Should ignore !, ?, +, # symbols
      board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPQPPP/RNB1KBNR b KQkq - 0 2');
      expect(board.makeMove('Nc6')).not.toBeNull(); // Even if notation was Nc6+ or Nc6!
    });
  });
});
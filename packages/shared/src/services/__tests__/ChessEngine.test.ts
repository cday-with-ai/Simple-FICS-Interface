/**
 * Basic tests for the Chess Engine
 */

import { ChessBoard, Color, Variant, GameResult } from '../ChessEngine';

describe('ChessEngine', () => {
  describe('Basic functionality', () => {
    it('should create a chess board with starting position', () => {
      const board = new ChessBoard();
      expect(board.getActiveColor()).toBe(Color.WHITE);
      expect(board.getFen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('should make basic moves', () => {
      const board = new ChessBoard();
      
      // e4
      const move1 = board.makeMove('e4');
      expect(move1).not.toBeNull();
      expect(board.getActiveColor()).toBe(Color.BLACK);
      
      // e5
      const move2 = board.makeMove('e5');
      expect(move2).not.toBeNull();
      expect(board.getActiveColor()).toBe(Color.WHITE);
    });

    it('should detect illegal moves', () => {
      const board = new ChessBoard();
      
      // Try to move black piece on white's turn
      const illegalMove = board.makeMove('e5');
      expect(illegalMove).toBeNull();
      expect(board.getActiveColor()).toBe(Color.WHITE);
    });

    it('should handle castling', () => {
      const board = new ChessBoard();
      board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
      
      const castleMove = board.makeMove('O-O');
      expect(castleMove).not.toBeNull();
      expect(board.getPiece('g1')).not.toBeNull();
      expect(board.getPiece('f1')).not.toBeNull();
    });
  });

  describe('Variant: Atomic', () => {
    it('should explode pieces on capture', () => {
      const board = new ChessBoard(Variant.ATOMIC);
      board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      
      // exd5 should explode both pawns
      const captureMove = board.makeMove('exd5');
      expect(captureMove).not.toBeNull();
      expect(board.getPiece('d5')).toBeNull(); // Explosion site empty
      expect(board.getPiece('e4')).toBeNull(); // Capturing piece destroyed
    });

    it('should end game when king is exploded', () => {
      const board = new ChessBoard(Variant.ATOMIC);
      board.loadFen('rnb1kbnr/pppp1ppp/8/4p3/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 3');
      
      // Black takes on d3, exploding white king
      const checkmate = board.makeMove('exd3');
      expect(checkmate).not.toBeNull();
      expect(board.isGameOver()).toBe(true);
      expect(board.getGameResult()).toBe(GameResult.BLACK_WINS);
    });
  });

  describe('Variant: Losers', () => {
    it('should force captures when available', () => {
      const board = new ChessBoard(Variant.LOSERS);
      board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      
      // Only exd5 should be legal (forced capture)
      const legalMoves = board.getLegalMoves();
      expect(legalMoves.length).toBe(1);
      expect(legalMoves[0].san).toContain('xd5');
    });

    it('should win by losing all pieces', () => {
      const board = new ChessBoard(Variant.LOSERS);
      board.loadFen('8/8/8/8/8/8/P7/k7 w - - 0 1');
      
      // White has only one pawn, black has only king
      // If white loses the pawn, white wins
      board.makeMove('a3');
      board.makeMove('Kxa3');
      
      expect(board.isGameOver()).toBe(true);
      expect(board.getGameResult()).toBe(GameResult.WHITE_WINS);
    });
  });

  describe('Variant: Crazyhouse', () => {
    it('should allow piece drops', () => {
      const board = new ChessBoard(Variant.CRAZYHOUSE);
      
      // Simulate having captured a pawn
      board['capturedPieces'][Color.WHITE].push('p' as any);
      
      // Drop pawn
      const dropMove = board.makeDropMove('p' as any, 'e4');
      expect(dropMove).not.toBeNull();
      expect(board.getPiece('e4')).not.toBeNull();
    });

    it('should not allow pawn drops on back rank', () => {
      const board = new ChessBoard(Variant.CRAZYHOUSE);
      
      // Simulate having captured a pawn
      board['capturedPieces'][Color.WHITE].push('p' as any);
      
      // Try to drop pawn on 8th rank
      const invalidDrop = board.makeDropMove('p' as any, 'e8');
      expect(invalidDrop).toBeNull();
    });
  });
});
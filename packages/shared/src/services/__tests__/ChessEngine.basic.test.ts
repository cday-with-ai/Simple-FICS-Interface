/**
 * Basic tests to verify chess engine works
 */

import { ChessBoard, Color, Variant, PieceType } from '../ChessEngine';

describe('ChessEngine - Basic Functionality', () => {
  it('should initialize correctly', () => {
    const board = new ChessBoard();
    expect(board).toBeDefined();
    expect(board.getActiveColor()).toBe(Color.WHITE);
  });

  it('should make basic pawn moves', () => {
    const board = new ChessBoard();
    
    // e4
    const move1 = board.makeMove('e4');
    expect(move1).toBeDefined();
    expect(move1?.san).toBe('e4');
    expect(board.getActiveColor()).toBe(Color.BLACK);
    
    // e5
    const move2 = board.makeMove('e5');
    expect(move2).toBeDefined();
    expect(board.getActiveColor()).toBe(Color.WHITE);
  });

  it('should handle captures', () => {
    const board = new ChessBoard();
    board.makeMove('e4');
    board.makeMove('d5');
    
    const capture = board.makeMove('exd5');
    expect(capture).toBeDefined();
    expect(capture?.isCapture()).toBe(true);
  });

  it('should generate legal moves', () => {
    const board = new ChessBoard();
    const moves = board.getLegalMoves();
    
    // In starting position, should have 20 legal moves
    expect(moves.length).toBe(20);
    
    // Should have pawn moves
    const pawnMoves = moves.filter(m => !m.san.includes('@'));
    expect(pawnMoves.length).toBeGreaterThan(0);
  });

  it('should work with different variants', () => {
    const atomic = new ChessBoard(Variant.ATOMIC);
    expect(atomic).toBeDefined();
    
    const losers = new ChessBoard(Variant.LOSERS);
    expect(losers).toBeDefined();
    
    const crazyhouse = new ChessBoard(Variant.CRAZYHOUSE);
    expect(crazyhouse).toBeDefined();
  });

  it('should export correct FEN', () => {
    const board = new ChessBoard();
    const startFen = board.getFen();
    expect(startFen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });

  it('should load FEN correctly', () => {
    const board = new ChessBoard();
    const loaded = board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
    expect(loaded).toBe(true);
    
    // Verify position
    expect(board.getPiece('e4')).toEqual({ type: PieceType.PAWN, color: Color.WHITE });
    expect(board.getPiece('e5')).toEqual({ type: PieceType.PAWN, color: Color.BLACK });
  });
});
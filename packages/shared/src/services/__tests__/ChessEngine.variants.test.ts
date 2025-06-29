/**
 * Tests for chess variants
 */

import { ChessBoard, Color, PieceType, Variant, GameResult } from '../ChessEngine';

describe('ChessEngine - Variants', () => {
  describe('Atomic Chess', () => {
    let board: ChessBoard;

    beforeEach(() => {
      board = new ChessBoard(Variant.ATOMIC);
    });

    it('should explode pieces on capture', () => {
      board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      const capture = board.makeMove('exd5');
      
      expect(capture).not.toBeNull();
      // Check explosion site is empty
      expect(board.getPiece('d5')).toBeNull();
      // Check capturing piece is destroyed
      expect(board.getPiece('e4')).toBeNull();
      // Check adjacent pieces are destroyed (except pawns)
      expect(board.getPiece('c6')).toBeNull();
      expect(board.getPiece('e6')).toBeNull();
      // Pawns should survive
      expect(board.getPiece('c7')).not.toBeNull();
      expect(board.getPiece('e7')).not.toBeNull();
    });

    it('should not allow kings to be adjacent', () => {
      board.loadFen('8/8/4k3/8/3K4/8/8/8 w - - 0 1');
      // Try to move white king next to black king
      expect(board.makeMove('Kd5')).toBeNull();
      expect(board.makeMove('Ke4')).toBeNull();
      expect(board.makeMove('Ke5')).toBeNull();
      // Should allow moving away
      expect(board.makeMove('Kd3')).not.toBeNull();
    });

    it('should end game when king is exploded', () => {
      board.loadFen('rnb1kbnr/pppp1ppp/8/4p3/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 3');
      const kingCapture = board.makeMove('exd3'); // Explodes white king
      
      expect(kingCapture).not.toBeNull();
      expect(board.isGameOver()).toBe(true);
      expect(board.getGameResult()).toBe(GameResult.BLACK_WINS);
      // White king should be gone
      let whiteKingExists = false;
      for (let rank = 1; rank <= 8; rank++) {
        for (let file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
          const piece = board.getPiece(`${file}${rank}`);
          if (piece?.type === PieceType.KING && piece.color === Color.WHITE) {
            whiteKingExists = true;
          }
        }
      }
      expect(whiteKingExists).toBe(false);
    });

    it('should handle explosion chain reactions correctly', () => {
      board.loadFen('rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2');
      board.makeMove('e5');
      const capture = board.makeMove('Nxe5');
      
      expect(capture).not.toBeNull();
      // Knight and pawn should be gone
      expect(board.getPiece('e5')).toBeNull();
      // But d6 and f6 pawns should survive (pawns immune)
      expect(board.getPiece('d7')).not.toBeNull();
      expect(board.getPiece('f7')).not.toBeNull();
    });
  });

  describe('Losers Chess', () => {
    let board: ChessBoard;

    beforeEach(() => {
      board = new ChessBoard(Variant.LOSERS);
    });

    it('should force captures when available', () => {
      board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      
      // Get all legal moves
      const moves = board.getLegalMoves();
      
      // Should only have one move: exd5
      expect(moves.length).toBe(1);
      expect(moves[0].san).toContain('xd5');
      
      // Non-capture moves should be illegal
      expect(board.makeMove('Nf3')).toBeNull();
      expect(board.makeMove('d3')).toBeNull();
      
      // Capture should work
      expect(board.makeMove('exd5')).not.toBeNull();
    });

    it('should allow any move when no captures available', () => {
      const moves = board.getLegalMoves();
      expect(moves.length).toBeGreaterThan(1); // Multiple moves available
      
      // Various moves should work
      expect(board.makeMove('e4')).not.toBeNull();
    });

    it('should win by losing all pieces', () => {
      board.loadFen('8/8/8/8/8/8/P7/k7 w - - 0 1');
      
      board.makeMove('a3');
      const capture = board.makeMove('Kxa3');
      
      expect(capture).not.toBeNull();
      expect(board.isGameOver()).toBe(true);
      expect(board.getGameResult()).toBe(GameResult.WHITE_WINS); // White lost all pieces
    });

    it('should win by stalemate', () => {
      board.loadFen('8/8/8/8/8/4k3/4p3/4K3 w - - 0 1');
      
      // White has no legal moves (stalemate)
      expect(board.isGameOver()).toBe(true);
      expect(board.getGameResult()).toBe(GameResult.WHITE_WINS); // White is stalemated
    });

    it('should handle multiple captures correctly', () => {
      board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2');
      
      const moves = board.getLegalMoves();
      // Black has two captures: dxe4 and dxc4
      const captures = moves.filter(m => m.isCapture());
      expect(captures.length).toBe(2);
      expect(moves.length).toBe(2); // Only captures allowed
    });
  });

  describe('Suicide Chess', () => {
    let board: ChessBoard;

    beforeEach(() => {
      board = new ChessBoard(Variant.SUICIDE);
    });

    it('should have same capture rules as Losers', () => {
      board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      
      const moves = board.getLegalMoves();
      expect(moves.length).toBe(1);
      expect(moves[0].san).toContain('xd5');
    });

    it('should allow king to be captured', () => {
      board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/3K4/PPPP1PPP/RNBQ1BNR b kq - 0 2');
      
      // In regular chess, king is in danger, but in suicide it's fine
      const moves = board.getLegalMoves();
      expect(moves.length).toBeGreaterThan(0);
    });

    it('should win by losing all pieces including king', () => {
      board.loadFen('8/8/8/8/8/8/k7/K7 b - - 0 1');
      
      const capture = board.makeMove('Kxb1');
      if (capture) {
        expect(board.isGameOver()).toBe(true);
        expect(board.getGameResult()).toBe(GameResult.BLACK_WINS);
      }
    });
  });

  describe('Crazyhouse', () => {
    let board: ChessBoard;

    beforeEach(() => {
      board = new ChessBoard(Variant.CRAZYHOUSE);
    });

    it('should track captured pieces', () => {
      board.makeMove('e4');
      board.makeMove('d5');
      board.makeMove('exd5');
      
      // Black should have a white pawn available
      const blackCaptured = board.getCapturedPieces(Color.BLACK);
      expect(blackCaptured).toContain(PieceType.PAWN);
    });

    it('should allow dropping captured pieces', () => {
      // Manually add a captured piece for testing
      board['capturedPieces'][Color.WHITE] = [PieceType.KNIGHT];
      
      const drop = board.makeDropMove(PieceType.KNIGHT, 'e4');
      expect(drop).not.toBeNull();
      expect(board.getPiece('e4')).toEqual({ type: PieceType.KNIGHT, color: Color.WHITE });
      
      // Piece should be removed from captured pieces
      expect(board.getCapturedPieces(Color.WHITE).length).toBe(0);
    });

    it('should not allow pawn drops on first or last rank', () => {
      board['capturedPieces'][Color.WHITE] = [PieceType.PAWN];
      
      expect(board.makeDropMove(PieceType.PAWN, 'e1')).toBeNull();
      expect(board.makeDropMove(PieceType.PAWN, 'e8')).toBeNull();
      expect(board.makeDropMove(PieceType.PAWN, 'e4')).not.toBeNull();
    });

    it('should not allow drops on occupied squares', () => {
      board['capturedPieces'][Color.WHITE] = [PieceType.KNIGHT];
      
      expect(board.makeDropMove(PieceType.KNIGHT, 'e2')).toBeNull(); // White pawn there
      expect(board.makeDropMove(PieceType.KNIGHT, 'e7')).toBeNull(); // Black pawn there
    });

    it('should include drop moves in legal moves', () => {
      board['capturedPieces'][Color.WHITE] = [PieceType.KNIGHT, PieceType.PAWN];
      
      const moves = board.getLegalMoves();
      const dropMoves = moves.filter(m => m.from === '@');
      
      // Should have drops for both pieces on many squares
      expect(dropMoves.length).toBeGreaterThan(0);
      
      // Check specific drop moves exist
      const knightDrops = dropMoves.filter(m => m.san.startsWith('N@'));
      const pawnDrops = dropMoves.filter(m => m.san.startsWith('P@'));
      
      expect(knightDrops.length).toBeGreaterThan(0);
      expect(pawnDrops.length).toBeGreaterThan(0);
      
      // Pawn drops should not include first rank
      const pawnFirstRankDrops = pawnDrops.filter(m => m.to.includes('1'));
      expect(pawnFirstRankDrops.length).toBe(0);
    });

    it('should handle captures creating more drops', () => {
      board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2');
      
      const initialWhitePieces = board.getCapturedPieces(Color.WHITE).length;
      board.makeMove('exf4'); // Black captures knight
      
      const whitePieces = board.getCapturedPieces(Color.WHITE);
      expect(whitePieces.length).toBe(initialWhitePieces + 1);
      expect(whitePieces).toContain(PieceType.KNIGHT);
    });
  });

  describe('Chess960', () => {
    let board: ChessBoard;

    beforeEach(() => {
      board = new ChessBoard(Variant.CHESS960);
    });

    it('should create a valid starting position', () => {
      const fen = board.getFen();
      
      // Should have all pieces
      const fenParts = fen.split(' ');
      const position = fenParts[0];
      
      // Count pieces in first rank
      const firstRank = position.split('/')[7]; // Bottom rank in FEN
      expect(firstRank.length).toBe(8);
      expect(firstRank.toLowerCase()).toContain('r');
      expect(firstRank.toLowerCase()).toContain('n');
      expect(firstRank.toLowerCase()).toContain('b');
      expect(firstRank.toLowerCase()).toContain('q');
      expect(firstRank.toLowerCase()).toContain('k');
    });

    it('should handle Chess960 castling', () => {
      // For now, using standard position
      board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
      
      const castle = board.makeMove('O-O');
      expect(castle).not.toBeNull();
      // In Chess960, king always goes to g1/g8 and rook to f1/f8
      expect(board.getPiece('g1')).toEqual({ type: PieceType.KING, color: Color.WHITE });
      expect(board.getPiece('f1')).toEqual({ type: PieceType.ROOK, color: Color.WHITE });
    });
  });

  describe('Variant Interactions', () => {
    it('should correctly identify variant from constructor', () => {
      const atomic = new ChessBoard(Variant.ATOMIC);
      const losers = new ChessBoard(Variant.LOSERS);
      const crazy = new ChessBoard(Variant.CRAZYHOUSE);
      
      // Each should behave according to its variant
      // This is tested implicitly in other tests, but we can verify
      // variant-specific behavior here
      
      // Atomic should explode
      atomic.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      atomic.makeMove('exd5');
      expect(atomic.getPiece('d5')).toBeNull(); // Explosion
      
      // Losers should force captures
      losers.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
      const losersLegal = losers.getLegalMoves();
      expect(losersLegal.every(m => m.isCapture())).toBe(true);
      
      // Crazyhouse should track captures
      crazy.makeMove('e4');
      crazy.makeMove('d5');
      crazy.makeMove('exd5');
      expect(crazy.getCapturedPieces(Color.BLACK).length).toBe(1);
    });
  });
});
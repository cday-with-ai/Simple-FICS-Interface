/**
 * Basic tests to verify chess engine works
 */

import {ChessAPI, Color, Variant, PieceType} from '../ChessAPI';

describe('ChessEngine - Basic Functionality', () => {
    it('should initialize correctly', () => {
        const board = new ChessAPI();
        expect(board).toBeDefined();
        expect(board.getActiveColor()).toBe(Color.WHITE);
    });

    it('should make basic pawn moves', () => {
        const board = new ChessAPI();

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
        const board = new ChessAPI();
        board.makeMove('e4');
        board.makeMove('d5');

        const capture = board.makeMove('exd5');
        expect(capture).toBeDefined();
        expect(capture?.isCapture()).toBe(true);
    });

    it('should generate legal moves', () => {
        const board = new ChessAPI();
        const moves = board.getLegalMoves();

        // In starting position, should have 20 legal moves
        expect(moves.length).toBe(20);

        // Should have pawn moves
        const pawnMoves = moves.filter(m => !m.san.includes('@'));
        expect(pawnMoves.length).toBeGreaterThan(0);
    });

    it('should work with different variants', () => {
        const atomic = new ChessAPI(Variant.ATOMIC);
        expect(atomic).toBeDefined();

        const losers = new ChessAPI(Variant.LOSERS);
        expect(losers).toBeDefined();

        const crazyhouse = new ChessAPI(Variant.CRAZYHOUSE);
        expect(crazyhouse).toBeDefined();
    });

    it('should export correct FEN', () => {
        const board = new ChessAPI();
        const startFen = board.getFen();
        expect(startFen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    });

    it('should load FEN correctly', () => {
        const board = new ChessAPI();
        const loaded = board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
        expect(loaded).toBe(true);

        // Verify position
        expect(board.getPiece('e4')).toEqual({type: PieceType.PAWN, color: Color.WHITE});
        expect(board.getPiece('e5')).toEqual({type: PieceType.PAWN, color: Color.BLACK});
    });

    it('should detect check correctly', () => {
        const board = new ChessAPI();
        board.loadFen('rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 4');
        board.makeMove('Bxf7+'); // Bishop takes f7 with check
        expect(board.isInCheck()).toBe(true);
    });

    it('should detect no legal moves in stalemate position', () => {
        const board = new ChessAPI();
        board.loadFen('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1'); // Black king trapped in corner by queen, not in check
        const moves = board.getLegalMoves();
        expect(moves.length).toBe(0);
        expect(board.isInCheck()).toBe(false);
    });
});
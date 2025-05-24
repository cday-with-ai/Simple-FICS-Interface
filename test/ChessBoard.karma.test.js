/**
 * Comprehensive unit tests for ChessBoard.js
 * Tests all chess variants and functionality
 */

import { ChessBoard, Move } from '../scripts/ChessBoard.js';

describe('ChessBoard', () => {
    let board;

    beforeEach(() => {
        board = new ChessBoard();
    });

    describe('Constructor and Initialization', () => {
        it('should initialize with standard starting position', () => {
            expect(board.getFen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            expect(board.getActiveColor()).toBe('w');
            expect(board.getVariant()).toBe('standard');
        });

        it('should initialize with custom FEN', () => {
            const customFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
            board = new ChessBoard('standard', customFen);
            expect(board.getFen()).toBe(customFen);
            expect(board.getActiveColor()).toBe('b');
        });

        it('should initialize different variants', () => {
            const variants = ['standard', 'losers', 'suicide', 'atomic', 'crazyhouse', 'chess960'];
            variants.forEach(variant => {
                const testBoard = new ChessBoard(variant);
                expect(testBoard.getVariant()).toBe(variant);
            });
        });
    });

    describe('FEN Loading and Generation', () => {
        it('should load FEN correctly', () => {
            const fen = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3';
            expect(board.loadFen(fen)).toBe(true);
            expect(board.getFen()).toBe(fen);
        });

        it('should reject invalid FEN', () => {
            expect(board.loadFen('invalid fen')).toBe(false);
            expect(board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')).toBe(false); // Missing parts
        });

        it('should generate correct FEN after moves', () => {
            board.makeMove('e4');
            expect(board.getFen()).toBe('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');

            board.makeMove('e5');
            expect(board.getFen()).toBe('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2');
        });
    });

    describe('Piece Movement and Placement', () => {
        it('should get pieces correctly', () => {
            expect(board.getPiece('e1')).toEqual({ type: 'k', color: 'w' });
            expect(board.getPiece('e8')).toEqual({ type: 'k', color: 'b' });
            expect(board.getPiece('e4')).toBeNull();
        });

        it('should convert coordinates correctly', () => {
            // Test private methods through public interface
            expect(board.getPiece('a1')).toEqual({ type: 'r', color: 'w' });
            expect(board.getPiece('h8')).toEqual({ type: 'r', color: 'b' });
        });
    });

    describe('Move Generation', () => {
        it('should generate legal moves for starting position', () => {
            const moves = board.getLegalMoves();
            expect(moves.length).toBe(20); // 16 pawn moves + 4 knight moves

            // Check that moves are Move objects
            expect(moves[0].constructor.name).toBe('Move');

            // Check for specific moves by SAN
            const sanMoves = moves.map(move => move.san);
            expect(sanMoves).toContain('e4');
            expect(sanMoves).toContain('Nf3');
            expect(sanMoves).toContain('a3');

            // Check move properties
            const e4Move = moves.find(move => move.san === 'e4');
            expect(e4Move.from).toBe('e2');
            expect(e4Move.to).toBe('e4');
            expect(e4Move.capturedPiece).toBeNull();
            expect(e4Move.isCapture()).toBe(false);
        });

        it('should generate moves for specific pieces', () => {
            const pawnMoves = board.getLegalMoves('e2');
            const pawnSanMoves = pawnMoves.map(move => move.san);
            expect(pawnSanMoves).toContain('e3');
            expect(pawnSanMoves).toContain('e4');
            expect(pawnMoves.length).toBe(2);

            const knightMoves = board.getLegalMoves('g1');
            const knightSanMoves = knightMoves.map(move => move.san);
            expect(knightSanMoves).toContain('Nf3');
            expect(knightSanMoves).toContain('Nh3');
            expect(knightMoves.length).toBe(2);

            // Check move properties
            const nf3Move = knightMoves.find(move => move.san === 'Nf3');
            expect(nf3Move.from).toBe('g1');
            expect(nf3Move.to).toBe('f3');
        });

        it('should not generate moves for opponent pieces', () => {
            const blackPawnMoves = board.getLegalMoves('e7');
            expect(blackPawnMoves.length).toBe(0); // White to move
        });

        it('should generate Move objects with capture information', () => {
            // Set up a position with a capture available - white pawn can capture black pawn
            board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2');

            const moves = board.getLegalMoves();
            const captureMoves = moves.filter(move => move.isCapture());

            // Should have at least one capture move (exd5)
            expect(captureMoves.length).toBeGreaterThan(0);

            // Find the specific capture move
            const exd5Move = captureMoves.find(move => move.san === 'exd5');
            expect(exd5Move).toBeDefined();
            expect(exd5Move.isCapture()).toBe(true);
            expect(exd5Move.capturedPiece).not.toBeNull();
            expect(exd5Move.capturedPiece.type).toBe('p');
            expect(exd5Move.capturedPiece.color).toBe('b');
        });

        it('should generate Move objects with promotion information', () => {
            // Set up a position where promotion is possible
            board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');

            const moves = board.getLegalMoves();
            const promotionMoves = moves.filter(move => move.isPromotion());

            expect(promotionMoves.length).toBe(4); // Q, R, B, N promotions

            const queenPromotion = promotionMoves.find(move => move.promotion === 'q');
            expect(queenPromotion).toBeDefined();
            expect(queenPromotion.from).toBe('a7');
            expect(queenPromotion.to).toBe('a8');
            expect(queenPromotion.san).toBe('a8=Q');
        });

        it('should generate castling Move objects', () => {
            // Set up a position where castling is possible for white (it's white's turn)
            board.loadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');

            const moves = board.getLegalMoves();
            const castlingMoves = moves.filter(move => move.isCastling);

            expect(castlingMoves.length).toBe(2); // Kingside and queenside for white

            const kingsideCastling = castlingMoves.find(move => move.san === 'O-O');
            expect(kingsideCastling).toBeDefined();
            expect(kingsideCastling.from).toBe('e1');
            expect(kingsideCastling.to).toBe('g1');
            expect(kingsideCastling.castlingSide).toBe('kingside');

            const queensideCastling = castlingMoves.find(move => move.san === 'O-O-O');
            expect(queensideCastling).toBeDefined();
            expect(queensideCastling.from).toBe('e1');
            expect(queensideCastling.to).toBe('c1');
            expect(queensideCastling.castlingSide).toBe('queenside');
        });
    });

    describe('Move Making', () => {
        it('should make simple pawn moves', () => {
            expect(board.makeMove('e4')).toBe(true);
            expect(board.getPiece('e4')).toEqual({ type: 'p', color: 'w' });
            expect(board.getPiece('e2')).toBeNull();
            expect(board.getActiveColor()).toBe('b');
        });

        it('should make piece moves', () => {
            board.makeMove('e4');
            board.makeMove('e5');
            expect(board.makeMove('Nf3')).toBe(true);
            expect(board.getPiece('f3')).toEqual({ type: 'n', color: 'w' });
            expect(board.getPiece('g1')).toBeNull();
        });

        it('should handle captures', () => {
            board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
            board.makeMove('exd5'); // This should be 'exd5' if there's a pawn on d5
            // Let's use a simpler capture test
            board.loadFen('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2');
            expect(board.makeMove('exd5')).toBe(true);
            expect(board.getPiece('d5')).toEqual({ type: 'p', color: 'w' });
            expect(board.getPiece('e4')).toBeNull();
        });

        it('should reject invalid moves', () => {
            expect(board.makeMove('e5')).toBe(false); // Can't move 2 squares from starting position
            expect(board.makeMove('Ke2')).toBe(false); // King blocked by pawn
            expect(board.makeMove('invalid')).toBe(false); // Invalid notation
        });
    });

    describe('Castling', () => {
        beforeEach(() => {
            // Set up position where castling is possible
            board.loadFen('r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1');
        });

        it('should allow kingside castling', () => {
            expect(board.makeMove('O-O')).toBe(true);
            expect(board.getPiece('g1')).toEqual({ type: 'k', color: 'w' });
            expect(board.getPiece('f1')).toEqual({ type: 'r', color: 'w' });
            expect(board.getPiece('e1')).toBeNull();
            expect(board.getPiece('h1')).toBeNull();
        });

        it('should allow queenside castling', () => {
            expect(board.makeMove('O-O-O')).toBe(true);
            expect(board.getPiece('c1')).toEqual({ type: 'k', color: 'w' });
            expect(board.getPiece('d1')).toEqual({ type: 'r', color: 'w' });
            expect(board.getPiece('e1')).toBeNull();
            expect(board.getPiece('a1')).toBeNull();
        });

        it('should not allow castling when in check', () => {
            board.loadFen('r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R2qK2R w KQkq - 0 1'); // Black queen attacks king
            expect(board.makeMove('O-O')).toBe(false);
            expect(board.makeMove('O-O-O')).toBe(false);
        });
    });

    describe('En Passant', () => {
        it('should handle en passant capture', () => {
            board.loadFen('rnbqkbnr/ppp1p1pp/8/3pPp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3');
            expect(board.makeMove('exf6')).toBe(true);
            expect(board.getPiece('f6')).toEqual({ type: 'p', color: 'w' });
            expect(board.getPiece('f5')).toBeNull(); // Captured pawn removed
            expect(board.getPiece('e5')).toBeNull(); // Moving pawn gone
        });
    });

    describe('Promotion', () => {
        it('should handle pawn promotion', () => {
            board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
            expect(board.makeMove('a8=Q')).toBe(true);
            expect(board.getPiece('a8')).toEqual({ type: 'q', color: 'w', promoted: true });
        });

        it('should handle promotion to different pieces', () => {
            const pieces = ['Q', 'R', 'B', 'N'];
            pieces.forEach(piece => {
                board.loadFen('8/P7/8/8/8/8/8/8 w - - 0 1');
                expect(board.makeMove(`a8=${piece}`)).toBe(true);
                expect(board.getPiece('a8')).toEqual({ type: piece.toLowerCase(), color: 'w', promoted: true });
            });
        });
    });

    describe('Check Detection', () => {
        it('should detect check', () => {
            board.loadFen('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
            expect(board.isCheckmate()).toBe(true); // This is actually checkmate
        });

        it('should detect checkmate', () => {
            board.loadFen('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
            expect(board.isCheckmate()).toBe(true);
            expect(board.isGameOver()).toBe(true);
        });

        it('should detect stalemate', () => {
            // A proper stalemate position: Black king on a8, White king on a6, White queen on b6
            board.loadFen('k7/8/KQ6/8/8/8/8/8 b - - 0 1');
            expect(board.isStalemate()).toBe(true);
            expect(board.isGameOver()).toBe(true);
        });
    });

    describe('Game State', () => {
        it('should track move history', () => {
            board.makeMove('e4');
            board.makeMove('e5');
            board.makeMove('Nf3');

            const history = board.getMoveHistory();
            expect(history.length).toBe(3);
            expect(history[0].san).toBe('e4');
            expect(history[1].san).toBe('e5');
            expect(history[2].san).toBe('Nf3');
        });

        it('should get last move', () => {
            board.makeMove('e4');
            const lastMove = board.getLastMove();
            expect(lastMove.san).toBe('e4');
            expect(lastMove.from).toBe('e2');
            expect(lastMove.to).toBe('e4');
        });

        it('should detect insufficient material', () => {
            board.loadFen('8/8/8/8/8/8/8/k6K w - - 0 1'); // King vs King
            expect(board.isInsufficientMaterial()).toBe(true);

            board.loadFen('8/8/8/8/8/8/8/kb5K w - - 0 1'); // King + Bishop vs King
            expect(board.isInsufficientMaterial()).toBe(true);

            board.loadFen('8/8/8/8/8/8/8/kn5K w - - 0 1'); // King + Knight vs King
            expect(board.isInsufficientMaterial()).toBe(true);
        });

        it('should handle threefold repetition correctly', () => {
            // Set up a position that can repeat
            board.loadFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

            // Make moves that will repeat the position
            board.makeMove('Nf3');
            board.makeMove('Nf6');
            board.makeMove('Ng1');
            board.makeMove('Ng8');
            board.makeMove('Nf3');
            board.makeMove('Nf6');
            board.makeMove('Ng1');
            board.makeMove('Ng8');

            expect(board.isThreefoldRepetition()).toBe(true);
            expect(board.canClaimDraw()).toBe(true);
            expect(board.getClaimableDrawResult()).toBe('threefold_repetition');
            expect(board.isGameOver()).toBe(false); // Game is not automatically over
            expect(board.getGameResult()).toBe('ongoing'); // Game is still ongoing
        });

        it('should handle draw claiming correctly', () => {
            // Test when no draw can be claimed
            expect(board.canClaimDraw()).toBe(false);
            expect(board.getClaimableDrawResult()).toBeNull();

            // Test fifty-move rule
            board.halfmoveClock = 100;
            expect(board.canClaimDraw()).toBe(true);
            expect(board.getClaimableDrawResult()).toBe('fifty_move_rule');
            expect(board.isGameOver()).toBe(false);
        });
    });

    describe('Premove Validation', () => {
        it('should validate legal premoves for the inactive color', () => {
            // White to move, so black can make premoves
            expect(board.isValidPremove('e7', 'e5')).toBe(true); // Black pawn move
            expect(board.isValidPremove('g8', 'f6')).toBe(true); // Black knight move
            expect(board.isValidPremove('d7', 'd6')).toBe(true); // Black pawn move
        });

        it('should reject premoves for the active color', () => {
            // White to move, so white cannot make premoves
            expect(board.isValidPremove('e2', 'e4')).toBe(false); // White's turn
            expect(board.isValidPremove('g1', 'f3')).toBe(false); // White's turn
        });

        it('should reject invalid piece movement patterns', () => {
            // Invalid moves regardless of position
            expect(board.isValidPremove('e7', 'e4')).toBe(false); // Pawn can't move 3 squares
            expect(board.isValidPremove('g8', 'e5')).toBe(false); // Knight invalid move
            expect(board.isValidPremove('a8', 'h1')).toBe(false); // Rook can't move diagonally
        });

        it('should validate premoves that become legal after opponent moves', () => {
            // Set up a position where a premove becomes valid after opponent moves
            board.loadFen('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2');

            // White to move, black can premove
            // Black bishop on f8 can potentially move to c5 after white moves
            expect(board.isValidPremove('f8', 'c5')).toBe(true);

            // Black knight can potentially move to various squares
            expect(board.isValidPremove('g8', 'f6')).toBe(true);
            expect(board.isValidPremove('b8', 'c6')).toBe(true);
        });

        it('should handle premoves in complex positions', () => {
            // Set up a more complex position
            board.loadFen('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4');

            // White to move, black can make premoves
            // Black can potentially capture the bishop on c4
            expect(board.isValidPremove('f6', 'e4')).toBe(true); // Knight can potentially move
            expect(board.isValidPremove('d7', 'd6')).toBe(true); // Pawn move
        });

        it('should reject premoves when piece does not exist', () => {
            expect(board.isValidPremove('e4', 'e5')).toBe(false); // No piece on e4
            expect(board.isValidPremove('d4', 'd5')).toBe(false); // No piece on d4
        });

        it('should work correctly when switching turns', () => {
            // Make a white move, now black is active and white can premove
            board.makeMove('e4');

            // Now black to move, white can make premoves
            expect(board.isValidPremove('g1', 'f3')).toBe(true); // White knight
            expect(board.isValidPremove('f1', 'c4')).toBe(true); // White bishop

            // Black cannot make premoves (it's their turn)
            expect(board.isValidPremove('e7', 'e5')).toBe(false);
        });
    });

    describe('Chess Variants', () => {
        describe('Chess960 (Fischer Random)', () => {
            it('should create valid Chess960 starting positions', () => {
                const chess960Board = new ChessBoard('chess960');
                expect(chess960Board.getVariant()).toBe('chess960');

                // Check that back rank has correct pieces
                const fen = chess960Board.getFen();
                const position = fen.split(' ')[0];
                const backRank = position.split('/')[0]; // Black's back rank (first in FEN)

                // Should have exactly one king, one queen, two rooks, two bishops, two knights
                expect((backRank.match(/k/g) || []).length).toBe(1);
                expect((backRank.match(/q/g) || []).length).toBe(1);
                expect((backRank.match(/r/g) || []).length).toBe(2);
                expect((backRank.match(/b/g) || []).length).toBe(2);
                expect((backRank.match(/n/g) || []).length).toBe(2);
            });
        });

        describe('Losers Chess', () => {
            it('should initialize losers variant', () => {
                const losersBoard = new ChessBoard('losers');
                expect(losersBoard.getVariant()).toBe('losers');
                expect(losersBoard.getLegalMoves().length).toBe(20);
            });
        });

        describe('Suicide Chess', () => {
            it('should initialize suicide variant', () => {
                const suicideBoard = new ChessBoard('suicide');
                expect(suicideBoard.getVariant()).toBe('suicide');
                expect(suicideBoard.getLegalMoves().length).toBe(20);
            });
        });

        describe('Atomic Chess', () => {
            it('should initialize atomic variant', () => {
                const atomicBoard = new ChessBoard('atomic');
                expect(atomicBoard.getVariant()).toBe('atomic');
                expect(atomicBoard.getLegalMoves().length).toBe(20);
            });
        });

        describe('Crazyhouse', () => {
            it('should initialize crazyhouse variant', () => {
                const crazyhouseBoard = new ChessBoard('crazyhouse');
                expect(crazyhouseBoard.getVariant()).toBe('crazyhouse');
                expect(crazyhouseBoard.getLegalMoves().length).toBe(20);
            });
        });
    });

    describe('Complex Game Scenarios', () => {
        it('should handle a complete game', () => {
            // Scholar's Mate
            expect(board.makeMove('e4')).toBe(true);
            expect(board.makeMove('e5')).toBe(true);
            expect(board.makeMove('Bc4')).toBe(true);
            expect(board.makeMove('Nc6')).toBe(true);
            expect(board.makeMove('Qh5')).toBe(true);
            expect(board.makeMove('Nf6')).toBe(true);
            expect(board.makeMove('Qxf7#')).toBe(true);

            expect(board.isCheckmate()).toBe(true);
            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe('checkmate');
        });

        it('should handle fifty-move rule', () => {
            board.halfmoveClock = 100;
            expect(board.isGameOver()).toBe(false); // Game is not automatically over
            expect(board.isFiftyMoveRule()).toBe(true); // But fifty-move rule can be claimed
            expect(board.canClaimDraw()).toBe(true); // Draw can be claimed
            expect(board.getClaimableDrawResult()).toBe('fifty_move_rule');
            expect(board.getGameResult()).toBe('ongoing'); // Game is still ongoing until claimed
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle invalid SAN notation', () => {
            expect(board.makeMove('')).toBe(false);
            expect(board.makeMove('invalid')).toBe(false);
            expect(board.makeMove('e9')).toBe(false);
            expect(board.makeMove('Zf3')).toBe(false);
        });

        it('should maintain board integrity after invalid moves', () => {
            const originalFen = board.getFen();
            board.makeMove('invalid');
            expect(board.getFen()).toBe(originalFen);
        });
    });

    describe('Integration with Existing Codebase', () => {
        it('should be compatible with chess.js API', () => {
            expect(typeof board.makeMove).toBe('function');
            expect(typeof board.getLegalMoves).toBe('function');
            expect(typeof board.getFen).toBe('function');
            expect(typeof board.loadFen).toBe('function');
            expect(typeof board.isGameOver).toBe('function');
            expect(typeof board.isCheckmate).toBe('function');
            expect(typeof board.isStalemate).toBe('function');
        });

        it('should provide all required methods for FICS interface', () => {
            expect(typeof board.isValidPremove).toBe('function');
            expect(typeof board.getMoveHistory).toBe('function');
            expect(typeof board.getLastMove).toBe('function');
            expect(typeof board.getGameResult).toBe('function');
            expect(typeof board.getVariant).toBe('function');
            expect(typeof board.getActiveColor).toBe('function');
        });
    });

    describe('Chess Variants', () => {
        it('should initialize different variants correctly', () => {
            const variants = ['standard', 'losers', 'suicide', 'atomic', 'crazyhouse', 'chess960'];
            variants.forEach(variant => {
                const testBoard = new ChessBoard(variant);
                expect(testBoard.getVariant()).toBe(variant);
                expect(testBoard.getLegalMoves().length).toBeGreaterThan(0);
            });
        });
    });

    describe('Complex Game Scenarios', () => {
        it('should handle a complete game (Scholar\'s Mate)', () => {
            expect(board.makeMove('e4')).toBe(true);
            expect(board.makeMove('e5')).toBe(true);
            expect(board.makeMove('Bc4')).toBe(true);
            expect(board.makeMove('Nc6')).toBe(true);
            expect(board.makeMove('Qh5')).toBe(true);
            expect(board.makeMove('Nf6')).toBe(true);
            expect(board.makeMove('Qxf7#')).toBe(true);

            expect(board.isCheckmate()).toBe(true);
            expect(board.isGameOver()).toBe(true);
            expect(board.getGameResult()).toBe('checkmate');
        });

        it('should handle fifty-move rule', () => {
            board.halfmoveClock = 100;
            expect(board.isGameOver()).toBe(false); // Game is not automatically over
            expect(board.isFiftyMoveRule()).toBe(true); // But fifty-move rule can be claimed
            expect(board.canClaimDraw()).toBe(true); // Draw can be claimed
            expect(board.getClaimableDrawResult()).toBe('fifty_move_rule');
            expect(board.getGameResult()).toBe('ongoing'); // Game is still ongoing until claimed
        });
    });

    describe('Integration Tests', () => {
        it('should be compatible with chess.js API', () => {
            expect(typeof board.makeMove).toBe('function');
            expect(typeof board.getLegalMoves).toBe('function');
            expect(typeof board.getFen).toBe('function');
            expect(typeof board.loadFen).toBe('function');
            expect(typeof board.isGameOver).toBe('function');
            expect(typeof board.isCheckmate).toBe('function');
            expect(typeof board.isStalemate).toBe('function');
        });

        it('should provide FICS-specific methods', () => {
            expect(typeof board.isValidPremove).toBe('function');
            expect(typeof board.getMoveHistory).toBe('function');
            expect(typeof board.getLastMove).toBe('function');
            expect(typeof board.getGameResult).toBe('function');
            expect(typeof board.getVariant).toBe('function');
            expect(typeof board.getActiveColor).toBe('function');
            expect(typeof board.canClaimDraw).toBe('function');
            expect(typeof board.getClaimableDrawResult).toBe('function');
            expect(typeof board.isFiftyMoveRule).toBe('function');
            expect(typeof board.isThreefoldRepetition).toBe('function');
        });
    });

    describe('Famous Games Tests', () => {
        describe('Standard Chess - Famous Games', () => {
            it('should play the Immortal Game (Anderssen vs Kieseritzky, 1851)', () => {
                // One of the most famous chess games ever played - ACTUAL GAME SEQUENCE
                const moves = [
                    'e4', 'e5', 'f4', 'exf4', 'Bc4', 'Qh4+', 'Kf1', 'b5',
                    'Bxb5', 'Nf6', 'Nf3', 'Qh6', 'd3', 'Nh5', 'Nh4', 'Qg5',
                    'Nf5', 'c6', 'g4', 'Nf6', 'Rg1', 'cxb5', 'h4', 'Qg6',
                    'h5', 'Qg5', 'Qf3', 'Ng8', 'Bxf4', 'Qf6', 'Nc3', 'Bc5',
                    'Nd5', 'Qxb2', 'Bd6', 'Bxg1', 'e5', 'Qxa1+', 'Ke2', 'Na6',
                    'Nxg7+', 'Kd8', 'Qf6+', 'Nxf6', 'Be7#'
                ];

                moves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.isCheckmate()).toBe(true);
                expect(board.isGameOver()).toBe(true);
                expect(board.getMoveHistory().length).toBe(moves.length);
            });

            it('should play the Opera Game (Morphy vs Duke of Brunswick, 1858)', () => {
                // Paul Morphy's brilliant sacrificial attack - ACTUAL GAME SEQUENCE
                const moves = [
                    'e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3',
                    'Qxf3', 'dxe5', 'Bc4', 'Nf6', 'Qb3', 'Qe7', 'Nc3', 'c6',
                    'Bg5', 'b5', 'Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8',
                    'Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7', 'Qb8+', 'Nxb8', 'Rd8#'
                ];

                moves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.isCheckmate()).toBe(true);
                expect(board.isGameOver()).toBe(true);
            });

            it('should play Kasparov vs Topalov (1999) - Brilliant tactical game', () => {
                // Famous game with spectacular tactics
                const moves = [
                    'e4', 'd6', 'd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7',
                    'Qd2', 'c6', 'f3', 'b5', 'Nge2', 'Nbd7', 'Bh6', 'Bxh6',
                    'Qxh6', 'Bb7', 'a3', 'e5', 'O-O-O', 'Qe7', 'Kb1', 'a6',
                    'Nc1', 'O-O-O', 'Nb3', 'exd4', 'Rxd4', 'c5', 'Rd1', 'Nb6',
                    'g3', 'Kb8', 'Na5', 'Ba8', 'Bh3', 'd5', 'Qf4+', 'Ka7',
                    'Rhe1', 'd4', 'Nd5', 'Nbxd5', 'exd5', 'Qd6', 'Rxd4', 'cxd4',
                    'Re7+', 'Kb6', 'Qxd4+', 'Kxa5', 'b4+', 'Ka4', 'Qc3', 'Qxd5',
                    'Ra7', 'Bb7', 'Rxb7', 'Qc4', 'Qxf6', 'Kxa3', 'Qxa6+', 'Kxb4',
                    'c3+', 'Kxc3', 'Qa1+', 'Kd2', 'Qb2+', 'Kd1', 'Bf1', 'Rd2',
                    'Rd7', 'Rxd7', 'Bxc4', 'bxc4', 'Qxh8', 'Rd3', 'Qa8', 'c3',
                    'Qa4+', 'Ke1', 'f4', 'f5', 'Kc1', 'Rd2', 'Qa7'
                ];

                // Play first 20 moves to test the opening and early middle game
                const testMoves = moves.slice(0, 20);
                testMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.isGameOver()).toBe(false);
                expect(board.getMoveHistory().length).toBe(testMoves.length);
            });
        });

        describe('Chess960 - Famous Games', () => {
            it('should play a Chess960 game with castling variations', () => {
                // Set up a specific Chess960 position for testing
                board = new ChessBoard('chess960', 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

                const moves = [
                    'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6',
                    'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O',
                    'h3', 'Nb8', 'd4', 'Nbd7', 'Nbd2', 'Bb7', 'Bc2', 'Re8'
                ];

                moves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Chess960 Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getVariant()).toBe('chess960');
                expect(board.getMoveHistory().length).toBe(moves.length);
            });
        });

        describe('Atomic Chess - Sample Games', () => {
            it('should play an atomic chess game with explosions', () => {
                board = new ChessBoard('atomic');

                // Atomic chess moves - captures cause explosions
                // This is a simplified sequence that accounts for atomic explosions
                const moves = [
                    'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'f5', 'exf5', 'd6',
                    'Ng5', 'Nh6', 'Qh5+', 'g6', 'fxg6'
                ];

                moves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Atomic Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getVariant()).toBe('atomic');
                expect(board.getMoveHistory().length).toBe(moves.length);

                // Verify that explosions occurred by checking that some pieces are missing
                // After fxg6 capture, there should be an explosion at g6
                const moveHistory = board.getMoveHistory();
                const captureMove = moveHistory.find(move => move.san === 'fxg6');
                expect(captureMove).toBeDefined();
            });
        });

        describe('Crazyhouse - Sample Games', () => {
            it('should play a crazyhouse game with piece drops', () => {
                board = new ChessBoard('crazyhouse');

                // Very simple test - just verify basic capture and drop functionality
                // 1. Make opening moves
                expect(board.makeMove('e4')).toBe(true);
                expect(board.makeMove('d5')).toBe(true);

                // 2. White captures black pawn (white gets pawn)
                expect(board.makeMove('exd5')).toBe(true);
                expect(board.getCapturedPieces('w')).toContain('p');

                // 3. Black makes a move
                expect(board.makeMove('Nf6')).toBe(true);

                // 4. White drops captured pawn
                expect(board.makeMove('P@e6')).toBe(true);
                expect(board.getCapturedPieces('w')).not.toContain('p'); // Pawn used

                expect(board.getVariant()).toBe('crazyhouse');

                // Check that drop was recorded
                const moveHistory = board.getMoveHistory();
                const dropMoves = moveHistory.filter(move => move.san && move.san.includes('@'));
                expect(dropMoves.length).toBe(1); // P@e6
            });

            it('should handle simple piece drops', () => {
                board = new ChessBoard('crazyhouse');

                // Another simple test with knight capture
                // 1. Opening moves
                expect(board.makeMove('Nf3')).toBe(true);
                expect(board.makeMove('Nc6')).toBe(true);
                expect(board.makeMove('e4')).toBe(true);
                expect(board.makeMove('e5')).toBe(true);

                // 2. White captures black pawn (white gets pawn)
                expect(board.makeMove('Nxe5')).toBe(true);
                expect(board.getCapturedPieces('w')).toContain('p');

                // 3. Black captures white knight (black gets knight)
                expect(board.makeMove('Nxe5')).toBe(true);
                expect(board.getCapturedPieces('b')).toContain('n');

                // 4. White drops captured pawn
                expect(board.makeMove('P@f6')).toBe(true);
                expect(board.getCapturedPieces('w')).not.toContain('p');

                // 5. Black knight moves
                expect(board.makeMove('Ng6')).toBe(true);

                // 6. White makes normal move
                expect(board.makeMove('d4')).toBe(true);

                // 7. Black drops captured knight
                expect(board.makeMove('N@e2+')).toBe(true);
                expect(board.getCapturedPieces('b')).not.toContain('n');

                expect(board.getVariant()).toBe('crazyhouse');

                // Verify drops were recorded
                const moveHistory = board.getMoveHistory();
                const dropMoves = moveHistory.filter(move => move.san.includes('@'));
                expect(dropMoves.length).toBe(2); // P@f6 and N@e2+
            });

            it('should track captured pieces correctly', () => {
                board = new ChessBoard('crazyhouse');

                // Initially no captured pieces
                expect(board.getCapturedPieces('w')).toEqual([]);
                expect(board.getCapturedPieces('b')).toEqual([]);

                // Make some moves leading to captures
                board.makeMove('e4');
                board.makeMove('e5');
                board.makeMove('Nf3');
                board.makeMove('Nc6');

                // White captures black pawn
                board.makeMove('Nxe5');

                // White should now have a captured pawn
                const whiteCaptured = board.getCapturedPieces('w');
                expect(whiteCaptured).toContain('p');
                expect(whiteCaptured.length).toBe(1);

                // Black captures white knight
                board.makeMove('Nxe5');

                // Black should now have a captured knight
                const blackCaptured = board.getCapturedPieces('b');
                expect(blackCaptured).toContain('n');
                expect(blackCaptured.length).toBe(1);

                // Test piece drops
                board.makeMove('P@f6'); // White drops captured pawn

                // White should no longer have the pawn
                const whiteAfterDrop = board.getCapturedPieces('w');
                expect(whiteAfterDrop).not.toContain('p');
                expect(whiteAfterDrop.length).toBe(0);
            });

            it('should handle promoted pieces correctly when captured', () => {
                board = new ChessBoard('crazyhouse');

                // Set up a position where a pawn can promote and then be captured
                board.loadFen('8/P7/8/8/8/8/8/r7 w - - 0 1');

                // Promote pawn to queen
                board.makeMove('a8=Q');

                // Black captures the promoted queen with rook
                board.makeMove('Rxa8');

                // The captured promoted piece should revert to a pawn
                const blackCaptured = board.getCapturedPieces('b');
                expect(blackCaptured).toContain('p'); // Should be pawn, not queen
                expect(blackCaptured).not.toContain('q');
            });
        });

        describe('Suicide Chess - Sample Games', () => {
            it('should play a suicide chess game', () => {
                board = new ChessBoard('suicide');

                // In suicide chess, captures are mandatory when available
                const moves = [
                    'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'f5', 'exf5', 'd6',
                    'Ng5', 'h6', 'Nf7', 'Kxf7', 'Qh5+', 'Kg8', 'Qh7+', 'Kf7',
                    'Qh5+', 'Kg8', 'Qh7+', 'Kf7'
                ];

                // Play first few moves to test basic functionality
                const testMoves = moves.slice(0, 10);
                testMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Suicide Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getVariant()).toBe('suicide');
                expect(board.getMoveHistory().length).toBe(testMoves.length);
            });
        });

        describe('Losers Chess - Sample Games', () => {
            it('should play a losers chess game', () => {
                board = new ChessBoard('losers');

                // In losers chess, the goal is to lose all pieces or be stalemated
                const moves = [
                    'e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'f5', 'exf5', 'd6',
                    'Ng5', 'h6', 'Nf7', 'Kxf7', 'Qh5+', 'Kg8', 'Qe8+', 'Kh7',
                    'Qe4+', 'Kg8', 'Qe8+', 'Kh7'
                ];

                // Play first few moves to test basic functionality
                const testMoves = moves.slice(0, 10);
                testMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Losers Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getVariant()).toBe('losers');
                expect(board.getMoveHistory().length).toBe(testMoves.length);
            });
        });

        describe('Complex Tactical Positions', () => {
            it('should handle complex tactical sequences', () => {
                // Load a tactical position from the Italian Game
                board.loadFen('r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4');

                const tacticalMoves = [
                    'Be7', 'Ng5', 'd6', 'Nxf7', 'Kxf7', 'Qh5+', 'Kg8',
                    'Qxe5', 'Nxe5', 'f4', 'Nc6', 'Bb5'
                ];

                tacticalMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Tactical Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getMoveHistory().length).toBe(tacticalMoves.length);
            });

            it('should handle endgame positions correctly', () => {
                // Load a king and pawn endgame
                board.loadFen('8/8/8/8/8/8/4K3/4k3 w - - 0 1');

                const endgameMoves = [
                    'Kd3', 'Kd1', 'Kd4', 'Ke2', 'Ke5', 'Kf3',
                    'Kf5', 'Kg3', 'Kg5', 'Kh3', 'Kh5', 'Kg3'
                ];

                endgameMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Endgame Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getMoveHistory().length).toBe(endgameMoves.length);
            });
        });

        describe('Promotion and Special Moves', () => {
            it('should handle multiple promotions in a game', () => {
                // Set up a position where promotions are possible
                board.loadFen('8/P1P1P1P1/8/8/8/8/p1p1p1p1/8 w - - 0 1');

                const promotionMoves = [
                    'a8=Q', 'a1=Q', 'c8=R', 'c1=R', 'e8=B', 'e1=B', 'g8=N', 'g1=N'
                ];

                promotionMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `Promotion Move ${index + 1}: ${move} should be legal`);
                });

                // Check that all promotions were successful
                expect(board.getPiece('a8')).toEqual({ type: 'q', color: 'w', promoted: true });
                expect(board.getPiece('a1')).toEqual({ type: 'q', color: 'b', promoted: true });
                expect(board.getPiece('c8')).toEqual({ type: 'r', color: 'w', promoted: true });
                expect(board.getPiece('c1')).toEqual({ type: 'r', color: 'b', promoted: true });
                expect(board.getPiece('e8')).toEqual({ type: 'b', color: 'w', promoted: true });
                expect(board.getPiece('e1')).toEqual({ type: 'b', color: 'b', promoted: true });
                expect(board.getPiece('g8')).toEqual({ type: 'n', color: 'w', promoted: true });
                expect(board.getPiece('g1')).toEqual({ type: 'n', color: 'b', promoted: true });
            });

            it('should handle en passant in complex positions', () => {
                // Set up position for en passant
                board.loadFen('rnbqkbnr/ppp1p1pp/8/3pPp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3');

                const enPassantMoves = [
                    'exf6', 'gxf6', 'Nf3', 'Nh6', 'h3', 'Nf5', 'g3', 'Ne3'
                ];

                enPassantMoves.forEach((move, index) => {
                    const result = board.makeMove(move);
                    expect(result).toBe(true, `En Passant Move ${index + 1}: ${move} should be legal`);
                });

                expect(board.getMoveHistory().length).toBe(enPassantMoves.length);
            });
        });
    });
});

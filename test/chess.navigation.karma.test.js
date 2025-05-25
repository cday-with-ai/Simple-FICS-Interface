import { ChessBoard } from '../scripts/ChessBoard.js';
import { jumpToMove, jumpToFirstMove, jumpToLastMove, jumpToPreviousMove, jumpToNextMove } from '../scripts/chess.js';

describe('Chess Board Navigation Functions', () => {
    let chessBoard;
    let originalGameState;
    let mockUpdateBoardGraphicsAndSquareListeners;
    let mockUpdateBoardBottomLabels;
    let mockHighlightSelectedMoveInternal;
    let mockUnselectMoveInMoveList;

    beforeEach(() => {
        // Create a fresh ChessBoard for each test
        chessBoard = new ChessBoard();

        // Save original gameState if it exists
        originalGameState = window.gameState;

        // Set up mock gameState
        window.gameState = {
            chessBoard: chessBoard,
            fen: chessBoard.getFen()
        };

        // Mock UI update functions
        mockUpdateBoardGraphicsAndSquareListeners = jasmine.createSpy('updateBoardGraphicsAndSquareListeners');
        mockUpdateBoardBottomLabels = jasmine.createSpy('updateBoardBottomLabels');
        mockHighlightSelectedMoveInternal = jasmine.createSpy('highlightSelectedMoveInternal');
        mockUnselectMoveInMoveList = jasmine.createSpy('unselectMoveInMoveList');

        // Set up global functions that the navigation functions expect
        window.updateBoardGraphicsAndSquareListeners = mockUpdateBoardGraphicsAndSquareListeners;
        window.updateBoardBottomLabels = mockUpdateBoardBottomLabels;
        window.highlightSelectedMoveInternal = mockHighlightSelectedMoveInternal;
        window.unselectMoveInMoveList = mockUnselectMoveInMoveList;

        // Mock console methods to avoid noise in tests
        spyOn(console, 'log');
        spyOn(console, 'warn');
    });

    afterEach(() => {
        // Restore original gameState
        window.gameState = originalGameState;

        // Clean up global functions
        delete window.updateBoardGraphicsAndSquareListeners;
        delete window.updateBoardBottomLabels;
        delete window.highlightSelectedMoveInternal;
        delete window.unselectMoveInMoveList;
    });

    describe('jumpToMove(moveNumber, color)', () => {
        beforeEach(() => {
            // Set up a game with some moves for testing
            chessBoard.makeMove('e4');
            chessBoard.makeMove('e5');
            chessBoard.makeMove('Nf3');
            chessBoard.makeMove('Nc6');
            // Update gameState to reflect current position
            window.gameState.fen = chessBoard.getFen();
            window.gameState.chessBoard = chessBoard;
        });

        it('should verify function import', () => {
            // Test that the function is imported correctly
            expect(typeof jumpToMove).toBe('function');
            console.log('jumpToMove function type:', typeof jumpToMove);
            console.log('jumpToMove function:', jumpToMove);
        });

        it('should handle empty move history gracefully', () => {
            const emptyBoard = new ChessBoard();
            window.gameState.chessBoard = emptyBoard;

            jumpToMove(1, 'w');

            // Should not crash and not call UI updates
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });

        it('should debug position history', () => {
            // Debug: Check the state after making moves
            console.log('=== DEBUG POSITION HISTORY ===');
            console.log('Move history length:', chessBoard.getMoveHistory().length);
            console.log('Move history:', chessBoard.getMoveHistory().map(m => m.san));
            console.log('Position history length:', chessBoard.positionHistory.length);
            console.log('Position history:', chessBoard.positionHistory);
            console.log('Current FEN:', chessBoard.getFen());

            // Test each position in history
            for (let i = 0; i < chessBoard.positionHistory.length; i++) {
                console.log(`Position ${i}:`, chessBoard.getFenBeforeHalfmove(i));
            }

            // Test the specific call that jumpToMove makes
            console.log('getFenBeforeHalfmove(0):', chessBoard.getFenBeforeHalfmove(0));
            console.log('getFenBeforeHalfmove(1):', chessBoard.getFenBeforeHalfmove(1));

            // This test is just for debugging
            expect(true).toBe(true);
        });

        it('should jump to first white move correctly', () => {
            jumpToMove(1, 'w');

            // Should get FEN before first half-move (starting position)
            const expectedFen = chessBoard.getFenBeforeHalfmove(0);
            expect(window.gameState.fen).toBe(expectedFen);
            expect(mockUpdateBoardGraphicsAndSquareListeners).toHaveBeenCalledWith(false);
            expect(mockUpdateBoardBottomLabels).toHaveBeenCalled();
            expect(mockHighlightSelectedMoveInternal).toHaveBeenCalledWith(1, 'w');
        });

        it('should jump to first black move correctly', () => {
            jumpToMove(1, 'b');

            // Should get FEN after second half-move (e5)
            const expectedFen = chessBoard.getFenBeforeHalfmove(2);
            expect(window.gameState.fen).toBe(expectedFen);
            expect(mockHighlightSelectedMoveInternal).toHaveBeenCalledWith(1, 'b');
        });

        it('should jump to second white move correctly', () => {
            jumpToMove(2, 'w');

            // Should get FEN after third half-move (Nf3)
            const expectedFen = chessBoard.getFenBeforeHalfmove(3);
            expect(window.gameState.fen).toBe(expectedFen);
            expect(mockHighlightSelectedMoveInternal).toHaveBeenCalledWith(2, 'w');
        });

        it('should handle invalid move numbers gracefully', () => {
            jumpToMove(10, 'w'); // Move that doesn't exist

            expect(console.warn).toHaveBeenCalled();
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });

        it('should handle negative move numbers gracefully', () => {
            jumpToMove(-1, 'w');

            expect(console.warn).toHaveBeenCalled();
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });

        it('should handle invalid color parameter gracefully', () => {
            jumpToMove(1, 'x');

            expect(console.warn).toHaveBeenCalled();
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });
    });

    describe('jumpToFirstMove()', () => {
        it('should handle empty move history gracefully', () => {
            jumpToFirstMove();

            // Should not crash and not call UI updates
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });

        it('should jump to starting position', () => {
            // Set up a game with moves
            chessBoard.makeMove('e4');
            chessBoard.makeMove('e5');
            // Update gameState to reflect current position
            window.gameState.fen = chessBoard.getFen();
            window.gameState.chessBoard = chessBoard;

            jumpToFirstMove();

            // Should get starting position (before any moves)
            const expectedFen = chessBoard.getFenBeforeHalfmove(0);
            expect(window.gameState.fen).toBe(expectedFen);
            expect(mockUpdateBoardGraphicsAndSquareListeners).toHaveBeenCalledWith(false);
            expect(mockUpdateBoardBottomLabels).toHaveBeenCalled();
            expect(mockUnselectMoveInMoveList).toHaveBeenCalled();
        });
    });

    describe('jumpToLastMove()', () => {
        it('should handle empty move history gracefully', () => {
            jumpToLastMove();

            // Should not crash and not call UI updates
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });

        it('should jump to current position after moves', () => {
            // Set up a game with moves
            chessBoard.makeMove('e4');
            chessBoard.makeMove('e5');
            chessBoard.makeMove('Nf3');
            // Update gameState to reflect current position
            window.gameState.fen = chessBoard.getFen();
            window.gameState.chessBoard = chessBoard;

            jumpToLastMove();

            // Should get current position
            const expectedFen = chessBoard.getFen();
            expect(window.gameState.fen).toBe(expectedFen);
            expect(mockUpdateBoardGraphicsAndSquareListeners).toHaveBeenCalledWith(false);
            expect(mockUpdateBoardBottomLabels).toHaveBeenCalled();

            // Should highlight the last move (move 2 white = Nf3)
            expect(mockHighlightSelectedMoveInternal).toHaveBeenCalledWith(2, 'w');
        });

        it('should highlight last black move correctly', () => {
            // Set up a game ending with black move
            chessBoard.makeMove('e4');
            chessBoard.makeMove('e5');
            chessBoard.makeMove('Nf3');
            chessBoard.makeMove('Nc6');
            // Update gameState to reflect current position
            window.gameState.fen = chessBoard.getFen();
            window.gameState.chessBoard = chessBoard;

            jumpToLastMove();

            // Should highlight the last move (move 2 black = Nc6)
            expect(mockHighlightSelectedMoveInternal).toHaveBeenCalledWith(2, 'b');
        });
    });

    describe('jumpToPreviousMove() and jumpToNextMove()', () => {
        it('should handle empty move history gracefully', () => {
            jumpToPreviousMove();
            jumpToNextMove();

            // Should not crash and not call UI updates for empty history
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });

        it('should jump to last move when no move is selected (jumpToPreviousMove)', () => {
            // Set up a game with moves
            chessBoard.makeMove('e4');
            chessBoard.makeMove('e5');
            // Update gameState to reflect current position
            window.gameState.fen = chessBoard.getFen();
            window.gameState.chessBoard = chessBoard;

            // Mock no selected move (no DOM element)
            window.movesListDisplayElement = null;

            jumpToPreviousMove();

            // Should call jumpToLastMove behavior
            const expectedFen = chessBoard.getFen();
            expect(window.gameState.fen).toBe(expectedFen);
        });

        it('should jump to first move when no move is selected (jumpToNextMove)', () => {
            // Set up a game with moves
            chessBoard.makeMove('e4');
            chessBoard.makeMove('e5');
            // Update gameState to reflect current position
            window.gameState.fen = chessBoard.getFen();
            window.gameState.chessBoard = chessBoard;

            // Mock no selected move (no DOM element)
            window.movesListDisplayElement = null;

            jumpToNextMove();

            // Should jump to move 1 white
            const expectedFen = chessBoard.getFenBeforeHalfmove(1);
            expect(window.gameState.fen).toBe(expectedFen);
            expect(mockHighlightSelectedMoveInternal).toHaveBeenCalledWith(1, 'w');
        });

        it('should handle missing DOM elements gracefully', () => {
            // Set up scenario where DOM elements are missing
            window.movesListDisplayElement = null;

            // Should not crash
            expect(() => jumpToPreviousMove()).not.toThrow();
            expect(() => jumpToNextMove()).not.toThrow();
        });
    });

    describe('Integration with prependMoveHistory', () => {
        it('should work correctly with games loaded from FICS', () => {
            // Create a fresh chessBoard instance for this test
            const freshChessBoard = new ChessBoard();

            // Simulate loading a mid-game position from FICS
            const midGameFen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2';
            freshChessBoard.loadFen(midGameFen);

            // Add move history that led to this position
            freshChessBoard.prependMoveHistory(['e4', 'e5']);

            // Verify that position history was built correctly
            const startingFen = freshChessBoard.getFenBeforeHalfmove(0);
            const afterE4Fen = freshChessBoard.getFenBeforeHalfmove(1);
            const afterE5Fen = freshChessBoard.getFenBeforeHalfmove(2);

            // These should not be undefined
            expect(startingFen).toBeDefined();
            expect(afterE4Fen).toBeDefined();
            expect(afterE5Fen).toBeDefined();

            // Update gameState to reflect current position
            window.gameState.fen = freshChessBoard.getFen();
            window.gameState.chessBoard = freshChessBoard;

            // Test jumping to first move
            jumpToFirstMove();
            expect(window.gameState.fen).toBe(startingFen);

            // Test jumping to specific moves
            jumpToMove(1, 'w');
            expect(window.gameState.fen).toBe(afterE4Fen);

            jumpToMove(1, 'b');
            expect(window.gameState.fen).toBe(afterE5Fen);

            // Test jumping to last move
            jumpToLastMove();
            expect(window.gameState.fen).toBe(midGameFen);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle missing gameState gracefully', () => {
            window.gameState = null;

            // Should not crash
            expect(() => jumpToMove(1, 'w')).not.toThrow();
            expect(() => jumpToFirstMove()).not.toThrow();
            expect(() => jumpToLastMove()).not.toThrow();
        });

        it('should handle missing chessBoard gracefully', () => {
            window.gameState.chessBoard = null;

            // Should not crash
            expect(() => jumpToMove(1, 'w')).not.toThrow();
            expect(() => jumpToFirstMove()).not.toThrow();
            expect(() => jumpToLastMove()).not.toThrow();
        });

        it('should handle invalid FEN from getFenBeforeHalfmove', () => {
            // Set up a game with moves
            chessBoard.makeMove('e4');

            // Mock getFenBeforeHalfmove to return null
            spyOn(chessBoard, 'getFenBeforeHalfmove').and.returnValue(null);

            jumpToMove(1, 'w');

            // Should not update gameState.fen or call UI updates
            expect(mockUpdateBoardGraphicsAndSquareListeners).not.toHaveBeenCalled();
        });
    });
});

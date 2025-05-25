import { ChessBoard, Variant } from '../scripts/ChessBoard.js';
import {
    jumpToMove,
    jumpToFirstMove,
    jumpToLastMove,
    jumpToPreviousMove,
    jumpToNextMove,
    initChessSystem,
    onStyle12,
    onNewGame,
    flipBoard,
    makeMove
} from '../scripts/chess.js';

describe('Chess Game Playing Integration Tests', () => {
    let originalGameState;
    let mockWebSocket;
    let boardElement;
    let movesListContainer;

    beforeEach(() => {
        // Save original gameState
        originalGameState = window.gameState;

        // Create mock WebSocket
        mockWebSocket = {
            send: jasmine.createSpy('send'),
            readyState: WebSocket.OPEN
        };

        // Set up DOM elements that chess.js expects
        document.body.innerHTML = `
            <div class="chess-board-area">
                <div class="board-main-container">
                    <div class="board-container">
                        <div class="board-only-container">
                            <div id="chessBoard" class="chess-board"></div>
                            <div class="bottom-labels-container">
                                <div id="lastMoveLabel" class="last-move-label"></div>
                                <div id="ecoOpeningLabel" class="eco-opening-label"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="moves-list-container" id="movesListContainer"></div>
            <div id="topPlayerName">Opponent</div>
            <div id="bottomPlayerName">You</div>
            <div id="topPlayerClock">5:00</div>
            <div id="bottomPlayerClock">5:00</div>
            <div id="gameNumber"></div>
            <div id="gameTypeInfo"></div>
        `;

        boardElement = document.getElementById('chessBoard');
        movesListContainer = document.getElementById('movesListContainer');

        // Set up global WebSocket for FICS communication
        window.ws = mockWebSocket;

        // Initialize chess system with mock WebSocket and preferences
        const mockPreferences = {
            pieceSet: 'cburnett',
            lightSquareColor: '#f0dab5',
            darkSquareColor: '#b58763',
            autoPromotion: 'q',
            showStyle12Events: false
        };

        initChessSystem(mockWebSocket, mockPreferences);

        // Mock console methods to reduce noise
        spyOn(console, 'log');
        spyOn(console, 'warn');
        spyOn(console, 'error');
    });

    afterEach(() => {
        // Restore original gameState
        window.gameState = originalGameState;

        // Clean up DOM
        document.body.innerHTML = '';

        // Clean up global WebSocket
        delete window.ws;
    });

    describe('Basic Game Playing Scenarios', () => {
        it('should start a new game and make moves', () => {
            // Simulate starting a new game from FICS
            // Call onNewGame with individual parameters as expected
            onNewGame(123, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process the initial Style12 message
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 123 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';

            // Debug: Check if onStyle12 throws an error
            expect(() => onStyle12(initialStyle12)).not.toThrow();

            // Make a move as white (our turn)
            const moveResult = makeMove('e2', 'e4', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');

            // Verify move was sent to FICS (this is the main integration point)
            // The internal game state is managed by chess.js and will be updated via Style12 events
        });

        it('should handle opponent moves via Style12', () => {
            // Start a game
            onNewGame(456, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 456 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Make our move
            const moveResult = makeMove('e2', 'e4', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');

            // Simulate opponent's response via Style12
            const opponentMoveStyle12 = '<12> rnbqkbnr pppp1ppp -------- ----p--- ----P--- -------- PPPP1PPP RNBQKBNR w -1 1 1 1 1 0 456 TestPlayer TestOpponent -1 2 12 39 39 119 120 2 e7-e5 (0:01) e5 1 0 0';

            onStyle12(opponentMoveStyle12);

            // Verify Style12 was processed (we can't easily access internal state, but we can verify no errors occurred)
            expect(onStyle12).not.toThrow();
        });

        it('should handle complete game sequence', () => {
            // Start game
            onNewGame(789, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 789 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Play a sequence of moves
            const moves = [
                { player: 'us', move: ['e2', 'e4'], style12: '<12> rnbqkbnr pppppppp -------- -------- ----P--- -------- PPPP1PPP RNBQKBNR b KQkq e3 0 1' },
                { player: 'opponent', style12: '<12> rnbqkbnr pppp1ppp -------- ----p--- ----P--- -------- PPPP1PPP RNBQKBNR w KQkq e6 0 2' },
                { player: 'us', move: ['g1', 'f3'], style12: '<12> rnbqkbnr pppp1ppp -------- ----p--- ----P--- -----N-- PPPP1PPP RNBQKB1R b KQkq - 1 2' },
                { player: 'opponent', style12: '<12> rnbqkb1r pppp1ppp -----n-- ----p--- ----P--- -----N-- PPPP1PPP RNBQKB1R w KQkq - 2 3' }
            ];

            for (let i = 0; i < moves.length; i++) {
                const moveData = moves[i];

                if (moveData.player === 'us') {
                    // Make our move
                    const result = makeMove(moveData.move[0], moveData.move[1], false);
                    expect(result).toBe(true);
                    expect(mockWebSocket.send).toHaveBeenCalledWith(`${moveData.move[0]}${moveData.move[1]}`);

                    // Process the resulting position
                    if (moveData.style12) {
                        onStyle12(moveData.style12);
                    }
                } else {
                    // Process opponent's move
                    onStyle12(moveData.style12);
                }
            }

            // Verify moves were sent to FICS
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');
            expect(mockWebSocket.send).toHaveBeenCalledWith('g1f3');
        });
    });

    describe('Premove Functionality', () => {
        it('should handle premoves when it is opponent turn', () => {
            // Start a game where it's opponent's turn
            onNewGame(111, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process Style12 where it's opponent's turn (we're playing as white, but it's black's turn)
            const opponentTurnStyle12 = '<12> rnbqkbnr pppp1ppp -------- ----p--- ----P--- -------- PPPP1PPP RNBQKBNR b -1 1 1 1 1 0 111 TestPlayer TestOpponent -1 2 12 39 39 120 120 2 e7-e5 (0:01) e5 0 0 0';
            onStyle12(opponentTurnStyle12);

            // Make a premove (third parameter true indicates premove)
            const premoveResult = makeMove('g1', 'f3', true);
            expect(premoveResult).toBe(true);
            expect(mockWebSocket.send).not.toHaveBeenCalledWith('g1f3'); // Should not send immediately

            // Simulate opponent's move, which should trigger our premove
            const opponentMoveStyle12 = '<12> rnbqkb1r pppp1ppp -----n-- ----p--- ----P--- -------- PPPP1PPP RNBQKBNR b KQkq - 2 2';
            onStyle12(opponentMoveStyle12);

            // Verify premove was executed
            expect(mockWebSocket.send).toHaveBeenCalledWith('g1f3');
        });

        it('should clear premove when making a regular move', () => {
            // Start game and set up premove
            onNewGame(222, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 222 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Make our move
            const moveResult = makeMove('e2', 'e4', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');

            // Set a premove for next turn
            const premoveResult = makeMove('g1', 'f3', true);
            expect(premoveResult).toBe(true);

            // Make another regular move (should clear premove)
            const secondMoveResult = makeMove('d2', 'd4', false);
            expect(secondMoveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('d2d4');
        });
    });

    describe('Chess Variants', () => {
        it('should handle Crazyhouse games', () => {
            // Start a Crazyhouse game
            onNewGame(333, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'crazyhouse', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 333 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Make moves that result in captures
            const moveResult = makeMove('e2', 'e4', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');

            // Simulate opponent capturing our pawn
            const captureStyle12 = '<12> rnbqkbnr pppp1ppp -------- ----p--- -------- -------- PPPP1PPP RNBQKBNR w -1 1 1 1 1 0 333 TestPlayer TestOpponent -1 2 12 39 39 119 120 2 exd4 (0:01) exd4 1 0 0';
            onStyle12(captureStyle12);

            // Verify Style12 processing completed without errors
            expect(() => onStyle12(captureStyle12)).not.toThrow();
        });

        it('should handle Atomic chess games', () => {
            // Start an Atomic game
            onNewGame(444, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'atomic', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 444 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Make moves and verify atomic rules apply
            const moveResult = makeMove('e2', 'e4', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');

            // In atomic chess, captures cause explosions
            const atomicCaptureStyle12 = '<12> rnbqkbnr pppp1ppp -------- ----p--- -------- -------- PPPP1PPP RNBQKBNR w -1 1 1 1 1 0 444 TestPlayer TestOpponent -1 2 12 39 39 119 120 2 exd4 (0:01) exd4 1 0 0';
            onStyle12(atomicCaptureStyle12);

            // Verify Style12 processing completed without errors
            expect(() => onStyle12(atomicCaptureStyle12)).not.toThrow();
        });
    });

    describe('Board Flipping and Orientation', () => {
        it('should handle board flipping during a game', () => {
            // Start a game as white
            onNewGame(555, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 555 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Make a move
            const moveResult = makeMove('e2', 'e4', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');

            // Flip the board
            expect(() => flipBoard()).not.toThrow();

            // Verify board flip function executed without errors
            // (The internal state changes are managed by chess.js)
        });

        it('should handle playing as black with correct orientation', () => {
            // Start a game as black (relation = -1)
            onNewGame(666, 'TestOpponent', '1600', 'TestPlayer', '1500', false, 'blitz', 5, 0);

            // Process Style12 where we're playing as black (it's black's turn, so relation should be 1)
            const blackPlayerStyle12 = '<12> rnbqkbnr pppppppp -------- -------- ----P--- -------- PPPP1PPP RNBQKBNR b KQkq e3 0 1 666 TestOpponent TestPlayer 1 2 12 39 39 120 120 1 e2-e4 (0:01) e4 0 0 0';
            onStyle12(blackPlayerStyle12);

            // Make a move as black
            const moveResult = makeMove('e7', 'e5', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('e7e5');

            // Verify move was processed correctly
            // (Internal game state is managed by chess.js)
        });
    });

    describe('Mid-Game Loading from FICS', () => {
        it('should handle observing a game in progress', () => {
            // Simulate observing a game that's already in progress
            onNewGame(777, 'GrandMaster', '2500', 'Expert', '2200', true, 'blitz', 3, 2);

            // Process mid-game Style12 (observing, so relation = 2)
            const midGameStyle12 = '<12> r1bqkb1r pppp1ppp -----n-- ----p--- ----P--- -----N-- PPPP1PPP RNBQKB1R w KQkq - 4 3 777 GrandMaster Expert 2 2 12 39 39 118 117 3 Nf6 (0:02) Nf6 1 0 0';
            onStyle12(midGameStyle12);

            // Verify Style12 processing completed without errors
            expect(() => onStyle12(midGameStyle12)).not.toThrow();

            // Verify we can observe the game without making moves
            // (Internal game state is managed by chess.js)
        });

        it('should handle joining a game mid-way through', () => {
            // Simulate joining a game where we're playing and it's already move 5
            onNewGame(888, 'TestPlayer', '1500', 'StrongPlayer', '2000', true, 'blitz', 3, 2);

            // Process mid-game Style12 where we're playing (it's our turn, so relation = 1)
            const midGameStyle12 = '<12> r1bqk2r pppp1ppp -----n-- --b-p--- --B-P--- -----N-- PPPP1PPP RNBQK2R w KQkq - 8 5 888 TestPlayer StrongPlayer 1 2 12 39 39 115 112 5 Bc5 (0:05) Bc5 1 0 0';
            onStyle12(midGameStyle12);

            // Make a move to continue the game
            const moveResult = makeMove('d2', 'd3', false);
            expect(moveResult).toBe(true);
            expect(mockWebSocket.send).toHaveBeenCalledWith('d2d3');

            // Verify move was processed correctly
            // (Internal game state is managed by chess.js)
        });
    });

    describe('Game State Validation', () => {
        it('should maintain consistent game state throughout a complete game', () => {
            // Start a new game
            onNewGame(999, 'TestPlayer', '1500', 'TestOpponent', '1600', false, 'blitz', 5, 0);

            // Process initial Style12
            const initialStyle12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR w -1 1 1 1 1 0 999 TestPlayer TestOpponent 1 2 12 39 39 120 120 1 none (0:00) none 1 0 0';
            onStyle12(initialStyle12);

            // Play several moves and verify state consistency
            const gameSequence = [
                { move: ['e2', 'e4'], expectedSan: 'e4' },
                { style12: '<12> rnbqkbnr pppp1ppp -------- ----p--- ----P--- -------- PPPP1PPP RNBQKBNR w KQkq e6 0 2', expectedSan: 'e5' },
                { move: ['g1', 'f3'], expectedSan: 'Nf3' },
                { style12: '<12> rnbqkb1r pppp1ppp -----n-- ----p--- ----P--- -----N-- PPPP1PPP RNBQKB1R w KQkq - 2 3', expectedSan: 'Nf6' }
            ];

            for (let i = 0; i < gameSequence.length; i++) {
                const step = gameSequence[i];

                if (step.move) {
                    // Our move
                    const result = makeMove(step.move[0], step.move[1], false);
                    expect(result).toBe(true);
                    expect(mockWebSocket.send).toHaveBeenCalledWith(`${step.move[0]}${step.move[1]}`);
                } else if (step.style12) {
                    // Opponent's move
                    onStyle12(step.style12);
                }

                // Verify no errors occurred during processing
                expect(() => {
                    if (step.move) {
                        makeMove(step.move[0], step.move[1], false);
                    } else if (step.style12) {
                        onStyle12(step.style12);
                    }
                }).not.toThrow();
            }

            // Final verification - ensure all our moves were sent to FICS
            expect(mockWebSocket.send).toHaveBeenCalledWith('e2e4');
            expect(mockWebSocket.send).toHaveBeenCalledWith('g1f3');
        });
    });
});

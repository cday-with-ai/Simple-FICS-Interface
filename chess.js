// C:/Users/carso/IdeaProjects/Simple-FICS-Interface/chess.js

// --- Global Variables for Chess System ---
let chess = new Chess(); // The main chess game instance
let ws; // WebSocket instance, to be set by an initializer
let prefs; // Preferences object, to be set by an initializer

// Chess State
let selectedSquare = null;
let validMoves = [];
let myColor = 'white'; // 'white' or 'black', perspective of the board
let boardInitialized = false; // Tracks if the main board display structure is up
let previousPosition = null; // For animation

// Drag and Drop State
let draggedPiece = null;
let draggedPieceElement = null;
let startSquare = null;

// Game Info State (for the currently displayed game)
let whitePlayerName = '';
let blackPlayerName = '';
let whitePlayerRating = '';
let blackPlayerRating = '';
let whitePlayerClockDisplay = '00:00'; // What's shown on the clock
let blackPlayerClockDisplay = '00:00';
let currentTurn = 'w'; // 'w' or 'b'
let whiteTimeSeconds = 0; // Actual seconds remaining
let blackTimeSeconds = 0;
let clockTimer = null;
let isClockRunning = false;
let currentGameNumber = 0; // Current game number for matching with moves list
let requestedMovesForGames = new Set(); // Track games for which we've requested moves

// Audio
const moveAudio = new Audio('sounds/Move.ogg');
const captureAudio = new Audio('sounds/Capture.ogg');
const gameStartAudio = new Audio('sounds/GameStart.wav');
const gameEndAudio = new Audio('sounds/GameEnd.wav');

// GameRelation Enum
const GameRelation = {
    ISOLATED_POSITION: -3,
    OBSERVING_EXAMINED: -2,
    EXAMINING: 2,
    PLAYING_OPPONENT_MOVE: -1,
    PLAYING_MY_MOVE: 1,
    OBSERVING_PLAYED: 0,
    getDescription: function(value) {
        switch(value) {
            case this.ISOLATED_POSITION: return "Isolated position";
            case this.OBSERVING_EXAMINED: return "Observing examined game";
            case this.EXAMINING: return "Examining game";
            case this.PLAYING_OPPONENT_MOVE: return "Playing (opponent's move)";
            case this.PLAYING_MY_MOVE: return "Playing (my move)";
            case this.OBSERVING_PLAYED: return "Observing played game";
            default: return "Unknown relation (" + value + ")";
        }
    }
};

// --- Initialization ---


// --- Style12 Processing ---
export function processStyle12Message(msg) {
    if (!boardInitialized) {
        console.warn("Chess board not initialized when processing Style12. Attempting setup.");
        setupMainChessBoardDisplay();
        if (!document.getElementById('chessBoard')) {
            console.error("Failed to set up chess board for Style12 message.");
            return;
        }
    }

    const gameInfo = parseStyle12InfoInternal(msg);
    updateBoardFromFICSInternal(msg, gameInfo);
    updatePlayerInfoUIInternal(gameInfo);

    // If we're observing a played game, request the moves list
    if (gameInfo && gameInfo.relation === GameRelation.OBSERVING_PLAYED && gameInfo.gameNumber > 0) {
        // Check if we already have the moves list for this game
        const alreadyHaveMovesList = gameHeaderInfo &&
                                    gameHeaderInfo.gameNumber &&
                                    parseInt(gameHeaderInfo.gameNumber) === gameInfo.gameNumber;

        // Check if we've already requested moves for this game
        const alreadyRequestedMoves = requestedMovesForGames.has(gameInfo.gameNumber);

        // Only send the moves command if we don't already have the moves list and haven't requested it yet
        if (!alreadyHaveMovesList && !alreadyRequestedMoves && ws) {
            const movesCommand = `moves ${gameInfo.gameNumber}\n\r`;
            ws.send(movesCommand);
            console.log(`Sent ${movesCommand}`);

            // Add this game to the set of games we've requested moves for
            requestedMovesForGames.add(gameInfo.gameNumber);
        }
    }

    // Update the moves list if we have a game in progress and a last move
    if (gameInfo && gameInfo.lastMove && gameInfo.lastMovePretty) {
        if (gameHeaderInfo && gameHeaderInfo.gameNumber && gameInfo.gameNumber &&
            parseInt(gameHeaderInfo.gameNumber) === gameInfo.gameNumber) {
            // We have a moves list for this game, update it
            updateMovesListWithNewMoveInternal(gameInfo);
        } else if (movesListContainer) {
            // If we have a moves list container but no moves list for this game,
            // show an empty move list
            initializeEmptyMoveListInternal();
        }
    }
}

// --- Preference Application ---
export function applyChessRelatedPreferences() {
    if (!prefs) {
        console.warn("Preferences not set in chess.js");
        return;
    }
    if (!document.getElementById('chessBoard') && !boardInitialized) {
        console.warn("applyChessRelatedPreferences called before board DOM is ready.");
        // If the board isn't even in the DOM yet, defer or ensure setupMainChessBoardDisplay has run.
        // For now, we'll rely on updateBoardGraphics to handle missing elements gracefully if called early.
    }

    // Update square colors directly
    const lightSquares = document.querySelectorAll('.light-square');
    const darkSquares = document.querySelectorAll('.dark-square');

    lightSquares.forEach(square => {
        square.style.backgroundColor = prefs.lightSquareColor;
    });
    darkSquares.forEach(square => {
        square.style.backgroundColor = prefs.darkSquareColor;
    });

    // Update rank and file label colors
    const rankLabels = document.querySelectorAll('.rank-label');
    const fileLabels = document.querySelectorAll('.file-label');

    rankLabels.forEach(label => {
        const square = label.parentElement;
        if (square) { // Ensure parent exists
            label.style.color = square.classList.contains('light-square') ? prefs.darkSquareColor : prefs.lightSquareColor;
        }
    });
    fileLabels.forEach(label => {
        const square = label.parentElement;
        if (square) { // Ensure parent exists
            label.style.color = square.classList.contains('light-square') ? prefs.darkSquareColor : prefs.lightSquareColor;
        }
    });

    // Redraw board with current piece set if the board exists
    if (document.getElementById('chessBoard')) {
        updateBoardGraphicsInternal();
    }
}

// --- Public method to be called by createGameTab in index.js ---
export function createChessBoardSquares(boardElement) {
    createBoardSquaresInternal(boardElement);
}


// --- Internal Functions (not directly exported, but used by exported ones) ---
function createBoardSquaresInternal(boardElement) {
    if (!boardElement) {
        console.error("Board element not provided to createBoardSquaresInternal");
        return;
    }
    boardElement.innerHTML = ''; // Clear existing squares if any

    boardElement.style.display = 'grid';
    boardElement.style.gridTemplateColumns = 'repeat(8, 1fr)';
    boardElement.style.gridTemplateRows = 'repeat(8, 1fr)';
    boardElement.style.width = '100%'; // Handled by parent sizer
    boardElement.style.height = '100%'; // Handled by parent sizer
    boardElement.style.aspectRatio = '1 / 1';

    for (let rank = 8; rank >= 1; rank--) {
        for (let file = 1; file <= 8; file++) {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('chess-square');
            squareDiv.classList.add((rank + file) % 2 === 0 ? (prefs ? prefs.lightSquareColor : '#e8e0c8') : (prefs ? prefs.darkSquareColor : '#AB8B69'));
            // Apply actual color via class or direct style if prefs are available
            squareDiv.style.backgroundColor = (rank + file) % 2 === 0 ? (prefs ? prefs.lightSquareColor : '#e8e0c8') : (prefs ? prefs.darkSquareColor : '#AB8B69');
            if ((rank + file) % 2 === 0) {
                squareDiv.classList.add('light-square');
            } else {
                squareDiv.classList.add('dark-square');
            }

            squareDiv.id = `square-${file}-${rank}`; // Ensure unique IDs if multiple boards (not current case)
            squareDiv.dataset.file = file;
            squareDiv.dataset.rank = rank;
            squareDiv.dataset.algebraic = `${String.fromCharCode(96 + file)}${rank}`;

            squareDiv.addEventListener('click', () => handleSquareClickInternal(file, rank));
            squareDiv.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (validMoves.includes(squareDiv.dataset.algebraic)) {
                    squareDiv.classList.add('valid-move');
                    // Set the drop effect to indicate a valid move
                    e.dataTransfer.dropEffect = 'move';
                } else {
                    // Set the drop effect to indicate an invalid move
                    e.dataTransfer.dropEffect = 'none';
                }
            });
            squareDiv.addEventListener('dragenter', (e) => {
                e.preventDefault();
                if (validMoves.includes(squareDiv.dataset.algebraic)) {
                    squareDiv.classList.add('valid-move-hover');
                }
            });
            squareDiv.addEventListener('dragleave', (e) => {
                squareDiv.classList.remove('valid-move');
                squareDiv.classList.remove('valid-move-hover');
            });
            squareDiv.addEventListener('drop', (e) => {
                e.preventDefault();
                squareDiv.classList.remove('valid-move');
                squareDiv.classList.remove('valid-move-hover');

                // Store the current dragged piece element for reference
                const currentDraggedElement = draggedPieceElement;

                if (draggedPiece && startSquare && validMoves.includes(squareDiv.dataset.algebraic)) {
                    // Process the drop
                    handleDropInternal(squareDiv.dataset.algebraic);
                } else if (currentDraggedElement) {
                    // If the drop is invalid but we have a dragged element, make sure it's visible
                    currentDraggedElement.classList.remove('piece-hidden', 'piece-semi-transparent');
                    currentDraggedElement.classList.add('piece-visible');
                }
            });

            if (file === 8) {
                const rankLabel = document.createElement('div');
                rankLabel.classList.add('rank-label');
                rankLabel.textContent = rank;
                squareDiv.appendChild(rankLabel);
            }
            if (rank === 1) {
                const fileLabel = document.createElement('div');
                fileLabel.classList.add('file-label');
                fileLabel.textContent = String.fromCharCode(96 + file);
                squareDiv.appendChild(fileLabel);
            }

            const pieceElement = document.createElement('div');
            pieceElement.classList.add('chess-piece');
            squareDiv.appendChild(pieceElement);
            boardElement.appendChild(squareDiv);
        }
    }

    const boardResizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const boardWidth = entry.contentRect.width;
            const squareSize = boardWidth / 8;
            updatePieceSizesInternal(squareSize);

            const rankLabels = boardElement.querySelectorAll('.rank-label');
            const fileLabels = boardElement.querySelectorAll('.file-label');
            const labelFontSize = Math.max(Math.floor(squareSize * 0.15), 6) + 'px';

            rankLabels.forEach(label => {
                label.style.fontSize = labelFontSize;
                const sqElement = label.parentElement;
                label.style.display = sqElement && parseInt(sqElement.dataset.file) === 8 ? 'block' : 'none';
                label.style.right = '2px'; // Ensure right alignment
                label.style.left = 'auto';
            });
            fileLabels.forEach(label => {
                label.style.fontSize = labelFontSize;
                const sqElement = label.parentElement;
                label.style.display = sqElement && parseInt(sqElement.dataset.rank) === 1 ? 'block' : 'none';
                // Ensure bottom-left alignment for file labels
                label.style.bottom = '1px';
                label.style.left = '1px';
                label.style.right = 'auto';
                // No special handling for h1 square - all file labels should be left-aligned
            });
        }
    });
    boardResizeObserver.observe(boardElement);

    // Add resize handle to the board itself
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    boardElement.appendChild(resizeHandle);

    // Manual resize handler for the boardElement to maintain aspect ratio
    boardElement.addEventListener('mousedown', (e) => {
        // Check if the mousedown is on the resize handle area
        if (e.target === resizeHandle || (e.offsetX > boardElement.offsetWidth - 20 && e.offsetY > boardElement.offsetHeight - 20)) {
            const startX = e.clientX;
            const startWidth = boardElement.offsetWidth;

            const onMouseMove = (moveEvent) => {
                let newWidth = startWidth + (moveEvent.clientX - startX);
                newWidth = Math.max(50, Math.min(newWidth, 1500)); // Min/max board size
                boardElement.style.width = newWidth + 'px';
                boardElement.style.height = newWidth + 'px'; // Maintain square
                moveEvent.preventDefault();
            };
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });

    applyChessRelatedPreferences(); // Apply colors after squares are created
}

function updateBoardGraphicsInternal(lastMove, gameInfo = null) {
    const board = document.getElementById('chessBoard');
    if (!board || !prefs) return;

    board.querySelectorAll('.chess-piece.dragging').forEach(piece => {
        piece.classList.remove('dragging');
    });

    const squareSize = board.clientWidth / 8;
    const pieceFontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';
    const labelFontSize = Math.max(Math.floor(squareSize * 0.15), 6) + 'px';

    for (let rank = 8; rank >= 1; rank--) {
        for (let file = 1; file <= 8; file++) {
            const squareAlg = `${String.fromCharCode(96 + file)}${rank}`;
            const squareDiv = document.getElementById(`square-${file}-${rank}`);
            if (!squareDiv) continue;

            squareDiv.style.fontSize = pieceFontSize; // For text pieces if ever used

            const pieceData = chess.get(squareAlg);
            let pieceSymbol = '';
            if (pieceData) {
                const pieceColor = pieceData.color === 'w' ? 'w' : 'b';
                const pieceType = pieceData.type.toUpperCase();
                pieceSymbol = `<img src="pieces/${prefs.pieceSet}/${pieceColor}${pieceType}.svg" alt="${pieceColor}${pieceType}" />`;
            }

            let rankLabel = squareDiv.querySelector('.rank-label');
            let fileLabel = squareDiv.querySelector('.file-label');

            if (rankLabel) {
                rankLabel.style.fontSize = labelFontSize;
                rankLabel.style.display = file === 8 ? 'block' : 'none';
                rankLabel.style.color = squareDiv.classList.contains('light-square') ? prefs.darkSquareColor : prefs.lightSquareColor;
            }
            if (fileLabel) {
                fileLabel.style.fontSize = labelFontSize;
                fileLabel.style.display = rank === 1 ? 'block' : 'none';
                fileLabel.style.color = squareDiv.classList.contains('light-square') ? prefs.darkSquareColor : prefs.lightSquareColor;
            }

            let pieceElement = squareDiv.querySelector('.chess-piece');
            if (!pieceElement) { // Should not happen if createBoardSquaresInternal ran
                pieceElement = document.createElement('div');
                pieceElement.classList.add('chess-piece');
                squareDiv.appendChild(pieceElement);
            }

            // Clear old drag listeners by cloning or more selectively
            const newPieceElement = pieceElement.cloneNode(false); // Shallow clone
            if (pieceElement.parentNode) {
                pieceElement.parentNode.replaceChild(newPieceElement, pieceElement);
            }
            pieceElement = newPieceElement;


            pieceElement.innerHTML = pieceSymbol;
            pieceElement.style.fontSize = pieceFontSize; // Ensure img scales if CSS relies on font size

            if (pieceData) {
                // Determine if this piece should be draggable
                let shouldBeDraggable = false;
                const playerBoardColor = myColor === 'white' ? 'w' : 'b';

                // Allow dragging in these cases:
                // 1. When gameInfo is null (analyzing or local position)
                // 2. When not playing a game (observing or examining)
                // 3. When it's my turn in a game I'm playing
                if (gameInfo === null ||
                    (gameInfo && gameInfo.relation !== GameRelation.PLAYING_OPPONENT_MOVE &&
                     gameInfo.relation !== GameRelation.PLAYING_MY_MOVE)) {
                    // Allow any piece to be dragged when analyzing or observing
                    shouldBeDraggable = true;
                } else if (pieceData.color === playerBoardColor && chess.turn() === playerBoardColor) {
                    // Allow only my pieces to be dragged when it's my turn in a game
                    shouldBeDraggable = true;
                }

                if (shouldBeDraggable) {
                    pieceElement.setAttribute('draggable', 'true');
                    pieceElement.addEventListener('dragstart', (e) => {
                        draggedPiece = pieceData;
                        draggedPieceElement = pieceElement;
                        startSquare = squareAlg;
                        validMoves = chess.moves({ square: squareAlg, verbose: true }).map(move => move.to);
                        updateBoardHighlightsInternal();

                        // Create a custom drag image that matches the original piece size
                        const dragImage = pieceElement.cloneNode(true);
                        const squareSize = pieceElement.offsetWidth;
                        dragImage.style.width = `${squareSize}px`;
                        dragImage.style.height = `${squareSize}px`;
                        dragImage.style.fontSize = pieceElement.style.fontSize;
                        dragImage.style.display = 'flex';
                        dragImage.style.justifyContent = 'center';
                        dragImage.style.alignItems = 'center';
                        document.body.appendChild(dragImage);
                        dragImage.style.position = 'absolute';
                        dragImage.style.top = '-1000px';

                        // Set the drag image, centered on the cursor
                        const centerOffset = squareSize / 2;
                        e.dataTransfer.setDragImage(dragImage, centerOffset, centerOffset);

                        // Set the drag effect
                        e.dataTransfer.effectAllowed = 'move';

                        // Instead of hiding the original piece, we'll keep it visible but with reduced opacity
                        // This ensures it's still there if the drag operation fails
                        requestAnimationFrame(() => {
                            pieceElement.classList.add('dragging');
                            // Make the original piece semi-transparent instead of hiding it completely
                            pieceElement.classList.remove('piece-visible', 'piece-hidden');
                            pieceElement.classList.add('piece-semi-transparent');
                            // Remove the temporary drag image after a short delay
                            setTimeout(() => {
                                if (document.body.contains(dragImage)) {
                                    document.body.removeChild(dragImage);
                                }
                            }, 100);
                        });
                    });
                    pieceElement.addEventListener('dragend', () => {
                        pieceElement.classList.remove('dragging');
                        // Always restore the piece's visibility on dragend
                        pieceElement.classList.remove('piece-semi-transparent', 'piece-hidden');
                        pieceElement.classList.add('piece-visible');

                        // Use setTimeout to ensure this runs after the drop event
                        setTimeout(() => {
                            // If the piece is still being dragged (not dropped on a valid square)
                            if (draggedPiece) {
                                draggedPiece = null;
                                draggedPieceElement = null;
                                startSquare = null;
                                validMoves = [];
                                updateBoardHighlightsInternal();

                                // Make sure the piece is visible
                                if (pieceElement) {
                                    pieceElement.classList.remove('piece-semi-transparent', 'piece-hidden');
                                    pieceElement.classList.add('piece-visible');
                                }
                            }
                        }, 50); // Small delay to ensure drop event processes first
                    });
                } else {
                    pieceElement.setAttribute('draggable', 'false');
                }
            }
        }
    }
    updateBoardHighlightsInternal();

    // Ensure all pieces have proper opacity
    const allPieces = document.querySelectorAll('.chess-piece');
    allPieces.forEach(piece => {
        // Remove any opacity classes and add the visible class
        piece.classList.remove('piece-hidden', 'piece-semi-transparent');
        piece.classList.add('piece-visible');
    });

    const statusDiv = document.getElementById('gameStatus'); // Assuming gameStatus div exists
    if (statusDiv) {
        if (chess.game_over()) {
            statusDiv.innerText = 'Game Over';
            if (chess.in_checkmate()) statusDiv.innerText += ': Checkmate';
            else if (chess.in_draw()) statusDiv.innerText += ': Draw';
            stopClockInternal();
        } else {
            statusDiv.innerText = chess.turn() === 'w' ? 'White to move' : 'Black to move';
        }
    }
    currentTurn = chess.turn(); // Update internal currentTurn state
    if (gameInfo !== undefined) { // Allow null to be passed if only redrawing
        updatePlayerInfoUIInternal(gameInfo);
    }
}

function updatePlayerInfoUIInternal(gameInfo) {
    const topPlayerNameEl = document.getElementById('topPlayerName');
    const topPlayerClockEl = document.getElementById('topPlayerClock');
    const bottomPlayerNameEl = document.getElementById('bottomPlayerName');
    const bottomPlayerClockEl = document.getElementById('bottomPlayerClock');
    // Move indicators removed
    // Last move display removed

    if (!topPlayerNameEl || !topPlayerClockEl || !bottomPlayerNameEl || !bottomPlayerClockEl) {
        console.warn('Player info UI elements not all found.');
        return;
    }

    // Update global names if gameInfo provides them
    if (gameInfo && gameInfo.whiteName) whitePlayerName = gameInfo.whiteName;
    if (gameInfo && gameInfo.blackName) blackPlayerName = gameInfo.blackName;
    // Clocks are updated by the clock functions or Style12 directly to white/blackPlayerClockDisplay

    // Check if we have ratings from the moves list for the current game
    let whiteNameWithRating = whitePlayerName || 'White';
    let blackNameWithRating = blackPlayerName || 'Black';

    // If we have ratings from the moves list and the game number matches, use them
    if (gameHeaderInfo && gameHeaderInfo.gameNumber &&
        parseInt(gameHeaderInfo.gameNumber) === currentGameNumber) {
        if (gameHeaderInfo.whitePlayer && gameHeaderInfo.whitePlayer.rating &&
            gameHeaderInfo.whitePlayer.name === whitePlayerName) {
            whitePlayerRating = gameHeaderInfo.whitePlayer.rating;
            whiteNameWithRating = `${whitePlayerName} (${whitePlayerRating})`;
        }
        if (gameHeaderInfo.blackPlayer && gameHeaderInfo.blackPlayer.rating &&
            gameHeaderInfo.blackPlayer.name === blackPlayerName) {
            blackPlayerRating = gameHeaderInfo.blackPlayer.rating;
            blackNameWithRating = `${blackPlayerName} (${blackPlayerRating})`;
        }

        // Show the moves list if it exists and game numbers match
        if (movesListContainer) {
            movesListContainer.style.display = 'block';
        }
    } else {
        // If game numbers don't match, show an empty move list
        if (movesListContainer) {
            movesListContainer.style.display = 'block';
            initializeEmptyMoveListInternal();
        }
    }

    if (myColor === 'white') {
        topPlayerNameEl.innerText = blackNameWithRating;
        topPlayerClockEl.innerText = blackPlayerClockDisplay;
        bottomPlayerNameEl.innerText = whiteNameWithRating;
        bottomPlayerClockEl.innerText = whitePlayerClockDisplay;

        // Update clock styles using CSS classes
        topPlayerClockEl.classList.remove('clock-active', 'clock-inactive');
        bottomPlayerClockEl.classList.remove('clock-active', 'clock-inactive');
        topPlayerClockEl.classList.add(currentTurn === 'b' ? 'clock-active' : 'clock-inactive');
        bottomPlayerClockEl.classList.add(currentTurn === 'w' ? 'clock-active' : 'clock-inactive');
        // Move indicators removed
    } else { // myColor is 'black'
        topPlayerNameEl.innerText = whiteNameWithRating;
        topPlayerClockEl.innerText = whitePlayerClockDisplay;
        bottomPlayerNameEl.innerText = blackNameWithRating;
        bottomPlayerClockEl.innerText = blackPlayerClockDisplay;

        // Update clock styles using CSS classes
        topPlayerClockEl.classList.remove('clock-active', 'clock-inactive');
        bottomPlayerClockEl.classList.remove('clock-active', 'clock-inactive');
        topPlayerClockEl.classList.add(currentTurn === 'w' ? 'clock-active' : 'clock-inactive');
        bottomPlayerClockEl.classList.add(currentTurn === 'b' ? 'clock-active' : 'clock-inactive');
        // Move indicators removed
    }

    // Last move display removed
}

function parseStyle12InfoInternal(style12Message) {
    const lines = style12Message.split('\n');
    const boardLineIndex = lines.findIndex(line => line.trim().startsWith('<12>'));
    let gameInfo = { /* Initialize with defaults as in original */
        gameNumber: 0, initialTime: 0, increment: 0, whiteMaterial: 0, blackMaterial: 0,
        moveNumber: 0, lastMove: '', lastMoveTime: '', lastMovePretty: '',
        relation: GameRelation.OBSERVING_PLAYED, doublePawnPush: -1,
        whiteCastleShort: false, whiteCastleLong: false, blackCastleShort: false, blackCastleLong: false,
        irreversibleCount: 0, colorToMove: 'w', whiteName: '', blackName: '',
        whiteTimeSecs: 0, blackTimeSecs: 0, flipBoard: false
    };

    if (boardLineIndex !== -1) {
        const boardLine = lines[boardLineIndex].trim();
        const parts = boardLine.split(' ');
        if (prefs && prefs.showStyle12Events) console.log('Style 12 parts:', parts);

        if (parts.length >= 31) {
            try {
                gameInfo.colorToMove = parts[9] === 'W' ? 'w' : 'b';
                gameInfo.doublePawnPush = parseInt(parts[10], 10);
                gameInfo.whiteCastleShort = parseInt(parts[11], 10) === 1;
                gameInfo.whiteCastleLong = parseInt(parts[12], 10) === 1;
                gameInfo.blackCastleShort = parseInt(parts[13], 10) === 1;
                gameInfo.blackCastleLong = parseInt(parts[14], 10) === 1;
                gameInfo.irreversibleCount = parseInt(parts[15], 10);
                gameInfo.gameNumber = parseInt(parts[16], 10);
                gameInfo.whiteName = parts[17];
                gameInfo.blackName = parts[18];
                const relationValue = parseInt(parts[19], 10);
                Object.keys(GameRelation).some(key => {
                    if (GameRelation[key] === relationValue) {
                        gameInfo.relation = GameRelation[key]; return true;
                    } return false;
                });
                if (prefs && prefs.showStyle12Events) console.log('Game relation:', GameRelation.getDescription(gameInfo.relation));
                gameInfo.initialTime = parseInt(parts[20], 10);
                gameInfo.increment = parseInt(parts[21], 10);
                gameInfo.whiteMaterial = parseInt(parts[22], 10);
                gameInfo.blackMaterial = parseInt(parts[23], 10);
                gameInfo.whiteTimeSecs = parseFloat(parts[24]);
                gameInfo.blackTimeSecs = parseFloat(parts[25]);
                gameInfo.moveNumber = parseInt(parts[26], 10);
                gameInfo.lastMove = parts[27];
                // Clean up the move time by removing any parentheses
                gameInfo.lastMoveTime = parts[28] ? parts[28].replace(/[()]/g, '') : '';
                gameInfo.lastMovePretty = parts[29];
                gameInfo.flipBoard = parseInt(parts[30], 10) === 1;

                // Update global state from parsed info
                whitePlayerName = gameInfo.whiteName;
                blackPlayerName = gameInfo.blackName;
                whiteTimeSeconds = gameInfo.whiteTimeSecs;
                blackTimeSeconds = gameInfo.blackTimeSecs;
                whitePlayerClockDisplay = formatClockTimeInternal(whiteTimeSeconds);
                blackPlayerClockDisplay = formatClockTimeInternal(blackTimeSeconds);
                currentTurn = gameInfo.colorToMove; // This is critical
                currentGameNumber = gameInfo.gameNumber; // Store current game number

                // Determine myColor based on relation or flipBoard
                // This logic might need refinement based on how FICS sets relation for player
                if (gameInfo.relation === GameRelation.PLAYING_MY_MOVE || gameInfo.relation === GameRelation.PLAYING_OPPONENT_MOVE) {
                    myColor = (gameInfo.colorToMove === 'w' && gameInfo.relation === GameRelation.PLAYING_MY_MOVE) ||
                    (gameInfo.colorToMove === 'b' && gameInfo.relation === GameRelation.PLAYING_OPPONENT_MOVE)
                        ? 'white' : 'black';
                }
                if (gameInfo.flipBoard) { // FICS says black is at bottom
                    myColor = 'black';
                } else { // FICS says white is at bottom
                    myColor = 'white';
                }


                stopClockInternal(); // Stop existing timer
                startClockInternal();  // Restart with new times and turn

            } catch (e) {
                console.error('Error parsing Style 12 message parts:', e, parts);
            }
        } else {
            console.warn('Style 12 message has fewer than 31 parts:', parts.length);
        }
    }
    return gameInfo;
}

function updateBoardFromFICSInternal(style12Message, gameInfo) {
    if (chess) {
        previousPosition = chess.fen();
    }

    const lines = style12Message.split('\n');
    const boardLineIndex = lines.findIndex(line => line.trim().startsWith('<12>'));

    if (boardLineIndex !== -1) {
        const boardLine = lines[boardLineIndex].trim();
        const parts = boardLine.split(' ');

        if (parts.length >= 10) { // <12> + 8 rows + turn
            try {
                const boardRows = parts.slice(1, 9);
                let fen = '';
                for (let i = 0; i < 8; i++) {
                    let row = boardRows[i];
                    let emptyCount = 0;
                    let fenRow = '';
                    for (let j = 0; j < row.length; j++) {
                        const char = row.charAt(j);
                        if (char === '-') { emptyCount++; }
                        else {
                            if (emptyCount > 0) { fenRow += emptyCount; emptyCount = 0; }
                            fenRow += char;
                        }
                    }
                    if (emptyCount > 0) { fenRow += emptyCount; }
                    fen += fenRow + (i < 7 ? '/' : '');
                }
                fen += ' ' + (parts[9] === 'W' ? 'w' : 'b');
                // Simplified FEN tail; Style12 provides full castling/enpassant info
                let castling = "";
                if (gameInfo.whiteCastleShort) castling += "K";
                if (gameInfo.whiteCastleLong) castling += "Q";
                if (gameInfo.blackCastleShort) castling += "k";
                if (gameInfo.blackCastleLong) castling += "q";
                if (castling === "") castling = "-";

                let enPassant = "-";
                if (gameInfo.doublePawnPush !== -1) {
                    const fileChar = String.fromCharCode(97 + gameInfo.doublePawnPush);
                    const rank = parts[9] === 'W' ? '6' : '3'; // If white just moved (B to play), en passant on 6th. If black just moved (W to play), en passant on 3rd.
                    enPassant = fileChar + rank;
                }

                fen += ` ${castling} ${enPassant} ${gameInfo.irreversibleCount} ${gameInfo.moveNumber}`;
                if (prefs && prefs.showStyle12Events) console.log("Generated FEN:", fen);

                if (previousPosition && chess) {
                    chess.load(fen); // Load new position first for diff
                    detectAndAnimateMoveInternal(previousPosition, chess.fen(), gameInfo, () => {
                        if (gameInfo && gameInfo.lastMovePretty && gameInfo.lastMovePretty.includes('x')) {
                            captureAudio.play();
                        } else if (gameInfo && gameInfo.lastMovePretty) { // any move
                            moveAudio.play();
                        }
                        updateBoardGraphicsInternal(gameInfo.lastMove, gameInfo);
                    });
                } else if (chess) {
                    chess.load(fen);
                    updateBoardGraphicsInternal(gameInfo.lastMove, gameInfo);
                }
            } catch (e) {
                console.error("Failed to load FEN from Style12:", e, fen);
                if (chess) chess.reset(); // Fallback
                updateBoardGraphicsInternal(null, gameInfo);
            }
        }
    }
}

function handleSquareClickInternal(file, rank) {
    const squareAlg = `${String.fromCharCode(96 + file)}${rank}`;
    const playerBoardColor = myColor === 'white' ? 'w' : 'b';

    if (chess.turn() !== playerBoardColor) return; // Not player's turn

    if (selectedSquare === squareAlg) {
        selectedSquare = null;
        validMoves = [];
        updateBoardGraphicsInternal();
    } else if (validMoves.includes(squareAlg)) {
        const piece = chess.get(selectedSquare);
        const isPromotion = piece && piece.type === 'p' &&
            ((piece.color === 'w' && rank === 8) || (piece.color === 'b' && rank === 1));
        let moveObject;
        let moveStringPart = `${selectedSquare}${squareAlg}`;

        if (isPromotion) {
            const promotionPiece = prompt('Promote pawn to: (q)ueen, (r)ook, (b)ishop, (n)knight', 'q');
            const promotion = ['q', 'r', 'b', 'n'].includes(promotionPiece) ? promotionPiece : 'q';
            moveObject = { from: selectedSquare, to: squareAlg, promotion: promotion };
            moveStringPart += `=${promotion}`;
        } else {
            moveObject = { from: selectedSquare, to: squareAlg };
        }

        const moveResult = chess.move(moveObject);
        if (moveResult && ws) {
            ws.send(`move ${moveStringPart}\n\r`);
            // Animation is complex here because chess.js state is already updated.
            // We'd ideally animate then update, or use the FICS echo.
            // For now, direct update after sending.
            if (moveResult.captured) captureAudio.play(); else moveAudio.play();

            // Hide the piece at the original square
            const fromSquareDiv = document.getElementById(`square-${selectedSquare.charCodeAt(0) - 96}-${selectedSquare.charAt(1)}`);
            if (fromSquareDiv) {
                const pieceElement = fromSquareDiv.querySelector('.chess-piece');
                if (pieceElement) {
                    pieceElement.style.opacity = '0';
                }
            }

            updateBoardGraphicsInternal(moveStringPart, null); // Update with local move
            restartClockInternal(null); // Restart clock for opponent
        } else if (!moveResult) {
            console.error("Invalid move by click:", moveObject);
            chess.undo(); // Revert if local move failed but somehow passed checks
        }
        selectedSquare = null;
        validMoves = [];
    } else {
        const piece = chess.get(squareAlg);
        if (piece && piece.color === playerBoardColor) {
            selectedSquare = squareAlg;
            validMoves = chess.moves({ square: squareAlg, verbose: true }).map(m => m.to);
            updateBoardGraphicsInternal();
        } else {
            selectedSquare = null;
            validMoves = [];
            updateBoardGraphicsInternal();
        }
    }
}

function handleDropInternal(targetSquareAlg) {
    if (!validMoves.includes(targetSquareAlg) || !draggedPiece || !startSquare) return;

    const playerBoardColor = myColor === 'white' ? 'w' : 'b';
    if (chess.turn() !== playerBoardColor) return; // Should be caught by draggable property but double check

    const piece = chess.get(startSquare); // Get piece from current board state at startSquare
    const targetRank = parseInt(targetSquareAlg.charAt(1));
    const isPromotion = piece && piece.type === 'p' &&
        ((piece.color === 'w' && targetRank === 8) || (piece.color === 'b' && targetRank === 1));
    let moveObject;
    let moveStringPart = `${startSquare}-${targetSquareAlg}`;

    if (isPromotion) {
        const promotionPiece = prompt('Promote pawn to: (q)ueen, (r)ook, (b)ishop, (n)knight', 'q');
        const promotion = ['q', 'r', 'b', 'n'].includes(promotionPiece) ? promotionPiece : 'q';
        moveObject = { from: startSquare, to: targetSquareAlg, promotion: promotion };
        moveStringPart += `=${promotion}`;
    } else {
        moveObject = { from: startSquare, to: targetSquareAlg };
    }

    const moveResult = chess.move(moveObject);
    var moveToMake = null;
    if (moveResult && ws) {
        ws.send(`${moveStringPart}\n\r`);

        if (moveResult.captured) captureAudio.play(); else moveAudio.play();

        // We'll make the original piece fully transparent but not rely solely on this
        if (draggedPieceElement) {
            draggedPieceElement.classList.remove('piece-visible', 'piece-semi-transparent');
            draggedPieceElement.classList.add('piece-hidden');
        }

        // Update the board graphics which will create the piece at the new location
        updateBoardGraphicsInternal(moveStringPart, null);
        restartClockInternal(null);
    } else if (!moveResult) {
        console.error("Invalid move by drop:", moveObject);
        chess.undo();

        // Restore the original piece visibility if the move failed
        if (draggedPieceElement) {
            draggedPieceElement.classList.remove('piece-hidden', 'piece-semi-transparent');
            draggedPieceElement.classList.add('piece-visible');
        }
    }

    // Clear drag state variables
    draggedPiece = null;
    draggedPieceElement = null;
    startSquare = null;
    selectedSquare = null;
    validMoves = [];
    updateBoardHighlightsInternal(); // Clear highlights
}

function detectAndAnimateMoveInternal(oldFen, newFen, gameInfo, callback) {
    const oldChess = new Chess(oldFen);
    const newChess = new Chess(newFen);
    let fromSq = null, toSq = null;

    // Simple diff: find changed squares
    // This is a basic way; a more robust way involves checking move legality from old pos to new.
    let movedPiece = null;
    for (const s of chess.SQUARES) {
        const pOld = oldChess.get(s);
        const pNew = newChess.get(s);
        if (pOld && !pNew) { // Piece was here, now empty
            fromSq = s;
            movedPiece = pOld;
        } else if (!pOld && pNew) { // Piece not here, now is
            toSq = s;
        } else if (pOld && pNew && (pOld.type !== pNew.type || pOld.color !== pNew.color)) { // Piece changed
            // This could be a promotion or complex capture. For simple animation, treat as move.
            fromSq = s; // Assume it moved from here
            toSq = s;   // And to here (will look like it just changed)
            movedPiece = pOld;
        }
    }
    // If a piece moved from fromSq to toSq
    if (fromSq && toSq && movedPiece && newChess.get(toSq) &&
        newChess.get(toSq).type === movedPiece.type &&
        newChess.get(toSq).color === movedPiece.color) {
        // Convert algebraic to file/rank for animation function
        const fromFile = fromSq.charCodeAt(0) - 96;
        const fromRank = parseInt(fromSq.charAt(1));
        const toFile = toSq.charCodeAt(0) - 96;
        const toRank = parseInt(toSq.charAt(1));
        animatePieceMoveInternal({ file: fromFile, rank: fromRank }, { file: toFile, rank: toRank }, callback);
    } else {
        if (callback) callback(); // No clear move to animate or complex situation
    }
}

function animatePieceMoveInternal(fromSquare, toSquare, callback) {
    const board = document.getElementById('chessBoard');
    if (!board) { if (callback) callback(); return; }

    const fromElement = document.getElementById(`square-${fromSquare.file}-${fromSquare.rank}`);
    const toElement = document.getElementById(`square-${toSquare.file}-${toSquare.rank}`);
    if (!fromElement || !toElement) { if (callback) callback(); return; }

    const pieceElementToAnimate = fromElement.querySelector('.chess-piece');
    if (!pieceElementToAnimate || !pieceElementToAnimate.innerHTML.trim()) {
        if (callback) callback(); return;
    }

    const pieceContent = pieceElementToAnimate.innerHTML;
    pieceElementToAnimate.innerHTML = ''; // Hide original temporarily

    const animatedPiece = document.createElement('div');
    animatedPiece.classList.add('chess-piece', 'animated-piece'); // Ensure .animated-piece is styled for fixed pos
    animatedPiece.innerHTML = pieceContent;
    animatedPiece.style.zIndex = '1000';
    animatedPiece.style.pointerEvents = 'none';

    const squareSize = board.clientWidth / 8;
    animatedPiece.style.width = squareSize + 'px';
    animatedPiece.style.height = squareSize + 'px';
    animatedPiece.style.fontSize = pieceElementToAnimate.style.fontSize; // Copy font size
    // Ensure display flex for centering if img is inside
    animatedPiece.style.display = 'flex';
    animatedPiece.style.justifyContent = 'center';
    animatedPiece.style.alignItems = 'center';


    board.appendChild(animatedPiece); // Append to board for correct relative positioning
    animatedPiece.style.position = 'absolute'; // Crucial for animation

    const startX = (fromSquare.file - 1) * squareSize;
    const startY = (8 - fromSquare.rank) * squareSize;
    const endX = (toSquare.file - 1) * squareSize;
    const endY = (8 - toSquare.rank) * squareSize;

    animatedPiece.style.left = startX + 'px';
    animatedPiece.style.top = startY + 'px';

    requestAnimationFrame(() => {
        animatedPiece.getBoundingClientRect(); // Force reflow
        animatedPiece.style.transition = 'left 0.225s ease-out, top 0.225s ease-out';
        animatedPiece.style.left = endX + 'px';
        animatedPiece.style.top = endY + 'px';

        animatedPiece.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName === 'left' || e.propertyName === 'top') { // Wait for one of them
                animatedPiece.removeEventListener('transitionend', onEnd);
                animatedPiece.remove();
                if (callback) callback();
            }
        }, { once: true }); // Ensure it only fires once per animation start
    });
}

function updateBoardHighlightsInternal() {
    const board = document.getElementById('chessBoard');
    if (!board) return;

    for (let rank = 8; rank >= 1; rank--) {
        for (let file = 1; file <= 8; file++) {
            const squareAlg = `${String.fromCharCode(96 + file)}${rank}`;
            const squareDiv = document.getElementById(`square-${file}-${rank}`);
            if (!squareDiv) continue;

            squareDiv.classList.remove('selected', 'valid-move', 'valid-move-hover');
            if (squareAlg === selectedSquare || squareAlg === startSquare) {
                squareDiv.classList.add('selected');
            } else if (validMoves.includes(squareAlg)) {
                squareDiv.classList.add('valid-move');
            }
        }
    }
}

function updatePieceSizesInternal(squareSize) {
    const board = document.getElementById('chessBoard');
    if (!board) return;
    const pieceElements = board.querySelectorAll('.chess-piece');
    const fontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';
    pieceElements.forEach(piece => {
        piece.style.fontSize = fontSize;
    });
}

function startClockInternal() {
    if (isClockRunning) return;
    isClockRunning = true;
    let lastUpdateTime = Date.now();

    const updateClock = () => {
        if (!isClockRunning) return;
        const now = Date.now();
        const deltaTime = now - lastUpdateTime;

        if (deltaTime >= 1000) {
            if (currentTurn === 'w') {
                whiteTimeSeconds = Math.max(0, whiteTimeSeconds - 1);
                whitePlayerClockDisplay = formatClockTimeInternal(whiteTimeSeconds);
            } else {
                blackTimeSeconds = Math.max(0, blackTimeSeconds - 1);
                blackPlayerClockDisplay = formatClockTimeInternal(blackTimeSeconds);
            }
            updatePlayerInfoUIInternal(null); // Update display without full gameInfo
            if ((currentTurn === 'w' && whiteTimeSeconds <= 0) || (currentTurn === 'b' && blackTimeSeconds <= 0)) {
                stopClockInternal();
                // Potentially emit a game over event or handle flag fall
                return;
            }
            lastUpdateTime = now - (deltaTime % 1000);
        }
        clockTimer = requestAnimationFrame(updateClock);
    };
    clockTimer = requestAnimationFrame(updateClock);
}

function stopClockInternal() {
    if (!isClockRunning) return;
    isClockRunning = false;
    if (clockTimer) {
        cancelAnimationFrame(clockTimer);
        clockTimer = null;
    }
}

function restartClockInternal(gameInfo) {
    stopClockInternal();
    // If gameInfo is provided, it might reset times (handled by parseStyle12 or similar)
    // Otherwise, just ensure current turn's clock starts.
    if (gameInfo) {
        // Times and turn should have been updated by parseStyle12Info
    }
    updatePlayerInfoUIInternal(gameInfo); // Update display
    startClockInternal(); // Start with current state
}

function formatClockTimeInternal(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return '00:00';
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function testClockParsingInternal() {
    const testStyle12 = "<12> ------k- -p--r-pp p-p----- -------n ----B--- ------P- PPPq---P -K--R--- W -1 0 0 0 0 1 10 venugopal kunde 0 15 0 13 22 624 769 27 Q/g5-d2 (0:04) Qd2 0 1 112";
    const gameInfo = parseStyle12InfoInternal(testStyle12); // Use internal to avoid export issues during testing
    console.log('Test Style12 parsing (internal):');
    console.log('Raw time values - White:', gameInfo.whiteTimeSecs, 'seconds, Black:', gameInfo.blackTimeSecs, 'seconds');
    console.log('Formatted times - White:', formatClockTimeInternal(gameInfo.whiteTimeSecs), 'Black:', formatClockTimeInternal(gameInfo.blackTimeSecs));
    console.log('Expected times - White: 10:24, Black: 12:49');
}

// C:/Users/carso/IdeaProjects/Simple-FICS-Interface/chess.js

// --- Global Variables for Chess System ---
// ... (existing variables)
let gameMoves = []; // To store parsed moves of a game
let gameHeaderInfo = {}; // To store parsed header info for the moves list
let movesListDisplayElement; // DOM element for displaying the moves list
let movesListContainer; // Container for the moves list

// ... (rest of your existing enums, audio, etc.)

// --- Initialization ---
export function initChessSystem(websocket, preferencesObject) {
    ws = websocket;
    prefs = preferencesObject;

    setupMainChessBoardDisplay(); // Sets up the DOM for the main board
    boardInitialized = true;

    applyChessRelatedPreferences(); // Apply initial preferences
    // testClockParsingInternal(); // You might want to keep or remove this

    // Add a global mouseup event listener to ensure pieces are visible
    // This helps catch cases where the dragend event might not fire properly
    document.addEventListener('mouseup', () => {
        // After a short delay, ensure all pieces are visible
        setTimeout(() => {
            const allPieces = document.querySelectorAll('.chess-piece');
            allPieces.forEach(piece => {
                piece.classList.remove('piece-hidden', 'piece-semi-transparent');
                piece.classList.add('piece-visible');
            });

            // Also reset drag state if needed
            if (draggedPiece) {
                draggedPiece = null;
                draggedPieceElement = null;
                startSquare = null;
                validMoves = [];
                updateBoardHighlightsInternal();
            }
        }, 100);
    });
}

// --- Moves List Processing ---
export function processMovesList(rawMovesText) {
    if (!boardInitialized && !document.getElementById('chessBoard')) {
        console.warn("Chess board/UI not initialized when processing moves list. Attempting setup.");
        setupMainChessBoardDisplay(); // Ensure UI is ready
    }
    parseAndStoreMovesInternal(rawMovesText);
    updateMovesListDisplayInternal();
    highlightLastMoveInMovelist();

    // Update player info UI to show ratings if the game number matches
    updatePlayerInfoUIInternal(null);
}

// Process game end messages like "{Game 12 (genieman vs. Pawnlightly) genieman resigns} 0-1"
export function processGameEndMessage(message) {
    if (!message || !message.trim()) return false;

    // Regular expression to match game end messages
    // This regex is very flexible to handle all types of player names and game end reasons
    const gameEndRegex = /^\{Game (\d+) \(([^)]+) vs\. ([^)]+)\) (.*)\}\s*([0-1\/2-]+)$/;
    const match = message.match(gameEndRegex);

    if (!match) {
        if (prefs && prefs.showStyle12Events) { // Use the debug preference for logging
            console.log("Game end message did not match regex pattern:", message);
        }
        return false;
    }

    const gameNumber = match[1];
    const whitePlayer = match[2];
    const blackPlayer = match[3];
    const reason = match[4];
    const result = match[5];

    if (prefs && prefs.showStyle12Events) { // Use the debug preference for logging
        console.log("Parsed game end message:", {
            gameNumber,
            whitePlayer,
            blackPlayer,
            reason,
            result
        });
    }

    // Check if this game end message is for the current game
    if (gameHeaderInfo && gameHeaderInfo.gameNumber && parseInt(gameHeaderInfo.gameNumber) === parseInt(gameNumber)) {
        // Update the game header info with the status and result
        gameHeaderInfo.status = reason;
        gameHeaderInfo.result = result;

        // Update the moves list display to show the game result
        updateMovesListDisplayInternal();

        // Stop the clock if it's running
        stopClockInternal();

        return true;
    }

    return false;
}

function parseAndStoreMovesInternal(rawMovesText) {
    gameMoves = []; // Clear previous moves
    gameHeaderInfo = { // Reset header
        gameNumber: null,
        whitePlayer: { name: '', rating: '' },
        blackPlayer: { name: '', rating: '' },
        dateTime: '',
        gameType: '',
        initialTime: '',
        increment: '',
        rawHeaderTextLines: [], // Store raw header lines for potential direct display
        status: '',
        result: ''
    };

    // Check if we should update the current game's player ratings
    let shouldUpdatePlayerInfo = false;

    const lines = rawMovesText.split('\n');
    let parsingHeader = true;
    let moveDataStarted = false; // To identify when actual move lines begin

    // Regex patterns for parsing
    const playerRegex = /^([\w.-]+)\s\((\d+)\)\s+vs\.\s+([\w.-]+)\s\((\d+)\)\s+---\s+(.*)$/;
    const gameTypeRegex = /^(.*),\s+initial time:\s+(.*),\s+increment:\s+(.*)\.$/;
    const moveLineRegex = /^\s*(\d+)\.\s+([a-zA-Z0-9+#=O-]+)\s+\(([^)]+)\)(?:\s+([a-zA-Z0-9+#=O-]+)\s+\(([^)]+)\))?/;
    const statusRegex = /^{\s*(.*?)\s*}(?:\s*([0-1/2*-]+))?$/;

    for (const line of lines) {
        if (line.trim() === "") continue;

        if (parsingHeader) {
            gameHeaderInfo.rawHeaderTextLines.push(line); // Store all header lines initially

            if (line.startsWith("Movelist for game")) {
                const match = line.match(/Movelist for game (\d+):/);
                if (match) {
                    gameHeaderInfo.gameNumber = match[1];
                    // Check if this moves list is for the current game
                    if (parseInt(gameHeaderInfo.gameNumber) === currentGameNumber) {
                        shouldUpdatePlayerInfo = true;
                    }
                }
                continue;
            }

            const playerMatch = line.match(playerRegex);
            if (playerMatch) {
                gameHeaderInfo.whitePlayer.name = playerMatch[1];
                gameHeaderInfo.whitePlayer.rating = playerMatch[2];
                gameHeaderInfo.blackPlayer.name = playerMatch[3];
                gameHeaderInfo.blackPlayer.rating = playerMatch[4];
                gameHeaderInfo.dateTime = playerMatch[5];
                continue;
            }

            const gameTypeMatch = line.match(gameTypeRegex);
            if (gameTypeMatch) {
                gameHeaderInfo.gameType = gameTypeMatch[1].trim();
                gameHeaderInfo.initialTime = gameTypeMatch[2].trim();
                gameHeaderInfo.increment = gameTypeMatch[3].trim();
                continue;
            }

            // Transition from header to move list data
            if (line.startsWith("----  ----------------")) {
                parsingHeader = false;
                moveDataStarted = true;
                continue;
            }
        } else if (moveDataStarted) {
            const moveMatch = line.match(moveLineRegex);
            if (moveMatch) {
                const moveEntry = {
                    number: parseInt(moveMatch[1], 10),
                    white: { san: moveMatch[2], time: moveMatch[3] },
                    black: moveMatch[4] ? { san: moveMatch[4], time: moveMatch[5] } : null
                };
                gameMoves.push(moveEntry);
                continue;
            }

            const statusMatch = line.match(statusRegex);
            if (statusMatch) {
                gameHeaderInfo.status = statusMatch[1];
                if (statusMatch[2]) gameHeaderInfo.result = statusMatch[2];
                // This is usually the last meaningful line of the moves list output
                // moveDataStarted = false; // Stop looking for moves
                continue;
            }
            // Lines after status (like fics% prompt) will be ignored by these specific parsers
        }
    }

    if (prefs && prefs.showStyle12Events) { // Re-use this pref for general debug logging
        console.log("Parsed Game Header (Moves List):", gameHeaderInfo);
        console.log("Parsed Moves (Moves List):", gameMoves);
    }

    // If this moves list is for the current game, update player ratings
    if (shouldUpdatePlayerInfo) {
        if (gameHeaderInfo.whitePlayer.name === whitePlayerName) {
            whitePlayerRating = gameHeaderInfo.whitePlayer.rating;
        }
        if (gameHeaderInfo.blackPlayer.name === blackPlayerName) {
            blackPlayerRating = gameHeaderInfo.blackPlayer.rating;
        }

        // Board header removed
    }
}

function updateMovesListDisplayInternal() {
    if (!movesListContainer) {
        console.warn("Moves list container not found. It might not have been created yet.");
        return;
    }

    // Initialize the empty move list structure first
    initializeEmptyMoveListInternal();

    // Make sure movesListDisplayElement is defined after initialization
    if (!movesListDisplayElement) {
        console.warn("Moves list display element not found after initialization.");
        return;
    }

    // Clear any existing content in the moves display area
    movesListDisplayElement.innerHTML = '';

    // Now update the moves display with actual moves
    if (gameMoves.length > 0) {
        const table = document.createElement('table');
        table.classList.add('moves-table');
        const tbody = document.createElement('tbody');

        gameMoves.forEach(move => {
            const row = tbody.insertRow();

            const numCell = row.insertCell();
            numCell.classList.add('move-number');
            numCell.textContent = `${move.number}.`;

            const whiteCell = row.insertCell();
            if (move.white && move.white.san) {
                const whiteSanSpan = document.createElement('span');
                whiteSanSpan.classList.add('move-san');
                whiteSanSpan.textContent = convertToUnicodeChessPieces(move.white.san);
                whiteSanSpan.onclick = () => handleMoveNavigationClickInternal(move.number, 'w');
                whiteSanSpan.style.cursor = 'pointer';
                whiteCell.appendChild(whiteSanSpan);
            } else {
                whiteCell.innerHTML = '&nbsp;'; // Empty cell if no white move
            }

            const blackCell = row.insertCell();
            if (move.black && move.black.san) {
                const blackSanSpan = document.createElement('span');
                blackSanSpan.classList.add('move-san');
                blackSanSpan.textContent = convertToUnicodeChessPieces(move.black.san);
                blackSanSpan.onclick = () => handleMoveNavigationClickInternal(move.number, 'b');
                blackSanSpan.style.cursor = 'pointer';
                blackCell.appendChild(blackSanSpan);
            } else {
                blackCell.innerHTML = '&nbsp;'; // Keep cell structure
            }
        });
        table.appendChild(tbody);
        movesListDisplayElement.appendChild(table);
    }

    // Display Footer Info (Status/Result)
    if (gameHeaderInfo.status) {
        const footerDiv = document.createElement('div');
        footerDiv.classList.add('moves-list-footer-info');
        let statusText = gameHeaderInfo.status;
        if (gameHeaderInfo.result) {
            statusText += ` (${gameHeaderInfo.result})`;
        }
        footerDiv.textContent = statusText;
        movesListDisplayElement.appendChild(footerDiv);
    }

    // Auto-scroll to the bottom of the moves list
    if (movesListDisplayElement.parentElement) { // Ensure parent exists for scrollHeight
        movesListDisplayElement.parentElement.scrollTop = movesListDisplayElement.parentElement.scrollHeight;
    }
}

// Function to handle clicking on a move in the moves list
function handleMoveNavigationClickInternal(moveNumber, color) {
    console.log(`Navigate to move: ${moveNumber}${color === 'w' ? '.' : '...'}`);

    // Create a new chess instance to replay the game
    const tempChess = new Chess();

    // Replay all moves up to the selected move
    let reachedTargetMove = false;

    for (let i = 0; i < gameMoves.length; i++) {
        const move = gameMoves[i];

        // Play white's move if it exists
        if (move.white && move.white.san) {
            try {
                tempChess.move(move.white.san);
            } catch (e) {
                console.error(`Error playing white move ${move.white.san}:`, e);
                break;
            }
        }

        // Check if we've reached the target move
        if (move.number === moveNumber && color === 'w') {
            reachedTargetMove = true;
            break;
        }

        // Play black's move if it exists
        if (move.black && move.black.san) {
            try {
                tempChess.move(move.black.san);
            } catch (e) {
                console.error(`Error playing black move ${move.black.san}:`, e);
                break;
            }
        }

        // Check if we've reached the target move
        if (move.number === moveNumber && color === 'b') {
            reachedTargetMove = true;
            break;
        }
    }

    if (reachedTargetMove) {
        // Update the board with the position at the selected move
        chess.load(tempChess.fen());
        updateBoardGraphicsInternal(null, null);

        // Highlight the selected move in the moves list
        highlightSelectedMoveInternal(moveNumber, color);
    } else {
        console.warn(`Could not navigate to move ${moveNumber}${color === 'w' ? '' : '...'}`);
    }
}

// Function to update the moves list with a new move from Style12
function updateMovesListWithNewMoveInternal(gameInfo) {
    if (!movesListDisplayElement || !gameInfo || !gameInfo.lastMovePretty) return;

    // Make sure the moves list container is visible
    if (movesListContainer) {
        movesListContainer.style.display = 'block';
    }

    // Get the current move number and color
    const moveNumber = gameInfo.moveNumber;
    const color = gameInfo.colorToMove === 'w' ? 'b' : 'w'; // The move that was just made

    // Check if we already have this move in our list
    let moveExists = false;
    let lastMoveInList = null;

    if (gameMoves.length > 0) {
        const lastMove = gameMoves[gameMoves.length - 1];
        if (lastMove.black == null && color === 'b') {
            lastMove.black = {
                san: gameInfo.lastMovePretty,
                time: gameInfo.lastMoveTime ? gameInfo.lastMoveTime.replace(/[()]/g, '') : ''
            };
            updateMovesListDisplayInternal();
            highlightLastMoveInMovelist();
        } else if (color === 'w') {
            const newMove = {
                number: moveNumber,
                white: {
                    san: gameInfo.lastMovePretty,
                    time: gameInfo.lastMoveTime ? gameInfo.lastMoveTime.replace(/[()]/g, '') : ''
                },
                black: null
            };
            gameMoves.push(newMove);
            updateMovesListDisplayInternal();
            highlightLastMoveInMovelist();
        }
    }
}

// Board header function removed

// Function to convert standard algebraic notation to Unicode chess symbols
function convertToUnicodeChessPieces(moveText) {
    if (!moveText) return moveText;

    // Define the mapping from algebraic notation to Unicode symbols
    const pieceMap = {
        'K': '♔', // White King
        'Q': '♕', // White Queen
        'R': '♖', // White Rook
        'B': '♗', // White Bishop
        'N': '♘', // White Knight
        'P': '♙', // White Pawn (rarely used in notation but included for completeness)
        'k': '♚', // Black King
        'q': '♛', // Black Queen
        'r': '♜', // Black Rook
        'b': '♝', // Black Bishop
        'n': '♞', // Black Knight
        'p': '♟'  // Black Pawn (rarely used in notation but included for completeness)
    };

    // Replace piece letters with Unicode symbols
    // We need to be careful to only replace standalone piece letters, not parts of other notation
    // For example, 'Nf3' should become '♘f3', but 'O-O-O' should remain unchanged

    // Handle special case for castling notation
    if (moveText === 'O-O') return 'O-O'; // Kingside castling
    if (moveText === 'O-O-O') return 'O-O-O'; // Queenside castling

    return moveText.replace(/([KQRBN])([a-h1-8x+#=]|$)/g, (match, piece, rest) => {
        return pieceMap[piece] + rest;
    });
}

function unselectMovesInMovelist() {
    // Remove highlight from all moves
    const allMoves = movesListDisplayElement.querySelectorAll('.move-san');
    allMoves.forEach(move => {
        move.classList.remove('selected-move');
    });
}

function highlightLastMoveInMovelist() {
    unselectMovesInMovelist();
    // Highlight the last move
    const moves = movesListDisplayElement.querySelectorAll('.move-san');
    if (moves && moves.length > 0) {
        const lastMove = moves[moves.length - 1];
        lastMove.classList.add('selected-move');
        lastMove.scrollIntoView({ behavior: 'instant', block: 'nearest' });
    }
}

// Navigation functions for the moves list
function goToFirstMoveInternal() {
    if (gameMoves.length === 0) return;

    // Reset the chess board to the starting position
    chess.reset();
    updateBoardGraphicsInternal(null, null);

    // Highlight the first move (if any)
    if (gameMoves[0] && gameMoves[0].white) {
        highlightSelectedMoveInternal(gameMoves[0].number, 'w');
    }
}

function goToLastMoveInternal() {
    if (gameMoves.length === 0) return;

    // Find the last move
    const lastMove = gameMoves[gameMoves.length - 1];
    const color = lastMove.black ? 'b' : 'w';

    // Create a new chess instance and replay all moves
    const tempChess = new Chess();

    // Replay all moves
    for (const move of gameMoves) {
        if (move.white && move.white.san) {
            try {
                tempChess.move(move.white.san);
            } catch (e) {
                console.error(`Error playing white move ${move.white.san}:`, e);
            }
        }
        if (move.black && move.black.san) {
            try {
                tempChess.move(move.black.san);
            } catch (e) {
                console.error(`Error playing black move ${move.black.san}:`, e);
            }
        }
    }

    // Update the board with the final position
    chess.load(tempChess.fen());
    updateBoardGraphicsInternal(null, null);

    // Highlight the last move
    highlightSelectedMoveInternal(lastMove.number, color);
}

function goToPreviousMoveInternal() {
    if (gameMoves.length === 0) return;

    // Find the currently selected move
    const selectedMove = movesListDisplayElement.querySelector('.selected-move');
    if (!selectedMove) {
        // If no move is selected, go to the last move
        goToLastMoveInternal();
        return;
    }

    // Find the move number and color of the selected move
    const moveRow = selectedMove.closest('tr');
    if (!moveRow) return;

    const moveNumCell = moveRow.querySelector('.move-number');
    if (!moveNumCell) return;

    const moveNumber = parseInt(moveNumCell.textContent);
    const isWhiteMove = selectedMove.closest('td') === moveRow.cells[1];

    // Determine the previous move
    let prevMoveNumber = moveNumber;
    let prevMoveColor = 'w';

    if (isWhiteMove) {
        // If white move is selected, go to black move of previous number
        prevMoveNumber = moveNumber - 1;
        prevMoveColor = 'b';
    } else {
        // If black move is selected, go to white move of same number
        prevMoveColor = 'w';
    }

    // Check if previous move exists
    const prevMoveIndex = gameMoves.findIndex(m => m.number === prevMoveNumber);
    if (prevMoveIndex < 0) return; // No previous move

    const prevMove = gameMoves[prevMoveIndex];
    if (prevMoveColor === 'b' && !prevMove.black) return; // No black move for this number

    // Create a new chess instance and replay moves up to the previous move
    const tempChess = new Chess();

    // Replay moves up to the previous move
    for (let i = 0; i <= prevMoveIndex; i++) {
        const move = gameMoves[i];
        if (move.white && move.white.san) {
            try {
                tempChess.move(move.white.san);
            } catch (e) {
                console.error(`Error playing white move ${move.white.san}:`, e);
            }
        }
        if (move.black && move.black.san && (i < prevMoveIndex || prevMoveColor === 'b')) {
            try {
                tempChess.move(move.black.san);
            } catch (e) {
                console.error(`Error playing black move ${move.black.san}:`, e);
            }
        }
    }

    // Update the board with the position after the previous move
    chess.load(tempChess.fen());
    updateBoardGraphicsInternal(null, null);

    // Highlight the previous move
    highlightSelectedMoveInternal(prevMoveNumber, prevMoveColor);
}

function goToNextMoveInternal() {
    if (gameMoves.length === 0) return;

    // Find the currently selected move
    const selectedMove = movesListDisplayElement.querySelector('.selected-move');
    if (!selectedMove) {
        // If no move is selected, go to the first move
        goToFirstMoveInternal();
        return;
    }

    // Find the move number and color of the selected move
    const moveRow = selectedMove.closest('tr');
    if (!moveRow) return;

    const moveNumCell = moveRow.querySelector('.move-number');
    if (!moveNumCell) return;

    const moveNumber = parseInt(moveNumCell.textContent);
    const isWhiteMove = selectedMove.closest('td') === moveRow.cells[1];

    // Determine the next move
    let nextMoveNumber = moveNumber;
    let nextMoveColor = 'b';

    if (isWhiteMove) {
        // If white move is selected, go to black move of same number
        nextMoveColor = 'b';
    } else {
        // If black move is selected, go to white move of next number
        nextMoveNumber = moveNumber + 1;
        nextMoveColor = 'w';
    }

    // Check if next move exists
    const nextMoveIndex = gameMoves.findIndex(m => m.number === nextMoveNumber);
    if (nextMoveIndex < 0) return; // No next move

    const nextMove = gameMoves[nextMoveIndex];
    if (nextMoveColor === 'b' && !nextMove.black) return; // No black move for this number
    if (nextMoveColor === 'w' && !nextMove.white) return; // No white move for this number

    // Create a new chess instance and replay moves up to the next move
    const tempChess = new Chess();

    // Replay moves up to the next move
    for (let i = 0; i <= nextMoveIndex; i++) {
        const move = gameMoves[i];
        if (move.white && move.white.san) {
            try {
                tempChess.move(move.white.san);
            } catch (e) {
                console.error(`Error playing white move ${move.white.san}:`, e);
            }
        }
        if (move.black && move.black.san && (i < nextMoveIndex || (i === nextMoveIndex && nextMoveColor === 'b'))) {
            try {
                tempChess.move(move.black.san);
            } catch (e) {
                console.error(`Error playing black move ${move.black.san}:`, e);
            }
        }
    }

    // Update the board with the position after the next move
    chess.load(tempChess.fen());
    updateBoardGraphicsInternal(null, null);

    // Highlight the next move
    highlightSelectedMoveInternal(nextMoveNumber, nextMoveColor);
}

// Function to initialize an empty move list with navigation buttons
function initializeEmptyMoveListInternal() {
    if (!movesListContainer) return;

    // Clear any existing content
    movesListContainer.innerHTML = '';

    // Create navigation buttons container (outside the scrollable area)
    const navContainer = document.createElement('div');
    navContainer.classList.add('moves-nav-container');

    // First move button
    const firstMoveBtn = document.createElement('button');
    firstMoveBtn.classList.add('moves-nav-btn');
    firstMoveBtn.innerHTML = '⏮'; // Unicode double left arrow
    firstMoveBtn.title = 'Go to first move';
    firstMoveBtn.onclick = goToFirstMoveInternal;
    navContainer.appendChild(firstMoveBtn);

    // Previous move button
    const prevMoveBtn = document.createElement('button');
    prevMoveBtn.classList.add('moves-nav-btn');
    prevMoveBtn.innerHTML = '◀'; // Unicode left arrow
    prevMoveBtn.title = 'Go to previous move';
    prevMoveBtn.onclick = goToPreviousMoveInternal;
    navContainer.appendChild(prevMoveBtn);

    // Next move button
    const nextMoveBtn = document.createElement('button');
    nextMoveBtn.classList.add('moves-nav-btn');
    nextMoveBtn.innerHTML = '▶'; // Unicode right arrow
    nextMoveBtn.title = 'Go to next move';
    nextMoveBtn.onclick = goToNextMoveInternal;
    navContainer.appendChild(nextMoveBtn);

    // Last move button
    const lastMoveBtn = document.createElement('button');
    lastMoveBtn.classList.add('moves-nav-btn');
    lastMoveBtn.innerHTML = '⏭'; // Unicode double right arrow
    lastMoveBtn.title = 'Go to last move';
    lastMoveBtn.onclick = goToLastMoveInternal;
    navContainer.appendChild(lastMoveBtn);

    // Create the scrollable moves display area
    movesListDisplayElement = document.createElement('div');
    movesListDisplayElement.id = 'movesListDisplay';
    movesListDisplayElement.classList.add('moves-list-display');

    // Add an empty table with a message
    const emptyMessage = document.createElement('div');
    emptyMessage.classList.add('moves-list-footer-info');
    emptyMessage.textContent = 'No moves yet';
    movesListDisplayElement.appendChild(emptyMessage);

    // Add both containers to the moves list container
    movesListContainer.appendChild(navContainer);
    movesListContainer.appendChild(movesListDisplayElement);
}

// Function to highlight the selected move in the moves list
function highlightSelectedMoveInternal(moveNumber, color) {
    if (!movesListDisplayElement) return;

    unselectMovesInMovelist();

    // Find and highlight the selected move
    const rows = movesListDisplayElement.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const moveNumCell = row.querySelector('.move-number');

        if (moveNumCell && moveNumCell.textContent === `${moveNumber}.`) {
            // Found the row with the target move number
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) { // Should have move number, white move, black move
                const targetCell = color === 'w' ? cells[1] : cells[2];
                const moveSpan = targetCell.querySelector('.move-san');
                if (moveSpan) {
                    moveSpan.classList.add('selected-move');
                    // Scroll the move into view if needed
                    moveSpan.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            break;
        }
    }
}


// --- Style12 Processing ---
// ... (existing function)

// --- Preference Application ---
// ... (existing function)

// --- Public method to be called by createGameTab in index.js ---
// ... (existing function)


// --- Internal Functions (not directly exported, but used by exported ones) ---
function setupMainChessBoardDisplay() {
    if (document.getElementById('chessBoard')) {
        console.log("Main chess board display already exists.");
        return; // Avoid re-creating if already present
    }

    const boardArea = document.querySelector('.chess-board-area');
    if (!boardArea) {
        console.error('.chess-board-area not found for main display setup.');
        return;
    }

    boardArea.innerHTML = ''; // Clear previous content

    const boardMainContainer = document.createElement('div');
    boardMainContainer.classList.add('grid-row', 'board-main-container');

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');

    const boardOnlyContainer = document.createElement('div');
    boardOnlyContainer.classList.add('board-only-container');

    // Create the playerInfoContainer element
    const playerInfoContainer = document.createElement('div');
    playerInfoContainer.classList.add('player-info-container');

    const topPlayerInfo = document.createElement('div');
    topPlayerInfo.classList.add('player-info', 'top-player');

    const topPlayerNameWrapper = document.createElement('div');
    topPlayerNameWrapper.classList.add('player-name-wrapper');
    const topPlayerName = document.createElement('div');
    topPlayerName.classList.add('player-name');
    topPlayerName.id = 'topPlayerName';
    topPlayerName.innerText = 'Opponent';
    // Move indicator removed
    topPlayerNameWrapper.appendChild(topPlayerName);

    const topPlayerClock = document.createElement('div');
    topPlayerClock.classList.add('player-clock', 'top-player-clock', 'player-clock-display');
    topPlayerClock.id = 'topPlayerClock';
    topPlayerClock.innerText = '00:00';
    topPlayerInfo.appendChild(topPlayerClock);
    topPlayerInfo.appendChild(topPlayerNameWrapper);

    const board = document.createElement('div');
    board.id = 'chessBoard';
    board.classList.add('chess-board');

    const bottomPlayerInfo = document.createElement('div');
    bottomPlayerInfo.classList.add('player-info', 'bottom-player');

    const bottomPlayerNameWrapper = document.createElement('div');
    bottomPlayerNameWrapper.classList.add('player-name-wrapper');
    const bottomPlayerName = document.createElement('div');
    bottomPlayerName.classList.add('player-name');
    bottomPlayerName.id = 'bottomPlayerName';
    bottomPlayerName.innerText = 'You';
    // Move indicator removed
    bottomPlayerNameWrapper.appendChild(bottomPlayerName);

    const bottomPlayerClock = document.createElement('div');
    bottomPlayerClock.classList.add('player-clock', 'bottom-player-clock', 'player-clock-display');
    bottomPlayerClock.id = 'bottomPlayerClock';
    bottomPlayerClock.innerText = '00:00';
    bottomPlayerInfo.appendChild(bottomPlayerNameWrapper);
    bottomPlayerInfo.appendChild(bottomPlayerClock);

    // Last move display removed

    const boardMenuButton = document.createElement('button');
    boardMenuButton.classList.add('board-menu-button');
    boardMenuButton.innerHTML = '⋮';
    boardMenuButton.title = 'Board Menu';

    const boardMenu = document.createElement('div');
    boardMenu.classList.add('board-menu');

    const flipBtn = document.createElement('button');
    flipBtn.title = 'Flip Board';
    flipBtn.innerHTML = '<i class="material-icons">swap_vert</i>';
    flipBtn.onclick = () => {
        if (ws) ws.send('flip\n\r');
        const refreshTime = Date.now() + 300;
        const checkTimeAndRefresh = () => {
            if (Date.now() >= refreshTime) {
                if (ws) ws.send('refresh\n\r');
            } else {
                requestAnimationFrame(checkTimeAndRefresh);
            }
        };
        requestAnimationFrame(checkTimeAndRefresh);
        myColor = myColor === 'white' ? 'black' : 'white';
        updateBoardGraphicsInternal(null, null);
        updatePlayerInfoUIInternal(null);
        boardMenu.classList.remove('show');
    };
    boardMenu.appendChild(flipBtn);

    boardMenuButton.addEventListener('click', (event) => {
        boardMenu.classList.toggle('show');
        event.stopPropagation();
    });
    document.addEventListener('click', (event) => {
        if (!boardMenuButton.contains(event.target) && !boardMenu.contains(event.target)) {
            boardMenu.classList.remove('show');
        }
    });

    boardOnlyContainer.appendChild(board);
    // Last move display removed

    const playerDivider = document.createElement('div');
    playerDivider.classList.add('player-divider');
    const topPlayerNameContainer = document.createElement('div');
    topPlayerNameContainer.classList.add('top-name-container');
    const bottomPlayerNameContainer = document.createElement('div');
    bottomPlayerNameContainer.classList.add('bottom-name-container');
    topPlayerNameContainer.appendChild(topPlayerNameWrapper);
    topPlayerNameContainer.appendChild(boardMenuButton);
    bottomPlayerNameContainer.appendChild(bottomPlayerNameWrapper);
    playerDivider.appendChild(boardMenu);
    playerDivider.style.position = 'relative';
    playerDivider.appendChild(topPlayerNameContainer);
    playerDivider.appendChild(bottomPlayerNameContainer);

    // Populate playerInfoContainer
    playerInfoContainer.appendChild(topPlayerClock);
    playerInfoContainer.appendChild(playerDivider);
    playerInfoContainer.appendChild(bottomPlayerClock);

    // Assemble the main board structure
    boardContainer.appendChild(boardOnlyContainer);
    boardContainer.appendChild(playerInfoContainer); // playerInfoContainer is added here
    boardMainContainer.appendChild(boardContainer);
    boardArea.appendChild(boardMainContainer); // And finally to the DOM

    // Create chess board squares
    createBoardSquaresInternal(board);

    // --- Add the Moves List Container ---
    // The 'playerInfoContainer' variable here refers to the one created above.
    // We don't need to query the DOM for it again.
    if (playerInfoContainer) { // This check is to ensure it was created successfully
        movesListContainer = document.createElement('div'); // Assign to global
        movesListContainer.id = 'movesListContainer';
        movesListContainer.classList.add('moves-list-container');
        movesListContainer.style.display = 'block'; // Show by default

        // The movesListDisplayElement will be created by initializeEmptyMoveListInternal
        playerDivider.appendChild(movesListContainer); // Add moves list to the player divider between names

        // Initialize an empty move list with navigation buttons
        initializeEmptyMoveListInternal();
    } else {
        // This else block should ideally not be reached if createElement was successful.
        // The original error occurred because a query for '.player-info-container' failed.
        console.error("playerInfoContainer (created element) is unexpectedly null or undefined.");
    }

    // Resize observer for the main board area
    const mainBoardResizeObserver = new ResizeObserver(() => {
        const chessBoardArea = document.querySelector('.chess-board-area');
        if (!chessBoardArea || !board) return;

        const availableWidth = chessBoardArea.clientWidth - 275; // Adjusted for potential player info width
        const availableHeight = chessBoardArea.clientHeight - 40; // Adjusted for potential margins/padding
        const maxWidth = Math.max(100, availableWidth);
        const maxSize = Math.min(maxWidth, availableHeight, 1500);

        board.style.width = maxSize + 'px';
        board.style.height = maxSize + 'px';

        const fontScale = Math.max(0.45, Math.min(1.125, maxSize / 800 * 0.75));
        document.documentElement.style.setProperty('--font-scale', fontScale);
        chessBoardArea.dataset.maxSize = maxSize;
        chessBoardArea.dataset.fontScale = fontScale;

        // Ensure playerInfoContainer and boardOnlyContainer also respond
        if (playerInfoContainer) playerInfoContainer.style.height = maxSize + 'px';
        if (boardOnlyContainer) boardOnlyContainer.style.width = maxSize + 'px';

        updateBoardGraphicsInternal(); // Redraw board graphics which includes piece sizes
    });

    if (boardArea) mainBoardResizeObserver.observe(boardArea);

    window.addEventListener('resize', () => {
        mainBoardResizeObserver.disconnect();
        if (boardArea) mainBoardResizeObserver.observe(boardArea);
    });

    // Set default player names and clocks for initial display
    whitePlayerName = 'White';
    blackPlayerName = 'Black';
    whiteTimeSeconds = 300;
    blackTimeSeconds = 300;
    whitePlayerClockDisplay = formatClockTimeInternal(whiteTimeSeconds);
    blackPlayerClockDisplay = formatClockTimeInternal(blackTimeSeconds);
    currentTurn = 'w';

    chess.reset();
    updateBoardGraphicsInternal(null, null); // Initial draw
}

// ... (rest of your chess.js: createBoardSquaresInternal, updateBoardGraphicsInternal, etc.)
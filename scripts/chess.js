// C:/Users/carso/IdeaProjects/Simple-FICS-Interface/chess.js

// Import ECO lookup functions
import {initECO, lookupFromMoveList} from './eco.js';
import {
    fileNumberToAlgebraic,
    getPieceAtSquare,
    parseVerboseMove,
    style12ToFen,
    toAlgebraicSquare,
    toRankFile,
    convertToUnicodeChessPieces,
    startEndToAlgebraic,
    ficsMoveToStartEndArray
} from './utils.js';
import {playSound} from './index.js';


// GameRelation Enum
const GameRelation = {
    ISOLATED_POSITION: -3,
    OBSERVING_EXAMINED: -2,
    EXAMINING: 2,
    PLAYING_OPPONENT_MOVE: -1,
    PLAYING_MY_MOVE: 1,
    OBSERVING_PLAYED: 0,
    STARTING_BOARD: -10,
    getDescription: function (value) {
        switch (value) {
            case this.ISOLATED_POSITION:
                return "Isolated position";
            case this.OBSERVING_EXAMINED:
                return "Observing examined game";
            case this.EXAMINING:
                return "Examining game";
            case this.PLAYING_OPPONENT_MOVE:
                return "Playing (opponent's move)";
            case this.PLAYING_MY_MOVE:
                return "Playing (my move)";
            case this.OBSERVING_PLAYED:
                return "Observing played game";
            case this.STARTING_BOARD:
                return "Starting unconnected board";
            default:
                return "Unknown relation (" + value + ")";
        }
    }
};

let chess; // The main chess game instance
try {
    chess = new Chess();
    console.log("Chess instance initialized successfully");
} catch (e) {
    console.error("Failed to initialize chess instance:", e);
}
let ws; // WebSocket instance, to be set by an initializer
let prefs; // Preferences object, to be set by an initializer

// Chess State
let boardInitialized = false; // Tracks if the main board display structure is up
let previousPosition = null; // For animation
let clockTimer = null;
let movesListDisplayElement; // DOM element for displaying the moves list
let movesListContainer; // Container for the moves list
let gameState = { // Reset header
    gameNumber: 0,
    whitePlayer: {name: 'White', rating: ''},
    blackPlayer: {name: 'Black', rating: ''},
    type: '',
    isRated: false,
    moveNumber: 1,
    lastMove: '',
    lastMovePretty: '',
    relation: GameRelation.STARTING_BOARD,
    doublePawnPushFile: '',
    minutes: 5,
    increment: 0,
    whiteTimeSecs: 0,
    whiteClockDisplay: "",
    blackClockDisplay: "",
    blackTimeSecs: 0,
    whiteCastleShort: true,
    whiteCastleLong: true,
    blackCastleShort: true,
    blackCastleLong: true,
    irreversibleCount: 0,
    isWhiteOnBottom: true,
    isActive: false,
    isPlayerWhite: true,
    isPlayerPlaying: true,
    isFlipped: false,
    isValidationSupported: true,
    allowUserToMoveBothSides: true,
    moves: [],
    validMoves: [],
    openingDescription: '',
    isWhitesMove: true,
    isClockRunning: false,
    requestedMovesForGame: false,
    draggedPiece: null,
    draggedPieceElement: null,
    dndStartSquareAlegbraic: null,
    dndLastDropTime: null,
    clickclickStartSquareAlegbraic: null,
    clickclickLastDropTime: null,
    premove: null, // null if not set.
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', //Just piece positions, no other info.
    status: '',
    result: ''
};

// --- Style12 Processing ---
export function processStyle12Message(msg) {
    console.log("Processing Style12 message:", msg.substring(0, 100) + "...");

    // First premove if its set.
    if (gameState.premove) {
        console.log("Sending premove: " + gameState.premove);
        ws.send(gameState.premove);
        gameState.premove = null;
    }

    if (!boardInitialized) {
        setupMainChessBoardDisplay();
    }

    // Update game info and board position using the merged function
    updateFromStyle12(msg);
    // Update the move list
    updateMovesListWithNewMoveInternal();
    // Finally, update the UI
    updateNonBoardAndMovesUI();

    // If we're observing a played game, request the moves list
    if (!gameState.requestedMovesForGame &&
        gameState.relation === GameRelation.OBSERVING_PLAYED &&
        gameState.gameNumber > 0) {
        const movesCommand = `moves ${gameState.gameNumber}`;
        console.log("Sending moves command:", movesCommand);
        ws.send(movesCommand);
        gameState.requestedMovesForGame = true;
    }
}

export function processUnobserveMessage(gameNumber) {
    if (gameState.gameNumber === gameNumber) {
        stopClockInternal();
        playSound('end');
    }
}


/**
 *
 * @param rawMovesText
 */
export function processMovesList(rawMovesText) {
    if (!boardInitialized && !document.getElementById('chessBoard')) {
        console.warn("Chess board/UI not initialized when processing moves list. Attempting setup.");
        setupMainChessBoardDisplay(); // Ensure UI is ready
    }
    // Update player info UI to show ratings if the game number matches
    parseAndStoreMovesInternal(rawMovesText);
    updateMovesListDisplayInternal();
    highlightLastMoveInMovelist();
    updateNonBoardAndMovesUI();
}

/**
 * Sent when the user is playing a game that has started.
 * GuestGTKW (++++) walpurti (2084) unrated blitz 5 0
 * {Game 14 (GuestGTKW vs. walpurti) Creating unrated blitz match.}
 *  Game 14: A disconnection will be considered a forfeit.
 * fics%
 * @param message
 * @returns {boolean}
 */
export function processGameCreationMessage(message) {
    if (!message || !message.trim()) return false;
    //Creating: foo (1668) bobbyrob (1715) rated blitz 3 0
    //{Game 16 (foo vs. bobbyrob) Creating rated blitz match.}
    // Regular expression to match game creation messages with more flexible rating patterns
    const gameCreationRegex = /^([\w.-]+) \(([\d+-]+)\) ([\w.-]+) \(([\d+-]+)\) (rated|unrated) (\w+) (\d+) (\d+)/;
    const match = message.match(gameCreationRegex);

    if (!match) {
        if (prefs && prefs.showStyle12Events) {
            console.log("Game creation message did not match regex pattern:", message);
        }
        return false;
    } else {
        console.log(`Processing game creation ${message}`);
    }

    //Parse second line for game number.
    var gameNumber = null;
    const startIndex = message.indexOf("\n{Game ");
    if (startIndex != -1) {
        gameNumber = message.substring(startIndex + 7);
        const spaceIndex = gameNumber.indexOf(" ");
        gameNumber = gameNumber.substring(0, spaceIndex);
    }

    gameState.gameNumber = gameNumber;
    gameState.whitePlayer = {name: match[1], rating: match[2]};
    gameState.blackPlayer = {name: match[3], rating: match[4]};
    gameState.type = match[6];
    gameState.isRated = match[5] === 'rated';
    gameState.moveNumber = 1;
    gameState.lastMove = '';
    gameState.lastMovePretty = '';
    gameState.doublePawnPushFile = -1;
    gameState.minutes = parseInt(match[7], 10);
    gameState.increment = parseInt(match[8], 10);
    gameState.whiteTimeSecs = gameState.minutes * 60;
    gameState.blackTimeSecs = gameState.minutes * 60;
    gameState.whiteCastleShort = true;
    gameState.whiteCastleLong = true;
    gameState.blackCastleShort = true;
    gameState.blackCastleLong = true;
    gameState.irreversibleCount = 0;
    gameState.status = '';
    gameState.result = '';
    gameState.isActive = true;
    gameState.isFlipped = false;
    gameState.openingDescription = '';
    gameState.requestedMovesForGame = false;
    gameState.draggedPiece = null;
    gameState.draggedPieceElement = null;
    gameState.dndStartSquareAlegbraic = null;
    gameState.clickclickStartSquareAlegbraic = null;
    gameState.dndStartSquareAlegbraic = null;
    gameState.moves = [];
    gameState.validMoves = [];

    // Set isWhiteOnBottom to true by default for new games
    // This will be updated correctly when the first Style12 message arrives
    gameState.isWhiteOnBottom = true;

    return true;
}

/**
 * Process game end messages like "12 (genieman vs. Pawnlightly) genieman resigns} 0-1"
 * @param message
 * @returns {boolean}
 */
export function processGameEndMessage(message) {
    if (!message || !message.trim()) return false;

    // Regular expression to match game end messages
    // This regex is very flexible to handle all types of player names and game end reasons
    const gameEndRegex = /^(\d+) \(([^)]+) vs\. ([^)]+)\) (.*)\}\s*([012\/-]+).*/;
    const match = message.match(gameEndRegex);

    if (!match || match.length != 6) {
        if (prefs && prefs.showStyle12Events) { // Use the debug preference for logging
            console.log("Game end message did not match regex pattern:", message);
        }
        return false;
    }

    const gameNumber = parseInt(match[1], 10);
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
    if (gameState.gameNumber === gameNumber) {
        // Update the game header info with the status and result
        gameState.status = reason;
        gameState.result = result;
        gameState.isActive = false;

        // Update the moves list display to show the game result
        updateMovesListDisplayInternal();

        // Stop the clock if it's running
        stopClockInternal();

        gameState.isPlayerPlaying = false;

        return true;
    }

    return false;
}

function parseAndStoreMovesInternal(rawMovesText) {
    // Unrated blitz match, initial time: 5 minutes, increment: 2 seconds.
    //     Move  GuestJVNB          GuestYKYQ
    // ----  ----------------   ----------------
    // 1.  d4      (0:00)     d5      (0:00)
    // 2.  Nf3     (0:02)     Nf6     (0:03)
    // 3.  e3      (0:02)     a6      (0:02)
    // 4.  Bd3     (0:02)     Bg4     (0:11)
    // 5.  Nbd2    (0:03)     e6      (0:02)
    // 6.  b3      (0:03)     Nbd7    (0:02)
    // 7.  a3      (0:03)     Bd6     (0:02)
    // 8.  Bb2     (0:03)     O-O     (0:03)
    // 9.  O-O     (0:05)     h6      (0:02)
    // 10.  Qe1     (0:10)     c6      (0:03)
    // 11.  Ne5     (0:05)     Bxe5    (0:15)
    // 12.  dxe5    (0:03)     Ne8     (0:03)
    // 13.  f4      (0:11)     Nc5     (0:04)
    // 14.  Qg3     (0:26)     Nxd3    (0:06)
    // 15.  cxd3    (0:03)     Be2     (0:03)
    // 16.  Rf2     (0:11)     Bxd3    (0:02)
    // 17.  Nf3     (0:21)     Kh7     (0:38)
    // 18.  Nh4     (0:05)     Be4     (0:16)
    // 19.  f5      (0:06)     Qg5     (0:19)
    // 20.  fxe6    (0:29)     Qxg3    (0:03)
    // 21.  hxg3    (0:02)
    // {Still in progress} *
    // fics%

    // Check if we should update the current game's player ratings
    let isForLoadedGame = false;

    const lines = rawMovesText.split('\n');
    let parsingHeader = true;
    let moveDataStarted = false; // To identify when actual move lines begin

    // Regex patterns for parsing
    const playerRegex = /^([\w.-]+)\s\((\d+)\)\s+vs\.\s+([\w.-]+)\s\((\d+)\)\s+---\s+(.*)$/;
    const gameTypeRegex = /^(.*) (.*) match,\s+initial time:\s+(.*),\s+increment:\s+(.*)\.$/;
    const moveLineRegex = /^\s*(\d+)\.\s+([a-zA-Z0-9+#=O-]+)\s+\(([^)]+)\)(?:\s+([a-zA-Z0-9+#=O-]+)\s+\(([^)]+)\))?/;
    const statusRegex = /^{\s*(.*?)\s*}(?:\s*([0-1/2*-]+))?$/;


    for (const line of lines) {
        if (line.trim() === "") continue;

        if (parsingHeader) {
            if (line.indexOf("Movelist for game") == 0) {
                const match = line.match(/Movelist for game (\d+):/);
                if (match) {
                    const gameNumber = parseInt(match[1], 10);
                    // Check if this moves list is for the current game
                    if (gameNumber === gameState.gameNumber) {
                        isForLoadedGame = true;
                        gameState.moves = [];
                    }
                } else {
                    return;
                }
            }

            const playerMatch = line.match(playerRegex);
            if (playerMatch) {
                // This is how the ratings are set for observed games.
                if (!gameState.whitePlayer.rating) {
                    gameState.whitePlayer.rating = playerMatch[2];
                }
                if (!gameState.blackPlayer.rating) {
                    gameState.blackPlayer.rating = playerMatch[4];
                }

                continue;
            }

            const gameType = line.match(gameTypeRegex);
            if (playerMatch) {
                gameState.increment = gameType[4] === 'rated';
                gameState.minutes = gameType[3] === 'rated';
                gameState.isRated = gameType[1] === 'rated';
                gameState.type = gameType[2];
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
                    white: {san: moveMatch[2], time: moveMatch[3]},
                    black: moveMatch[4] ? {san: moveMatch[4], time: moveMatch[5]} : null
                };
                gameState.moves.push(moveEntry);
                continue;
            }
            // Lines after status (like fics% prompt) will be ignored by these specific parsers
        }
    }

    if (prefs && prefs.showStyle12Events) { // Re-use this pref for general debug logging
        console.log("Parsed Game Header (Moves List):", gameState);
        console.log("Parsed Moves (Moves List):", gameState.moves);
    }

    // Update ECO opening info after parsing the move list checking every move.
    updateECOLabelFromMoveList();
}

// --- Preference Application ---
export function applyChessRelatedPreferences() {
    if (!prefs) {
        return;
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
export function createBoardSquares(boardElement) {
    boardElement.innerHTML = ''; // Clear existing squares if any

    boardElement.style.display = 'grid';
    boardElement.style.gridTemplateColumns = 'repeat(8, 1fr)';
    boardElement.style.gridTemplateRows = 'repeat(8, 1fr)';
    boardElement.style.width = '100%'; // Handled by parent sizer
    boardElement.style.height = '100%'; // Handled by parent sizer
    boardElement.style.aspectRatio = '1 / 1';

    if (gameState.isWhiteOnBottom) {
        //create top rank first left to right.
        // h8 g8 f8 e8 d8 c8 b8 a8
        // h7 g7 f7 ...
        // ...
        // h1 g1 f1 ...
        for (let rank = 8; rank > 0; rank--) {
            for (let file = 1; file <= 8; file++) {
                createSquare(boardElement, toAlgebraicSquare(rank, file));
            }
        }
    } else { // white on top.
        //create top rank first left to right.
        // h1 g1 f1 e1 d1 c1 b1 a1
        // h2 g2 f2 ...
        // ...
        // h8 g8 f8 ...
        for (let rank = 1; rank <= 8; rank++) {
            for (let file = 8; file > 0; file--) {
                createSquare(boardElement, toAlgebraicSquare(rank, file));
            }
        }
    }

    applyChessRelatedPreferences(); // Apply colors after squares are created
}

/**
 * Creates a square on the board.
 * Order of calls should be left to right, top to bottom.
 * @param boardElement The board element.
 * @param algebraicSquare The algebraic square, e.g. e4.
 */
function createSquare(boardElement, algebraicSquare) {
    const rankFile = toRankFile(algebraicSquare);
    const rank = rankFile.rank;
    const file = rankFile.file;
    const algRank = algebraicSquare.charAt(1);
    const algFile = algebraicSquare.charAt(0);

    //console.log(`Creating square ${algebraicSquare} with rank ${rank} and file ${file}`);

    //Create square and piece and an empty piece and add it to the board.
    const squareDiv = document.createElement('div');
    squareDiv.id = `square-${file}-${rank}`; // TODO: Ensure unique IDs if multiple boards (not current case)
    squareDiv.dataset.file = `${file}`;
    squareDiv.dataset.rank = `${rank}`;
    squareDiv.classList.add('chess-square');
    if (gameState.isWhiteOnBottom) {
        squareDiv.classList.add((file + rank) % 2 === 0 ? 'dark-square' : 'light-square');
    } else {
        squareDiv.classList.add((file + rank) % 2 === 0 ? 'light-square' : 'dark-square');
    }
    squareDiv.dataset.algebraic = `${algFile}${algRank}`;
    const pieceElement = document.createElement('div');
    pieceElement.classList.add('chess-piece');
    squareDiv.appendChild(pieceElement);
    boardElement.appendChild(squareDiv);

    // Add rank and file labels.
    if (file === 1 && !gameState.isWhiteOnBottom) {
        const rankLabel = document.createElement('div');
        rankLabel.classList.add('rank-label');
        rankLabel.textContent = algRank;
        squareDiv.appendChild(rankLabel);
    } else if (file == 8 && gameState.isWhiteOnBottom) {
        const rankLabel = document.createElement('div');
        rankLabel.classList.add('rank-label');
        rankLabel.textContent = algRank;
        squareDiv.appendChild(rankLabel);
    }

    // Add file labels to the bottom row based on board orientation
    if ((gameState.isWhiteOnBottom && rank === 1) ||
        (!gameState.isWhiteOnBottom && rank === 8)) {
        const fileLabel = document.createElement('div');
        fileLabel.classList.add('file-label');

        // Use the same algebraic file as used for the square notation
        let labelFile = file;
        fileLabel.textContent = algFile;
        squareDiv.appendChild(fileLabel);
    }

    // The click-click move handler.
    squareDiv.addEventListener('click', (e) => {
        if (e.button === 2) { // 2 is right mouse button
            console.log("Right click, clearing premove.");
            gameState.premove = null;
            updateBoardBottomLabels();
        } else { // All other buttons similar to left click.
            console.log(`Click click move handler called. Square: ${squareDiv.dataset.algebraic}`)
            if (gameState.dndStartSquareAlegbraic) {
                //DND start square set, cancelling click-click move.
                return;
            }
            if (gameState.dndLastDropTime && gameState.dndLastDropTime > Date.now() - 200) {
                //DND drop time less than now - 200ms. Ignoring click-click move.
                return;
            }
            removeBoardHighlightsInternal();
            let treatAsStartMove = false;
            if (!gameState.clickclickStartSquareAlegbraic) {
                // Since DND and click handlers are being used simultaneously, this can occur.
                // The use can also click on the start square twice which should not unset it.
                treatAsStartMove = true;
            } else { // This is the end square.
                treatAsStartMove = !makeMove(gameState.clickclickStartSquareAlegbraic, squareDiv.dataset.algebraic, false);
                gameState.clickclickLastDropTime = Date.now();
                removeBoardHighlightsInternal();
            }

            if (treatAsStartMove) {
                gameState.clickclickStartSquareAlegbraic = squareDiv.dataset.algebraic;
                const verboseMoves = chess.moves({square: gameState.clickclickStartSquareAlegbraic, verbose: true});
                gameState.validMoves = verboseMoves.map(move => move.to);
                updateBoardHighlightsInternal();
            }
        }
    });
}


function updateBoardGraphicsInternal(updateNonBoardUI = false) {
    const board = document.getElementById('chessBoard');
    if (!board || !prefs) {
        return;
    }

    board.querySelectorAll('.chess-piece.dragging').forEach(piece => {
        piece.classList.remove('dragging');
    });

    //Clear premove highlights.
    board.querySelectorAll(".premove-start").forEach(square => {
        square.classList.remove('premove-start');
    });
    board.querySelectorAll(".premove-end").forEach(square => {
        square.classList.remove('premove-end');
    });

    const squareSize = board.clientWidth / 8;
    const pieceFontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';
    const labelFontSize = Math.max(Math.floor(squareSize * 0.15), 6) + 'px';

    for (let rank = 1; rank <= 8; rank++) {
        for (let file = 1; file <= 8; file++) {
            const squareAlg = `${fileNumberToAlgebraic(file)}${rank}`;
            const squareDiv = document.getElementById(`square-${file}-${rank}`);
            if (!squareDiv) continue;

            squareDiv.style.fontSize = pieceFontSize; // For text pieces if ever used

            const piece = getPieceAtSquare(gameState.fen, squareAlg);
            const pieceColor = piece === piece.toUpperCase() ? 'w' : 'b'; //Upper is white lower black in FEN.
            const pieceType = piece.toUpperCase();
            let pieceImage = '';

            //console.log(`updateBoardGraphicsInternal squareAlg: ${squareAlg} piece: ${piece} `);

            if (piece != '') {
                pieceImage = `<img src="pieces/${prefs.pieceSet}/${pieceColor}${pieceType}.svg" alt="${pieceColor}${pieceType}" />`;
            }

            let rankLabel = squareDiv.querySelector('.rank-label');
            let fileLabel = squareDiv.querySelector('.file-label');

            if (rankLabel) {
                rankLabel.style.fontSize = labelFontSize;
                rankLabel.style.display = 'block';
                rankLabel.style.color = squareDiv.classList.contains('light-square') ? prefs.darkSquareColor : prefs.lightSquareColor;
            }
            if (fileLabel) {
                fileLabel.style.fontSize = labelFontSize;
                // Show file labels on the bottom row based on board orientation
                fileLabel.style.display = (gameState.isWhiteOnBottom && rank === 1) ||
                (!gameState.isWhiteOnBottom && rank === 8) ? 'block' : 'none';
                fileLabel.style.color = squareDiv.classList.contains('light-square') ? prefs.darkSquareColor : prefs.lightSquareColor;
            }

            let pieceElement = squareDiv.querySelector('.chess-piece');
            if (!pieceElement) { // Should not happen if createBoardSquares ran
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


            pieceElement.innerHTML = pieceImage;
            pieceElement.style.fontSize = pieceFontSize; // Ensure img scales if CSS relies on font size

            if (piece !== '') {
                const shouldBeDraggable = gameState.allowUserToMoveBothSides ||
                    (!gameState.allowUserToMoveBothSides &&
                        ((gameState.isPlayerWhite && pieceColor === 'w') ||
                            (!gameState.isPlayerWhite && pieceColor === 'b')))

                if (shouldBeDraggable) {
                    // Add a custom mousedown handler to initialize the drag
                    pieceElement.addEventListener('mousedown', (e) => {
                        // Prevent the default browser drag behavior
                        e.preventDefault();

                        // Store the piece and square information
                        gameState.draggedPiece = piece;
                        gameState.draggedPieceElement = pieceElement;
                        gameState.dndStartSquareAlegbraic = squareAlg;

                        // Get valid moves for this piece
                        const verboseMoves = chess.moves({square: squareAlg, verbose: true});
                        gameState.validMoves = verboseMoves.map(move => move.to);

                        // Update board highlights to show valid moves
                        updateBoardHighlightsInternal();

                        // Create a clone for dragging
                        const clone = pieceElement.cloneNode(true);
                        clone.id = 'dragging-piece';
                        clone.style.position = 'fixed';
                        clone.style.zIndex = '9999';
                        clone.style.pointerEvents = 'none';
                        clone.style.width = `${pieceElement.offsetWidth}px`;
                        clone.style.height = `${pieceElement.offsetHeight}px`;
                        clone.style.left = `${e.clientX}px`;
                        clone.style.top = `${e.clientY}px`;
                        document.body.appendChild(clone);

                        // Store the clone reference
                        gameState.dragClone = clone;

                        // Make the original piece semi-transparent
                        pieceElement.classList.remove('piece-visible', 'piece-hidden');
                        pieceElement.classList.add('piece-semi-transparent');

                        // Add mousemove and mouseup event listeners to the document
                        const onMouseMove = (e) => {
                            if (!gameState.dragClone) return;

                            removeBoardHighlightsInternal();

                            // Move the clone with the cursor
                            gameState.dragClone.style.left = `${e.clientX}px`;
                            gameState.dragClone.style.top = `${e.clientY}px`;

                            // Find the square under the cursor
                            const elementsUnderPoint = document.elementsFromPoint(e.clientX, e.clientY);

                            // Try to find a chess square or a piece element
                            let squareUnder = elementsUnderPoint.find(el => el.classList.contains('chess-square'));

                            // If we found a piece instead of a square, get its parent square
                            if (!squareUnder) {
                                const pieceUnder = elementsUnderPoint.find(el => el.classList.contains('chess-piece'));
                                if (pieceUnder) {
                                    squareUnder = pieceUnder.closest('.chess-square');
                                }
                            }

                            // Remove hover class from all squares
                            document.querySelectorAll('.valid-move-hover').forEach(sq => {
                                sq.classList.remove('valid-move-hover');
                            });

                            // Add hover class to the square under the cursor if it's a valid move
                            if (squareUnder &&
                                gameState.validMoves.includes(squareUnder.dataset.algebraic) &&
                                squareUnder.dataset.algebraic !== gameState.dndStartSquareAlegbraic) {
                                squareUnder.classList.add('valid-move-hover');
                            }
                        };

                        const onMouseUp = (e) => {
                            // Remove the event listeners
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);

                            // Remove the clone
                            if (gameState.dragClone) {
                                gameState.dragClone.remove();
                                gameState.dragClone = null;
                            }

                            // Find the square under the cursor
                            const elementsUnderPoint = document.elementsFromPoint(e.clientX, e.clientY);

                            // Try to find a chess square or a piece element
                            let squareUnder = elementsUnderPoint.find(el => el.classList.contains('chess-square'));

                            // If we found a piece instead of a square, get its parent square
                            if (!squareUnder) {
                                const pieceUnder = elementsUnderPoint.find(el => el.classList.contains('chess-piece'));
                                if (pieceUnder) {
                                    squareUnder = pieceUnder.closest('.chess-square');
                                }
                            }

                            // Process the drop if it's a valid move and not the same square
                            if (squareUnder &&
                                //gameState.validMoves.includes(squareUnder.dataset.algebraic) &&
                                squareUnder.dataset.algebraic !== gameState.dndStartSquareAlegbraic) {
                                console.log("Valid move to:", squareUnder.dataset.algebraic, "from:", gameState.dndStartSquareAlegbraic);
                                makeMove(gameState.dndStartSquareAlegbraic, squareUnder.dataset.algebraic, true);
                                gameState.dndLastDropTime = Date.now();
                            } else {
                                // Check if we're trying to drop on the same square we picked up from
                                if (squareUnder && squareUnder.dataset.algebraic === gameState.dndStartSquareAlegbraic) {
                                    console.log("Dropped on same square, canceling move");
                                } else {
                                    console.log("Invalid move or no square found");
                                }
                            }
                            // Reset the drag state
                            gameState.draggedPiece = null;
                            gameState.draggedPieceElement = null;
                            gameState.dndStartSquareAlegbraic = null;
                            gameState.clickclickStartSquareAlegbraic = null;
                            removeBoardHighlightsInternal();

                            // Clear all DND artifacts.
                            pieceElement.classList.remove('piece-semi-transparent', 'piece-hidden');
                            pieceElement.classList.add('piece-visible');

                        };

                        // Add the event listeners
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    });
                }
            }
        }
    }
    removeBoardHighlightsInternal();

    if (gameState.relation == GameRelation.OBSERVING_EXAMINED ||
        gameState.relation == GameRelation.OBSERVING_PLAYED ||
        gameState.relation == GameRelation.PLAYING_MY_MOVE) {
        var lastMoveStartEnd = lastMoveToStartEndAlgebraic();
        if (lastMoveStartEnd) {
            const startSquare = lastMoveStartEnd[0];
            const endSquare = lastMoveStartEnd[1];
            console.log(`Last move start: ${startSquare}, end: ${endSquare})`);
            const startSquareElement = document.querySelector(`[data-algebraic="${startSquare}"]`);
            const endSquareElement = document.querySelector(`[data-algebraic="${endSquare}"]`);
            if (startSquareElement) {
                startSquareElement.classList.add('last-move-start');
            }
            if (endSquareElement) {
                endSquareElement.classList.add('last-move-end');
            }

            // Add the fade class after a small delay to ensure the transition works
            setTimeout(() => {
                if (startSquareElement) {
                    startSquareElement.classList.add('last-move-fade');
                }
                if (endSquareElement) {
                    endSquareElement.classList.add('last-move-fade');
                }
            }, 50); // Small delay to ensure the browser processes the initial class first
        }
    }

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
    if (updateNonBoardUI) { // Allow null to be passed if only redrawing
        updateNonBoardAndMovesUI();
    }
}

function updateNonBoardAndMovesUI() {
    const topPlayerNameEl = document.getElementById('topPlayerName');
    const topPlayerClockEl = document.getElementById('topPlayerClock');
    const bottomPlayerNameEl = document.getElementById('bottomPlayerName');
    const bottomPlayerClockEl = document.getElementById('bottomPlayerClock');

    // Check if we have ratings from the current game info or moves list
    let whiteNameWithRating = gameState.whitePlayer.name + ' ' + (gameState.whitePlayer.rating ? `(${gameState.whitePlayer.rating})` : '');
    let blackNameWithRating = gameState.blackPlayer.name + ' ' + (gameState.blackPlayer.rating ? `(${gameState.blackPlayer.rating})` : '');

    // Update game number (left-aligned)
    const gameNumberEl = document.getElementById('gameNumber');
    if (gameNumberEl) {
        if (gameState.gameNumber > 0) {
            gameNumberEl.innerText = `Game ${gameState.gameNumber}`;
        } else {
            gameNumberEl.innerText = '';
        }
    }

    // Update game type info (right-aligned)
    const gameTypeInfo = document.getElementById('gameTypeInfo');
    if (gameTypeInfo) {
        if (gameState.type !== '' && gameState.minutes) {
            const ratedStr = gameState.isRated ? 'rated' : 'unrated';
            gameTypeInfo.innerText = `${ratedStr} ${gameState.type} ${gameState.minutes} ${gameState.increment}`;
        } else {
            gameTypeInfo.innerText = '';
        }
    }

    // Show the move list if it exists
    if (movesListContainer) {
        movesListContainer.style.display = 'block';
    }

    if (!gameState.isWhiteOnBottom) { //White on top
        topPlayerNameEl.innerText = whiteNameWithRating;
        topPlayerClockEl.innerText = gameState.whiteClockDisplay || '00:00';
        bottomPlayerNameEl.innerText = blackNameWithRating;
        bottomPlayerClockEl.innerText = gameState.blackClockDisplay || '00:00';

        // Update clock styles using CSS classes
        topPlayerClockEl.classList.remove('clock-active', 'clock-inactive');
        bottomPlayerClockEl.classList.remove('clock-active', 'clock-inactive');

        // Add active class for all active games (playing, examining, or observing)
        if (gameState.isPlayerPlaying || gameState.relation === 2 || gameState.relation === 0) {
            topPlayerClockEl.classList.add(gameState.isWhitesMove ? 'clock-active' : 'clock-inactive');
            bottomPlayerClockEl.classList.add(gameState.isWhitesMove ? 'clock-inactive' : 'clock-active');
        } else {
            // For observed games, both clocks are inactive
            topPlayerClockEl.classList.add('clock-inactive');
            bottomPlayerClockEl.classList.add('clock-inactive');
        }
    } else { // White at bottom
        topPlayerNameEl.innerText = blackNameWithRating;
        topPlayerClockEl.innerText = gameState.blackClockDisplay || '00:00';
        bottomPlayerNameEl.innerText = whiteNameWithRating;
        bottomPlayerClockEl.innerText = gameState.whiteClockDisplay || '00:00';

        // Update clock styles using CSS classes
        topPlayerClockEl.classList.remove('clock-active', 'clock-inactive');
        bottomPlayerClockEl.classList.remove('clock-active', 'clock-inactive');

        // Add active class for all active games (playing, examining, or observing)
        if (gameState.isPlayerPlaying || gameState.relation === 2 || gameState.relation === 0) {
            topPlayerClockEl.classList.add(gameState.isWhitesMove ? 'clock-inactive' : 'clock-active');
            bottomPlayerClockEl.classList.add(gameState.isWhitesMove ? 'clock-active' : 'clock-inactive');
        } else {
            // For observed games, both clocks are inactive
            topPlayerClockEl.classList.add('clock-inactive');
            bottomPlayerClockEl.classList.add('clock-inactive');
        }
    }
}

function style12DoublePawnPushToFile(style12Value) {
    if (style12Value === -1) {
        return '';
    } else if (style12Value >= 0 && style12Value <= 7) {
        return fileNumberToAlgebraic(style12Value + 1); // +1 because fileNumberToAlgebraic expects 1-8 for a-h
    }
    return '';
}


function updateFromStyle12(style12Message) {
    if (!chess) {
        try {
            chess = new Chess();
        } catch (e) {
            console.error("Failed to create new chess instance:", e);
            return;
        }
    }

    previousPosition = gameState.fen;

    const lines = style12Message.split('\n');
    const boardLineIndex = lines.findIndex(line => line.trim().startsWith('<12>'));

    if (boardLineIndex === -1) {
        console.error('No <12> tag found in Style12 message');
        return;
    }

    const boardLine = lines[boardLineIndex].trim();
    const parts = boardLine.split(' ');
    if (prefs && prefs.showStyle12Events) console.log('Style 12 parts:', parts);

    if (parts.length < 31) {
        console.error('Style 12 message has fewer than 31 parts:', parts.length);
        return;
    }

    const gameNumber = parseInt(parts[16], 10);
    if (gameNumber !== gameState.gameNumber) {
        playSound('start');
    }

    try {
        // 1. Update game state information from Style12 parts
        gameState.gameNumber = gameNumber;
        gameState.whitePlayer.name = parts[17];
        gameState.blackPlayer.name = parts[18];
        gameState.moveNumber = parseInt(parts[26], 10);
        gameState.lastMove = parts[27] === 'none' ? '' : parts[27];
        gameState.lastMovePretty = parts[29] === 'none' ? '' : parts[29];
        gameState.doublePawnPushFile = style12DoublePawnPushToFile(parseInt(parts[10], 10));
        gameState.minutes = parseInt(parts[20], 10);
        gameState.increment = parseInt(parts[21], 10);
        gameState.whiteTimeSecs = parseFloat(parts[24]);
        gameState.blackTimeSecs = parseFloat(parts[25]);
        gameState.whiteCastleShort = parseInt(parts[11], 10) === 1;
        gameState.whiteCastleLong = parseInt(parts[12], 10) === 1;
        gameState.blackCastleShort = parseInt(parts[13], 10) === 1;
        gameState.blackCastleLong = parseInt(parts[14], 10) === 1;
        gameState.irreversibleCount = parseInt(parts[15], 10);
        gameState.isActive = true;
        gameState.isWhitesMove = parts[9] === 'W';
        gameState.openingDescription = '';
        gameState.isValidationSupported = gameState.type != 'atomic' && gameState.type != 'suicide' && gameState.type != 'losers';

        const relationValue = parseInt(parts[19], 10);
        // Store the numeric relation value directly
        gameState.relation = relationValue;

        // For debugging
        if (prefs && prefs.showStyle12Events) {
            console.log(`Relation value: ${relationValue}, description: ${GameRelation.getDescription(relationValue)}`);
        }

        gameState.isPlayerWhite = (gameState.relation === GameRelation.PLAYING_MY_MOVE && gameState.isWhitesMove) ||
            (gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE && !gameState.isWhitesMove);

        /**
         * IMPORTANT!
         * gameState.isPlayerPlaying means the user is playing a live game on fics.
         * In this case he can only move his pieces. If it is his turn, he is making live moves.
         *
         * Premove has not yet been implemented but here is what it will do:
         * If it is not his turn, he is making a premove which is a move that will be
         * immediately played when it is his turn.
         */
        gameState.isPlayerPlaying = gameState.relation === GameRelation.PLAYING_MY_MOVE ||
            gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE;

        /**
         * IMPORTANT!
         * gameState.isFlipped is NOT the value from the style12 event, that is always ignored.
         * gameState.isFlipped is only changed if the user flips the board on the GUI by pressing the flip button.
         */

            // Store the previous value of isWhiteOnBottom to detect changes
        const previousIsWhiteOnBottom = gameState.isWhiteOnBottom;

        /**
         * When playing the user can only move his pieces. Currently he can only move them when it is his turn but when
         * premove is added this will change.
         */
        if (gameState.isPlayerPlaying) {
            gameState.isWhiteOnBottom = gameState.isPlayerWhite ? !gameState.isFlipped : gameState.isFlipped;
            gameState.allowUserToMoveBothSides = false;
        } else {
            /**
             * If user is not playing the user is allowed to move both sides!
             * If a user is observing a game for example, he can move pieces just to see the position visually.
             * Style12 events will come in and erase the changes, but that is fine.
             *
             * This will change in GameRelation.EXAMINING mode, but that is not implemented yet. Examine mode will be a
             * special case. In GameRelation.EXAMINING mode the moves will stick and be sent to the websocket.
             */
            gameState.isWhiteOnBottom = !gameState.isFlipped;
            gameState.allowUserToMoveBothSides = true;
        }

        // If isWhiteOnBottom has changed, recreate the board
        if (previousIsWhiteOnBottom !== gameState.isWhiteOnBottom) {
            const boardElement = document.getElementById('chessBoard');
            if (boardElement) {
                createBoardSquares(boardElement);
            }
        }

        // 2. Convert Style12 to FEN and update the board
        const fen = style12ToFen(style12Message);
        gameState.fen = fen; // Store the FEN in gameState

        if (gameState.isValidationSupported) {
            try {
                chess.load(fen); // Load new position first for diff
            } catch (e) {
                console.error("Error loading FEN:", e);
            }
        }

        // Update ECO opening info
        updateBoardBottomLabels();
        const startEnd = lastMoveToStartEndAlgebraic();
        if (startEnd && startEnd.length == 2) {
            animatePieceMoveInternal(startEnd[0], startEnd[1], () => {
                if (gameState.lastMovePretty.includes('x')) {
                    playSound('capture');
                } else { // any move
                    playSound('move');
                }
                updateBoardGraphicsInternal();
            });
        } else {
            updateBoardGraphicsInternal();
        }

        stopClockInternal(); // Stop existing timer
        startClockInternal();  // Restart with new times and turn
    } catch (e) {
        console.error("Failed to process Style12 message:", e);
        if (chess) chess.reset(); // Fallback
        updateBoardGraphicsInternal(true);
    }
}

function lastMoveToStartEndAlgebraic() {
    if (!gameState.lastMove || gameState.lastMove === 'none' || gameState.lastMove === '')
        return null;

    try {
        // Use the parseVerboseMove function from utils.js
        // Example input: K/e1-e2
        return parseVerboseMove(gameState.lastMove);
    } catch (e) {
        console.error('Error parsing move notation:', e);
        return null;
    }
}

/**
 * Handles moves for both drag and click click move.
 * @param startSquareAlgebraic The starting algebraic square, e2 for example.
 * @param endSquareAlgebraic The ending algebraic square, e4 for example.
 * @param isDragging True if dragging, false if click click move.
 */
function makeMove(startSquareAlgebraic, endSquareAlgebraic, isDragging) {
    if (isDragging && !gameState.draggedPiece) {
        return false;
    }

    // Check if we're trying to move to the same square
    if (startSquareAlgebraic === endSquareAlgebraic) {
        console.log("Trying to move to the same square, canceling move");
        if (gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-semi-transparent', 'piece-hidden');
            gameState.draggedPieceElement.classList.add('piece-visible');
        }
        return false;
    }

    // if (!gameState.validMoves.includes(endSquareAlgebraic)) {
    //     return false;
    // }

    const movingPiece = getPieceAtSquare(gameState.fen, startSquareAlgebraic);
    const targetRank = parseInt(endSquareAlgebraic.charAt(1));
    const isPromotion = movingPiece != '' &&
        (movingPiece === 'P' && targetRank === 8) ||
        (movingPiece === 'p' && targetRank === 1);
    let moveObject;
    let moveStringPart = `${startSquareAlgebraic}${endSquareAlgebraic}`;

    if (isPromotion) {
        /**
         * IMPORTANT!
         *
         * Not implemented yet but promotions will be handled by using the radio buttons if the player is
         * playing or examining. The prompt should only be used when the user is observing.
         */
        const promotionPiece = prompt('Promote pawn to: (q)ueen, (r)ook, (b)ishop, (n)knight', 'q');
        const promotion = ['q', 'r', 'b', 'n'].includes(promotionPiece) ? promotionPiece : 'q';
        moveObject = {from: startSquareAlgebraic, to: endSquareAlgebraic, promotion: promotion};
        moveStringPart += `=${promotion}`;
    } else {
        moveObject = {from: startSquareAlgebraic, to: endSquareAlgebraic};
    }

    const isPremove = gameState.isPlayerPlaying &&
        gameState.isWhitesMove !== gameState.isPlayerWhite;
    const isValidating = gameState.isValidationSupported && !isPremove &&
        (!gameState.isPlayerPlaying ||
            (gameState.isPlayerPlaying && gameState.isWhitesMove === gameState.isPlayerWhite));

    console.log("isPremove: " + isPremove + " isValidating: " + isValidating);

    let moveResult = null;

    if (!isPremove && isValidating) {
        moveResult = chess.move(moveObject);
        gameState.fen = chess.fen();
    }
    if (isPremove) {
        gameState.premove = moveStringPart;
        console.log("Making premove: " + gameState.premove);
        updateBoardBottomLabels();

        document.querySelector(`[data-algebraic="${startSquareAlgebraic}"]`).classList.add('premove-start');
        document.querySelector(`[data-algebraic="${endSquareAlgebraic}"]`).classList.add('premove-end');

        // Restore the original piece visibility if the move failed
        if (isDragging && gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-hidden', 'piece-semi-transparent');
            gameState.draggedPieceElement.classList.add('piece-visible');
        }
    } else if (!isValidating || (isValidating && moveResult)) {

        /**
         * When not examining or playing: GameRelation.ISOLATED_POSITION or
         *                                GameRelation.OBSERVING_PLAYED or
         *                                GameRelation.OBSERVING_EXAMINED or
         *                                GameRelation.STARTING_BOARD:
         * Let the user make moves on the board if not playing or examining. These changes are not permanent and will
         * be erased when style 12 events arrive. This is fine, it lets the user move pieces around just to see the position. The changes
         * made in these modes are not live and not sent to fics.
         *
         * When playing: GameRelation.PLAYING_MY_MOVE or
         *               GameRelation.PLAYING_OPPONENT_MOVE
         * (Premove not implemented yet)
         * Only let the user make moves for the color he is playing. If it is his turn this is the move that will be sent to fics.
         * If it is not his turn, this is a premove. A premove is a move that will be saved and sent to fics immediately when it is
         * the users turn. Just one premove can be saved. If the user makes a move for his color while it is not his turn, that
         * will become the new premove and replace the old one.
         *
         * When examining: GameRelation.EXAMINING (Not implemented yet.)
         * It is similar to playing, but the user can make moves for both sides. No premove is allowed while examining. The user is
         * actively playing both sides. Examine mode is for analysis of a previous game. It is live and connected to fics.
         */
        if (gameState.relation != GameRelation.ISOLATED_POSITION &&
            gameState.relation != GameRelation.OBSERVING_PLAYED &&
            gameState.relation != GameRelation.OBSERVING_EXAMINED &&
            gameState.relation != GameRelation.STARTING_BOARD) {
            /**
             * IMPORTANT!
             * Do not change the move list, play sounds, or anything that is not irreversable here.
             * FICS will send style12 events for changes. When style 12 events are received that is where
             * the change is made permanent (i.e. sound played, move list updated, etc.)
             */
            ws.send(`${moveStringPart}`);
        }

        // We'll make the original piece fully transparent but not rely solely on this
        if (isDragging && gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-visible', 'piece-semi-transparent');
            gameState.draggedPieceElement.classList.add('piece-hidden');
        }

        // Update ECO opening info
        updateBoardBottomLabels();

        // Update the lastMovePretty property so the move list can be updated
        gameState.lastMovePretty = moveResult.san;

        // Update the board graphics which will create the piece at the new location
        updateBoardGraphicsInternal(moveStringPart, null);
        restartClockInternal(null);
        return true;
    } else if (!moveResult) {
        console.error("Invalid move by drop:", moveObject);
        chess.undo();

        // Restore the original piece visibility if the move failed
        if (isDragging && gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-hidden', 'piece-semi-transparent');
            gameState.draggedPieceElement.classList.add('piece-visible');
        }
        return false;
    }
}

function animatePieceMoveInternal(algrebraicFrom, algebraicTo, callback) {
    const board = document.getElementById('chessBoard');
    const fromElement = document.querySelector(`[data-algebraic="${algrebraicFrom}"]`);
    const fromSquare = {
        file: parseInt(fromElement.getAttribute('data-file'), 10),
        rank: parseInt(fromElement.getAttribute('data-rank'), 10)
    };
    const toElement = document.querySelector(`[data-algebraic="${algebraicTo}"]`);
    const toSquare = {
        file: parseInt(toElement.getAttribute('data-file'), 10),
        rank: parseInt(toElement.getAttribute('data-rank'), 10)
    };

    const pieceElementToAnimate = fromElement.querySelector('.chess-piece');
    const pieceContent = pieceElementToAnimate.innerHTML;
    pieceElementToAnimate.innerHTML = ''; // Hide original temporarily

    const squareSize = board.clientWidth / 8;
    const animatedPiece = document.createElement('div');
    animatedPiece.classList.add('chess-piece', 'animated-piece'); // Ensure .animated-piece is styled for fixed pos
    animatedPiece.innerHTML = pieceContent;
    animatedPiece.style.zIndex = '1000';
    animatedPiece.style.pointerEvents = 'none';
    animatedPiece.style.position = 'absolute';
    animatedPiece.style.width = squareSize + 'px';
    animatedPiece.style.height = squareSize + 'px';
    animatedPiece.style.fontSize = pieceElementToAnimate.style.fontSize; // Copy font size
    animatedPiece.style.display = 'flex';
    animatedPiece.style.justifyContent = 'center';
    animatedPiece.style.alignItems = 'center';

    board.appendChild(animatedPiece); // Append to board for correct relative positioning
    animatedPiece.style.position = 'absolute'; // Crucial for animation

    // Calculate positions based on board orientation
    const startPosition = getSquareTopLeftAdjustment(fromSquare.rank, fromSquare.file, squareSize);
    const endPosition = getSquareTopLeftAdjustment(toSquare.rank, toSquare.file, squareSize);

    console.log(`Animating piece from: ${algrebraicFrom} ${JSON.stringify(startPosition)} to: ${algebraicTo} ${JSON.stringify(endPosition)}`);

    animatedPiece.style.left = startPosition.left + 'px';
    animatedPiece.style.top = startPosition.top + 'px';

    requestAnimationFrame(() => {
        animatedPiece.getBoundingClientRect(); // Force reflow

        // Use the original animation duration (0.1s)
        animatedPiece.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
        animatedPiece.style.left = endPosition.left + 'px';
        animatedPiece.style.top = endPosition.top + 'px';

        animatedPiece.addEventListener('transitionend', function onEnd(e) {
            console.log("Transition ended for property:", e.propertyName);
            if (e.propertyName === 'left' || e.propertyName === 'top') { // Wait for one of them
                console.log("Removing animated piece");
                animatedPiece.removeEventListener('transitionend', onEnd);

                // Get the destination square and restore the piece content there
                const toElement = document.getElementById(`square-${toSquare.file}-${toSquare.rank}`);
                if (toElement) {
                    const destPieceElement = toElement.querySelector('.chess-piece');
                    if (destPieceElement) {
                        destPieceElement.innerHTML = pieceContent;
                        console.log("Restored piece content at destination");
                    } else {
                        console.error("No piece element found at destination square");
                    }
                }

                // Remove the animated piece
                animatedPiece.remove();

                if (callback) {
                    console.log("Calling animation callback");
                    callback();
                }
            }
        }, {once: true}); // Ensure it only fires once per animation start
    });
}

/**
 * Used for animating piece moves.
 * @param rank The rank of the square.
 * @param file The file of the square.
 * @param squareSize The size of a square in pixels.
 * @returns {{left: number, top: number}} The top left adjustment for the square.
 **/
function getSquareTopLeftAdjustment(rank, file, squareSize) {
    //Animating piece from: d6 {"left":286.875,"top":191.25} to: f8 {"left":478.125,"top":0} (white on bottom)

    if (gameState.isWhiteOnBottom) {
        return {
            left: (file - 1) * squareSize,
            top: (8 - rank) * squareSize
        };

    } else {
        return {
            left: (8 - file) * squareSize,
            top: (rank - 1) * squareSize
        };
    }
}

function removeBoardHighlightsInternal() {
    console.log("removeBoardHighlightsInternal() called.");
    const boardElement = document.getElementById('chessBoard');
    if (!boardElement) return;

    const allSquares = boardElement.querySelectorAll('.chess-square');
    allSquares.forEach(square => {
        square.classList.remove('selected', 'valid-move', 'valid-move-hover', 'last-move-start', 'last-move-end', 'last-move-fade');
    });
}

function updateBoardHighlightsInternal() {
    console.log("removeBoardHighlightsInternal() called.");
    removeBoardHighlightsInternal();

    // Add highlights to valid moves
    gameState.validMoves.forEach(move => {
        const moveSquareDiv = document.querySelector(`[data-algebraic="${move}"]`);
        if (moveSquareDiv) {
            moveSquareDiv.classList.add('valid-move');
        }
    });

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
    if (gameState.isClockRunning) {
        return;
    }

    // Update the clock displays initially
    gameState.whiteClockDisplay = formatClockTimeInternal(gameState.whiteTimeSecs);
    gameState.blackClockDisplay = formatClockTimeInternal(gameState.blackTimeSecs);
    updateNonBoardAndMovesUI();

    // Start the clock for all active games (playing, examining, or observing)
    if (gameState.isPlayerPlaying || gameState.relation === 2 || gameState.relation === 0) {
        gameState.isClockRunning = true;
        let lastUpdateTime = Date.now();

        const updateClock = () => {
            if (!gameState.isClockRunning) {
                return;
            }

            const now = Date.now();
            const deltaTime = now - lastUpdateTime;

            if (deltaTime >= 1000) {
                if (gameState.isWhitesMove) {
                    gameState.whiteTimeSecs = Math.max(0, gameState.whiteTimeSecs - 1);
                    gameState.whiteClockDisplay = formatClockTimeInternal(gameState.whiteTimeSecs);
                } else {
                    gameState.blackTimeSecs = Math.max(0, gameState.blackTimeSecs - 1);
                    gameState.blackClockDisplay = formatClockTimeInternal(gameState.blackTimeSecs);
                }

                // Update the UI
                updateNonBoardAndMovesUI();

                if ((gameState.isWhitesMove && gameState.whiteTimeSecs <= 0) || (!gameState.isWhitesMove && gameState.blackTimeSecs <= 0)) {
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
}

function stopClockInternal() {
    if (!gameState.isClockRunning) {
        return;
    }

    gameState.isClockRunning = false;

    if (clockTimer) {
        cancelAnimationFrame(clockTimer);
        clockTimer = null;
    }

    document.querySelectorAll('.clock-active').forEach(clock => {
        clock.classList.remove('clock-active');
        clock.classList.add('clock-inactive');
    });
}


function restartClockInternal() {
    stopClockInternal();
    updateNonBoardAndMovesUI(); // Update display
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

// --- Initialization ---
export function initChessSystem(websocket, preferencesObject) {
    console.log("Initializing chess system");
    ws = websocket;
    prefs = preferencesObject;

    // Initialize ECO database
    initECO();

    // Make sure chess instance is initialized
    if (!chess) {
        console.log("Creating new chess instance in initChessSystem");
        try {
            chess = new Chess();
        } catch (e) {
            console.error("Failed to create chess instance in initChessSystem:", e);
        }
    }

    setupMainChessBoardDisplay(); // Sets up the DOM for the main board
    boardInitialized = true;

    applyChessRelatedPreferences(); // Apply initial preferences

    // Add a global mouseup event listener to ensure pieces are visible and clean up any drag operations
    document.addEventListener('mouseup', () => {
        // After a short delay, ensure all pieces are visible
        setTimeout(() => {
            const allPieces = document.querySelectorAll('.chess-piece');
            allPieces.forEach(piece => {
                piece.classList.remove('piece-hidden', 'piece-semi-transparent');
                piece.classList.add('piece-visible');
            });

            // Remove any drag clone that might still exist
            if (gameState.dragClone) {
                gameState.dragClone.remove();
                gameState.dragClone = null;
            }

            // Also reset drag state if needed
            if (gameState.draggedPiece) {
                gameState.draggedPiece = null;
                gameState.draggedPieceElement = null;
                gameState.dndStartSquareAlegbraic = null;
                gameState.validMoves = [];
                removeBoardHighlightsInternal();
            }
        }, 100);
    });
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
    if (gameState.moves.length > 0) {
        const table = document.createElement('table');
        table.classList.add('moves-table');
        const tbody = document.createElement('tbody');

        gameState.moves.forEach(move => {
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
                // Don't show 'none' for empty moves
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
                // Don't show 'none' for empty moves
                blackCell.innerHTML = '&nbsp;'; // Keep cell structure
            }
        });
        table.appendChild(tbody);
        movesListDisplayElement.appendChild(table);
    }

    // Display Footer Info (Status/Result)
    if (gameState.result) {
        const footerDiv = document.createElement('div');
        footerDiv.classList.add('moves-list-footer-info');
        footerDiv.textContent = gameState.result;
        movesListDisplayElement.appendChild(footerDiv);
        footerDiv.scrollIntoView({behavior: 'instant', block: 'nearest'});
    } else if (movesListDisplayElement.parentElement) { // Ensure parent exists for scrollHeight
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

    for (let i = 0; i < gameState.moves.length; i++) {
        const move = gameState.moves[i];

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
function updateMovesListWithNewMoveInternal() {
    if (!movesListDisplayElement || gameState.lastMovePretty === '') return;

    // Make sure the moves list container is visible
    if (movesListContainer) {
        movesListContainer.style.display = 'block';
    }

    if (gameState.moves.length === 0 && !gameState.isWhitesMove) {
        gameState.moves = [{
            number: gameState.moveNumber,
            white: {
                san: gameState.lastMovePretty
            },
            black: {
                san: null
            }
        }];

        // Update the display
        updateMovesListDisplayInternal();
        highlightLastMoveInMovelist();

        // Update ECO opening info when move list changes
        updateBoardBottomLabels();
        return;
    }

    // Get the last move in the list, or create a new one if needed
    let lastMove;
    if (gameState.moves.length > 0) {
        lastMove = gameState.moves[gameState.moves.length - 1];
    }

    if (lastMove) {
        // A move has already been made and we received the Style 12 for it so isWhitesMove will not be the side that made the move.
        if (gameState.isWhitesMove) { // Black just moved, so it's White's turn
            // If the last move in the list has a white move but no black move, add the black move
            console.log(`last move: ${JSON.stringify(lastMove)}`);
            if (lastMove.white.san && !lastMove.black || !lastMove.black.san) {
                lastMove.black = {
                    san: gameState.lastMovePretty
                };
                console.log("Added black move to existing move:", lastMove);
            } else {
                // Otherwise, create a new move with just the black move
                const newMove = {
                    number: gameState.moveNumber,
                    white: {
                        san: null
                    },
                    black: {
                        san: gameState.lastMovePretty
                    }
                };
                gameState.moves.push(newMove);
                console.log("Added new move with black move:", newMove);
            }
        } else { // White just moved, so it's Black's turn
            // If the last move in the list has no white move, add the white move
            if (!lastMove.white || !lastMove.white.san) {
                lastMove.white = {
                    san: gameState.lastMovePretty
                };
                console.log("Added white move to existing move:", lastMove);
            } else {
                // Otherwise, create a new move with just the white move
                const newMove = {
                    number: gameState.moveNumber,
                    white: {
                        san: gameState.lastMovePretty
                    },
                    black: {
                        san: null
                    }
                };
                gameState.moves.push(newMove);
                console.log("Added new move with white move:", newMove);
            }
        }
    }

    // Update the display
    updateMovesListDisplayInternal();
    highlightLastMoveInMovelist();

    // Update ECO opening info when move list changes
    updateBoardBottomLabels();
}

// Board header function removed



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
        lastMove.scrollIntoView({behavior: 'instant', block: 'nearest'});
    }
}

// Navigation functions for the moves list
function goToFirstMoveInternal() {
    if (gameState.moves.length === 0) return;

    // Reset the chess board to the starting position
    chess.reset();
    // Update ECO opening info
    updateBoardBottomLabels();
    updateBoardGraphicsInternal(null, null);

    // Highlight the first move (if any)
    if (gameState.moves[0] && gameState.moves[0].white) {
        highlightSelectedMoveInternal(gameState.moves[0].number, 'w');
    }
}

function goToLastMoveInternal() {
    if (gameState.moves.length === 0) return;

    // Find the last move
    const lastMove = gameState.moves[gameState.moves.length - 1];
    const color = lastMove.black ? 'b' : 'w';

    // Create a new chess instance and replay all moves
    const tempChess = new Chess();

    // Replay all moves
    for (const move of gameState.moves) {
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
    // Update ECO opening info
    updateBoardBottomLabels();
    updateBoardGraphicsInternal(null, null);

    // Highlight the last move
    highlightSelectedMoveInternal(lastMove.number, color);
}

function goToPreviousMoveInternal() {
    if (gameState.moves.length === 0) return;

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
    const prevMoveIndex = gameState.moves.findIndex(m => m.number === prevMoveNumber);
    if (prevMoveIndex < 0) return; // No previous move

    const prevMove = gameState.moves[prevMoveIndex];
    if (prevMoveColor === 'b' && !prevMove.black) return; // No black move for this number

    // Create a new chess instance and replay moves up to the previous move
    const tempChess = new Chess();

    // Replay moves up to the previous move
    for (let i = 0; i <= prevMoveIndex; i++) {
        const move = gameState.moves[i];
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
    // Update ECO opening info
    updateBoardBottomLabels();
    updateBoardGraphicsInternal(null, null);

    // Highlight the previous move
    highlightSelectedMoveInternal(prevMoveNumber, prevMoveColor);
}

function goToNextMoveInternal() {
    if (gameState.moves.length === 0) return;

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
    const nextMoveIndex = gameState.moves.findIndex(m => m.number === nextMoveNumber);
    if (nextMoveIndex < 0) return; // No next move

    const nextMove = gameState.moves[nextMoveIndex];
    if (nextMoveColor === 'b' && !nextMove.black) return; // No black move for this number
    if (nextMoveColor === 'w' && !nextMove.white) return; // No white move for this number

    // Create a new chess instance and replay moves up to the next move
    const tempChess = new Chess();

    // Replay moves up to the next move
    for (let i = 0; i <= nextMoveIndex; i++) {
        const move = gameState.moves[i];
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
    // Update ECO opening info
    updateBoardBottomLabels();
    updateBoardGraphicsInternal(null, null);

    // Highlight the next move
    highlightSelectedMoveInternal(nextMoveNumber, nextMoveColor);
}

// Function to initialize an empty move list with navigation buttons
function initializeEmptyMoveListInternal() {
    // Clear current game moves if we have a current game
    if (!gameState || !gameState.moves || gameState.moves.length === 0) {
        gameState.moves = [{
            number: 1,
            white: {},
            black: {}
        }];
    }

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
                    moveSpan.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                }
            }
            break;
        }
    }
}

// --- Internal Functions (not directly exported, but used by exported ones) ---
function updateECOLabelFromMoveList() {

    let moveListStr = '';
    gameState.openingDescription = '';
    let opening = '';
    if (gameState.moves && gameState.moves.length > 0) {
        for (const move of gameState.moves) {
            if (move.white && move.white.san) {
                moveListStr += `${move.number}. ${move.white.san} `;
                const candidate = lookupFromMoveList(moveListStr.trim());
                opening = candidate || opening;
            }
            if (move.black && move.black.san) {
                moveListStr += `${move.black.san} `;
                const candidate = lookupFromMoveList(moveListStr.trim());
                opening = candidate || opening;
            }
        }
        gameState.openingDescription = opening;
        const ecoOpeningLabel = document.getElementById('ecoOpeningLabel');
        ecoOpeningLabel.innerText = gameState.openingDescription;
    }
}

// Function to update the ECO opening label and last move label
function updateBoardBottomLabels() {
    // Generate a move list string from the gameState.moves array
    let moveListStr = '';
    if (gameState.moves && gameState.moves.length > 0) {
        for (const move of gameState.moves) {
            if (move.white && move.white.san) {
                moveListStr += `${move.number}. ${move.white.san} `;
            }

            if (move.black && move.black.san) {
                moveListStr += `${move.black.san} `;
            }

        }
        moveListStr = moveListStr.trim();
    }

    console.log("Looking up ECO opening for move list:", moveListStr);

    // Get the ECO opening information from the move list
    if (moveListStr) {
        const openingInfo = lookupFromMoveList(moveListStr);
        console.log("ECO lookup result:", openingInfo);

        // Only update if we got a valid result
        if (openingInfo) {
            // Update the global variable
            gameState.openingDescription = openingInfo;

            // Update the label if it exists
            const ecoOpeningLabel = document.getElementById('ecoOpeningLabel');
            if (ecoOpeningLabel) {
                ecoOpeningLabel.innerText = gameState.openingDescription || '';
            }
        }
    }

    // Update the last move label
    const lastMoveLabelElement = document.getElementById('lastMoveLabel');
    let lastMoveLabelText = '';
    if (gameState.premove) {
        const startEnd = ficsMoveToStartEndArray(gameState.premove);
        lastMoveLabelText = 'Premove: ' + convertToUnicodeChessPieces(startEndToAlgebraic(startEnd[0], startEnd[1], gameState.fen));
    } else if (gameState.lastMovePretty) {
        // Format the last move with the move number
        let formattedMove = '';
        if (gameState.isWhitesMove) {
            // Black just moved
            formattedMove = `Last move: ${gameState.moveNumber - 1}...${gameState.lastMovePretty}`;
        } else {
            // White just moved
            formattedMove = `Last move: ${gameState.moveNumber}.${gameState.lastMovePretty}`;
        }
    }
    lastMoveLabelElement.innerText = lastMoveLabelText;
}

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
        gameState.isFlipped = !gameState.isFlipped;

        // IMPORTANT!
        // Flipped is only changed when the user flips the board on the GUI by pressing this button.
        if (gameState.isPlayerPlaying) {
            // When playing as white, white should be on bottom (unless flipped)
            // When playing as black, black should be on bottom (unless flipped)
            gameState.isWhiteOnBottom = gameState.isPlayerWhite ? !gameState.isFlipped : gameState.isFlipped;
        } else {
            // For observing, white is on bottom (unless flipped)
            gameState.isWhiteOnBottom = !gameState.isFlipped;
        }

        console.log("Board flipped:", {
            isFlipped: gameState.isFlipped,
            isWhiteOnBottom: gameState.isWhiteOnBottom
        });

        // Recreate the board with the new orientation
        const boardElement = document.getElementById('chessBoard');
        if (boardElement) {
            createBoardSquares(boardElement);
        }

        updateBoardGraphicsInternal(null, null);
        updateNonBoardAndMovesUI(null);
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

    // Create game number element (left-aligned)
    const gameNumber = document.createElement('div');
    gameNumber.id = 'gameNumber';
    gameNumber.classList.add('game-number');
    gameNumber.innerText = '';

    // Create game type info element (right-aligned)
    const gameTypeInfo = document.createElement('div');
    gameTypeInfo.id = 'gameTypeInfo';
    gameTypeInfo.classList.add('game-type-info');
    gameTypeInfo.innerText = '';

    // Create a container for the board and top labels
    const boardAndLabelsContainer = document.createElement('div');
    boardAndLabelsContainer.classList.add('board-and-labels-container');

    // Create a container for the top labels
    const topLabelsContainer = document.createElement('div');
    topLabelsContainer.classList.add('top-labels-container');

    // Add game number to the top left and game type info to the top right
    topLabelsContainer.appendChild(gameNumber);
    topLabelsContainer.appendChild(gameTypeInfo);

    // Add the top labels container and chess board to the main container
    boardAndLabelsContainer.appendChild(topLabelsContainer);
    boardAndLabelsContainer.appendChild(board);
    boardOnlyContainer.appendChild(boardAndLabelsContainer);

    // Create a container for the bottom labels
    const bottomLabelsContainer = document.createElement('div');
    bottomLabelsContainer.classList.add('bottom-labels-container');
    bottomLabelsContainer.style.display = 'flex';
    bottomLabelsContainer.style.width = '100%';
    bottomLabelsContainer.style.justifyContent = 'space-between';

    // Add last move label (left side)
    const lastMoveLabel = document.createElement('div');
    lastMoveLabel.id = 'lastMoveLabel';
    lastMoveLabel.classList.add('last-move-label');
    lastMoveLabel.innerText = gameState.lastMovePretty || '';
    bottomLabelsContainer.appendChild(lastMoveLabel);

    // Add ECO opening label (right side)
    const ecoOpeningLabel = document.createElement('div');
    ecoOpeningLabel.id = 'ecoOpeningLabel';
    ecoOpeningLabel.classList.add('eco-opening-label');
    ecoOpeningLabel.innerText = gameState.openingDescription || '';
    bottomLabelsContainer.appendChild(ecoOpeningLabel);

    // Add the bottom labels container to the board container
    boardOnlyContainer.appendChild(bottomLabelsContainer);

    const playerDivider = document.createElement('div');
    playerDivider.classList.add('player-divider');
    const topPlayerNameContainer = document.createElement('div');
    topPlayerNameContainer.classList.add('top-name-container');
    const bottomPlayerNameContainer = document.createElement('div');
    bottomPlayerNameContainer.classList.add('bottom-name-container');
    topPlayerNameContainer.appendChild(topPlayerNameWrapper);
    topPlayerNameContainer.appendChild(boardMenuButton);
    bottomPlayerNameContainer.appendChild(bottomPlayerNameWrapper);

    // Board menu and player divider setup
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
    createBoardSquares(board);

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
        updateMovesListDisplayInternal();
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

    gameState.whiteClockDisplay = formatClockTimeInternal(gameState.whiteTimeSecs);
    gameState.blackClockDisplay = formatClockTimeInternal(gameState.blackTimeSecs);

    console.log("Resetting chess board in setupMainChessBoardDisplay");
    try {
        if (!chess) {
            console.error("Chess instance is null in setupMainChessBoardDisplay");
            chess = new Chess();
            console.log("Created new chess instance");
        }
        chess.reset();
        console.log("Chess board reset to initial position:", chess.fen());
    } catch (e) {
        console.error("Error resetting chess board:", e);
    }

    // Reset ECO opening info and last move label
    if (ecoOpeningLabel) {
        ecoOpeningLabel.innerText = '';
        gameState.openingDescription = '';
    }

    // Reset last move label
    const lastMoveLabelElement = document.getElementById('lastMoveLabel');
    if (lastMoveLabelElement) {
        lastMoveLabelElement.innerText = '';
    }
    updateBoardGraphicsInternal(); // Initial draw
}
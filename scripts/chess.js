// C:/Users/carso/IdeaProjects/Simple-FICS-Interface/chess.js

// Import ECO lookup functions
import {initECO, lookupFromMoveList} from './eco.js';
import {
    convertToUnicodeChessPieces,
    ficsMoveToStartEndArray,
    fileNumberToAlgebraic,
    getPieceAtSquare,
    parseVerboseMove,
    startEndToAlgebraic,
    style12ToFen,
    toAlgebraicSquare,
    toRankFile
} from './utils.js';
import {playSound} from './index.js';
import {getFollowedPlayer, getObservedPlayer} from "./fics.js"
import {ChessBoard, Variant} from "./ChessBoard.js";
// StockfishEngine is loaded globally from stockfishEngine.js


// GameRelation Enum
const GameRelation = {
    ISOLATED_POSITION: -3,
    OBSERVING_EXAMINED: -2,
    EXAMINING: 2,
    PLAYING_OPPONENT_MOVE: -1,
    PLAYING_MY_MOVE: 1,
    OBSERVING_PLAYED: 0,
    FREESTYLE: -10,
};

// GameRelation Enum
const Perspective = {
    FREESTYLE: 1,
    PLAYING: 2,
    FINISHED_PLAYING: 3,
    OBSERVING: 4,
    FINISHED_OBSERVING: 5,
    EXAMINING: 6,
    FINISHED_EXAMINING: 7,
    ANALYSIS: 8
};

let ws; // WebSocket instance, to be set by an initializer
let prefs; // Preferences object, to be set by an initializer

// Chess State
let boardInitialized = false; // Tracks if the main board display structure is up
let previousPosition = null; // For animation
let clockTimer = null;
let movesListDisplayElement; // DOM element for displaying the moves list
let movesListContainer; // Container for the moves list

/**
 * TODO: this should be stored in a map by game number so multiple games can be handled correctly with variant, etc.
 */
let gameState = { // Reset header
    gameNumber: 0,
    whitePlayer: {name: 'White', rating: ''},
    blackPlayer: {name: 'Black', rating: ''},
    variant: Variant.FREESTYLE,
    chessBoard: new ChessBoard(Variant.FREESTYLE),
    type: 'freestyle',
    isRated: false,
    moveNumber: 1,
    lastMove: '',
    lastMovePretty: '',
    relation: GameRelation.FREESTYLE,
    perspective: Perspective.FREESTYLE,
    lastPerspective: null,
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
    isWhitesMove: true,
    isActive: false,
    isPlayerWhite: true,
    isPlayerPlaying: false,
    isFlipped: false,
    allowUserToMoveBothSides: true,
    validMoves: [],
    openingDescription: '',
    isClockRunning: false,
    requestedMovesForGame: false,
    draggedPiece: null,
    draggedPieceElement: null,
    dndStartSquareAlegbraic: null,
    dndLastDropTime: null,
    clickclickStartSquareAlegbraic: null,
    clickclickLastDropTime: null,
    premove: null, // null if not set.
    fen: new ChessBoard(Variant.FREESTYLE).getFen(),
    status: '',
    result: '',
    drawOfferPending: false,
    // Analysis state
    analysis: {
        engine: null,
        isActive: false,
        bestMove: '',
        evaluation: 0,
        mateInMoves: null,
        principalVariation: [],
        isEngineReady: false
    }
};

/**
 * Handles FICS style12 messages.
 * @param msg The style 12 message.
 */
export function onStyle12(msg) {
    console.log("Processing Style12 message:", msg);

    // First premove if its set.
    if (gameState.premove) {
        console.log("Sending premove: " + gameState.premove);
        ws.send(gameState.premove);
        gameState.premove = null;
    }

    handleAutoDraw(); //Send draw if pressed.

    updateBoardFromStyle12(msg);
    updateMoveListWithLastMove();
    updatePlayerInfoAndClockUI();

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

/**
 * Invoked when a new fics game is being observed or played.
 * @param gameNum The game number.
 * @param whiteName The white player's name.
 * @param whiteRating The white player's rating.
 * @param blackName The black player's name.
 * @param blackRating  The black player's rating.
 * @param isRated True if the game is rated.
 * @param gameType The game type.
 * @param minutes The time limit in minutes.
 * @param increment The increment in seconds.
 */
export function onGameStart(gameNum, whiteName, whiteRating, blackName, blackRating, isRated, ficsGameType, minutes, increment) {
    console.log("New game:", {
        gameNum,
        whiteName,
        whiteRating,
        blackName,
        blackRating,
        isRated,
        ficsGameType,
        minutes,
        increment
    });
    gameState.gameNumber = gameNum;
    gameState.whitePlayer = {name: whiteName, rating: whiteRating};
    gameState.blackPlayer = {name: blackName, rating: blackRating};
    gameState.type = ficsGameType;
    gameState.variant = ficsGameTypeToVariant(gameState.type);
    gameState.isRated = isRated;
    gameState.minutes = minutes;
    gameState.increment = increment;
    // This will be followed by a style12 msg later on with the real castling state, etc.
    // For now, reset everything.
    gameState.moveNumber = 1;
    gameState.lastMove = '';
    gameState.lastMovePretty = '';
    gameState.doublePawnPushFile = -1;
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
    gameState.chessBoard = null;
    gameState.fen = null;
    gameState.validMoves = [];
    gameState.style12WhiteOnBottom = true;
    gameState.drawOfferPending = false;

    // Set isWhiteOnBottom to true by default for new games
    // This will be updated correctly when the first Style12 message arrives
    gameState.isWhiteOnBottom = true;

    // Update UI elements based on perspective for new game
    updateUIForPerspective();
}

function ficsGameTypeToVariant(gameType) {
    const result =
        gameType.startsWith('wild/fr') ? Variant.CHESS960 :
            gameType.startsWith('wild/') ? Variant.CLASSIC :
                gameType === 'lightning' ? Variant.CLASSIC :
                    gameType === 'standard' ? Variant.CLASSIC :
                        gameType === 'blitz' ? Variant.CLASSIC :
                            gameType === "losers" ? Variant.LOSERS :
                                gameType === "suicide" ? Variant.SUICIDE :
                                    gameType === "atomic" ? Variant.ATOMIC :
                                        gameType === "crazyhouse" ? Variant.CRAZYHOUSE :
                                            gameType === "bughouse" ? Variant.CRAZYHOUSE : // Not supported yet.
                                                gameType === "freestyle" ? Variant.FREESTYLE :
                                                    Variant.CLASSIC;
    console.log(`ficsGameTypeToVariant(${gameType}=${result}`);
    return result;
}

/**
 * Handles FICS unobserve messages.
 * @param gameNumber The game number.
 */
export function onUnobserve(gameNumber) {
    if (gameState.gameNumber === gameNumber) {
        stopClock();
        playSound('end');
        //obsPlayer cleared in fics.js
    }
}

/**
 * Handles FICS moves messages.
 * @param rawMovesText The raw moves text.
 */
export function onGameMoves(rawMovesText) {
    if (!boardInitialized && !document.getElementById('chessBoard')) {
        console.warn("Chess board/UI not initialized when processing moves list. Attempting setup.");
        setupMainChessBoardDisplay(); // Ensure UI is ready
    }
    // Update player info UI to show ratings if the game number matches
    onMoveList(rawMovesText);
    refreshMoveListDisplay();
    highlightLastMoveInMovelist();
    updatePlayerInfoAndClockUI();
}

/**
 * Process game end messages like "12 (genieman vs. Pawnlightly) genieman resigns} 0-1"
 * @param message The game end message.
 * @returns {boolean} True if the message was processed, false otherwise.
 */
export function onGameEnd(message) {
    if (!message || !message.trim()) return false;

    // Regular expression to match game end messages
    // This regex is very flexible to handle all types of player names and game end reasons
    const gameEndRegex = /^(\d+) \(([^)]+) vs\. ([^)]+)\) (.*)}\s*([012\/-]+).*/;
    const match = message.match(gameEndRegex);

    if (!match || match.length !== 6) {
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

        if (gameState.perspective === Perspective.OBSERVING) {
            gameState.perspective = Perspective.FINISHED_OBSERVING;
        } else if (gameState.perspective === Perspective.EXAMINING) {
            gameState.perspective = Perspective.FINISHED_EXAMINING;
        } else if (gameState.perspective === Perspective.PLAYING) {
            gameState.perspective = Perspective.FINISHED_PLAYING;
        }
        gameState.relation = GameRelation.FREESTYLE

        // Update the moves list display to show the game result
        refreshMoveListDisplay();

        // Stop the clock if it's running
        stopClock();

        gameState.isPlayerPlaying = false;

        // Update UI elements based on perspective
        updateUIForPerspective();

        return true;
    }

    return false;
}

/**
 * Updates gameState from a FICS Style12 message. Does not update the UI.
 * @param style12Message The FICS style 12 message.
 */
function updateBoardFromStyle12(style12Message) {
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
    gameState.lastMovePretty = parts[29] === 'none' ? '' : parts[29];
    gameState.fen = style12ToFen(style12Message); // Store the FEN in gameState. The FEN is used to update the board.

    if (gameState.chessBoard == null) {
        gameState.chessBoard = new ChessBoard(gameState.variant, gameState.fen);
    } else {
        if (!gameState.chessBoard.makeMoveFromSan(gameState.lastMovePretty)) {
            console.error(`Failed to make move from SAN: ${gameState.lastMovePretty} FEN: ${gameState.fen}`);
            gameState.chessBoard.loadFen(gameState.fen); //Reload with style12 FEN.
        }
        if (gameState.fen !== gameState.chessBoard.getFen()) {
            console.error(`style 12 mismatch with chessBoard fen.\nStyle12=   ${gameState.fen}\t chessBoard=${gameState.chessBoard.getFen()}`);
        }
    }

    try {
        // Update game state information from Style12 parts
        gameState.gameNumber = gameNumber;
        gameState.whitePlayer.name = parts[17];
        gameState.blackPlayer.name = parts[18];
        gameState.moveNumber = parseInt(parts[26], 10);
        gameState.lastMove = parts[27] === 'none' ? '' : parts[27];
        gameState.minutes = parseInt(parts[20], 10);
        gameState.increment = parseInt(parts[21], 10);
        gameState.whiteTimeSecs = parseFloat(parts[24]);
        gameState.blackTimeSecs = parseFloat(parts[25]);
        gameState.isActive = true;
        gameState.openingDescription = '';
        gameState.style12WhiteOnBottom = parseInt(parts[30], 10) === 0;
        gameState.relation = parseInt(parts[19], 10);  // Store the numeric relation value directly
        gameState.perspective = gameState.relation === GameRelation.PLAYING_MY_MOVE ? Perspective.PLAYING :
            gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE ? Perspective.PLAYING :
                gameState.relation === GameRelation.OBSERVING_PLAYED ? Perspective.OBSERVING :
                    gameState.relation === GameRelation.OBSERVING_EXAMINED ? Perspective.OBSERVING :
                        gameState.relation === GameRelation.EXAMINING ? Perspective.EXAMINING :
                            Perspective.EXAMINING;

        // Update UI elements based on perspective change
        updateUIForPerspective();

        // TODO: Refactored these vars one day to grab from FEN to make the code more reusable.
        gameState.whiteCastleShort = parseInt(parts[11], 10) === 1;
        gameState.whiteCastleLong = parseInt(parts[12], 10) === 1;
        gameState.blackCastleShort = parseInt(parts[13], 10) === 1;
        gameState.blackCastleLong = parseInt(parts[14], 10) === 1;
        gameState.doublePawnPushFile = style12DoublePawnPushToFile(parseInt(parts[10], 10));
        gameState.irreversibleCount = parseInt(parts[15], 10);
        gameState.isWhitesMove = parts[9] === 'W';

        const previousIsWhiteOnBottom = gameState.isWhiteOnBottom; // Store the previous value of isWhiteOnBottom to detect changes
        setPlayerOrientationGameState();

        if (previousIsWhiteOnBottom !== gameState.isWhiteOnBottom) { // If isWhiteOnBottom has changed, recreate the board. The squares change.
            const boardElement = document.getElementById('chessBoard');
            if (boardElement) {
                createBoardSquares(boardElement);
            }
        }


        // Update ECO opening info
        updateBoardBottomLabels();
        const startEnd = lastMoveToStartEndAlgebraic();
        if (startEnd && startEnd.length === 2 && (gameState.perspective === Perspective.PLAYING && gameState.isWhitesMove === gameState.isPlayerWhite)) {
            animatePieceMoveInternal(startEnd[0], startEnd[1], () => {
                if (gameState.lastMovePretty.includes('x')) {
                    playSound('capture');
                } else { // any move
                    playSound('move');
                }
                updateBoardGraphicsAndSquareListeners();
            });
        } else {
            if (gameState.lastMovePretty.includes('x')) {
                playSound('capture');
            } else { // any move
                playSound('move');
            }
            updateBoardGraphicsAndSquareListeners();
        }

        stopClock(); // Stop existing timer
        startClock();  // Restart with new times and turn
    } catch (e) {
        console.error("Failed to process Style12 message:", e);
        updateBoardGraphicsAndSquareListeners(true);
    }
}

/**
 * Creates the chess board squares.
 * @param boardElement The board element to create squares on.
 */
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
    squareDiv.classList.add((file + rank) % 2 === 0 ? 'dark-square' : 'light-square');
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
    } else if (file === 8 && gameState.isWhiteOnBottom) {
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
            removeAllBoardSquareIndicationStyles();
            let treatAsStartMove;
            if (!gameState.clickclickStartSquareAlegbraic) {
                // Since DND and click handlers are being used simultaneously, this can occur.
                // The use can also click on the start square twice which should not unset it.
                treatAsStartMove = true;
            } else { // This is the end square.
                treatAsStartMove = !makeMove(gameState.clickclickStartSquareAlegbraic, squareDiv.dataset.algebraic, false);
                gameState.clickclickLastDropTime = Date.now();
                removeAllBoardSquareIndicationStyles();
            }

            if (treatAsStartMove) {
                gameState.clickclickStartSquareAlegbraic = squareDiv.dataset.algebraic;
                const verboseMoves = gameState.chessBoard.getLegalMoves(gameState.clickclickStartSquareAlegbraic);
                gameState.validMoves = verboseMoves.map(move => move.to);
                refreshValidMoveStyleOnSquares();
            }
        }
    });
}

/**
 * Handles the mousedown event on chess pieces to initiate drag and drop
 * @param {MouseEvent} e - The mousedown event
 * @param {HTMLElement} pieceElement - The piece element being dragged
 * @param {string} piece - The piece character (e.g., 'K', 'q')
 * @param {string} squareAlg - The algebraic notation of the square (e.g., 'e4')
 */
function handlePieceMouseDown(e, pieceElement, piece, squareAlg) {
    // Prevent the default browser drag behavior
    e.preventDefault();

    // Store the piece and square information
    gameState.draggedPiece = piece;
    gameState.draggedPieceElement = pieceElement;
    gameState.dndStartSquareAlegbraic = squareAlg;

    // Get valid moves for this piece
    const verboseMoves = gameState.chessBoard.getLegalMoves(squareAlg);
    gameState.validMoves = verboseMoves.map(move => move.to);

    // Update board highlights to show valid moves
    refreshValidMoveStyleOnSquares();

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
    document.addEventListener('mousemove', handlePieceMouseMove);
    document.addEventListener('mouseup', handlePieceMouseUp);
}

/**
 * Handles the mousemove event during piece dragging
 * @param {MouseEvent} e - The mousemove event
 */
function handlePieceMouseMove(e) {
    if (!gameState.dragClone) return;

    removeAllBoardSquareIndicationStyles();

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
}

/**
 * Handles the mouseup event to complete piece dragging
 * @param {MouseEvent} e - The mouseup event
 */
function handlePieceMouseUp(e) {
    // Store reference to the dragged piece element before clearing state
    const draggedPieceElement = gameState.draggedPieceElement;

    // Remove the event listeners
    document.removeEventListener('mousemove', handlePieceMouseMove);
    document.removeEventListener('mouseup', handlePieceMouseUp);

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

    // Store move information before clearing drag state
    const startSquare = gameState.dndStartSquareAlegbraic;
    const endSquare = squareUnder ? squareUnder.dataset.algebraic : null;

    // Process the drop if it's a valid move and not the same square
    if (squareUnder && endSquare !== startSquare) {
        console.log("Valid move to:", endSquare, "from:", startSquare);
        makeMove(startSquare, endSquare, true);
        gameState.dndLastDropTime = Date.now();
    } else {
        // Check if we're trying to drop on the same square we picked up from
        if (squareUnder && endSquare === startSquare) {
            console.log("Dropped on same square, canceling move");
        } else {
            console.log("Invalid move or no square found");
        }

        // For invalid moves, ensure the board is updated to restore proper state
        // Use a small timeout to ensure the drag state is fully cleared
        setTimeout(() => {
            updateBoardGraphicsAndSquareListeners(false);
        }, 10);
    }

    // Reset the drag state AFTER processing the move
    gameState.draggedPiece = null;
    gameState.draggedPieceElement = null;
    gameState.dndStartSquareAlegbraic = null;
    gameState.clickclickStartSquareAlegbraic = null;

    // Immediately restore the dragged piece visibility to prevent blurry artifacts
    if (draggedPieceElement) {
        draggedPieceElement.classList.remove('piece-semi-transparent', 'piece-hidden');
        draggedPieceElement.classList.add('piece-visible');
    }

    // Clean up any remaining drag artifacts
    removeAllBoardSquareIndicationStyles();
}

/**
 * Updates the board graphics and square listeners.
 * @param {boolean} updateNonBoardUI - If true, updates the non-board UI elements like clocks and move list.
 */
function updateBoardGraphicsAndSquareListeners(updateNonBoardUI = false) {
    const board = document.getElementById('chessBoard');
    if (!board || !prefs) {
        return;
    }

    // Check if we're currently in the middle of a drag operation
    const isDragInProgress = gameState.draggedPiece && gameState.draggedPieceElement && gameState.dragClone;

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

            if (piece !== '') {
                pieceImage = `<img src="pieces/${prefs.pieceSet}/${pieceColor}${pieceType}.svg" alt="${pieceColor}${pieceType}">`;
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

            // Store the current visibility state if this piece is being dragged
            const isCurrentlyBeingDragged = isDragInProgress &&
                gameState.draggedPieceElement === pieceElement;
            const currentVisibilityClasses = isCurrentlyBeingDragged ?
                Array.from(pieceElement.classList).filter(cls =>
                    cls.includes('piece-visible') || cls.includes('piece-semi-transparent') || cls.includes('piece-hidden')
                ) : [];

            // Only update piece content if it has actually changed
            const needsContentUpdate = pieceElement.innerHTML !== pieceImage;
            const needsFontUpdate = pieceElement.style.fontSize !== pieceFontSize;

            if (needsContentUpdate) {
                console.log("Updating piece content for square:", squareAlg);
                // Remove old event listeners only when we're updating content
                if (pieceElement._mouseDownHandler) {
                    pieceElement.removeEventListener('mousedown', pieceElement._mouseDownHandler);
                    delete pieceElement._mouseDownHandler;
                }
                pieceElement.innerHTML = pieceImage;
            }

            if (needsFontUpdate) {
                console.log("Updating fontSize for square:", squareAlg);
                pieceElement.style.fontSize = pieceFontSize;
            }

            // Restore visibility state for dragged piece
            if (isCurrentlyBeingDragged && currentVisibilityClasses.length > 0) {
                // Remove all visibility classes first
                pieceElement.classList.remove('piece-visible', 'piece-semi-transparent', 'piece-hidden');
                // Restore the original classes
                currentVisibilityClasses.forEach(cls => pieceElement.classList.add(cls));
            }

            if (piece !== '') {
                const shouldBeDraggable = gameState.allowUserToMoveBothSides ||
                    (!gameState.allowUserToMoveBothSides &&
                        ((gameState.isPlayerWhite && pieceColor === 'w') ||
                            (!gameState.isPlayerWhite && pieceColor === 'b')))

                if (shouldBeDraggable) {
                    // Only add event listener if it doesn't already exist
                    if (!pieceElement._mouseDownHandler) {
                        // Create and store the event handler function
                        const mouseDownHandler = (e) => {
                            handlePieceMouseDown(e, pieceElement, piece, squareAlg);
                        };

                        // Store the handler reference on the element for later removal
                        pieceElement._mouseDownHandler = mouseDownHandler;

                        // Add the event listener
                        pieceElement.addEventListener('mousedown', mouseDownHandler);
                    }
                } else {
                    // Remove event listener if piece should not be draggable
                    if (pieceElement._mouseDownHandler) {
                        pieceElement.removeEventListener('mousedown', pieceElement._mouseDownHandler);
                        delete pieceElement._mouseDownHandler;
                    }
                }
            }
        }
    }
    removeAllBoardSquareIndicationStyles();

    if (gameState.relation === GameRelation.OBSERVING_EXAMINED ||
        gameState.relation === GameRelation.OBSERVING_PLAYED ||
        gameState.relation === GameRelation.EXAMINING ||
        gameState.relation === GameRelation.PLAYING_MY_MOVE) {
        const lastMoveStartEnd = lastMoveToStartEndAlgebraic();
        if (lastMoveStartEnd) {
            const startSquare = lastMoveStartEnd[0];
            const endSquare = lastMoveStartEnd[1];
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

    // Only clean up piece visibility if we're not in the middle of a drag operation
    if (!isDragInProgress) {
        const allPieces = document.querySelectorAll('.chess-piece');
        allPieces.forEach(piece => {
            // Remove any opacity classes and add the visible class
            piece.classList.remove('piece-hidden', 'piece-semi-transparent');
            piece.classList.add('piece-visible');
        });
    }

    const statusDiv = document.getElementById('gameStatus'); // Assuming gameStatus div exists
    if (statusDiv) {
        if (gameState.chessBoard.isGameOver()) {
            statusDiv.innerText = 'Game Over';
            if (gameState.chessBoard.isCheckmate()) statusDiv.innerText += ': Checkmate';
            else if (gameState.chessBoard.isInsufficientMaterial() || gameState.chessBoard.isStalemate()) statusDiv.innerText += ': Draw';
            stopClock();
        } else {
            statusDiv.innerText = gameState.chessBoard.getActiveColor() === 'w' ? 'White to move' : 'Black to move';
        }
    }
    if (updateNonBoardUI) { // Allow null to be passed if only redrawing
        updatePlayerInfoAndClockUI();
    }
}

/**
 * Handles draw offer/accept actions with toggle state
 */
function onDraw() {
    console.log('Draw action initiated');

    if (!gameState.isPlayerPlaying) {
        console.warn('Cannot offer draw - not currently playing');
        return;
    }

    const drawButton = document.querySelector('[data-action="draw"]');
    if (!drawButton) {
        console.warn('Draw button not found');
        return;
    }

    // Toggle the draw offer state
    const isCurrentlyPressed = drawButton.classList.contains('pressed');

    if (isCurrentlyPressed) {
        // Withdraw draw offer
        drawButton.classList.remove('pressed');
        drawButton.textContent = 'Draw';
        gameState.drawOfferPending = false;
        ws.send('draw');

    } else {
        // Offer draw
        drawButton.classList.add('pressed');
        drawButton.textContent = 'Auto Draw Active';
    }
}

function handleAutoDraw() {
    const drawButton = document.querySelector('[data-action="draw"]');
    if (!drawButton) {
        return;
    }

    // Toggle the draw offer state
    const isCurrentlyPressed = drawButton.classList.contains('pressed');
    if (isCurrentlyPressed) {
        ws.send('draw');
    }
}

/**
 * Handles resignation actions
 */
function onResign() {
    if (!gameState.isPlayerPlaying) {
        console.warn('Cannot resign - not currently playing');
        return;
    }
    // Confirm resignation with user
    if (confirm('Are you sure you want to resign this game?')) {
        ws.send('resign');
    }
}

/**
 * Handles rematch requests
 */
function onRematch() {
    ws.send('rematch');
}



/**
 * Handles analysis mode activation
 */
async function onAnalysis() {
    // Store current perspective before switching to analysis
    if (gameState.perspective !== Perspective.ANALYSIS) {
        gameState.lastPerspective = gameState.perspective;
    }

    // Switch to Analysis perspective
    gameState.perspective = Perspective.ANALYSIS;

    // Initialize Stockfish engine if not already done
    if (!gameState.analysis.engine) {
        gameState.analysis.engine = new window.StockfishEngine();

        try {
            const success = await gameState.analysis.engine.initialize();
            if (success) {
                gameState.analysis.isEngineReady = true;
            } else {
                console.error('Failed to initialize Stockfish engine');
                alert('Failed to initialize chess analysis engine. Please check your internet connection.');
                return;
            }
        } catch (error) {
            console.error('Error initializing Stockfish:', error);
            alert('Error initializing chess analysis engine: ' + error.message);
            return;
        }
    }

    // Activate analysis
    gameState.analysis.isActive = true;

    // Update UI for Analysis perspective
    updateUIForPerspective();

    // Start analyzing current position
    if (gameState.fen && gameState.analysis.isEngineReady) {
        startPositionAnalysis();
    }
}

/**
 * Start analyzing the current chess position
 */
function startPositionAnalysis() {
    if (!gameState.analysis.engine || !gameState.analysis.isEngineReady || !gameState.fen) {
        return;
    }

    // Set up analysis callback for our new engine
    gameState.analysis.engine.setAnalysisCallback((data) => {
        if (data.type === 'info') {
            // Parse UCI info line
            parseUCIInfo(data.line);
        } else if (data.type === 'bestmove') {
            // Update best move
            gameState.analysis.bestMove = data.move;
            updateAnalysisDisplay();
        }
    });

    // Start analysis
    gameState.analysis.engine.analyzePosition(gameState.fen);
}

/**
 * Parse UCI info line and update analysis state
 */
function parseUCIInfo(infoLine) {
    // Example: info depth 12 score cp 25 pv e2e4 e7e5 g1f3
    const parts = infoLine.split(' ');

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === 'depth') {
            gameState.analysis.depth = parseInt(parts[i + 1]);
        } else if (parts[i] === 'score') {
            if (parts[i + 1] === 'cp') {
                // Centipawn score
                if (gameState.isWhitesMove && gameState.isWhiteOnBottom) {
                    console.log('no change to eval')
                    gameState.analysis.evaluation = parseInt(parts[i + 2]) / 100;
                } else {
                    console.log('-1* eval')
                    gameState.analysis.evaluation = -parseInt(parts[i + 2]) / 100;
                }
                gameState.analysis.mateInMoves = null;
            } else if (parts[i + 1] === 'mate') {
                // Mate in X moves
                gameState.analysis.mateInMoves = parseInt(parts[i + 2]);
                if (gameState.isWhitesMove && gameState.isWhiteOnBottom) {
                    gameState.analysis.evaluation = gameState.analysis.mateInMoves > 0 ? 999 : -999;
                } else {
                    gameState.analysis.evaluation = gameState.analysis.mateInMoves > 0 ? -999 : 999;
                }
            }
        } else if (parts[i] === 'pv') {
            // Principal variation - rest of the line
            gameState.analysis.principalVariation = parts.slice(i + 1);
            break;
        }
    }

    // Update UI with new analysis data
    updateAnalysisDisplay();
}

/**
 * Update the analysis display with current engine results
 */
function updateAnalysisDisplay() {
    const analysisContainer = document.getElementById('analysisContainer');

    if (!analysisContainer || gameState.perspective !== Perspective.ANALYSIS) {
        return;
    }

    // Update principal variation display
    const pvElement = document.getElementById('analysisPrincipalVariation');
    if (pvElement && gameState.analysis.principalVariation && gameState.analysis.principalVariation.length > 0) {
        let evalText = '';
        if (gameState.analysis.mateInMoves !== null) {
            const mateSign = gameState.analysis.mateInMoves > 0 ? '+' : '';
            evalText = `${mateSign}M${Math.abs(gameState.analysis.mateInMoves)}`;
        } else {
            const evalSign = gameState.analysis.evaluation >= 0 ? '+' : '';
            evalText = `${evalSign}${gameState.analysis.evaluation.toFixed(2)}`;
        }

        // Convert principal variation moves to short algebraic notation
        const shortMoves = convertPVToSAN(gameState.analysis.principalVariation, gameState.chessBoard.getFen());

        // Show full principal variation with line wrapping
        const pvText = evalText + ' ' + shortMoves.join(' ');
        pvElement.textContent = pvText;
        pvElement.title = `Principal Variation: ${pvText}`; // Full line in tooltip
    }

    // Update strength bars
    updateStrengthBars();
}

/**
 * Convert UCI move to Short Algebraic Notation (SAN)
 * @param {string} uciMove - UCI move like "e2e4" or "e7e8q"
 * @param {string} fen - Current position FEN
 * @returns {string} - SAN move like "e4" or "exd5"
 */
function convertUCIToSAN(uciMove, fen) {
    try {
        // Create a temporary board to make the move and get SAN
        const tempBoard = new ChessBoard('chess');
        tempBoard.loadFen(fen);

        // Parse UCI move
        const from = uciMove.substring(0, 2);
        const to = uciMove.substring(2, 4);
        const promotion = uciMove.length > 4 ? uciMove.substring(4) : null;

        // Get all legal moves and find the matching one
        const legalMoves = tempBoard.getLegalMoves();
        for (const move of legalMoves) {
            if (move.from === from && move.to === to) {
                // Check promotion match if applicable
                if (promotion && move.promotion !== promotion) {
                    continue;
                }
                if (!promotion && move.promotion) {
                    continue;
                }
                return move.san;
            }
        }


    } catch (e) {
        console.log('Could not convert UCI to SAN:', uciMove, e);
    }

    // Fallback: return the original UCI move
    return uciMove;
}

/**
 * Convert Principal Variation (array of UCI moves) to SAN notation
 * @param {string[]} pvMoves - Array of UCI moves
 * @param {string} startFen - Starting position FEN
 * @returns {string[]} - Array of SAN moves
 */
function convertPVToSAN(pvMoves, startFen) {
    const sanMoves = [];

    try {
        // Create a temporary board to play through the variation
        const tempBoard = new ChessBoard('chess');
        tempBoard.loadFen(startFen);

        for (let i = 0; i < pvMoves.length; i++) {
            const uciMove = pvMoves[i];

            // Parse UCI move
            const from = uciMove.substring(0, 2);
            const to = uciMove.substring(2, 4);
            const promotion = uciMove.length > 4 ? uciMove.substring(4) : null;

            // Get all legal moves and find the matching one
            const legalMoves = tempBoard.getLegalMoves();
            let moveFound = false;

            for (const move of legalMoves) {
                if (move.from === from && move.to === to) {
                    // Check promotion match if applicable
                    if (promotion && move.promotion !== promotion) {
                        continue;
                    }
                    if (!promotion && move.promotion) {
                        continue;
                    }

                    // Found the move, add its SAN and make it on the board
                    sanMoves.push(move.san);
                    tempBoard.makeMove(move.san);
                    moveFound = true;
                    break;
                }
            }

            if (!moveFound) {
                // If conversion fails, use UCI move and stop processing

                sanMoves.push(uciMove);
                break;
            }
        }
    } catch (e) {
        console.log('Could not convert PV to SAN:', pvMoves, e);
        // Fallback: return original UCI moves
        return pvMoves;
    }

    return sanMoves;
}

/**
 * Update the visual strength bars based on current evaluation
 */
function updateStrengthBars() {
    const strengthContainer = document.getElementById('boardSideStrengthBars');

    if (!strengthContainer) {
        createBoardSideStrengthBars();
        return;
    }

    let evaluation = 0; // Default to equal
    let evaluationText = '0.00';

    if (gameState.analysis.mateInMoves !== null) {
        // Mate situation - set to extreme values
        evaluation = gameState.analysis.mateInMoves > 0 ? 10 : -10;
        evaluationText = gameState.analysis.mateInMoves > 0 ? `M${gameState.analysis.mateInMoves}` : `M${Math.abs(gameState.analysis.mateInMoves)}`;
    } else {
        evaluation = gameState.analysis.evaluation || 0;
        evaluationText = evaluation >= 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2);
    }

    // Update evaluation label
    const evaluationLabel = document.getElementById('strengthEvaluationLabel');
    if (evaluationLabel) {
        evaluationLabel.textContent = evaluationText;
    }

    // Get the bar container (not the main container)
    const barContainer = strengthContainer.querySelector('.board-strength-bar-container');
    if (!barContainer) {
        return;
    }

    if (evaluation > 0) {
        // Positive evaluation: Green bar growing upward from middle
        const greenBarHeight = Math.min(50, Math.abs(evaluation) * 10); // Max 50% height

        barContainer.innerHTML = `
            <div style="height: ${50 - greenBarHeight}%; background: transparent;"></div>
            <div style="height: ${greenBarHeight}%; background: #2E7D32; transition: height 0.3s ease;"></div>
            <div style="height: 50%; background: transparent;"></div>
        `;
    } else if (evaluation < 0) {
        // Negative evaluation: Red bar growing downward from middle
        const redBarHeight = Math.min(50, Math.abs(evaluation) * 10); // Max 50% height

        barContainer.innerHTML = `
            <div style="height: 50%; background: transparent;"></div>
            <div style="height: ${redBarHeight}%; background: #C62828; transition: height 0.3s ease;"></div>
            <div style="height: ${50 - redBarHeight}%; background: transparent;"></div>
        `;
    } else {
        // Equal position: Small neutral indicator in the middle
        barContainer.innerHTML = `
            <div style="height: 47%; background: transparent;"></div>
            <div style="height: 6%; background: #FFC107; transition: height 0.3s ease;"></div>
            <div style="height: 47%; background: transparent;"></div>
        `;
    }
}

/**
 * Stop analysis and cleanup
 */
function stopAnalysis() {
    if (gameState.analysis.engine && gameState.analysis.isActive) {
        gameState.analysis.engine.stopAnalysis();
        gameState.analysis.isActive = false;
    }
}

/**
 * Shows the Setup from FEN dialog
 */
function showSetupFenDialog() {
    // Validate that we're in FREESTYLE or ANALYSIS mode
    if (gameState.perspective !== Perspective.FREESTYLE && gameState.perspective !== Perspective.ANALYSIS) {
        console.warn('Setup from FEN is only available in FREESTYLE or ANALYSIS mode');
        return;
    }

    // Create modal overlay if it doesn't exist
    let modalOverlay = document.getElementById('fenModalOverlay');
    if (!modalOverlay) {
        modalOverlay = createFenModal();
    }

    // Pre-populate with current FEN
    const fenTextarea = modalOverlay.querySelector('#fenInput');
    if (fenTextarea && gameState.chessBoard) {
        fenTextarea.value = gameState.chessBoard.getFen();
    }

    // Clear any previous error messages
    const errorMessage = modalOverlay.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    }

    // Show the modal
    modalOverlay.classList.add('show');

    // Focus on the textarea
    if (fenTextarea) {
        fenTextarea.focus();
        fenTextarea.select();
    }
}

/**
 * Creates the FEN setup modal dialog
 * @returns {HTMLElement} The modal overlay element
 */
function createFenModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'fenModalOverlay';
    modalOverlay.classList.add('fen-modal-overlay');

    const modal = document.createElement('div');
    modal.classList.add('fen-modal');

    modal.innerHTML = `
        <h3>Setup Position from FEN</h3>
        <div class="instructions">
            Enter a valid FEN (Forsyth-Edwards Notation) string to set up a custom chess position.
            FEN format: piece placement, active color, castling rights, en passant, halfmove clock, fullmove number.
        </div>
        <label for="fenInput">FEN String:</label>
        <textarea id="fenInput" placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"></textarea>
        <div class="error-message" id="fenErrorMessage"></div>
        <div class="button-container">
            <button type="button" id="fenCancelBtn">Cancel</button>
            <button type="button" id="fenApplyBtn" class="primary">Apply</button>
        </div>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Add event listeners
    setupFenModalEventListeners(modalOverlay);

    return modalOverlay;
}

/**
 * Sets up event listeners for the FEN modal
 * @param {HTMLElement} modalOverlay - The modal overlay element
 */
function setupFenModalEventListeners(modalOverlay) {
    const fenInput = modalOverlay.querySelector('#fenInput');
    const cancelBtn = modalOverlay.querySelector('#fenCancelBtn');
    const applyBtn = modalOverlay.querySelector('#fenApplyBtn');
    const errorMessage = modalOverlay.querySelector('#fenErrorMessage');

    // Cancel button
    cancelBtn.addEventListener('click', () => {
        hideFenModal();
    });

    // Apply button
    applyBtn.addEventListener('click', () => {
        const fenString = fenInput.value.trim();
        if (applyFenPosition(fenString, errorMessage)) {
            hideFenModal();
        }
    });

    // Enter key in textarea
    fenInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            const fenString = fenInput.value.trim();
            if (applyFenPosition(fenString, errorMessage)) {
                hideFenModal();
            }
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            hideFenModal();
        }
    });

    // Click outside modal to close
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideFenModal();
        }
    });
}

/**
 * Applies the FEN position to the chess board
 * @param {string} fenString - The FEN string to apply
 * @param {HTMLElement} errorMessage - The error message element
 * @returns {boolean} True if successful, false if error
 */
function applyFenPosition(fenString, errorMessage) {
    // Validate that we're still in Freestyle or Analysis mode
    if (gameState.perspective !== Perspective.FREESTYLE && gameState.perspective !== Perspective.ANALYSIS) {
        showFenError(errorMessage, 'FEN setup is only available in FREESTYLE or ANALYSIS mode');
        return false;
    }

    if (!fenString) {
        showFenError(errorMessage, 'Please enter a FEN string');
        return false;
    }

    try {
        // Attempt to load the FEN
        const success = gameState.chessBoard.loadFen(fenString);

        if (!success) {
            showFenError(errorMessage, 'Invalid FEN format. Please check your input and try again.');
            return false;
        }

        // Update game state
        gameState.fen = gameState.chessBoard.getFen();

        // Update board graphics and UI
        updateBoardGraphicsAndSquareListeners(true);

        // Trigger analysis if in analysis mode
        if (gameState.perspective === Perspective.ANALYSIS && gameState.analysis.isEngineReady) {
            startPositionAnalysis();
        }

        console.log('Successfully loaded FEN:', fenString);
        return true;

    } catch (error) {
        console.error('Error loading FEN:', error);
        showFenError(errorMessage, 'Error loading FEN: ' + error.message);
        return false;
    }
}

/**
 * Shows an error message in the FEN modal
 * @param {HTMLElement} errorMessage - The error message element
 * @param {string} message - The error message to display
 */
function showFenError(errorMessage, message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

/**
 * Hides the FEN modal
 */
function hideFenModal() {
    const modalOverlay = document.getElementById('fenModalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
    }
}

/**
 * Centralized UI management function that controls element visibility based on game perspective
 */
function updateUIForPerspective() {
    if (gameState.lastPerspective === gameState.perspective) {
        return;
    }

    // Only update lastPerspective if we're not in analysis mode
    // Analysis mode should preserve the original lastPerspective for returning to
    if (gameState.perspective !== Perspective.ANALYSIS) {
        gameState.lastPerspective = gameState.perspective;
    }

    const gameActionLinksContainer = document.getElementById('gameActionLinksContainer');
    const promotionContainer = document.getElementById('promotionOptionsContainer');

    // Control individual game action links based on perspective
    if (gameActionLinksContainer) {
        // Define all possible action links
        const allActionLinks = [
            {text: 'Draw', action: 'draw', handler: onDraw},
            {text: 'Resign', action: 'resign', handler: onResign},
            {text: 'Rematch', action: 'rematch', handler: onRematch},
            {text: 'Analysis', action: 'analysis', handler: onAnalysis},
            {text: 'End Analysis', action: 'endAnalysis', handler: exitAnalysisMode}
        ];

        // Determine which links should be visible based on perspective
        let visibleActions = [];

        switch (gameState.perspective) {
            case Perspective.PLAYING:
                // Draw and Resign links: Show only when playing
                visibleActions = ['draw', 'resign'];
                break;

            case Perspective.FINISHED_PLAYING:
                // Rematch and Analysis links: Show when finished playing
                visibleActions = ['rematch', 'analysis'];
                break;

            case Perspective.OBSERVING:
            case Perspective.FINISHED_OBSERVING:
            case Perspective.FREESTYLE:
                // Analysis link: Show when observing, finished observing, or FREESTYLE
                visibleActions = ['analysis'];
                break;

            case Perspective.ANALYSIS:
                // No action links in analysis mode - analysis UI is shown instead
                visibleActions = ['endAnalysis'];
                break;

            case Perspective.EXAMINING:
            case Perspective.FINISHED_EXAMINING:
                // No action links: Hide all action links when examining
                visibleActions = [];
                break;

            default:
                // For any other perspective, hide all links
                visibleActions = [];
                break;
        }

        // Clear the container and rebuild with only visible links
        // But preserve analysis container if it exists
        const existingAnalysisContainer = gameActionLinksContainer.querySelector('#analysisContainer');
        gameActionLinksContainer.innerHTML = '';

        // Restore analysis container if we're in analysis mode
        if (existingAnalysisContainer && gameState.perspective === Perspective.ANALYSIS) {
            gameActionLinksContainer.appendChild(existingAnalysisContainer);
        }

        if (visibleActions.length > 0) {
            // Add only the visible action links
            visibleActions.forEach(actionName => {
                const linkData = allActionLinks.find(link => link.action === actionName);
                if (linkData) {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.classList.add('game-action-link');
                    link.textContent = linkData.text;
                    link.dataset.action = linkData.action;

                    // Add click handler
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        linkData.handler();
                    });

                    // Set initial state for draw button
                    if (linkData.action === 'draw') {
                        if (gameState.drawOfferPending) {
                            link.classList.add('pressed');
                            link.textContent = 'Auto Draw Active';
                        } else {
                            link.classList.remove('pressed');
                            link.textContent = 'Draw';
                        }
                    }

                    gameActionLinksContainer.appendChild(link);
                }
            });

            gameActionLinksContainer.classList.add('visible');
        } else if (gameState.perspective === Perspective.ANALYSIS) {
            // Keep container visible in analysis mode for the analysis UI
            gameActionLinksContainer.classList.add('visible');
        } else {
            gameActionLinksContainer.classList.remove('visible');
        }
    }

    // Show promotion options only when player is playing
    if (promotionContainer) {
        const shouldShowPromotion = gameState.perspective === Perspective.PLAYING;

        if (shouldShowPromotion) {
            promotionContainer.style.display = 'flex';
            promotionContainer.classList.add('visible');

            // Set the piece images based on the current piece set
            const pieceColor = gameState.isPlayerWhite ? 'w' : 'b';
            const promotionLabels = promotionContainer.querySelectorAll('.promotion-options-row .promotion-option label');
            const pieceTypes = ['q', 'r', 'b', 'n'];

            promotionLabels.forEach((label, index) => {
                if (index < pieceTypes.length && prefs) {
                    const pieceType = pieceTypes[index].toUpperCase();
                    label.innerHTML = `<img src="pieces/${prefs.pieceSet}/${pieceColor}${pieceType}.svg" alt="${pieceColor}${pieceType}" style="width: 22px; height: 22px;" />`;
                }
            });
        } else {
            promotionContainer.style.display = 'none';
            promotionContainer.classList.remove('visible');
        }
    }

    // Show move list for all perspectives except FREESTYLE and PLAYING
    if (movesListContainer) {
        const shouldShowMoveList = gameState.perspective !== Perspective.FREESTYLE &&
            gameState.perspective !== Perspective.PLAYING;
        movesListContainer.style.display = shouldShowMoveList ? 'block' : 'none';
    }

    // Show/hide Setup from FEN menu item based on perspective
    const setupFenBtn = document.getElementById('setupFenBtn');
    if (setupFenBtn) {
        const shouldShowSetupFen = gameState.perspective === Perspective.FREESTYLE || gameState.perspective === Perspective.ANALYSIS;
        setupFenBtn.style.display = shouldShowSetupFen ? 'block' : 'none';
    }

    // Show/hide analysis UI based on perspective
    const analysisContainer = document.getElementById('analysisContainer');
    if (analysisContainer) {
        const shouldShowAnalysis = gameState.perspective === Perspective.ANALYSIS;
        analysisContainer.style.display = shouldShowAnalysis ? 'block' : 'none';

        if (shouldShowAnalysis) {
            // Ensure analysis container is created and visible
            createAnalysisUI();
        }
    } else if (gameState.perspective === Perspective.ANALYSIS) {
        // Create analysis container if it doesn't exist
        createAnalysisUI();
    }
}

/**
 * Create and setup the analysis UI components
 */
function createAnalysisUI() {
    // Check if analysis container already exists
    let analysisContainer = document.getElementById('analysisContainer');
    if (analysisContainer) {
        return; // Already exists
    }

    // Find the game action links container between player names
    const gameActionLinksContainer = document.getElementById('gameActionLinksContainer');
    if (!gameActionLinksContainer) {
        console.error('Could not find game action links container for analysis UI');
        return;
    }

    // Create analysis container
    analysisContainer = document.createElement('div');
    analysisContainer.id = 'analysisContainer';
    analysisContainer.className = 'analysis-container';

    // Create analysis UI HTML without strength bars (they'll be positioned separately)
    analysisContainer.innerHTML = `
        <div class="analysis-content">
            <div class="analysis-info">
               <div id="analysisPrincipalVariation" class="analysis-value analysis-pv"></div>
            </div>
        </div>
    `;

    // Insert analysis container at the bottom of the board area
    const chessBoardArea = document.querySelector('.chess-board-area');
    if (chessBoardArea) {
        chessBoardArea.appendChild(analysisContainer);
    } else {
        // Fallback to game action links area
        gameActionLinksContainer.after(analysisContainer);
    }

    // Add event listeners
    const toggleBtn = document.getElementById('analysisToggleBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleAnalysis);
    }

    const backBtn = document.getElementById('analysisBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', exitAnalysisMode);
    }

    // Create strength bars on the left side of the chess board
    createBoardSideStrengthBars();
}

/**
 * Create strength bars on the left side of the chess board
 */
function createBoardSideStrengthBars() {
    // Remove existing strength bars if they exist
    const existingBars = document.getElementById('boardSideStrengthBars');
    if (existingBars) {
        existingBars.remove();
    }

    // Find the main container to attach strength bars
    const mainContainer = document.querySelector('.main-container') || document.body;

    // Create strength bars container
    const strengthBarsContainer = document.createElement('div');
    strengthBarsContainer.id = 'boardSideStrengthBars';
    strengthBarsContainer.className = 'board-side-strength-bars';

    // Initialize with equal position (neutral yellow bar in middle) and evaluation label
    strengthBarsContainer.innerHTML = `
        <div class="board-strength-evaluation-label" id="strengthEvaluationLabel">0.00</div>
        <div class="board-strength-bar-container">
            <div style="height: 47%; background: transparent;"></div>
            <div style="height: 6%; background: #FFC107; transition: height 0.3s ease;"></div>
            <div style="height: 47%; background: transparent;"></div>
        </div>
    `;

    // Insert the strength bars into the main container
    mainContainer.appendChild(strengthBarsContainer);

    // Position the strength bars dynamically based on chess board position
    positionStrengthBars();
}

/**
 * Position strength bars dynamically based on chess board position and size
 */
function positionStrengthBars() {
    const strengthBars = document.getElementById('boardSideStrengthBars');
    const chessBoard = document.getElementById('chessBoard');

    if (!strengthBars || !chessBoard) {
        return;
    }

    // Get chess board position and dimensions
    const boardRect = chessBoard.getBoundingClientRect();

    // Position strength bars to the left of the chess board
    strengthBars.style.position = 'fixed';
    strengthBars.style.left = (boardRect.left - 25) + 'px'; // 25px to the left of board
    strengthBars.style.top = boardRect.top + 'px'; // Align with top of board
    strengthBars.style.width = '18px';
    strengthBars.style.height = boardRect.height + 'px'; // Match board height exactly
}

/**
 * Toggle analysis on/off
 */
function toggleAnalysis() {
    const toggleIcon = document.getElementById('analysisToggleIcon');

    if (gameState.analysis.isActive) {
        // Stop analysis
        stopAnalysis();
        if (toggleIcon) toggleIcon.textContent = '▶';
    } else {
        // Start analysis
        gameState.analysis.isActive = true;
        startPositionAnalysis();
        if (toggleIcon) toggleIcon.textContent = '⏸';
    }
}

/**
 * Exit analysis mode and return to previous perspective
 */
function exitAnalysisMode() {
    // Stop analysis
    stopAnalysis();

    // Remove analysis container
    const analysisContainer = document.getElementById('analysisContainer');
    if (analysisContainer) {
        analysisContainer.remove();
    }

    // Remove board-side strength bars
    const strengthBars = document.getElementById('boardSideStrengthBars');
    if (strengthBars) {
        strengthBars.remove();
    }

    // Return to previous perspective or FREESTYLE if none
    const previousPerspective = gameState.lastPerspective || Perspective.FREESTYLE;
    gameState.perspective = previousPerspective;

    // Force UI update by resetting lastPerspective
    gameState.lastPerspective = null;
    updateUIForPerspective();
}

/**
 * Updates the non-board UI elements such as player names, clocks, and game status.
 */
function updatePlayerInfoAndClockUI() {
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
        if (gameState.variant !== '' && gameState.minutes) {
            const ratedStr = gameState.isRated ? 'rated' : 'unrated';
            gameTypeInfo.innerText = `${ratedStr} ${gameState.type} ${gameState.minutes} ${gameState.increment}`;
        } else {
            gameTypeInfo.innerText = '';
        }
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

    // Update UI elements based on perspective
    updateUIForPerspective();
}

/**
 * Converts the style12 double pawn push value to a file.
 * @param style12Value The style 12 double pawn push value.
 * @returns {string} The file, e.g. 'a', 'b', etc.
 */
function style12DoublePawnPushToFile(style12Value) {
    if (style12Value === -1) {
        return '';
    } else if (style12Value >= 0 && style12Value <= 7) {
        return fileNumberToAlgebraic(style12Value + 1); // +1 because fileNumberToAlgebraic expects 1-8 for a-h
    }
    return '';
}

/**
 * Sets gamePlayer.isPlayerWhite, gameState.isPlayerPlaying, and gameState.isWhitesMove based on the current game state.
 */
function setPlayerOrientationGameState() {
    gameState.isPlayerPlaying = gameState.relation === GameRelation.PLAYING_MY_MOVE ||
                                gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE;

    /**
     * When playing, the user can only move his pieces. Currently, he can only move them when it is his turn, but when
     * premove is added, this will change.
     */
    if (gameState.isPlayerPlaying) {
        gameState.isPlayerWhite = (gameState.isWhitesMove && gameState.relation === GameRelation.PLAYING_MY_MOVE) ||
            (!gameState.isWhitesMove && gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE);

        gameState.isWhiteOnBottom = gameState.isPlayerWhite ? true : false;
        gameState.allowUserToMoveBothSides = false;

        // gameState.isFlipped is the orientation from the board menu in the UI. It has nothing to do with the style12 event.
        // The menu also does not send the fics command to flip the board. It just changes the UI.
        if (gameState.isFlipped) {
            gameState.isWhiteOnBottom = !gameState.isWhiteOnBottom;
        }
    } else {
        const followed = getFollowedPlayer();
        const observed = getObservedPlayer();
        let tempIsWhiteOnBottom = gameState.style12WhiteOnBottom;

        if (followed.name) {
            let whiteName = gameState.whitePlayer.name.toUpperCase();
            let blackName = gameState.blackPlayer.name.toUpperCase();
            let followedName = followed.name.toUpperCase();
            tempIsWhiteOnBottom = whiteName.startsWith(followedName) ? true :
                blackName.startsWith(followedName) ? false : tempIsWhiteOnBottom;
        } else if (observed.name) {
            let whiteName = gameState.whitePlayer.name.toUpperCase();
            let blackName = gameState.blackPlayer.name.toUpperCase();
            let obsName = observed.name.toUpperCase();
            tempIsWhiteOnBottom = whiteName.startsWith(obsName) ? true :
                blackName.startsWith(obsName) ? false : tempIsWhiteOnBottom;
        }

        /**
         * If user is not playing the user is allowed to move both sides!
         * If a user is observing a game, for example, they can move pieces just to see the position visually.
         * Style12 events will come in and erase the changes, but that is fine.
         *
         * This will change in 'GameRelation.EXAMINING' mode, but that is not implemented yet. Examine mode will be a
         * special case. In 'GameRelation.EXAMINING' mode, the moves will stick and be sent to the websocket.
         */
        gameState.isWhiteOnBottom = gameState.isFlipped ? !tempIsWhiteOnBottom : tempIsWhiteOnBottom;
        gameState.allowUserToMoveBothSides = true;
    }
}

/**
 * Converts the last move from the gameState to start and end algebraic notation.
 * @returns {string[]|null}
 */
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
 * Handles moves for both drag and click-click move.
 * @param startSquareAlgebraic The starting algebraic square, 'e2', for example.
 * @param endSquareAlgebraic The ending algebraic square, 'e4', for example.
 * @param isDragging True if dragging, false if click-click move.
 */
export function makeMove(startSquareAlgebraic, endSquareAlgebraic, isDragging) {
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

    const movingPiece = getPieceAtSquare(gameState.fen, startSquareAlgebraic);
    const targetRank = parseInt(endSquareAlgebraic.charAt(1));
    const isPromotion = movingPiece !== '' &&
        (movingPiece === 'P' && targetRank === 8) ||
        (movingPiece === 'p' && targetRank === 1);
    let moveObject;
    let moveStringPart = `${startSquareAlgebraic}${endSquareAlgebraic}`;

    if (isPromotion) {
        if (gameState.isPlayerPlaying) {
            // Get the selected promotion piece from the already visible container
            const promotionContainer = document.getElementById('promotionOptionsContainer');
            if (promotionContainer) {
                const selectedOption = promotionContainer.querySelector('input[name="promotion-piece"]:checked');
                const promotion = selectedOption ? selectedOption.value : 'q'; // Default to queen
                moveObject = {from: startSquareAlgebraic, to: endSquareAlgebraic, promotion: promotion};
                moveStringPart += `=${promotion}`;
            } else {
                // Fallback if container not found
                return showPromotionOptions(startSquareAlgebraic, endSquareAlgebraic, isDragging);
            }
        } else {
            // Show promotion dialog for observers
            return showPromotionDialog(startSquareAlgebraic, endSquareAlgebraic, isDragging);
        }
    } else {
        moveObject = {from: startSquareAlgebraic, to: endSquareAlgebraic};
    }

    const isPremove = gameState.isPlayerPlaying &&
        (!gameState.isWhitesMove && gameState.isPlayerWhite) ||
        (gameState.isWhitesMove && !gameState.isPlayerWhite);

    if (isPremove) { //Premove
        console.log('Handling premove...');
        const moveResult = gameState.chessBoard.isValidPremove(startSquareAlgebraic, endSquareAlgebraic, moveObject.promotion ? moveObject.promotion : null);
        if (moveResult) {
            gameState.premove = moveStringPart;
            // Don't update board on pre-move, let it happen when the move is actually played.
            console.log("Making premove: " + gameState.premove);
            updateBoardBottomLabels();

            document.querySelector(`[data-algebraic="${startSquareAlgebraic}"]`).classList.add('premove-start');
            document.querySelector(`[data-algebraic="${endSquareAlgebraic}"]`).classList.add('premove-end');
        } else {
            console.error("Invalid move by drop:", moveObject);
            playSound('illegal');
        }

        // Restore the original piece visibility if the move failed
        if (isDragging && gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-hidden', 'piece-semi-transparent');
            gameState.draggedPieceElement.classList.add('piece-visible');
        }
        return moveResult;
    } else { //Actual move.
        const moveResult = gameState.chessBoard.makeLongAlgebraicMove(moveObject.from, moveObject.to, moveObject.promotion ? moveObject.promotion : null);
        if (moveResult) {
            console.log(`Fen before move: ${gameState.fen} after move: ${gameState.chessBoard.getFen()}`);
            gameState.fen = gameState.chessBoard.getFen();

            // Make move on fics.
            if (gameState.relation === GameRelation.PLAYING_MY_MOVE ||
                gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE ||
                gameState.relation === GameRelation.EXAMINING) {
                ws.send(`${moveStringPart}`);
                gameState.chessBoard.back();
            } else {
                // Make move manually.
                gameState.isWhitesMove = !gameState.isWhitesMove;
            }

            // Update the board graphics which will create the piece at the new location
            updateBoardGraphicsAndSquareListeners(false);
            restartClockInternal();

            // Trigger analysis if in analysis mode and move was successful
            if (gameState.perspective === Perspective.ANALYSIS && gameState.analysis.isEngineReady) {
                startPositionAnalysis();
            }
        }
        // We'll make the original piece fully transparent but not rely solely on this
        if (isDragging && gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-visible', 'piece-semi-transparent');
            gameState.draggedPieceElement.classList.add('piece-hidden');
        }

        if (!moveResult) {
            console.error("Invalid move:", moveObject);
            playSound('illegal');
        }
        return moveResult;
    }
}

/**
 * Animates a piece move.
 * @param algrebraicFrom The algebraic from.
 * @param algebraicTo The algebraic to.
 * @param callback Callback to call when complete.
 */
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

    animatedPiece.style.left = startPosition.left + 'px';
    animatedPiece.style.top = startPosition.top + 'px';

    requestAnimationFrame(() => {
        animatedPiece.getBoundingClientRect(); // Force reflow

        // Use the original animation duration (0.1s)
        animatedPiece.style.transition = 'left .25s ease-out, top .25s ease-out';
        animatedPiece.style.left = endPosition.left + 'px';
        animatedPiece.style.top = endPosition.top + 'px';

        animatedPiece.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName === 'left' || e.propertyName === 'top') { // Wait for one of them
                animatedPiece.removeEventListener('transitionend', onEnd);

                // Get the destination square and restore the piece content there
                const toElement = document.getElementById(`square-${toSquare.file}-${toSquare.rank}`);
                if (toElement) {
                    const destPieceElement = toElement.querySelector('.chess-piece');
                    if (destPieceElement) {
                        destPieceElement.innerHTML = pieceContent;
                    }
                }

                // Remove the animated piece
                animatedPiece.remove();

                if (callback) {
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

function removeAllBoardSquareIndicationStyles() {
    const boardElement = document.getElementById('chessBoard');
    if (!boardElement) return;

    const allSquares = boardElement.querySelectorAll('.chess-square');
    allSquares.forEach(square => {
        square.classList.remove('selected', 'valid-move', 'valid-move-hover', 'last-move-start', 'last-move-end', 'last-move-fade');
    });
}

function refreshValidMoveStyleOnSquares() {
    removeAllBoardSquareIndicationStyles();

    // Add highlights to valid moves
    gameState.validMoves.forEach(move => {
        const moveSquareDiv = document.querySelector(`[data-algebraic="${move}"]`);
        if (moveSquareDiv) {
            moveSquareDiv.classList.add('valid-move');
        }
    });
}

/**
 * Starts the clock if its not already running based on gameState.
 */
function startClock() {
    if (gameState.isClockRunning) {
        return;
    }

    // Update the clock displays initially
    gameState.whiteClockDisplay = formatClockTimeInternal(gameState.whiteTimeSecs);
    gameState.blackClockDisplay = formatClockTimeInternal(gameState.blackTimeSecs);
    updatePlayerInfoAndClockUI();

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
                updatePlayerInfoAndClockUI();

                if ((gameState.isWhitesMove && gameState.whiteTimeSecs <= 0) || (!gameState.isWhitesMove && gameState.blackTimeSecs <= 0)) {
                    stopClock();
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

/**
 * Stops the clock if its running.
 */
function stopClock() {
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

/**
 * Restarts the clock with the current time based on gameState.
 */
function restartClockInternal() {
    stopClock();
    updatePlayerInfoAndClockUI(); // Update display
    startClock(); // Start with current state
}

/**
 * Shows a modal promotion dialog with clickable piece buttons
 * @param startSquareAlgebraic The starting square in algebraic notation.
 * @param endSquareAlgebraic The ending square in algebraic notation.
 * @param isDragging Whether the move is being made via drag and drop.
 * @returns {boolean} Always returns false to prevent further processing.
 */
function showPromotionDialog(startSquareAlgebraic, endSquareAlgebraic, isDragging) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
    `;

    // Determine piece color based on the promoting piece
    const fromSquare = document.querySelector(`[data-algebraic="${startSquareAlgebraic}"]`);
    const pieceElement = fromSquare ? fromSquare.querySelector('.chess-piece') : null;
    let pieceColor = 'w'; // Default to white

    if (pieceElement && pieceElement.textContent) {
        // Check if the piece is black (lowercase) or white (uppercase)
        const pieceChar = pieceElement.textContent.trim();
        pieceColor = pieceChar === pieceChar.toLowerCase() ? 'b' : 'w';
    } else {
        // Fallback: determine by whose turn it is
        pieceColor = gameState.isWhitesMove ? 'w' : 'b';
    }
    const pieceTypes = [
        { value: 'q', name: 'Queen' },
        { value: 'r', name: 'Rook' },
        { value: 'b', name: 'Bishop' },
        { value: 'n', name: 'Knight' }
    ];

    modal.innerHTML = `
        <h3>Choose Promotion Piece</h3>
        <div class="promotion-buttons" style="display: flex; gap: 15px; justify-content: center; margin: 20px 0;">
            ${pieceTypes.map(piece => `
                <button class="promotion-button" data-piece="${piece.value}" style="
                    background: #f0f0f0;
                    border: 2px solid #ccc;
                    border-radius: 8px;
                    padding: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    min-width: 60px;
                " title="${piece.name}">
                    <img src="pieces/${prefs.pieceSet}/${pieceColor}${piece.value.toUpperCase()}.svg"
                         alt="${piece.name}" style="width: 40px; height: 40px;" />
                    <span style="font-size: 12px; font-weight: bold;">${piece.name}</span>
                </button>
            `).join('')}
        </div>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Add hover effects
    const buttons = modal.querySelectorAll('.promotion-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.background = '#e0e0e0';
            button.style.borderColor = '#999';
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.background = '#f0f0f0';
            button.style.borderColor = '#ccc';
            button.style.transform = 'scale(1)';
        });
    });

    // Handle piece selection
    const handlePieceSelection = (promotion) => {
        // Remove modal
        modalOverlay.remove();

        // Complete the move with the selected promotion piece
        const moveStringPart = `${startSquareAlgebraic}${endSquareAlgebraic}=${promotion}`;
        const moveObject = {from: startSquareAlgebraic, to: endSquareAlgebraic, promotion: promotion};

        // Continue with the move logic (same as the original prompt logic)
        const isPremove = gameState.isPlayerPlaying &&
            (!gameState.isWhitesMove && gameState.isPlayerWhite) ||
            (gameState.isWhitesMove && !gameState.isPlayerWhite);

        if (isPremove) {
            const moveResult = gameState.chessBoard.isValidPremove(startSquareAlgebraic, endSquareAlgebraic, promotion);
            if (moveResult) {
                gameState.premove = moveStringPart;
                console.log("Making premove: " + gameState.premove);
                updateBoardBottomLabels();
                document.querySelector(`[data-algebraic="${startSquareAlgebraic}"]`).classList.add('premove-start');
                document.querySelector(`[data-algebraic="${endSquareAlgebraic}"]`).classList.add('premove-end');
            } else {
                console.error("Invalid move by drop:", moveObject);
                playSound('illegal');
            }
        } else {
            const moveResult = gameState.chessBoard.makeLongAlgebraicMove(moveObject.from, moveObject.to, moveObject.promotion);
            if (moveResult) {
                console.log(`Fen before move: ${gameState.fen} after move: ${gameState.chessBoard.getFen()}`);
                gameState.fen = gameState.chessBoard.getFen();

                // Make move on fics if connected
                if (gameState.relation === GameRelation.PLAYING_MY_MOVE ||
                    gameState.relation === GameRelation.PLAYING_OPPONENT_MOVE ||
                    gameState.relation === GameRelation.EXAMINING) {
                    ws.send(`${moveStringPart}`);
                    gameState.chessBoard.back();
                } else {
                    gameState.isWhitesMove = !gameState.isWhitesMove;
                }

                updateBoardGraphicsAndSquareListeners(false);
                restartClockInternal();

                // Trigger analysis if in analysis mode
                if (gameState.perspective === Perspective.ANALYSIS && gameState.analysis.isEngineReady) {
                    startPositionAnalysis();
                }
            } else {
                console.error("Invalid move:", moveObject);
                playSound('illegal');
            }
        }

        // Restore piece visibility if dragging
        if (isDragging && gameState.draggedPieceElement) {
            gameState.draggedPieceElement.classList.remove('piece-hidden', 'piece-semi-transparent');
            gameState.draggedPieceElement.classList.add('piece-visible');
        }
    };

    // Add click listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const piece = button.getAttribute('data-piece');
            handlePieceSelection(piece);
        });
    });

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modalOverlay.remove();
            document.removeEventListener('keydown', handleEscape);
            // Default to queen if user cancels
            handlePieceSelection('q');
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Close on click outside modal
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
            document.removeEventListener('keydown', handleEscape);
            // Default to queen if user cancels
            handlePieceSelection('q');
        }
    });

    return false; // Prevent further processing
}

/**
 * Shows the promotion options UI and handles the selection.
 * @param startSquareAlgebraic The starting square in algebraic notation.
 * @param endSquareAlgebraic The ending square in algebraic notation.
 * @param isDragging Whether the move is being made via drag and drop.
 * @returns {boolean} Always returns false to prevent further processing.
 */
function showPromotionOptions(startSquareAlgebraic, endSquareAlgebraic, isDragging) {
    console.log("Showing promotion options for move:", startSquareAlgebraic, "to", endSquareAlgebraic);

    const promotionContainer = document.getElementById('promotionOptionsContainer');
    if (!promotionContainer) {
        console.error("Promotion container not found");
        return false;
    }

    // Update the piece images based on the player's color
    const pieceColor = gameState.isPlayerWhite ? 'w' : 'b';
    const labelElements = promotionContainer.querySelectorAll('.promotion-options-row .promotion-option label');
    const pieceTypes = ['q', 'r', 'b', 'n'];

    labelElements.forEach((label, index) => {
        if (index < pieceTypes.length) {
            const pieceType = pieceTypes[index].toUpperCase();
            label.innerHTML = `<img src="pieces/${prefs.pieceSet}/${pieceColor}${pieceType}.svg" alt="${pieceColor}${pieceType}" style="width: 20px; height: 20px;" />`;
        }
    });

    // The promotion container is already positioned below the bottom clock
    // We just need to make sure it's visible
    promotionContainer.style.display = 'flex';
    promotionContainer.classList.add('visible');

    console.log("Promotion container displayed:", promotionContainer.style.display);

    // Store the original piece visibility if dragging
    if (isDragging && gameState.draggedPieceElement) {
        gameState.draggedPieceElement.classList.remove('piece-hidden', 'piece-semi-transparent');
        gameState.draggedPieceElement.classList.add('piece-visible');
    }

    // Handle promotion selection
    const handlePromotionSelection = (e) => {
        console.log("Promotion option selected:", e.currentTarget);

        // Get the selected promotion piece
        let promotion = 'q'; // Default to queen

        // Find which option was clicked
        const optionDiv = e.currentTarget;
        const radio = optionDiv.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            promotion = radio.value;
        } else {
            // If we couldn't find the radio button, use the default
            const selectedOption = promotionContainer.querySelector('input[name="promotion-piece"]:checked');
            promotion = selectedOption ? selectedOption.value : 'q';
        }

        console.log("Selected promotion piece:", promotion);

        // Hide the container
        promotionContainer.classList.remove('visible');
        promotionContainer.style.display = 'none';

        // Remove event listeners
        document.removeEventListener('click', handleOutsideClick);

        // Remove the click event listeners from options
        const allOptions = promotionContainer.querySelectorAll('.promotion-option');
        allOptions.forEach(option => {
            option.removeEventListener('click', handlePromotionSelection);
        });

        // Complete the move with the selected promotion piece
        const moveStringPart = `${startSquareAlgebraic}${endSquareAlgebraic}=${promotion}`;
        const moveObject = {from: startSquareAlgebraic, to: endSquareAlgebraic, promotion: promotion};

        const isPremove = gameState.isPlayerPlaying && gameState.isWhitesMove !== gameState.isPlayerWhite;
        const isValidating = !isPremove &&
            (!gameState.isPlayerPlaying || (gameState.isPlayerPlaying && gameState.isWhitesMove === gameState.isPlayerWhite));

        let moveResult = null;

        if (!isPremove && isValidating) {
            moveResult = gameState.chessBoard.makeMove(moveObject);
            gameState.fen = gameState.chessBoard.getFen();
        }

        if (isPremove) {
            gameState.premove = moveStringPart;
            console.log("Making premove with promotion: " + gameState.premove);
            updateBoardBottomLabels();

            document.querySelector(`[data-algebraic="${startSquareAlgebraic}"]`).classList.add('premove-start');
            document.querySelector(`[data-algebraic="${endSquareAlgebraic}"]`).classList.add('premove-end');
        } else if (!isValidating || (isValidating && moveResult)) {
            if (gameState.relation !== GameRelation.ISOLATED_POSITION &&
                gameState.relation !== GameRelation.OBSERVING_PLAYED &&
                gameState.relation !== GameRelation.OBSERVING_EXAMINED &&
                gameState.relation !== GameRelation.FREESTYLE) {
                ws.send(`${moveStringPart}`);
            }

            // Update ECO opening info
            updateBoardBottomLabels();

            // Update the lastMovePretty property so the move list can be updated
            if (moveResult) {
                const lastMove = gameState.chessBoard.getLastMove();
                gameState.lastMovePretty = lastMove ? lastMove.san : '';
            }

            // Update the board graphics which will create the piece at the new location
            updateBoardGraphicsAndSquareListeners(false);
            restartClockInternal();
        } else if (!moveResult) {
            console.error("Invalid promotion move:", moveObject);
            if (!isPremove && isValidating) {
                gameState.chessBoard.back();
            }
        }
    };

    // Handle clicks outside the promotion container
    const handleOutsideClick = (e) => {
        console.log("Outside click detected");
        if (!promotionContainer.contains(e.target)) {
            console.log("Click was outside promotion container, hiding it");
            promotionContainer.classList.remove('visible');
            promotionContainer.style.display = 'none';
            document.removeEventListener('click', handleOutsideClick);

            // Remove the click event listeners from options
            const allOptions = promotionContainer.querySelectorAll('.promotion-option');
            allOptions.forEach(option => {
                option.removeEventListener('click', handlePromotionSelection);
            });
        }
    };

    // Clear any existing event listeners by replacing elements with clones
    const optionElements = promotionContainer.querySelectorAll('.promotion-options-row .promotion-option');
    optionElements.forEach(option => {
        option.replaceWith(option.cloneNode(true));
    });

    // Add event listeners for promotion selection to the fresh elements
    const freshOptions = promotionContainer.querySelectorAll('.promotion-options-row .promotion-option');
    freshOptions.forEach(option => {
        option.addEventListener('click', handlePromotionSelection);
    });

    // Add event listener for clicks outside the container (after a short delay)
    // Remove any existing listener first
    document.removeEventListener('click', handleOutsideClick);
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 200);

    return false; // Return false to prevent further processing
}

/**
 * Formats the clock time.
 * @param totalSeconds The total seconds.
 * @returns {string} The formatted time.
 */
function formatClockTimeInternal(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return '00:00';
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Initializes the chess system.
 * @param websocket THe websocket.
 * @param preferencesObject The preferences.
 */
export function initChessSystem(websocket, preferencesObject) {
    console.log("Initializing chess system");
    ws = websocket;
    prefs = preferencesObject;

    // Initialize ECO database
    initECO();

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
                removeAllBoardSquareIndicationStyles();
            }
        }, 100);
    });
}

/**
 * Refreshes the move list display with chessBoard.moves.
 */
function refreshMoveListDisplay() {
    if (!movesListContainer) {
        console.warn("Moves list container not found. It might not have been created yet.");
        return;
    }

    // Initialize the empty move list structure first
    clearMoveList();

    // Make sure movesListDisplayElement is defined after initialization
    if (!movesListDisplayElement) {
        console.warn("Moves list display element not found after initialization.");
        return;
    }

    // Clear any existing content in the moves display area
    movesListDisplayElement.innerHTML = '';

    // Now update the moves display with actual moves
    if (gameState.chessBoard.getMoveHistory().length > 0) {
        const table = document.createElement('table');
        table.classList.add('moves-table');
        const tbody = document.createElement('tbody');

        // Check if chessBoard is initialized before accessing its methods
        const moveHistory = gameState.chessBoard ? gameState.chessBoard.getMoveHistory() : [];
        for (let i = 0; i < moveHistory.length; i += 2) {
            const whiteMove = moveHistory[i];
            const blackMove = i + 1 < moveHistory.length ? moveHistory[i + 1] : null;
            const moveNumber = Math.floor(i / 2) + 1;

            const row = tbody.insertRow();

            // Move number cell
            const numCell = row.insertCell();
            numCell.classList.add('move-number');
            numCell.textContent = moveNumber + '.';

            // White move cell
            const whiteCell = row.insertCell();
            const whiteSpan = document.createElement('span');
            whiteSpan.classList.add('move-san');
            whiteSpan.textContent = convertToUnicodeChessPieces(whiteMove.san);
            whiteSpan.onclick = () => jumpToMove(moveNumber, 'w');
            whiteSpan.style.cursor = 'pointer';
            whiteCell.appendChild(whiteSpan);

            // Black move cell (if exists)
            if (blackMove) {
                const blackCell = row.insertCell();
                const blackSpan = document.createElement('span');
                blackSpan.classList.add('move-san');
                blackSpan.textContent = convertToUnicodeChessPieces(blackMove.san);
                blackSpan.onclick = () => jumpToMove(moveNumber, 'b');
                blackSpan.style.cursor = 'pointer';
                blackCell.appendChild(blackSpan);
            }
        }
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

/**
 * Updates the moves list with the last move in the game state.
 */
function updateMoveListWithLastMove() {
    if (!movesListDisplayElement || gameState.lastMovePretty === '') return;

    // Update the display
    refreshMoveListDisplay();
    highlightLastMoveInMovelist();
    updateBoardBottomLabels();
}

/**
 * Unselects all moves in the move list.
 */
function unselectMoveInMoveList() {
    // Check if movesListDisplayElement exists before using it
    if (!movesListDisplayElement) return;

    // Remove highlight from all moves
    const allMoves = movesListDisplayElement.querySelectorAll('.move-san');
    allMoves.forEach(move => {
        move.classList.remove('selected-move');
    });
}

/**
 * Highlights the last move in the move list.
 */
function highlightLastMoveInMovelist() {
    unselectMoveInMoveList();
    // Highlight the last move
    const moves = movesListDisplayElement.querySelectorAll('.move-san');
    if (moves && moves.length > 0) {
        const lastMove = moves[moves.length - 1];
        lastMove.classList.add('selected-move');
        lastMove.scrollIntoView({behavior: 'instant', block: 'nearest'});
    }
}

/**
 * Handles clicking on a move in the moves list.
 * @param moveNumber The move number to jump to.
 * @param color The color.
 */
export function jumpToMove(moveNumber, color) {
    // Use window.gameState for compatibility with tests
    const currentGameState = window.gameState || gameState;

    if (!currentGameState.chessBoard || currentGameState.chessBoard.getMoveHistory().length === 0) {
        return;
    }

    // Validate input parameters
    if (moveNumber < 1 || !['w', 'b'].includes(color)) {
        console.warn(`Invalid move parameters: ${moveNumber}${color}`);
        return;
    }

    // Calculate the half-move index (0-based)
    const halfMoveIndex = color === 'w' ? 2 * (moveNumber - 1) : 2 * (moveNumber - 1) + 1;

    // Check if the move exists
    if (halfMoveIndex >= 0 && halfMoveIndex < currentGameState.chessBoard.getMoveHistory().length) {
        // Get the position after the specified move
        const positionIndex = halfMoveIndex + 1;

        const targetFen = currentGameState.chessBoard.getFenBeforeHalfmove(positionIndex);

        if (targetFen) {
            // Update the board position
            currentGameState.fen = targetFen;

            // Update UI - call functions directly
            updateBoardGraphicsAndSquareListeners(false);
            updateBoardBottomLabels();

            // Trigger analysis if in analysis mode
            if (currentGameState.perspective === Perspective.ANALYSIS && currentGameState.analysis.isEngineReady) {
                startPositionAnalysis();
            }

            // Highlight the selected move in the moves list
            highlightSelectedMoveInternal(moveNumber, color);
        } else {
            console.warn(`No FEN found for move ${moveNumber}${color === 'w' ? '' : '...'}`);
        }
    } else {
        console.warn(`Could not navigate to move ${moveNumber}${color === 'w' ? '' : '...'} - move not found`);
    }
}


/**
 * Jumps to the first move in the move list.
 */
export function jumpToFirstMove() {
    // Use window.gameState for compatibility with tests
    const currentGameState = window.gameState || gameState;

    if (!currentGameState.chessBoard || currentGameState.chessBoard.getMoveHistory().length === 0) {
        return;
    }

    // Get the starting position (before any moves)
    const startingFen = currentGameState.chessBoard.getFenBeforeHalfmove(0);

    if (startingFen) {
        currentGameState.fen = startingFen;

        // Update UI - call functions directly
        updateBoardGraphicsAndSquareListeners(false);
        updateBoardBottomLabels();

        // Trigger analysis if in analysis mode
        if (currentGameState.perspective === Perspective.ANALYSIS && currentGameState.analysis.isEngineReady) {
            startPositionAnalysis();
        }

        // Clear any move highlighting since we're at the starting position
        unselectMoveInMoveList();

        // Scroll the move list to the top to show the beginning of the game
        if (typeof movesListDisplayElement !== 'undefined' && movesListDisplayElement) {
            movesListDisplayElement.scrollTop = 0;
        }
    } else {
        console.warn('No starting position found in position history');
    }
}

/**
 * Jumps to the last move in the move list.
 */
export function jumpToLastMove() {
    // Use window.gameState for compatibility with tests
    const currentGameState = window.gameState || gameState;

    if (!currentGameState.chessBoard || currentGameState.chessBoard.getMoveHistory().length === 0) {
        return;
    }

    // Get the current position (after all moves)
    const currentFen = currentGameState.chessBoard.getFen();
    currentGameState.fen = currentFen;

    // Update UI - call functions directly
    updateBoardGraphicsAndSquareListeners(false);
    updateBoardBottomLabels();

    // Trigger analysis if in analysis mode
    if (currentGameState.perspective === Perspective.ANALYSIS && currentGameState.analysis.isEngineReady) {
        startPositionAnalysis();
    }

    // Highlight the last move
    const moveHistory = currentGameState.chessBoard.getMoveHistory();
    const lastMoveIndex = moveHistory.length - 1;

    if (lastMoveIndex >= 0) {
        const moveNumber = Math.floor(lastMoveIndex / 2) + 1;
        const color = lastMoveIndex % 2 === 0 ? 'w' : 'b';

        highlightSelectedMoveInternal(moveNumber, color);
    }
}

/**
 * Jumps to the previous move in the move list.
 */
export function jumpToPreviousMove() {
    // Use window.gameState for compatibility with tests
    const currentGameState = window.gameState || gameState;

    if (!currentGameState.chessBoard || currentGameState.chessBoard.getMoveHistory().length === 0) return;

    // Find the currently selected move
    let selectedMove = null;
    if (typeof movesListDisplayElement !== 'undefined' && movesListDisplayElement) {
        selectedMove = movesListDisplayElement.querySelector('.selected-move');
    }

    if (!selectedMove) {
        // If no move is selected, go to the last move
        jumpToLastMove();
        return;
    }

    // Find the move number and color of the selected move
    const moveRow = selectedMove.closest('tr');
    if (!moveRow) return;

    const moveNumCell = moveRow.querySelector('.move-number');
    if (!moveNumCell) return;

    const moveNumber = parseInt(moveNumCell.textContent);
    const isWhiteMove = selectedMove.closest('td') === moveRow.cells[1];

    // Calculate the current half-move index
    const currentHalfMove = isWhiteMove ? 2 * (moveNumber - 1) : 2 * (moveNumber - 1) + 1;

    // Calculate the previous half-move
    const prevHalfMove = currentHalfMove - 1;

    if (prevHalfMove >= 0) {
        // Get the FEN at the previous position
        const targetFen = currentGameState.chessBoard.getFenBeforeHalfmove(prevHalfMove + 1);
        if (targetFen) {
            currentGameState.fen = targetFen;

            // Update UI if functions are available
            if (typeof updateBoardGraphicsAndSquareListeners === 'function') {
                updateBoardGraphicsAndSquareListeners(false);
            }
            if (typeof updateBoardBottomLabels === 'function') {
                updateBoardBottomLabels();
            }

            // Trigger analysis if in analysis mode
            if (currentGameState.perspective === Perspective.ANALYSIS && currentGameState.analysis.isEngineReady) {
                startPositionAnalysis();
            }

            // Calculate the move number and color for highlighting
            const prevMoveNumber = Math.floor(prevHalfMove / 2) + 1;
            const prevMoveColor = prevHalfMove % 2 === 0 ? 'w' : 'b';
            if (typeof highlightSelectedMoveInternal === 'function') {
                highlightSelectedMoveInternal(prevMoveNumber, prevMoveColor);
            }
        }
    } else {
        // Go to the starting position
        jumpToFirstMove();
    }
}

/**
 * Jumps to the next move in the move list.
 */
export function jumpToNextMove() {
    // Use window.gameState for compatibility with tests
    const currentGameState = window.gameState || gameState;

    if (!currentGameState.chessBoard || currentGameState.chessBoard.getMoveHistory().length === 0) return;

    // Find the currently selected move
    let selectedMove = null;
    if (typeof movesListDisplayElement !== 'undefined' && movesListDisplayElement) {
        selectedMove = movesListDisplayElement.querySelector('.selected-move');
    }

    if (!selectedMove) {
        // If no move is selected, go to the first move
        jumpToMove(1, 'w');
        return;
    }

    // Find the move number and color of the selected move
    const moveRow = selectedMove.closest('tr');
    if (!moveRow) return;

    const moveNumCell = moveRow.querySelector('.move-number');
    if (!moveNumCell) return;

    const moveNumber = parseInt(moveNumCell.textContent);
    const isWhiteMove = selectedMove.closest('td') === moveRow.cells[1];

    // Calculate the current half-move index
    const currentHalfMove = isWhiteMove ? 2 * (moveNumber - 1) : 2 * (moveNumber - 1) + 1;

    // Calculate the next half-move
    const nextHalfMove = currentHalfMove + 1;

    if (nextHalfMove < currentGameState.chessBoard.getMoveHistory().length) {
        // Get the FEN at the next position
        const targetFen = currentGameState.chessBoard.getFenBeforeHalfmove(nextHalfMove + 1);
        if (targetFen) {
            currentGameState.fen = targetFen;

            // Update UI if functions are available
            if (typeof updateBoardGraphicsAndSquareListeners === 'function') {
                updateBoardGraphicsAndSquareListeners(false);
            }
            if (typeof updateBoardBottomLabels === 'function') {
                updateBoardBottomLabels();
            }

            // Trigger analysis if in analysis mode
            if (currentGameState.perspective === Perspective.ANALYSIS && currentGameState.analysis.isEngineReady) {
                startPositionAnalysis();
            }

            // Calculate the move number and color for highlighting
            const nextMoveNumber = Math.floor(nextHalfMove / 2) + 1;
            const nextMoveColor = nextHalfMove % 2 === 0 ? 'w' : 'b';
            if (typeof highlightSelectedMoveInternal === 'function') {
                highlightSelectedMoveInternal(nextMoveNumber, nextMoveColor);
            }
        }
    } else {
        // Go to the final position
        jumpToLastMove();
    }
}

/**
 * Function to initialize an empty move list with navigation buttons
 */
function clearMoveList() {
    if (!movesListContainer) return;

    // Clear any existing content
    movesListContainer.innerHTML = '';

    // Create navigation buttons container (outside the scrollable area)
    const navContainer = document.createElement('div');
    navContainer.classList.add('moves-nav-container');

    // First move button
    const firstMoveBtn = document.createElement('button');
    firstMoveBtn.classList.add('moves-nav-btn');
    firstMoveBtn.innerHTML = '<span>⏮</span>';
    firstMoveBtn.title = 'Go to first move';
    firstMoveBtn.onclick = jumpToFirstMove;
    navContainer.appendChild(firstMoveBtn);

    // Previous move button
    const prevMoveBtn = document.createElement('button');
    prevMoveBtn.classList.add('moves-nav-btn');
    prevMoveBtn.innerHTML = '<span>◄</span>';
    prevMoveBtn.title = 'Go to previous move';
    prevMoveBtn.onclick = jumpToPreviousMove;
    navContainer.appendChild(prevMoveBtn);

    // Next move button
    const nextMoveBtn = document.createElement('button');
    nextMoveBtn.classList.add('moves-nav-btn');
    nextMoveBtn.innerHTML = '<span>►</span>';
    nextMoveBtn.title = 'Go to next move';
    nextMoveBtn.onclick = jumpToNextMove;
    navContainer.appendChild(nextMoveBtn);

    // Last move button
    const lastMoveBtn = document.createElement('button');
    lastMoveBtn.classList.add('moves-nav-btn');
    lastMoveBtn.innerHTML = '<span>⏭</span>';
    lastMoveBtn.title = 'Go to last move';
    lastMoveBtn.onclick = jumpToLastMove;
    navContainer.appendChild(lastMoveBtn);

    // Create the scrollable moves display area
    movesListDisplayElement = document.createElement('div');
    movesListDisplayElement.id = 'movesListDisplay';
    movesListDisplayElement.classList.add('moves-list-display');

    // Add both containers to the moves list container
    movesListContainer.appendChild(navContainer);
    movesListContainer.appendChild(movesListDisplayElement);
}

/**
 * Highlights the selected move in the moves list.
 * @param moveNumber Move number to highlight.
 * @param color b or w.
 */
function highlightSelectedMoveInternal(moveNumber, color) {
    if (!movesListDisplayElement) return;

    unselectMoveInMoveList();

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

/**
 * Update the ECO opening label from the move list.
 */
function updateECOLabelFromMoveList() {
    let moveListStr = '';
    gameState.openingDescription = '';
    let opening = '';
    const moveHistory = gameState.chessBoard.getMoveHistory();
    if (moveHistory.length > 0) {
        for (let i = 0; i < moveHistory.length; i++) {
            const move = moveHistory[i];
            if (i % 2 == 0) {
                moveListStr += `${(i / 2) + 1}. ${move.san} `;
            } else {
                moveListStr += `${move.san} `;
            }
            const candidate = lookupFromMoveList(moveListStr.trim());
            opening = candidate || opening;
        }
        gameState.openingDescription = opening;
        const ecoOpeningLabel = document.getElementById('ecoOpeningLabel');
        ecoOpeningLabel.innerText = gameState.openingDescription;
    }
}

/**
 * Updates the labels below the board. Currently, ecoOpeningLabel and lastMoveLabel.
 */
function updateBoardBottomLabels() {
    let moveListStr = '';
    const moveHistory = gameState.chessBoard.getMoveHistory();
    if (moveHistory.length > 0) {
        for (let i = 0; i < moveHistory.length; i++) {
            const move = moveHistory[i];
            if (i % 2 == 0) {
                moveListStr += `${(i / 2) + 1}. ${move.san} `;
            } else {
                moveListStr += `${move.san} `;
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
        lastMoveLabelText = gameState.isWhitesMove ?
            `Last move: ${gameState.moveNumber} ${convertToUnicodeChessPieces(gameState.lastMovePretty)}` :
            `Last move: ${gameState.moveNumber - 1}...${convertToUnicodeChessPieces(gameState.lastMovePretty)}`;
    }

    // Only update if the element exists
    if (lastMoveLabelElement) {
        lastMoveLabelElement.innerText = lastMoveLabelText;
    }
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
    flipBtn.innerHTML = 'Flip Board <i class="material-icons">swap_vert</i>';
    flipBtn.onclick = () => {
        flipBoard();
        boardMenu.classList.remove('show');
    };
    boardMenu.appendChild(flipBtn);

    // Setup from FEN button (only visible in FREESTYLE mode)
    const setupFenBtn = document.createElement('button');
    setupFenBtn.id = 'setupFenBtn';
    setupFenBtn.title = 'Setup Position from FEN';
    setupFenBtn.innerHTML = 'Setup from FEN <i class="material-icons">edit</i>';
    setupFenBtn.onclick = () => {
        showSetupFenDialog();
        boardMenu.classList.remove('show');
    };
    setupFenBtn.style.display = 'none'; // Hidden by default
    boardMenu.appendChild(setupFenBtn);

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



    // Create promotion options container
    const promotionOptionsContainer = document.createElement('div');
    promotionOptionsContainer.id = 'promotionOptionsContainer';
    promotionOptionsContainer.classList.add('promotion-options-container');

    // Add a title to the container
    const promotionTitle = document.createElement('div');
    promotionTitle.classList.add('promotion-title');
    promotionTitle.textContent = 'Auto Promotion:';
    promotionOptionsContainer.appendChild(promotionTitle);

    // Create a row for the promotion options
    const promotionOptionsRow = document.createElement('div');
    promotionOptionsRow.classList.add('promotion-options-row');
    promotionOptionsContainer.appendChild(promotionOptionsRow);

    // Create options for Queen, Rook, Bishop, Knight
    const pieceTypes = [
        {value: 'q', name: 'Queen'},
        {value: 'r', name: 'Rook'},
        {value: 'b', name: 'Bishop'},
        {value: 'n', name: 'Knight'}
    ];

    pieceTypes.forEach(piece => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('promotion-option');

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'promotion-piece';
        radio.value = piece.value;
        radio.id = `promotion-${piece.value}`;
        if (piece.value === 'q') radio.checked = true; // Queen is default

        const label = document.createElement('label');
        label.htmlFor = `promotion-${piece.value}`;
        label.title = piece.name;

        // We'll set the actual piece image in updateBoardGraphicsAndSquareListeners
        // based on the current piece set and player color

        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        promotionOptionsRow.appendChild(optionDiv); // Add to row instead of directly to container
    });

    // Create game action links container (initially empty)
    const gameActionLinksContainer = document.createElement('div');
    gameActionLinksContainer.id = 'gameActionLinksContainer';
    gameActionLinksContainer.classList.add('game-action-links-container');
    // Links will be dynamically created by updateUIForPerspective()

    // Board menu and player divider setup
    playerDivider.appendChild(boardMenu);
    playerDivider.style.position = 'relative';
    playerDivider.appendChild(topPlayerNameContainer);
    playerDivider.appendChild(gameActionLinksContainer); // Add game action links between player names
    playerDivider.appendChild(promotionOptionsContainer); // Add promotion container above bottom player name
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

    //Move list.
    movesListContainer = document.createElement('div'); // Assign to global
    movesListContainer.id = 'movesListContainer';
    movesListContainer.classList.add('moves-list-container');
    movesListContainer.style.display = 'block'; // Show by default
    // The movesListDisplayElement will be created by initializeEmptyMoveListInternal
    playerDivider.appendChild(movesListContainer); // Add moves list to the player divider between names
    // Initialize an empty move list with navigation buttons
    refreshMoveListDisplay();


    // Resize observer for the main board area
    const mainBoardResizeObserver = new ResizeObserver(() => {
        const chessBoardArea = document.querySelector('.chess-board-area');
        if (!chessBoardArea || !board) return;

        const availableWidth = chessBoardArea.clientWidth - 302 - 30; // Adjusted for player info width + strength bars
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

        updateBoardGraphicsAndSquareListeners(); // Redraw board graphics which includes piece sizes

        // Reposition strength bars if they exist
        positionStrengthBars();
    });

    if (boardArea) mainBoardResizeObserver.observe(boardArea);

    window.addEventListener('resize', () => {
        mainBoardResizeObserver.disconnect();
        if (boardArea) mainBoardResizeObserver.observe(boardArea);

        // Reposition strength bars on window resize
        setTimeout(() => positionStrengthBars(), 100);
    });

    gameState.whiteClockDisplay = (gameState.whiteTimeSecs);
    gameState.blackClockDisplay = (gameState.blackTimeSecs);

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
    updateBoardGraphicsAndSquareListeners(); // Initial draw

    // Update UI elements based on initial perspective
    updateUIForPerspective();
}

export function flipBoard() {
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
    createBoardSquares(boardElement);

    updateBoardGraphicsAndSquareListeners(true);
}

function onMoveList(msg) {
    console.log(`onMoveList:${msg}`);
    // Movelist for game 20:
    //
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

    const lines = msg.split('\n');
    let parsingHeader = true;
    let moveDataStarted = false; // To identify when actual move lines begin

    // Regex patterns for parsing
    const playerRegex = /^([\w.-]+)\s\((\d+)\)\s+vs\.\s+([\w.-]+)\s\((\d+)\)\s+---\s+(.*)$/;
    const gameTypeRegex = /^(.*) (.*) match,\s+initial time:\s+(.*),\s+increment:\s+(.*)\.$/;
    //const statusRegex = /^{\s*(.*?)\s*}(?:\s*([0-1/2*-]+))?$/;

    //Might have a game between style 12 and the move list.
    const moves = [];
    listLoop: for (const line of lines) {
        if (line.trim() === "") continue;
        if (parsingHeader) {
            if (line.indexOf("Movelist for game") === 0) {
                const match = line.match(/Movelist for game (\d+):/);
                if (match) {
                    const gameNumber = parseInt(match[1], 10);
                    // Check if this moves list is for the current game
                    if (gameNumber === gameState.gameNumber) {
                        isForLoadedGame = true;
                    }
                } else {
                    break listLoop;
                }
            }
            // Transition from header to move list data
            if (line.startsWith("----  ----------------")) {
                parsingHeader = false;
                moveDataStarted = true;
            }
        } else if (moveDataStarted) {
            const moveMatch = line.match(/^\s*(\d+)\.\s+([a-zA-Z0-9+@#=O-]+)\s+\(([^)]+)\)(?:\s+([a-zA-Z0-9+@#=O-]+)\s+\(([^)]+)\))?/);
            //                                move#        whiteMove            whiteTIme           blackMove         blackTime

            if (!moveMatch) {
                // No match found - could be end of moves or invalid line
                console.log("No move match found for line:", line);
                continue;
            }

            switch (moveMatch.length) {
                case 4: // Only white move: ["1. e4 (0:05)", "1", "e4", "(0:05)"]
                    moves.push(moveMatch[2]);
                    continue;
                case 6: // Both moves: ["1. e4 (0:05) e5 (0:03)", "1", "e4", "(0:05)", "e5", "(0:03)"]
                    moves.push(moveMatch[2]); // White move
                    moves.push(moveMatch[4]); // Black move
                    continue;
                default:
                    console.log("Unexpected moveMatch length:", moveMatch.length, "for line:", line);
                    continue;
            }
        }
    }

    console.log("Parsed moves:", moves);
    console.log("Total moves parsed:", moves.length);

    // Safety check before calling prependMoveHistory
    if (!gameState.chessBoard) {
        console.error("gameState.chessBoard is not initialized");
        return;
    }

    if (moves.length > 0) {
        try {
            gameState.chessBoard.prependMoveHistory(moves, false);
            console.log("Successfully added move history");
        } catch (error) {
            console.error("Error in prependMoveHistory:", error);
            return;
        }
    } else {
        console.log("No moves to add to history");
    }

    updateECOLabelFromMoveList();
    refreshMoveListDisplay();
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
        updateBoardGraphicsAndSquareListeners();
    }
}
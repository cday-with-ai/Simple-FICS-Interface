import {
    applyChessRelatedPreferences,
    initChessSystem,
    onGameEnd,
    onGameMoves,
    onGameStart,
    onStyle12,
    onUnobserve
} from './chess.js';

import {createTab, routeMessageToTab} from './chat.js';

import {playSound} from './index.js';

import {regexIndexOf} from './utils.js';

// WebSocket and connection
const wsUrl = 'wss://www.freechess.org:5001';
let ws = null;
let isLoggingIn = false;

// Keep-alive timer variables
let keepAliveTimer = null;
let lastCommandTime = 0;
const KEEP_ALIVE_INTERVAL = 55 * 60 * 1000; // 55 minutes in milliseconds

const timesealConnect = "TIMESEAL2|openseal|simpleficsinterface|";
const timesealKey = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";

// DOM elements
const mainTextArea = document.getElementById('mainTextArea');
const mainInput = document.getElementById('mainInput');
const statusDiv = document.getElementById('status');
const followPlayer = {
    name: null, timestamp: null
};
const obsPlayer = {
    name: null, timestamp: null
};

// Message history for input fields
const messageHistory = {};
const messageHistoryPosition = {};
const MAX_HISTORY_LENGTH = 100;

// Preferences
let preferences = {
    pieceSet: 'cburnett',
    lightSquareColor: '#f0dab5',
    darkSquareColor: '#b58763',
    ficsUsername: '',
    ficsPassword: '',
    autoLogin: false,
    stayLoggedIn: false, // Keep connection alive by sending periodic commands
    channelTellsToTabs: true,
    directTellsToTabs: false,
    gameTellsToTabs: false,
    autoSwitchToNewTabs: true,
    flashTabsOnActivity: true,
    showStyle12Events: false
};

// Initialize FICS connection and setup
export function initFics() {
    connectWebSocket();
    loadPreferences();
    setupPreferencesMenu();
    setupMainInput();
}

function connectWebSocket() {
    ws = new WebSocket(wsUrl);
    ws.baseSend = ws.send;
    ws.send = (msg) => {
        msg = msg.trim();
        handleSentObserve(msg);
        handleSentFollow(msg);

        // Update the last command time for keep-alive tracking
        lastCommandTime = Date.now();

        msg = encodeTimeseal(msg.trim());
        return ws.baseSend(msg);
    }

    ws.addEventListener("message", (event) => {
        if (event.data instanceof Blob) { // Shouldn't happen, but it might be possible in exotic browsers.
            const reader = new FileReader();
            reader.onload = function () {
                routeMessage(reader.result);
            };
            reader.readAsText(event.data);
        } else {
            routeMessage(event.data);
        }
    });

    ws.onopen = () => {
        ws.send(timesealConnect)
        routeMessage('Connected\n');
        if (isAutoLoginEnabled()) {
            isLoggingIn = true;
        }
        // Initialize chess system now that ws is connected and preferences are loaded
        if (typeof initChessSystem === 'function') {
            initChessSystem(ws, preferences);
        } else {
            console.error("initChessSystem is not available from chess.js");
        }

        // Start keep-alive timer if enabled
        if (preferences.stayLoggedIn) {
            startKeepAliveTimer();
        }
    };

    ws.onerror = (error) => {
        routeMessage(`Error: ${JSON.stringify(error)}\n`);
        if (statusDiv) statusDiv.textContent = 'Error';
    };

    ws.onclose = () => {
        routeMessage('Disconnected\n');
        if (statusDiv) statusDiv.textContent = 'Disconnected';

        // Stop the keep-alive timer when disconnected
        stopKeepAliveTimer();

        ws = null;
        const reconnectTime = Date.now() + 5000;
        const checkTimeAndReconnect = () => {
            if (Date.now() >= reconnectTime) connectWebSocket();
            else requestAnimationFrame(checkTimeAndReconnect);
        };
        requestAnimationFrame(checkTimeAndReconnect);
    };
}

/**
 * Main function to route messages from FICS to the appropriate handlers
 * @param {string} msg - The raw message from FICS
 */
function routeMessage(msg) {
    // Handle timeseal acknowledgements
    msg = handleTimesealAcknowledgement(msg);
    msg = cleanupMessage(msg);

    handleLoginProcess(msg);
    handleFicsSessionStart(msg);

    handleNewGame(msg); //Playing and Obsing.
    msg = handleStyle12Message(msg);
    handleGameEnd(msg);
    handleIllegalMove(msg);
    handleDraw(msg);
    handleMovesList(msg);
    handleUnobserve(msg);

    const msgTrim = msg.trim();
    if (msgTrim === '' || msgTrim === 'fics%') return;

    let isMainConsoleMessage = handleChannelTell(msg);
    if (isMainConsoleMessage) {
        updateMainConsole(msg);
    }
}

/**
 * Handle messages sent by the user
 * @param msg The trimmed message to handle
 */
function handleSentObserve(msg) {
    let obsIndex = msg.indexOf("obs ");
    if (obsIndex !== 0) {
        obsIndex = msg.indexOf("observe ");
        if (obsIndex !== 0) {
            obsIndex = msg.indexOf("o ");
        }
    }

    if (obsIndex === 0) {
        const spaceIndex = msg.indexOf(" ");
        const player = msg.substring(spaceIndex + 1);
        if (player.match(/^[a-zA-Z]+$/)) {
            console.log(`Observing ${player}, orientation will match this player on the next game only.`);
            obsPlayer.name = player;
            obsPlayer.timestamp = Date.now();
            obsPlayer.gameNumber = null;
        } else {
            obsPlayer.name = null;
            obsPlayer.timestamp = null;
            obsPlayer.gameNumber = null;
        }
    }

    const unobsIndex = msg.indexOf("unobs");
    if (unobsIndex === 0) {
        console.log('Unobserving, clearing stored obs player info.');
        obsPlayer.name = null;
        obsPlayer.timestamp = null;
        obsPlayer.gameNumber = null;
    }
}

/**
 * Handle sent follow messages
 * @param msg The trimmed message to handle.
 */
function handleSentFollow(msg) {
    let followIndex = msg.indexOf("follow ");
    if (followIndex !== 0) {
        followIndex = msg.indexOf("fol ");
    }

    if (followIndex === 0) {
        const spaceIndex = msg.indexOf(" ");
        const player = msg.substring(spaceIndex + 1);
        if (player.match(/^[a-zA-Z]+$/)) {
            console.log(`Following ${player}, orientation will be for this player only until they are unfollowed.`);
            followPlayer.name = player;
            followPlayer.timestamp = Date.now();
        }
    }

    const unfollowIndex = msg.indexOf("unfollow");
    if (unfollowIndex === 0) {
        console.log('Unfollowing, clearing stored obs player info.');
        followPlayer.name = null;
        followPlayer.timestamp = null;
    }
}

/**
 * Handle timeseal acknowledgement messages and remove them from the message
 * @param {string} msg - The message to process
 * @returns {string} - The message with timeseal acknowledgements removed
 */
function handleTimesealAcknowledgement(msg) {
    let timesealAckIndex = msg.indexOf("[G]\0");
    while (timesealAckIndex !== -1) {
        ws.baseSend(encodeTimeseal(String.fromCharCode(2, 57)));
        msg = msg.substring(0, timesealAckIndex) + msg.substring(timesealAckIndex + 4);
        timesealAckIndex = msg.indexOf("[G]\0");
    }
    return msg;
}

/**
 * Clean up the message by normalizing line endings, removing bell characters, etc.
 * @param {string} msg - The message to clean up
 * @returns {string} - The cleaned up message
 */
function cleanupMessage(msg) {
    msg = msg.replaceAll("\n\r", "\n");
    msg = msg.replaceAll('\n\\', '\n');

    if (msg.includes("\u0007")) {
        playSound('alert');
        msg = msg.replaceAll("\u0007", "");
    }

    if (!msg.endsWith("\n")) msg += "\n";
    if (msg.startsWith("\n")) msg = msg.substring(1);

    return msg;
}

/**
 * Handle the login process if auto-login is enabled
 * @param {string} msg - The message to process
 * @returns {boolean} - True if login was handled, false otherwise
 */
function handleLoginProcess(msg) {
    if (!isLoggingIn || !preferences.autoLogin || !ws) {
        return false;
    }

    if (msg.toLowerCase().includes('login: ')) {
        ws.send(preferences.ficsUsername);
        return true;
    } else if (msg.toLowerCase().includes('password: ')) {
        try {
            const decodedPassword = atob(preferences.ficsPassword);
            ws.send(decodedPassword);
        } catch (e) {
            console.error('Error decoding password:', e);
            mainTextArea.innerHTML += processTextToHTML('Error decoding password: ' + e.message + '\n');
            if (mainTextArea) mainTextArea.scrollTop = mainTextArea.scrollHeight;
        }
        isLoggingIn = false;
        return true;
    }

    return false;
}

/**
 * Handle FICS session start by setting up preferences
 * @param {string} msg - The message to process
 * @returns {boolean} - True if session start was handled, false otherwise
 */
function handleFicsSessionStart(msg) {
    if (msg.includes('\n**** Starting FICS session as') && ws) {
        ws.send('set style 12');
        ws.send('set prompt');
        ws.send('set bell off');
        ws.send('set interface Simple FICS Interface');
        return true;
    }
    return false;
}

/**
 * Handle channel tell messages and route them to the appropriate tab
 * @param {string} msg - The message to process
 * @returns boolean true if main console message, otherwise false.
 */
function handleChannelTell(msg) {
    let isMainConsoleMessage = true;

    if (/^[a-zA-Z0-9*]+\([0-9]+\)\s*:\s/.test(msg)) { // Channel tell
        const parts = msg.match(/^([a-zA-Z0-9*]+)\(([0-9]+)\)\s*:\s*(.*)/);
        if (parts && parts.length > 2) {
            const channelNum = parts[2];
            if (preferences.channelTellsToTabs) {
                let tabId = "channel-" + channelNum;
                let tab = document.getElementById("tab-" + tabId);
                if (!tab) {
                    createTab("channel", channelNum);
                    if (preferences.autoSwitchToNewTabs) {
                        const tabLabel = document.getElementById("tab-label-" + tabId);
                        if (tabLabel) tabLabel.click();
                    }
                }
                isMainConsoleMessage = false;
                routeMessageToTab(tabId, msg.replace(/\nfics% $/, ""));
            } else {

            }
        }
    }

    return isMainConsoleMessage
}

/**
 * Handle new game messages for both observing and playing games.
 * @param msg The message.
 * @returns {boolean} True if a new game message was found and processed.
 */
function handleNewGame(msg) {
    const containsGameStart = msg.indexOf("Game ");
    if (containsGameStart === 0 || msg.charAt(containsGameStart - 1) === '\n') { // Observing a game (not playing).
        //You are now observing game 1.
        //Game 1: ArasanX (2783) exeComp (2722) rated standard 16 3
        //
        //fics%
        const gameStartIndex = containsGameStart;
        const gameEndIndex = msg.indexOf("\n", gameStartIndex + 6);
        const gameLine = msg.substring(gameStartIndex, gameEndIndex);

        const match = gameLine.match(/^Game (\d+): ([a-zA-Z0-9]+) \(([0-9+-]+)\) ([a-zA-Z0-9]+) \(([0-9+-]+)\) (rated|unrated) ([a-zA-Z0-9]+) (\d+) (\d+)$/);
        if (match) {
            playSound('start');
            const gameNum = parseInt(match[1], 10);
            const whiteName = match[2];
            const whiteRating = match[3];
            const blackName = match[4];
            const blackRating = match[5];
            const isRated = match[6] === 'rated';
            const gameType = match[7];
            const minutes = parseInt(match[8], 10);
            const increment = parseInt(match[9], 10);
            onGameStart(gameNum, whiteName, whiteRating, blackName, blackRating, isRated, gameType, minutes, increment);
            return true;
        }
    } else { //Player is creating a new game
        //Creating: GuestRTNW (++++) cacanita (++++) unrated blitz 2 12
        //{Game 51 (GuestRTNW vs. cacanita) Creating unrated blitz match.}
        //
        //
        //Game 51: A disconnection will be considered a forfeit.
        //fics%
        const creatingStart = msg.indexOf("Creating: ");
        if (creatingStart == 0 || msg.charAt(creatingStart - 1) === '\n') {
            const creatingEnd = msg.indexOf("\n", creatingStart + 10);
            const gameStart = msg.indexOf("{Game ", creatingEnd + 1);
            const gameEnd = msg.indexOf("\n", gameStart + 6);

            if (creatingEnd === -1 || gameStart === -1 || gameEnd === -1) {
                return false;
            }

            const creatingLine = msg.substring(creatingStart, creatingEnd);
            const gameLine = msg.substring(gameStart, gameEnd);

            const creatingMatch = creatingLine.match(/^Creating: ([a-zA-Z0-9]+) \(([0-9+-]+)\) ([a-zA-Z0-9]+) \(([0-9+-]+)\) (rated|unrated) ([a-zA-Z0-9]+) (\d+) (\d+)$/);
            const gameMatch = gameLine.match(/^{Game (\d+) \(([a-zA-Z0-9]+) vs. ([a-zA-Z0-9]+)\) (.*)}$/);

            if (creatingMatch && gameMatch) {
                playSound('start');
                const gameNum = parseInt(gameMatch[1], 10);
                const whiteName = creatingMatch[1];
                const whiteRating = creatingMatch[2];
                const blackName = creatingMatch[3];
                const blackRating = creatingMatch[4];
                const isRated = creatingMatch[5] === 'rated';
                const gameType = creatingMatch[6];
                const minutes = parseInt(creatingMatch[7], 10);
                const increment = parseInt(creatingMatch[8], 10);
                onGameStart(gameNum, whiteName, whiteRating, blackName, blackRating, isRated, gameType, minutes, increment);
                return true;
            }
        }
    }
    return false;
}

/**
 * Handle illegal move messages
 * @param {string} msg - The message to process
 * @returns {boolean} - True if an illegal move message was found and processed
 */
function handleIllegalMove(msg) {
    //Illegal move (b6a5).
    const index = msg.indexOf("Illegal move (");
    if (index !== -1 && index === 0 || msg.charAt(index - 1) === '\n') {
        playSound('illegal');
        return true;
    }
    return false;
}

/**
 * Handle Style12 messages and process them
 * @param {string} msg - The message to process
 * @returns {object} - Object with isMainConsoleMessage flag and possibly modified message
 */
function handleStyle12Message(msg) {
    let isMainConsoleMessage = true;

    let style12Start = msg.indexOf("<12>");
    while (style12Start === 0 || msg.charAt(style12Start - 1) === '\n') {
        const end = msg.indexOf("\n", style12Start + 5);
        const style12Block = end >= 0 ? msg.substring(style12Start, end) :  msg.substring(style12Start);
        onStyle12(style12Block);
        msg = msg.substring(0,style12Start) + msg.substring(end);
        style12Start = msg.indexOf("<12>");
    }
    return msg;
}

/**
 * Handle moves list messages
 * @param {string} msg - The message to process
 * @returns {boolean} - True if a moves list was found and processed
 */
function handleMovesList(msg) {
    const moveslistIndex = msg.indexOf('Movelist for game');
    if (moveslistIndex !== -1 && (moveslistIndex === 0 || msg.charAt(moveslistIndex - 1) === '\n')) {
        if (typeof onGameMoves === 'function') {
            onGameMoves(msg);
        } else {
            console.error("processMovesList not available from chess.js");
        }
        return true;
    }
    return false;
}

/**
 * Handle game end messages
 * @param {string} msg - The message to process
 * @returns {boolean} - True if a game end message was found and processed
 */
function handleGameEnd(msg) {
    const gameEndStart = msg.startsWith("{Game ");
    let gameEndString = null;

    if (!gameEndStart) {
        const index = msg.indexOf("\n{Game ");
        if (index != -1) {
            gameEndString = msg.substring(index + 7);
        }
    } else {
        gameEndString = msg.substring(6);
    }

    if (gameEndString != null) {
        playSound('end');
        onGameEnd(gameEndString);
        return true;
    }

    return false;
}

/**
 * Handle draw offers
 * @param msg The msg.
 * @returns {boolean} True if draw offer, false otherwise.
 */
function handleDraw(msg) {
    //GuestBGBB offers you a draw.
    const drawIndex = regexIndexOf(msg, /[a-zA-Z0-9]+ offers you a draw[.]/);
    if (drawIndex !== -1 && (drawIndex === 0 || msg.charAt(drawIndex - 1) === '\n')) {
        playSound('draw');
        return true;
    }
    return false;
}


/**
 * Handle unobserve messages
 * @param msg
 * @returns {boolean}
 */
function handleUnobserve(msg) {
    //Removing game 38 from observation list.
    var unobserveIndex = msg.indexOf("Removing game ");
    while (unobserveIndex !== -1 && (unobserveIndex === 0 || msg.charAt(unobserveIndex - 1) === '\n')) {
        var nextSpaceIndex = msg.indexOf(" ", unobserveIndex + 14);
        const gameNum = parseInt(msg.substring(unobserveIndex + 14, nextSpaceIndex), 10);
        if (gameNum) {
            obsPlayer.gameNumber = null;
            obsPlayer.timestamp = null;
            obsPlayer.name = null;
            onUnobserve(gameNum);

        }
        unobserveIndex = msg.indexOf("Removing game ", nextSpaceIndex);
    }
    if (unobserveIndex !== -1) {
        return true;
    }
    return false;
}

/**
 * Update the main console with the message if needed
 * @param {string} msg - The message to display
 */
function updateMainConsole(msg) {
    const autoScroll = mainTextArea.scrollHeight - mainTextArea.scrollTop <= mainTextArea.clientHeight + 10;
    mainTextArea.innerHTML += processTextToHTML(msg);
    if (autoScroll) mainTextArea.scrollTop = mainTextArea.scrollHeight;
}


function isAutoLoginEnabled() {
    return preferences.autoLogin === true && preferences.ficsUsername && preferences.ficsPassword;
}

function filterInvalid(msg) {
    var result = '';
    var filtered = "";
    for (var i = 0; i < msg.length; i++) {
        if (msg.charCodeAt(i) >= 32 && msg.charCodeAt(i) <= 126) result += msg.charAt(i);
        else filtered += msg.charAt(i);
    }
    if (filtered !== '') routeMessage('\nFiltered output: ' + filtered);
    return result;
}

function wrapInClassExceptPrompt(text, className) {
    var promptIndex = text.lastIndexOf('\nfics% ');
    if (promptIndex > 0) {
        return `<span class="${className}">${text.substring(0, promptIndex)}</span>${text.substring(promptIndex)}`;
    } else {
        return `<span class="${className}">${text}</span>`;
    }
}

export function processTextToHTML(text) {
    if (!text) return '';
    text = sanitizeHTML(text);
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    if (text.match(/Sent `(.+)`$/gm) != null) return wrapInClassExceptPrompt(text, 'sent-message');

    const channelMatch = text.match(/^([a-zA-Z0-9()*]+)\(([0-9]+)\):(.*)/gm);
    if (channelMatch != null) {
        const channelEnd = text.indexOf("):");
        if (channelEnd > 0) {
            var channelStart = text.lastIndexOf("(", channelEnd);
            if (channelStart >= 0 && channelStart < channelEnd) {
                const channelNum = text.substring(channelStart + 1, channelEnd);
                if (/^\d+$/.test(channelNum)) {
                    return wrapInClassExceptPrompt(text, 'channel-' + channelNum);
                }
            }
        }
    }
    if (text.match(/^([a-zA-Z0-9()*]+) tells you:(.*)/gm) != null) return wrapInClassExceptPrompt(text, 'direct-tell');
    if (text.match(/^([a-zA-Z0-9()*]+) shouts:(.*)/gm) != null) return wrapInClassExceptPrompt(text, 'shout-message');
    if (text.match(/^([a-zA-Z0-9()*]+) c-shouts:(.*)/gm) != null) return wrapInClassExceptPrompt(text, 'cshout-message');
    if (text.match(/^\*\*\*\* (.*)/gm) != null) return wrapInClassExceptPrompt(text, 'system-message');
    return text;
}

function sanitizeHTML(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

// Load preferences from local storage
function loadPreferences() {
    if (localStorage.getItem('chessPreferences')) {
        const storedPrefs = JSON.parse(localStorage.getItem('chessPreferences'));
        Object.assign(preferences, storedPrefs);
        console.log('Preferences loaded:', preferences);

        // Update UI to reflect loaded preferences
        document.getElementById('prefPieceSet').value = preferences.pieceSet;
        document.getElementById('prefLightSquare').value = preferences.lightSquareColor;
        document.getElementById('prefDarkSquare').value = preferences.darkSquareColor;
        document.getElementById('lightSquarePreview').style.backgroundColor = preferences.lightSquareColor;
        document.getElementById('darkSquarePreview').style.backgroundColor = preferences.darkSquareColor;
        document.getElementById('prefFicsUsername').value = preferences.ficsUsername || '';
        if (preferences.ficsPassword) {
            try {
                document.getElementById('prefFicsPassword').value = atob(preferences.ficsPassword);
            } catch (e) {
                console.error('Error decoding password:', e);
            }
        }
        document.getElementById('prefAutoLogin').checked = preferences.autoLogin;
        document.getElementById('prefStayLoggedIn').checked = preferences.stayLoggedIn;
        document.getElementById('prefChannelTellsToTabs').checked = preferences.channelTellsToTabs;
        document.getElementById('prefDirectTellsToTabs').checked = preferences.directTellsToTabs;
        document.getElementById('prefGameTellsToTabs').checked = preferences.gameTellsToTabs;
        document.getElementById('prefAutoSwitchToNewTabs').checked = preferences.autoSwitchToNewTabs;
        document.getElementById('prefFlashTabsOnActivity').checked = preferences.flashTabsOnActivity;
        document.getElementById('prefShowStyle12Events').checked = preferences.showStyle12Events;

        updatePieceSetPreview(preferences.pieceSet);
    } else {
        updatePieceSetPreview(preferences.pieceSet);
        console.log('No stored preferences found, using defaults:', preferences);
    }
    applyPreferences();
}

// Save preferences to local storage
function savePreferences() {
    // Update preferences object with current values from UI
    preferences.pieceSet = document.getElementById('prefPieceSet').value;
    preferences.lightSquareColor = document.getElementById('prefLightSquare').value;
    preferences.darkSquareColor = document.getElementById('prefDarkSquare').value;
    preferences.ficsUsername = document.getElementById('prefFicsUsername').value;
    const rawPassword = document.getElementById('prefFicsPassword').value;
    preferences.ficsPassword = rawPassword ? btoa(rawPassword) : '';
    preferences.autoLogin = document.getElementById('prefAutoLogin').checked;
    preferences.stayLoggedIn = document.getElementById('prefStayLoggedIn').checked;
    preferences.channelTellsToTabs = document.getElementById('prefChannelTellsToTabs').checked;
    preferences.directTellsToTabs = document.getElementById('prefDirectTellsToTabs').checked;
    preferences.gameTellsToTabs = document.getElementById('prefGameTellsToTabs').checked;
    preferences.autoSwitchToNewTabs = document.getElementById('prefAutoSwitchToNewTabs').checked;
    preferences.flashTabsOnActivity = document.getElementById('prefFlashTabsOnActivity').checked;
    preferences.showStyle12Events = document.getElementById('prefShowStyle12Events').checked;

    localStorage.setItem('chessPreferences', JSON.stringify(preferences));
    console.log('Preferences saved:', preferences);
    applyPreferences();
}

// Apply preferences
function applyPreferences() {
    // Call chess.js to apply chess-related preferences
    if (typeof applyChessRelatedPreferences === 'function') {
        applyChessRelatedPreferences();
    } else {
        console.warn("applyChessRelatedPreferences not available from chess.js");
    }

    // Apply stay logged in preference
    if (preferences.stayLoggedIn) {
        startKeepAliveTimer();
    } else {
        stopKeepAliveTimer();
    }
}

/**
 * Starts the keep-alive timer to send periodic commands to FICS
 */
function startKeepAliveTimer() {
    // Clear any existing timer first
    stopKeepAliveTimer();

    // Set the last command time to now
    lastCommandTime = Date.now();

    // Start a new timer
    keepAliveTimer = setInterval(() => {
        const currentTime = Date.now();
        const timeSinceLastCommand = currentTime - lastCommandTime;

        // If it's been more than the keep-alive interval since the last command, send a date command
        if (timeSinceLastCommand >= KEEP_ALIVE_INTERVAL && ws) {
            console.log("Sending keep-alive command to FICS");
            ws.send("date");
            lastCommandTime = currentTime;
        }
    }, 60000); // Check every minute

    console.log("Keep-alive timer started");
}

/**
 * Stops the keep-alive timer
 */
function stopKeepAliveTimer() {
    if (keepAliveTimer) {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
        console.log("Keep-alive timer stopped");
    }
}

// Function to update the piece set preview grid
function updatePieceSetPreview(pieceSet) {
    const pieceTypes = [
        {id: 'preview-bR', piece: 'bR'}, {id: 'preview-bN', piece: 'bN'},
        {id: 'preview-bB', piece: 'bB'}, {id: 'preview-bQ', piece: 'bQ'},
        {id: 'preview-bK', piece: 'bK'}, {id: 'preview-bP', piece: 'bP'},
        {id: 'preview-wP', piece: 'wP'}, {id: 'preview-wR', piece: 'wR'},
        {id: 'preview-wN', piece: 'wN'}, {id: 'preview-wB', piece: 'wB'},
        {id: 'preview-wQ', piece: 'wQ'}, {id: 'preview-wK', piece: 'wK'}
    ];
    pieceTypes.forEach(item => {
        const elements = document.querySelectorAll(`#${item.id}, .${item.id}`);
        elements.forEach(element => {
            if (element.tagName === 'IMG') {
                element.src = `pieces/${pieceSet}/${item.piece}.svg`;
            }
        });
    });
    // Special handling for multiple pawns if IDs are unique
    ['bP2', 'bP3', 'bP4', 'bP5'].forEach(pawnId => {
        const el = document.getElementById(`preview-${pawnId}`);
        if (el) el.src = `pieces/${pieceSet}/bP.svg`;
    });
    ['wP2', 'wP3', 'wP4', 'wP5'].forEach(pawnId => {
        const el = document.getElementById(`preview-${pawnId}`);
        if (el) el.src = `pieces/${pieceSet}/wP.svg`;
    });
}

// Timeseal encoding function
function encodeTimeseal(e) {
    let t = e.length;
    const n = new Uint8Array(t + 30);
    for (let t = 0; t < e.length; t++)
        n[t] = e.charCodeAt(t);
    n[t] = 24,
        t++;
    const o = (new Date).getTime()
        , A = Math.floor(o / 1e3)
        , s = (A % 1e4 * 1e3 + (o - 1e3 * A)).toString();
    for (let e = 0; e < s.length; e++)
        n[t + e] = s.charCodeAt(e);
    for (t += s.length,
             n[t] = 25,
             t++; t % 12 != 0;)
        n[t] = 49,
            t++;
    for (let e = 0; e < t; e += 12)
        n[e] ^= n[e + 11],
            n[e + 11] ^= n[e],
            n[e] ^= n[e + 11],
            n[e + 2] ^= n[e + 9],
            n[e + 9] ^= n[e + 2],
            n[e + 2] ^= n[e + 9],
            n[e + 4] ^= n[e + 7],
            n[e + 7] ^= n[e + 4],
            n[e + 4] ^= n[e + 7];
    for (let e = 0; e < t; e++) {
        const t = timesealKey.charCodeAt(e % 50);
        n[e] = ((128 | n[e]) ^ t) - 32
    }
    return n[t] = 128,
        t++,
        n[t] = 10,
        t++,
        n.slice(0, t)
}

// Export the WebSocket for other modules to use
export function getWebSocket() {
    return ws;
}

// Function to add a message to history
export function addToMessageHistory(inputId, message) {
    if (!message.trim()) return;
    if (!messageHistory[inputId]) {
        messageHistory[inputId] = [];
    }
    if (messageHistory[inputId].length > 0 &&
        messageHistory[inputId][messageHistory[inputId].length - 1] === message) {
        return;
    }
    messageHistory[inputId].push(message);
    if (messageHistory[inputId].length > MAX_HISTORY_LENGTH) {
        messageHistory[inputId].shift();
    }
    messageHistoryPosition[inputId] = messageHistory[inputId].length;
}

// Function to handle arrow key navigation
export function handleArrowKeys(event, inputElement) {
    const inputId = inputElement.id;
    if (!messageHistory[inputId]) messageHistory[inputId] = [];
    if (messageHistoryPosition[inputId] === undefined) {
        messageHistoryPosition[inputId] = messageHistory[inputId].length;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        if (messageHistoryPosition[inputId] === messageHistory[inputId].length) {
            inputElement._currentInput = inputElement.value;
        }
        if (messageHistoryPosition[inputId] > 0) {
            messageHistoryPosition[inputId]--;
            inputElement.value = messageHistory[inputId][messageHistoryPosition[inputId]];
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (messageHistoryPosition[inputId] < messageHistory[inputId].length) {
            messageHistoryPosition[inputId]++;
            if (messageHistoryPosition[inputId] === messageHistory[inputId].length) {
                inputElement.value = inputElement._currentInput || '';
            } else {
                inputElement.value = messageHistory[inputId][messageHistoryPosition[inputId]];
            }
        }
    }
}


// Hamburger menu functionality
function setupPreferencesMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const preferencesPanel = document.getElementById('preferencesPanel');
    const saveButton = document.getElementById('savePreferences');
    const prefPieceSetEl = document.getElementById('prefPieceSet');
    const prefLightSquareEl = document.getElementById('prefLightSquare');
    const prefDarkSquareEl = document.getElementById('prefDarkSquare');
    const lightSquarePreviewEl = document.getElementById('lightSquarePreview');
    const darkSquarePreviewEl = document.getElementById('darkSquarePreview');
    const prefCategories = document.querySelectorAll('.pref-category');
    const prefContents = document.querySelectorAll('.pref-content');

    hamburgerMenu.addEventListener('click', function (event) {
        preferencesPanel.classList.toggle('show');
        if (preferencesPanel.classList.contains('show')) {
            updatePieceSetPreview(prefPieceSetEl.value);
            // Default to FICS tab or last active, for now FICS
            prefCategories.forEach(cat => cat.classList.remove('active'));
            const ficsCategory = document.querySelector('.pref-category[data-category="fics"]');
            if (ficsCategory) ficsCategory.classList.add('active');
            prefContents.forEach(content => content.classList.remove('active'));
            const ficsContent = document.getElementById('pref-fics');
            if (ficsContent) ficsContent.classList.add('active');
        }
        event.stopPropagation();
    });

    document.addEventListener('click', function (event) {
        if (!preferencesPanel.contains(event.target) && !hamburgerMenu.contains(event.target) && event.target !== hamburgerMenu) {
            preferencesPanel.classList.remove('show');
        }
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && preferencesPanel.classList.contains('show')) {
            preferencesPanel.classList.remove('show');
        }
    });

    prefCategories.forEach(category => {
        category.addEventListener('click', function () {
            prefCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            prefContents.forEach(content => content.classList.remove('active'));
            const categoryName = this.getAttribute('data-category');
            const activeContent = document.getElementById(`pref-${categoryName}`);
            if (activeContent) activeContent.classList.add('active');
        });
    });

    prefLightSquareEl.addEventListener('input', function () {
        lightSquarePreviewEl.style.backgroundColor = this.value;
    });
    prefDarkSquareEl.addEventListener('input', function () {
        darkSquarePreviewEl.style.backgroundColor = this.value;
    });
    prefPieceSetEl.addEventListener('change', function () {
        updatePieceSetPreview(this.value);
    });

    saveButton.addEventListener('click', function () {
        savePreferences();
        preferencesPanel.classList.remove('show');
    });
}

export function getObservedPlayer() {
    return obsPlayer;
}

export function getFollowedPlayer() {
    return followPlayer;
}

// Setup main input event listeners
function setupMainInput() {
    if (!mainInput) return;

    mainInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            const message = mainInput.value;
            if (ws) ws.send(filterInvalid(message));
            addToMessageHistory('mainInput', message);
            mainInput.value = '';
        }
    });

    mainInput.addEventListener('keydown', (event) => {
        handleArrowKeys(event, mainInput);
    });
}


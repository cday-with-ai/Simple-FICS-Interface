// Import chess system functions
import {
    applyChessRelatedPreferences,
    initChessSystem,
    processGameCreationMessage,
    processGameEndMessage,
    processMovesList,
    processStyle12Message,
    processUnobserveMessage
} from './chess.js';

import {createTab, routeMessageToTab} from './chat.js';

import {playSound} from './index.js';

import {regexIndexOf} from './utils.js';

// WebSocket and connection
const wsUrl = 'wss://www.freechess.org:5001';
let ws = null;
let isLoggingIn = false;

const timesealConnect = "TIMESEAL2|openseal|simpleficsinterface|";
const timesealKey = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";

// DOM elements
const mainTextArea = document.getElementById('mainTextArea');
const mainInput = document.getElementById('mainInput');
const statusDiv = document.getElementById('status');


// FICS command regex patterns for validation
const ficsCommandRegex = [
    /^(examine$)|(examine [a-zA-Z0-9]+$)|(ex [a-zA-Z0-9]+$)/i,
    /^(unexamine$)|(unexamine [a-zA-Z0-9]+$)|(unex$)|(unex [a-zA-Z0-9]+$)/i,
    /^(history$)|(hi$)|(history [a-zA-Z0-9]+$)|(hi [a-zA-Z0-9]+$)/i,
    /^(finger$)|(fi$)|(finger [a-zA-Z0-9]+$)|(fi [a-zA-Z0-9]+$)/i,
    /^(match [a-zA-Z0-9]+$)|(m [a-zA-Z0-9]+$)/i,
    /^(observe$)|(obs$)|(observe [a-zA-Z0-9]+$)|(obs [a-zA-Z0-9]+$)/i,
    /^(unobserve$)|(unobs$)|(unobserve [a-zA-Z0-9]+$)|(unobs [a-zA-Z0-9]+$)/i,
    /^([+-]censor [a-zA-Z0-9]+$)/i,
    /^(seek [a-zA-Z0-9]+ [a-zA-Z0-9]+ [a-zA-Z0-9]+$)/i,
    /^(play [0-9]+$)/i,
    /^(tell [a-zA-Z0-9]+ .*$)|(tell [a-zA-Z0-9]+$)|(t [a-zA-Z0-9]+ .*$)|(t [a-zA-Z0-9]+$)/i,
    /^(kibitz [a-zA-Z0-9]+ .*$)|(kibitz [a-zA-Z0-9]+$)|(kib [a-zA-Z0-9]+ .*$)|(kib [a-zA-Z0-9]+$)/i,
    /^(whisper [a-zA-Z0-9]+ .*$)|(whisper [a-zA-Z0-9]+$)/i,
    /^(message .*$)|(messages$)/i
];

// Preferences
let preferences = {
    pieceSet: 'cburnett',
    lightSquareColor: '#f0dab5',
    darkSquareColor: '#b58763',
    ficsUsername: '',
    ficsPassword: '',
    autoLogin: false,
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

// Message history for input fields
const messageHistory = {};
const messageHistoryPosition = {};
const MAX_HISTORY_LENGTH = 100;

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

function connectWebSocket() {
    ws = new WebSocket(wsUrl);
    ws.baseSend = ws.send;
    ws.send = (msg) => {
        console.log(`Sent \"${msg.trim()}\"`);
        if (mainTextArea) {
            mainTextArea.innerHTML += processTextToHTML(`Sent \`${msg.trim()}\`\n`);
            mainTextArea.scrollTop = mainTextArea.scrollHeight;
        }
        msg = encodeTimeseal(msg.trim());
        return ws.baseSend(msg);
    }

    ws.addEventListener("message", (event) => {
        if (event.data instanceof Blob) {
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
    };

    ws.onerror = (error) => {
        routeMessage(`Error: ${JSON.stringify(error)}\n`);
        if (statusDiv) statusDiv.textContent = 'Error';
    };

    ws.onclose = () => {
        routeMessage('Disconnected\n');
        if (statusDiv) statusDiv.textContent = 'Disconnected';
        ws = null;
        const reconnectTime = Date.now() + 5000;
        const checkTimeAndReconnect = () => {
            if (Date.now() >= reconnectTime) connectWebSocket();
            else requestAnimationFrame(checkTimeAndReconnect);
        };
        requestAnimationFrame(checkTimeAndReconnect);
    };
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

    var channelMatch = text.match(/^([a-zA-Z0-9()*]+)\(([0-9]+)\):(.*)/gm);
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

/**
 * Handle timeseal acknowledgement messages and remove them from the message
 * @param {string} msg - The message to process
 * @returns {string} - The message with timeseal acknowledgements removed
 */
function handleTimesealAcknowledgement(msg) {
    let timesealAckIndex = msg.indexOf("[G]\0");
    while (timesealAckIndex != -1) {
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
 * Extract and process game creation messages
 * @param {string} msg - The message to process
 * @returns {boolean} - True if a game creation message was found and processed
 */
function handleGameCreation(msg) {
    // Handle game creation messages
    const containsGameStart = msg.startsWith("Creating: ");
    let gameStartStr = null;

    if (containsGameStart) {
        gameStartStr = msg.substring(10);
    } else {
        const index = msg.indexOf("\nCreating: ");
        if (index != -1) {
            gameStartStr = msg.substring(index + 11);
        } else {
            if (msg.startsWith("Game ")) {
                const colonIndex = msg.indexOf(":", 5);
                if (colonIndex != -1) {
                    gameStartStr = msg.substring(colonIndex + 1);
                }
            } else {
                const index = msg.indexOf("\nGame ");
                if (index != -1) {
                    const colonIndex = msg.indexOf(":", index + 6);
                    if (colonIndex != -1) {
                        gameStartStr = msg.substring(colonIndex + 1);
                    }
                }
            }
        }
    }

    if (gameStartStr != null) {
        playSound('start');
        processGameCreationMessage(gameStartStr.trim());
        return true;
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
    if (index != -1 && index == 0 || msg.charAt(index - 1) == '\n') {
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

    const style12Start = msg.startsWith("<12>") ? 0 : msg.lastIndexOf("\n<12>");
    if (style12Start >= 0) {
        const end = msg.indexOf("\n", style12Start + (msg.startsWith("<12>") ? 0 : 1));
        const style12Block = end >= 0 ?
            msg.substring(style12Start + (msg.startsWith("<12>") ? 0 : 1), end) :
            msg.substring(style12Start + (msg.startsWith("<12>") ? 0 : 1));

        processStyle12Message(style12Block);

        if (!preferences.showStyle12Events) {
            // Remove the Style12 line from the message to be printed in the console
            let beforeStyle12 = msg.substring(0, style12Start + (msg.startsWith("<12>") ? 0 : 1));
            let afterStyle12 = end >= 0 ? msg.substring(end + 1) : "";
            msg = beforeStyle12 + afterStyle12;
            if (msg.trim() === "" || msg.trim() === "fics%") {
                isMainConsoleMessage = false;
            }
        }

        return { isMainConsoleMessage, msg, processed: true };
    }

    return { isMainConsoleMessage, msg, processed: false };
}

/**
 * Handle moves list messages
 * @param {string} msg - The message to process
 * @returns {boolean} - True if a moves list was found and processed
 */
function handleMovesList(msg) {
    const moveslistIndex = msg.indexOf('Movelist for game');
    if (moveslistIndex != -1 && (moveslistIndex == 0 || msg.charAt(moveslistIndex - 1) == '\n')) {
        if (typeof processMovesList === 'function') {
            processMovesList(msg);
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
        processGameEndMessage(gameEndString);
        return true;
    }

    return false;
}

function handleDraw(msg) {
    //GuestBGBB offers you a draw.
    const drawIndex = regexIndexOf(msg, /[a-zA-Z0-9]+ offers you a draw[.]/);
    if (drawIndex != -1 && (drawIndex == 0 || msg.charAt(drawIndex - 1) == '\n')) {
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
    while (unobserveIndex != -1 && (unobserveIndex == 0 || msg.charAt(unobserveIndex - 1) == '\n')) {
        var nextSpaceIndex = msg.indexOf(" ", unobserveIndex + 14);
        const gameNum = parseInt(msg.substring(unobserveIndex + 14, nextSpaceIndex),10);
        if (gameNum) {
            processUnobserveMessage(gameNum);
        }
        unobserveIndex = msg.indexOf("Removing game ", nextSpaceIndex);
    }
    if (unobserveIndex != -1) {
        return true;
    }
    return false;
}

/**
 * Update the main console with the message if needed
 * @param {string} msg - The message to display
 * @param {boolean} isMainConsoleMessage - Whether to display in main console
 * @param {boolean} isFicsPrompt - Whether the message is just a FICS prompt
 */
function updateMainConsole(msg, isFicsPrompt) {
    if (msg.trim() !== '') {
        const consoleEndsWithPrompt = mainTextArea.innerHTML.endsWith('fics% ');
        if (!(isFicsPrompt && consoleEndsWithPrompt)) {
            const autoScroll = mainTextArea.scrollHeight - mainTextArea.scrollTop <= mainTextArea.clientHeight + 10;
            mainTextArea.innerHTML += processTextToHTML(msg);
            if (autoScroll) mainTextArea.scrollTop = mainTextArea.scrollHeight;
        }
    }
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

    let isMainConsoleMessage = handleChannelTell(msg);
    handleGameCreation(msg);

    const style12Result = handleStyle12Message(msg);
    isMainConsoleMessage = style12Result.isMainConsoleMessage;
    msg = style12Result.msg;

    handleGameEnd(msg);
    handleIllegalMove(msg);
    handleDraw(msg);
    handleMovesList(msg);
    handleUnobserve(msg);

    const isFicsPrompt = msg.trim() === 'fics%';
    if (isMainConsoleMessage) {
        updateMainConsole(msg, isMainConsoleMessage, isFicsPrompt);
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

// Export preferences for other modules to use
export function getPreferences() {
    return preferences;
}

// Export FICS command regex for chat.js to use
export function getFicsCommandRegex() {
    return ficsCommandRegex;
}

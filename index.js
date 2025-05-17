// Import chess system functions
import {
    initChessSystem,
    processStyle12Message,
    processMovesList,
    processGameEndMessage,
    processGameCreationMessage,
    applyChessRelatedPreferences,
    createChessBoardSquares // Specifically for createGameTab
} from './chess.js';


// WebSocket and connection
const wsUrl = 'wss://www.freechess.org:5001';
let ws = null;
let isLoggingIn = false;
let currentView = 'both'; // Default view mode

// Message history for input fields
const messageHistory = {};
const messageHistoryPosition = {};
const MAX_HISTORY_LENGTH = 100;

const timesealConnect = "TIMESEAL2|openseal|simpleficsinterface|";
const timesealKey = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";

// DOM elements
const mainTextArea = document.getElementById('mainTextArea');
const mainInput = document.getElementById('mainInput');
const statusDiv = document.getElementById('status'); // Note: gameStatus is handled by chess.js
const tabSet = document.getElementById('tabset');
const tabs = document.getElementById('tabs');
const topDivider = document.getElementById('topDivider');
const rightDivider = document.getElementById('rightDivider');
const chessBoardArea = document.querySelector('.chess-board-area'); // chess.js will populate this
const rightContent = document.querySelector('.right-content');
const mainConsole = document.querySelector('.main-console');
const chatTabsContainer = document.querySelector('.chat-tabs-container');

const ficsCommandRegex = [/^(history$)|(history [a-zA-Z0-9]+$)/gm,
    /^(examine$)|(examine [a-zA-Z0-9]+$)/gm, /^(ex$)|(ex [a-zA-Z0-9]+$)/gm,
    /^(unexamine$)|(unexamine [a-zA-Z0-9]+$)/gm, /^(unex$)|(unex [a-zA-Z0-9]+$)/gm,
    /^(history$)|(history [a-zA-Z0-9]+$)/gm, /^(hi$)|(hi [a-zA-Z0-9]+$)/gm,
    /^(match .*$)/gm, /^m .*$/gm,
    /^(observe$)|(observe [a-zA-Z0-9]+$)/gm, /^(obs$)|(obs [a-zA-Z0-9]+$)/gm,
    /^(unobserve$)|(unobserve [a-zA-Z0-9]+$)/gm, /^(unobs$)|(unobs [a-zA-Z0-9]+$)/gm,
    /^(tell [a-zA-Z0-9]+ .*$)|(t [a-zA-Z0-9]+ .*$)/gm,
    /^message .*$/gm];

// Audio elements (Only non-chess specific ones, or ones triggered by general messages)
const bellAudio = new Audio('sounds/Alert.wav');
// Chess related audio (moveAudio, captureAudio, gameStartAudio, gameEndAudio) are in chess.js

// Chess game variables - MOVED to chess.js

// UI state variables
let activeResizer = null;

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
    showStyle12Events: false // This will be read by chess.js via the prefs object
};

// currentPieceSet, lightSquareColor, darkSquareColor - These are effectively managed by chess.js via `prefs`

// Game relation enum - MOVED to chess.js

// Global Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const randomNumber = Math.floor(Math.random() * 1000000000); // Generate a random number

    // Process stylesheet links
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        if (link.href && !link.href.includes('fonts.googleapis.com')) { // Exclude external fonts like Google Fonts
            if (link.href.includes('?v=')) {
                // If ?v= already exists, replace its value
                link.href = link.href.replace(/(\?v=)[^&]+/, '$1' + randomNumber);
            } else if (link.href.includes('?')) {
                // If other query parameters exist, append &v=
                link.href += '&v=' + randomNumber;
            } else {
                // Otherwise, append ?v=
                link.href += '?v=' + randomNumber;
            }
        }
    });

    // Process script tags
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        // Exclude external scripts like CDNs if they don't already have a ?v= parameter or if you don't want to modify them
        if (script.src && !script.src.includes('cdnjs.cloudflare.com')) {
            if (script.src.includes('?v=')) {
                // If ?v= already exists, replace its value
                script.src = script.src.replace(/(\?v=)[^&]+/, '$1' + randomNumber);
            } else if (script.src.includes('?')) {
                // If other query parameters exist, append &v=
                script.src += '&v=' + randomNumber;
            } else {
                // Otherwise, append ?v=
                script.src += '?v=' + randomNumber;
            }
        }
    });

    const metaBuildTime = document.createElement('meta');
    metaBuildTime.name = 'build-time';
    metaBuildTime.content = new Date().toISOString();
    document.head.appendChild(metaBuildTime);
});

// Function to add a message to history
function addToMessageHistory(inputId, message) {
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
function handleArrowKeys(event, inputElement) {
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

// Main input event listeners
mainInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        const message = mainInput.value;
        if (ws) ws.send(filterInvalid(message)); // Check ws exists
        addToMessageHistory('mainInput', message);
        mainInput.value = '';
    }
});
mainInput.addEventListener('keydown', (event) => {
    handleArrowKeys(event, mainInput);
});

// Horizontal divider
topDivider.addEventListener('mousedown', function (e) {
    if (e.target === topDivider) {
        e.preventDefault();
        activeResizer = 'horizontal';
        document.addEventListener('mousemove', resizeDividers);
        document.addEventListener('mouseup', stopResize);
    }
});

// Vertical divider
rightDivider.addEventListener('mousedown', function (e) {
    if (e.target === rightDivider) {
        e.preventDefault();
        activeResizer = 'vertical';
        rightDivider.classList.add('dragging');
        document.addEventListener('mousemove', resizeDividers);
        document.addEventListener('mouseup', stopResize);
    }
});

window.onload = function () {
    // testClockParsing(); // MOVED to chess.js and made internal
    connectWebSocket(); // ws will be initialized here
    loadPreferences();  // preferences will be loaded here
    // initChessSystem needs ws and preferences, so call after they are ready
    // Defer chess system initialization until WebSocket is connected and preferences are loaded.
    // This will be handled in ws.onopen or after loadPreferences if ws is already open.
    setupPreferencesMenu();
    updateTabsVisibility();
    setupViewToggle();
    setupConsoleResizeObserver();
    // initializeChessBoard(); // MOVED to chess.js, will be called by initChessSystem
};


// Function to set up console resize observer
function setupConsoleResizeObserver() {
    const consoleResizeObserver = new ResizeObserver(entries => {
        const mainConsoleEl = document.querySelector('.main-console');
        const chatTabsContainerEl = document.querySelector('.chat-tabs-container');
        if (!mainConsoleEl && !chatTabsContainerEl) return;

        let availableWidth = 0;
        let availableHeight = 0;
        if (mainConsoleEl) {
            availableWidth = Math.max(availableWidth, mainConsoleEl.clientWidth);
            availableHeight = Math.max(availableHeight, mainConsoleEl.clientHeight);
        }
        if (chatTabsContainerEl) {
            availableWidth = Math.max(availableWidth, chatTabsContainerEl.clientWidth);
            // availableHeight = Math.max(availableHeight, chatTabsContainerEl.clientHeight); // Height is shared
        }
        const widthScale = availableWidth / 800;
        const heightScale = availableHeight / 600; // This might need adjustment based on layout
        const scale = Math.min(widthScale, heightScale);
        const consoleFontScale = Math.max(0.75, Math.min(1.5, scale));
        document.documentElement.style.setProperty('--console-font-scale', consoleFontScale);
    });

    const mainConsoleEl = document.querySelector('.main-console');
    const chatTabsContainerEl = document.querySelector('.chat-tabs-container');
    if (mainConsoleEl) consoleResizeObserver.observe(mainConsoleEl);
    if (chatTabsContainerEl) consoleResizeObserver.observe(chatTabsContainerEl);
}

// Function to set up view toggle radio buttons
function setupViewToggle() {
    const viewChessRadio = document.getElementById('view-chess');
    const viewBothRadio = document.getElementById('view-both');
    const viewChatRadio = document.getElementById('view-chat');

    if (!viewChessRadio || !viewBothRadio || !viewChatRadio) {
        console.error('View toggle radio buttons not found');
        return;
    }
    updateViewMode(currentView); // Set initial
    viewChessRadio.addEventListener('change', function () {
        if (this.checked) updateViewMode('chess');
    });
    viewBothRadio.addEventListener('change', function () {
        if (this.checked) updateViewMode('both');
    });
    viewChatRadio.addEventListener('change', function () {
        if (this.checked) updateViewMode('chat');
    });
}

// Function to update the view mode
function updateViewMode(mode) {
    currentView = mode;
    const chessBoardAreaEl = document.querySelector('.chess-board-area');
    const rightContentEl = document.querySelector('.right-content');
    const topDividerEl = document.getElementById('topDivider');
    const rightDividerEl = document.getElementById('rightDivider');
    const mainConsoleEl = document.querySelector('.main-console');
    // const chatTabs = document.querySelector('.chat-tabs'); // This class isn't consistently used for the container

    const tabElements = document.querySelectorAll('#tabs .tab');

    switch (mode) {
        case 'chess':
            if (chessBoardAreaEl) {
                chessBoardAreaEl.style.display = 'flex';
                chessBoardAreaEl.style.flexBasis = '100%';
            }
            if (rightContentEl) rightContentEl.style.display = 'none';
            if (topDividerEl) topDividerEl.style.display = 'none';
            if (rightDividerEl) rightDividerEl.style.display = 'none';
            requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
            break;
        case 'both':
            if (chessBoardAreaEl) {
                chessBoardAreaEl.style.display = 'flex';
                chessBoardAreaEl.style.flexBasis = '50%';
            }
            if (rightContentEl) rightContentEl.style.display = 'flex';
            if (topDividerEl) {
                topDividerEl.style.display = 'block'; // Changed from flex to block
                topDividerEl.style.left = '49%';
            }
            if (rightDividerEl) {
                rightDividerEl.style.display = tabElements.length > 0 ? 'block' : 'none'; // Changed from flex to block
                rightDividerEl.style.top = '70%'; // Default, might be overridden by user drag
            }
            if (mainConsoleEl) mainConsoleEl.style.flexBasis = '70%'; // Or whatever the default split is
            // if (chatTabs) chatTabs.style.flexBasis = '30%';
            requestAnimationFrame(() => {
                window.dispatchEvent(new Event('resize'));
                scrollConsolesToBottom();
            });
            break;
        case 'chat':
            if (chessBoardAreaEl) chessBoardAreaEl.style.display = 'none';
            if (rightContentEl) rightContentEl.style.display = 'flex';
            if (topDividerEl) topDividerEl.style.display = 'none';
            if (rightDividerEl) {
                rightDividerEl.style.display = tabElements.length > 0 ? 'block' : 'none'; // Changed from flex to block
                rightDividerEl.style.top = '75%';
            }
            if (mainConsoleEl) mainConsoleEl.style.flexBasis = '75%';
            // if (chatTabs) chatTabs.style.flexBasis = '25%';
            requestAnimationFrame(scrollConsolesToBottom);
            break;
    }
}


function resizeDividers(e) {
    const chessBoardAreaEl = document.querySelector('.chess-board-area');
    const rightContentEl = document.querySelector('.right-content');
    const mainConsoleEl = document.querySelector('.main-console');
    const chatTabsContainerEl = document.querySelector('.chat-tabs-container'); // Use the correct selector

    if (activeResizer === 'horizontal') {
        const container = document.querySelector('.top-section');
        if (!container || !chessBoardAreaEl || !topDivider) return;
        const containerRect = container.getBoundingClientRect();
        let percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        percentage = Math.max(30, Math.min(70, percentage));
        chessBoardAreaEl.style.flexBasis = `${percentage}%`;
        topDivider.style.left = `${percentage - 1}%`; // Adjust based on divider width
    } else if (activeResizer === 'vertical') {
        if (!rightContentEl || !mainConsoleEl || !chatTabsContainerEl || !rightDivider) return;
        const containerRect = rightContentEl.getBoundingClientRect();
        let percentage = ((e.clientY - containerRect.top) / containerRect.height) * 100;
        percentage = Math.max(30, Math.min(70, percentage));
        mainConsoleEl.style.flexBasis = `${percentage}%`;
        chatTabsContainerEl.style.flexBasis = `${100 - percentage}%`; // Ensure it sums to 100%
        rightDivider.style.top = `${percentage}%`;
        document.documentElement.style.setProperty('--vertical-divider-position', `${percentage}%`);
    }
    if (mainTextArea) mainTextArea.scrollTop = mainTextArea.scrollHeight;
}

function scrollConsolesToBottom() {
    requestAnimationFrame(() => {
        if (mainTextArea) mainTextArea.scrollTop = mainTextArea.scrollHeight;
        const tabTextAreas = document.querySelectorAll('.tab-text-area');
        tabTextAreas.forEach(textArea => textArea.scrollTop = textArea.scrollHeight);
        // Active tab content scrolling might be redundant if individual text areas are scrolled
    });
}

function stopResize() {
    const rightDividerEl = document.getElementById('rightDivider');
    if (rightDividerEl) rightDividerEl.classList.remove('dragging');
    activeResizer = null;
    document.removeEventListener('mousemove', resizeDividers);
    document.removeEventListener('mouseup', stopResize);
    requestAnimationFrame(() => requestAnimationFrame(scrollConsolesToBottom)); // Double RAF for layout updates
}

// Load preferences from local storage
function loadPreferences() {
    if (localStorage.getItem('chessPreferences')) {
        const storedPrefs = JSON.parse(localStorage.getItem('chessPreferences'));
        Object.assign(preferences, storedPrefs); // Update global preferences object
        console.log('Preferences loaded:', preferences);

        // Update UI to reflect loaded preferences (non-chess parts)
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

        updatePieceSetPreview(preferences.pieceSet); // This is UI for prefs panel
        // applyPreferences(); // This will now call chess.js for board parts
    } else {
        // Initialize UI with default preferences (non-chess parts)
        // ... (similar to above, setting default values from `preferences` object)
        updatePieceSetPreview(preferences.pieceSet);
        console.log('No stored preferences found, using defaults:', preferences);
    }
    applyPreferences(); // Apply all preferences (including chess ones via chess.js)
}

// Save preferences to local storage
function savePreferences() {
    // Update preferences object with current values from UI (non-chess parts directly)
    preferences.pieceSet = document.getElementById('prefPieceSet').value; // Chess related, but UI is here
    preferences.lightSquareColor = document.getElementById('prefLightSquare').value; // Chess related
    preferences.darkSquareColor = document.getElementById('prefDarkSquare').value; // Chess related
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
    applyPreferences(); // Re-apply all, including to chess.js
}

// Apply preferences
function applyPreferences() {
    // Non-chess preferences can be applied here if any
    // ...

    // Call chess.js to apply chess-related preferences
    if (typeof applyChessRelatedPreferences === 'function') {
        applyChessRelatedPreferences(); // This function is now imported from chess.js
    } else {
        console.warn("applyChessRelatedPreferences not available from chess.js");
    }
}


function connectWebSocket() {
    ws = new WebSocket(wsUrl);
    ws.baseSend = ws.send;
    ws.send = (msg) => {
        console.log(`Sent \"${msg.trim()}\"`); // Trim for cleaner log
        if (mainTextArea) { // Check if mainTextArea is available
            mainTextArea.innerHTML += processTextToHTML(`Sent \`${msg.trim()}\`\n`);
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
            isLoggingIn = true; // FICS login sequence will be handled in routeMessage
        }
        // Initialize chess system now that ws is connected and preferences are loaded (or defaults used)
        if (typeof initChessSystem === 'function') {
            initChessSystem(ws, preferences); // Pass ws and current preferences
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

function processTextToHTML(text) {
    if (!text) return '';
    text = sanitizeHTML(text);
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    if (text.match(/Sent `(.+)`$/gm) != null) return wrapInClassExceptPrompt(text, 'sent-message');

    var channelMatch = text.match(/^([a-zA-Z0-9()*]+)\(([0-9]+)\):(.*)/gm);
    if (channelMatch != null) {
        const channelEnd = text.indexOf("):");
        if (channelEnd > 0) {
            var channelStart = text.lastIndexOf("(", channelEnd); // Find closest opening parenthesis
            if (channelStart >= 0 && channelStart < channelEnd) { // Ensure it's before channelEnd
                const channelNum = text.substring(channelStart + 1, channelEnd);
                if (/^\d+$/.test(channelNum)) { // Check if it's a number
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

function inactiveAllTabs() {
    const allTabContents = document.querySelectorAll("#tabset .tab-content");
    allTabContents.forEach(tc => {
        tc.classList.remove("tab-content-active");
        tc.classList.add("tab-content-inactive");
        tc.style.display = 'none';
    });
    const allTabs = document.querySelectorAll("#tabs .tab");
    allTabs.forEach(t => {
        t.classList.remove("tab-active");
        t.classList.add("tab-inactive");
    });
}

function inactiveAllChessTabs() { // This might become obsolete or change if chess tabs are managed differently
    const activeTabContents = document.querySelectorAll("#chessTabset .tab-content"); // Assuming #chessTabset exists
    activeTabContents.forEach(tc => {
        tc.classList.remove("tab-content-active");
        tc.classList.add("tab-content-inactive");
    });
    const activeTabs = document.querySelectorAll("#chessTabs .tab"); // Assuming #chessTabs exists
    activeTabs.forEach(t => {
        t.classList.remove("tab-active");
        t.classList.add("tab-inactive");
    });
}

function updateTabsVisibility() {
    const tabElements = document.querySelectorAll('#tabs .tab');
    const rightDividerEl = document.getElementById('rightDivider');
    const mainConsoleEl = document.querySelector('.main-console');
    const chatTabsContainerEl = document.querySelector('.chat-tabs-container');

    if (!rightDividerEl || !mainConsoleEl || !chatTabsContainerEl) return;

    if (tabElements.length > 0) {
        rightDividerEl.style.display = 'block'; // Changed from flex
        mainConsoleEl.style.flex = '0 0 75%'; // Or use flex-basis
        chatTabsContainerEl.style.display = 'flex';
        rightDividerEl.style.top = mainConsoleEl.style.flexBasis; // Align with bottom of main console
        // requestAnimationFrame(() => window.dispatchEvent(new Event('resize'))); // May not be needed
    } else {
        rightDividerEl.style.display = 'none';
        mainConsoleEl.style.flex = '1';
        chatTabsContainerEl.style.display = 'none';
    }
}


function createTab(type, name) {
    const id = type + "-" + name;
    inactiveAllTabs();

    const tabDiv = document.createElement('div');
    tabDiv.id = 'tab-' + id;
    tabDiv.classList.add("tab-active", "tab");
    tabs.append(tabDiv);

    const tabLabel = document.createElement('span');
    tabLabel.id = 'tab-label-' + id;
    tabLabel.innerHTML = type + " " + name + "&nbsp;";
    tabLabel.addEventListener('click', function (event) {
        const clickedId = event.target.id.replace("tab-label-", "");
        const tabToActivate = document.getElementById("tab-" + clickedId);
        if (tabToActivate) {
            inactiveAllTabs();
            tabToActivate.classList.remove('tab-inactive');
            tabToActivate.classList.add('tab-active');
            const contentToActivate = document.getElementById("tab-content-" + clickedId);
            if (contentToActivate) {
                contentToActivate.classList.remove('tab-content-inactive');
                contentToActivate.classList.add('tab-content-active');
                contentToActivate.style.display = 'flex';
            }
        }
    });
    tabDiv.append(tabLabel);

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = "x";
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', function () {
        closeTab(id);
    });
    tabDiv.append(closeBtn);

    const tabContent = document.createElement('div');
    tabContent.id = 'tab-content-' + id;
    tabContent.classList.add('tab-content', 'tab-content-active', 'grid-container', 'tab-content-flex');
    tabContent.style.display = 'flex';
    tabSet.append(tabContent);

    document.querySelectorAll('#tabset .tab-content:not(#tab-content-' + id + ')').forEach(tc => {
        tc.classList.remove('tab-content-active');
        tc.classList.add('tab-content-inactive');
        tc.style.display = 'none';
    });

    const row1 = document.createElement('div');
    row1.classList.add('grid-row', 'tab-row-container');
    const row2 = document.createElement('div');
    row2.classList.add('grid-row', 'tab-input-row');

    var textArea = document.createElement('div');
    textArea.id = 'textarea-' + id;
    textArea.classList.add('tab-text-area', 'tab-text-container');

    var tabInputLabel = document.createElement('span');
    tabInputLabel.classList.add('tab-input-label');
    tabInputLabel.innerHTML = "tell " + name;

    var input = document.createElement('input');
    input.classList.add('input-' + id, 'tab-input');
    input.id = 'input-' + id;
    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            const message = input.value;
            let isFicsCmd = false;
            for (var regex of ficsCommandRegex) {
                regex.lastIndex = 0;
                if (regex.test(message)) {
                    isFicsCmd = true;
                    break;
                }
            }
            if (isFicsCmd) {
                if (ws) ws.send(filterInvalid(message));
            } else if (message.trim()) {
                if (ws) ws.send("tell " + name + " " + filterInvalid(message));
            }
            addToMessageHistory(input.id, message);
            input.value = '';
        }
    });
    input.addEventListener('keydown', (event) => handleArrowKeys(event, input));

    row1.append(textArea);
    row2.append(tabInputLabel);
    row2.append(input);
    tabContent.append(row1);
    tabContent.append(row2);

    updateTabsVisibility();
    if (mainTextArea) mainTextArea.scrollTop = mainTextArea.scrollHeight;
}

// createGameTab will now use createChessBoardSquares from chess.js
// It's simplified here as the full chess board DOM setup is complex and now in chess.js
// This function primarily handles the tab UI and toolbar for a game.
function createGameTab(opponent) {
    const id = "game-" + opponent;
    // gameTabId = id; // If you need to track the active game tab
    inactiveAllChessTabs(); // Assuming this is for a separate chess tabset

    const chessTabs = document.getElementById('chessTabs'); // Assuming this element exists
    const chessTabSet = document.getElementById('chessTabSet'); // Assuming this element exists
    if (!chessTabs || !chessTabSet) {
        console.warn("Chess tab containers not found for createGameTab");
        // Fallback: maybe create a simple board in the main chess area if no tabs
        // For now, let's assume the main board is the target if no chess tabs.
        // This part needs to align with your actual UI for game tabs.
        // If there's only one main board, this function might not be needed,
        // or it reconfigures the main board.
        // Given the original code, it seems to imply a multi-tab chess interface.
        // For simplicity, if chessTabs/chessTabSet don't exist, we might skip tab creation.
        // The current refactor focuses on the main board in .chess-board-area.
        // If `createGameTab` is for auxiliary boards, it needs its own board management.
        console.log("createGameTab: Chess tab elements not found. Game tab not created.");
        return;
    }


    const tabDiv = document.createElement('div');
    tabDiv.id = 'tab-' + id;
    tabDiv.classList.add("tab-active", "tab");
    chessTabs.append(tabDiv);

    const tabLabel = document.createElement('span');
    tabLabel.id = 'tab-label-' + id;
    tabLabel.innerHTML = (opponent === "Practice" ? "Practice Board" : `Game vs ${opponent}`) + "&nbsp;";
    // Add click listener for tab activation (similar to createTab)
    tabDiv.append(tabLabel);

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = "x";
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', function () {
        // if (id === gameTabId) stopClock(); // stopClock is now internal to chess.js
        closeTab(id); // Needs to handle chess tabs correctly
        // gameTabId = null;
    });
    tabDiv.append(closeBtn);

    const tabContent = document.createElement('div');
    tabContent.id = 'tab-content-' + id;
    tabContent.classList.add('tab-content', 'tab-content-active', 'grid-container');
    chessTabSet.append(tabContent);

    const boardAndToolbarContainer = document.createElement('div');
    boardAndToolbarContainer.classList.add('grid-row', 'board-and-toolbar-container');

    const toolbar = document.createElement('div');
    toolbar.classList.add('board-toolbar');
    // Add toolbar buttons (Reset, Start, Draw, Resign, Flip)
    // Flip button's onclick would now potentially call a flip method in chess.js
    // or send 'flip' and let Style12 handle it.
    // For now, assume flip is handled by Style12 or main board's flip.
    boardAndToolbarContainer.appendChild(toolbar);

    const boardContainerDiv = document.createElement('div');
    boardContainerDiv.classList.add('board-container'); // General container
    const gameBoardDiv = document.createElement('div');
    gameBoardDiv.id = 'chessBoard-' + id; // Unique ID for this game tab's board
    gameBoardDiv.classList.add('chess-board'); // General styling

    // Player info for this tab (top and bottom) - similar structure to main board
    // ... create topPlayerInfoForTab, bottomPlayerInfoForTab ...

    boardContainerDiv.appendChild(gameBoardDiv); // Add more elements like player info if needed
    boardAndToolbarContainer.appendChild(boardContainerDiv);
    tabContent.append(boardAndToolbarContainer);

    // Populate this specific board
    if (typeof createChessBoardSquares === 'function') {
        createChessBoardSquares(gameBoardDiv);
    }
}


function closeTab(typeAndName) {
    const tab = document.getElementById('tab-' + typeAndName);
    const content = document.getElementById('tab-content-' + typeAndName);
    if (!tab || !content) return;

    const parentTabs = tab.parentElement; // To find siblings in the correct tab set
    const isActive = tab.classList.contains("tab-active");
    const currentIndex = Array.from(parentTabs.children).indexOf(tab);

    tab.remove();
    content.remove();

    if (isActive) {
        const remainingTabs = parentTabs.querySelectorAll(".tab");
        if (remainingTabs.length > 0) {
            let nextTabIndex = currentIndex < remainingTabs.length ? currentIndex : currentIndex - 1;
            if (nextTabIndex < 0) nextTabIndex = 0;
            const nextTabToActivate = remainingTabs[nextTabIndex];
            if (nextTabToActivate) {
                const nextTabId = nextTabToActivate.id.replace('tab-', '');
                nextTabToActivate.classList.remove("tab-inactive");
                nextTabToActivate.classList.add("tab-active");
                const nextTabContent = document.getElementById('tab-content-' + nextTabId);
                if (nextTabContent) {
                    nextTabContent.classList.add("tab-content-active");
                    nextTabContent.classList.remove("tab-content-inactive");
                    nextTabContent.style.display = 'flex';
                }
            }
        }
    }
    updateTabsVisibility(); // For main chat tabs
}


function routeMessage(msg) {
    let timesealAckIndex = msg.indexOf("[G]\0");
    while(timesealAckIndex != -1) {
        ws.baseSend(encodeTimeseal(String.fromCharCode(2, 57)));
        msg = msg.substring(0, timesealAckIndex) + msg.substring(timesealAckIndex + 4);
        timesealAckIndex = msg.indexOf("[G]\0");
    }

    msg = msg.replaceAll("\n\r", "\n");
    msg = msg.replaceAll('\n\\', '\n');
    if (msg.includes("\u0007")) {
        bellAudio.play();
        msg = msg.replaceAll("\u0007", "");
    }
    if (!msg.endsWith("\n")) msg += "\n";
    if (msg.startsWith("\n")) msg = msg.substring(1);

    if (isLoggingIn && preferences.autoLogin && ws) {
        if (msg.toLowerCase().includes('login: ')) {
            ws.send(preferences.ficsUsername);
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
        }
    }

    if (msg.includes('\n**** Starting FICS session as') && ws) {
        ws.send('set style 12');
        ws.send('set prompt');
        ws.send('set bell off');
        ws.send('set interface Simple FICS Interface');
    }

    // Game start messages (non-Style12, if any) could trigger gameStartAudio from chess.js
    // if (msg.includes('Creating: ') && msg.includes('vs.')) {
    //    if (typeof chessGameStart === 'function') chessGameStart(); // Example call
    // }

    const channelTellsToTabs = preferences.channelTellsToTabs;
    // const directTellsToTabs = preferences.directTellsToTabs; // Not used in this part of logic
    // const gameTellsToTabs = preferences.gameTellsToTabs; // Not used here

    let isMainConsoleMessage = true;
    const isFicsPrompt = msg.trim() === 'fics%';

    if (/^[a-zA-Z0-9*]+\([0-9]+\)\s*:\s/.test(msg)) { // Channel tell
        const parts = msg.match(/^([a-zA-Z0-9*]+)\(([0-9]+)\)\s*:\s*(.*)/);
        if (parts && parts.length > 2) {
            const channelNum = parts[2];
            if (channelTellsToTabs) {
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
                const textArea = document.getElementById("textarea-" + tabId);
                if (textArea) {
                    const autoScroll = textArea.scrollHeight - textArea.scrollTop <= textArea.clientHeight + 10; // Add buffer
                    textArea.innerHTML += processTextToHTML(msg.replace(/\nfics% $/, "")); // Remove prompt from tab
                    if (autoScroll) textArea.scrollTop = textArea.scrollHeight;
                }
            }
        }
    }

    // Handle game creation messages like "Creating: GriffyJr (1937) cday (1677) unrated blitz 2 12"
    // or "Creating: GuestHVZN (++++) GriffyJr (1937) unrated blitz 2 12"
    // For observing: Game 27: Geforce (2140) konozrout (2081) rated blitz 5 0
    const containsGameStart = msg.startsWith("Creating: ");
    var gameStartStr = null;
    if (containsGameStart) {
        gameStartStr = msg.substring(10);
    } else {
        const index = msg.indexOf("\nCreating: ");
        if (index != -1) {
            gameStartStr = msg.substring(index + 11);
        } else {
            if (msg.startsWith("Game ")) {
                const colonIndex = msg.indexOf(":", index + 5);
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
        processGameCreationMessage(gameStartStr.trim());
    }


    // Style12 handling
    const style12Start = msg.startsWith("<12>") ? 0 : msg.lastIndexOf("\n<12>");
    if (style12Start >= 0) {
        const end = msg.indexOf("\n", style12Start + (msg.startsWith("<12>") ? 0 : 1)); // Adjust for leading newline
        const style12Block = end >= 0 ? msg.substring(style12Start + (msg.startsWith("<12>") ? 0 : 1), end) : msg.substring(style12Start + (msg.startsWith("<12>") ? 0 : 1));

        if (typeof processStyle12Message === 'function') {
            processStyle12Message(style12Block); // Send only the <12> line
        } else {
            console.error("processStyle12Message not available from chess.js");
        }

        if (!preferences.showStyle12Events) {
            // Remove the Style12 line from the message to be printed in the console
            let beforeStyle12 = msg.substring(0, style12Start + (msg.startsWith("<12>") ? 0 : 1));
            let afterStyle12 = end >= 0 ? msg.substring(end + 1) : ""; // +1 to skip the newline after <12>
            msg = beforeStyle12 + afterStyle12;
            if (msg.trim() === "" || msg.trim() === "fics%") isMainConsoleMessage = false; // Don't print if only prompt or empty after stripping
        }
    }


    // Handle moves command response
    const moveslistIndex = msg.indexOf('Movelist for game');
    if (moveslistIndex != -1 && (moveslistIndex == 0 || msg.indexOf(moveslistIndex - 1) == '/n')) {
        if (typeof processMovesList === 'function') {
            processMovesList(msg);
        } else {
            console.error("processMovesList not available from chess.js");
        }
    }

    // Handle game end messages like "{Game 12 (genieman vs. Pawnlightly) genieman resigns} 0-1"
    // or "{Game 12 (GuestNTLW vs. GuestNJVP) Game drawn by repetition} 1/2-1/2"
    // or "{Game 4 (FIRECAPTAIN vs. guanin) guanin forfeits on time} 1-0"
    // or {Game 13 (GriffySr vs. GuestNCLZ) GuestNCLZ resigns} 1-0
    // {Game 19 (GriffySr vs. GuestYLLZ) GuestYLLZ resigns} 1-0
    const gameEndStart = msg.startsWith("{Game ");
    var gameEndString = null;
    if (!gameEndStart) {
        const index = msg.indexOf("\n{Game ");
        if (index != -1) {
            gameEndString = msg.substring(index + 7);
        }
    } else {
        gameEndString = msg.substring(6);
    }
    if (gameEndString != null) {
        processGameEndMessage(gameEndString);
    }

    if (isMainConsoleMessage && msg.trim() !== '' && mainTextArea) {
        const consoleEndsWithPrompt = mainTextArea.innerHTML.endsWith('fics% ');
        if (!(isFicsPrompt && consoleEndsWithPrompt)) {
            const autoScroll = mainTextArea.scrollHeight - mainTextArea.scrollTop <= mainTextArea.clientHeight + 10; // Add buffer
            mainTextArea.innerHTML += processTextToHTML(msg);
            if (autoScroll) mainTextArea.scrollTop = mainTextArea.scrollHeight;
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
            updatePieceSetPreview(prefPieceSetEl.value); // Update preview on open
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
        savePreferences(); // This now handles updating `preferences` object
        // applyPreferences(); // savePreferences calls applyPreferences
        preferencesPanel.classList.remove('show');
    });
}

// Function to update the piece set preview grid (UI for preferences panel)
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
        const elements = document.querySelectorAll(`#${item.id}, .${item.id}`); // Pawns might use class for multiple
        elements.forEach(element => {
            if (element.tagName === 'IMG') { // Ensure it's an img tag
                element.src = `pieces/${pieceSet}/${item.piece}.svg`;
            }
        });
    });
    // Special handling for multiple pawns if IDs are unique like bP, bP2, etc.
    ['bP2', 'bP3', 'bP4', 'bP5'].forEach(pawnId => {
        const el = document.getElementById(`preview-${pawnId}`);
        if (el) el.src = `pieces/${pieceSet}/bP.svg`;
    });
    ['wP2', 'wP3', 'wP4', 'wP5'].forEach(pawnId => {
        const el = document.getElementById(`preview-${pawnId}`);
        if (el) el.src = `pieces/${pieceSet}/wP.svg`;
    });
}


function encodeTimeseal(e)  {
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
             t++; t % 12 != 0; )
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
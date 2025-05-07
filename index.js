// WebSocket and connection
const wsUrl = 'wss://www.freechess.org:5001';
let ws = null;
let isLoggingIn = false;

// Message history for input fields
const messageHistory = {};
const messageHistoryPosition = {};
const MAX_HISTORY_LENGTH = 100;

// DOM elements
const mainTextArea = document.getElementById('mainTextArea');
const mainInput = document.getElementById('mainInput');
const statusDiv = document.getElementById('status');
const tabSet = document.getElementById('tabset');
const tabs = document.getElementById('tabs');
const topDivider = document.getElementById('topDivider');
const rightDivider = document.getElementById('rightDivider');
const chessBoardArea = document.querySelector('.chess-board-area');
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

// Audio elements
const moveAudio = new Audio('sounds/Move.ogg');
const captureAudio = new Audio('sounds/Capture.ogg');
const bellAudio = new Audio('sounds/Alert.wav');
const gameStartAudio = new Audio('sounds/GameStart.wav');
const gameEndAudio = new Audio('sounds/GameEnd.wav');

// Chess game variables
let chess = new Chess();
let selectedSquare = null;
let validMoves = [];
let myColor = 'white';
let boardInitialized = false;
let previousPosition = null;
let gameTabId = null;

// Drag and drop variables
let draggedPiece = null;
let draggedPieceElement = null;
let startSquare = null;

// Game information variables
let whitePlayerName = '';
let blackPlayerName = '';
let whitePlayerClock = '00:00';
let blackPlayerClock = '00:00';
let currentTurn = 'w';
let whiteTimeSeconds = 0;
let blackTimeSeconds = 0;
let clockTimer = null;
let isClockRunning = false;

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
    showStyle12Events: false
};

let currentPieceSet = preferences.pieceSet;
let lightSquareColor = preferences.lightSquareColor;
let darkSquareColor = preferences.darkSquareColor;

const collapseLeftBtn = document.getElementById('collapseLeft');
const collapseRightBtn = document.getElementById('collapseRight');

// Game relation enum for Style12 format
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

// Style12 game information
let gameInfo = {
    gameNumber: 0,
    initialTime: 0,
    increment: 0,
    whiteMaterial: 0,
    blackMaterial: 0,
    moveNumber: 0,
    lastMove: '',
    lastMoveTime: '',
    lastMovePretty: '',
    relation: GameRelation.OBSERVING_PLAYED,
    doublePawnPush: -1,
    whiteCastleShort: false,
    whiteCastleLong: false,
    blackCastleShort: false,
    blackCastleLong: false,
    irreversibleCount: 0
};

// Global Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const timestamp = new Date().getTime();
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        if (!link.href.includes('fonts.googleapis.com')) {
            link.href = link.href + '?v=' + timestamp;
        }
    });

    const metaBuildTime = document.createElement('meta');
    metaBuildTime.name = 'build-time';
    metaBuildTime.content = new Date().toISOString();
    document.head.appendChild(metaBuildTime);
});

// Function to add a message to history
function addToMessageHistory(inputId, message) {
    if (!message.trim()) return; // Don't add empty messages

    // Initialize history array if it doesn't exist
    if (!messageHistory[inputId]) {
        messageHistory[inputId] = [];
    }

    // Don't add if it's the same as the last message
    if (messageHistory[inputId].length > 0 &&
        messageHistory[inputId][messageHistory[inputId].length - 1] === message) {
        return;
    }

    // Add message to history
    messageHistory[inputId].push(message);

    // Limit history length
    if (messageHistory[inputId].length > MAX_HISTORY_LENGTH) {
        messageHistory[inputId].shift(); // Remove oldest message
    }

    // Reset position to beyond the newest message
    messageHistoryPosition[inputId] = messageHistory[inputId].length;
}

// Function to handle arrow key navigation
function handleArrowKeys(event, inputElement) {
    const inputId = inputElement.id;

    // Initialize history if it doesn't exist
    if (!messageHistory[inputId]) {
        messageHistory[inputId] = [];
    }

    // Initialize position if it doesn't exist
    if (messageHistoryPosition[inputId] === undefined) {
        messageHistoryPosition[inputId] = messageHistory[inputId].length;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent cursor from moving to start of input

        // Store current input if we're at the end of history
        if (messageHistoryPosition[inputId] === messageHistory[inputId].length) {
            inputElement._currentInput = inputElement.value;
        }

        // Move up in history if possible
        if (messageHistoryPosition[inputId] > 0) {
            messageHistoryPosition[inputId]--;
            inputElement.value = messageHistory[inputId][messageHistoryPosition[inputId]];
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent cursor from moving to end of input

        // Move down in history if possible
        if (messageHistoryPosition[inputId] < messageHistory[inputId].length) {
            messageHistoryPosition[inputId]++;

            if (messageHistoryPosition[inputId] === messageHistory[inputId].length) {
                // Restore current input when we reach the end
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
        ws.send(filterInvalid(message) + '\n\r');
        addToMessageHistory('mainInput', message);
        mainInput.value = '';
    }
});

mainInput.addEventListener('keydown', (event) => {
    handleArrowKeys(event, mainInput);
});

// Horizontal divider
topDivider.addEventListener('mousedown', function(e) {
    if (e.target === topDivider) {
        e.preventDefault();
        activeResizer = 'horizontal';
        document.addEventListener('mousemove', resizeDividers);
        document.addEventListener('mouseup', stopResize);
    }
});

// Collapse buttons
collapseLeftBtn.addEventListener('click', function() {
    chessBoardArea.style.flexBasis = '0%';
    topDivider.style.left = '0%';
    // Use requestAnimationFrame instead of setTimeout
    requestAnimationFrame(scrollConsolesToBottom);
});

collapseRightBtn.addEventListener('click', function() {
    chessBoardArea.style.flexBasis = '100%';
    topDivider.style.left = '100%';
    // Use requestAnimationFrame instead of setTimeout
    requestAnimationFrame(scrollConsolesToBottom);
});

// Vertical divider
rightDivider.addEventListener('mousedown', function(e) {
    if (e.target === rightDivider) {
        e.preventDefault();
        activeResizer = 'vertical';
        document.addEventListener('mousemove', resizeDividers);
        document.addEventListener('mouseup', stopResize);
    }
});

const collapseUpBtn = document.getElementById('collapseUp');
const collapseDownBtn = document.getElementById('collapseDown');

collapseUpBtn.addEventListener('click', function() {
    mainConsole.style.flexBasis = '100%';
    rightDivider.style.top = '100%';
    // Use requestAnimationFrame instead of setTimeout
    requestAnimationFrame(scrollConsolesToBottom);
});

collapseDownBtn.addEventListener('click', function() {
    mainConsole.style.flexBasis = '0%';
    rightDivider.style.top = '0%';
    // Use requestAnimationFrame instead of setTimeout
    requestAnimationFrame(scrollConsolesToBottom);
});

window.onload = function() {
    testClockParsing();
    connectWebSocket();
    loadPreferences();
    setupPreferencesMenu();
    updateTabsVisibility();
    // Use requestAnimationFrame instead of setTimeout
    requestAnimationFrame(() => {
        // Wait for two animation frames to ensure DOM is fully loaded
        requestAnimationFrame(initializeChessBoard);
    });
};

function resizeDividers(e) {
    if (activeResizer === 'horizontal') {
        // Resize horizontal divider (left-right)
        const container = document.querySelector('.top-section');
        const containerRect = container.getBoundingClientRect();
        let percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        // Limit the minimum and maximum sizes
        percentage = Math.max(0, Math.min(100, percentage));

        // Update the flex-basis of the chess board area
        chessBoardArea.style.flexBasis = `${percentage}%`;

        // Update the divider position
        topDivider.style.left = `${percentage - 1}%`;
    } else if (activeResizer === 'vertical') {
        // Resize vertical divider (top-bottom)
        const container = rightContent;
        const containerRect = container.getBoundingClientRect();
        let percentage = ((e.clientY - containerRect.top) / containerRect.height) * 100;

        // Limit the minimum and maximum sizes
        percentage = Math.max(0, Math.min(100, percentage));

        // Update the flex-basis of the main console
        mainConsole.style.flexBasis = `${percentage}%`;

        // Update the divider position
        rightDivider.style.top = `${percentage}%`;
    }

    // During active resize, we'll just scroll the main text area directly
    // This is more efficient than scrolling all text areas during rapid resize events
    if (mainTextArea) {
        mainTextArea.scrollTop = mainTextArea.scrollHeight;
    }
}

// Helper function to scroll all text areas to the bottom
function scrollConsolesToBottom() {
    console.log('Scrolling consoles to bottom');

    // Use requestAnimationFrame to ensure this runs after the browser has updated the layout
    requestAnimationFrame(() => {
        // Scroll main console to bottom
        if (mainTextArea) {
            console.log('Main text area scrollHeight:', mainTextArea.scrollHeight);
            mainTextArea.scrollTop = mainTextArea.scrollHeight;
        }

        // Scroll all tab text areas to bottom
        const tabTextAreas = document.querySelectorAll('.tab-text-area');
        console.log('Found', tabTextAreas.length, 'tab text areas');

        tabTextAreas.forEach(textArea => {
            console.log('Tab text area scrollHeight:', textArea.scrollHeight);
            textArea.scrollTop = textArea.scrollHeight;
        });

        // Also try to scroll any visible active tab content
        const activeTabContents = document.querySelectorAll('.tab-content-active');
        activeTabContents.forEach(tabContent => {
            const textAreas = tabContent.querySelectorAll('.tab-text-area');
            textAreas.forEach(textArea => {
                console.log('Active tab text area scrollHeight:', textArea.scrollHeight);
                textArea.scrollTop = textArea.scrollHeight;
            });
        });
    });
}

function stopResize() {
    activeResizer = null;
    document.removeEventListener('mousemove', resizeDividers);
    document.removeEventListener('mouseup', stopResize);

    // Scroll consoles to bottom after resize is complete
    // Use requestAnimationFrame to ensure layout has been updated
    requestAnimationFrame(() => {
        // First animation frame - wait for next frame for layout to be fully updated
        requestAnimationFrame(() => {
            scrollConsolesToBottom();

            // Also try a direct approach for the main text area
            if (mainTextArea) {
                mainTextArea.scrollTop = mainTextArea.scrollHeight;
            }

            // Also scroll all tab text areas
            const tabTextAreas = document.querySelectorAll('.tab-text-area');
            tabTextAreas.forEach(textArea => {
                textArea.scrollTop = textArea.scrollHeight;
            });
        });
    });
}

// Preferences are now declared at the top of the file

// Load preferences from local storage
function loadPreferences() {
    if (localStorage.getItem('chessPreferences')) {
        // Load preferences from local storage into the preferences object
        const storedPrefs = JSON.parse(localStorage.getItem('chessPreferences'));

        // Update the preferences object with stored values
        Object.assign(preferences, storedPrefs);

        console.log('Preferences loaded:', preferences);

        // Update global variables used elsewhere in the code
        currentPieceSet = preferences.pieceSet;
        lightSquareColor = preferences.lightSquareColor;
        darkSquareColor = preferences.darkSquareColor;

        // Update UI to reflect loaded preferences

        // Chess board UI
        document.getElementById('prefPieceSet').value = preferences.pieceSet;
        document.getElementById('prefLightSquare').value = preferences.lightSquareColor;
        document.getElementById('prefDarkSquare').value = preferences.darkSquareColor;
        document.getElementById('lightSquarePreview').style.backgroundColor = preferences.lightSquareColor;
        document.getElementById('darkSquarePreview').style.backgroundColor = preferences.darkSquareColor;

        // FICS preferences UI
        document.getElementById('prefFicsUsername').value = preferences.ficsUsername || '';

        if (preferences.ficsPassword) {
            try {
                // Simple decoding of password
                document.getElementById('prefFicsPassword').value = atob(preferences.ficsPassword);
            } catch (e) {
                console.error('Error decoding password:', e);
            }
        }

        document.getElementById('prefAutoLogin').checked = preferences.autoLogin;

        // Tabs preferences UI
        document.getElementById('prefChannelTellsToTabs').checked = preferences.channelTellsToTabs;
        document.getElementById('prefDirectTellsToTabs').checked = preferences.directTellsToTabs;
        document.getElementById('prefGameTellsToTabs').checked = preferences.gameTellsToTabs;
        document.getElementById('prefAutoSwitchToNewTabs').checked = preferences.autoSwitchToNewTabs;
        document.getElementById('prefFlashTabsOnActivity').checked = preferences.flashTabsOnActivity;
        document.getElementById('prefShowStyle12Events').checked = preferences.showStyle12Events;

        // Initialize the piece set preview
        updatePieceSetPreview(preferences.pieceSet);

        // Apply preferences to the board
        applyPreferences();
    } else {
        // Initialize with default piece set
        updatePieceSetPreview(preferences.pieceSet);

        // Update UI to reflect default preferences
        document.getElementById('prefPieceSet').value = preferences.pieceSet;
        document.getElementById('prefLightSquare').value = preferences.lightSquareColor;
        document.getElementById('prefDarkSquare').value = preferences.darkSquareColor;
        document.getElementById('lightSquarePreview').style.backgroundColor = preferences.lightSquareColor;
        document.getElementById('darkSquarePreview').style.backgroundColor = preferences.darkSquareColor;

        // FICS preferences UI
        document.getElementById('prefFicsUsername').value = preferences.ficsUsername || '';
        document.getElementById('prefAutoLogin').checked = preferences.autoLogin;

        // Tabs preferences UI
        document.getElementById('prefChannelTellsToTabs').checked = preferences.channelTellsToTabs;
        document.getElementById('prefDirectTellsToTabs').checked = preferences.directTellsToTabs;
        document.getElementById('prefGameTellsToTabs').checked = preferences.gameTellsToTabs;
        document.getElementById('prefAutoSwitchToNewTabs').checked = preferences.autoSwitchToNewTabs;
        document.getElementById('prefFlashTabsOnActivity').checked = preferences.flashTabsOnActivity;
        document.getElementById('prefShowStyle12Events').checked = preferences.showStyle12Events;

        console.log('No stored preferences found, using defaults:', preferences);

        // Apply default preferences
        applyPreferences();
    }
}

// Save preferences to local storage
function savePreferences() {
    // Update preferences object with current values from UI

    // Chess board preferences
    preferences.pieceSet = currentPieceSet;
    preferences.lightSquareColor = lightSquareColor;
    preferences.darkSquareColor = darkSquareColor;

    // FICS preferences
    preferences.ficsUsername = document.getElementById('prefFicsUsername').value;
    const rawPassword = document.getElementById('prefFicsPassword').value;
    preferences.ficsPassword = rawPassword ? btoa(rawPassword) : ''; // Simple encoding for password
    preferences.autoLogin = document.getElementById('prefAutoLogin').checked;

    // Tabs preferences
    preferences.channelTellsToTabs = document.getElementById('prefChannelTellsToTabs').checked;
    preferences.directTellsToTabs = document.getElementById('prefDirectTellsToTabs').checked;
    preferences.gameTellsToTabs = document.getElementById('prefGameTellsToTabs').checked;
    preferences.autoSwitchToNewTabs = document.getElementById('prefAutoSwitchToNewTabs').checked;
    preferences.flashTabsOnActivity = document.getElementById('prefFlashTabsOnActivity').checked;
    preferences.showStyle12Events = document.getElementById('prefShowStyle12Events').checked;

    // Save to local storage
    localStorage.setItem('chessPreferences', JSON.stringify(preferences));

    console.log('Preferences saved:', preferences);
}

// Apply preferences to the board
function applyPreferences() {
    // Update piece set
    if (document.getElementById('chessBoard')) {
        updateBoardFromChessJS();
    }

    // Update square colors
    const lightSquares = document.querySelectorAll('.light-square');
    const darkSquares = document.querySelectorAll('.dark-square');

    lightSquares.forEach(square => {
        square.style.backgroundColor = lightSquareColor;
    });

    darkSquares.forEach(square => {
        square.style.backgroundColor = darkSquareColor;
    });

    // Update rank and file label colors based on square colors
    const rankLabels = document.querySelectorAll('.rank-label');
    const fileLabels = document.querySelectorAll('.file-label');

    rankLabels.forEach(label => {
        // Get the parent square
        const square = label.parentElement;
        // Set color based on square type for better contrast
        if (square.classList.contains('light-square')) {
            // If it's a light square, use dark square color
            label.style.color = preferences.darkSquareColor;
        } else {
            // If it's a dark square, use light square color
            label.style.color = preferences.lightSquareColor;
        }
    });

    fileLabels.forEach(label => {
        // Get the parent square
        const square = label.parentElement;
        // Set color based on square type for better contrast
        if (square.classList.contains('light-square')) {
            // If it's a light square, use dark square color
            label.style.color = preferences.darkSquareColor;
        } else {
            // If it's a dark square, use light square color
            label.style.color = preferences.lightSquareColor;
        }
    });
}

// Main input event listener is now at the top of the file

// Override the WebSocket send method to log messages
function overrideWsSend(ws) {
    const originalSend = ws.send;
    ws.send = function(msg) {
        console.log(`Sent \"${msg}\"`);
        mainTextArea.innerHTML += processTextToHTML(`Sent \`${msg.trim()}\`\n`);
        mainTextArea.scrollTop = mainTextArea.scrollHeight;
        return originalSend.apply(this, arguments);
    };
    return ws;
}

function connectWebSocket() {
    ws = new WebSocket(wsUrl);
    ws = overrideWsSend(ws);
    ws.addEventListener("message", (event) => {
         if (event.data instanceof Blob) {
           const reader = new FileReader();
           reader.onload = function(e) {
             var msg = reader.result;
             routeMessage(msg);
           };
           reader.readAsText(event.data);
         } else {
           routeMessage(event.data);
         }
       });

    ws.onopen = () => {
        routeMessage('Connected\n');
        if (isAutoLoginEnabled()) {
            isLoggingIn=true;
        }
    };

    ws.onerror = (error) => {
        routeMessage(`Error: ${JSON.stringify(error)}\n`);
        if (statusDiv) {
            statusDiv.textContent = 'Error';
        }
    };

    ws.onclose = () => {
        routeMessage('Disconnected\n');
        if (statusDiv) {
            statusDiv.textContent = 'Disconnected';
        }
        ws = null;

        // Use requestAnimationFrame with timestamp checking instead of setTimeout
        const reconnectTime = Date.now() + 5000; // 5 seconds from now

        const checkTimeAndReconnect = () => {
            if (Date.now() >= reconnectTime) {
                connectWebSocket();
            } else {
                requestAnimationFrame(checkTimeAndReconnect);
            }
        };

        requestAnimationFrame(checkTimeAndReconnect);
    };
}

// Check if auto-login is enabled
function isAutoLoginEnabled() {
    // Use the preferences object directly
    return preferences.autoLogin === true &&
           preferences.ficsUsername &&
           preferences.ficsPassword;
}

function filterInvalid(msg) {
    var result = '';
    var filtered = "";
    for (var i = 0; i < msg.length; i++) {
       if (msg.charCodeAt(i) >= 32 && msg.charCodeAt(i) <= 126) {
          result += msg.charAt(i);
       } else {
          filtered += msg.charAt(i);
       }
    }
    if (filtered != '') {
        routeMessage('\nFiltered output: ' + filtered);
    }
    return result;
}

function wrapInClassExceptPrompt(text, className) {
   var promptIndex = text.lastIndexOf('\nfics% ');
   if (promptIndex > 0) {
      return '<span class="' + className + '">' + text.substring(0,promptIndex) + '</span>' + text.substring(promptIndex);
   } else {
      return '<span class="' + className + '">' + text + '</span>';
   }
}

// Function to convert plain text to HTML with links and colors
function processTextToHTML(text) {
    if (!text) return '';

    // Sanitize the text to prevent XSS
    text = sanitizeHTML(text);

    // Convert URLs to clickable links
    text = text.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

    // Color sent messages (must be first to catch the pattern before other rules)
    if (text.match(/Sent `(.+)`$/gm) != null) {
        return wrapInClassExceptPrompt(text,'sent-message');
    }

    // Color channel tells - using specific colors for certain channels
    var channelMatch = text.match(/^([a-zA-Z0-9()*]+)\(([0-9]+)\):(.*)/gm);
    if (channelMatch != null) {
       const channelEnd = text.indexOf("):");
       if (channelEnd > 0) {
           var channelStart = -1;
           for (var i = channelEnd - 1; i >= 0; i--) {
               if (text.charAt(i) == '(') {
                   channelStart = i;
                   break;
               }
           }
           if (channelStart >= 0) {
               const channel = text.substring(channelStart + 1,channelEnd);
               return wrapInClassExceptPrompt(text,'channel-' + channel);
           }
        }
     }

    // Color direct tells (personal messages)
    if (text.match(/^([a-zA-Z0-9()*]+) tells you:(.*)/gm) != null) {
        return wrapInClassExceptPrompt(text,'direct-tell');
    }

    // Color shouts
    if (text.match(/^([a-zA-Z0-9()*]+) shouts:(.*)/gm) != null) {
        return wrapInClassExceptPrompt(text,'shout-message');
    }

    // Color c-shouts
    if (text.match(/^([a-zA-Z0-9()*]+) c-shouts:(.*)/gm) != null) {
        return wrapInClassExceptPrompt(text,'cshout-message');
    }

    // Color system messages
    if (text.match(/^\*\*\*\* (.*)/gm) != null) {
        return wrapInClassExceptPrompt(text,'system-message');
    }

    return text;
}

// Function to sanitize HTML to prevent XSS attacks
function sanitizeHTML(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

function inactiveAllTabs() {
    // Hide all chat tab content
    const allTabContents = document.querySelectorAll("#tabset .tab-content");
    for (let i = 0; i < allTabContents.length; i++) {
        allTabContents[i].classList.remove("tab-content-active");
        allTabContents[i].classList.add("tab-content-inactive");

        // Ensure the display property is set to none
        allTabContents[i].style.display = 'none';
    }

    const allTabs = document.querySelectorAll("#tabs .tab");
    // Remove active class from all chat tabs
    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("tab-active");
        allTabs[i].classList.add("tab-inactive");
    }
}

function inactiveAllChessTabs() {
    // Hide all chess tab content
    const activeTabContents = document.querySelectorAll("#chessTabset .tab-content");
    for (let i = 0; i < activeTabContents.length; i++) {
        activeTabContents[i].classList.remove("tab-content-active");
        activeTabContents[i].classList.add("tab-content-inactive");
    }

    const activeTabs = document.querySelectorAll("#chessTabs .tab");
    // Remove active class from all chess tabs
    for (let i = 0; i < activeTabs.length; i++) {
        activeTabs[i].classList.remove("tab-active");
        activeTabs[i].classList.add("tab-inactive");
    }
}

// Function to check if there are any tabs open and adjust the layout
function updateTabsVisibility() {
    const tabElements = document.querySelectorAll('#tabs .tab');
    const rightDivider = document.getElementById('rightDivider');
    const mainConsole = document.querySelector('.main-console');
    const chatTabsContainer = document.querySelector('.chat-tabs-container');
    const rightContent = document.querySelector('.right-content');

    if (tabElements.length > 0) {
        // Show the divider and set 50/50 split when tabs exist
        rightDivider.style.display = 'block';
        mainConsole.style.flex = '0 0 75%';
        chatTabsContainer.style.display = 'flex';

        // Explicitly set the divider position to 75% (75% chess board, 25% console)
        rightDivider.style.top = '75%';
        mainConsole.style.flexBasis = '75%';

        // Force a layout recalculation to ensure the divider is positioned correctly
        // Use requestAnimationFrame instead of setTimeout
        requestAnimationFrame(() => {
            // Trigger a resize event to ensure all elements are properly positioned
            window.dispatchEvent(new Event('resize'));
        });
    } else {
        // Hide the divider and give full height to main console when no tabs
        rightDivider.style.display = 'none';
        mainConsole.style.flex = '1';
        chatTabsContainer.style.display = 'none';
    }
}

function createTab(type, name) {
    const id = type + "-" + name;

    // Make all existing tabs inactive
    inactiveAllTabs();

    // Create the new tab
    const tabDiv = document.createElement('div');
    tabDiv.id= 'tab-' + id;
    tabDiv.classList.add("tab-active");
    tabDiv.classList.add("tab");
    tabs.append(tabDiv);

    const tabLabel = document.createElement('span');
    tabLabel.id= 'tab-label-' + id;
    tabLabel.innerHTML=type + " " + name + "&nbsp";
    tabLabel.addEventListener('click', function(event) {
       const id = event.target.id.replace("tab-label-","");
       const tab = document.getElementById("tab-" + id);
       if (tab) {
           // Make all console tabs inactive first, don't affect chess tabs
           inactiveAllTabs();

           // Make this tab active
           tab.classList.remove('tab-inactive');
           tab.classList.add('tab-active');

           // Show this tab's content
           const tabContent = document.getElementById("tab-content-" + id);
           tabContent.classList.remove('tab-content-inactive');
           tabContent.classList.add('tab-content-active');
           tabContent.style.display = 'flex'; // Ensure it's visible
       }
    });
    tabDiv.append(tabLabel);

    const tabDivSpan = document.createElement('span');
    tabDivSpan.innerHTML = "x";
    tabDivSpan.classList.add('close-btn');
    tabDivSpan.addEventListener('click', function(event) {
        closeTab(id);
    });
    tabDiv.append(tabDivSpan);

    const tabContent = document.createElement('div');
    tabContent.id='tab-content-' + id;
    tabContent.classList.add('tab-content');
    tabContent.classList.add('tab-content-active');
    tabContent.classList.add('grid-container');
    tabContent.classList.add('tab-content-flex');
    tabContent.style.display = 'flex'; // Ensure it's visible initially
    tabSet.append(tabContent);

    // Make all other tab contents inactive and hidden
    const otherTabContents = document.querySelectorAll('#tabset .tab-content:not(#tab-content-' + id + ')');
    for (let i = 0; i < otherTabContents.length; i++) {
        otherTabContents[i].classList.remove('tab-content-active');
        otherTabContents[i].classList.add('tab-content-inactive');
        otherTabContents[i].style.display = 'none';
    }

    // Text area container with flex: 1 to fill available space
    const row1 = document.createElement('div');
    row1.classList.add('grid-row');
    row1.classList.add('tab-row-container');

    // Input row with fixed height
    const row2 = document.createElement('div');
    row2.classList.add('grid-row');
    row2.classList.add('tab-input-row');

    var textArea = document.createElement('div');
    textArea.id='textarea-' + id;
    textArea.classList.add('tab-text-area');
    textArea.classList.add('tab-text-container');

    var tabInputLabel = document.createElement('span');
    tabInputLabel.classList.add('tab-input-label');
    tabInputLabel.innerHTML = "tell " + name;

    var input = document.createElement('input');
    input.classList.add('input-' + id);
    input.classList.add('tab-input');
    input.id='input-' + id;

    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            const message = input.value;
            //prevent mistells.
            var isFicsCommand = false;
            // Use for...of to iterate through array values instead of for...in
            for (var regex of ficsCommandRegex) {
                // Reset lastIndex to avoid issues with global flag
                regex.lastIndex = 0;
                if (regex.test(message)) {
                    isFicsCommand = true;
                    break;
                }
            }
            if (isFicsCommand) {
                // Send directly to FICS if it's a command
                ws.send(filterInvalid(message) + '\n\r');
                addToMessageHistory(input.id, message);
                input.value = '';
            }
            else if (message.trim()) { // Only send non-empty messages
                ws.send("tell " + name + " " + filterInvalid(message) + '\n\r');
                addToMessageHistory(input.id, message);
                input.value = '';
            }
        }
    });

    // Add arrow key navigation for tab input
    input.addEventListener('keydown', (event) => {
        handleArrowKeys(event, input);
    });

    row1.append(textArea);
    row2.append(tabInputLabel);
    row2.append(input);
    tabContent.append(row1);
    tabContent.append(row2);

    // Update tabs visibility after creating a new tab
    updateTabsVisibility();

    // Scroll the main console to the bottom when a tab is opened for the first time
    mainTextArea.scrollTop = mainTextArea.scrollHeight;
}

function createGameTab(opponent) {
    const id = "game-" + opponent;
    gameTabId = id;
    // Only make chess tabs inactive, don't affect console tabs
    inactiveAllChessTabs();
    const tabDiv = document.createElement('div');
    tabDiv.id = 'tab-' + id;
    tabDiv.classList.add("tab-active");
    tabDiv.classList.add("tab");
    chessTabs.append(tabDiv);

    const tabLabel = document.createElement('span');
    tabLabel.id = 'tab-label-' + id;

    // Different label for practice board vs actual games
    if (opponent === "Practice") {
        tabLabel.innerHTML = "Practice Board" + "&nbsp";
    } else {
        tabLabel.innerHTML = "Game vs " + opponent + "&nbsp";
    }
    tabLabel.addEventListener('click', function(event) {
        const id = event.target.id.replace("tab-label-","");
        const tab = document.getElementById("tab-" + id);
        if (tab) {
            // Only make chess tabs inactive, don't affect console tabs
            inactiveAllChessTabs();
            tab.classList.remove('tab-inactive');
            tab.classList.add('tab-active');
            const tabContent = document.getElementById("tab-content-" + id);
            tabContent.classList.remove('tab-content-inactive');
            tabContent.classList.add('tab-content-active');
        }
    });
    tabDiv.append(tabLabel);

    const tabDivSpan = document.createElement('span');
    tabDivSpan.innerHTML = "x";
    tabDivSpan.classList.add('close-btn');
    tabDivSpan.addEventListener('click', function(event) {
        // If this is the active game tab, stop the clock
        if (id === gameTabId) {
            stopClock();
        }

        closeTab(id);
        gameTabId = null;
    });
    tabDiv.append(tabDivSpan);

    const tabContent = document.createElement('div');
    tabContent.id = 'tab-content-' + id;
    tabContent.classList.add('tab-content');
    tabContent.classList.add('tab-content-active');
    tabContent.classList.add('grid-container');
    chessTabSet.append(tabContent);

    // Main container for board and toolbar
    const boardAndToolbarContainer = document.createElement('div');
    boardAndToolbarContainer.classList.add('grid-row');
    boardAndToolbarContainer.classList.add('board-and-toolbar-container');

    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.classList.add('board-toolbar');

    // Create toolbar buttons
    if (opponent === "Practice") {
        // Reset button
        const resetBtn = document.createElement('button');
        resetBtn.title = 'Reset Board';
        resetBtn.innerHTML = '<i class="material-icons">restart_alt</i>';
        resetBtn.onclick = () => {
            chess.reset();
            updateBoardFromChessJS();
        };
        toolbar.appendChild(resetBtn);
    } else {
        // Game control buttons
        const startBtn = document.createElement('button');
        startBtn.title = 'Start Game';
        startBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
        startBtn.onclick = () => ws.send(`match ${opponent}\n\r`);
        toolbar.appendChild(startBtn);

        const drawBtn = document.createElement('button');
        drawBtn.title = 'Offer Draw';
        drawBtn.innerHTML = '<i class="material-icons">handshake</i>';
        drawBtn.onclick = () => ws.send('draw\n\r');
        toolbar.appendChild(drawBtn);

        const resignBtn = document.createElement('button');
        resignBtn.title = 'Resign';
        resignBtn.innerHTML = '<i class="material-icons">flag</i>';
        resignBtn.onclick = () => ws.send('resign\n\r');
        toolbar.appendChild(resignBtn);
    }

    // Flip board button (for all boards)
    const flipBtn = document.createElement('button');
    flipBtn.title = 'Flip Board';
    flipBtn.innerHTML = '<i class="material-icons">swap_vert</i>';
    flipBtn.onclick = () => {
        // Send flip command to FICS
        ws.send('flip\n\r');

        // Send refresh command after a short delay to ensure the board is updated
        // Use requestAnimationFrame with timestamp checking instead of setTimeout
        const refreshTime = Date.now() + 300; // 300ms from now

        const checkTimeAndRefresh = () => {
            if (Date.now() >= refreshTime) {
                ws.send('refresh\n\r');
                console.log('Sent refresh command after flip');
            } else {
                requestAnimationFrame(checkTimeAndRefresh);
            }
        };

        requestAnimationFrame(checkTimeAndRefresh);

        // Also update local board orientation
        myColor = myColor === 'white' ? 'black' : 'white';
        updateBoardFromChessJS();
        updatePlayerInfo();
    };
    toolbar.appendChild(flipBtn);

    // Add toolbar to container
    boardAndToolbarContainer.appendChild(toolbar);

    // Chess board container
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    const board = document.createElement('div');
    board.id = 'chessBoard';
    board.classList.add('chess-board');
    boardContainer.append(board);
    createChessBoard(board);

    // Add board container to main container
    boardAndToolbarContainer.appendChild(boardContainer);

    // Player info container (above the board)
    const topPlayerInfo = document.createElement('div');
    topPlayerInfo.classList.add('player-info');
    topPlayerInfo.classList.add('top-player');
    topPlayerInfo.classList.add('player-info-box');

    // Top player name
    const topPlayerName = document.createElement('div');
    topPlayerName.classList.add('player-name');
    topPlayerName.classList.add('player-name-display');
    topPlayerName.id = 'topPlayerName';
    topPlayerName.innerText = 'Opponent';

    // Top player clock
    const topPlayerClock = document.createElement('div');
    topPlayerClock.classList.add('player-clock');
    topPlayerClock.classList.add('player-clock-display');
    topPlayerClock.id = 'topPlayerClock';
    topPlayerClock.innerText = '00:00';

    topPlayerInfo.appendChild(topPlayerName);
    topPlayerInfo.appendChild(topPlayerClock);

    // Player info container (below the board)
    const bottomPlayerInfo = document.createElement('div');
    bottomPlayerInfo.classList.add('player-info');
    bottomPlayerInfo.classList.add('bottom-player');
    bottomPlayerInfo.classList.add('player-info-box');

    // Bottom player name
    const bottomPlayerName = document.createElement('div');
    bottomPlayerName.classList.add('player-name');
    bottomPlayerName.classList.add('player-name-display');
    bottomPlayerName.id = 'bottomPlayerName';
    bottomPlayerName.innerText = 'You';

    // Bottom player clock
    const bottomPlayerClock = document.createElement('div');
    bottomPlayerClock.classList.add('player-clock');
    bottomPlayerClock.classList.add('player-clock-display');
    bottomPlayerClock.id = 'bottomPlayerClock';
    bottomPlayerClock.innerText = '00:00';

    bottomPlayerInfo.appendChild(bottomPlayerName);
    bottomPlayerInfo.appendChild(bottomPlayerClock);

    // Add player info elements to the board container
    // First, remove the board from its parent
    if (board.parentNode) {
        board.parentNode.removeChild(board);
    }

    // Now add elements in the correct order
    boardContainer.appendChild(topPlayerInfo);
    boardContainer.appendChild(board);
    boardContainer.appendChild(bottomPlayerInfo);

    // Add container to the tab content
    tabContent.append(boardAndToolbarContainer);
}

function closeTab(typeAndName) {
    const tab = document.getElementById('tab-' + typeAndName);
    const content = document.getElementById('tab-content-' + typeAndName);
    if (!tab || !content) return;

    const tabsArray = Array.from(document.querySelectorAll("#tabs .tab"));
    const currentIndex = tabsArray.indexOf(tab);
    const isActive = tab.classList.contains("tab-active");

    // Remove tab and content
    tab.remove();
    content.remove();

    // If the closed tab was active, select another tab
    if (isActive) {
        const remainingTabs = document.querySelectorAll("#tabs .tab");
        if (remainingTabs.length > 0) {
            let nextTabIndex = currentIndex < remainingTabs.length ? currentIndex : currentIndex - 1;
            if (nextTabIndex < 0) nextTabIndex = 0;
            const nextTabId = remainingTabs[nextTabIndex].id.replace('tab-','');
            const nextTab = document.getElementById('tab-' + nextTabId);
            nextTab.classList.remove("tab-inactive");
            nextTab.classList.add("tab-active");
            const nextTabContent = document.getElementById('tab-content-' + nextTabId);
            nextTabContent.classList.add("tab-content-active");
            nextTabContent.classList.remove("tab-content-inactive");
            nextTabContent.style.display = 'flex'; // Ensure the tab content is visible
        }
    }

    // Update tabs visibility after closing a tab
    updateTabsVisibility();
}

function routeMessage(msg) {

    // Telnet uses \n\r for newlines so replace it with \n
    msg = msg.replaceAll("\n\r","\n");

    // Handle this case:
    //ROBOadmin(*)(TD) tells you: Welcome to FICS - the Free Internet Chess Server.
    //\   Please visit our homepage at http://www.freechess.org. From there you can
    //\   register or download a graphical interface. You can get help by typing
    //\   "help intro_playing". Or just ask a SR or admin - use "showsr" or "showa",
    //\   then "tell <name> My question is..."
    msg = msg.replaceAll('\n\\','\n');

    // Play bell sound
    if (msg.indexOf("\u0007") >= 0) {
        bellAudio.play();
    }
    msg = msg.replaceAll("\u0007","");


    if (!msg.endsWith("\n")) {
        msg += "\n";
    }
    if (msg.startsWith("\n")) {
        msg = msg.substring(1,msg.length);
    }

    if (isLoggingIn && preferences.autoLogin && msg.toLowerCase().includes('login: ')) {
        ws.send(preferences.ficsUsername + '\n\r');
        console.log('Sent username');
    }

    // Check for password prompt during auto-login
    if (isLoggingIn && preferences.autoLogin && msg.toLowerCase().includes('password: ')) {
        try {
            // Decode the password before sending
            const decodedPassword = atob(preferences.ficsPassword);
            ws.send(decodedPassword + '\n\r');
            console.log('Sent decoded password');
        } catch (e) {
            console.error('Error decoding password:', e);
            // Add error message directly to main text area
            mainTextArea.innerHTML += processTextToHTML('Error decoding password: ' + e.message + '\n');
            mainTextArea.scrollTop = mainTextArea.scrollHeight;
        }
        isLoggingIn = false;
    }

    if (msg.indexOf('\n**** Starting FICS session as') >=0) {
        ws.send('set style 12\n\r');
        ws.send('set prompt\n\r');
        ws.send('set interface Simple FICS Interface\n\r');
    }

    // Check for game start messages
    if (msg.includes('Creating: ') && msg.includes('vs.')) {
        const match = msg.match(/Creating: .* (\w+) vs\. (\w+)/);
        if (match && match.length >= 3) {
            // Initialize the board if it hasn't been done yet
            if (!boardInitialized) {
                initializeChessBoard();
            }
            console.log("Game creation message detected");
        }
    }

    // Get tab routing preferences from the preferences object
    const channelTellsToTabs = preferences.channelTellsToTabs;
    const directTellsToTabs = preferences.directTellsToTabs;
    const gameTellsToTabs = preferences.gameTellsToTabs;
    const autoSwitchToNewTabs = preferences.autoSwitchToNewTabs;

    var isMain = true;
    var name = null;
    var type = null;

    // Check if the message is just a FICS prompt
    const isFicsPrompt = msg.trim() === 'fics%';

    // Handle channel tells
    if (/^[a-zA-Z0-9]+\([0-9]+\)\:\s/.test(msg)) { //channel tell.
        type = "channel";
        name = msg.split(/[()]/)[1].trim();

        if (channelTellsToTabs) {
            msg = msg.replaceAll("\nfics% ","");

            var tabId = type + "-" + name;
            var tab = document.getElementById("tab-" + tabId);
            if (!tab) {
                createTab(type, name);

                // Auto-switch to new tab if enabled
                if (autoSwitchToNewTabs) {
                    const tabLabel = document.getElementById("tab-label-" + tabId);
                    if (tabLabel) {
                        tabLabel.click();
                    }
                }
            }
            isMain = false;
            var textArea = document.getElementById("textarea-" + tabId);

            // Check if the console already ends with the prompt
            const consoleEndsWithPrompt = textArea.innerHTML.endsWith('fics%');

            // No fics prompt in channel tabs.
            const autoScroll = textArea.scrollHeight - textArea.scrollTop <= textArea.clientHeight;
            textArea.innerHTML += processTextToHTML(msg);
            if (autoScroll)
                textArea.scrollTop = textArea.scrollHeight;

        }
    }

    if (isMain && msg.trim() !== '') {
        const style12Start = msg.startsWith("<12>") ? 0 : msg.lastIndexOf("\n<12>");
        if (style12Start >= 0) {
            const end = msg.indexOf("\n",style12Start+1);

            if (end>=0) {
                const style12Message = msg.substring(style12Start,end);
                if (!preferences.showStyle12Events) {
                    msg = msg.substring(0,style12Start) + msg.substring(end + 1,msg.length);
                }

                if (!boardInitialized) {
                    initializeChessBoard();
                }
                updateChessBoard(style12Message);
                parseStyle12Info(style12Message);
            }
        }

        // Check if the main console already ends with the prompt
        const consoleEndsWithPrompt = mainTextArea.innerHTML.endsWith('fics%');

        if (!(isFicsPrompt && consoleEndsWithPrompt)) {
            const autoScroll = mainTextArea.scrollHeight - mainTextArea.scrollTop <= mainTextArea.clientHeight;
            mainTextArea.innerHTML += processTextToHTML(msg);
            if (autoScroll) {
                mainTextArea.scrollTop = mainTextArea.scrollHeight;
            }
        }
    }
}

// Drag and drop variables are now declared at the top of the file

function createChessBoard(board) {
    // Create a container for the board and labels
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('chess-board-container');
    board.parentNode.insertBefore(boardContainer, board);
    boardContainer.appendChild(board);

    board.innerHTML = '';

    // Set up the board as a responsive grid
    board.style.display = 'grid';
    board.style.gridTemplateColumns = 'repeat(8, 1fr)';
    board.style.gridTemplateRows = 'repeat(8, 1fr)';
    board.style.width = '100%';
    board.style.height = '100%';
    board.style.aspectRatio = '1 / 1'; // Maintain square aspect ratio

    // Create the chess squares with embedded rank and file labels
    for (let rank = 8; rank >= 1; rank--) {
        for (let file = 1; file <= 8; file++) {
            const square = document.createElement('div');
            square.classList.add('chess-square');
            square.classList.add((rank + file) % 2 === 0 ? 'light-square' : 'dark-square');
            square.id = `square-${file}-${rank}`;
            square.dataset.file = file;
            square.dataset.rank = rank;
            square.dataset.algebraic = `${String.fromCharCode(96 + file)}${rank}`;

            // Add both click and drag-drop event listeners
            square.addEventListener('click', () => handleSquareClick(file, rank));


            // Add dragover and drop events for the square
            square.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                if (validMoves.includes(square.dataset.algebraic)) {
                    square.classList.add('valid-move');
                }
            });

            square.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece && startSquare) {
                    const targetSquare = square.dataset.algebraic;
                    handleDrop(targetSquare);
                }
            });

            // Add rank label to rightmost squares
            if (file === 8) {
                const rankLabel = document.createElement('div');
                rankLabel.classList.add('rank-label');
                rankLabel.classList.add('rank-label-common');
                rankLabel.textContent = rank;
                rankLabel.style.right = '2px';
                rankLabel.style.left = 'auto';
                square.appendChild(rankLabel);
            }

            // Add file label to bottom row squares
            if (rank === 1) {
                const fileLabel = document.createElement('div');
                fileLabel.classList.add('file-label');
                fileLabel.classList.add('file-label-common');
                fileLabel.textContent = String.fromCharCode(96 + file);

                // Move the h-file label to the left to avoid the resize handle
                if (file === 8) {
                    fileLabel.style.right = '15px';
                }

                square.appendChild(fileLabel);
            }

            // Add a container for the chess piece
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('chess-piece');
            // Set initial font size based on board dimensions
            const initialSquareSize = 400 / 8; // Initial board width divided by 8
            pieceElement.style.fontSize = Math.max(Math.floor(initialSquareSize * 0.8), 24) + 'px';
            square.appendChild(pieceElement);

            // Square dimensions are now handled by CSS

            board.appendChild(square);
        }
    }

    // Add resize observer to update labels when board is resized
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;

            // Ensure the board remains square by setting height equal to width
            if (width !== height) {
                // Use the smaller dimension to ensure it fits in the container
                const size = Math.min(width, height);
                board.style.width = size + 'px';
                board.style.height = size + 'px';
            }

            const squareSize = width / 8; // Since width and height are equal, use width

            // Update font size of rank and file labels based on square size
            const rankLabels = board.querySelectorAll('.rank-label');
            const fileLabels = board.querySelectorAll('.file-label');
            const labelFontSize = Math.max(Math.floor(squareSize * 0.15), 6) + 'px';

            rankLabels.forEach(label => {
                label.style.fontSize = labelFontSize;
                // Only show rank labels on the rightmost column
                const squareElement = label.parentElement;
                const file = parseInt(squareElement.dataset.file);
                label.style.display = file === 8 ? 'block' : 'none';

                // Force rank labels to stay on the right side
                label.style.right = '2px';
                label.style.left = 'auto';
                // Use setAttribute to ensure the style is applied
                label.setAttribute('style', label.getAttribute('style') + '; left: auto !important; right: 2px;');
            });

            fileLabels.forEach(label => {
                label.style.fontSize = labelFontSize;
                // Only show file labels on the bottom row
                const squareElement = label.parentElement;
                const rank = parseInt(squareElement.dataset.rank);
                const file = parseInt(squareElement.dataset.file);
                label.style.display = rank === 1 ? 'block' : 'none';

                // Ensure file labels are at the bottom right
                label.style.bottom = '2px';
                label.style.right = '2px';

                // Special case for h-file to avoid resize handle
                if (file === 8) {
                    label.style.right = '15px';
                }
            });

            // Update the font size of pieces based on square size
            const pieceElements = board.querySelectorAll('.chess-piece');
            // Use a larger proportion of the square for the piece size
            const fontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';
            pieceElements.forEach(piece => {
                piece.style.fontSize = fontSize;
            });

            // Also update any existing pieces in the updateBoardFromChessJS function
            if (typeof updatePieceSizes === 'function') {
                updatePieceSizes(squareSize);
            }
        }
    });

    // Add a small resize handle to make it possible to resize the board
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    board.appendChild(resizeHandle);

    // Add a manual resize handler to ensure square aspect ratio
    board.addEventListener('mousedown', (e) => {
        if (e.offsetX > board.offsetWidth - 20 && e.offsetY > board.offsetHeight - 20) {
            // Near the resize handle
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = board.offsetWidth;

            const onMouseMove = (moveEvent) => {
                const newWidth = startWidth + (moveEvent.clientX - startX);
                // Set both width and height to the same value to maintain square aspect ratio
                board.style.width = newWidth + 'px';
                board.style.height = newWidth + 'px';
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

    resizeObserver.observe(board);

    // Initialize with starting position
    chess.reset();
    updateBoardFromChessJS();
}


function handleSquareClick(file, rank) {
    const square = `${String.fromCharCode(96 + file)}${rank}`;
    const squareDiv = document.getElementById(`square-${file}-${rank}`);

    // Check if it's the player's turn
    const playerColor = myColor === 'white' ? 'w' : 'b';
    if (chess.turn() !== playerColor) {
        // If it's not the player's turn, just return
        return;
    }

    if (selectedSquare === square) {
        // Deselect if clicked again
        selectedSquare = null;
        validMoves = [];
        updateBoardFromChessJS();
    } else if (validMoves.includes(square)) {
        // Check if this is a pawn promotion move
        const piece = chess.get(selectedSquare);
        const isPromotion = piece &&
                           piece.type === 'p' &&
                           ((piece.color === 'w' && rank === 8) ||
                            (piece.color === 'b' && rank === 1));

        if (isPromotion) {
            // Ask user what piece to promote to
            const promotionPiece = prompt('Promote pawn to: (q)ueen, (r)ook, (b)ishop, (n)knight', 'q');
            const validPromotions = ['q', 'r', 'b', 'n'];
            const promotion = validPromotions.includes(promotionPiece) ? promotionPiece : 'q';

            // Make move with promotion
            const move = {
                from: selectedSquare,
                to: square,
                promotion: promotion
            };
            chess.move(move);
            ws.send(`move ${move.from}${move.to}=${promotion}\n\r`);
        } else {
            // Get the file and rank numbers for animation
            const fromFile = selectedSquare.charCodeAt(0) - 96;
            const fromRank = parseInt(selectedSquare.charAt(1));
            const toFile = file;
            const toRank = rank;

            // Prepare animation data
            const fromSquare = { file: fromFile, rank: fromRank };
            const toSquare = { file: toFile, rank: toRank };

            // Make regular move
            const move = {
                from: selectedSquare,
                to: square
            };
            chess.move(move);
            ws.send(`move ${move.from}${move.to}\n\r`);

            // Animate the piece movement
            animatePieceMove(fromSquare, toSquare, () => {
                // Play sound after animation completes
                if (move.captured) {
                    captureAudio.play();
                } else {
                    moveAudio.play();
                }

                // Update the board after animation completes
                updateBoardFromChessJS();
            });
        }

        // Reset selection
        selectedSquare = null;
        validMoves = [];

        // Update the current turn and restart the clock
        currentTurn = chess.turn();
        restartClock(); // Restart the clock for the new player
    } else {
        // Check if the square has a piece
        const piece = chess.get(square);
        if (piece) {
            // Only allow selecting pieces of the player's color
            const playerColor = myColor === 'white' ? 'w' : 'b';

            if (piece.color === playerColor) {
                // Select new square and highlight valid moves
                selectedSquare = square;
                validMoves = chess.moves({ square: square, verbose: true }).map(move => move.to);
                updateBoardFromChessJS();
            }
        }
    }
}

// Function to update piece sizes based on square size
function updatePieceSizes(squareSize) {
    const pieceElements = document.querySelectorAll('.chess-piece');
    // For Material Symbols font, we need to adjust the size to fill the square properly
    const fontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';
    pieceElements.forEach(piece => {
        piece.style.fontSize = fontSize;
    });
}

// Function to detect a move between two positions and animate it
function detectAndAnimateMove(oldFen, newFen, callback) {
    // Create temporary chess instances to analyze the positions
    const oldChess = new Chess(oldFen);
    const newChess = new Chess(newFen);

    // If the turn has changed, a move was made
    if (oldChess.turn() !== newChess.turn()) {
        // Find the piece that moved
        let fromSquare = null;
        let toSquare = null;

        // Check each square
        for (let file = 1; file <= 8; file++) {
            for (let rank = 1; rank <= 8; rank++) {
                const square = `${String.fromCharCode(96 + file)}${rank}`;
                const oldPiece = oldChess.get(square);
                const newPiece = newChess.get(square);

                // If a piece was on this square in the old position but not in the new position,
                // it might be the piece that moved (or was captured)
                if (oldPiece && (!newPiece || oldPiece.type !== newPiece.type || oldPiece.color !== newPiece.color)) {
                    // This could be the from square
                    if (!fromSquare) {
                        fromSquare = { file, rank };
                    }
                }

                // If a piece is on this square in the new position but not in the old position,
                // or if the piece changed, this might be the to square
                if (newPiece && (!oldPiece || oldPiece.type !== newPiece.type || oldPiece.color !== newPiece.color)) {
                    // This could be the to square
                    if (!toSquare) {
                        toSquare = { file, rank };
                    }
                }
            }
        }

        // If we found both squares, animate the move
        if (fromSquare && toSquare) {
            animatePieceMove(fromSquare, toSquare, callback);
            return;
        }
    }

    // If we couldn't detect a move or there was no move, just call the callback
    if (callback) callback();
}

// Function to animate a piece movement
function animatePieceMove(fromSquare, toSquare, callback) {
    const board = document.getElementById('chessBoard');
    if (!board) {
        if (callback) callback();
        return;
    }

    // Get the source and destination elements
    const fromElement = document.getElementById(`square-${fromSquare.file}-${fromSquare.rank}`);
    const toElement = document.getElementById(`square-${toSquare.file}-${toSquare.rank}`);

    if (!fromElement || !toElement) {
        if (callback) callback();
        return;
    }

    // Get the piece element from the source square
    const pieceElement = fromElement.querySelector('.chess-piece');
    if (!pieceElement || !pieceElement.innerHTML.trim()) {
        if (callback) callback();
        return;
    }

    // Save the piece content
    const pieceContent = pieceElement.innerHTML;

    // Hide the original piece during animation
    pieceElement.innerHTML = '';

    // Create a new piece element for animation
    const animatedPiece = document.createElement('div');
    animatedPiece.classList.add('chess-piece', 'animated-piece');
    animatedPiece.innerHTML = pieceContent;
    animatedPiece.style.zIndex = '1000';
    animatedPiece.style.pointerEvents = 'none';

    // Calculate the square size
    const squareSize = board.clientWidth / 8;

    // Position the animated piece at the starting position
    board.appendChild(animatedPiece);
    animatedPiece.style.position = 'absolute';
    animatedPiece.style.width = squareSize + 'px';
    animatedPiece.style.height = squareSize + 'px';
    animatedPiece.style.display = 'flex';
    animatedPiece.style.justifyContent = 'center';
    animatedPiece.style.alignItems = 'center';

    // Calculate the starting position (in board coordinates)
    const startX = (fromSquare.file - 1) * squareSize;
    const startY = (8 - fromSquare.rank) * squareSize;

    // Calculate the ending position (in board coordinates)
    const endX = (toSquare.file - 1) * squareSize;
    const endY = (8 - toSquare.rank) * squareSize;

    // Set the initial position
    animatedPiece.style.left = startX + 'px';
    animatedPiece.style.top = startY + 'px';

    // Start the animation using requestAnimationFrame instead of setTimeout
    requestAnimationFrame(() => {
        // Force a reflow to ensure the initial position is applied
        animatedPiece.getBoundingClientRect();

        // Apply the transition and move to end position
        animatedPiece.style.transition = 'left 0.225s ease-out, top 0.225s ease-out';
        animatedPiece.style.left = endX + 'px';
        animatedPiece.style.top = endY + 'px';

        // Listen for the transition end event instead of using setTimeout
        animatedPiece.addEventListener('transitionend', function onTransitionEnd(e) {
            // Only handle the first transition end event (there will be one for each property)
            if (e.propertyName === 'left') {
                // Remove the event listener to prevent multiple calls
                animatedPiece.removeEventListener('transitionend', onTransitionEnd);

                // Remove the animated piece and call the callback
                animatedPiece.remove();
                if (callback) callback();
            }
        });
    });
}

function updateBoardFromChessJS(lastMove) {
    // Get the board dimensions to scale pieces appropriately
    const board = document.getElementById('chessBoard');
    const squareSize = board ? board.clientWidth / 8 : 50;
    const fontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';
    const labelFontSize = Math.max(Math.floor(squareSize * 0.15), 6) + 'px';

    for (let rank = 8; rank >= 1; rank--) {
        for (let file = 1; file <= 8; file++) {
            const square = `${String.fromCharCode(96 + file)}${rank}`;
            const squareDiv = document.getElementById(`square-${file}-${rank}`);
            if (!squareDiv) continue;

            // Update font size based on board size
            squareDiv.style.fontSize = fontSize;

            const piece = chess.get(square);
            let pieceSymbol = '';

            if (piece) {
                // Use SVG images for chess pieces
                const pieceColor = piece.color === 'w' ? 'w' : 'b';
                const pieceType = piece.type.toUpperCase();
                pieceSymbol = `<img src="pieces/${currentPieceSet}/${pieceColor}${pieceType}.svg" alt="${pieceColor}${pieceType}" />`;
            }

            // Check if we need to create or update the rank and file labels
            let rankLabel = squareDiv.querySelector('.rank-label');
            let fileLabel = squareDiv.querySelector('.file-label');

            // If labels don't exist, create them
            if (!rankLabel) {
                rankLabel = document.createElement('div');
                rankLabel.classList.add('rank-label');
                rankLabel.textContent = rank;
                squareDiv.appendChild(rankLabel);
            }

            if (!fileLabel) {
                fileLabel = document.createElement('div');
                fileLabel.classList.add('file-label');
                fileLabel.textContent = String.fromCharCode(96 + file);
                squareDiv.appendChild(fileLabel);
            }

            // Update label visibility and position
            rankLabel.style.fontSize = labelFontSize;
            rankLabel.style.display = file === 8 ? 'block' : 'none';

            // Force rank labels to stay on the right side
            rankLabel.style.left = 'auto !important';
            rankLabel.style.right = '2px';
            rankLabel.setAttribute('style', rankLabel.getAttribute('style') + '; left: auto !important;');

            fileLabel.style.fontSize = labelFontSize;
            fileLabel.style.display = rank === 1 ? 'block' : 'none';
            fileLabel.style.bottom = '2px'; // Ensure it's always at the bottom
            fileLabel.style.left = '2px'; // Position on the left
            fileLabel.style.right = 'auto'; // Clear any right positioning

            // Set label colors based on square color for better contrast
            if (squareDiv.classList.contains('light-square')) {
                // If it's a light square, use dark square color
                rankLabel.style.color = darkSquareColor;
                fileLabel.style.color = darkSquareColor;
            } else {
                // If it's a dark square, use light square color
                rankLabel.style.color = lightSquareColor;
                fileLabel.style.color = lightSquareColor;
            }

            // No need for special handling of h-file label anymore since all labels are on the left

            // Create a piece element or update existing one
            let pieceElement = squareDiv.querySelector('.chess-piece');
            if (!pieceElement) {
                pieceElement = document.createElement('div');
                pieceElement.classList.add('chess-piece');
                squareDiv.appendChild(pieceElement);
            }

            // Clear any previous event listeners
            const newPieceElement = pieceElement.cloneNode(false);
            if (pieceElement.parentNode) {
                pieceElement.parentNode.replaceChild(newPieceElement, pieceElement);
            }
            pieceElement = newPieceElement;
            squareDiv.appendChild(pieceElement);

            pieceElement.innerHTML = pieceSymbol;
            pieceElement.style.fontSize = Math.max(Math.floor(squareSize * 0.8), 24) + 'px';

            // Add drag events to pieces
            if (piece) {
                const playerColor = myColor === 'white' ? 'w' : 'b';

                // Only allow dragging player's own pieces and only on their turn
                if (piece.color === playerColor && chess.turn() === playerColor) {
                    pieceElement.setAttribute('draggable', 'true');

                    pieceElement.addEventListener('dragstart', (e) => {
                        // Store the piece and starting square
                        draggedPiece = piece;
                        draggedPieceElement = pieceElement;
                        startSquare = square;

                        // Highlight valid moves
                        validMoves = chess.moves({ square: square, verbose: true }).map(move => move.to);
                        updateBoardHighlights();

                        // Add dragging class for styling using requestAnimationFrame instead of setTimeout
                        requestAnimationFrame(() => {
                            pieceElement.classList.add('dragging');
                        });
                    });

                    pieceElement.addEventListener('dragend', () => {
                        // Clean up after dragging ends
                        pieceElement.classList.remove('dragging');

                        // Reset if the piece wasn't dropped on a valid square
                        if (draggedPiece) {
                            draggedPiece = null;
                            draggedPieceElement = null;
                            startSquare = null;
                            validMoves = [];
                            updateBoardHighlights();
                        }
                    });
                } else {
                    pieceElement.setAttribute('draggable', 'false');
                }
            }

            // Remove any previous children that aren't labels or the piece element
            Array.from(squareDiv.childNodes).forEach(node => {
                if (node !== rankLabel && node !== fileLabel && node !== pieceElement && node.nodeType === Node.TEXT_NODE) {
                    squareDiv.removeChild(node);
                }
            });

            // Highlighting is now handled by updateBoardHighlights()

            // Set the piece image
            if (pieceSymbol) {
                pieceElement.innerHTML = pieceSymbol;
            } else {
                pieceElement.innerHTML = '';
            }
        }
    }
    // Update board highlights
    updateBoardHighlights();

    // Update game status
    const status = document.getElementById('gameStatus');
    if (status) {
        if (chess.game_over()) {
            status.innerText = 'Game Over';
            if (chess.in_checkmate()) status.innerText += ': Checkmate';
            else if (chess.in_draw()) status.innerText += ': Draw';

            // Stop the clock when the game is over
            stopClock();
        } else {
            status.innerText = chess.turn() === 'w' ? 'White to move' : 'Black to move';
        }
    }

    // Update current turn and player info
    currentTurn = chess.turn();
    updatePlayerInfo();
}

// Function to process Style12 messages
function processStyle12Message(msg) {
    console.log('Processing Style12 message, preferences.showStyle12Events =', showStyle12Events);

    // Initialize the board if it hasn't been done yet
    if (!boardInitialized) {
        initializeChessBoard();
    }

    // Update the chess board with the Style 12 data
    updateChessBoard(msg);

    // Also directly parse the Style 12 message for player info and clock times
    // This ensures the info is updated even if the board update fails
    parseStyle12Info(msg);
}

// Function to parse Style 12 messages for game information
function parseStyle12Info(style12Message) {
    const lines = style12Message.split('\n');
    const boardLineIndex = lines.findIndex(line => line.trim().startsWith('<12>'));

    if (boardLineIndex !== -1) {
        const boardLine = lines[boardLineIndex].trim();
        const parts = boardLine.split(' ');

        // Log the Style 12 message for debugging
        console.log('Style 12 message:', boardLine);
        console.log('Parts length:', parts.length);

        // According to FICS Style 12 documentation:
        // https://www.freechess.org/Help/HelpFiles/style12.html
        // There are always exactly 31 non-empty fields separated by blanks

        if (parts.length >= 31) { // Make sure we have enough parts
            try {
                // Extract all information from the Style 12 format
                // Field 0: <12> identifier
                // Fields 1-8: Board position (8 ranks)
                // Field 9: Color to move (B or W)
                const colorToMove = parts[9] === 'W' ? 'w' : 'b';

                // Field 10: Double pawn push file or -1
                const doublePawnPush = parseInt(parts[10], 10);

                // Fields 11-14: Castling availability (convert from 0/1 to boolean)
                const whiteCastleShort = parseInt(parts[11], 10) === 1;
                const whiteCastleLong = parseInt(parts[12], 10) === 1;
                const blackCastleShort = parseInt(parts[13], 10) === 1;
                const blackCastleLong = parseInt(parts[14], 10) === 1;

                // Field 15: Irreversible count (for 50-move rule)
                const irreversibleCount = parseInt(parts[15], 10);

                // Field 16: Game number
                const gameNumber = parseInt(parts[16], 10);

                // Fields 17-18: Player names
                const whiteName = parts[17];
                const blackName = parts[18];

                // Field 19: My relation to this game
                const relationValue = parseInt(parts[19], 10);
                // Map the numeric value to the GameRelation enum
                let relation;
                switch(relationValue) {
                    case -3: relation = GameRelation.ISOLATED_POSITION; break;
                    case -2: relation = GameRelation.OBSERVING_EXAMINED; break;
                    case 2: relation = GameRelation.EXAMINING; break;
                    case -1: relation = GameRelation.PLAYING_OPPONENT_MOVE; break;
                    case 1: relation = GameRelation.PLAYING_MY_MOVE; break;
                    case 0: relation = GameRelation.OBSERVING_PLAYED; break;
                    default: relation = relationValue; // Fallback for unknown values
                }
                console.log('Game relation:', GameRelation.getDescription(relation));

                // Fields 20-21: Initial time and increment
                const initialTime = parseInt(parts[20], 10);
                const increment = parseInt(parts[21], 10);

                // Fields 22-23: Material strength
                const whiteMaterial = parseInt(parts[22], 10);
                const blackMaterial = parseInt(parts[23], 10);

                // Fields 24-25: Remaining time in seconds
                // According to FICS Style12 format, these are in seconds
                const whiteTimeSecs = parseFloat(parts[24]);
                const blackTimeSecs = parseFloat(parts[25]);

                console.log('Raw time values from Style12 - White:', parts[24], 'seconds, Black:', parts[25], 'seconds');

                // Field 26: Move number
                const moveNumber = parseInt(parts[26], 10);

                // Field 27: Verbose coordinate notation for previous move
                const lastMove = parts[27];

                // Field 28: Time taken for previous move
                const lastMoveTime = parts[28];

                // Field 29: Pretty notation for previous move
                const lastMovePretty = parts[29];
                console.log('Parsed lastMovePretty from Style12:', lastMovePretty, 'from parts[29]:', parts[29]);

                // Field 30: Board orientation (1 = Black at bottom, 0 = White at bottom)
                const flipBoard = parseInt(parts[30], 10) === 1;

                // Format clock times
                const whiteTime = formatClockTime(whiteTimeSecs);
                const blackTime = formatClockTime(blackTimeSecs);

                console.log('Parsed Style 12 - White time:', whiteTime, 'Black time:', blackTime);

                // Update global variables
                whitePlayerName = whiteName;
                blackPlayerName = blackName;

                // Store the time in seconds for the clock timer
                // Style12 times always take precedence over local timers
                whiteTimeSeconds = whiteTimeSecs;
                blackTimeSeconds = blackTimeSecs;
                whitePlayerClock = whiteTime;
                blackPlayerClock = blackTime;

                console.log('Received new times from Style12 - White:', whiteTime, 'Black:', blackTime);

                // Always stop any existing clock and restart with the new times
                stopClock();
                currentTurn = colorToMove;
                updatePlayerInfo(); // Update UI with new times
                startClock(); // Start the clock with the new times

                // Update gameInfo object with all the parsed information
                gameInfo = {
                    gameNumber,
                    initialTime,
                    increment,
                    whiteMaterial,
                    blackMaterial,
                    moveNumber,
                    lastMove,
                    lastMoveTime,
                    lastMovePretty,
                    relation,
                    doublePawnPush,
                    whiteCastleShort,
                    whiteCastleLong,
                    blackCastleShort,
                    blackCastleLong,
                    irreversibleCount
                };
                updatePlayerInfo();
            } catch (e) {
                console.error('Error parsing Style 12 message:', e);
            }
        } else {
            console.warn('Style 12 message has fewer than 31 parts:', parts.length);
        }
    }
}

function startClock() {
    if (isClockRunning) return;

    isClockRunning = true;
    clockTimer = null;
    let lastUpdateTime = Date.now();

    const updateClock = () => {
        if (!isClockRunning) return;

        const now = Date.now();
        const deltaTime = now - lastUpdateTime;

        if (deltaTime >= 1000) {
            if (currentTurn === 'w') {
                whiteTimeSeconds = Math.max(0, whiteTimeSeconds - 1);
                whitePlayerClock = formatClockTime(whiteTimeSeconds);
            } else {
                blackTimeSeconds = Math.max(0, blackTimeSeconds - 1);
                blackPlayerClock = formatClockTime(blackTimeSeconds);
            }

            updatePlayerInfo();

            if ((currentTurn === 'w' && whiteTimeSeconds <= 0) ||
                (currentTurn === 'b' && blackTimeSeconds <= 0)) {
                stopClock();
                return;
            }

            lastUpdateTime = now - (deltaTime % 1000);
        }

        clockTimer = requestAnimationFrame(updateClock);
    };

    clockTimer = requestAnimationFrame(updateClock);
}

function stopClock() {
    if (!isClockRunning) return;

    isClockRunning = false;

    if (clockTimer) {
        cancelAnimationFrame(clockTimer);
        clockTimer = null;
    }
}

function restartClock() {
    stopClock();
    updatePlayerInfo();
    startClock();
}

function formatClockTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        console.warn('Invalid time value:', seconds);
        return '05:00'; // Default to 5 minutes
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updatePlayerInfo() {
    const topPlayerName = document.getElementById('topPlayerName');
    const topPlayerClock = document.getElementById('topPlayerClock');
    const bottomPlayerName = document.getElementById('bottomPlayerName');
    const bottomPlayerClock = document.getElementById('bottomPlayerClock');
    const topMoveIndicator = document.getElementById('topMoveIndicator');
    const bottomMoveIndicator = document.getElementById('bottomMoveIndicator');
    const lastMoveDisplay = document.getElementById('lastMoveDisplay');

    if (!topPlayerName || !topPlayerClock || !bottomPlayerName || !bottomPlayerClock ||
        !topMoveIndicator || !bottomMoveIndicator) {
        console.warn('Player info elements not found');
        return;
    }

    if (myColor === 'white') {
        topPlayerName.innerText = blackPlayerName || 'Black';
        topPlayerClock.innerText = blackPlayerClock;
        bottomPlayerName.innerText = whitePlayerName || 'White';
        bottomPlayerClock.innerText = whitePlayerClock;

        // Lime green for active player, burgundy for inactive
        topPlayerClock.style.color = currentTurn === 'b' ? '#32CD32' : '#800020';
        bottomPlayerClock.style.color = currentTurn === 'w' ? '#32CD32' : '#800020';

        topMoveIndicator.style.backgroundColor = currentTurn === 'b' ? '#32CD32' : 'transparent';
        bottomMoveIndicator.style.backgroundColor = currentTurn === 'w' ? '#32CD32' : 'transparent';
    } else {
        topPlayerName.innerText = whitePlayerName || 'White';
        topPlayerClock.innerText = whitePlayerClock;
        bottomPlayerName.innerText = blackPlayerName || 'Black';
        bottomPlayerClock.innerText = blackPlayerClock;

        topPlayerClock.style.color = currentTurn === 'w' ? '#32CD32' : '#800020';
        bottomPlayerClock.style.color = currentTurn === 'b' ? '#32CD32' : '#800020';

        topMoveIndicator.style.backgroundColor = currentTurn === 'w' ? '#32CD32' : 'transparent';
        bottomMoveIndicator.style.backgroundColor = currentTurn === 'b' ? '#32CD32' : 'transparent';
    }

    if (lastMoveDisplay && gameInfo && gameInfo.lastMovePretty) {
        lastMoveDisplay.innerText = `Last move: ${gameInfo.lastMovePretty} ${gameInfo.lastMoveTime}`;
    } else if (lastMoveDisplay) {
        lastMoveDisplay.innerText = '';
    }
}

// previousPosition is now declared at the top of the file

function updateChessBoard(style12Message) {
    // Save the current position before updating
    if (chess) {
        previousPosition = chess.fen();
    }

    // Parse Style 12 message to update chess.js position
    const lines = style12Message.split('\n');
    const boardLineIndex = lines.findIndex(line => line.trim().startsWith('<12>'));

    if (boardLineIndex !== -1) {
        const boardLine = lines[boardLineIndex].trim();

        // Style 12 format: <12> [8 rows of board] [turn W/B] [other data...]
        const parts = boardLine.split(' ');

        if (parts.length >= 10) { // At least <12> + 8 rows + turn
            try {
                // Extract the 8 rows of the board (parts[1] through parts[8])
                const boardRows = parts.slice(1, 9);

                // Convert Style 12 board representation to FEN
                let fen = '';
                for (let i = 0; i < 8; i++) {
                    let row = boardRows[i];
                    let emptyCount = 0;
                    let fenRow = '';

                    for (let j = 0; j < row.length; j++) {
                        const char = row.charAt(j);
                        if (char === '-') {
                            emptyCount++;
                        } else {
                            if (emptyCount > 0) {
                                fenRow += emptyCount;
                                emptyCount = 0;
                            }

                            // Convert FICS piece notation to FEN
                            // In FICS Style12: P=white pawn, p=black pawn, etc.
                            // In FEN: P=white pawn, p=black pawn, etc.
                            // So we can use the character directly
                            fenRow += char;
                        }
                    }

                    if (emptyCount > 0) {
                        fenRow += emptyCount;
                    }

                    fen += fenRow + (i < 7 ? '/' : '');
                }

                // Add turn
                fen += ' ' + (parts[9] === 'W' ? 'w' : 'b');

                // Add castling, en passant, halfmove, fullmove (simplified)
                fen += ' KQkq - 0 1';

                console.log("Generated FEN:", fen);

                // Load the position into chess.js
                try {
                    // Check if we have a previous position to animate from
                    if (previousPosition) {
                        // First load the new position
                        chess.load(fen);
                        console.log("Chess position loaded successfully");

                        // Then detect and animate the move
                        detectAndAnimateMove(previousPosition, chess.fen(), () => {
                            // Play sound after animation completes
                            if (gameInfo && gameInfo.lastMovePretty && gameInfo.lastMovePretty.includes('x')) {
                                captureAudio.play();
                            } else {
                                moveAudio.play();
                            }

                            // Update the board after animation completes
                            updateBoardFromChessJS();
                        });
                    } else {
                        // No previous position, just update the board
                        chess.load(fen);
                        console.log("Chess position loaded successfully");
                        updateBoardFromChessJS();
                    }
                } catch (e) {
                    console.error("Failed to load FEN into chess.js:", e);
                    console.error("Invalid FEN:", fen);
                    // If loading fails, try a different approach or reset to starting position
                    try {
                        // Alternative approach: manually set up the board
                        chess.clear();

                        // Map board positions
                        for (let rank = 0; rank < 8; rank++) {
                            const row = boardRows[rank];
                            for (let file = 0; file < row.length; file++) {
                                const char = row.charAt(file);
                                if (char !== '-') {
                                    const square = String.fromCharCode(97 + file) + (8 - rank);
                                    const color = char === char.toUpperCase() ? 'w' : 'b';
                                    const pieceType = char.toLowerCase();
                                    chess.put({ type: pieceType, color: color }, square);
                                }
                            }
                        }

                        // We can't directly set the turn in chess.js
                        // Instead, we'll create a new position with the correct turn

                        // Get the current position as FEN
                        let fen = chess.fen();
                        // Split the FEN string into its components
                        let fenParts = fen.split(' ');
                        // Set the turn (the 2nd component of the FEN string)
                        fenParts[1] = parts[9] === 'W' ? 'w' : 'b';
                        // Rejoin the FEN string
                        fen = fenParts.join(' ');
                        // Load the updated FEN
                        try {
                            chess.load(fen);
                        } catch (e) {
                            // If there's an error, just log it and continue
                            console.error('Error setting turn:', e);
                        }

                        // Set player color based on Style 12 message
                        // parts[9] is the current turn (W/B)
                        // parts[10] is -1 if it's the player's move, 1 if it's the opponent's move
                        if (parts.length > 10) {
                            const isPlayerMove = parts[10] === '-1';
                            if (parts[9] === 'W') {
                                // If it's White's turn and it's the player's move, player is White
                                // If it's White's turn and it's not the player's move, player is Black
                                myColor = isPlayerMove ? 'white' : 'black';
                            } else {
                                // If it's Black's turn and it's the player's move, player is Black
                                // If it's Black's turn and it's not the player's move, player is White
                                myColor = isPlayerMove ? 'black' : 'white';
                            }
                        }

                        // Just update the board
                        updateBoardFromChessJS();
                    } catch (e2) {
                        // If there's an error, reset the board
                        chess.reset();
                        updateBoardFromChessJS();
                    }
                }

                // Note: parseStyle12Info is now called directly from routeMessage
                // to ensure it's always called, even if board update fails
            } catch (e) {
                // Silently handle parsing errors
            }
        }
    }
}

// Function to update board highlights for selected squares and valid moves
function updateBoardHighlights() {
    // Update all squares
    for (let rank = 8; rank >= 1; rank--) {
        for (let file = 1; file <= 8; file++) {
            const square = `${String.fromCharCode(96 + file)}${rank}`;
            const squareDiv = document.getElementById(`square-${file}-${rank}`);
            if (!squareDiv) continue;

            // Remove existing highlights
            squareDiv.classList.remove('selected', 'valid-move');

            // Add appropriate highlights
            if (square === selectedSquare || square === startSquare) {
                squareDiv.classList.add('selected');
            } else if (validMoves.includes(square)) {
                squareDiv.classList.add('valid-move');
            }
        }
    }
}

// Function to handle dropping a piece on a square
function handleDrop(targetSquare) {
    // Check if the target square is a valid move
    if (validMoves.includes(targetSquare)) {
        // Check if this is a pawn promotion move
        const piece = draggedPiece;
        const rank = parseInt(targetSquare.charAt(1));
        const isPromotion = piece &&
                           piece.type === 'p' &&
                           ((piece.color === 'w' && rank === 8) ||
                            (piece.color === 'b' && rank === 1));

        if (isPromotion) {
            // Ask user what piece to promote to
            const promotionPiece = prompt('Promote pawn to: (q)ueen, (r)ook, (b)ishop, (n)knight', 'q');
            const validPromotions = ['q', 'r', 'b', 'n'];
            const promotion = validPromotions.includes(promotionPiece) ? promotionPiece : 'q';

            // Make move with promotion
            const move = {
                from: startSquare,
                to: targetSquare,
                promotion: promotion
            };
            chess.move(move);
            ws.send(`move ${move.from}${move.to}=${promotion}\n\r`);
        } else {
            // Get the file and rank numbers for animation
            const fromFile = startSquare.charCodeAt(0) - 96;
            const fromRank = parseInt(startSquare.charAt(1));
            const toFile = targetSquare.charCodeAt(0) - 96;
            const toRank = parseInt(targetSquare.charAt(1));

            // Prepare animation data
            const fromSquare = { file: fromFile, rank: fromRank };
            const toSquare = { file: toFile, rank: toRank };

            // Make regular move
            const move = {
                from: startSquare,
                to: targetSquare
            };
            chess.move(move);
            ws.send(`move ${move.from}${move.to}\n\r`);

            // Animate the piece movement
            animatePieceMove(fromSquare, toSquare, () => {
                // Play sound after animation completes
                if (move.captured) {
                    captureAudio.play();
                } else {
                    moveAudio.play();
                }

                // Update the board after animation completes
                updateBoardFromChessJS();
            });
        }

        // Reset drag state
        draggedPiece = null;
        draggedPieceElement = null;
        startSquare = null;
        selectedSquare = null;
        validMoves = [];

        // Update the current turn and restart the clock
        currentTurn = chess.turn();
        restartClock(); // Restart the clock for the new player
    }
}

// Moves are made directly by clicking on the board or by dragging pieces

// Hamburger menu functionality
function setupPreferencesMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const preferencesPanel = document.getElementById('preferencesPanel');
    const saveButton = document.getElementById('savePreferences');
    const prefPieceSet = document.getElementById('prefPieceSet');
    const prefLightSquare = document.getElementById('prefLightSquare');
    const prefDarkSquare = document.getElementById('prefDarkSquare');
    const lightSquarePreview = document.getElementById('lightSquarePreview');
    const darkSquarePreview = document.getElementById('darkSquarePreview');
    const prefCategories = document.querySelectorAll('.pref-category');
    const prefContents = document.querySelectorAll('.pref-content');

    // Toggle preferences panel
    hamburgerMenu.addEventListener('click', function() {
        preferencesPanel.classList.toggle('show');
        // Update the piece set preview when opening the panel
        if (preferencesPanel.classList.contains('show')) {
            updatePieceSetPreview(prefPieceSet.value);

            // Select FICS tab by default
            prefCategories.forEach(cat => cat.classList.remove('active'));
            const ficsCategory = document.querySelector('.pref-category[data-category="fics"]');
            if (ficsCategory) {
                ficsCategory.classList.add('active');
            }

            // Show FICS content
            prefContents.forEach(content => content.classList.remove('active'));
            const ficsContent = document.getElementById('pref-fics');
            if (ficsContent) {
                ficsContent.classList.add('active');
            }
        }
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!preferencesPanel.contains(event.target) && event.target !== hamburgerMenu) {
            preferencesPanel.classList.remove('show');
        }
    });

    // Category tab switching
    prefCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            prefCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');

            // Hide all content sections
            prefContents.forEach(content => content.classList.remove('active'));
            // Show the selected content section
            const categoryName = this.getAttribute('data-category');
            document.getElementById(`pref-${categoryName}`).classList.add('active');
        });
    });

    // Update color previews
    prefLightSquare.addEventListener('input', function() {
        lightSquarePreview.style.backgroundColor = this.value;
    });

    prefDarkSquare.addEventListener('input', function() {
        darkSquarePreview.style.backgroundColor = this.value;
    });

    // Update piece set preview when selection changes
    prefPieceSet.addEventListener('change', function() {
        updatePieceSetPreview(this.value);
    });

    // Save preferences
    saveButton.addEventListener('click', function() {
        currentPieceSet = prefPieceSet.value;
        lightSquareColor = prefLightSquare.value;
        darkSquareColor = prefDarkSquare.value;

        savePreferences();
        applyPreferences();
        preferencesPanel.classList.remove('show');
    });
}

// Function to update the piece set preview grid
function updatePieceSetPreview(pieceSet) {
    const pieceTypes = [
        { id: 'preview-bR', piece: 'bR' },
        { id: 'preview-bN', piece: 'bN' },
        { id: 'preview-bB', piece: 'bB' },
        { id: 'preview-bQ', piece: 'bQ' },
        { id: 'preview-bK', piece: 'bK' },
        { id: 'preview-bP', piece: 'bP' },
        { id: 'preview-wP', piece: 'wP' },
        { id: 'preview-wR', piece: 'wR' },
        { id: 'preview-wN', piece: 'wN' },
        { id: 'preview-wB', piece: 'wB' },
        { id: 'preview-wQ', piece: 'wQ' },
        { id: 'preview-wK', piece: 'wK' }
    ];

    // Update each piece image in the preview grid
    pieceTypes.forEach(item => {
        // Find all elements with this ID (for pawns we have multiple)
        const elements = document.querySelectorAll(`#${item.id}`);
        elements.forEach(element => {
            element.src = `pieces/${pieceSet}/${item.piece}.svg`;
        });
    });
}

// Create a default chess tab with starting position
function createDefaultChessTab() {
    // Create a game tab with "Practice" as the opponent name
    createGameTab("Practice");

    // Reset the chess board to the starting position
    chess.reset();

    // Set default player names and clocks for practice board
    whitePlayerName = 'White';
    blackPlayerName = 'Black';
    whiteTimeSeconds = 300; // 5 minutes in seconds
    blackTimeSeconds = 300; // 5 minutes in seconds
    whitePlayerClock = formatClockTime(whiteTimeSeconds);
    blackPlayerClock = formatClockTime(blackTimeSeconds);
    currentTurn = 'w';

    // Start the clock for the practice board
    restartClock();

    // Update the board display
    updateBoardFromChessJS();

    // Update the game status
    const status = document.getElementById('gameStatus');
    if (status) {
        status.innerText = 'Practice board - White to move';
    }
}

// Test function to verify clock time parsing
function testClockParsing() {
    const testStyle12 = "<12> ------k- -p--r-pp p-p----- -------n ----B--- ------P- PPPq---P -K--R--- W -1 0 0 0 0 1 10 venugopal kunde 0 15 0 13 22 624 769 27 Q/g5-d2 (0:04) Qd2 0 1 112";
    const parts = testStyle12.split(' ');

    // Fields 24-25 should be the clock times in seconds
    const whiteTimeSecs = parseFloat(parts[24]); // 624 seconds = 10 minutes and 24 seconds
    const blackTimeSecs = parseFloat(parts[25]); // 769 seconds = 12 minutes and 49 seconds

    console.log('Test Style12 parsing:');
    console.log('Raw time values - White:', parts[24], 'seconds, Black:', parts[25], 'seconds');
    console.log('White time calculation:', whiteTimeSecs, 'seconds =', Math.floor(whiteTimeSecs / 60), 'minutes and', Math.floor(whiteTimeSecs % 60), 'seconds');
    console.log('Black time calculation:', blackTimeSecs, 'seconds =', Math.floor(blackTimeSecs / 60), 'minutes and', Math.floor(blackTimeSecs % 60), 'seconds');
    console.log('Formatted times - White:', formatClockTime(whiteTimeSecs), 'Black:', formatClockTime(blackTimeSecs));
    console.log('Expected times - White: 10:24, Black: 12:49');
}

// Function to initialize the chess board
function initializeChessBoard() {
    if (boardInitialized) return; // Don't initialize twice

    const boardArea = document.querySelector('.chess-board-area');
    if (!boardArea) return;

    // Clear any existing content
    boardArea.innerHTML = '';

    // Create main board container
    const boardMainContainer = document.createElement('div');
    boardMainContainer.classList.add('grid-row', 'board-main-container');

    // Create board container with horizontal layout
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');

    // Create a container for the board itself
    const boardOnlyContainer = document.createElement('div');
    boardOnlyContainer.classList.add('board-only-container');

    // Create a container for player info on the right
    const playerInfoContainer = document.createElement('div');
    playerInfoContainer.classList.add('player-info-container');

    // Create top player info container
    const topPlayerInfo = document.createElement('div');
    topPlayerInfo.classList.add('player-info', 'top-player');

    // Top player name with move indicator
    const topPlayerNameWrapper = document.createElement('div');
    topPlayerNameWrapper.classList.add('player-name-wrapper');

    const topPlayerName = document.createElement('div');
    topPlayerName.classList.add('player-name');
    topPlayerName.id = 'topPlayerName';
    topPlayerName.innerText = 'Opponent';

    // Create move indicator for top player
    const topMoveIndicator = document.createElement('div');
    topMoveIndicator.id = 'topMoveIndicator';
    topMoveIndicator.classList.add('move-indicator');

    topPlayerNameWrapper.appendChild(topMoveIndicator);
    topPlayerNameWrapper.appendChild(topPlayerName);

    // Top player clock
    const topPlayerClock = document.createElement('div');
    topPlayerClock.classList.add('player-clock', 'top-player-clock', 'player-clock-display');
    topPlayerClock.id = 'topPlayerClock';
    topPlayerClock.innerText = '00:00';

    // Add clock first, then name wrapper (clock above name)
    topPlayerInfo.appendChild(topPlayerClock);
    topPlayerInfo.appendChild(topPlayerNameWrapper);

    // Create the chess board
    const board = document.createElement('div');
    board.id = 'chessBoard';
    board.classList.add('chess-board');

    // Create bottom player info container
    const bottomPlayerInfo = document.createElement('div');
    bottomPlayerInfo.classList.add('player-info', 'bottom-player');

    // Bottom player name with move indicator
    const bottomPlayerNameWrapper = document.createElement('div');
    bottomPlayerNameWrapper.classList.add('player-name-wrapper');

    const bottomPlayerName = document.createElement('div');
    bottomPlayerName.classList.add('player-name');
    bottomPlayerName.id = 'bottomPlayerName';
    bottomPlayerName.innerText = 'You';

    // Create move indicator for bottom player
    const bottomMoveIndicator = document.createElement('div');
    bottomMoveIndicator.id = 'bottomMoveIndicator';
    bottomMoveIndicator.classList.add('move-indicator');

    bottomPlayerNameWrapper.appendChild(bottomMoveIndicator);
    bottomPlayerNameWrapper.appendChild(bottomPlayerName);

    // Bottom player clock
    const bottomPlayerClock = document.createElement('div');
    bottomPlayerClock.classList.add('player-clock', 'bottom-player-clock', 'player-clock-display');
    bottomPlayerClock.id = 'bottomPlayerClock';
    bottomPlayerClock.innerText = '00:00';

    bottomPlayerInfo.appendChild(bottomPlayerNameWrapper);
    bottomPlayerInfo.appendChild(bottomPlayerClock);

    // Create last move display (outside the player info container)
    const lastMoveDisplay = document.createElement('div');
    lastMoveDisplay.classList.add('last-move-display');
    lastMoveDisplay.id = 'lastMoveDisplay';
    lastMoveDisplay.innerText = '';

    // Create board menu button
    const boardMenuButton = document.createElement('button');
    boardMenuButton.classList.add('board-menu-button');
    boardMenuButton.innerHTML = '⋮'; // Vertical ellipsis for menu
    boardMenuButton.title = 'Board Menu';

    // Create board menu
    const boardMenu = document.createElement('div');
    boardMenu.classList.add('board-menu');

    // Reset button removed as requested

    // Flip board button
    const flipBtn = document.createElement('button');
    flipBtn.title = 'Flip Board';
    flipBtn.innerHTML = '<i class="material-icons">swap_vert</i>';
    flipBtn.onclick = () => {
        // Send flip command to FICS
        ws.send('flip\n\r');

        // Send refresh command after a short delay to ensure the board is updated
        // Use requestAnimationFrame with timestamp checking instead of setTimeout
        const refreshTime = Date.now() + 300; // 300ms from now

        const checkTimeAndRefresh = () => {
            if (Date.now() >= refreshTime) {
                ws.send('refresh\n\r');
                console.log('Sent refresh command after flip');
            } else {
                requestAnimationFrame(checkTimeAndRefresh);
            }
        };

        requestAnimationFrame(checkTimeAndRefresh);

        // Also update local board orientation
        myColor = myColor === 'white' ? 'black' : 'white';
        updateBoardFromChessJS();
        updatePlayerInfo();
        boardMenu.classList.remove('show'); // Hide menu after action
    };
    boardMenu.appendChild(flipBtn);

    // Toggle menu when button is clicked
    boardMenuButton.addEventListener('click', (event) => {
        boardMenu.classList.toggle('show');
        event.stopPropagation(); // Prevent the document click handler from firing
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!boardMenuButton.contains(event.target) && !boardMenu.contains(event.target)) {
            boardMenu.classList.remove('show');
        }
    });

    // Add board to the board-only container
    boardOnlyContainer.appendChild(board);
    boardOnlyContainer.appendChild(lastMoveDisplay);

    // Create a divider box between the players
    const playerDivider = document.createElement('div');
    playerDivider.classList.add('player-divider');

    // Create containers for player names to be positioned at the top and bottom of the divider
    const topPlayerNameContainer = document.createElement('div');
    topPlayerNameContainer.classList.add('top-name-container');

    const bottomPlayerNameContainer = document.createElement('div');
    bottomPlayerNameContainer.classList.add('bottom-name-container');

    // Move the player names and wrappers to the divider
    topPlayerNameContainer.appendChild(topPlayerNameWrapper);
    topPlayerNameContainer.appendChild(boardMenuButton); // Add menu button to the right of top player name
    bottomPlayerNameContainer.appendChild(bottomPlayerNameWrapper);

    // Add menu to the divider (it will be positioned by its own CSS)
    playerDivider.appendChild(boardMenu);

    // Make the divider position relative to contain the absolute positioned elements
    playerDivider.style.position = 'relative';

    // Add the name containers to the divider
    playerDivider.appendChild(topPlayerNameContainer);
    playerDivider.appendChild(bottomPlayerNameContainer);

    // Add player info and divider to the player info container
    playerInfoContainer.appendChild(topPlayerClock);
    playerInfoContainer.appendChild(playerDivider);
    playerInfoContainer.appendChild(bottomPlayerClock);

    // Add both containers to the main board container
    boardContainer.appendChild(boardOnlyContainer);
    boardContainer.appendChild(playerInfoContainer);

    // Add board container to the main container
    boardMainContainer.appendChild(boardContainer);

    // Add the container to the board area
    boardArea.appendChild(boardMainContainer);

    // Initialize the chess board
    createChessBoard(board);

    // Add resize observer to adjust board size when container changes
    const resizeObserver = new ResizeObserver(() => {
        // Get the available width in the chess board area
        const chessBoardArea = document.querySelector('.chess-board-area');
        if (!chessBoardArea) return;

        // Get the available width and height, accounting for padding and player info panel
        const availableWidth = chessBoardArea.clientWidth - 400; // Subtract padding and player info width (increased for larger clock)
        const availableHeight = chessBoardArea.clientHeight - 40; // Subtract padding

        // Ensure we never try to use more width than is available
        const maxWidth = Math.max(100, availableWidth); // Minimum size of 100px

        // Calculate the maximum size that fits while maintaining square aspect ratio
        const maxSize = Math.min(maxWidth, availableHeight, 1500); // Cap at 1500px

        // Update board size
        board.style.width = maxSize + 'px';
        board.style.height = maxSize + 'px';

        // Calculate font scale based on board size (relative to 800px baseline)
        // Apply a 0.75 factor to make fonts 25% smaller overall
        const fontScale = Math.max(0.45, Math.min(1.125, maxSize / 800 * 0.75));
        document.documentElement.style.setProperty('--font-scale', fontScale);

        // Set data attributes for CSS to use
        chessBoardArea.dataset.maxSize = maxSize;
        chessBoardArea.dataset.fontScale = fontScale;

        // Update dynamic sizes that need to be calculated in JavaScript
        playerInfoContainer.style.height = maxSize + 'px';
        boardOnlyContainer.style.width = maxSize + 'px';

        // Force a redraw of the board
        updateBoardFromChessJS();
    });

    // Observe the chess board area for size changes
    resizeObserver.observe(document.querySelector('.chess-board-area'));

    // Also trigger resize when the window is resized
    window.addEventListener('resize', () => {
        resizeObserver.disconnect();
        // Use requestAnimationFrame with timestamp checking instead of setTimeout
        const reconnectTime = Date.now() + 100; // 100ms from now

        const checkTimeAndReconnect = () => {
            if (Date.now() >= reconnectTime) {
                resizeObserver.observe(document.querySelector('.chess-board-area'));
            } else {
                requestAnimationFrame(checkTimeAndReconnect);
            }
        };

        requestAnimationFrame(checkTimeAndReconnect);
    });

    // Set default player names and clocks
    whitePlayerName = 'White';
    blackPlayerName = 'Black';
    whiteTimeSeconds = 300; // 5 minutes in seconds
    blackTimeSeconds = 300; // 5 minutes in seconds
    whitePlayerClock = formatClockTime(whiteTimeSeconds);
    blackPlayerClock = formatClockTime(blackTimeSeconds);
    currentTurn = 'w';

    // Reset the chess board to the starting position
    chess.reset();
    updateBoardFromChessJS();

    // Start the clock
    restartClock();

    boardInitialized = true;
}

// Window load event is now at the top of the file
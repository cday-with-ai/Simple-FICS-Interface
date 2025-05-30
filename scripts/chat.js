import { addToMessageHistory, handleArrowKeys, processTextToHTML, getWebSocket } from './fics.js';

// DOM elements
const mainTextArea = document.getElementById('mainTextArea');
const tabSet = document.getElementById('tabset');
const tabs = document.getElementById('tabs');
const topDivider = document.getElementById('topDivider');
const rightDivider = document.getElementById('rightDivider');
const chessBoardArea = document.querySelector('.chess-board-area');
const rightContent = document.querySelector('.right-content');
const mainConsole = document.querySelector('.main-console');
const chatTabsContainer = document.querySelector('.chat-tabs-container');

// FICS command regex patterns for validation
const ficsCommandRegex = [
    /(^match .*$)|(^m .*$)/i,
    /(^observe [a-zA-Z0-9]+$)|(^obs [a-zA-Z0-9]+$)/i,
    /(^unobserve$)|(^unobs$)|(^unobserve [a-zA-Z0-9]+$)|(^unobs [a-zA-Z0-9]+$)/i,
    /(^[+-]censor [a-zA-Z0-9]+$)/i,
    /(^seek [a-zA-Z0-9]+ .*$)/i,
    /(^play [0-9]+$)/i,
    /(^tell [a-zA-Z0-9]+ .*$)|(^t [a-zA-Z0-9]+ .*$)/i,
    /(^kibitz [a-zA-Z0-9]+ .*$)|(^kib [a-zA-Z0-9]+ .*$)/i,
    /(^whisper [a-zA-Z0-9]+ .*$)|(^whisper [a-zA-Z0-9]+$)/i,
    /(^message .*$)|(^messages$)/i
];

// UI state variables
let activeResizer = null;
let currentView = 'both'; // Default view mode

// Initialize chat system
export function initChat() {
    setupConsoleResizeObserver();
    setupViewToggle();
    updateTabsVisibility();

    // Set up divider event listeners
    setupDividers();
}

// Function to set up divider event listeners
function setupDividers() {
    // Horizontal divider
    if (topDivider) {
        topDivider.addEventListener('mousedown', function (e) {
            if (e.target === topDivider) {
                e.preventDefault();
                activeResizer = 'horizontal';
                document.addEventListener('mousemove', resizeDividers);
                document.addEventListener('mouseup', stopResize);
            }
        });
    }

    // Vertical divider
    if (rightDivider) {
        rightDivider.addEventListener('mousedown', function (e) {
            if (e.target === rightDivider) {
                e.preventDefault();
                activeResizer = 'vertical';
                rightDivider.classList.add('dragging');
                document.addEventListener('mousemove', resizeDividers);
                document.addEventListener('mouseup', stopResize);
            }
        });
    }
}

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
        }
        const widthScale = availableWidth / 800;
        const heightScale = availableHeight / 600;
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
                chessBoardAreaEl.style.flexBasis = '58%';
            }
            if (rightContentEl) rightContentEl.style.display = 'flex';
            if (topDividerEl) {
                topDividerEl.style.display = 'block';
                topDividerEl.style.left = '57.0%';
            }
            if (rightDividerEl) {
                rightDividerEl.style.display = tabElements.length > 0 ? 'block' : 'none';
                rightDividerEl.style.top = '70%';
            }
            if (mainConsoleEl) mainConsoleEl.style.flexBasis = '70%';
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
                rightDividerEl.style.display = tabElements.length > 0 ? 'block' : 'none';
                rightDividerEl.style.top = '70%';
            }
            if (mainConsoleEl) mainConsoleEl.style.flexBasis = '70%';
            requestAnimationFrame(scrollConsolesToBottom);
            break;
    }
}

function resizeDividers(e) {
    const chessBoardAreaEl = document.querySelector('.chess-board-area');
    const rightContentEl = document.querySelector('.right-content');
    const mainConsoleEl = document.querySelector('.main-console');
    const chatTabsContainerEl = document.querySelector('.chat-tabs-container');

    if (activeResizer === 'horizontal') {
        const container = document.querySelector('.top-section');
        if (!container || !chessBoardAreaEl || !topDivider) return;
        const containerRect = container.getBoundingClientRect();
        let percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        percentage = Math.max(30, Math.min(70, percentage));
        chessBoardAreaEl.style.flexBasis = `${percentage}%`;
        topDivider.style.left = `${percentage - 1}%`;
    } else if (activeResizer === 'vertical') {
        if (!rightContentEl || !mainConsoleEl || !chatTabsContainerEl || !rightDivider) return;
        const containerRect = rightContentEl.getBoundingClientRect();
        let percentage = ((e.clientY - containerRect.top) / containerRect.height) * 100;
        percentage = Math.max(35, Math.min(63, percentage));
        mainConsoleEl.style.flexBasis = `${percentage}%`;
        chatTabsContainerEl.style.flexBasis = `${100 - percentage}%`;
        rightDivider.style.top = `${percentage}%`;
        document.documentElement.style.setProperty('--vertical-divider-position', `${percentage}%`);
    }
    if (mainTextArea) mainTextArea.scrollTop = mainTextArea.scrollHeight;
}

export function scrollConsolesToBottom() {
    requestAnimationFrame(() => {
        if (mainTextArea) mainTextArea.scrollTop = mainTextArea.scrollHeight;
        const tabTextAreas = document.querySelectorAll('.tab-text-area');
        tabTextAreas.forEach(textArea => textArea.scrollTop = textArea.scrollHeight);
    });
}

function stopResize() {
    const rightDividerEl = document.getElementById('rightDivider');
    if (rightDividerEl) rightDividerEl.classList.remove('dragging');
    activeResizer = null;
    document.removeEventListener('mousemove', resizeDividers);
    document.removeEventListener('mouseup', stopResize);
    requestAnimationFrame(() => requestAnimationFrame(scrollConsolesToBottom));
}

export function inactiveAllTabs() {
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

export function inactiveAllChessTabs() {
    const activeTabContents = document.querySelectorAll("#chessTabset .tab-content");
    activeTabContents.forEach(tc => {
        tc.classList.remove("tab-content-active");
        tc.classList.add("tab-content-inactive");
    });
    const activeTabs = document.querySelectorAll("#chessTabs .tab");
    activeTabs.forEach(t => {
        t.classList.remove("tab-active");
        t.classList.add("tab-inactive");
    });
}

export function updateTabsVisibility() {
    const tabElements = document.querySelectorAll('#tabs .tab');
    const rightDividerEl = document.getElementById('rightDivider');
    const mainConsoleEl = document.querySelector('.main-console');
    const chatTabsContainerEl = document.querySelector('.chat-tabs-container');

    if (!rightDividerEl || !mainConsoleEl || !chatTabsContainerEl) return;

    if (tabElements.length > 0) {
        rightDividerEl.style.display = 'block';
        mainConsoleEl.style.flex = '0 0 75%';
        chatTabsContainerEl.style.display = 'flex';
        rightDividerEl.style.top = mainConsoleEl.style.flexBasis;
    } else {
        rightDividerEl.style.display = 'none';
        mainConsoleEl.style.flex = '1';
        chatTabsContainerEl.style.display = 'none';
    }
}

export function createTab(type, name) {
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
            const ws = getWebSocket();

            let isFicsCmd = false;
            for (var regex of ficsCommandRegex) {
                console.log(regex, message);
                if (regex.test(message)) {
                    isFicsCmd = true;
                    break;
                }
            }
            if (isFicsCmd) {
                if (ws) ws.send(message);
            } else if (message.trim()) {
                if (ws) ws.send("tell " + name + " " + message);
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

    return id;
}

export function routeMessageToTab(tabId, message) {
    const textArea = document.getElementById("textarea-" + tabId);
    if (textArea) {
        const autoScroll = textArea.scrollHeight - textArea.scrollTop <= textArea.clientHeight + 10;
        textArea.innerHTML += processTextToHTML(message);
        if (autoScroll) textArea.scrollTop = textArea.scrollHeight;
    }
}

export function closeTab(typeAndName) {
    const tab = document.getElementById('tab-' + typeAndName);
    const content = document.getElementById('tab-content-' + typeAndName);
    if (!tab || !content) return;

    const parentTabs = tab.parentElement;
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
    updateTabsVisibility();
}

export function createGameTab(opponent) {
    const id = "game-" + opponent;
    inactiveAllChessTabs();

    const chessTabs = document.getElementById('chessTabs');
    const chessTabSet = document.getElementById('chessTabSet');
    if (!chessTabs || !chessTabSet) {
        console.warn("Chess tab containers not found for createGameTab");
        return;
    }

    const tabDiv = document.createElement('div');
    tabDiv.id = 'tab-' + id;
    tabDiv.classList.add("tab-active", "tab");
    chessTabs.append(tabDiv);

    const tabLabel = document.createElement('span');
    tabLabel.id = 'tab-label-' + id;
    tabLabel.innerHTML = (opponent === "Practice" ? "Practice Board" : `Game vs ${opponent}`) + "&nbsp;";
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
    tabContent.classList.add('tab-content', 'tab-content-active', 'grid-container');
    chessTabSet.append(tabContent);

    const boardAndToolbarContainer = document.createElement('div');
    boardAndToolbarContainer.classList.add('grid-row', 'board-and-toolbar-container');

    const toolbar = document.createElement('div');
    toolbar.classList.add('board-toolbar');
    boardAndToolbarContainer.appendChild(toolbar);

    const boardContainerDiv = document.createElement('div');
    boardContainerDiv.classList.add('board-container');
    const gameBoardDiv = document.createElement('div');
    gameBoardDiv.id = 'chessBoard-' + id;
    gameBoardDiv.classList.add('chess-board');

    boardContainerDiv.appendChild(gameBoardDiv);
    boardAndToolbarContainer.appendChild(boardContainerDiv);
    tabContent.append(boardAndToolbarContainer);

    // Import createChessBoardSquares dynamically to avoid circular dependencies
    import('./chess.js').then(module => {
        if (typeof module.createChessBoardSquares === 'function') {
            module.createChessBoardSquares(gameBoardDiv);
        }
    });

    return id;
}

export function getFicsCommandRegex() {
    return ficsCommandRegex;
}

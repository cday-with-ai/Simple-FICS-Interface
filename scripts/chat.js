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

// Unified chat system elements
const unifiedChatContainer = document.getElementById('unifiedChatContainer');
const unifiedTabset = document.getElementById('unifiedTabset');
const unifiedTabs = document.getElementById('unifiedTabs');
const legacyMainConsole = document.getElementById('legacyMainConsole');
const legacyChatTabs = document.getElementById('legacyChatTabs');

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
let useUnifiedChatSystem = true; // Enable unified chat system by default
let unifiedTabCounter = 0;
let activeUnifiedTab = 'main';
let unreadCounts = {}; // Track unread messages per tab
let tabScrollPosition = 0; // Track horizontal scroll position of tabs

// Initialize chat system
export function initChat() {
    setupViewToggle();

    if (useUnifiedChatSystem) {
        initUnifiedChatSystem();
        // Set up console resize observer after unified system is initialized
        setupConsoleResizeObserver();
    } else {
        updateTabsVisibility();
        // Set up console resize observer for legacy system
        setupConsoleResizeObserver();
    }

    // Set up divider event listeners
    setupDividers();
}

// Initialize unified chat system
function initUnifiedChatSystem() {
    console.log('Initializing unified chat system...');

    // Hide legacy containers
    if (legacyMainConsole) {
        legacyMainConsole.style.display = 'none';
        console.log('Hidden legacy main console');
    }
    if (legacyChatTabs) {
        legacyChatTabs.style.display = 'none';
        console.log('Hidden legacy chat tabs');
    }
    if (rightDivider) {
        rightDivider.style.display = 'none';
        console.log('Hidden right divider');
    }

    // Show unified container
    if (unifiedChatContainer) {
        unifiedChatContainer.style.display = 'flex';
        console.log('Shown unified chat container');
    } else {
        console.error('Unified chat container not found!');
    }

    // Set up main console tab click handler
    const mainTab = document.getElementById('unified-tab-main');
    if (mainTab) {
        mainTab.addEventListener('click', () => switchUnifiedTab('main'));
        console.log('Set up main tab click handler');
    } else {
        console.error('Main tab not found!');
    }

    // Set up tab scroll buttons
    setupTabScrollButtons();

    // Initialize unread counts
    unreadCounts['main'] = 0;
    console.log('Unified chat system initialized successfully');
}

// Switch to a unified tab
function switchUnifiedTab(tabId) {
    console.log(`Switching to unified tab: ${tabId}`);

    // Deactivate all tabs
    const allTabs = document.querySelectorAll('.unified-tab');
    const allContents = document.querySelectorAll('.unified-tab-content');

    console.log(`Found ${allTabs.length} tabs and ${allContents.length} contents`);

    allTabs.forEach(tab => {
        tab.classList.remove('unified-tab-active');
        tab.classList.add('unified-tab-inactive');
    });

    allContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('unified-tab-content-active');
        content.classList.add('unified-tab-content-inactive');
    });

    // Activate selected tab
    const selectedTab = document.getElementById(`unified-tab-${tabId}`);
    const selectedContent = document.getElementById(`unified-tab-content-${tabId}`);

    console.log(`Selected tab:`, selectedTab);
    console.log(`Selected content:`, selectedContent);

    if (selectedTab && selectedContent) {
        selectedTab.classList.add('unified-tab-active');
        selectedTab.classList.remove('unified-tab-inactive');
        selectedContent.style.display = 'flex';
        selectedContent.classList.add('unified-tab-content-active');
        selectedContent.classList.remove('unified-tab-content-inactive');

        // Clear unread indicator for this tab
        clearUnreadIndicator(tabId);

        // Update active tab
        activeUnifiedTab = tabId;

        // Scroll to bottom
        scrollUnifiedTabToBottom(tabId);

        console.log(`Successfully switched to tab: ${tabId}`);
    } else {
        console.error(`Failed to find tab or content for: ${tabId}`);
    }
}

// Clear unread indicator for a tab
function clearUnreadIndicator(tabId) {
    unreadCounts[tabId] = 0;
    const tab = document.getElementById(`unified-tab-${tabId}`);
    if (tab) {
        tab.classList.remove('unified-tab-unread');
        const countElement = tab.querySelector('.unified-tab-unread-count');
        if (countElement) {
            countElement.remove();
        }
    }
}

// Add unread indicator to a tab
function addUnreadIndicator(tabId) {
    if (tabId === activeUnifiedTab) return; // Don't add indicator to active tab

    unreadCounts[tabId] = (unreadCounts[tabId] || 0) + 1;
    const tab = document.getElementById(`unified-tab-${tabId}`);
    if (tab) {
        tab.classList.add('unified-tab-unread');

        // Update or create count badge
        let countElement = tab.querySelector('.unified-tab-unread-count');
        if (!countElement) {
            countElement = document.createElement('span');
            countElement.classList.add('unified-tab-unread-count');
            tab.appendChild(countElement);
        }
        countElement.textContent = unreadCounts[tabId];
    }
}

// Scroll unified tab to bottom
function scrollUnifiedTabToBottom(tabId) {
    const textArea = document.querySelector(`#unified-tab-content-${tabId} .ics-text-area, #unified-tab-content-${tabId} .tab-text-area`);
    if (textArea) {
        textArea.scrollTop = textArea.scrollHeight;
    }
}

// Create a new unified tab
export function createUnifiedTab(type, name) {
    if (!useUnifiedChatSystem) {
        // Fall back to legacy system
        return createTab(type, name);
    }

    // Check if tab already exists for this type and name
    const existingTabId = `${type}-${name}`;
    const existingTab = document.getElementById(`unified-tab-${existingTabId}`);
    if (existingTab) {
        console.log(`Tab already exists for ${type} ${name}, returning existing ID: ${existingTabId}`);
        return existingTabId;
    }

    const id = existingTabId; // Use consistent ID without counter
    console.log(`Creating unified tab: ${id} for ${type} ${name}`);

    // Create tab element
    const tabDiv = document.createElement('div');
    tabDiv.id = `unified-tab-${id}`;
    tabDiv.classList.add('unified-tab', 'unified-tab-inactive');

    // Create tab label
    const tabLabel = document.createElement('span');
    tabLabel.classList.add('unified-tab-label');
    // For channels, show just the number; for others, show type and name
    if (type === 'channel') {
        tabLabel.textContent = name;
    } else {
        tabLabel.textContent = `${type} ${name}`;
    }
    tabDiv.appendChild(tabLabel);

    // Create close button (not for main console)
    if (id !== 'main') {
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('unified-close-btn');
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeUnifiedTab(id);
        });
        tabDiv.appendChild(closeBtn);
    }

    // Add click handler
    tabDiv.addEventListener('click', () => switchUnifiedTab(id));

    // Add tab to tabs container
    unifiedTabs.appendChild(tabDiv);

    // Update scroll buttons after adding tab
    setTimeout(updateTabScrollButtons, 50);

    // Create tab content
    const tabContent = document.createElement('div');
    tabContent.id = `unified-tab-content-${id}`;
    tabContent.classList.add('unified-tab-content', 'unified-tab-content-inactive');

    // Create content structure
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.style.height = '100%';

    const textRow = document.createElement('div');
    textRow.classList.add('grid-row');

    const textArea = document.createElement('div');
    textArea.id = `unified-textarea-${id}`;
    textArea.classList.add('tab-text-area');

    const inputRow = document.createElement('div');
    inputRow.classList.add('grid-row');

    const input = document.createElement('input');
    input.id = `unified-input-${id}`;
    input.classList.add('tab-input');
    input.placeholder = `Tell ${name}...`;

    // Set up input handlers
    input.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            const message = input.value;
            const ws = getWebSocket();

            let isFicsCmd = false;
            for (var regex of ficsCommandRegex) {
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

    // Assemble content
    textRow.appendChild(textArea);
    inputRow.appendChild(input);
    gridContainer.appendChild(textRow);
    gridContainer.appendChild(inputRow);
    tabContent.appendChild(gridContainer);

    // Add content to tabset
    unifiedTabset.appendChild(tabContent);

    // Initialize unread count
    unreadCounts[id] = 0;

    console.log(`Created tab content with ID: unified-tab-content-${id}`);
    console.log(`Tab content element:`, tabContent);

    // Switch to new tab if auto-switch is enabled
    const autoSwitch = localStorage.getItem('autoSwitchToNewTabs') === 'true';
    if (autoSwitch) {
        switchUnifiedTab(id);
    }

    return id;
}

// Close a unified tab
function closeUnifiedTab(tabId) {
    if (tabId === 'main') return; // Cannot close main console tab

    const tab = document.getElementById(`unified-tab-${tabId}`);
    const content = document.getElementById(`unified-tab-content-${tabId}`);

    if (tab) tab.remove();
    if (content) content.remove();

    // Clean up unread count
    delete unreadCounts[tabId];

    // Update scroll buttons after removing tab
    setTimeout(updateTabScrollButtons, 50);

    // If this was the active tab, switch to main
    if (activeUnifiedTab === tabId) {
        switchUnifiedTab('main');
    }
}

// Route message to unified tab
export function routeMessageToUnifiedTab(tabId, message) {
    console.log(`Routing message to unified tab: ${tabId}`);
    const textArea = document.getElementById(`unified-textarea-${tabId}`);
    console.log(`Found text area:`, textArea);

    if (textArea) {
        const autoScroll = textArea.scrollHeight - textArea.scrollTop <= textArea.clientHeight + 10;
        textArea.innerHTML += processTextToHTML(message);
        if (autoScroll) textArea.scrollTop = textArea.scrollHeight;

        // Add unread indicator if not active tab
        if (tabId !== activeUnifiedTab) {
            addUnreadIndicator(tabId);
        }
        console.log(`Successfully routed message to tab: ${tabId}`);
    } else {
        console.error(`Text area not found for tab: ${tabId}`);
    }
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
        let availableWidth = 0;
        let availableHeight = 0;

        if (useUnifiedChatSystem) {
            // For unified chat system, observe the unified container
            const unifiedContainer = document.getElementById('unifiedChatContainer');
            if (unifiedContainer) {
                availableWidth = unifiedContainer.clientWidth;
                availableHeight = unifiedContainer.clientHeight;
            }
        } else {
            // For legacy system, observe the original elements
            const mainConsoleEl = document.querySelector('.main-console');
            const chatTabsContainerEl = document.querySelector('.chat-tabs-container');

            if (mainConsoleEl) {
                availableWidth = Math.max(availableWidth, mainConsoleEl.clientWidth);
                availableHeight = Math.max(availableHeight, mainConsoleEl.clientHeight);
            }
            if (chatTabsContainerEl) {
                availableWidth = Math.max(availableWidth, chatTabsContainerEl.clientWidth);
            }
        }

        if (availableWidth === 0 || availableHeight === 0) return;

        // Updated console font scaling to match chess scaling approach
        const widthScale = availableWidth / 800;
        const heightScale = availableHeight / 600;
        const scale = Math.min(widthScale, heightScale);
        const consoleFontScale = Math.max(0.9, Math.min(2.5, scale * 1.0));
        console.log("Console font scaling - Container size:", availableWidth, "x", availableHeight, "Scale:", scale, "Final font scale:", consoleFontScale);
        document.documentElement.style.setProperty('--console-font-scale', consoleFontScale);


    });

    // Observe the appropriate elements based on the chat system
    if (useUnifiedChatSystem) {
        const unifiedContainer = document.getElementById('unifiedChatContainer');
        if (unifiedContainer) {
            console.log("Setting up ResizeObserver for unified chat container");
            consoleResizeObserver.observe(unifiedContainer);
        } else {
            console.error("Unified chat container not found for ResizeObserver");
        }
    } else {
        const mainConsoleEl = document.querySelector('.main-console');
        const chatTabsContainerEl = document.querySelector('.chat-tabs-container');
        if (mainConsoleEl) {
            console.log("Setting up ResizeObserver for legacy main console");
            consoleResizeObserver.observe(mainConsoleEl);
        }
        if (chatTabsContainerEl) {
            console.log("Setting up ResizeObserver for legacy chat tabs container");
            consoleResizeObserver.observe(chatTabsContainerEl);
        }
    }
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

        if (useUnifiedChatSystem) {
            // Scroll all unified tab text areas
            const unifiedTextAreas = document.querySelectorAll('.unified-tab-content .tab-text-area, .unified-tab-content .ics-text-area');
            unifiedTextAreas.forEach(textArea => textArea.scrollTop = textArea.scrollHeight);
        } else {
            // Legacy system
            const tabTextAreas = document.querySelectorAll('.tab-text-area');
            tabTextAreas.forEach(textArea => textArea.scrollTop = textArea.scrollHeight);
        }
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
    // Use unified system if enabled
    if (useUnifiedChatSystem) {
        return createUnifiedTab(type, name);
    }

    // Legacy system
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
    // Use unified system if enabled
    if (useUnifiedChatSystem) {
        // For main console, route to main tab
        if (tabId === 'main' || !tabId) {
            if (mainTextArea) {
                const autoScroll = mainTextArea.scrollHeight - mainTextArea.scrollTop <= mainTextArea.clientHeight + 10;
                mainTextArea.innerHTML += processTextToHTML(message);
                if (autoScroll) mainTextArea.scrollTop = mainTextArea.scrollHeight;

                // Add unread indicator if not active tab
                if (activeUnifiedTab !== 'main') {
                    addUnreadIndicator('main');
                }
            }
        } else {
            routeMessageToUnifiedTab(tabId, message);
        }
        return;
    }

    // Legacy system
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

// Global reference to update function
let globalUpdateScrollButtons = null;
let updateScrollButtonsTimeout = null;

// Set up tab scroll buttons
function setupTabScrollButtons() {
    const scrollLeftBtn = document.getElementById('scrollTabsLeft');
    const scrollRightBtn = document.getElementById('scrollTabsRight');
    const tabsWrapper = document.querySelector('.unified-tabs-wrapper');
    const tabs = document.getElementById('unifiedTabs');

    if (!scrollLeftBtn || !scrollRightBtn || !tabsWrapper || !tabs) {
        console.error('Tab scroll elements not found');
        return;
    }

    // Scroll amount per click (in pixels)
    const scrollAmount = 150;

    // Track if we're currently scrolling to prevent button hiding during scroll
    let isScrolling = false;

    // Update scroll button states
    function updateScrollButtons() {
        // Force recalculation of dimensions
        const tabsWidth = tabs.scrollWidth;

        // Use the unified chat container width as the reference (fixed width)
        const chatContainer = document.getElementById('unifiedChatContainer');
        const containerWidth = chatContainer ? chatContainer.clientWidth : tabsWrapper.parentElement.clientWidth;

        const scrollButtonWidth = 30 + 6; // 30px width + 3px margin on each side
        const availableWidthForTabs = containerWidth - (scrollButtonWidth * 2);

        // Determine if we need scrolling - always use the same calculation
        const needsScrolling = tabsWidth > availableWidthForTabs;

        console.log(`Tabs width: ${tabsWidth}, Container width: ${containerWidth}, Available for tabs: ${availableWidthForTabs}, Needs scrolling: ${needsScrolling}, Is scrolling: ${isScrolling}`);

        // Only hide buttons if we're not currently scrolling and don't need scrolling
        if (!needsScrolling && !isScrolling) {
            scrollLeftBtn.style.display = 'none';
            scrollRightBtn.style.display = 'none';
            // Reset scroll position when not needed
            tabScrollPosition = 0;
            tabs.style.transform = 'translateX(0px)';
            return;
        }

        // Show buttons if we need scrolling
        if (needsScrolling) {
            scrollLeftBtn.style.display = 'flex';
            scrollRightBtn.style.display = 'flex';
        }

        // When scrolling is needed, calculate max scroll
        const maxScroll = Math.max(0, tabsWidth - availableWidthForTabs);

        // Ensure scroll position is within bounds
        if (tabScrollPosition > maxScroll) {
            tabScrollPosition = maxScroll;
            tabs.style.transform = `translateX(-${tabScrollPosition}px)`;
        }

        // Disable/enable left button
        if (tabScrollPosition <= 0) {
            scrollLeftBtn.classList.add('disabled');
        } else {
            scrollLeftBtn.classList.remove('disabled');
        }

        // Disable/enable right button
        if (tabScrollPosition >= maxScroll) {
            scrollRightBtn.classList.add('disabled');
        } else {
            scrollRightBtn.classList.remove('disabled');
        }
    }

    // Store global reference
    globalUpdateScrollButtons = updateScrollButtons;

    // Scroll left
    scrollLeftBtn.addEventListener('click', () => {
        if (scrollLeftBtn.classList.contains('disabled')) return;

        isScrolling = true;
        tabScrollPosition = Math.max(0, tabScrollPosition - scrollAmount);
        tabs.style.transform = `translateX(-${tabScrollPosition}px)`;

        // Clear scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
            updateScrollButtons();
        }, 350); // Slightly longer than CSS transition

        updateScrollButtons();
    });

    // Scroll right
    scrollRightBtn.addEventListener('click', () => {
        if (scrollRightBtn.classList.contains('disabled')) return;

        isScrolling = true;
        const chatContainer = document.getElementById('unifiedChatContainer');
        const containerWidth = chatContainer ? chatContainer.clientWidth : tabsWrapper.parentElement.clientWidth;
        const scrollButtonWidth = 30 + 6;
        const availableWidthForTabs = containerWidth - (scrollButtonWidth * 2);
        const maxScroll = Math.max(0, tabs.scrollWidth - availableWidthForTabs);

        tabScrollPosition = Math.min(maxScroll, tabScrollPosition + scrollAmount);
        tabs.style.transform = `translateX(-${tabScrollPosition}px)`;

        // Clear scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
            updateScrollButtons();
        }, 350); // Slightly longer than CSS transition

        updateScrollButtons();
    });

    // Update buttons on window resize
    window.addEventListener('resize', () => {
        setTimeout(updateScrollButtons, 50);
    });

    // Initial update
    setTimeout(updateScrollButtons, 100); // Delay to ensure DOM is ready
}

// Update scroll buttons when tabs are added/removed
function updateTabScrollButtons() {
    console.log('updateTabScrollButtons called');

    // Clear any existing timeout to debounce rapid calls
    if (updateScrollButtonsTimeout) {
        clearTimeout(updateScrollButtonsTimeout);
    }

    // Debounce the update to prevent rapid toggling
    updateScrollButtonsTimeout = setTimeout(() => {
        if (globalUpdateScrollButtons) {
            console.log('Executing debounced scroll button update');
            globalUpdateScrollButtons();
        }
        updateScrollButtonsTimeout = null;
    }, 100);
}

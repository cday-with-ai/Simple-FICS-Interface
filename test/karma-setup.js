// Setup file for Karma tests

// Create DOM elements needed by the application
document.body.innerHTML = `
  <div id="status"></div>
  <div id="mainTextArea"></div>
  <input id="mainInput" type="text" />
  <div id="chessboard"></div>
  <div id="movesList"></div>
  <div id="tabsContainer"></div>
  <div id="preferences"></div>
  <div id="preferencesMenu"></div>
  <div id="hamburgerMenu"></div>
  <div id="hamburgerMenuContent"></div>
  <div id="channelTabs"></div>
  <div id="channelTabsContent"></div>
  <div id="channelTabsContainer"></div>
  <div id="channelTabsHeader"></div>
  <div id="channelTabsBody"></div>
  <div id="channelTabsFooter"></div>
  <div id="channelTabsInput"></div>
  <div id="channelTabsInputContainer"></div>
  <div id="channelTabsInputForm"></div>
  <div id="channelTabsInputSubmit"></div>
  <div id="channelTabsInputText"></div>
  <div id="channelTabsInputClear"></div>
  <div id="channelTabsInputCancel"></div>
  <div id="channelTabsInputHelp"></div>
  <div id="channelTabsInputHelpText"></div>
  <div id="channelTabsInputHelpClose"></div>
  <div id="channelTabsInputHelpContainer"></div>
  <div id="channelTabsInputHelpHeader"></div>
  <div id="channelTabsInputHelpBody"></div>
  <div id="channelTabsInputHelpFooter"></div>
  <div id="channelTabsInputHelpSubmit"></div>
  <div id="channelTabsInputHelpCancel"></div>
  <div id="channelTabsInputHelpClear"></div>
  <div id="channelTabsInputHelpText"></div>
  <div id="channelTabsInputHelpTextContainer"></div>
  <div id="channelTabsInputHelpTextHeader"></div>
  <div id="channelTabsInputHelpTextBody"></div>
  <div id="channelTabsInputHelpTextFooter"></div>
  <div id="channelTabsInputHelpTextSubmit"></div>
  <div id="channelTabsInputHelpTextCancel"></div>
  <div id="channelTabsInputHelpTextClear"></div>

  <!-- Preferences panel elements -->
  <div id="preferencesPanel">
    <div class="pref-categories">
      <div class="pref-category active" data-category="fics">FICS</div>
      <div class="pref-category" data-category="appearance">Appearance</div>
      <div class="pref-category" data-category="behavior">Behavior</div>
    </div>
    <div class="pref-contents">
      <div id="pref-fics" class="pref-content active">
        <div class="pref-item">
          <label for="prefFicsUsername">Username:</label>
          <input type="text" id="prefFicsUsername">
        </div>
        <div class="pref-item">
          <label for="prefFicsPassword">Password:</label>
          <input type="password" id="prefFicsPassword">
        </div>
        <div class="pref-item">
          <label for="prefAutoLogin">Auto Login:</label>
          <input type="checkbox" id="prefAutoLogin">
        </div>
      </div>
      <div id="pref-appearance" class="pref-content">
        <div class="pref-item">
          <label for="prefPieceSet">Piece Set:</label>
          <select id="prefPieceSet">
            <option value="cburnett">Cburnett</option>
            <option value="merida">Merida</option>
            <option value="alpha">Alpha</option>
          </select>
          <div id="pieceSetPreview"></div>
        </div>
        <div class="pref-item">
          <label for="prefLightSquare">Light Square Color:</label>
          <input type="color" id="prefLightSquare" value="#f0dab5">
          <div id="lightSquarePreview" style="background-color: #f0dab5;"></div>
        </div>
        <div class="pref-item">
          <label for="prefDarkSquare">Dark Square Color:</label>
          <input type="color" id="prefDarkSquare" value="#b58763">
          <div id="darkSquarePreview" style="background-color: #b58763;"></div>
        </div>
      </div>
      <div id="pref-behavior" class="pref-content">
        <div class="pref-item">
          <label for="prefChannelTellsToTabs">Channel Tells to Tabs:</label>
          <input type="checkbox" id="prefChannelTellsToTabs" checked>
        </div>
        <div class="pref-item">
          <label for="prefDirectTellsToTabs">Direct Tells to Tabs:</label>
          <input type="checkbox" id="prefDirectTellsToTabs">
        </div>
        <div class="pref-item">
          <label for="prefGameTellsToTabs">Game Tells to Tabs:</label>
          <input type="checkbox" id="prefGameTellsToTabs">
        </div>
        <div class="pref-item">
          <label for="prefAutoSwitchToNewTabs">Auto Switch to New Tabs:</label>
          <input type="checkbox" id="prefAutoSwitchToNewTabs" checked>
        </div>
        <div class="pref-item">
          <label for="prefFlashTabsOnActivity">Flash Tabs on Activity:</label>
          <input type="checkbox" id="prefFlashTabsOnActivity" checked>
        </div>
        <div class="pref-item">
          <label for="prefShowStyle12Events">Show Style12 Events:</label>
          <input type="checkbox" id="prefShowStyle12Events">
        </div>
      </div>
    </div>
    <div class="pref-buttons">
      <button id="savePreferences">Save</button>
    </div>
  </div>

  <!-- Chess board area -->
  <div class="chess-board-area"></div>
`;

// Add event listeners to DOM elements
document.getElementById('preferencesMenu').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('hamburgerMenu').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('mainInput').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInput').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputSubmit').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputCancel').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputClear').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelp').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpClose').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpSubmit').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpCancel').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpClear').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpText').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpTextSubmit').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpTextCancel').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('channelTabsInputHelpTextClear').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

// Add event listeners for preferences panel elements
document.getElementById('preferencesPanel').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('savePreferences').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('prefPieceSet').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('prefLightSquare').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('prefDarkSquare').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('lightSquarePreview').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

document.getElementById('darkSquarePreview').addEventListener = function(event, callback) {
  this['on' + event] = callback;
};

// Add classList methods to all elements
const elements = document.querySelectorAll('*');
elements.forEach(element => {
  if (!element.classList) {
    element.classList = {
      add: function(className) {
        const classNames = (element.className || '').split(' ');
        if (classNames.indexOf(className) === -1) {
          classNames.push(className);
          element.className = classNames.join(' ').trim();
        }
      },
      remove: function(className) {
        const classNames = (element.className || '').split(' ');
        const index = classNames.indexOf(className);
        if (index !== -1) {
          classNames.splice(index, 1);
          element.className = classNames.join(' ').trim();
        }
      },
      toggle: function(className) {
        const classNames = (element.className || '').split(' ');
        const index = classNames.indexOf(className);
        if (index === -1) {
          classNames.push(className);
        } else {
          classNames.splice(index, 1);
        }
        element.className = classNames.join(' ').trim();
      },
      contains: function(className) {
        const classNames = (element.className || '').split(' ');
        return classNames.indexOf(className) !== -1;
      }
    };
  }
});

// Add querySelectorAll method to elements
const originalQuerySelectorAll = document.querySelectorAll;
document.querySelectorAll = function(selector) {
  return originalQuerySelectorAll.call(document, selector);
};

Element.prototype.querySelectorAll = function(selector) {
  return originalQuerySelectorAll.call(document, selector);
};

// Add querySelector method to elements
const originalQuerySelector = document.querySelector;
document.querySelector = function(selector) {
  return originalQuerySelector.call(document, selector);
};

Element.prototype.querySelector = function(selector) {
  return originalQuerySelector.call(document, selector);
};

// Mock ResizeObserver
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observables = [];
  }

  observe(element) {
    this.observables.push(element);
  }

  unobserve(element) {
    this.observables = this.observables.filter(el => el !== element);
  }

  disconnect() {
    this.observables = [];
  }
}

window.ResizeObserver = MockResizeObserver;

// Mock WebSocket
class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = 1; // OPEN
    this._sentMessages = [];
    this.onopen = null;
    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;
    this._eventListeners = {};

    // Simulate connection
    setTimeout(() => {
      if (this.onopen) {
        this.onopen({ target: this });
      }
      // Also dispatch open event for addEventListener
      this._dispatchEvent('open', { target: this });
    }, 0);
  }

  send(message) {
    this._sentMessages.push(message);
    return true;
  }

  close() {
    this.readyState = 3; // CLOSED
    if (this.onclose) {
      this.onclose({ target: this });
    }
    // Also dispatch close event for addEventListener
    this._dispatchEvent('close', { target: this });
    return true;
  }

  // Add event listener support
  addEventListener(eventName, callback) {
    if (!this._eventListeners[eventName]) {
      this._eventListeners[eventName] = [];
    }
    this._eventListeners[eventName].push(callback);
  }

  // Remove event listener support
  removeEventListener(eventName, callback) {
    if (this._eventListeners[eventName]) {
      this._eventListeners[eventName] = this._eventListeners[eventName].filter(cb => cb !== callback);
    }
  }

  // Dispatch event to listeners
  _dispatchEvent(eventName, event) {
    if (this._eventListeners[eventName]) {
      this._eventListeners[eventName].forEach(callback => {
        callback(event);
      });
    }
  }

  // Helper method for tests to simulate receiving a message
  mockReceiveMessage(message) {
    const event = { data: message, target: this };
    if (this.onmessage) {
      this.onmessage(event);
    }
    // Also dispatch message event for addEventListener
    this._dispatchEvent('message', event);
    return true;
  }
}

// Mock localStorage
class MockLocalStorage {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

// Mock Audio
class MockAudio {
  constructor(src) {
    this.src = src;
    this.paused = true;
    this.currentTime = 0;
    this.volume = 1;
    this.muted = false;
    this.playCount = 0;
  }

  play() {
    this.paused = false;
    this.playCount++;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }

  load() {
    // Do nothing
  }
}

// Set up global mocks
window.WebSocket = MockWebSocket;

// Create a mock localStorage and define it as a property on window
const mockLocalStorage = new MockLocalStorage();
Object.defineProperty(window, 'localStorage', {
  get: function() {
    return mockLocalStorage;
  }
});

window.Audio = MockAudio;

// Mock other browser APIs as needed
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = function() {};
}

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = function() {};
}

// Chess.js is mocked in chess-mock.js

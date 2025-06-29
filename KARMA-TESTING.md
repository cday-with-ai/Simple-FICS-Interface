# Karma Testing Guide for Simple FICS Interface

This document provides instructions on how to use the Karma testing setup for the Simple FICS Interface project.

## Setup

The project uses Karma for testing with the following configuration:

- Jasmine testing framework
- Chrome browser for running tests
- Webpack for bundling ES modules
- Babel for ES modules support
- Mocks for browser APIs (WebSocket, localStorage, Audio)

## Installation

Install the required dependencies:

```bash
npm install
```

## Running Tests

You can run tests using the following npm scripts:

```bash
# Run all tests once
npm test

# Run tests in watch mode (tests will re-run when files change)
npm run test:watch

# Run tests in debug mode (opens Chrome for debugging)
npm run test:debug
```

Alternatively, you can use the run-karma-tests.js script:

```bash
node run-karma-tests.js
```

## Test Files Structure

The test files are organized as follows:

- `test/` - Contains all test files
- `test/*.karma.test.js` - Karma test files
- `test/karma-setup.js` - Setup file for Karma tests
- `karma.conf.js` - Karma configuration

## Writing Tests

### Test File Naming Convention

Name your test files with the `.karma.test.js` extension to ensure they are picked up by Karma:

```
my-feature.karma.test.js
```

### Basic Test Structure

```javascript
describe('Feature Name', () => {
    // Set up before each test
    beforeEach(() => {
        // Set up code here
    });

    // Clean up after each test
    afterEach(() => {
        // Clean up code here
    });

    // Test case
    it('should do something', () => {
        // Test code here
        expect(something).toBe(true);
    });
});
```

### Testing DOM Interactions

The DOM is automatically set up in the browser environment. You can manipulate and test DOM elements directly:

```javascript
describe('DOM Interactions', () => {
    beforeEach(() => {
        // Set up the DOM
        document.body.innerHTML = `
      <div id="testElement"></div>
    `;
    });

    it('should update the DOM', () => {
        // Get the element
        const element = document.getElementById('testElement');

        // Update it
        element.textContent = 'Hello, World!';

        // Test it
        expect(element.textContent).toBe('Hello, World!');
    });
});
```

### Testing Events

You can test events using Jasmine spies:

```javascript
it('should handle click events', () => {
    // Create a button
    const button = document.createElement('button');
    document.body.appendChild(button);

    // Create a spy
    const clickSpy = jasmine.createSpy('clickHandler');

    // Add event listener
    button.addEventListener('click', clickSpy);

    // Trigger the event
    button.click();

    // Check that the spy was called
    expect(clickSpy).toHaveBeenCalled();
});
```

### Mocking

The `karma-setup.js` file provides mock implementations for browser APIs:

- `WebSocket` - For testing WebSocket connections
- `localStorage` - For testing localStorage usage
- `Audio` - For testing audio playback

Example usage:

```javascript
// Test WebSocket
it('should send a message via WebSocket', () => {
    // Create a WebSocket
    const ws = new WebSocket('wss://example.com');

    // Send a message
    ws.send('Hello');

    // Check that the message was sent
    expect(ws._sentMessages).toContain('Hello');

    // Simulate receiving a message
    ws.mockReceiveMessage('Response');
});

// Test localStorage
it('should store data in localStorage', () => {
    // Store data
    localStorage.setItem('key', 'value');

    // Check that the data was stored
    expect(localStorage.getItem('key')).toBe('value');
});

// Test Audio
it('should play a sound', () => {
    // Create an Audio object
    const sound = new Audio('sound.wav');

    // Play the sound
    sound.play();

    // Check that the sound was played
    expect(sound.paused).toBe(false);
    expect(sound.playCount).toBe(1);
});
```

## Debugging Tests

To debug tests, run:

```bash
npm run test:debug
```

This will open Chrome with the Karma debug interface. You can:

1. Click "Debug" to open a new window with your tests
2. Open the browser's developer tools (F12)
3. Set breakpoints and debug your tests

## Troubleshooting

### Module Import Issues

If you encounter issues with ES module imports, check:

1. The webpack configuration in karma.conf.js
2. The Babel configuration in .babelrc

### Browser Compatibility Issues

If tests work in one browser but not another, check:

1. Browser-specific features you might be using
2. Polyfills that might be needed

### Timeout Issues

If tests are timing out, you can increase the timeout in karma.conf.js:

```javascript
client: {
    jasmine: {
        timeoutInterval: 10000 // 10 seconds
    }
}
```

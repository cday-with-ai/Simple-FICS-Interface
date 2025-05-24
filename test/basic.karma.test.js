// Basic test to verify Karma setup

describe('Basic Tests', () => {
  it('should pass a simple test', () => {
    expect(true).toBe(true);
  });

  it('should have access to the DOM', () => {
    const element = document.createElement('div');
    element.id = 'test-element';
    document.body.appendChild(element);
    
    const foundElement = document.getElementById('test-element');
    expect(foundElement).not.toBeNull();
  });

  it('should have a working WebSocket mock', () => {
    const ws = new WebSocket('wss://example.com');
    expect(ws).toBeDefined();
    expect(typeof ws.send).toBe('function');
    expect(typeof ws.addEventListener).toBe('function');
    
    // Test sending a message
    ws.send('test message');
    expect(ws._sentMessages).toContain('test message');
    
    // Test event listener
    let messageReceived = false;
    ws.addEventListener('message', () => {
      messageReceived = true;
    });
    
    ws.mockReceiveMessage('response');
    expect(messageReceived).toBe(true);
  });

  it('should have a working localStorage mock', () => {
    localStorage.setItem('test-key', 'test-value');
    expect(localStorage.getItem('test-key')).toBe('test-value');
    
    localStorage.removeItem('test-key');
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should have a working Audio mock', () => {
    const audio = new Audio('test.wav');
    expect(audio.paused).toBe(true);
    
    audio.play();
    expect(audio.paused).toBe(false);
    expect(audio.playCount).toBe(1);
  });

});

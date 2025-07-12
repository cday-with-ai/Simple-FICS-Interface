import { FICSStore } from '../FICSStore';
import { ChatStore } from '../ChatStore';
import { GameStore } from '../GameStore';

describe('FICSStore - Pre-login message handling', () => {
    let ficsStore: FICSStore;
    let chatStore: ChatStore;
    let gameStore: GameStore;

    beforeEach(() => {
        // Create stores
        chatStore = new ChatStore();
        gameStore = new GameStore();
        ficsStore = new FICSStore();

        // Wire up the stores
        ficsStore.rootStore = { chatStore, gameStore };
        chatStore.rootStore = { ficsStore };
        gameStore.rootStore = { ficsStore };
    });

    afterEach(() => {
        // Clean up any WebSocket connections
        if ((ficsStore as any).ws) {
            (ficsStore as any).ws.close();
            (ficsStore as any).ws = null;
        }
    });

    it('should display pre-login messages immediately without buffering', () => {
        // Don't actually connect, just test message handling
        // Simulate pre-login messages (no fics% delimiter)
        const preLoginMessage = `
         _       __     __                             __           
        | |     / /__  / /________  ____ ___  ___   / /_____      
        | | /| / / _ \\/ / ___/ __ \\/ __ \`__ \\/ _ \\ / __/ __ \\     
        | |/ |/ /  __/ / /__/ /_/ / / / / / /  __// /_/ /_/ /     
        |__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/ \\__/\\____/      
                                                                   
                    FREE INTERNET CHESS SERVER
                        http://www.freechess.org

login: `;

        // Call handleMessage directly (simulating WebSocket message)
        (ficsStore as any).handleMessage(preLoginMessage);

        // Check that messages were added to console
        const consoleTab = chatStore.tabs.get('console');
        expect(consoleTab).toBeDefined();
        expect(consoleTab!.messages.length).toBeGreaterThan(0);
        
        // The welcome message should be in the console
        const messages = consoleTab!.messages.map(m => m.content).join('\n');
        expect(messages).toContain('FREE INTERNET CHESS SERVER');
        expect(messages).toContain('login: ');
    });

    it('should buffer messages after login when fics% delimiter is present', () => {
        // Simulate login by triggering sessionStart
        (ficsStore as any).handleMessage('**** Starting FICS session as TestUser ****');
        
        // Now we should be in logged-in state
        expect((ficsStore as any).loginState).toBe('logged-in');

        // Send partial message (without fics% delimiter)
        const partialMessage = 'TestUser(50): This is a partial message';
        (ficsStore as any).handleMessage(partialMessage);

        // Check that no messages were added yet
        const channelTab = chatStore.tabs.get('channel-50');
        expect(channelTab).toBeUndefined();

        // Send the delimiter
        (ficsStore as any).handleMessage('\nfics%');

        // Now the message should be processed
        const channelTabAfter = chatStore.tabs.get('channel-50');
        expect(channelTabAfter).toBeDefined();
        expect(channelTabAfter!.messages.length).toBe(1);
        expect(channelTabAfter!.messages[0].content).toBe('This is a partial message');
    });

    it('should handle transition from pre-login to post-login correctly', () => {
        // Start with pre-login message
        const loginPrompt = 'login: ';
        (ficsStore as any).handleMessage(loginPrompt);

        // Check console has the login prompt
        const consoleTab = chatStore.tabs.get('console');
        expect(consoleTab).toBeDefined();
        
        let consoleMessages = consoleTab!.messages;
        expect(consoleMessages.length).toBeGreaterThan(0);
        expect(consoleMessages.map(m => m.content).join('')).toContain('login: ');

        // Simulate login success
        const loginSuccess = `
**** Starting FICS session as TestUser

fics%`;
        (ficsStore as any).handleMessage(loginSuccess);

        // After this, user should be set
        expect(ficsStore.user).toBeDefined();
        expect(ficsStore.user!.handle).toBe('TestUser');

        // Now send a post-login message with delimiter
        const postLoginMessage = `TestUser(1): Hello everyone!
fics%`;
        (ficsStore as any).handleMessage(postLoginMessage);

        // Check that channel message was created
        const channelTab = chatStore.tabs.get('channel-1');
        expect(channelTab).toBeDefined();
        expect(channelTab!.messages.length).toBe(1);
        expect(channelTab!.messages[0].content).toBe('Hello everyone!');
    });

    it('should handle multi-line messages that arrive in chunks', () => {
        // Simulate login by triggering sessionStart
        (ficsStore as any).handleMessage('**** Starting FICS session as TestUser ****');
        
        // Now we should be in logged-in state
        expect((ficsStore as any).loginState).toBe('logged-in');

        // First chunk - partial message without continuation
        const chunk1 = 'cday(202): this is a really long message this is a really long message this is a really long message this is a really';
        (ficsStore as any).handleMessage(chunk1);

        // No messages should be processed yet (waiting for fics%)
        expect(chatStore.tabs.get('channel-202')).toBeUndefined();

        // Second chunk - continuation and delimiter
        const chunk2 = '\n\\   long message this is a really long message this is a really long message thi\nfics%';
        (ficsStore as any).handleMessage(chunk2);

        // Now the complete message should be processed
        const channelTab = chatStore.tabs.get('channel-202');
        expect(channelTab).toBeDefined();
        expect(channelTab!.messages.length).toBe(1);
        
        const expectedMessage = 'this is a really long message this is a really long message this is a really long message this is a really\nlong message this is a really long message this is a really long message thi';
        expect(channelTab!.messages[0].content).toBe(expectedMessage);
    });
});
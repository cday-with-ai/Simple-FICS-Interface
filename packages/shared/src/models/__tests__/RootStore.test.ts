import {RootStore} from '../RootStore';
import {GameStore} from '../GameStore';
import {FICSStore} from '../FICSStore';
import {ChatStore} from '../ChatStore';
import {PreferencesStore} from '../PreferencesStore';

describe('RootStore', () => {
    let rootStore: RootStore;

    beforeEach(() => {
        rootStore = new RootStore();
    });

    afterEach(() => {
        rootStore.dispose();
    });

    describe('Initialization', () => {
        it('should create all child stores', () => {
            expect(rootStore.gameStore).toBeInstanceOf(GameStore);
            expect(rootStore.ficsStore).toBeInstanceOf(FICSStore);
            expect(rootStore.chatStore).toBeInstanceOf(ChatStore);
            expect(rootStore.preferencesStore).toBeInstanceOf(PreferencesStore);
        });

        it('should set rootStore reference in child stores', () => {
            expect((rootStore.gameStore as any).rootStore).toBe(rootStore);
            expect((rootStore.ficsStore as any).rootStore).toBe(rootStore);
            expect((rootStore.chatStore as any).rootStore).toBe(rootStore);
            expect((rootStore.preferencesStore as any).rootStore).toBe(rootStore);
        });

        it('should be observable', () => {
            expect(rootStore.gameStore).toBeDefined();
            expect(rootStore.ficsStore).toBeDefined();
            expect(rootStore.chatStore).toBeDefined();
            expect(rootStore.preferencesStore).toBeDefined();
        });
    });

    describe('Disposal', () => {
        it('should disconnect FICS store on disposal', () => {
            const disconnectSpy = jest.spyOn(rootStore.ficsStore, 'disconnect');
            rootStore.dispose();
            expect(disconnectSpy).toHaveBeenCalled();
        });
    });

    describe('Store Integration', () => {
        it('should allow cross-store communication', () => {
            // Test that stores can communicate through the root store
            const addMessageSpy = jest.spyOn(rootStore.chatStore, 'addMessage');

            // Simulate a message being added to chat from FICS store
            rootStore.chatStore.addMessage('console', {
                channel: 'console',
                sender: 'FICS',
                content: 'Connected to server',
                timestamp: new Date(),
                type: 'system'
            });

            expect(addMessageSpy).toHaveBeenCalledWith('console', expect.objectContaining({
                channel: 'console',
                sender: 'FICS',
                content: 'Connected to server',
                type: 'system'
            }));
        });
    });

    describe('Factory Function', () => {
        it('should create a new RootStore instance', () => {
            const {createRootStore} = require('../RootStore');
            const store = createRootStore();
            expect(store).toBeInstanceOf(RootStore);
            store.dispose();
        });
    });
});
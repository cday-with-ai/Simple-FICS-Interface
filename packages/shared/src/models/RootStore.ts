import {makeAutoObservable} from 'mobx';
import {GameStore} from './GameStore';
import {FICSStore} from './FICSStore';
import {ChatStore} from './ChatStore';
import {PreferencesStore} from './PreferencesStore';

export class RootStore {
    gameStore: GameStore;
    ficsStore: FICSStore;
    chatStore: ChatStore;
    preferencesStore: PreferencesStore;

    constructor() {
        makeAutoObservable(this, {
            gameStore: false,
            ficsStore: false,
            chatStore: false,
            preferencesStore: false
        });

        this.gameStore = new GameStore();
        this.ficsStore = new FICSStore();
        this.chatStore = new ChatStore();
        this.preferencesStore = new PreferencesStore();

        // Set the root store reference after construction
        (this.gameStore as any).rootStore = this;
        (this.ficsStore as any).rootStore = this;
        (this.chatStore as any).rootStore = this;
        (this.preferencesStore as any).rootStore = this;
    }

    dispose() {
        // Clean up resources when store is no longer needed
        this.ficsStore.disconnect();
    }
}

export const createRootStore = () => new RootStore();
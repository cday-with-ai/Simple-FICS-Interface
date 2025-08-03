import {makeAutoObservable} from 'mobx';
import {GameStore} from './GameStore';
import {FICSStore} from './FICSStore';
import {ChatStore} from './ChatStore';
import {PreferencesStore} from './PreferencesStore';
import {AnalysisStore} from './AnalysisStore';
import {SoundStore} from './SoundStore';
import {BackendStore} from './BackendStore';

export class RootStore {
    gameStore: GameStore;
    ficsStore: FICSStore;
    chatStore: ChatStore;
    preferencesStore: PreferencesStore;
    analysisStore: AnalysisStore;
    soundStore: SoundStore;
    backendStore: BackendStore;

    constructor() {
        makeAutoObservable(this, {
            gameStore: false,
            ficsStore: false,
            chatStore: false,
            preferencesStore: false,
            analysisStore: false,
            soundStore: false,
            backendStore: false
        });

        this.gameStore = new GameStore();
        this.ficsStore = new FICSStore();
        this.chatStore = new ChatStore();
        this.preferencesStore = new PreferencesStore();
        this.analysisStore = new AnalysisStore();
        this.soundStore = new SoundStore();
        this.backendStore = new BackendStore();

        // Set the root store reference after construction
        (this.gameStore as any).rootStore = this;
        (this.ficsStore as any).rootStore = this;
        (this.chatStore as any).rootStore = this;
        (this.preferencesStore as any).rootStore = this;
        (this.analysisStore as any).rootStore = this;
        (this.soundStore as any).rootStore = this;
        (this.backendStore as any).rootStore = this;
        
        // Initialize sound store after all stores are connected
        this.soundStore.initialize();
    }

    dispose() {
        // Clean up resources when store is no longer needed
        this.ficsStore.disconnect();
        this.analysisStore.dispose();
    }
}

export const createRootStore = () => new RootStore();
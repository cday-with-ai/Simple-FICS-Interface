import { GameStore } from './GameStore';
import { FICSStore } from './FICSStore';
import { ChatStore } from './ChatStore';
import { PreferencesStore } from './PreferencesStore';

export class RootStore {
  gameStore: GameStore;
  ficsStore: FICSStore;
  chatStore: ChatStore;
  preferencesStore: PreferencesStore;

  constructor() {
    this.gameStore = new GameStore();
    this.ficsStore = new FICSStore();
    this.chatStore = new ChatStore();
    this.preferencesStore = new PreferencesStore();
  }
}

export const createRootStore = () => new RootStore();
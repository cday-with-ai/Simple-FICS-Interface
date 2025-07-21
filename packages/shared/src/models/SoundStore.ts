import { makeAutoObservable, reaction } from 'mobx';
import { getSoundService, SoundType } from '../services/SoundService';

// Forward declaration to avoid circular dependency
interface RootStore {
    preferencesStore: any;
}

export class SoundStore {
    private soundService = getSoundService();
    rootStore?: RootStore;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    initialize() {
        // React to preference changes
        if (this.rootStore?.preferencesStore) {
            reaction(
                () => this.rootStore!.preferencesStore.preferences.enableSounds,
                (enabled) => {
                    this.soundService.setEnabled(enabled);
                }
            );
            
            // Set initial state from preferences
            this.soundService.setEnabled(
                this.rootStore.preferencesStore.preferences.enableSounds
            );
        }
    }
    
    playSound(sound: SoundType, volume?: number) {
        // Check specific sound preferences
        const prefs = this.rootStore?.preferencesStore?.preferences;
        console.log('[SoundStore] Attempting to play sound:', {
            sound,
            enableSounds: prefs?.enableSounds,
            moveSound: prefs?.moveSound,
            captureSound: prefs?.captureSound,
            volume
        });
        
        if (!prefs?.enableSounds) {
            console.log('[SoundStore] Sounds disabled globally');
            return;
        }
        
        // Check individual sound preferences
        switch (sound) {
            case 'move':
                if (!prefs.moveSound) {
                    console.log('[SoundStore] Move sound disabled');
                    return;
                }
                break;
            case 'capture':
                if (!prefs.captureSound) {
                    console.log('[SoundStore] Capture sound disabled');
                    return;
                }
                break;
            // Note: checkSound preference exists but we don't have a check.wav file
            // Add other sound-specific preferences as needed
        }
        
        console.log('[SoundStore] Playing sound:', sound, 'at volume:', volume || 0.5);
        this.soundService.play(sound, volume);
    }
    
    // Convenience methods for specific sounds
    playMove() {
        this.playSound('move');
    }
    
    playCapture() {
        this.playSound('capture');
    }
    
    playStart() {
        this.playSound('start');
    }
    
    playEnd() {
        this.playSound('end');
    }
    
    playIllegal() {
        this.playSound('illegal');
    }
    
    playChallenge() {
        this.playSound('challenge');
    }
    
    playDraw() {
        this.playSound('draw');
    }
    
    playAbort() {
        this.playSound('abort');
    }
    
    playAlert() {
        this.playSound('alert');
    }
}
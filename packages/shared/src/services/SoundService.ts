export type SoundType = 
    | 'abort'
    | 'alert'
    | 'capture'
    | 'challenge'
    | 'draw'
    | 'end'
    | 'illegal'
    | 'move'
    | 'start';

export interface SoundServiceInterface {
    play(sound: SoundType): void;
    setEnabled(enabled: boolean): void;
    preloadSounds(): void;
}

export class SoundService implements SoundServiceInterface {
    private enabled: boolean = true;
    private sounds: Map<SoundType, HTMLAudioElement> = new Map();
    private basePath: string = '/sounds/';
    
    constructor() {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
            this.preloadSounds();
        }
    }
    
    preloadSounds(): void {
        // Define sound files and their formats
        const soundFiles: Record<SoundType, string> = {
            abort: 'abort.wav',
            alert: 'alert.wav',
            capture: 'capture.ogg',
            challenge: 'challenge.wav',
            draw: 'draw.wav',
            end: 'end.wav',
            illegal: 'illegal.wav',
            move: 'move.ogg',
            start: 'start.wav'
        };
        
        // Preload all sounds
        Object.entries(soundFiles).forEach(([type, file]) => {
            try {
                const audio = new Audio(this.basePath + file);
                audio.preload = 'auto';
                this.sounds.set(type as SoundType, audio);
            } catch (error) {
                console.warn(`Failed to preload sound: ${file}`, error);
            }
        });
    }
    
    play(sound: SoundType, volume: number = 0.5): void {
        if (!this.enabled || typeof window === 'undefined') {
            return;
        }
        
        const audio = this.sounds.get(sound);
        if (audio) {
            // Clone the audio to allow overlapping sounds
            const clone = audio.cloneNode() as HTMLAudioElement;
            clone.volume = volume; // Use provided volume or default
            clone.play().catch(error => {
                console.warn(`Failed to play sound: ${sound}`, error);
            });
        }
    }
    
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }
    
    isEnabled(): boolean {
        return this.enabled;
    }
}

// Singleton instance
let soundServiceInstance: SoundService | null = null;

export function getSoundService(): SoundService {
    if (!soundServiceInstance) {
        soundServiceInstance = new SoundService();
    }
    return soundServiceInstance;
}
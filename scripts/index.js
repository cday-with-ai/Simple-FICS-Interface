// Import from refactored modules
import { initFics } from './fics.js';
import { initChat } from './chat.js';

const sounds = new Map(Object.entries({
    abort: new Audio('sounds/abort.wav'),
    alert: new Audio('sounds/alert.wav'),
    capture: new Audio('sounds/capture.ogg'),
    challenge: new Audio('sounds/challenge.wav'),
    draw: new Audio('sounds/draw.wav'),
    start: new Audio('sounds/start.wav'),
    end: new Audio('sounds/end.wav'),
    illegal: new Audio('sounds/illegal.wav'),
    move: new Audio('sounds/move.ogg')
}));
Object.keys(sounds).forEach(sound => {
    sounds.get(sound).load();
});

// Cache busting for stylesheets and scripts
document.addEventListener('DOMContentLoaded', function () {
    const randomNumber = Math.floor(Math.random() * 1000000000);

    // Process stylesheet links
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        if (link.href && !link.href.includes('fonts.googleapis.com')) {
            if (link.href.includes('?v=')) {
                link.href = link.href.replace(/(\?v=)[^&]+/, '$1' + randomNumber);
            } else if (link.href.includes('?')) {
                link.href += '&v=' + randomNumber;
            } else {
                link.href += '?v=' + randomNumber;
            }
        }
    });

    // Process script tags
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        if (script.src && !script.src.includes('cdnjs.cloudflare.com')) {
            if (script.src.includes('?v=')) {
                script.src = script.src.replace(/(\?v=)[^&]+/, '$1' + randomNumber);
            } else if (script.src.includes('?')) {
                script.src += '&v=' + randomNumber;
            } else {
                script.src += '?v=' + randomNumber;
            }
        }
    });

    const metaBuildTime = document.createElement('meta');
    metaBuildTime.name = 'build-time';
    metaBuildTime.content = new Date().toISOString();
    document.head.appendChild(metaBuildTime);
});

// Initialize the application when the window loads
window.onload = function () {
    // Initialize FICS connection and preferences
    initFics();
    
    // Initialize chat system
    initChat();
};

/**
 * Play a sound. This function is in index.js to avoid testing issues with audio.
 * @param sound The sound to play e.g. 'move', 'capture', 'start', etc.
 */
export function playSound(sound) {
    const playableSound = sounds.get(sound);

    if (!playableSound.paused) {
        // The previous sound is playing. We could reset the current sound with
        // playableSound.currentTime = 0 ,but we probably don't want to cut off that sound,
        // so let's make a copy of the sound and dereference the previous one
        sounds.set(sound, new Audio(playableSound.src));
        sounds.get(sound).load();
    }
    sounds.get(sound).play();
}

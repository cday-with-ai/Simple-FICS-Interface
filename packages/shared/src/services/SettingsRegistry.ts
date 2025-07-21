import { makeAutoObservable } from 'mobx';
import { SettingDefinition, SettingCategory, PreviewState } from '../types/Settings.types';

export class SettingsRegistry {
  private settings: Map<string, SettingDefinition> = new Map();
  private categories: Map<string, SettingCategory> = new Map();
  private elementMappings: Map<string, string[]> = new Map(); // CSS selector -> setting IDs
  previewState: PreviewState = {
    isActive: false,
    originalValues: new Map(),
    previewValues: new Map(),
    timeout: null
  };

  constructor() {
    makeAutoObservable(this);
    this.initializeCategories();
    this.registerDefaultSettings();
    this.loadCustomSounds();
  }

  private initializeCategories() {
    const categories: SettingCategory[] = [
      { id: 'board', label: 'Board & Pieces', icon: '♟️', order: 1 },
      { id: 'clock', label: 'Clock', icon: '⏱️', order: 2 },
      { id: 'chat', label: 'Chat & Messages', icon: '💬', order: 3 },
      { id: 'sounds', label: 'Sounds', icon: '🔊', order: 4 },
      { id: 'advanced', label: 'Advanced', icon: '🔧', order: 5 }
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));
  }

  private registerDefaultSettings() {
    // Board & Pieces

    this.register({
      id: 'pieceSet',
      category: 'board',
      label: 'Piece Set',
      description: 'Choose the chess piece graphics style',
      type: 'select',
      value: 'cburnett',
      defaultValue: 'cburnett',
      options: [
        { label: 'Alpha', value: 'alpha' },
        { label: 'Anarcandy', value: 'anarcandy' },
        { label: 'Caliente', value: 'caliente' },
        { label: 'California', value: 'california' },
        { label: 'Cardinal', value: 'cardinal' },
        { label: 'Cburnett', value: 'cburnett' },
        { label: 'Celtic', value: 'celtic' },
        { label: 'Chess7', value: 'chess7' },
        { label: 'Chessnut', value: 'chessnut' },
        { label: 'Companion', value: 'companion' },
        { label: 'Cooke', value: 'cooke' },
        { label: 'Disguised', value: 'disguised' },
        { label: 'Dubrovny', value: 'dubrovny' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Firi', value: 'firi' },
        { label: 'Fresca', value: 'fresca' },
        { label: 'Gioco', value: 'gioco' },
        { label: 'Governor', value: 'governor' },
        { label: 'Horsey', value: 'horsey' },
        { label: 'ICPieces', value: 'icpieces' },
        { label: 'Kiwen-suwi', value: 'kiwen-suwi' },
        { label: 'Kosal', value: 'kosal' },
        { label: 'Leipzig', value: 'leipzig' },
        { label: 'Letter', value: 'letter' },
        { label: 'Maestro', value: 'maestro' },
        { label: 'Merida', value: 'merida' },
        { label: 'Monarchy', value: 'monarchy' },
        { label: 'Mono', value: 'mono' },
        { label: 'MPChess', value: 'mpchess' },
        { label: 'Pirouetti', value: 'pirouetti' },
        { label: 'Pixel', value: 'pixel' },
        { label: 'Reilly Craig', value: 'reillycraig' },
        { label: 'RhosGFX', value: 'rhosgfx' },
        { label: 'Riohacha', value: 'riohacha' },
        { label: 'Shapes', value: 'shapes' },
        { label: 'Spatial', value: 'spatial' },
        { label: 'Staunty', value: 'staunty' },
        { label: 'Tatiana', value: 'tatiana' },
        { label: 'XKCD', value: 'xkcd' }
      ],
      keywords: ['pieces', 'graphics', 'style'],
      previewType: 'instant'
    });

    this.register({
      id: 'showCoordinates',
      category: 'board',
      label: 'Show Coordinates',
      description: 'Display file and rank labels on the board',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['labels', 'a-h', '1-8', 'notation'],
      previewType: 'instant'
    });

    this.register({
      id: 'animateMoves',
      category: 'board',
      label: 'Animate Moves',
      description: 'Smoothly animate piece movements',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['animation', 'movement', 'smooth'],
      previewType: 'instant'
    });

    this.register({
      id: 'animationDuration',
      category: 'board',
      label: 'Animation Speed',
      description: 'How fast pieces move in milliseconds (1000ths of a second)',
      type: 'number',
      value: 250,
      defaultValue: 250,
      min: 0,
      max: 1000,
      step: 50,
      unit: 'ms',
      dependencies: ['animateMoves'],
      keywords: ['speed', 'duration', 'fast', 'slow'],
      previewType: 'instant'
    });


    // Appearance settings have been moved to the header menu for easier access

    this.register({
      id: 'chatFontSize',
      category: 'chat',
      label: 'Chat Font Size',
      description: 'Size of text in chat messages',
      type: 'select',
      value: 'medium',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ],
      keywords: ['text', 'size', 'readability'],
      previewType: 'instant'
    });

    // Sounds
    this.register({
      id: 'enableSounds',
      category: 'sounds',
      label: 'Enable Sounds',
      description: 'Master toggle for all sound effects',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['audio', 'mute', 'volume'],
      previewType: 'apply'
    });

    this.register({
      id: 'moveSoundFile',
      category: 'sounds',
      label: 'Move Sound',
      description: 'Sound played when pieces move',
      type: 'select',
      value: 'move.ogg',
      defaultValue: 'move.ogg',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Move', value: 'move.ogg' },
        { label: 'Capture', value: 'capture.ogg' },
        { label: 'Alert', value: 'alert.wav' },
        { label: 'Start', value: 'start.wav' },
        { label: 'End', value: 'end.wav' },
        { label: 'Draw', value: 'draw.wav' },
        { label: 'Abort', value: 'abort.wav' },
        { label: 'Challenge', value: 'challenge.wav' },
        { label: 'Illegal', value: 'illegal.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'move', 'sound', 'file'],
      previewType: 'test'
    });

    this.register({
      id: 'captureSoundFile',
      category: 'sounds',
      label: 'Capture Sound',
      description: 'Sound played when pieces are captured',
      type: 'select',
      value: 'capture.ogg',
      defaultValue: 'capture.ogg',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Capture', value: 'capture.ogg' },
        { label: 'Move', value: 'move.ogg' },
        { label: 'Alert', value: 'alert.wav' },
        { label: 'Start', value: 'start.wav' },
        { label: 'End', value: 'end.wav' },
        { label: 'Draw', value: 'draw.wav' },
        { label: 'Abort', value: 'abort.wav' },
        { label: 'Challenge', value: 'challenge.wav' },
        { label: 'Illegal', value: 'illegal.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'capture', 'sound', 'file'],
      previewType: 'test'
    });

    this.register({
      id: 'checkSoundFile',
      category: 'sounds',
      label: 'Check Sound',
      description: 'Sound played when king is in check',
      type: 'select',
      value: 'alert.wav',
      defaultValue: 'alert.wav',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Alert', value: 'alert.wav' },
        { label: 'Move', value: 'move.ogg' },
        { label: 'Capture', value: 'capture.ogg' },
        { label: 'Start', value: 'start.wav' },
        { label: 'End', value: 'end.wav' },
        { label: 'Draw', value: 'draw.wav' },
        { label: 'Abort', value: 'abort.wav' },
        { label: 'Challenge', value: 'challenge.wav' },
        { label: 'Illegal', value: 'illegal.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'check', 'sound', 'file'],
      previewType: 'test'
    });

    this.register({
      id: 'gameStartSoundFile',
      category: 'sounds',
      label: 'Game Start Sound',
      description: 'Sound played when a game starts',
      type: 'select',
      value: 'start.wav',
      defaultValue: 'start.wav',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Start', value: 'start.wav' },
        { label: 'Alert', value: 'alert.wav' },
        { label: 'Move', value: 'move.ogg' },
        { label: 'Challenge', value: 'challenge.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'game', 'start', 'sound', 'file'],
      previewType: 'test'
    });

    this.register({
      id: 'gameEndSoundFile',
      category: 'sounds',
      label: 'Game End Sound',
      description: 'Sound played when a game ends',
      type: 'select',
      value: 'end.wav',
      defaultValue: 'end.wav',
      options: [
        { label: 'None', value: 'none' },
        { label: 'End', value: 'end.wav' },
        { label: 'Draw', value: 'draw.wav' },
        { label: 'Abort', value: 'abort.wav' },
        { label: 'Alert', value: 'alert.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'game', 'end', 'sound', 'file'],
      previewType: 'test'
    });

    this.register({
      id: 'illegalMoveSoundFile',
      category: 'sounds',
      label: 'Illegal Move Sound',
      description: 'Sound played when attempting an illegal move',
      type: 'select',
      value: 'illegal.wav',
      defaultValue: 'illegal.wav',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Illegal', value: 'illegal.wav' },
        { label: 'Alert', value: 'alert.wav' },
        { label: 'Abort', value: 'abort.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'illegal', 'move', 'sound', 'file'],
      previewType: 'test'
    });

    this.register({
      id: 'challengeSoundFile',
      category: 'sounds',
      label: 'Challenge Sound',
      description: 'Sound played when receiving a challenge',
      type: 'select',
      value: 'challenge.wav',
      defaultValue: 'challenge.wav',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Challenge', value: 'challenge.wav' },
        { label: 'Alert', value: 'alert.wav' },
        { label: 'Start', value: 'start.wav' }
      ],
      dependencies: ['enableSounds'],
      keywords: ['audio', 'challenge', 'sound', 'file'],
      previewType: 'test'
    });

    // Board preferences

    this.register({
      id: 'showLegalMoves',
      category: 'board',
      label: 'Show Legal Moves',
      description: 'Highlight possible moves when selecting a piece',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['hints', 'possible', 'valid'],
      previewType: 'instant'
    });

    this.register({
      id: 'disableAnimationLowTime',
      category: 'clock',
      label: 'Disable Animations When Low on Time',
      description: 'Turn off piece animations when under 10 seconds',
      type: 'boolean',
      value: true,
      defaultValue: true,
      dependencies: ['animateMoves'],
      keywords: ['performance', 'time', 'speed', 'animation'],
      previewType: 'apply'
    });

    // Clock color settings
    this.register({
      id: 'clockColorTicking',
      category: 'clock',
      label: 'Clock Color (Active/Ticking)',
      description: 'Color when clock is actively counting down',
      type: 'color',
      value: '#000000',
      defaultValue: '#000000',
      keywords: ['clock', 'color', 'ticking', 'active'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockColorNotTicking',
      category: 'clock',
      label: 'Clock Color (Inactive)',
      description: 'Color when clock is not ticking',
      type: 'color',
      value: '#666666',
      defaultValue: '#666666',
      keywords: ['clock', 'color', 'inactive', 'stopped'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockColorLowTime',
      category: 'clock',
      label: 'Clock Color (Low Time)',
      description: 'Color when time is below warning threshold',
      type: 'color',
      value: '#ff0000',
      defaultValue: '#ff0000',
      keywords: ['clock', 'color', 'low', 'warning', 'red'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockBackgroundTicking',
      category: 'clock',
      label: 'Clock Background (Active/Ticking)',
      description: 'Background color when clock is actively counting down',
      type: 'color',
      value: '#ffffff',
      defaultValue: '#ffffff',
      keywords: ['clock', 'background', 'ticking', 'active'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockBackgroundNotTicking',
      category: 'clock',
      label: 'Clock Background (Inactive)',
      description: 'Background color when clock is not ticking',
      type: 'color',
      value: '#f0f0f0',
      defaultValue: '#f0f0f0',
      keywords: ['clock', 'background', 'inactive', 'stopped'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockBackgroundLowTime',
      category: 'clock',
      label: 'Clock Background (Low Time)',
      description: 'Background color when time is below warning threshold',
      type: 'color',
      value: '#ffeeee',
      defaultValue: '#ffeeee',
      keywords: ['clock', 'background', 'low', 'warning'],
      previewType: 'instant'
    });


    // View preferences - moved to header menu

    this.register({
      id: 'showCapturedPieces',
      category: 'board',
      label: 'Show Captured Pieces',
      description: 'Display captured pieces beside the board',
      type: 'boolean',
      value: false,
      defaultValue: false,
      keywords: ['captured', 'taken', 'pieces'],
      previewType: 'instant'
    });

    // Chat preferences
    this.register({
      id: 'showTimestamps',
      category: 'chat',
      label: 'Show Timestamps',
      description: 'Display time for each message',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['time', 'when', 'clock'],
      previewType: 'instant'
    });

    this.register({
      id: 'highlightMentions',
      category: 'chat',
      label: 'Highlight Mentions',
      description: 'Highlight messages that mention your username',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['mention', 'highlight', 'username'],
      previewType: 'apply'
    });

    this.register({
      id: 'openChannelsInTabs',
      category: 'chat',
      label: 'Open Channels in Tabs',
      description: 'Open channel messages in separate tabs',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['channel', 'tab', 'organize'],
      previewType: 'apply'
    });

    this.register({
      id: 'openTellsInTabs',
      category: 'chat',
      label: 'Open Tells in Tabs',
      description: 'Open private messages in separate tabs',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['tell', 'private', 'message', 'tab'],
      previewType: 'apply'
    });

    // Gameplay preferences

    this.register({
      id: 'disableAnimationsThreshold',
      category: 'board',
      label: 'Disable Animations Below',
      description: 'Turn off piece animations when time falls below this threshold,  measured in seconds.',
      type: 'number',
      value: 30,
      defaultValue: 30,
      min: 0,
      max: 300,
      step: 5,
      unit: 'seconds',
      dependencies: ['animateMoves'],
      keywords: ['animations', 'time', 'threshold', 'disable', 'low time'],
      previewType: 'instant'
    });

    this.register({
      id: 'confirmResign',
      category: 'board',
      label: 'Confirm Resign',
      description: 'Show confirmation dialog before resigning',
      type: 'boolean',
      value: true,
      defaultValue: true,
      keywords: ['resign', 'confirm', 'safety'],
      previewType: 'apply'
    });


    // Analysis preferences

    this.register({
      id: 'engineDepth',
      category: 'advanced',
      label: 'Engine Depth',
      description: 'Analysis depth for chess engine',
      type: 'number',
      value: 20,
      defaultValue: 20,
      min: 1,
      max: 50,
      step: 1,
      keywords: ['depth', 'analysis', 'stockfish'],
      previewType: 'apply'
    });


    // Advanced settings
    this.register({
      id: 'postLoginCommands',
      category: 'advanced',
      label: 'Post-Login Commands',
      description: 'Commands to send after logging into FICS',
      type: 'text',
      value: 'set style 12\nset prompt\nset bell off\nset gin off\nset interface Simple FICS Interface',
      defaultValue: 'set style 12\nset prompt\nset bell off\nset gin off\nset interface Simple FICS Interface',
      placeholder: 'Enter one command per line',
      keywords: ['login', 'commands', 'fics', 'startup'],
      previewType: 'apply',
      validate: (value: string) => {
        if (!value || value.trim() === '') {
          return 'At least one command is required';
        }
        
        // Check for dangerous commands
        const dangerousCommands = ['quit', 'exit', 'password', 'passwd'];
        const lines = value.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine === '') continue;
          
          // Check for dangerous commands
          const firstWord = trimmedLine.split(' ')[0].toLowerCase();
          if (dangerousCommands.includes(firstWord)) {
            return `Dangerous command detected: "${firstWord}" is not allowed`;
          }
          
          // Basic syntax check - commands should not start with special characters
          if (trimmedLine.match(/^[^a-zA-Z]/)) {
            return `Invalid command syntax: "${trimmedLine}" - commands must start with a letter`;
          }
        }
        
        return true;
      }
    });

    // Layout preference
    // Layout and auto view mode settings have been moved to automatic responsive behavior

    // From design doc - additional board settings
    this.register({
      id: 'highlightLastMoveDuration',
      category: 'board',
      label: 'Highlight Last Move Duration',
      description: 'How long to highlight the last move',
      type: 'select',
      value: 'always',
      defaultValue: 'always',
      options: [
        { label: 'Always', value: 'always' },
        { label: '3 seconds', value: '3s' },
        { label: '5 seconds', value: '5s' },
        { label: 'Never', value: 'never' }
      ],
      keywords: ['highlight', 'last move', 'duration'],
      previewType: 'instant'
    });

    this.register({
      id: 'premoveHighlightColor',
      category: 'board',
      label: 'Premove Highlight Color',
      description: 'Color for premove highlighting',
      type: 'color',
      value: '#ffff00',
      defaultValue: '#ffff00',
      keywords: ['premove', 'color', 'highlight'],
      previewType: 'instant'
    });


    // Clock settings from design doc

    // Clock font settings
    this.register({
      id: 'clockFontFamily',
      category: 'clock',
      label: 'Clock Font Family',
      description: 'Font family for clock display',
      type: 'select',
      value: 'monospace',
      defaultValue: 'monospace',
      options: [
        { label: 'Monospace', value: 'monospace' },
        { label: 'System Font', value: 'system-ui' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Roboto', value: 'Roboto, sans-serif' }
      ],
      keywords: ['clock', 'font', 'family', 'typeface'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockFontSize',
      category: 'clock',
      label: 'Clock Font Size',
      description: 'Size of clock text',
      type: 'select',
      value: 'large',
      defaultValue: 'large',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra Large', value: 'xlarge' }
      ],
      keywords: ['clock', 'font', 'size', 'text'],
      previewType: 'instant'
    });

    this.register({
      id: 'clockFontWeight',
      category: 'clock',
      label: 'Clock Font Weight',
      description: 'Font weight for clock display',
      type: 'select',
      value: 'bold',
      defaultValue: 'bold',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Medium', value: '500' },
        { label: 'Semi Bold', value: '600' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extra Bold', value: '800' }
      ],
      keywords: ['clock', 'font', 'weight', 'bold'],
      previewType: 'instant'
    });

    this.register({
      id: 'lowTimeThreshold',
      category: 'clock',
      label: 'Low Time Warning',
      description: 'Show warning when time drops below (seconds)',
      type: 'number',
      value: 30,
      defaultValue: 30,
      min: 5,
      max: 60,
      step: 5,
      unit: 's',
      keywords: ['time', 'warning', 'threshold', 'alert'],
      previewType: 'apply'
    });

    this.register({
      id: 'showMillisecondsUnder',
      category: 'clock',
      label: 'Show Milliseconds Under',
      description: 'Show tenths of seconds when time is below (seconds)',
      type: 'number',
      value: 10,
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 5,
      unit: 's',
      keywords: ['milliseconds', 'time', 'precision', 'tenths'],
      previewType: 'instant'
    });

    // Player context menu commands
    this.register({
      id: 'playerContextCommands',
      category: 'advanced',
      label: 'Player Context Commands',
      description: 'Commands shown when clicking on player names (JSON format)',
      type: 'text',
      value: JSON.stringify([
        { label: 'Finger', command: 'finger {player}' },
        { label: 'History', command: 'hi {player}' },
        { label: 'Variables', command: 'vars {player}' },
        { divider: true },
        { label: 'Censor', command: '+censor {player}' },
        { label: 'No Play', command: '+noplay {player}' }
      ], null, 2),
      defaultValue: JSON.stringify([
        { label: 'Finger', command: 'finger {player}' },
        { label: 'History', command: 'hi {player}' },
        { label: 'Variables', command: 'vars {player}' },
        { divider: true },
        { label: 'Censor', command: '+censor {player}' },
        { label: 'No Play', command: '+noplay {player}' }
      ], null, 2),
      placeholder: 'Enter player context commands in JSON format',
      keywords: ['context', 'menu', 'player', 'commands'],
      previewType: 'apply',
      validate: (value: string) => {
        if (!value || value.trim() === '') {
          return 'Player context commands cannot be empty';
        }
        
        try {
          const parsed = JSON.parse(value);
          
          if (!Array.isArray(parsed)) {
            return 'Commands must be an array';
          }
          
          for (let i = 0; i < parsed.length; i++) {
            const item = parsed[i];
            
            if (item.divider) continue;
            
            if (!item.label || typeof item.label !== 'string') {
              return `Item ${i + 1}: Missing or invalid label`;
            }
            
            if (!item.command || typeof item.command !== 'string') {
              return `Item ${i + 1}: Missing or invalid command`;
            }
            
            if (!item.command.includes('{player}')) {
              return `Item ${i + 1}: Command must include {player} placeholder`;
            }
          }
          
          return true;
        } catch (e) {
          return 'Invalid JSON format';
        }
      }
    });

    // Board color customization
    this.register({
      id: 'lightSquareColor',
      category: 'board',
      label: 'Light Square Color',
      description: 'Color for light squares on the chess board',
      type: 'color',
      value: '#f0d9b5',
      defaultValue: '#f0d9b5',
      keywords: ['board', 'light', 'square', 'color'],
      previewType: 'instant'
    });

    this.register({
      id: 'darkSquareColor',
      category: 'board',
      label: 'Dark Square Color',
      description: 'Color for dark squares on the chess board',
      type: 'color',
      value: '#b58863',
      defaultValue: '#b58863',
      keywords: ['board', 'dark', 'square', 'color'],
      previewType: 'instant'
    });

    this.register({
      id: 'coordinateColorLight',
      category: 'board',
      label: 'Coordinate Color (Light Squares)',
      description: 'Color for coordinates on light squares',
      type: 'color',
      value: '#b58863',
      defaultValue: '#b58863',
      keywords: ['coordinate', 'label', 'color', 'light', 'a-h', '1-8'],
      previewType: 'instant'
    });

    this.register({
      id: 'coordinateColorDark',
      category: 'board',
      label: 'Coordinate Color (Dark Squares)',
      description: 'Color for coordinates on dark squares',
      type: 'color',
      value: '#f0d9b5',
      defaultValue: '#f0d9b5',
      keywords: ['coordinate', 'label', 'color', 'dark', 'a-h', '1-8'],
      previewType: 'instant'
    });

    this.register({
      id: 'lastMoveHighlightColor',
      category: 'board',
      label: 'Last Move Highlight Color',
      description: 'Color for highlighting the last move',
      type: 'color',
      value: '#ffffcc',
      defaultValue: '#ffffcc',
      keywords: ['last', 'move', 'highlight', 'color'],
      previewType: 'instant'
    });

    // Console message colors (Light theme)
    this.register({
      id: 'channelTellColorLight',
      category: 'chat',
      label: 'Channel Tell Color (Light)',
      description: 'Color for channel messages in light theme',
      type: 'color',
      value: '#555555',
      defaultValue: '#555555',
      keywords: ['channel', 'tell', 'color', 'light'],
      previewType: 'instant'
    });

    this.register({
      id: 'directTellColorLight',
      category: 'chat',
      label: 'Direct Tell Color (Light)',
      description: 'Color for private messages in light theme',
      type: 'color',
      value: '#0066cc',
      defaultValue: '#0066cc',
      keywords: ['private', 'tell', 'color', 'light'],
      previewType: 'instant'
    });

    this.register({
      id: 'channel39ColorLight',
      category: 'chat',
      label: 'Channel 39 Color (Light)',
      description: 'Color for Channel 39 messages in light theme',
      type: 'color',
      value: '#cc0000',
      defaultValue: '#cc0000',
      keywords: ['channel', '39', 'color', 'light'],
      previewType: 'instant'
    });

    this.register({
      id: 'shoutColorLight',
      category: 'chat',
      label: 'Shout Color (Light)',
      description: 'Color for shout messages in light theme',
      type: 'color',
      value: '#006600',
      defaultValue: '#006600',
      keywords: ['shout', 'color', 'light'],
      previewType: 'instant'
    });

    this.register({
      id: 'gameNotificationColorLight',
      category: 'chat',
      label: 'Game Notification Color (Light)',
      description: 'Color for game notifications in light theme',
      type: 'color',
      value: '#4169e1',
      defaultValue: '#4169e1',
      keywords: ['game', 'notification', 'color', 'light'],
      previewType: 'instant'
    });

    // Console message colors (Dark theme)
    this.register({
      id: 'channelTellColorDark',
      category: 'chat',
      label: 'Channel Tell Color (Dark)',
      description: 'Color for channel messages in dark theme',
      type: 'color',
      value: '#aaaaaa',
      defaultValue: '#aaaaaa',
      keywords: ['channel', 'tell', 'color', 'dark'],
      previewType: 'instant'
    });

    this.register({
      id: 'directTellColorDark',
      category: 'chat',
      label: 'Direct Tell Color (Dark)',
      description: 'Color for private messages in dark theme',
      type: 'color',
      value: '#66aaff',
      defaultValue: '#66aaff',
      keywords: ['private', 'tell', 'color', 'dark'],
      previewType: 'instant'
    });

    this.register({
      id: 'channel39ColorDark',
      category: 'chat',
      label: 'Channel 39 Color (Dark)',
      description: 'Color for Channel 39 messages in dark theme',
      type: 'color',
      value: '#ff6666',
      defaultValue: '#ff6666',
      keywords: ['channel', '39', 'color', 'dark'],
      previewType: 'instant'
    });

    this.register({
      id: 'shoutColorDark',
      category: 'chat',
      label: 'Shout Color (Dark)',
      description: 'Color for shout messages in dark theme',
      type: 'color',
      value: '#66ff66',
      defaultValue: '#66ff66',
      keywords: ['shout', 'color', 'dark'],
      previewType: 'instant'
    });

    this.register({
      id: 'gameNotificationColorDark',
      category: 'chat',
      label: 'Game Notification Color (Dark)',
      description: 'Color for game notifications in dark theme',
      type: 'color',
      value: '#7788ff',
      defaultValue: '#7788ff',
      keywords: ['game', 'notification', 'color', 'dark'],
      previewType: 'instant'
    });


    // Font family settings
    this.register({
      id: 'consoleFontFamily',
      category: 'chat',
      label: 'Console Font Family',
      description: 'Font family for console messages',
      type: 'select',
      value: 'monospace',
      defaultValue: 'monospace',
      options: [
        { label: 'Monospace', value: 'monospace' },
        { label: 'System Font', value: 'system-ui' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' }
      ],
      keywords: ['console', 'font', 'family', 'monospace'],
      previewType: 'instant'
    });

    this.register({
      id: 'consoleFontStyle',
      category: 'chat',
      label: 'Console Font Style',
      description: 'Font style for console messages',
      type: 'select',
      value: 'normal',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Italic', value: 'italic' },
        { label: 'Oblique', value: 'oblique' }
      ],
      keywords: ['console', 'font', 'style', 'italic'],
      previewType: 'instant'
    });
  }

  register(setting: SettingDefinition) {
    this.settings.set(setting.id, setting);
    
    // Register element mappings
    // targetElements removed from SettingDefinition type
  }

  get(id: string): SettingDefinition | undefined {
    return this.settings.get(id);
  }

  getByCategory(categoryId: string): SettingDefinition[] {
    const settings = Array.from(this.settings.values())
      .filter(setting => setting.category === categoryId);
    
    // Appearance category has been removed - settings moved to header menu
    
    // Special sorting for board category
    if (categoryId === 'board') {
      const pieceSet = settings.find(s => s.id === 'pieceSet');
      const showCoordinates = settings.find(s => s.id === 'showCoordinates');
      const animateMoves = settings.find(s => s.id === 'animateMoves');
      const animationDuration = settings.find(s => s.id === 'animationDuration');
      const showLegalMoves = settings.find(s => s.id === 'showLegalMoves');
      const disableAnimationsThreshold = settings.find(s => s.id === 'disableAnimationsThreshold');
      const confirmResign = settings.find(s => s.id === 'confirmResign');
      const showCapturedPieces = settings.find(s => s.id === 'showCapturedPieces');
      const highlightLastMoveDuration = settings.find(s => s.id === 'highlightLastMoveDuration');
      const lightSquareColor = settings.find(s => s.id === 'lightSquareColor');
      const darkSquareColor = settings.find(s => s.id === 'darkSquareColor');
      const coordinateColorLight = settings.find(s => s.id === 'coordinateColorLight');
      const coordinateColorDark = settings.find(s => s.id === 'coordinateColorDark');
      const lastMoveHighlightColor = settings.find(s => s.id === 'lastMoveHighlightColor');
      const premoveHighlightColor = settings.find(s => s.id === 'premoveHighlightColor');
      
      const otherSettings = settings.filter(s => 
        s.id !== 'pieceSet' &&
        s.id !== 'showCoordinates' &&
        s.id !== 'animateMoves' &&
        s.id !== 'animationDuration' &&
        s.id !== 'showLegalMoves' &&
        s.id !== 'disableAnimationsThreshold' &&
        s.id !== 'confirmResign' &&
        s.id !== 'showCapturedPieces' &&
        s.id !== 'highlightLastMoveDuration' &&
        s.id !== 'lightSquareColor' &&
        s.id !== 'darkSquareColor' &&
        s.id !== 'coordinateColorLight' &&
        s.id !== 'coordinateColorDark' &&
        s.id !== 'lastMoveHighlightColor' &&
        s.id !== 'premoveHighlightColor'
      );
      
      const orderedSettings = [];
      // Add settings in your preferred order
      if (pieceSet) orderedSettings.push(pieceSet);
      if (showCoordinates) orderedSettings.push(showCoordinates);
      if (animateMoves) orderedSettings.push(animateMoves);
      if (animationDuration) orderedSettings.push(animationDuration);
      if (showLegalMoves) orderedSettings.push(showLegalMoves);
      if (disableAnimationsThreshold) orderedSettings.push(disableAnimationsThreshold);
      if (confirmResign) orderedSettings.push(confirmResign);
      if (showCapturedPieces) orderedSettings.push(showCapturedPieces);
      if (highlightLastMoveDuration) orderedSettings.push(highlightLastMoveDuration);
      if (lightSquareColor) orderedSettings.push(lightSquareColor);
      if (darkSquareColor) orderedSettings.push(darkSquareColor);
      if (coordinateColorLight) orderedSettings.push(coordinateColorLight);
      if (coordinateColorDark) orderedSettings.push(coordinateColorDark);
      if (lastMoveHighlightColor) orderedSettings.push(lastMoveHighlightColor);
      if (premoveHighlightColor) orderedSettings.push(premoveHighlightColor);
      
      // Add any remaining settings
      orderedSettings.push(...otherSettings.sort((a, b) => a.label.localeCompare(b.label)));
      
      return orderedSettings;
    }
    
    // Special sorting for clock category
    if (categoryId === 'clock') {
      const disableAnimationLowTime = settings.find(s => s.id === 'disableAnimationLowTime');
      const clockFontFamily = settings.find(s => s.id === 'clockFontFamily');
      const clockFontSize = settings.find(s => s.id === 'clockFontSize');
      const clockFontWeight = settings.find(s => s.id === 'clockFontWeight');
      const lowTimeThreshold = settings.find(s => s.id === 'lowTimeThreshold');
      const showMillisecondsUnder = settings.find(s => s.id === 'showMillisecondsUnder');
      const clockColorTicking = settings.find(s => s.id === 'clockColorTicking');
      const clockColorNotTicking = settings.find(s => s.id === 'clockColorNotTicking');
      const clockColorLowTime = settings.find(s => s.id === 'clockColorLowTime');
      const clockBackgroundTicking = settings.find(s => s.id === 'clockBackgroundTicking');
      const clockBackgroundNotTicking = settings.find(s => s.id === 'clockBackgroundNotTicking');
      const clockBackgroundLowTime = settings.find(s => s.id === 'clockBackgroundLowTime');
      
      const otherSettings = settings.filter(s => 
        s.id !== 'disableAnimationLowTime' &&
        s.id !== 'clockFontFamily' &&
        s.id !== 'clockFontSize' &&
        s.id !== 'clockFontWeight' &&
        s.id !== 'lowTimeThreshold' &&
        s.id !== 'showMillisecondsUnder' &&
        s.id !== 'clockColorTicking' &&
        s.id !== 'clockColorNotTicking' &&
        s.id !== 'clockColorLowTime' &&
        s.id !== 'clockBackgroundTicking' &&
        s.id !== 'clockBackgroundNotTicking' &&
        s.id !== 'clockBackgroundLowTime'
      );
      
      const orderedSettings = [];
      // Add settings in your preferred order
      if (disableAnimationLowTime) orderedSettings.push(disableAnimationLowTime);
      if (clockFontFamily) orderedSettings.push(clockFontFamily);
      if (clockFontSize) orderedSettings.push(clockFontSize);
      if (clockFontWeight) orderedSettings.push(clockFontWeight);
      if (lowTimeThreshold) orderedSettings.push(lowTimeThreshold);
      if (showMillisecondsUnder) orderedSettings.push(showMillisecondsUnder);
      if (clockColorTicking) orderedSettings.push(clockColorTicking);
      if (clockColorNotTicking) orderedSettings.push(clockColorNotTicking);
      if (clockColorLowTime) orderedSettings.push(clockColorLowTime);
      if (clockBackgroundTicking) orderedSettings.push(clockBackgroundTicking);
      if (clockBackgroundNotTicking) orderedSettings.push(clockBackgroundNotTicking);
      if (clockBackgroundLowTime) orderedSettings.push(clockBackgroundLowTime);
      
      // Add any remaining settings
      orderedSettings.push(...otherSettings.sort((a, b) => a.label.localeCompare(b.label)));
      
      return orderedSettings;
    }
    
    // Special sorting for chat category
    if (categoryId === 'chat') {
      const chatFontSize = settings.find(s => s.id === 'chatFontSize');
      const showTimestamps = settings.find(s => s.id === 'showTimestamps');
      const highlightMentions = settings.find(s => s.id === 'highlightMentions');
      const openChannelsInTabs = settings.find(s => s.id === 'openChannelsInTabs');
      const openTellsInTabs = settings.find(s => s.id === 'openTellsInTabs');
      const consoleFontFamily = settings.find(s => s.id === 'consoleFontFamily');
      const consoleFontStyle = settings.find(s => s.id === 'consoleFontStyle');
      const channelTellColorLight = settings.find(s => s.id === 'channelTellColorLight');
      const directTellColorLight = settings.find(s => s.id === 'directTellColorLight');
      const channel39ColorLight = settings.find(s => s.id === 'channel39ColorLight');
      const shoutColorLight = settings.find(s => s.id === 'shoutColorLight');
      const gameNotificationColorLight = settings.find(s => s.id === 'gameNotificationColorLight');
      const channelTellColorDark = settings.find(s => s.id === 'channelTellColorDark');
      const directTellColorDark = settings.find(s => s.id === 'directTellColorDark');
      const channel39ColorDark = settings.find(s => s.id === 'channel39ColorDark');
      const shoutColorDark = settings.find(s => s.id === 'shoutColorDark');
      const gameNotificationColorDark = settings.find(s => s.id === 'gameNotificationColorDark');
      
      const otherSettings = settings.filter(s => 
        s.id !== 'chatFontSize' &&
        s.id !== 'showTimestamps' &&
        s.id !== 'highlightMentions' &&
        s.id !== 'openChannelsInTabs' &&
        s.id !== 'openTellsInTabs' &&
        s.id !== 'consoleFontFamily' &&
        s.id !== 'consoleFontStyle' &&
        s.id !== 'channelTellColorLight' &&
        s.id !== 'directTellColorLight' &&
        s.id !== 'channel39ColorLight' &&
        s.id !== 'shoutColorLight' &&
        s.id !== 'gameNotificationColorLight' &&
        s.id !== 'channelTellColorDark' &&
        s.id !== 'directTellColorDark' &&
        s.id !== 'channel39ColorDark' &&
        s.id !== 'shoutColorDark' &&
        s.id !== 'gameNotificationColorDark'
      );
      
      const orderedSettings = [];
      // Add settings in your preferred order
      if (chatFontSize) orderedSettings.push(chatFontSize);
      if (showTimestamps) orderedSettings.push(showTimestamps);
      if (highlightMentions) orderedSettings.push(highlightMentions);
      if (openChannelsInTabs) orderedSettings.push(openChannelsInTabs);
      if (openTellsInTabs) orderedSettings.push(openTellsInTabs);
      if (consoleFontFamily) orderedSettings.push(consoleFontFamily);
      if (consoleFontStyle) orderedSettings.push(consoleFontStyle);
      if (channelTellColorLight) orderedSettings.push(channelTellColorLight);
      if (directTellColorLight) orderedSettings.push(directTellColorLight);
      if (channel39ColorLight) orderedSettings.push(channel39ColorLight);
      if (shoutColorLight) orderedSettings.push(shoutColorLight);
      if (gameNotificationColorLight) orderedSettings.push(gameNotificationColorLight);
      if (channelTellColorDark) orderedSettings.push(channelTellColorDark);
      if (directTellColorDark) orderedSettings.push(directTellColorDark);
      if (channel39ColorDark) orderedSettings.push(channel39ColorDark);
      if (shoutColorDark) orderedSettings.push(shoutColorDark);
      if (gameNotificationColorDark) orderedSettings.push(gameNotificationColorDark);
      
      // Add any remaining settings
      orderedSettings.push(...otherSettings.sort((a, b) => a.label.localeCompare(b.label)));
      
      return orderedSettings;
    }
    
    // Special sorting for sounds category
    if (categoryId === 'sounds') {
      const enableSounds = settings.find(s => s.id === 'enableSounds');
      const moveSoundFile = settings.find(s => s.id === 'moveSoundFile');
      const captureSoundFile = settings.find(s => s.id === 'captureSoundFile');
      const checkSoundFile = settings.find(s => s.id === 'checkSoundFile');
      const gameStartSoundFile = settings.find(s => s.id === 'gameStartSoundFile');
      const gameEndSoundFile = settings.find(s => s.id === 'gameEndSoundFile');
      const illegalMoveSoundFile = settings.find(s => s.id === 'illegalMoveSoundFile');
      const challengeSoundFile = settings.find(s => s.id === 'challengeSoundFile');
      
      const otherSettings = settings.filter(s => 
        s.id !== 'enableSounds' &&
        s.id !== 'moveSoundFile' &&
        s.id !== 'captureSoundFile' &&
        s.id !== 'checkSoundFile' &&
        s.id !== 'gameStartSoundFile' &&
        s.id !== 'gameEndSoundFile' &&
        s.id !== 'illegalMoveSoundFile' &&
        s.id !== 'challengeSoundFile'
      );
      
      const orderedSettings = [];
      // Add settings in your preferred order
      if (enableSounds) orderedSettings.push(enableSounds);
      if (moveSoundFile) orderedSettings.push(moveSoundFile);
      if (captureSoundFile) orderedSettings.push(captureSoundFile);
      if (checkSoundFile) orderedSettings.push(checkSoundFile);
      if (gameStartSoundFile) orderedSettings.push(gameStartSoundFile);
      if (gameEndSoundFile) orderedSettings.push(gameEndSoundFile);
      if (illegalMoveSoundFile) orderedSettings.push(illegalMoveSoundFile);
      if (challengeSoundFile) orderedSettings.push(challengeSoundFile);
      
      // Add any remaining settings
      orderedSettings.push(...otherSettings.sort((a, b) => a.label.localeCompare(b.label)));
      
      return orderedSettings;
    }
    
    // Special sorting for advanced category
    if (categoryId === 'advanced') {
      const postLoginCommands = settings.find(s => s.id === 'postLoginCommands');
      const engineDepth = settings.find(s => s.id === 'engineDepth');
      const playerContextCommands = settings.find(s => s.id === 'playerContextCommands');
      
      const otherSettings = settings.filter(s => 
        s.id !== 'postLoginCommands' &&
        s.id !== 'engineDepth' &&
        s.id !== 'playerContextCommands'
      );
      
      const orderedSettings = [];
      // Add settings in your preferred order
      if (postLoginCommands) orderedSettings.push(postLoginCommands);
      if (engineDepth) orderedSettings.push(engineDepth);
      if (playerContextCommands) orderedSettings.push(playerContextCommands);
      
      // Add any remaining settings
      orderedSettings.push(...otherSettings.sort((a, b) => a.label.localeCompare(b.label)));
      
      return orderedSettings;
    }
    
    // Default: return settings in registration order (no sorting)
    return settings;
  }

  getByElement(element: Element): SettingDefinition[] {
    const matchedSettings = new Set<string>();

    // Check all registered selectors
    this.elementMappings.forEach((settingIds, selector) => {
      if (element.matches(selector)) {
        settingIds.forEach(id => matchedSettings.add(id));
      }
    });

    // Also check parent elements for inherited settings
    let parent = element.parentElement;
    while (parent && matchedSettings.size < 10) { // Limit traversal
      this.elementMappings.forEach((settingIds, selector) => {
        if (parent!.matches(selector)) {
          settingIds.forEach(id => matchedSettings.add(id));
        }
      });
      parent = parent.parentElement;
    }

    return Array.from(matchedSettings)
      .map(id => this.settings.get(id))
      .filter((setting): setting is SettingDefinition => setting !== undefined);
  }

  search(query: string): SettingDefinition[] {
    const lowerQuery = query.toLowerCase();
    const results: Array<{setting: SettingDefinition; score: number}> = [];

    this.settings.forEach(setting => {
      let score = 0;

      // Exact match in label
      if (setting.label.toLowerCase() === lowerQuery) score += 100;
      // Partial match in label
      else if (setting.label.toLowerCase().includes(lowerQuery)) score += 50;
      
      // Match in description
      if (setting.description?.toLowerCase().includes(lowerQuery)) score += 30;
      
      // Match in keywords
      if (setting.keywords?.some(k => k.toLowerCase().includes(lowerQuery))) score += 20;
      
      // Match in category
      const category = this.categories.get(setting.category);
      if (category?.label.toLowerCase().includes(lowerQuery)) score += 10;

      if (score > 0) {
        results.push({ setting, score });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .map(r => r.setting);
  }

  getAllCategories(): SettingCategory[] {
    return Array.from(this.categories.values())
      .sort((a, b) => a.order - b.order);
  }

  getAllSettings(): SettingDefinition[] {
    return Array.from(this.settings.values());
  }

  // Preview functionality
  startPreview(settingId: string, value: any) {
    const setting = this.settings.get(settingId);
    if (!setting) return;

    // Store original value if not already previewing
    if (!this.previewState.originalValues.has(settingId)) {
      this.previewState.originalValues.set(settingId, setting.value);
    }

    // Apply preview value
    this.previewState.previewValues.set(settingId, value);
    this.previewState.isActive = true;

    // Clear existing timeout
    if (this.previewState.timeout) {
      clearTimeout(this.previewState.timeout);
    }

    // Set auto-revert timeout (5 seconds)
    this.previewState.timeout = setTimeout(() => {
      this.cancelPreview();
    }, 5000);
  }

  applyPreview() {
    // Apply all preview values as permanent
    this.previewState.previewValues.forEach((value, settingId) => {
      const setting = this.settings.get(settingId);
      if (setting) {
        setting.value = value;
        setting.onChange?.(value);
      }
    });

    this.clearPreviewState();
  }

  cancelPreview() {
    // Revert to original values
    this.previewState.originalValues.forEach((value, settingId) => {
      const setting = this.settings.get(settingId);
      if (setting) {
        setting.value = value;
        setting.onChange?.(value);
      }
    });

    this.clearPreviewState();
  }

  private clearPreviewState() {
    this.previewState.isActive = false;
    this.previewState.originalValues.clear();
    this.previewState.previewValues.clear();
    if (this.previewState.timeout) {
      clearTimeout(this.previewState.timeout);
      this.previewState.timeout = null;
    }
  }

  // Export/Import functionality
  exportSettings(): import('../types/Settings.types').SettingsExport {
    const settings: Record<string, any> = {};
    
    this.settings.forEach((setting, id) => {
      settings[id] = setting.value;
    });

    return {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      appVersion: '2.0.0', // TODO: Get from package.json
      settings
    };
  }

  importSettings(data: import('../types/Settings.types').SettingsExport): { success: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate version compatibility
    if (data.version !== '1.0.0') {
      errors.push(`Unsupported settings version: ${data.version}`);
    }

    // Apply settings
    Object.entries(data.settings).forEach(([id, value]) => {
      const setting = this.settings.get(id);
      if (setting) {
        // Validate the value
        if (setting.validate) {
          const result = setting.validate(value);
          if (typeof result === 'string') {
            errors.push(`${setting.label}: ${result}`);
            return;
          } else if (!result) {
            errors.push(`Invalid value for ${setting.label}`);
            return;
          }
        }

        setting.value = value;
        setting.onChange?.(value);
      }
    });

    return {
      success: errors.length === 0,
      errors
    };
  }

  private loadCustomSounds() {
    // Only load custom sounds in browser environment
    if (typeof window === 'undefined' || !window.localStorage) return;

    try {
      const customSounds = JSON.parse(localStorage.getItem('customSounds') || '{}');
      
      // Add custom sounds to sound file settings
      const soundSettingIds = [
        'moveSoundFile',
        'captureSoundFile', 
        'checkSoundFile',
        'gameStartSoundFile',
        'gameEndSoundFile',
        'illegalMoveSoundFile',
        'challengeSoundFile'
      ];

      soundSettingIds.forEach(settingId => {
        const setting = this.settings.get(settingId);
        if (setting && setting.options) {
          // Add custom sound options for this setting
          Object.entries(customSounds).forEach(([key, sound]: [string, any]) => {
            if (sound.settingId === settingId) {
              const customOption = { 
                label: `Custom: ${sound.fileName}`, 
                value: key 
              };
              // Only add if not already in options
              if (!setting.options!.some(opt => opt.value === key)) {
                setting.options!.push(customOption);
              }
            }
          });
        }
      });
    } catch (e) {
      console.error('Failed to load custom sounds:', e);
    }
  }
}
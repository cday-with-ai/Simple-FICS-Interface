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
  }

  private initializeCategories() {
    const categories: SettingCategory[] = [
      { id: 'appearance', label: 'Appearance', icon: '🎨', order: 1 },
      { id: 'board', label: 'Board & Pieces', icon: '♟️', order: 2 },
      { id: 'gameplay', label: 'Gameplay', icon: '🎮', order: 3 },
      { id: 'chat', label: 'Chat & Messages', icon: '💬', order: 4 },
      { id: 'sounds', label: 'Sounds', icon: '🔊', order: 5 },
      { id: 'performance', label: 'Performance', icon: '⚡', order: 6 },
      { id: 'advanced', label: 'Advanced', icon: '🔧', order: 7 }
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));
  }

  private registerDefaultSettings() {
    // Board & Pieces
    this.register({
      id: 'boardTheme',
      category: 'board',
      label: 'Board Theme',
      description: 'Choose the visual style of the chess board',
      type: 'select',
      value: 'brown',
      defaultValue: 'brown',
      options: [
        { label: 'Brown', value: 'brown' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Purple', value: 'purple' }
      ],
      targetElements: ['.chess-board', '[data-board]'],
      keywords: ['theme', 'color', 'style'],
      previewType: 'instant'
    });

    this.register({
      id: 'pieceSet',
      category: 'board',
      label: 'Piece Set',
      description: 'Choose the chess piece graphics style',
      type: 'select',
      value: 'standard',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Modern', value: 'modern' },
        { label: 'Classic', value: 'classic' }
      ],
      targetElements: ['.chess-piece', '[data-piece]'],
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
      targetElements: ['.board-coordinate', '[data-coordinate]'],
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
      targetElements: ['.chess-piece'],
      keywords: ['animation', 'movement', 'smooth'],
      previewType: 'instant'
    });

    this.register({
      id: 'animationDuration',
      category: 'board',
      label: 'Animation Speed',
      description: 'How fast pieces move',
      type: 'number',
      value: 250,
      defaultValue: 250,
      min: 0,
      max: 1000,
      step: 50,
      unit: 'ms',
      dependencies: ['animateMoves'],
      targetElements: ['.chess-piece'],
      keywords: ['speed', 'duration', 'fast', 'slow'],
      previewType: 'instant'
    });

    // Appearance
    this.register({
      id: 'theme',
      category: 'appearance',
      label: 'Theme',
      description: 'Choose between light, dark, or system theme',
      type: 'select',
      value: 'system',
      defaultValue: 'system',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'system' }
      ],
      targetElements: ['body', ':root'],
      keywords: ['dark mode', 'light mode', 'colors'],
      previewType: 'instant'
    });

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
      targetElements: ['.chat-message', '[data-chat-message]'],
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
      targetElements: [],
      keywords: ['audio', 'mute', 'volume'],
      previewType: 'apply'
    });

    this.register({
      id: 'moveSound',
      category: 'sounds',
      label: 'Move Sound',
      description: 'Play sound when pieces move',
      type: 'boolean',
      value: true,
      defaultValue: true,
      dependencies: ['enableSounds'],
      targetElements: [],
      keywords: ['audio', 'effects'],
      previewType: 'test'
    });

    this.register({
      id: 'captureSound',
      category: 'sounds',
      label: 'Capture Sound',
      description: 'Play sound when pieces are captured',
      type: 'boolean',
      value: true,
      defaultValue: true,
      dependencies: ['enableSounds'],
      targetElements: [],
      keywords: ['audio', 'effects', 'capture'],
      previewType: 'test'
    });

    this.register({
      id: 'checkSound',
      category: 'sounds',
      label: 'Check Sound',
      description: 'Play sound when king is in check',
      type: 'boolean',
      value: true,
      defaultValue: true,
      dependencies: ['enableSounds'],
      targetElements: [],
      keywords: ['audio', 'effects', 'check'],
      previewType: 'test'
    });

    // Board preferences
    this.register({
      id: 'boardFlipped',
      category: 'board',
      label: 'Flip Board',
      description: 'View board from black\'s perspective',
      type: 'boolean',
      value: false,
      defaultValue: false,
      targetElements: ['.chess-board'],
      keywords: ['flip', 'rotate', 'perspective', 'orientation'],
      previewType: 'instant'
    });

    this.register({
      id: 'showLegalMoves',
      category: 'board',
      label: 'Show Legal Moves',
      description: 'Highlight possible moves when selecting a piece',
      type: 'boolean',
      value: true,
      defaultValue: true,
      targetElements: ['.chess-board'],
      keywords: ['hints', 'possible', 'valid'],
      previewType: 'instant'
    });

    this.register({
      id: 'disableAnimationLowTime',
      category: 'board',
      label: 'Disable Animations When Low on Time',
      description: 'Turn off piece animations when under 10 seconds',
      type: 'boolean',
      value: true,
      defaultValue: true,
      dependencies: ['animateMoves'],
      targetElements: ['.chess-piece'],
      keywords: ['performance', 'time', 'speed'],
      previewType: 'apply'
    });

    this.register({
      id: 'autoPromoteToQueen',
      category: 'gameplay',
      label: 'Auto-Promote to Queen',
      description: 'Automatically promote pawns to queen',
      type: 'boolean',
      value: false,
      defaultValue: false,
      targetElements: [],
      keywords: ['promotion', 'pawn', 'queen'],
      previewType: 'apply'
    });

    this.register({
      id: 'autoPromotionPiece',
      category: 'gameplay',
      label: 'Auto-Promotion Piece',
      description: 'Which piece to auto-promote to',
      type: 'select',
      value: 'Q',
      defaultValue: 'Q',
      options: [
        { label: 'Queen', value: 'Q' },
        { label: 'Rook', value: 'R' },
        { label: 'Bishop', value: 'B' },
        { label: 'Knight', value: 'N' }
      ],
      dependencies: ['autoPromoteToQueen'],
      targetElements: [],
      keywords: ['promotion', 'pawn'],
      previewType: 'apply'
    });

    // View preferences
    this.register({
      id: 'viewMode',
      category: 'appearance',
      label: 'View Mode',
      description: 'Layout for chess and chat areas',
      type: 'select',
      value: 'chess-and-chat',
      defaultValue: 'chess-and-chat',
      options: [
        { label: 'Chess Only', value: 'chess-only' },
        { label: 'Chat Only', value: 'chat-only' },
        { label: 'Chess and Chat', value: 'chess-and-chat' }
      ],
      targetElements: ['body'],
      keywords: ['layout', 'view', 'mode'],
      previewType: 'instant'
    });

    this.register({
      id: 'chessOrientation',
      category: 'appearance',
      label: 'Chess Orientation',
      description: 'Portrait or landscape layout for chess area',
      type: 'select',
      value: 'landscape',
      defaultValue: 'landscape',
      options: [
        { label: 'Landscape', value: 'landscape' },
        { label: 'Portrait', value: 'portrait' }
      ],
      targetElements: ['.chess-game-layout'],
      keywords: ['orientation', 'layout', 'portrait', 'landscape'],
      previewType: 'instant'
    });

    this.register({
      id: 'showCapturedPieces',
      category: 'board',
      label: 'Show Captured Pieces',
      description: 'Display captured pieces beside the board',
      type: 'boolean',
      value: false,
      defaultValue: false,
      targetElements: ['.captured-pieces'],
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
      targetElements: ['.chat-message'],
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
      targetElements: ['.chat-message'],
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
      targetElements: ['.chat-tabs'],
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
      targetElements: ['.chat-tabs'],
      keywords: ['tell', 'private', 'message', 'tab'],
      previewType: 'apply'
    });

    // Gameplay preferences
    this.register({
      id: 'autoAcceptRematch',
      category: 'gameplay',
      label: 'Auto-Accept Rematch',
      description: 'Automatically accept rematch offers',
      type: 'boolean',
      value: false,
      defaultValue: false,
      targetElements: [],
      keywords: ['rematch', 'auto', 'accept'],
      previewType: 'apply'
    });

    this.register({
      id: 'confirmResign',
      category: 'gameplay',
      label: 'Confirm Resign',
      description: 'Show confirmation dialog before resigning',
      type: 'boolean',
      value: true,
      defaultValue: true,
      targetElements: ['.resign-button'],
      keywords: ['resign', 'confirm', 'safety'],
      previewType: 'apply'
    });

    this.register({
      id: 'defaultTimeControl',
      category: 'gameplay',
      label: 'Default Time Control',
      description: 'Default time control for seeks',
      type: 'text',
      value: '15 0',
      defaultValue: '15 0',
      targetElements: [],
      keywords: ['time', 'control', 'seek', 'default'],
      previewType: 'apply'
    });

    // Analysis preferences
    this.register({
      id: 'autoAnalyze',
      category: 'gameplay',
      label: 'Auto-Analyze',
      description: 'Automatically start analysis after game',
      type: 'boolean',
      value: false,
      defaultValue: false,
      targetElements: [],
      keywords: ['analysis', 'stockfish', 'engine'],
      previewType: 'apply'
    });

    this.register({
      id: 'engineDepth',
      category: 'gameplay',
      label: 'Engine Depth',
      description: 'Analysis depth for chess engine',
      type: 'number',
      value: 20,
      defaultValue: 20,
      min: 1,
      max: 50,
      step: 1,
      targetElements: [],
      keywords: ['depth', 'analysis', 'stockfish'],
      previewType: 'apply'
    });

    this.register({
      id: 'showEvaluation',
      category: 'gameplay',
      label: 'Show Evaluation',
      description: 'Display position evaluation',
      type: 'boolean',
      value: true,
      defaultValue: true,
      targetElements: ['.evaluation-bar'],
      keywords: ['eval', 'score', 'analysis'],
      previewType: 'instant'
    });

    // Advanced settings
    this.register({
      id: 'postLoginCommands',
      category: 'advanced',
      label: 'Post-Login Commands',
      description: 'Commands to send after logging into FICS',
      type: 'text',
      value: 'set style 12\nset prompt\nset bell off\nset interface Simple FICS Interface',
      defaultValue: 'set style 12\nset prompt\nset bell off\nset interface Simple FICS Interface',
      targetElements: [],
      keywords: ['login', 'commands', 'fics', 'startup'],
      previewType: 'apply'
    });

    // Layout preference
    this.register({
      id: 'layout',
      category: 'appearance',
      label: 'Layout Mode',
      description: 'Force specific layout or auto-detect',
      type: 'select',
      value: 'auto',
      defaultValue: 'auto',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Landscape', value: 'landscape' },
        { label: 'Portrait', value: 'portrait' }
      ],
      targetElements: ['body'],
      keywords: ['layout', 'responsive', 'auto'],
      previewType: 'instant'
    });

    // Auto view mode
    this.register({
      id: 'autoViewMode',
      category: 'appearance',
      label: 'Auto View Mode',
      description: 'Automatically select view mode based on screen size',
      type: 'boolean',
      value: true,
      defaultValue: true,
      targetElements: [],
      keywords: ['auto', 'responsive', 'view'],
      previewType: 'apply'
    });

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
      targetElements: ['.chess-board'],
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
      targetElements: ['.chess-board'],
      keywords: ['premove', 'color', 'highlight'],
      previewType: 'instant'
    });

    this.register({
      id: 'checkIndicatorStyle',
      category: 'board',
      label: 'Check Indicator Style',
      description: 'How to show when king is in check',
      type: 'select',
      value: 'border',
      defaultValue: 'border',
      options: [
        { label: 'Border', value: 'border' },
        { label: 'Glow', value: 'glow' },
        { label: 'King Highlight', value: 'king-highlight' },
        { label: 'None', value: 'none' }
      ],
      targetElements: ['.chess-board'],
      keywords: ['check', 'indicator', 'king'],
      previewType: 'instant'
    });

    // Clock settings from design doc
    this.register({
      id: 'clockPosition',
      category: 'board',
      label: 'Clock Position',
      description: 'Where to display player clocks',
      type: 'select',
      value: 'sides',
      defaultValue: 'sides',
      options: [
        { label: 'Sides', value: 'sides' },
        { label: 'Top/Bottom', value: 'top-bottom' },
        { label: 'Bottom Only', value: 'bottom' }
      ],
      targetElements: ['.player-clock'],
      keywords: ['clock', 'position', 'time'],
      previewType: 'instant'
    });

    this.register({
      id: 'lowTimeThreshold',
      category: 'gameplay',
      label: 'Low Time Warning',
      description: 'Show warning when time drops below (seconds)',
      type: 'number',
      value: 30,
      defaultValue: 30,
      min: 5,
      max: 60,
      step: 5,
      unit: 's',
      targetElements: ['.player-clock'],
      keywords: ['time', 'warning', 'threshold'],
      previewType: 'apply'
    });

    this.register({
      id: 'showMillisecondsUnder',
      category: 'board',
      label: 'Show Milliseconds Under',
      description: 'Show tenths of seconds when time is below (seconds)',
      type: 'number',
      value: 10,
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 5,
      unit: 's',
      targetElements: ['.player-clock'],
      keywords: ['milliseconds', 'time', 'precision'],
      previewType: 'instant'
    });

    // Player context menu commands
    this.register({
      id: 'playerContextCommands',
      category: 'advanced',
      label: 'Player Context Commands',
      description: 'Commands shown when clicking on player names',
      type: 'text', // TODO: Should be a custom editor
      value: JSON.stringify([
        { label: 'Finger', command: 'finger {player}' },
        { label: 'History', command: 'hi {player}' },
        { label: 'Variables', command: 'vars {player}' },
        { divider: true },
        { label: 'Censor', command: '+censor {player}' },
        { label: 'No Play', command: '+noplay {player}' }
      ]),
      defaultValue: JSON.stringify([
        { label: 'Finger', command: 'finger {player}' },
        { label: 'History', command: 'hi {player}' },
        { label: 'Variables', command: 'vars {player}' },
        { divider: true },
        { label: 'Censor', command: '+censor {player}' },
        { label: 'No Play', command: '+noplay {player}' }
      ]),
      targetElements: ['.player-name'],
      keywords: ['context', 'menu', 'player', 'commands'],
      previewType: 'apply'
    });

    // TODO: Console colors and fonts need special handling
    // as they're complex objects with light/dark themes
    // For now, adding a placeholder
    this.register({
      id: 'consoleTheme',
      category: 'chat',
      label: 'Console Theme',
      description: 'Color scheme for FICS console output',
      type: 'select',
      value: 'default',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'High Contrast', value: 'high-contrast' },
        { label: 'Colorful', value: 'colorful' },
        { label: 'Minimal', value: 'minimal' }
      ],
      targetElements: ['.console-output'],
      keywords: ['console', 'colors', 'theme'],
      previewType: 'instant'
    });
  }

  register(setting: SettingDefinition) {
    this.settings.set(setting.id, setting);
    
    // Register element mappings
    if (setting.targetElements) {
      setting.targetElements.forEach(selector => {
        const existing = this.elementMappings.get(selector) || [];
        this.elementMappings.set(selector, [...existing, setting.id]);
      });
    }
  }

  get(id: string): SettingDefinition | undefined {
    return this.settings.get(id);
  }

  getByCategory(categoryId: string): SettingDefinition[] {
    return Array.from(this.settings.values())
      .filter(setting => setting.category === categoryId)
      .sort((a, b) => a.label.localeCompare(b.label));
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
}
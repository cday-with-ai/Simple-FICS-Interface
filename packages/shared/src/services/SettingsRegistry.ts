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

    // Add more default settings as needed...
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
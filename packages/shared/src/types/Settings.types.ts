export type SettingType = 'boolean' | 'select' | 'number' | 'color' | 'text' | 'multiselect' | 'keybind';

export interface SettingOption {
  label: string;
  value: any;
  preview?: string; // Optional preview image/icon
}

export interface SettingDefinition {
  id: string;
  category: string;
  label: string;
  description?: string;
  type: SettingType;
  value: any;
  defaultValue: any;
  options?: SettingOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // e.g., 'ms', 'px', '%'
  dependencies?: string[]; // Other settings this depends on
  targetElements?: string[]; // CSS selectors for magic wand targeting
  keywords?: string[]; // Additional search terms
  previewType?: 'instant' | 'apply' | 'test'; // How preview works
  onChange?: (value: any) => void; // Custom change handler
  validate?: (value: any) => boolean | string; // Validation function
}

export interface SettingCategory {
  id: string;
  label: string;
  icon?: string;
  order: number;
  description?: string;
}

export interface PreviewState {
  isActive: boolean;
  originalValues: Map<string, any>;
  previewValues: Map<string, any>;
  timeout: NodeJS.Timeout | null;
}

export interface SettingsExport {
  version: string;
  exportDate: string;
  appVersion: string;
  settings: Record<string, any>;
}

// Magic wand related types
export interface MagicWandState {
  isActive: boolean;
  highlightedElement: HTMLElement | null;
  availableSettings: string[]; // Setting IDs
}

export interface QuickSettingsPosition {
  x: number;
  y: number;
  anchor: 'top' | 'bottom' | 'left' | 'right';
}
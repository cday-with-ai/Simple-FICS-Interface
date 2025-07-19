# Settings System Design Document

## Overview
A modern, intuitive settings system for Simple FICS Interface featuring:
1. **Searchable Settings Panel** - Type to find any setting instantly
2. **Magic Wand Mode** - Click any UI element to see its customization options
3. **Context-Aware Configuration** - Settings appear where they're relevant

## Core Components

### 1. Settings Architecture

```typescript
interface SettingDefinition {
  id: string;
  category: SettingCategory;
  label: string;
  description?: string;
  type: 'boolean' | 'select' | 'number' | 'color' | 'text' | 'multiselect';
  value: any;
  defaultValue: any;
  options?: Array<{label: string; value: any}>;
  min?: number;
  max?: number;
  step?: number;
  dependencies?: string[]; // Other settings this depends on
  targetElements?: string[]; // CSS selectors for magic wand targeting
  keywords?: string[]; // Additional search terms
  premium?: boolean; // Future monetization
}

interface SettingCategory {
  id: string;
  label: string;
  icon: string;
  order: number;
}
```

### 2. Settings Registry

All settings will be centrally registered:

```typescript
class SettingsRegistry {
  private settings: Map<string, SettingDefinition>;
  private categories: Map<string, SettingCategory>;
  private elementMappings: Map<string, string[]>; // element selector -> setting IDs
  
  register(setting: SettingDefinition): void;
  search(query: string): SettingDefinition[];
  getByElement(element: Element): SettingDefinition[];
  getByCategory(categoryId: string): SettingDefinition[];
}
```

### 3. Magic Wand Implementation

#### Activation
- **Keyboard**: Hold `Ctrl/Cmd + Shift` and hover
- **Touch**: Long press on mobile
- **UI Button**: Magic wand icon in header

#### Visual Feedback
```typescript
interface MagicWandHighlight {
  element: Element;
  settingIds: string[];
  boundingBox: DOMRect;
}

// When hovering with magic wand active:
1. Outline hoverable elements with subtle glow
2. Show tooltip with setting count
3. Darken non-interactive areas
4. Display cursor as wand icon
```

#### Element Mappings

| Element | Settings |
|---------|----------|
| Chess piece | pieceSet, animateMoves, animationDuration |
| Board square | boardTheme, showCoordinates, boardFlipped |
| Coordinate labels | showCoordinates, theme (for colors) |
| Clock | clockFontSize, lowTimeThreshold, theme |
| Chat message | chatFontSize, showTimestamps, channel colors |
| Channel tab | openChannelsInTabs, channel-specific colors |
| Player name | playerContextCommands, highlightMentions |
| Captured pieces | showCapturedPieces, pieceSet |
| Move list | moveListFontSize, showMoveNumbers |

### 4. Settings UI Components

#### Main Settings Dialog
```
┌─────────────────────────────────────────┐
│ ⚙️ Settings                        🔍 [Search...]│
├─────────────────────────────────────────┤
│ Categories │  Setting Details           │
│ ├─ 🎨 Appearance                       │
│ ├─ ♟️ Board & Pieces                   │
│ ├─ 🎮 Gameplay                         │
│ ├─ 💬 Chat & Messages                  │
│ ├─ 🔊 Sounds                           │
│ ├─ ⚡ Performance                      │
│ └─ 🔧 Advanced                         │
└─────────────────────────────────────────┘
```

#### Quick Settings Popover (Magic Wand)
```
┌─────────────────────┐
│ Chess Piece Settings│
├─────────────────────┤
│ Piece Set: [Modern ▼]│
│ ☑ Animate Moves     │
│ Speed: [●──────] 250ms│
│                     │
│ [More Settings...]  │
└─────────────────────┘
```

### 5. Search Implementation

```typescript
interface SearchableContent {
  settingId: string;
  searchableText: string; // Includes label, description, keywords, category
  score: number; // Relevance score
}

class SettingsSearch {
  private index: SearchableContent[];
  
  search(query: string): SearchResult[] {
    // 1. Fuzzy match against searchable text
    // 2. Boost exact matches
    // 3. Consider recent/frequently used
    // 4. Group by category
    return results.sort(byRelevance);
  }
}
```

### 6. Settings Categories

#### 🎨 Appearance
- Theme (light/dark/system)
- Board theme & colors
- Piece sets
- Font sizes
- Color customization for all message types

#### ♟️ Board & Pieces
- Show coordinates
- Board orientation
- Move animations
- Legal move indicators
- Captured pieces display

#### 🎮 Gameplay
- Auto-promotion settings
- Premove options
- Time control defaults
- Confirmation dialogs
- Analysis settings

#### 💬 Chat & Messages
- Font size & family
- Timestamps
- Channel/tell behavior
- Player highlighting
- Message filtering

#### 🔊 Sounds
- Master volume
- Individual sound toggles
- Custom sound uploads
- Volume per sound type

#### ⚡ Performance
- Animation performance
- Low-time optimizations
- Update frequencies
- Caching options

#### 🔧 Advanced
- Post-login commands
- Custom context menus
- Export/import settings
- Reset options
- Settings backup/restore

### 7. Settings Import/Export

#### File Format
```json
{
  "version": "1.0.0",
  "exportDate": "2024-01-20T10:30:00Z",
  "appVersion": "2.5.0",
  "settings": {
    "appearance": { ... },
    "board": { ... },
    "chat": { ... },
    "sounds": { ... }
  }
}
```

#### Export Features
- Download as JSON file
- Copy to clipboard option
- Include/exclude specific categories
- Automatic filename with date: `fics-settings-2024-01-20.json`
- Compress large settings (base64 encoded custom sounds)

#### Import Features
- Drag & drop JSON file onto settings dialog
- Browse and select file
- Paste from clipboard
- Preview changes before applying
- Validation with helpful error messages
- Merge or replace options
- Version compatibility checking

#### Use Cases
- Transfer settings between browsers
- Share settings with friends
- Backup before major changes
- Create and share setting presets
- Distribute team/club standard settings

### 8. Implementation Phases

#### Phase 1: Core Infrastructure
- Settings registry
- Search functionality
- Basic settings dialog
- Migrate existing preferences
- Import/export functionality

#### Phase 2: Magic Wand
- Element detection system
- Highlight overlays
- Quick settings popovers
- Touch/keyboard activation

#### Phase 3: Advanced Features
- Setting dependencies
- Preset themes
- Setting profiles
- Shareable setting URLs

### 9. Technical Considerations

#### Performance
- Lazy load setting components
- Debounce search input
- Virtual scrolling for long lists
- Memoize element mappings

#### Accessibility
- Full keyboard navigation
- Screen reader support
- High contrast mode
- Focus management

#### Mobile Adaptation
- Bottom sheet for settings
- Swipe gestures
- Simplified magic wand
- Touch-optimized controls

## Settings UI/UX Design Philosophy

### Invisible Until Needed
The settings system should be completely out of the way during normal use, appearing only when explicitly requested.

### Access Points

#### 1. **Magic Wand Mode** (Primary)
- **Activation**: Hold `Cmd/Ctrl + Shift` or click wand icon
- **Visual**: Subtle purple cursor, hoverable elements glow
- **Interaction**: Click any element to see its settings
- **Exit**: Click empty space, press Escape, or release keys

#### 2. **Command Palette** (Power Users)
- **Activation**: `Cmd/Ctrl + K` 
- **Usage**: Type to search any setting
- **Examples**:
  - "piece" → Shows piece set options
  - "font size" → Shows all font size settings
  - "theme" → Shows theme options

#### 3. **Minimal Settings Icon**
- **Location**: Bottom-right corner, semi-transparent
- **Behavior**: Only visible on hover in corner area
- **Click**: Opens full settings dialog
- **Right-click**: Recent settings

### Interface Principles

#### No Persistent UI
- No settings toolbar
- No settings sidebar  
- No permanent settings button
- Settings icon only appears on hover

#### Context-Aware Appearance
- Quick settings appear as floating cards
- Position intelligently to not cover important content
- Auto-dismiss when clicking elsewhere
- Smooth fade in/out animations

#### Progressive Disclosure
```
Click piece with magic wand →
┌─────────────────┐
│ Piece Style     │
│ [Standard ▼]    │
│                 │
│ Animation Speed │
│ [●────] 250ms   │
│                 │
│ [More...]       │
└─────────────────┘
```

#### Smart Grouping
When clicking an element, only show:
1. Most commonly changed settings (2-3 items)
2. "More..." link for advanced options
3. Related settings grouped together

### Visual Design

#### Floating Cards
```css
.quick-settings {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 16px;
  min-width: 200px;
  max-width: 320px;
}
```

#### Dark Mode Support
- Cards adapt to current theme
- Subtle transparency for depth
- High contrast for readability

### Mobile Adaptation

#### Touch-Friendly
- Long press instead of hover
- Larger tap targets (44px minimum)
- Bottom sheet for settings
- Swipe down to dismiss

#### Gesture Support
- Two-finger tap for magic wand
- Swipe from corner for settings
- Pinch for quick zoom settings

### Performance Optimizations

#### Lazy Loading
- Settings components load on-demand
- Magic wand overlay uses CSS only
- No JS execution until interaction

#### Efficient Detection
```typescript
// Use event delegation for performance
document.addEventListener('click', (e) => {
  if (!magicWandActive) return;
  
  const settingsTarget = e.target.closest('[data-settings]');
  if (settingsTarget) {
    showQuickSettings(settingsTarget);
  }
});
```

### Keyboard Navigation

#### Quick Access
- `Cmd/Ctrl + K` - Command palette
- `Cmd/Ctrl + ,` - Full settings
- `Escape` - Close any settings UI
- `Tab` - Navigate between settings

#### Magic Wand Shortcuts
- Hold modifier keys - Activate wand
- Click - Show settings
- Escape - Exit wand mode

### Discoverability

#### First-Time User Experience
1. Subtle animation on corner hover
2. Tooltip: "Settings (Ctrl+,)"
3. One-time hint for magic wand
4. Tutorial on first use

#### Learning Curve
- Consistent shortcuts across platforms
- Visual feedback for all actions
- Undo/redo for setting changes
- "Reset to default" always visible

### Preview System

#### Live Preview
Settings changes preview immediately without saving:

```typescript
interface PreviewState {
  isPreviewActive: boolean;
  originalSettings: SettingsSnapshot;
  previewSettings: SettingsSnapshot;
  timeout: NodeJS.Timeout | null;
}
```

#### Preview UI Pattern
```
┌─────────────────────────┐
│ Board Theme             │
│ [Classic ▼]             │
│                         │
│ ✓ Live Preview          │
│                         │
│ [Apply] [Cancel]        │
└─────────────────────────┘
```

#### Preview Behaviors

**Instant Preview Types:**
- Visual changes (themes, colors, fonts)
- Board appearance (piece sets, coordinates)
- UI layouts (clock position, panel sizes)
- Animation speeds (shown with demo move)

**Confirmation Required Types:**
- Sound changes (play sample, then confirm)
- Keyboard shortcuts (avoid conflicts)
- Behavioral changes (auto-accept, confirmations)
- Performance settings (may affect stability)

#### Preview Implementation

**1. Hover Preview** (for dropdowns)
```typescript
// Hovering over piece set options shows preview
onHover(pieceSet) {
  temporarilyApply(pieceSet);
  showPreviewBadge("Previewing...");
}
```

**2. Temporary Apply**
```typescript
// Changes apply to UI but not saved
const previewSetting = (key, value) => {
  // Store original
  previewState.original[key] = currentSettings[key];
  
  // Apply temporarily
  applyToUI(key, value);
  
  // Auto-revert timer
  startRevertTimer(5000);
  
  // Show preview indicator
  showPreviewMode(true);
};
```

**3. Preview Indicators**
- Subtle border around previewed elements
- "Preview Mode" badge in corner
- Countdown timer for auto-revert
- Clear Apply/Cancel buttons

#### Auto-Revert Safety
```typescript
// Automatically revert if user doesn't decide
const startRevertTimer = (ms = 5000) => {
  clearTimeout(previewTimeout);
  previewTimeout = setTimeout(() => {
    if (previewActive) {
      revertPreview();
      showNotification("Preview reverted");
    }
  }, ms);
};
```

#### Comparison Mode
For some settings, show before/after:

```
┌─────────────────────────┐
│ Piece Style Comparison  │
├─────────────┬───────────┤
│   Current   │  Preview  │
│     ♔       │    ♔     │
│  (Classic)  │ (Modern)  │
├─────────────┴───────────┤
│ [Use Modern] [Keep Classic] │
└─────────────────────────┘
```

#### Sound Preview
Special handling for audio settings:

```
┌─────────────────────────┐
│ Move Sound              │
│ [Default ▼]             │
│                         │
│ 🔊 [Test Sound]         │
│ Volume: [●────] 70%     │
│                         │
│ [Apply] [Cancel]        │
└─────────────────────────┘
```

#### Batch Preview
When changing multiple related settings:

```typescript
// Group related changes
const previewTheme = (themeName) => {
  const theme = themes[themeName];
  batchPreview({
    boardTheme: theme.board,
    pieceSet: theme.pieces,
    uiTheme: theme.ui,
    colors: theme.colors
  });
};
```

#### Mobile Preview Gestures
- Swipe left/right to preview options
- Hold to preview, release to revert
- Shake to undo last change

#### Accessibility
- Announce preview state to screen readers
- Keyboard shortcuts for apply/cancel
- Clear visual distinction between preview and saved

## Feasibility Assessment: Magic Wand Feature

### ✅ **Highly Feasible Aspects**
1. **Element Detection**: DOM traversal and element identification is straightforward
2. **Visual Feedback**: CSS overlays and highlights are well-supported
3. **Context Menus**: Existing player context menu proves the pattern works
4. **Setting Mappings**: Clear relationships between UI elements and settings

### ⚠️ **Moderate Challenges**
1. **Performance**: Need efficient element tracking to avoid lag
2. **Mobile UX**: Long-press conflicts with text selection
3. **Complex Elements**: Some UI parts have multiple overlapping settings
4. **Z-index Management**: Ensuring highlights appear correctly

### ❌ **Potential Limitations**
1. **Dynamic Content**: Chat messages that scroll off-screen
2. **Canvas Elements**: If board rendering moves to canvas
3. **Third-party Components**: Stockfish or other integrations

### 🎯 **Implementation Recommendation**
**The magic wand feature is highly feasible and would provide significant value.**

**Suggested approach:**
1. Start with static elements (board, pieces, clocks)
2. Use CSS attribute selectors for efficient targeting
3. Implement progressive enhancement (basic → advanced)
4. Add telemetry to track usage patterns

**Key Success Factors:**
- Intuitive activation (not accidentally triggered)
- Fast, responsive highlighting
- Clear visual hierarchy
- Graceful degradation on unsupported elements

## Example User Flows

### Flow 1: Change Piece Set via Magic Wand
1. User presses Ctrl+Shift
2. Hovers over chess piece → piece glows
3. Clicks → quick settings appear
4. Selects new piece set → instant preview
5. Confirms or explores more settings

### Flow 2: Find Setting via Search
1. User opens settings (Ctrl+,)
2. Types "coordinates"
3. Sees "Show Coordinates" highlighted
4. Toggles setting
5. Board updates immediately

### Flow 3: Customize Channel Colors
1. User activates magic wand
2. Clicks on channel 39 message
3. Sees color picker and font options
4. Adjusts to preference
5. All channel 39 messages update

## Monetization Opportunities
- Premium piece sets
- Custom themes marketplace
- Advanced color customization
- Setting sync across devices
- Preset packs (GM themes, streamer themes)

## Additional Preferences to Consider

### Board & Pieces
- **Piece drag preview opacity** (0-100%)
- **Highlight last move duration** (always/3s/5s/never)
- **Premove highlighting color**
- **Check indicator style** (border/glow/king-highlight/none)
- **Coordinates on/off** (inside/outside/none)

### Clock & Time
- **Clock position** (top/bottom/sides)
- **Clock style** (digital/analog/both)
- **Low time warning threshold** (customizable, not hardcoded 30s)
- **Clock flash on move** (on/off)
- **Show milliseconds under X seconds**
- **Time format** (mm:ss, h:mm:ss, etc.)

### Game Analysis
- **Analysis arrow thickness**
- **Evaluation bar width**
- **Positive/negative score colors**

### Sounds
- **All sounds are overridable. Should list each one.**

## Success Metrics
- Setting discovery rate
- Time to find specific setting
- Magic wand usage frequency
- Setting completion rate
- User satisfaction scores

## Conclusion
This settings system would position Simple FICS Interface as the most customizable and user-friendly chess client available. The magic wand feature, while requiring careful implementation, would be a unique differentiator that makes customization intuitive and enjoyable.
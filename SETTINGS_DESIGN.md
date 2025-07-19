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

### 7. Implementation Phases

#### Phase 1: Core Infrastructure
- Settings registry
- Search functionality
- Basic settings dialog
- Migrate existing preferences

#### Phase 2: Magic Wand
- Element detection system
- Highlight overlays
- Quick settings popovers
- Touch/keyboard activation

#### Phase 3: Advanced Features
- Setting dependencies
- Preset themes
- Cloud sync
- Setting profiles

### 8. Technical Considerations

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

## Success Metrics
- Setting discovery rate
- Time to find specific setting
- Magic wand usage frequency
- Setting completion rate
- User satisfaction scores

## Conclusion
This settings system would position Simple FICS Interface as the most customizable and user-friendly chess client available. The magic wand feature, while requiring careful implementation, would be a unique differentiator that makes customization intuitive and enjoyable.
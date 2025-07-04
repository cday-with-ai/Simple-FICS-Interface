# Responsive UI Design & Implementation Plan

## Overview

Implement responsive design with orientation-aware layouts, comprehensive theming system, and device size support for
the chess interface.

## UPDATE: NativeWind Refactoring Strategy

This section outlines the migration from current CSS files (`css/chess.css` and `css/chat.css`) to NativeWind for cross-platform theme sharing between web and mobile.

### Current CSS Analysis

**Existing Files:**
- `css/chess.css`: Board layout, chess fonts, clocks, material display
- `css/chat.css`: Layout, view toggles, tabs, chat interface
- Both loaded via `index.html` for the vanilla JS app

### Board Sizing Algorithm

```typescript
// Calculate maximum board size for current viewport and orientation
function calculateBoardSize(viewport: Viewport, orientation: 'landscape' | 'portrait') {
  const { width, height } = viewport;
  
  if (orientation === 'landscape') {
    // Landscape: Board on left, controls on right
    const controlsWidth = 300; // Fixed width for controls section
    const padding = 40; // Padding around board
    const headerHeight = 50; // Top toolbar height
    const gameInfoHeight = 40; // Game info above board
    const moveInfoHeight = 30; // Opening info below board
    
    const maxBoardWidth = width - controlsWidth - (padding * 2);
    const maxBoardHeight = height - headerHeight - gameInfoHeight - moveInfoHeight - (padding * 2);
    
    // Board size is minimum of available width/height to maintain square
    return Math.min(maxBoardWidth, maxBoardHeight);
  } else {
    // Portrait: Board centered, controls above/below
    const padding = 20; // Less padding on mobile
    const headerHeight = 50; // Top toolbar
    const playerInfoHeight = 60; // Player name + clock above
    const controlsHeight = 200; // Analysis buttons + move list below
    const gameInfoHeight = 30; // Compact game info
    const moveInfoHeight = 25; // Compact opening info
    
    const maxBoardWidth = width - (padding * 2);
    const maxBoardHeight = height - headerHeight - (playerInfoHeight * 2) - 
                          controlsHeight - gameInfoHeight - moveInfoHeight - (padding * 2);
    
    // Board size is minimum of available width/height
    return Math.min(maxBoardWidth, maxBoardHeight);
  }
}

// Ensure squares are always the same size
function calculateSquareSize(boardSize: number): number {
  return Math.floor(boardSize / 8); // Integer division for pixel-perfect squares
}
```

### NativeWind Architecture

#### 1. Shared Theme Configuration
```
packages/shared/theme/
├── tailwind.config.js      # Shared Tailwind/NativeWind config
├── colors.ts               # Design tokens for colors
├── spacing.ts              # Standardized spacing scale  
├── typography.ts           # Font families and sizes
└── index.ts                # Theme exports
```

#### 2. Platform Implementation
```
packages/web/
├── tailwind.config.js      # Extends shared, web-specific
└── src/styles/
    └── globals.css         # Web fonts, resets

packages/mobile/
├── tailwind.config.js      # Extends shared, RN-specific
└── src/theme/
    └── fonts.ts            # Native font loading
```

### Migration Strategy

#### Phase 1: Extract Design Tokens
From current CSS to shared tokens:
- `#ecebe9` → `bg-chess-surface`
- Digital font → `font-digital`
- Spacing values → Tailwind scale (4, 8, 16, 24, 32)

#### Phase 2: Component Class Mapping

| CSS Class | NativeWind | Shared? | Notes |
|-----------|------------|---------|-------|
| `.board-container` | `flex flex-row items-center` | ✅ | Direct mapping |
| `.chat-tab` | `px-4 py-2 rounded-t-lg` | ✅ | Same syntax |
| `.digital-clock` | `font-digital text-2xl` | ✅ | Custom font |
| `box-shadow` | `shadow-md` | ⚠️ | Different rendering |
| `:hover` | `hover:bg-gray-100` (web only) | ❌ | Use Pressable on RN |

#### Phase 3: Shared Utilities

```typescript
// packages/shared/utils/styles.ts
export const boardSquareClass = (isLight: boolean) => cn(
  'w-12 h-12 flex items-center justify-center',
  isLight ? 'bg-chess-board-light' : 'bg-chess-board-dark'
);
```

### Implementation Plan

1. **Setup NativeWind** in both packages
2. **Create shared Tailwind config** with chess-specific tokens
3. **Keep legacy CSS** for vanilla JS app during migration
4. **Migrate components** incrementally, testing on both platforms
5. **Platform-specific adjustments** where needed

### Benefits
- 80-90% style reuse between platforms
- Type-safe theme system
- Familiar Tailwind syntax
- Single source of truth for design

### Chess Board Layout Specifications

#### View Mode System

The interface supports three view modes and two chess area orientations:

**View Modes** (controlled via Mode toggle in top toolbar):
1. **Chess & Chat** - Split view with resizable splitter
2. **Chess Only** - Full screen chess area
3. **Chat Only** - Full screen tabbed panel

**Chess Area Orientations** (controlled via Orient toggle in top toolbar):
1. **Landscape** [⬜] - Board on left, controls on right
2. **Portrait** [⬛] - Board centered, controls above/below

**Note**: The orientation toggle is visible in all view modes but only affects the chess area layout. In Chat Only mode, the toggle remains visible but disabled.

#### Chess Board Sizing Requirements

**Critical Board Constraints**:
1. **Square Size Consistency** - All 64 squares must always be exactly the same size
2. **Maximum Board Size** - The board should occupy the maximum possible area while:
   - Maintaining perfect square aspect ratio (width = height)
   - Leaving sufficient space for all required controls
   - Ensuring all UI elements remain visible and accessible
3. **Dynamic Sizing** - Board size adjusts based on:
   - Available viewport dimensions
   - Current orientation mode (landscape/portrait)
   - Space required for controls in each orientation

**Layout Priorities**:
1. Calculate maximum possible board size first
2. Arrange controls around the board
3. Never compromise square size consistency
4. Never crop or overflow the board

#### Top Toolbar Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ ☰  Simple FICS Interface   Mode: [♔][♔│][▤]  Orient: [▭][▯]      │
└─────────────────────────────────────────────────────────────────────┘
```

Where:
- Mode toggles: [🎯] Chess Only, [🎯💬] Chess & Chat, [💬] Chat Only
- Orient toggles: [⬜] Landscape, [⬛] Portrait (for chess area orientation)

#### Chess & Chat Mode (Desktop Default)

**Left Section - Chess Area (Landscape Orientation):**
```
┌───────────────────────────────────────────────────────────┐
│                        Chess Area                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Game 23    rated blitz 3 0                               │
│  ┌─────────────────────────┬─────────────────────────┐    │
│  │                         │ Player 1 (Rating)       │    │
│  │                         │ ┌─────────────────────┐ │    │
│  │                         │ │   Clock (00:52)     │ │    │
│  │      Chess Board        │ └─────────────────────┘ │    │
│  │       (8x8 grid)        ├─────────────────────────┤    │
│  │                         │ [Analysis] (Other buttons)│  │
│  │                         │  (Moves nav) [←] [→] [⟲]  │  │
│  │                         │ ┌─────────────────────┐ │    │
│  │                         │ │    Move List        │ │    │
│  │                         │ │  22. e5    Qxe5     │ │    │
│  │                         │ │  23. fxe5  Rxe5     │ │    │
│  │                         │ │  24. Qxe5  Qf8      │ │    │
│  │                         │ └─────────────────────┘ │    │
│  │                         ├─────────────────────────┤    │
│  │                         │ Player 2 (Rating)       │    │
│  │                         │ ┌─────────────────────┐ │    │
│  │                         │ │   Clock (01:25)     │ │    │
│  │                         │ └─────────────────────┘ │    │
│  └─────────────────────────┴─────────────────────────┘    │
│  Last move..     B12 Caro...                              │
│                                                           │
│                                                           │
└───────────────────────────────────────────────────────────┘

```

Notes:
- Game info (Game 23, rated blitz 3 0) is directly above the chess board
- Chess board maximizes available space while maintaining square aspect ratio
- All board squares remain exactly the same size regardless of board dimensions
- Controls section width matches the chess board width for visual consistency
- Player info and clocks beside board in landscape orientation
- Last move and opening info (B12 Caro-Kann) are directly below the board
- Move list, analysis buttons, and navigation controls are in the right sidebar

**Left Section - Chess Area (Portrait Orientation):**
```
┌───────────────────────────────────────────────────────────┐
│                        Chess Area                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Game 23                              rated blitz 3 0     │ 
│                                       ┌───────────────┐   │ 
│   Player 1 (Rating)                   │ Clock (00:52) │   │
│                                       └───────────────┘   │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │      Chess Board                                    │  │
│  │       (8x8 grid)                                    │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                       ┌───────────────┐   │ 
│   Player 2 (Rating)                   │ Clock (01:25) │   │
│                                       └───────────────┘   │
│  Last move: 24...Qf8                   B12 Caro-Kann      │ 
│                                                           │ 
│                   [Analysis] (Other buttons)              │
│                                                           │
│                       [←] [→] [⟲] (Move list nav)         │
│                  ┌─────────────────────┐                  │
│                  │     Moves List      │                  │
│                  │   22. e5    Qxe5    │                  │
│                  │   23. fxe5  Rxe5    │                  │
│                  │   24. Qxe5  Qf8     │                  │
│                  └─────────────────────┘                  │
└───────────────────────────────────────────────────────────┘

Note: Game info is directly above the chess board. Opening info is directly below the board.
```

**Right Section (Chat) - Tabbed Panel (After Splitter):**
```
┌─────────────────────────────────┐
│ [Main Console] [Channel 39]...  │
├─────────────────────────────────┤
│  ─────────────────────────────  │
│ │                             │ │
│ │ Console output              │ │
│ │                             │ │
│ │                             │ │  
│  ─────────────────────────────  │
│ ─────────────────────────────   │
│ │ Console input              │  │
│ ─────────────────────────────   │
└─────────────────────────────────┘
```

#### Chess Only Mode

**Full Screen Chess Area:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ ☰  Simple FICS Interface   Mode: [♔][♔│][▤]  Orient: [▭][▯]      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                         Chess Area                                  │
│                   (Landscape or Portrait)                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Chat Only Mode

**Full Screen Tabbed Panel:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ ☰  Simple FICS Interface   Mode: [♔][♔│][▤]  Orient: [▭][▯]      │
├─────────────────────────────────────────────────────────────────────┤
│ [Main Console] [Channel 39]...                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ────────────────────────────────────────────────────────   │
│ │                                                        │  │
│ │ Console output                                         │  │
│ │                                                        │  │
│ │                                                        │  │  
│  ─────────────────────────────────────────────────────────  │
│ ─────────────────────────────                               │
│ │ Console input              │                              │
│ ─────────────────────────────                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Responsive Behavior

| Device/Orientation | Default View Mode | Default Chess Orient | User Control |
|-------------------|------------------|---------------------|---------------|
| Desktop | Chess & Chat | Landscape | Full control of both mode and orientation |
| Tablet Landscape | Chess & Chat | Landscape | Full control of both mode and orientation |
| Tablet Portrait | Chess Only | Portrait | Mode control; orientation defaults to portrait |
| Phone Landscape | Chess Only | Landscape | Mode toggle only; orientation locked to landscape |
| Phone Portrait | Chess Only | Portrait | Mode toggle only; orientation locked to portrait |

### Icon Design & Visual Styling

#### Mode Toggle Icons
Instead of emoji icons, use text-based symbols that clearly represent each mode:

**Mode Icons:**
- **Chess Only**: `[♔]` - Chess king piece symbol
- **Chess & Chat**: `[♔│]` - Chess king with divider line  
- **Chat Only**: `[▤]` - Chat/list icon

**Orientation Icons:**
- **Landscape**: `[▭]` - Wide rectangle 
- **Portrait**: `[▯]` - Tall rectangle

Example toolbar with new icons:
```
┌─────────────────────────────────────────────────────────────────────┐
│ ☰  Simple FICS Interface   Mode: [♔][♔│][▤]  Orient: [▭][▯]       │
└─────────────────────────────────────────────────────────────────────┘
```

#### Visual Styling Requirements

Based on the analysis-screenshot.png reference, all UI elements should have:

1. **Rounded Borders**: 
   - Board container: `border-radius: 10px`
   - Controls/panels: `border-radius: 8px`
   - Buttons: `border-radius: 6px`
   - Text areas: `border-radius: 10px`

2. **3D Shadow Effects**:
   - Primary elements (board, main panels): `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.75)`
   - Secondary elements (buttons, controls): `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)`
   - Hover states: Enhanced shadows for depth

3. **Consistent Theme**:
   - Background: `#ecebe9` (light beige)
   - Clean white panels with subtle shadows
   - Consistent spacing and padding throughout

This styling should be maintained across both web and mobile platforms using NativeWind utilities.

#### Analysis Mode Additions

When analysis is active:
- Evaluation bar appears on left edge of board (vertical, red/white gradient)
- Engine's best line appears below board
- Analysis toggle button highlighted in control section

**NativeWind Implementation for View Modes:**
```typescript
// View mode utilities
const viewModes = {
  // Mode visibility classes
  chessOnly: {
    chess: "flex flex-col flex-1",
    panel: "hidden",
    splitter: "hidden"
  },
  chatOnly: {
    chess: "hidden",
    panel: "flex flex-col flex-1",
    splitter: "hidden"
  },
  chessAndChat: {
    chess: "flex flex-col flex-1",
    panel: "flex flex-col w-80 lg:w-96",
    splitter: "w-1 bg-gray-300 cursor-col-resize"
  }
};

// Responsive mode defaults
const responsiveModes = {
  // Auto-select mode based on breakpoint
  default: {
    mobile: "chess-only",
    tablet: "chess-only md:chess-and-chat",
    desktop: "chess-and-chat"
  }
};

// Layout components
const landscapeLayout = {
  container: "flex flex-row h-full",
  
  // Chess area wrapper
  chessArea: "flex flex-col items-center justify-center p-4",
  
  // Chess board section with controls
  boardSection: "flex flex-col",
  gameInfo: "text-left mb-2", // Above board
  boardWithControls: "flex flex-row", // Board + right controls
  boardContainer: "relative aspect-square",
  moveInfo: "text-left mt-2 text-sm", // Below board
  
  // Controls section (right of board, same width as board)
  controlsSection: "flex flex-col justify-between ml-4",
  playerInfo: "p-4 text-center border rounded",
  clock: "font-digital text-4xl bg-gray-900 text-green-400 px-4 py-2 rounded",
  analysisControls: "flex flex-row gap-2 justify-center",
  moveList: "flex-1 overflow-y-auto p-2 border rounded my-2",
  
  // Tabbed panel section (after splitter)
  panelSection: "flex flex-col bg-gray-50",
  tabs: "flex flex-row border-b",
  tabContent: "flex-1 overflow-y-auto",
  
  // Mode toggle
  modeToggle: "flex flex-row gap-1 p-1 bg-gray-200 rounded-lg",
  
  // Orientation toggle (landscape/portrait for chess area)
  orientToggle: "flex flex-row gap-1 p-1 bg-gray-200 rounded-lg ml-2"
};
```

#### Chess Area Portrait Orientation

**Portrait Layout (for Chess Area):**
```
┌───────────────────────────────────────────────────────────┐
│                        Chess Area                         │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Game 23                              rated blitz 3 0     │ 
│                                       ┌───────────────┐   │ 
│   Player 1 (Rating)                   │ Clock (00:52) │   │
│                                       └───────────────┘   │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │      Chess Board                                    │  │
│  │       (8x8 grid)                                    │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                       ┌───────────────┐   │ 
│   Player 2 (Rating)                   │ Clock (01:25) │   │
│                                       └───────────────┘   │
│  Last move: 24...Qf8                   B12 Caro-Kann     │ 
│                                                           │ 
│                   [Analysis] (Other buttons)              │
│                                                           │
│                       [←] [→] [⟲] (Move list nav)         │
│                  ┌─────────────────────┐                  │
│                  │     Moves List      │                  │
│                  │   22. e5    Qxe5    │                  │
│                  │   23. fxe5  Rxe5    │                  │
│                  │   24. Qxe5  Qf8     │                  │
│                  └─────────────────────┘                  │
└───────────────────────────────────────────────────────────┘
```

**Mobile Portrait Considerations:**
- Board maximizes width while leaving space for player info/clocks
- All squares maintain consistent size
- Move list becomes single line scrollable
- Control buttons remain accessible
- Game info stays at top
- Opening info below board
- Compact but complete layout

### Component-Specific NativeWind Mapping

| Component | Landscape Classes | Portrait Classes | Platform Differences |
|-----------|------------------|------------------|---------------------|
| Chess Area | `flex items-center justify-center` | `flex flex-col` | Centering approach |
| Game Info | `text-left mb-2` (above board) | `text-center mb-2` | Alignment only |
| Chess Board | `aspect-square max-w-[calc(100vh-controls)]` | `aspect-square w-[calc(100vw-padding)]` | Dynamic max sizing |
| Board Squares | `w-[calc(board-size/8)] h-[calc(board-size/8)]` | Same calculation | Consistent square size |
| Opening Info | `text-left mt-2` (below board) | `text-center mt-2` | Alignment only |
| Controls Section | `ml-4 w-[board-width]` | `w-full mt-4` | Position & width |
| Digital Clock | `font-digital text-4xl` | `font-digital text-3xl` | Size only |
| Player Info | `text-center border rounded` | `flex items-center` | Layout style |
| Analysis Controls | `flex justify-center` | `flex justify-center` | Same styling |
| Move List | `flex-1 overflow-y-auto my-2` | `h-48 overflow-y-auto` | Height constraint |
| Eval Bar | `w-8 h-full` (left of board) | `h-8 w-full` (top of board) | Position & orientation |

### Responsive Breakpoints for Chess UI

```typescript
const chessBreakpoints = {
  // Portrait mode on phones
  mobile: { max: '767px' },
  
  // Landscape phones & small tablets  
  tablet: { min: '768px', max: '1023px' },
  
  // Desktop & large tablets
  desktop: { min: '1024px' }
};
```

### Migration Summary

The NativeWind approach with view mode system enables:

**Core Benefits:**
1. **Shared Layouts**: Core layout structure shared between platforms
2. **Consistent Theming**: Single source for colors, spacing, typography
3. **Responsive Design**: Same breakpoint system for both platforms
4. **Platform Optimizations**: Native performance with platform-specific adjustments
5. **Gradual Migration**: Keep existing CSS while building new components

**View Mode System Advantages:**
1. **Adaptive UI**: Automatically selects optimal view based on device
2. **User Control**: Manual override for power users
3. **Space Efficiency**: Maximizes usable space on small screens
4. **Context Switching**: Easy navigation between chess and chat
5. **Platform Native**: Uses appropriate patterns (FAB, swipes, sheets)

**Implementation Strategy:**
```typescript
// Shared view mode and orientation configuration
export const viewModeConfig = {
  // Breakpoint-based defaults
  defaults: {
    xs: 'chessOnly',      // Phone portrait
    sm: 'chessOnly',      // Phone landscape  
    md: 'chessAndChat',   // Tablet
    lg: 'chessAndChat',   // Desktop
  },
  
  // Platform-specific features
  transitions: {
    web: 'slide',         // CSS transitions
    mobile: 'native'      // Native animations
  },
  
  // Interaction methods
  switching: {
    desktop: ['buttons', 'keyboard'],
    mobile: ['fab', 'swipe', 'bottomSheet']
  }
};

// Chess area orientation configuration
export const orientationConfig = {
  // Default orientations by device
  defaults: {
    desktop: 'landscape',
    tabletLandscape: 'landscape',
    tabletPortrait: 'portrait',
    phoneLandscape: 'landscape',
    phonePortrait: 'portrait'
  },
  
  // Lock orientation on small devices
  lockOrientation: {
    phone: true,          // Phones lock to device orientation
    tablet: false,        // Tablets allow user control
    desktop: false        // Desktop has full control
  },
  
  // Toggle button configuration
  toggle: {
    icons: {
      landscape: '⬜',    // Wide rectangle icon
      portrait: '⬛'      // Tall rectangle icon
    },
    disabled: {
      chatOnly: true      // Disable in chat-only mode
    }
  }
};
```

**Key Technical Considerations:**
- **Fonts**: Web uses @font-face, mobile needs custom font loading
- **Interactions**: Hover states (web) vs press handlers (mobile)
- **Scrolling**: CSS overflow vs ScrollView components
- **Shadows**: Different implementations but same visual effect
- **Gestures**: Web click/drag vs mobile touch/swipe
- **Navigation**: URL routing (web) vs stack navigation (mobile)

---

## Architecture Approach

### 🎨 **Theming System**

- **CSS-in-JS** with Styled Components for dynamic theming
- **CSS Custom Properties** for theme tokens
- **Theme Provider** context for app-wide theme management
- **System preference detection** with user override capability

### 📱 **Responsive Strategy**

- **CSS Grid/Flexbox** for layout structure
- **Container Queries** + Media Queries for breakpoints
- **Custom React hooks** for orientation/viewport detection
- **Component composition** for different layout modes

### 🔄 **Layout Management**

- **Landscape Mode**: Horizontal layout with sidebar
- **Portrait Mode**: Vertical stack with collapsible panels
- **Dynamic switching** with smooth transitions
- **State persistence** across orientation changes

---

## 📋 Task Breakdown

### Phase 1: Foundation & Theme System (Week 1)

#### Task 1.1: Set up Theme Architecture

**Description**: Create the core theming infrastructure

- [x] Install styled-components and theme dependencies
- [x] Create theme token system (colors, spacing, typography)
- [x] Implement ThemeProvider wrapper component
- [x] Add theme type definitions in TypeScript
- [x] Create light and dark theme configurations

**Comments**:
✅ **COMPLETED** - Full theme system implemented:

- Added styled-components, framer-motion, react-use dependencies
- Created comprehensive theme token system with chess-specific colors
- Implemented ThemeProvider with system theme detection
- Added TypeScript definitions and styled-components declaration
- Created light/dark themes with proper contrast ratios
- Added responsive breakpoints (iPhone SE minimum: 375px)

---

#### Task 1.2: Update PreferencesStore for UI Settings

**Description**: Extend preferences to include UI-related settings

- [x] Add theme preference (light/dark/system) to PreferencesStore
- [x] Add layout preference (auto/landscape/portrait) option
- [x] Add device size detection preference
- [x] Update preference validation and defaults
- [x] Add theme persistence to localStorage

**Comments**:
✅ **COMPLETED** - PreferencesStore updated with UI settings:

- Added 'theme' preference with light/dark/system options
- Added 'layout' preference for orientation control
- Added internal 'lastSystemThemeCheck' for system theme monitoring
- Updated validation logic for new preferences
- Automatic persistence to localStorage via existing store mechanism

---

#### Task 1.3: Create Responsive Hooks

**Description**: Build React hooks for responsive behavior

- [x] Create `useViewport()` hook for window size tracking
- [x] Create `useOrientation()` hook for orientation detection
- [x] Create `useBreakpoint()` hook for device size categories
- [x] Create `useTheme()` hook for theme access and switching
- [x] Add proper cleanup and resize event handling

**Comments**:
✅ **COMPLETED** - Comprehensive responsive hook system:

- useViewport() for window dimensions tracking
- useResponsiveOrientation() for portrait/landscape detection
- useBreakpoint() for device size categorization
- useTheme() for theme access and switching
- useLayout() master hook combining all responsive info
- useMediaQuery() for custom media query matching
- useResponsiveValue() for breakpoint-specific values
- Proper event cleanup and debouncing for performance

---

### Phase 2: Layout Infrastructure (Week 1-2)

#### Task 2.1: Design Breakpoint System

**Description**: Define responsive breakpoints and layout rules

- [x] Define breakpoint categories (mobile-portrait, mobile-landscape, tablet, desktop)
- [x] Create breakpoint constants and utility functions
- [x] Design component visibility rules per breakpoint
- [x] Plan content prioritization for smaller screens
- [x] Document layout behavior specifications

**Comments**:
✅ **COMPLETED** - Comprehensive breakpoint system implemented:

- iPhone SE minimum support (375px) with 5 breakpoint categories
- Responsive hooks for breakpoint detection and media queries
- Component visibility utilities (BreakpointContainer)
- Content prioritization for mobile-first design
- Layout behavior documented in TypeScript interfaces

---

#### Task 2.2: Create Layout Provider System

**Description**: Build layout context and provider components

- [x] Create LayoutProvider context with orientation/size state
- [x] Implement responsive layout detection logic
- [x] Add layout change event handling and debouncing
- [x] Create layout debugging tools for development
- [x] Implement smooth transition animations between layouts

**Comments**:
✅ **COMPLETED** - Advanced layout provider system:

- LayoutProvider with React Context for global layout state
- Automatic orientation and breakpoint detection
- Debounced layout change handling with transitions
- Panel management and sidebar control
- Layout debugging via status indicators
- Smooth 300ms transitions between layout modes

---

#### Task 2.3: Build Base Layout Components

**Description**: Create the foundational layout containers

- [x] Create `ResponsiveContainer` wrapper component
- [x] Implement `LandscapeLayout` component structure
- [x] Implement `PortraitLayout` component structure
- [x] Add layout switching logic and animations
- [x] Create common layout primitives (Grid, Flex, Container)

**Comments**:
✅ **COMPLETED** - Complete layout component system:

- ResponsiveContainer with automatic layout switching
- LandscapeLayout with resizable sidebar and tabbed interface
- PortraitLayout with collapsible bottom panels and FAB
- Smooth layout transitions with CSS animations
- ResponsiveGrid, FlexContainer, and BreakpointContainer primitives
- Working demo application with theme and layout toggles
- Global styles with chess-specific CSS variables

---

### Phase 2.5: NativeWind Setup and Migration (Week 1-2)

#### Task 2.5.1: Install and Configure NativeWind

**Description**: Set up NativeWind in both web and mobile packages

- [ ] Install NativeWind and dependencies in packages/web
- [ ] Install NativeWind and dependencies in packages/mobile
- [ ] Create shared Tailwind configuration in packages/shared/theme
- [ ] Configure build tools for both platforms
- [ ] Set up PostCSS for web platform
- [ ] Configure Metro for React Native platform

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 2.5.2: Create Shared Theme System

**Description**: Build the shared design token system

- [ ] Extract colors from existing CSS to theme tokens
- [ ] Create chess-specific color palette (board, pieces, highlights)
- [ ] Define spacing scale based on current CSS values
- [ ] Add digital clock font configuration
- [ ] Create typography scale for game text
- [ ] Document theme usage guidelines

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 2.5.3: Build Cross-Platform Utilities

**Description**: Create shared style utilities for both platforms

- [ ] Create board square style utilities
- [ ] Build clock display utilities with digital font
- [ ] Add player info layout utilities
- [ ] Create responsive breakpoint utilities
- [ ] Implement platform-specific adjustments
- [ ] Add TypeScript types for theme

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 2.6: View Mode System Implementation (Week 2)

#### Task 2.6.1: Create View Mode Infrastructure

**Description**: Build the core view mode switching system

- [ ] Create ViewMode enum (ChessOnly, ChatOnly, ChessAndChat)
- [ ] Add view mode state to PreferencesStore
- [ ] Implement responsive mode defaults based on device/orientation
- [ ] Create view mode switching logic with animations
- [ ] Add keyboard shortcuts for desktop mode switching
- [ ] Implement mode persistence across sessions

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 2.6.2: Implement Mode and Orientation UI Controls

**Description**: Create UI elements for mode and orientation switching

- [ ] Desktop: Mode toggle buttons in header toolbar
- [ ] Desktop: Orientation toggle buttons next to mode buttons
- [ ] Mobile landscape: Compact mode switcher
- [ ] Mobile portrait: FAB or swipe gestures for mode
- [ ] Add visual indicators for current mode and orientation
- [ ] Implement smooth transitions between modes and orientations
- [ ] Create accessibility labels for screen readers
- [ ] Disable orientation toggle when in Chat Only mode
- [ ] Lock orientation toggle on phone devices

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 2.6.3: Build Responsive Mode Behavior

**Description**: Implement intelligent mode selection

- [ ] Auto-select appropriate mode based on screen size
- [ ] Allow user override of automatic selection
- [ ] Handle orientation changes gracefully
- [ ] Implement splitter for chess-and-chat mode
- [ ] Add touch gestures for mobile mode switching
- [ ] Create bottom sheet implementation for mobile portrait

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 3: Landscape Layout Implementation (Week 2)

#### Task 3.1: Design Landscape Layout Structure

**Description**: Implement the primary landscape-oriented interface with NativeWind

- [ ] Design main layout grid using NativeWind flex utilities
- [ ] Implement chess board area with aspect-square utility
- [ ] Create game info section above board (game number, time control)
- [ ] Add move info section below board (last move, opening)
- [ ] Create right sidebar for player clocks and controls
- [ ] Implement analysis mode with evaluation bar

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 3.2: Create Landscape Component Arrangements

**Description**: Arrange UI components optimally for landscape view using NativeWind

- [ ] Implement player info sections with digital clocks
- [ ] Create control button section between players
- [ ] Add move list with NativeWind scroll utilities
- [ ] Implement tabbed interface for chat (if space permits)
- [ ] Add navigation controls for analysis mode
- [ ] Style digital clocks with custom font-digital class

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 3.3: NativeWind Landscape Implementation

**Description**: Convert existing CSS to NativeWind utilities

- [ ] Extract digital clock styles to NativeWind config
- [ ] Create shared board square utilities
- [ ] Implement responsive sizing with breakpoint utilities
- [ ] Add platform-specific hover/press states
- [ ] Create theme-aware color classes for chess pieces

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 4: Portrait Layout Implementation (Week 2-3)

#### Task 4.1: Design Portrait Layout Structure

**Description**: Create portrait-optimized interface layout

- [ ] Design vertical stacking layout with player info/clocks above and below board
- [ ] Implement chess board sizing for portrait screens (full width, aspect-square)
- [ ] Create bottom panel system for moves/analysis/info tabs
- [ ] Determine optimal placement for move list (collapsible bottom sheet vs tabs)
- [ ] Design control button layout (floating action buttons vs inline)
- [ ] Handle analysis mode evaluation bar (horizontal at top of board)

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 4.2: Create Portrait Component Arrangements

**Description**: Optimize component layout for portrait viewing

- [ ] Position player names and ratings with clocks (stacked layout)
- [ ] Implement responsive tab system for limited vertical space
- [ ] Design gesture-based navigation for move history
- [ ] Create compact game info display (game number, time control)
- [ ] Add swipe gestures for tab navigation
- [ ] Implement collapsible sections for space efficiency

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 4.3: NativeWind Portrait Implementation

**Description**: Implement portrait layout with NativeWind classes

- [ ] Create portrait-specific layout utilities matching landscape structure
- [ ] Define responsive clock sizing (smaller in portrait)
- [ ] Implement orientation-aware component switching
- [ ] Add platform-specific touch handlers for mobile
- [ ] Create shared style utilities for both orientations

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 5: Theme Implementation (Week 3)

#### Task 5.1: Implement Light Theme

**Description**: Create comprehensive light theme styling

- [ ] Define light theme color palette and tokens
- [ ] Style all UI components for light theme
- [ ] Implement proper contrast ratios for accessibility
- [ ] Add light theme chess board and piece styling
- [ ] Test theme consistency across all components

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 5.2: Implement Dark Theme

**Description**: Create comprehensive dark theme styling

- [ ] Define dark theme color palette and tokens
- [ ] Style all UI components for dark theme
- [ ] Implement proper contrast ratios for dark backgrounds
- [ ] Add dark theme chess board and piece styling
- [ ] Ensure good visual hierarchy in dark mode

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 5.3: Add Theme Switching & System Detection

**Description**: Implement dynamic theme switching capabilities

- [ ] Create theme toggle component/controls
- [ ] Implement system theme preference detection
- [ ] Add smooth transitions between theme changes
- [ ] Store user theme preference in PreferencesStore
- [ ] Add theme switching keyboard shortcuts

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 6: Responsive Chess Board (Week 3-4)

#### Task 6.1: Create Adaptive Chess Board Component

**Description**: Make chess board responsive to different screen sizes while maintaining square consistency

- [ ] Implement board size calculation algorithm:
  - Calculate maximum board size for landscape orientation
  - Calculate maximum board size for portrait orientation
  - Account for required control space in each mode
  - Ensure board never exceeds available viewport
- [ ] Maintain perfect square aspect ratio at all times
- [ ] Ensure all 64 squares are always exactly the same size
- [ ] Add touch/mouse interaction handling for all devices
- [ ] Create responsive piece sizing based on square size
- [ ] Implement drag-and-drop with touch support
- [ ] Add board rotation for different orientations

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 6.2: Optimize Chess Board for Mobile

**Description**: Enhance chess board usability on touch devices

- [ ] Implement touch-friendly piece interaction
- [ ] Add haptic feedback for move validation
- [ ] Create piece promotion dialog for mobile
- [ ] Implement zoom/pan for detailed board viewing
- [ ] Add visual feedback for legal moves on touch

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 7: Advanced Responsive Features (Week 4)

#### Task 7.1: Implement Advanced Layout Features

**Description**: Add sophisticated responsive behavior

- [ ] Create layout preferences and customization options
- [ ] Implement panel resizing and rearrangement
- [ ] Add layout memory between sessions
- [ ] Create picture-in-picture mode for analysis
- [ ] Implement full-screen board mode

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 7.2: Performance Optimization

**Description**: Optimize responsive performance and transitions

- [ ] Implement layout animation optimizations
- [ ] Add layout shift prevention strategies
- [ ] Optimize re-render performance during resize
- [ ] Add lazy loading for off-screen components
- [ ] Implement viewport-based component loading

**Comments**:
_[Space for implementation notes and completion status]_

---

### Phase 8: Testing & Polish (Week 4-5)

#### Task 8.1: Cross-Device Testing

**Description**: Test responsive behavior across devices and browsers

- [ ] Test on various mobile devices (iOS/Android)
- [ ] Test on tablets in both orientations
- [ ] Test on desktop with different window sizes
- [ ] Verify theme consistency across devices
- [ ] Test accessibility with screen readers

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 8.2: Performance Testing & Optimization

**Description**: Ensure responsive performance meets standards

- [ ] Measure layout shift and animation performance
- [ ] Optimize theme switching performance
- [ ] Test orientation change performance
- [ ] Measure and optimize bundle size impact
- [ ] Add performance monitoring and logging

**Comments**:
_[Space for implementation notes and completion status]_

---

#### Task 8.3: Documentation & Maintenance

**Description**: Document responsive system for future development

- [ ] Create responsive design system documentation
- [ ] Document theme customization guidelines
- [ ] Create layout troubleshooting guide
- [ ] Add component storybook examples
- [ ] Document accessibility considerations

**Comments**:
_[Space for implementation notes and completion status]_

---

## 🔧 Technical Specifications

### Breakpoint System

```typescript
const breakpoints = {
    mobilePortrait: '0px',      // < 480px
    mobileLandscape: '480px',   // 480px - 768px  
    tablet: '768px',            // 768px - 1024px
    desktop: '1024px',          // > 1024px
    large: '1440px'             // > 1440px
};
```

### Theme Token Structure

```typescript
interface ThemeTokens {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        // ... chess-specific colors
    };
    spacing: Record<string, string>;
    typography: Record<string, any>;
    shadows: Record<string, string>;
}
```

### Layout System

```typescript
interface LayoutState {
    orientation: 'portrait' | 'landscape';
    breakpoint: 'mobile' | 'tablet' | 'desktop';
    dimensions: { width: number; height: number };
    isMobile: boolean;
    isTouch: boolean;
}
```

## 🎯 Success Criteria

- [ ] **Responsive**: App works flawlessly on all device sizes
- [ ] **Performant**: Smooth 60fps animations and transitions
- [ ] **Accessible**: Meets WCAG AA guidelines for contrast and navigation
- [ ] **Intuitive**: Layout adapts naturally to orientation changes
- [ ] **Consistent**: Theme system provides coherent visual experience
- [ ] **Maintainable**: Clean, documented code with TypeScript support

## 📚 Recommended Libraries

### Core Dependencies

- `styled-components` - CSS-in-JS with theming
- `framer-motion` - Smooth animations and transitions
- `react-use` - Utility hooks for responsive behavior

### Development Tools

- `@storybook/react` - Component development and testing
- `react-testing-library` - Responsive behavior testing
- `jest-styled-components` - Theme and style testing

---

**Status**: Ready to begin implementation
**Estimated Timeline**: 4-5 weeks for complete responsive system
**Dependencies**: Requires completed MobX stores (✅ Complete)
# Migration Guide: Vanilla JS to React Native

## Overview
This guide helps migrate the existing vanilla JavaScript codebase to a React Native monorepo with shared business logic.

## Migration Strategy

### Phase 1: Core Logic Migration (Week 1-2)
1. **Chess Engine** - Migrate ChessBoard.js to TypeScript in shared package
2. **FICS Protocol** - Extract protocol handling from fics.js
3. **Utilities** - Convert utils.js to TypeScript modules
4. **State Management** - Implement MobX stores for all state

### Phase 2: Web React App (Week 3-4)
1. **Components** - Create React components for board, chat, etc.
2. **Routing** - Implement React Router for navigation
3. **PWA** - Add service worker and manifest
4. **Testing** - Set up React Testing Library

### Phase 3: React Native App (Week 5-6)
1. **Navigation** - Implement React Navigation
2. **Native UI** - Create mobile-optimized components
3. **Platform-specific** - Handle iOS/Android differences
4. **Testing** - Set up Detox for E2E tests

## Code Mapping

### Current Structure → New Structure

```
scripts/ChessBoard.js     → packages/shared/src/services/ChessEngine.ts
scripts/fics.js          → packages/shared/src/services/FICSProtocol.ts
scripts/chess.js         → packages/shared/src/models/GameStore.ts
scripts/chat.js          → packages/shared/src/models/ChatStore.ts
scripts/utils.js         → packages/shared/src/utils/
scripts/stockfishEngine.js → packages/shared/src/services/StockfishService.ts
```

## Component Examples

### Web Component (React)
```tsx
// packages/web/src/components/ChessBoard.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../hooks/useRootStore';

export const ChessBoard = observer(() => {
  const { gameStore } = useRootStore();
  
  return (
    <div className="chess-board">
      {/* Board implementation */}
    </div>
  );
});
```

### Mobile Component (React Native)
```tsx
// packages/mobile/src/components/ChessBoard.tsx
import React from 'react';
import { View, PanGestureHandler } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../hooks/useRootStore';

export const ChessBoard = observer(() => {
  const { gameStore } = useRootStore();
  
  return (
    <View style={styles.board}>
      {/* Board implementation */}
    </View>
  );
});
```

## State Management Pattern

```typescript
// Using MobX stores
const { gameStore, ficsStore, chatStore } = useRootStore();

// Making moves
gameStore.makeMove('e2', 'e4');

// Sending FICS commands
ficsStore.sendCommand('seek 15 0');

// Managing chat
chatStore.addMessage('console', {
  sender: 'System',
  content: 'Welcome to FICS',
  type: 'system',
  channel: 'console',
  timestamp: new Date()
});
```

## WebSocket Handling

The WebSocket connection is managed in the shared FICSStore and works identically on web and mobile:

```typescript
// Automatic reconnection
// Message parsing
// Command queuing
// Error handling
```

## Testing Strategy

1. **Unit Tests** - Jest for business logic
2. **Component Tests** - React Testing Library / React Native Testing Library
3. **E2E Tests** - Cypress (web) / Detox (mobile)

## Performance Considerations

1. **Code Splitting** - Dynamic imports for web
2. **Lazy Loading** - React.lazy for routes
3. **Memoization** - React.memo for expensive renders
4. **Virtual Lists** - For long move lists/chat history

## Next Steps

1. Install dependencies: `yarn install`
2. Start migrating chess engine to TypeScript
3. Create first React components
4. Test on both platforms continuously
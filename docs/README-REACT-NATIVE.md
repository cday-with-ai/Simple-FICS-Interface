# React Native Migration Plan

This branch contains the React Native migration of Simple-FICS-Interface, structured as a monorepo with shared code
between web and mobile platforms.

## Project Structure

```
Simple-FICS-Interface/
├── packages/
│   ├── shared/          # Shared business logic and models
│   │   ├── src/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   └── package.json
│   ├── web/            # React web application
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── mobile/         # React Native application
│       ├── src/
│       ├── ios/
│       ├── android/
│       └── package.json
├── package.json        # Root package.json with workspaces
└── tsconfig.json      # TypeScript configuration
```

## Technology Stack

- **React Native** - Mobile framework
- **React** - Web framework
- **MobX** - State management
- **TypeScript** - Type safety
- **React Navigation** - Mobile navigation
- **React Router** - Web navigation
- **Yarn Workspaces** - Monorepo management

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Install dependencies
yarn install

# iOS specific
cd packages/mobile/ios && pod install
```

### Development

```bash
# Run web
yarn workspace @fics/web start

# Run mobile (iOS)
yarn workspace @fics/mobile ios

# Run mobile (Android)
yarn workspace @fics/mobile android

# Run tests
yarn test
```

## Code Sharing Strategy

- **Shared Package**: Contains all business logic, models, and services
- **Platform-specific UI**: Separate UI components for web and mobile
- **Unified State**: MobX stores shared across platforms
- **Common Services**: WebSocket, chess engine, FICS protocol
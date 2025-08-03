# FICS Backend Service

A backend service that connects to FICS (Free Internet Chess Server) as a guest bot, monitors specific channels, and provides REST APIs to access the collected data.

## Features

- Connects to FICS as a guest bot
- Monitors channels: 39, 49, 50, 10, 1, 2, 36, 37, 38, 40
- Logs all channel messages to SQLite database
- Periodically runs `who` command to track online users
- Provides REST APIs for data retrieval

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Copy `.env.example` to `.env` and configure as needed:
```bash
cp .env.example .env
```

3. Run in development mode:
```bash
yarn dev
```

4. Build for production:
```bash
yarn build
yarn start
```

## API Endpoints

### Get Channel Messages
```
GET /api/channels/:channel/messages?limit=100&offset=0
```

### Get All Messages
```
GET /api/messages?limit=100&offset=0
```

### Get User History
```
GET /api/users/:username/history?limit=100&offset=0
```

### Get Latest Who Snapshot
```
GET /api/who/latest
```

### Get All Who Records
```
GET /api/who?limit=100&offset=0
```

### Health Check
```
GET /api/health
```

### Get Monitored Channels
```
GET /api/channels
```

## Database

The service uses SQLite for data storage. The database is created automatically at `./data/fics-backend.db`.

### Schema

**channel_messages**
- id: INTEGER PRIMARY KEY
- channel: INTEGER
- username: TEXT
- message: TEXT
- timestamp: DATETIME
- raw_message: TEXT

**who_records**
- id: INTEGER PRIMARY KEY
- username: TEXT
- rating: TEXT
- status: TEXT
- timestamp: DATETIME
- raw_data: TEXT

## Logs

Logs are stored in the `./logs` directory:
- `combined.log`: All logs
- `error.log`: Error logs only

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `LOG_LEVEL`: Winston log level (default: info)
- `DB_PATH`: Custom database path (optional)
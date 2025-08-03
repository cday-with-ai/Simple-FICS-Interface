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
- `FICS_USERNAME`: FICS username (default: guest)
- `FICS_PASSWORD`: FICS password (empty for guest)

## Railway Deployment

### Quick Deploy

1. Push your code to GitHub
2. Sign up at [railway.app](https://railway.app) with GitHub
3. Create new project → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect the monorepo and use the `railway.json` config

### Configure Environment Variables

In Railway dashboard → Variables, add:

```bash
FICS_USERNAME=guest              # or your FICS username
FICS_PASSWORD=                   # leave empty for guest
DATABASE_PATH=/data/fics.db      # Important: use /data/ for persistent storage
PORT=3011                        # Railway also provides $PORT automatically
```

### Add Persistent Volume

**Important**: For SQLite to persist across deployments:

1. In Railway dashboard → Settings → Volumes
2. Click "Add Volume"
3. Mount path: `/data`
4. This ensures your database survives redeployments

### Update Your Frontend

Update the backend URL in `packages/shared/src/services/BackendAPI.ts`:

```typescript
constructor(baseUrl: string = 'https://your-app.railway.app/api') {
  this.baseUrl = baseUrl;
}
```

### Monitoring

- Health check: `https://your-app.railway.app/api/health`
- Logs: Available in Railway dashboard → Logs
- Metrics: Railway provides basic metrics

### Costs

- Free tier: $5/month credit (no credit card required)
- This backend typically uses ~$1-2/month
- Persistent volume: Included in free tier

### Troubleshooting

1. **Database not persisting**: Ensure `DATABASE_PATH` uses `/data/` prefix
2. **Can't connect to FICS**: Check logs, FICS might be blocking Railway IPs
3. **High memory usage**: SQLite databases grow over time, consider periodic cleanup
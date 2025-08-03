import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Database } from './models/database';
import { SimpleFICSClient } from './services/SimpleFICSClient';
import { createApiRouter } from './routes/api';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging - only log non-health check requests
app.use((req, _res, next) => {
  if (req.path !== '/api/health') {
    logger.info(`${req.method} ${req.path}`);
  }
  next();
});

async function start() {
  try {
    // Print startup banner
    console.log('\n');
    console.log('╔═══════════════════════════════════════╗');
    console.log('║      FICS Backend Service v1.0.0      ║');
    console.log('╚═══════════════════════════════════════╝');
    console.log('\n');

    // Initialize database
    logger.info('💾 Initializing database...');
    const database = new Database();
    await database.initialize();
    logger.info('✓ Database initialized successfully');

    // Create FICS client
    logger.info('🤖 Creating FICS client...');
    const client = new SimpleFICSClient(database, logger);

    // Set up API routes
    app.use('/api', createApiRouter(database));

    // Error handling middleware
    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      logger.error('Unhandled error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });

    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 Backend server running on http://localhost:${PORT}`);
      logger.info(`📡 API endpoints available at http://localhost:${PORT}/api`);
    });

    // Connect to FICS
    await client.connect();

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('\n⏹️  Shutting down gracefully...');
      await client.disconnect();
      await database.close();
      logger.info('👋 Goodbye!');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('\n⏹️  Shutting down gracefully...');
      await client.disconnect();
      await database.close();
      logger.info('👋 Goodbye!');
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start backend:', error);
    process.exit(1);
  }
}

start();
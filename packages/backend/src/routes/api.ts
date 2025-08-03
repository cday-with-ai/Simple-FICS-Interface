import { Router, Request, Response } from 'express';
import { Database } from '../models/database';

export function createApiRouter(database: Database): Router {
  const router = Router();

  // Get channel messages
  router.get('/channels/:channel/messages', async (req: Request, res: Response) => {
    try {
      const channel = parseInt(req.params.channel);
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;

      if (isNaN(channel)) {
        return res.status(400).json({ error: 'Invalid channel number' });
      }

      const messages = await database.getChannelMessages(channel, limit, offset);
      return res.json({
        channel,
        limit,
        offset,
        count: messages.length,
        messages
      });
    } catch (error) {
      console.error('Error fetching channel messages:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all messages (from all channels)
  router.get('/messages', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;

      const messages = await database.getChannelMessages(undefined, limit, offset);
      res.json({
        limit,
        offset,
        count: messages.length,
        messages
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get who records for a specific user
  router.get('/users/:username/history', async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;

      const records = await database.getWhoRecords(username, limit, offset);
      res.json({
        username,
        limit,
        offset,
        count: records.length,
        records
      });
    } catch (error) {
      console.error('Error fetching user history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get latest who snapshot
  router.get('/who/latest', async (req: Request, res: Response) => {
    try {
      const snapshot = await database.getLatestWhoSnapshot();
      res.json({
        timestamp: snapshot[0]?.timestamp || null,
        count: snapshot.length,
        users: snapshot
      });
    } catch (error) {
      console.error('Error fetching who snapshot:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all who records
  router.get('/who', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;

      const records = await database.getWhoRecords(undefined, limit, offset);
      res.json({
        limit,
        offset,
        count: records.length,
        records
      });
    } catch (error) {
      console.error('Error fetching who records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Health check endpoint
  router.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // Get monitored channels
  router.get('/channels', (req: Request, res: Response) => {
    res.json({
      channels: [39, 49, 50, 10, 1, 2, 36, 37, 38, 40]
    });
  });

  return router;
}
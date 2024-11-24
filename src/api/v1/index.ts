import express from 'express';

import MessageResponse from '@/interfaces/message-response';
import columnRoutes from './column-routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Task Manager API - v1',
  });
});

router.use('/column', columnRoutes);

export default router;

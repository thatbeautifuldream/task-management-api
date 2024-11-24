import express from 'express';

import MessageResponse from '@/interfaces/message-response';
import columnRoutes from './column-routes';
import userRoutes from './user-routes';
import { specs } from '@/swagger';

const router = express.Router();

/**
 * @openapi
 * /api/v1:
 *   get:
 *     description: Returns a message indicating the API version.
 *     responses:
 *       200:
 *         description: A JSON object with API version details.
 */
router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Task Manager API - v1',
  });
});

const routes = [
  { path: '/column', route: columnRoutes },
  { path: '/user', route: userRoutes },
] as const;

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;

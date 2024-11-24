import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import api from './api/v1';
import MessageResponse from './interfaces/message-response';
import * as middlewares from './middlewares';
import { specs } from './swagger';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * @openapi
 * /:
 *   get:
 *     description: Returns a message indicating the API status.
 *     responses:
 *       200:
 *         description: A JSON object containing a message.
 */
app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: `Task Manager API - ${process.env.NODE_ENV}`,
  });
});

/**
 * @openapi
 * /api/v1:
 *   get:
 *     description: Base endpoint for API version 1.
 *     responses:
 *       200:
 *         description: A JSON object with API details.
 */
app.use('/api/v1', api);

app.get('/openapi.json', (req, res) => {
  res.json(specs);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

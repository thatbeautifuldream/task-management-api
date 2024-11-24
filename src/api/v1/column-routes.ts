import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/middlewares';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @openapi
 * /column:
 *   post:
 *     description: Create a new card in a specific stage.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stageId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, async (req, res) => {
  const { stageId, title, description } = req.body;

  try {
    const card = await prisma.card.create({
      data: {
        title,
        description,
        stageId,
      },
    });
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @openapi
 * /column/{cardId}/move:
 *   put:
 *     description: Move a card to a new stage.
 *     parameters:
 *       - name: cardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStageId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Card moved successfully.
 *       500:
 *         description: Internal server error.
 */
router.put('/:cardId/move', authenticate, async (req, res) => {
  const { cardId } = req.params;
  const { newStageId } = req.body;

  try {
    const card = await prisma.card.update({
      where: { id: cardId },
      data: { stageId: newStageId },
    });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

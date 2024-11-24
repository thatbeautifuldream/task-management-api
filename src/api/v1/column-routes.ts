import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '@/middlewares';

const router = express.Router();
const prisma = new PrismaClient();

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

import { type RequestHandler, type Request, type Response } from 'express';
import deckCollection from '../models/deckModel';
import topicCollection from '../models/topicModel';
import mongoose from 'mongoose';

export const getAllDecks: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;

  try {
    const topicCount = await topicCollection.countDocuments({ userId: req.user?._id, _id: topicId });
    if (topicCount === 0) {
      throw new Error('Topic not found for this user.');
    }

    const decks = await deckCollection.find({ topicId });
    res.status(200).json(decks);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const createDeck: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;

  try {
    const topicCount = await topicCollection.countDocuments({ userId: req.user?._id, _id: topicId });
    if (topicCount === 0) {
      throw new Error('Topic not found for this user.');
    }

    const newDeck = await deckCollection.create({ topicId, deckName: req.body.deckName });
    res.status(200).json(newDeck);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const updateDeck: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId, deckId } = req.params;
  const { deckName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    res.status(404).json({ error: 'Invalid deck ID.' });
    return;
  }

  try {
    const topicCount = await topicCollection.countDocuments({ userId: req.user?._id, _id: topicId });
    if (topicCount === 0) {
      throw new Error('Topic not found for this user.');
    }

    const deckPreUpdate = await deckCollection.findOneAndUpdate(
      { _id: deckId },
      { deckName },
    );

    if (deckPreUpdate !== null) {
      res.status(200).json(deckPreUpdate);
    } else {
      res.status(404).json({ error: 'No such deck.' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const deleteDeck: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId, deckId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    res.status(404).json({ error: 'Invalid deck ID.' });
    return;
  }

  try {
    const topicCount = await topicCollection.countDocuments({ userId: req.user?._id, _id: topicId });

    if (topicCount === 0) {
      throw new Error('Topic not found for this user.');
    }

    const deletedDeck = await deckCollection.findOneAndDelete(
      { _id: deckId },
    );

    if (deletedDeck !== null) {
      res.status(200).json(deletedDeck);
    } else {
      res.status(404).json({ error: 'No such deck.' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

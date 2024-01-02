import { type RequestHandler, type Request, type Response } from 'express';
import cardCollection from '../models/cardModel';
import mongoose from 'mongoose';

export const getAllCards: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { deckId } = req.params;

  try {
    const cards = await cardCollection.find({ deckId });
    res.status(200).json(cards);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const getDeck: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { deckId } = req.params;
  try {
    const topics = await cardCollection.findOne({ userId: req.user, _id: deckId });
    res.status(200).json(topics);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const createDeck: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;

  try {
    const newDeck = await cardCollection.create({ topicId, deckName: req.body.deckName });
    res.status(200).json(newDeck);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const updateDeck: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { deckId } = req.params;
  const { deckName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    res.status(404).json({ error: 'No such deck.' });
    return;
  }

  try {
    const deckPreUpdate = await cardCollection.findOneAndUpdate(
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
  const { deckId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    res.status(404).json({ error: 'No such deck.' });
    return;
  }

  try {
    const deletedDeck = await cardCollection.findOneAndDelete(
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

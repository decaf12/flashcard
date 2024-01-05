import { type RequestHandler, type Request, type Response } from 'express';
import cardCollection from '../models/cardModel';
import deckCollection from '../models/deckModel';
import topicCollection from '../models/topicModel';
import isFilled from '../utilities/isFilled';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';

export const getAllCards: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId, deckId } = req.params;

  try {
    const deck = await deckCollection.findById(deckId);
    if (deck === null || !deck.topicId.equals(topicId)) {
      throw new Error('No such deck exists for this topic.');
    }

    const topic = await topicCollection.findById(deck.topicId);
    if (topic === null || !topic.userId.equals(req.user?._id)) {
      throw new Error('No such topic exists for this user.');
    }

    const cards = await cardCollection.find({ deckId });
    res.status(200).json(cards);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const createCard: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId, deckId } = req.params;
  const { question, answer }: { question: string, answer: string } = req.body;

  if (!isFilled(question) || !isFilled(answer)) {
    res.status(400).json({ error: 'Fill out both sides of the card.' });
    return;
  }

  try {
    const deck = await deckCollection.findById(deckId);
    if (deck === null || !deck.topicId.equals(topicId)) {
      throw new Error('No such deck exists for this topic.');
    }

    const topic = await topicCollection.findById(deck.topicId);
    if (topic === null || !topic.userId.equals(req.user?._id)) {
      throw new Error('No such topic exists for this user.');
    }

    const newCard = await cardCollection.create({ deckId, question, answer });
    res.status(200).json(newCard);
  } catch (err) {
    if (err instanceof Error && 'code' in err) {
      const message = err.code === 11000 ? 'A card with the same question already exists in this deck.' : err.message;
      res.status(400).json({ error: message });
    }
  }
}) as RequestHandler;

export const updateCard: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId, deckId, cardId } = req.params;
  const { question, answer }: { question: string, answer: string } = req.body;

  if (!isFilled(question) || !isFilled(answer)) {
    res.status(400).json({ error: 'Fill out both sides of the card.' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(404).json({ error: 'No such card.' });
    return;
  }

  try {
    const card = await cardCollection.findById(cardId);
    if (card === null || !card.deckId.equals(deckId)) {
      throw new Error('No such card exists for this deck.');
    }

    const deck = await deckCollection.findById(deckId);
    if (deck === null || !deck.topicId.equals(topicId)) {
      throw new Error('No such deck exists for this topic.');
    }

    const topic = await topicCollection.findById(deck.topicId);
    if (topic === null || !topic.userId.equals(req.user?._id)) {
      throw new Error('No such topic exists for this user.');
    }

    const cardPreUpdate = await cardCollection.findOneAndUpdate(
      { _id: cardId },
      { question, answer },
    );

    if (cardPreUpdate !== null) {
      res.status(200).json(cardPreUpdate);
    } else {
      res.status(404).json({ error: 'No such card.' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const deleteCard: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId, deckId, cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(404).json({ error: 'No such card.' });
    return;
  }

  try {
    const card = await cardCollection.findById(cardId);
    if (card === null || !card.deckId.equals(deckId)) {
      throw new Error('No such card exists for this deck.');
    }

    const deck = await deckCollection.findById(deckId);
    if (deck === null || !deck.topicId.equals(topicId)) {
      throw new Error('No such deck exists for this topic.');
    }

    const topic = await topicCollection.findById(deck.topicId);
    if (topic === null || !topic.userId.equals(req.user?._id)) {
      throw new Error('No such topic exists for this user.');
    }

    const deletedCard = await cardCollection.findOneAndDelete(
      { _id: cardId },
    );

    if (deletedCard !== null) {
      res.status(200).json(deletedCard);
    } else {
      res.status(404).json({ error: 'No such card.' });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

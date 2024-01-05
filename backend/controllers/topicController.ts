import { type RequestHandler, type Request, type Response } from 'express';
import topicCollection from '../models/topicModel';
import isFilled from '../utilities/isFilled';
import mongoose from 'mongoose';

export const getAllTopics: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  try {
    const topics = await topicCollection.find({ userId: req.user });
    res.status(200).json(topics);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const createTopic: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicName }: { topicName: string } = req.body;

  if (!isFilled(topicName)) {
    res.status(400).json({
      error: 'Please provide a title name.',
      missingFields: ['name'],
    });
    return;
  };

  try {
    const newTopic = await topicCollection.create({ userId: req.user, topicName });
    res.status(200).json(newTopic);
  } catch (err) {
    if (err instanceof Error) {
      let errMsg = '';

      const errorCode = 'code' in err ? err.code : null;

      if (errorCode === 11000 || errorCode === '11000') {
        errMsg = 'The topic name already exists.';
      } else {
        errMsg = err.message;
      }
      res.status(400).json({ error: errMsg });
    }
  }
}) as RequestHandler;

export const updateTopic: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;
  const { topicName }: { topicName: string } = req.body;

  if (!isFilled(topicName)) {
    res.status(400).json({
      error: 'Please provide a title name.',
    });
    return;
  };

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    res.status(404).json({ error: 'Invalid topic ID.' });
    return;
  }

  try {
    const topicPreUpdate = await topicCollection.findOneAndUpdate(
      { _id: topicId, userId: req.user?._id },
      { topicName },
    );

    if (topicPreUpdate !== null) {
      res.status(200).json(topicPreUpdate);
    } else {
      res.status(404).json({ error: 'No such topic.' });
    }
  } catch (err) {
    if (err instanceof Error && 'code' in err) {
      const message = err.code === 11000 ? 'A topic with this name alraedy exists.' : err.message;
      res.status(400).json({ error: message });
    }
  }
}) as RequestHandler;

export const deleteTopic: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { topicId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    res.status(404).json({ error: 'Invalid topic ID.' });
    return;
  }

  try {
    const deletedTopic = await topicCollection.findOneAndDelete(
      { _id: topicId, userId: req.user?._id },
    );

    if (deletedTopic !== null) {
      res.status(200).json(deletedTopic);
    } else {
      res.status(404).json({ error: 'No such topic.' });
    }
  } catch (err) {
    if (err instanceof Error && 'code' in err) {
      const message = err.code === 11000 ? 'A topic with this name alraedy exists.' : err.message;
      res.status(400).json({ error: message });
    }
  }
}) as RequestHandler;

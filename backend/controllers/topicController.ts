import { type RequestHandler, type Request, type Response } from 'express';
import topicCollection from '../models/topicModel';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

export const getTopics: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  try {
    const topics = await topicCollection.find({}).select('topicName').sort({ topicName: 'asc' });
    res.status(200).json(topics);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

export const createTopic: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { userId, topicName } = req.body;

  if (topicName === '') {
    res.status(400).json({
      error: 'Please provide a title name.',
    });
    return;
  };

  try {
    const newTopic = await topicCollection.create({ userId, topicName });
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
  const { topicId, topicName }: { topicId: string, topicName: string } = req.body;

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    res.status(404).json({ error: 'No such topic.' });
    return;
  }

  const updatedTopic = await topicCollection.findOneAndUpdate(
    { _id: topicId },
    { topicName },
  );

  if (updatedTopic !== null) {
    res.status(200).json(updateTopic);
  } else {
    res.status(404).json({ error: 'No such topic.' });
  }
}) as RequestHandler;

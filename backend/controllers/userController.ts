import { type RequestHandler, type Request, type Response } from 'express';
import userCollection from '../models/userModel';
import jwt from 'jsonwebtoken';
import { type ObjectId } from 'mongodb';

export interface AuthToken {
  _id: ObjectId
};

const createToken = (_id: ObjectId): string => {
  return jwt.sign({ _id }, process.env.SECRET ?? '', { expiresIn: '3d' });
};

// login user
export const loginUser: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string, password: string } = req.body;

  try {
    const user = await userCollection.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

// signup user
export const signupUser: RequestHandler = (async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string, password: string } = req.body;

  try {
    const user = await userCollection.signup(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
}) as RequestHandler;

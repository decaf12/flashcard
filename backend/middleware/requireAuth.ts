import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { type AuthToken } from '../controllers/userController';
import User from '../models/userModel';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Verify authentication
  const { authorization } = req.headers;

  if (authorization === null) {
    res.status(401).json({ error: 'Authorization token required.' });
    return;
  }

  const token = authorization?.split(' ')[1];

  try {
    if (token !== undefined && process.env.SECRET !== undefined) {
      const { _id } = jwt.verify(token, process.env.SECRET) as AuthToken;
      req.user = await User.findById(_id, _id);
      if (req.user !== null) {
        next();
      } else {
        throw Error();
      }
    } else {
      throw Error();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Request is not authorized.' });
  }
};

export default requireAuth;

import express from 'express';
import cors from 'cors';
import flashcardRouter from './routes/flashcard';
import userRouter from './routes/user';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/flashcards', flashcardRouter);
app.use('/api/user', userRouter);

export default app;

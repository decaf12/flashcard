import express from 'express';
import cors from 'cors';
import flashcardRouter from './routes/flashcard';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/flashcards', flashcardRouter);

export default app;

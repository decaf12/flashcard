import { ObjectId } from 'mongodb';
import mongoose, { type InferSchemaType } from 'mongoose';

const cardSchema = new mongoose.Schema({
  deckId: {
    type: ObjectId,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

cardSchema.index({ deckId: 'asc', question: 'asc' }, { unique: true });

export default mongoose.model('Card', cardSchema);
export type Card = InferSchemaType<typeof cardSchema> & mongoose.Document;

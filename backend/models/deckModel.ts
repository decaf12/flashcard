import { ObjectId } from 'mongodb';
import mongoose, { type InferSchemaType } from 'mongoose';

const deckSchema = new mongoose.Schema({
  topicId: {
    type: ObjectId,
    required: true,
  },
  deckName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

deckSchema.index({ topicId: 'asc', deckName: 'asc' }, { unique: true });

export default mongoose.model('Deck', deckSchema);
export type Deck = InferSchemaType<typeof deckSchema> & mongoose.Document;

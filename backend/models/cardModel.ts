import { Schema, model, type Document, type InferSchemaType } from 'mongoose';

const cardSchema = new Schema({
  deckId: {
    type: Schema.Types.ObjectId,
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

export default model('Card', cardSchema);
export type Card = InferSchemaType<typeof cardSchema> & Document;

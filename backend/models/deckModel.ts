import { Schema, model, type Document, type InferSchemaType } from 'mongoose';

const deckSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  deckName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

deckSchema.index({ topicId: 'asc', deckName: 'asc' }, { unique: true });

export default model('Deck', deckSchema);
export type Deck = InferSchemaType<typeof deckSchema> & Document;

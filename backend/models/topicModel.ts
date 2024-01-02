import mongoose, { type InferSchemaType } from 'mongoose';

const topicSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  topicName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

topicSchema.index({ userId: 'asc', topicName: 'asc' }, { unique: true });

export default mongoose.model('Topic', topicSchema);
export type Topic = InferSchemaType<typeof topicSchema> & mongoose.Document;

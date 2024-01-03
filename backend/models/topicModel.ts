import { Schema, model, type Document, type InferSchemaType } from 'mongoose';

const topicSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  topicName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

topicSchema.index({ userId: 'asc', topicName: 'asc' }, { unique: true });

export default model('Topic', topicSchema);
export type Topic = InferSchemaType<typeof topicSchema> & Document;

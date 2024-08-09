/** @format */

import { ObjectId } from 'mongodb';
import mongoose, { InferSchemaType } from 'mongoose';

const { Schema } = mongoose;
const ReviewSchema = new Schema({
  title: String,
  views: Number,
  content: String,
  author: String,
  location: String,
  address: String,
});

ReviewSchema.set('timestamps', {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

type ReviewType = InferSchemaType<typeof ReviewSchema>;

export default mongoose.models.Reviews ||
  mongoose.model('Reviews', ReviewSchema);
export type { ReviewType };

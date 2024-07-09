import { Schema, Document } from 'mongoose';

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'posts',
  },
);

export { PostSchema };

export interface Post extends Document {
  title: string;
  description: string;
  content: string;
}

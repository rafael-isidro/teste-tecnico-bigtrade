import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPost extends Document {
  postId: number,
  title: string;
  content: string;
  user_Id: number;
  published: string;
  updated?: string;
}

const PostSchema: Schema = new Schema({
  postId: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  user_Id: { type: Number, required: true },
  published: { type: String, required: true },
  updated: { type: String },
});

export default mongoose.model<IPost>('Post', PostSchema);
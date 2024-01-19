import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userId: number;
  displayName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: Number, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);

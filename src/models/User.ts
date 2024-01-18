import { Schema, model } from "mongoose";

const User = new Schema({
    displayName: String,
    email: String,
    password: String,
  });

export default model("User", User);
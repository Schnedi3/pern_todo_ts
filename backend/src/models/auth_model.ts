import { Document, Schema, model } from "mongoose";
import { Request } from "express"

// user interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// schema for the user model
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);

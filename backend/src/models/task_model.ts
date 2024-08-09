import mongoose, { Document, Schema, model } from "mongoose";

interface ITask extends Document {
  text: string;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Task = model<ITask>("Task", taskSchema);

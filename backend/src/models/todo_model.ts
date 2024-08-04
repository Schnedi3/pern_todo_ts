import { Document, Schema, model } from "mongoose";

// task interface
interface ITask extends Document {
  text: string;
  completed: boolean;
  isEditing: boolean;
}

// schema for the task model
const taskSchema = new Schema<ITask>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
});

export const Task = model<ITask>("Task", taskSchema);

import { Request, Response } from "express";

import { Task } from "../models/task_model";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error: any) {
    res.json({ message: "Failed to get tasks", error });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { text, completed } = req.body

  const newTask = new Task({ text, completed, user: req.user.id });

  try {
    await newTask.save();
    res.json(newTask);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to add task", error });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error: any) {
    res.json({ message: "Failed to complete task", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body

  try {
    const taskToUpdate = await Task.findById(id);
    if (!taskToUpdate) {
      return res.json({ message: "Task not found" });
    }

    const newText = text;
    taskToUpdate.text = newText.trim() ? newText : text;

    await taskToUpdate.save();
    res.json(taskToUpdate);
  } catch (error: any) {
    res.json({ message: "Failed to update task", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.json({ message: "Failed to delete task", error });
  }
};

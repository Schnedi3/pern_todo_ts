import { Task } from "../models/todo_model";

import { Request, Response } from "express";

// get tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error: any) {
    res.json({ message: "Failed to get tasks", error });
  }
};

// add task
export const addTask = async (req: Request, res: Response) => {
    const newTask = new Task({ text: req.body.text, user: req.user.id });

  try {
    await newTask.save();
    res.json(newTask);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to add task", error });
  }
};

// complete task
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

// update task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const taskToUpdate = await Task.findById(id);

    if (!taskToUpdate) {
      return res.json({ message: "Task not found" });
    }

    const newText = req.body.text;
    taskToUpdate.text = newText.trim() ? newText : taskToUpdate.text;

    await taskToUpdate.save();
    res.json(taskToUpdate);
  } catch (error: any) {
    res.json({ message: "Failed to update task", error });
  }
};

// delete task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.json({ message: "Failed to delete task", error });
  }
};

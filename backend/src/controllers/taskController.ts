import { Request, Response } from "express";

import {
  addTaskDB,
  completeTaskDB,
  deleteTaskDB,
  getTasksDB,
  updateTaskDB,
} from "../database/taskDB";

export const addTask = async (req: Request, res: Response) => {
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const result = await addTaskDB(text, userId);

    res.status(200).json({ success: true, message: "Task added", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await getTasksDB(userId);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { updatedText } = req.body;

  try {
    const result = await updateTaskDB(updatedText, id);

    res.status(200).json({ success: true, message: "Task updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  try {
    const result = await completeTaskDB(completed, id);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteTaskDB(id);

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

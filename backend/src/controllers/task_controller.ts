import { Request, Response } from "express";

import { pool } from "../database/db";

export const getTasks = async (req: Request, res: Response) => {
  const user_id = req.user.user_id;

  try {
    const queryString = "SELECT * FROM tasks WHERE user_id = $1";
    const { rows } = await pool.query(queryString, [user_id]);

    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { text } = req.body;
  const user_id = req.user.user_id;

  try {
    const queryString =
      "INSERT INTO tasks (text, user_id) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(queryString, [text, user_id]);

    res.status(201).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const queryString =
      "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *";
    const { rows } = await pool.query(queryString, [completed, id]);

    res.status(200).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const queryString = "UPDATE tasks SET text = $1 WHERE id = $2 RETURNING *";
    const { rows } = await pool.query(queryString, [text, id]);

    res.status(200).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const queryString = "DELETE FROM tasks WHERE id = $1";
    await pool.query(queryString, [id]);

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

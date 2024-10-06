import { pool } from "./db";

export const addTaskDB = async (text: string, userId: number) => {
  const addTaskQuery = `
    INSERT INTO task (text, user_id)
    VALUES ($1, $2)
    RETURNING *`;

  const result = await pool.query(addTaskQuery, [text, userId]);
  return result.rows[0];
};

export const completeTaskDB = async (completed: boolean, id: number) => {
  const completeTaskQuery = `
    UPDATE task
    SET completed = $1
    WHERE id = $2
    RETURNING *`;

  const result = await pool.query(completeTaskQuery, [completed, id]);
  return result.rows[0];
};

export const deleteTaskDB = async (id: number) => {
  const deleteTaskQuery = `
    DELETE FROM task
    WHERE id = $1`;

  await pool.query(deleteTaskQuery, [id]);
};

export const getTasksDB = async (userId: number) => {
  const getTasksQuery = `
    SELECT * FROM task
    WHERE user_id = $1`;

  const result = await pool.query(getTasksQuery, [userId]);
  return result.rows;
};

export const updateTaskDB = async (updatedText: string, id: number) => {
  const updateTaskQuery = `
    UPDATE task
    SET text = $1
    WHERE id = $2
    RETURNING *`;

  const result = await pool.query(updateTaskQuery, [updatedText, id]);
  return result.rows[0];
};

import { pool } from "./db";

export const loginUserDB = async (email: string) => {
  const loginQuery = `
    SELECT * FROM "user"
    WHERE email = $1`;

  const result = await pool.query(loginQuery, [email]);
  return result.rows[0];
};

export const registerUserDB = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const registerQuery = `
    INSERT INTO "user" (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const result = await pool.query(registerQuery, [
    username,
    email,
    hashedPassword,
  ]);

  return result.rows[0];
};

export const resetPasswordDB = async (
  hashedPassword: string,
  email: string
) => {
  const loginQuery = `
    UPDATE "user"
    SET password = $1
    WHERE email = $2`;

  await pool.query(loginQuery, [hashedPassword, email]);
};

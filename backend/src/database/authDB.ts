import { pool } from "./db";

export const loginGoogleDB = async (email: string, googleId: string) => {
  const loginGoogleQuery = `
    INSERT INTO "user" (email, google_id, password)
    VALUES ($1, $2, NULL)
    ON CONFLICT (email) DO UPDATE
    SET google_id = EXCLUDED.google_id
    RETURNING *`;

  const result = await pool.query(loginGoogleQuery, [email, googleId]);
  return result.rows[0];
};

export const loginUserDB = async (email: string) => {
  const loginQuery = `
    SELECT * FROM "user"
    WHERE email = $1`;

  const result = await pool.query(loginQuery, [email]);
  return result.rows[0];
};

export const registerUserDB = async (email: string, hashedPassword: string) => {
  const registerQuery = `
    INSERT INTO "user" (email, password)
    VALUES ($1, $2)
    RETURNING *`;

  const result = await pool.query(registerQuery, [email, hashedPassword]);

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

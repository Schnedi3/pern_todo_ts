import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { generateToken } from "../libs/generateToken";
import { pool } from "../database/db";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const queryString =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";

  try {
    const { rows } = await pool.query(queryString, [
      username,
      email,
      hashedPassword,
    ]);

    // generate token
    const token = generateToken(rows[0].user_id);
    // Set token as a cookie
    res.cookie("token", token);

    res.status(200).json({ user: rows[0], token: token });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(403).json({ message: "Email already exist" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const queryString = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(queryString, [email]);

    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = generateToken(rows[0].user_id);
    // Set token as a cookie
    res.cookie("token", token);

    res.status(200).json({ user: rows[0], token: token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
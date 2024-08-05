import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/auth_model";

// call .env
dotenv.config();

//create token
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if username, email and password are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    // Find the user by email
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create a token for the user
    const token = createToken(newUser._id);
    res.status(200).json({ newUser, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create a token for the user
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

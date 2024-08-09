import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/auth_model";
import { createToken } from "../helpers/createToken";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create a token for the user
    const token = createToken(newUser.id);
    res.cookie("token", token);
    res.status(200).json({ newUser, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create a token for the user
    const token = createToken(user.id);
    res.cookie("token", token);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export const profileUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userFound);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

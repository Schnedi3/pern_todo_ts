import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios";

import {
  loginGoogleDB,
  loginUserDB,
  registerUserDB,
  resetPasswordDB,
} from "../database/authDB";
import { generateToken } from "../libs/generateToken";

export const loginGoogle = async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  const tokenURL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

  try {
    const userInfo = await axios.get(tokenURL);
    const { email, sub } = userInfo.data;

    const result = await loginGoogleDB(email, sub);

    const token = generateToken(result.id);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserDB(email);

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateToken(result.id);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await registerUserDB(email, hashedPassword);

    const token = generateToken(result.id);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Registered succesfully",
      result,
      token,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(403).json({ success: false, message: "Email already exist" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await resetPasswordDB(hashedPassword, email);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

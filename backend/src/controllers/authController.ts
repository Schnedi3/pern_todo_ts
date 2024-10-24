import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";

import {
  loginGoogleDB,
  loginUserDB,
  registerUserDB,
  resetPasswordDB,
} from "../database/authDB";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../libs/generateToken";
import { ACCESS_TOKEN, JWT_SECRET, REFRESH_TOKEN } from "../config/config";

export const loginGoogle = async (req: Request, res: Response) => {
  const { access_token } = req.body;

  const tokenURL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;

  try {
    const userInfo = await axios.get(tokenURL);
    const { email, sub } = userInfo.data;

    const result = await loginGoogleDB(email, sub);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserDB(email);

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
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

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Registered succesfully",
      result,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(403).json({ success: false, message: "Email already exist" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  clearAccessCookie(res);
  clearRefreshCookie(res);
  res.status(200).json({
    success: true,
    message: "Logged out succesfully",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await resetPasswordDB(hashedPassword, email);

    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const tokenController = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Missing refresh token" });
  }

  try {
    jwt.verify(refreshToken, JWT_SECRET, (err: Error | null, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Verification failed" });
      }

      const accessToken = generateAccessToken(decoded);
      setAccessCookie(res, accessToken);

      res.status(200).json({
        success: true,
        message: "Token refreshed succesfully",
      });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const setAccessCookie = (res: Response, accessToken: string) => {
  res.cookie(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie(REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

const clearAccessCookie = (res: Response) => {
  res.clearCookie(ACCESS_TOKEN, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

const clearRefreshCookie = (res: Response) => {
  res.clearCookie(REFRESH_TOKEN, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

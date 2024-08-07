import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config";
import { IUser } from "../models/auth_model";

// Extend the Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as IUser;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

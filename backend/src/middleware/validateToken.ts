import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config";
import { IUser } from "../types/types";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Verification failed" });
      }
      req.user = user as IUser;
      next();
    });
  } catch (err: any) {
    return res.status(403).json({ success: false, message: err.message });
  }
};

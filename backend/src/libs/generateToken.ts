import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config";
import { IUser } from "../types/types";

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "20s" });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign(user, JWT_SECRET);
};

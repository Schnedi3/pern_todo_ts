import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const createToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

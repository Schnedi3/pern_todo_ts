import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;

export const COOKIE_URL = "http://localhost:5173";

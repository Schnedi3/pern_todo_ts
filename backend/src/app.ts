import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { COOKIE_URL } from "./config/config";

import authRoutes from "./routes/auth_route";
import taskRoutes from "./routes/task_route";

export const app = express();

app.use(
  cors({
    origin: COOKIE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

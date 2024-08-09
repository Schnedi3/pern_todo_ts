// required packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// activity router
import todoRoutes from "./routes/todo_route";
// user router
import authRoutes from "./routes/auth_route";

// init Express
export const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// router for the requests
app.use("/api", todoRoutes);
// user router for the requests
app.use("/api/auth", authRoutes);

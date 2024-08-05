// required packages
import express from "express";
import cors from "cors";

// activity router
import todoRouter from "./routes/todo_route";
// user router
import authRouter from "./routes/auth_route";

// init Express
export const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router for the requests
app.use("/api", todoRouter);
// user router for the requests
app.use("/api/auth", authRouter);

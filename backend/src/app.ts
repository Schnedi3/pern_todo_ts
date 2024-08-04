// required packages
import express from "express";
import cors from "cors";

// activity router
import { router as taskRoutes } from "./routes/todo_route";

// init Express
export const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// router for the requests
app.use("/api", taskRoutes);

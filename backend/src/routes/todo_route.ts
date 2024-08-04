// required packages
import { Router } from "express";
import {
  getTasks,
  addTask,
  completedTask,
  editTask,
  updateTask,
  deleteTask,
  deleteCompletedTask,
} from "../controllers/todo_controller";

export const router = Router();

// Create routes for the requests
router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.put("/tasks/:id", completedTask);
router.put("/tasks/:id/edited", editTask);
router.put("/tasks/:id/updated", updateTask);
router.delete("/tasks/:id", deleteTask);
router.delete("/tasks", deleteCompletedTask);

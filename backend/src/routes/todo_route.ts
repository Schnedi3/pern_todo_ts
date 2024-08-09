// required packages
import { Router } from "express";
import {
  getTasks,
  addTask,
  completeTask,
  updateTask,
  deleteTask,
} from "../controllers/todo_controller";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Create routes for the requests
router.get("/tasks", validateToken, getTasks);
router.post("/tasks", validateToken, addTask);
router.put("/tasks/:id", validateToken, completeTask);
router.put("/tasks/:id", validateToken, updateTask);
router.delete("/tasks/:id", validateToken, deleteTask);

export default router;

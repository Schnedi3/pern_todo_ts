import { Router } from "express";
import {
  addTask,
  completeTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

router.post("/", validateToken, addTask);
router.put("/complete/:id", validateToken, completeTask);
router.delete("/:id", validateToken, deleteTask);
router.get("/", validateToken, getTasks);
router.put("/update/:id", validateToken, updateTask);

export default router;

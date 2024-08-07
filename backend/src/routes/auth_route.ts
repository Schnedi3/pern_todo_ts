import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
} from "../controllers/auth_controller";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Create routes for the requests
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", validateToken, profileUser);

export default router;

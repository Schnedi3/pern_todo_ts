import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/auth_schema";
import {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
} from "../controllers/auth_controller";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// Create routes for the requests
router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/profile", validateToken, profileUser);

export default router;

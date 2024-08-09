import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/auth_schema";
import {
  registerUser,
  loginUser,
  logoutUser,
  profileUser,
} from "../controllers/auth_controller";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/logout", logoutUser);

export default router;

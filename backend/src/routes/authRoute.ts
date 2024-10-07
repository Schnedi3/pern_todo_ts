import { Router } from "express";

import {
  loginGoogle,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/authController";
import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/schema";

const router = Router();

router.post("/google", loginGoogle);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/register", validateSchema(registerSchema), registerUser);
router.put("/reset-password", validateSchema(loginSchema), resetPassword);

export default router;

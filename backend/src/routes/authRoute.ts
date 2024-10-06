import { Router } from "express";

import {
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/authController";
import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/schema";

const router = Router();

router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/register", validateSchema(registerSchema), registerUser);
router.put("/reset-password", validateSchema(loginSchema), resetPassword);

export default router;

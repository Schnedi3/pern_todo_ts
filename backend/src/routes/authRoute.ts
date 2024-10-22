import { Router } from "express";

import {
  loginGoogle,
  loginUser,
  registerUser,
  resetPassword,
  tokenController,
} from "../controllers/authController";
import { validateSchema } from "../middleware/validateAuth";
import { userSchema } from "../schemas/schema";

const router = Router();

router.post("/google", loginGoogle);
router.post("/login", validateSchema(userSchema), loginUser);
router.post("/register", validateSchema(userSchema), registerUser);
router.put("/reset-password", validateSchema(userSchema), resetPassword);
router.post("/refresh-token", tokenController);

export default router;

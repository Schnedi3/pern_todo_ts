import { Router } from "express";

import { registerUser, loginUser } from "../controllers/authController";
import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/schema";

const router = Router();

router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/register", validateSchema(registerSchema), registerUser);

export default router;

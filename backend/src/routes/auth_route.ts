import { Router } from "express";

import { registerUser, loginUser } from "../controllers/auth_controller";

const router = Router();

// Create routes for the requests
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

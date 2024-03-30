import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import ProfileController from "../controller/ProfileController.js";
import authMiddleware from "../middleware/Authenticate.js";

const router = Router();

// auth routes
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

//profile routes
router.get("/profile", authMiddleware, ProfileController.index);

export default router;

import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import ProfileController from "../controller/ProfileController.js";
import authMiddleware from "../middleware/Authenticate.js";
import NewsController from "../controller/NewsController.js";
import redisCache from "../DB/redis.config.js";

const router = Router();

//& Auth routes
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

//& Profile routes
router.get("/profile", authMiddleware, ProfileController.index);
router.put("/profile/:id", authMiddleware, ProfileController.update);

//& News routes
router.get("/news", redisCache.route(), NewsController.index);
router.post("/news", authMiddleware, NewsController.store);
router.get("/news/:id", authMiddleware, NewsController.show);
router.patch("/news/:id", authMiddleware, NewsController.update);
router.delete("/news/:id", authMiddleware, NewsController.destroy);

export default router;

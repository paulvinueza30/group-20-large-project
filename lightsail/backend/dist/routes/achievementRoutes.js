import { Router } from "express";
import { getAchievements, updateAchievement } from "../controllers/achievementController";
import { isAuthenticated } from "../middlewares/authMiddleware";
const router = Router();
router.get("/getAchievement", isAuthenticated, getAchievements);
router.put("/updateAchievement/:achievementId", isAuthenticated, updateAchievement);
export default router;

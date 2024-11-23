import express from "express";
import {getPredefinedAchievements,} from "../controllers/achievementController";
import {getUserAchievements, updateUserAchievement,} from "../controllers/userAchievementController";
import {isAuthenticated} from "../middlewares/authMiddleware";

const router = express.Router();

// Fetch all predefined achievements
router.get("/achievements/predefined", getPredefinedAchievements);

// Fetch all achievements for the logged-in user
router.get("/userAchievements", isAuthenticated, getUserAchievements);

// Update progress for a user's specific achievement
router.put("/updateUserAchievements/:achievementId", isAuthenticated, updateUserAchievement);

export default router;

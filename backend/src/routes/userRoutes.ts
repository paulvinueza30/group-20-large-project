import express, { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateColorPreferences,
  uploadProfilePic,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/user", isAuthenticated, getUserInfo);

router.post("/register", registerUser);
router.post("/login", loginUser);

// Preferences
router.post("/user/profile-pic", isAuthenticated, uploadProfilePic);
router.put("/user/color-preferences", isAuthenticated, updateColorPreferences);

export default router;

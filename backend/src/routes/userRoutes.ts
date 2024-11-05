import express, { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/user", isAuthenticated, getUserInfo);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

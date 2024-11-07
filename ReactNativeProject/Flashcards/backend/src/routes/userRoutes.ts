import express, { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { IUser } from "../interfaces/IUser";

const router = express.Router();
router.get(
  "/user",
  isAuthenticated,
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user as IUser;

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

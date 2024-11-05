import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", isAuthenticated, createCategory);
router.get("/all", isAuthenticated, getAllCategories);

export default router;

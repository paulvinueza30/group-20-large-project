import { Router } from "express";
import { createCategory, getAllCategories, deleteCategory, editCategory } from "../controllers/categoryController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", isAuthenticated, createCategory);
router.get("/all", isAuthenticated, getAllCategories);
router.delete("/delete/:categoryId", isAuthenticated, deleteCategory);
router.put("/edit/:categoryId", isAuthenticated, editCategory);

export default router;

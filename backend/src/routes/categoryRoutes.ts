import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController";

const router = Router();

router.post("/create", createCategory);
router.get("/all", getAllCategories);

export default router;
import express from "express";
import {
    createFlashcard,
    editFlashcard,
    deleteFlashcard,
    getNextFlashcard,
    reviewFlashcard
} from "../controllers/flashcardController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/createFlashcard/:categoryId", isAuthenticated, createFlashcard);
router.put("/editFlashcard/:id", isAuthenticated, editFlashcard);
router.delete("/deleteFlashcard/:id", isAuthenticated, deleteFlashcard);
router.get("/nextFlashcard/:categoryId", isAuthenticated, getNextFlashcard);
router.put("/reviewFlashcard/:id", isAuthenticated, reviewFlashcard);

export default router;
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
router.put("/editFlashcard", isAuthenticated, editFlashcard);
router.delete("/deleteFlashcard", isAuthenticated, deleteFlashcard);
router.get("/nextFlashcard", isAuthenticated, getNextFlashcard);
router.put("/reviewFlashcard/:id", isAuthenticated, reviewFlashcard);

export default router;
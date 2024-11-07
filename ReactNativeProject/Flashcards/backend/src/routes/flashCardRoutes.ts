import express from "express";
import { createFlashCard, editFlashCard, deleteFlashCard, getNextFlashCard, reviewFlashCard } from "../controllers/flashCardController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/createFlashCard", isAuthenticated, createFlashCard);
router.post("/editFlashCard", isAuthenticated, editFlashCard);
router.post("/deleteFlashCard", isAuthenticated, deleteFlashCard);
router.get("/nextFlashCard", isAuthenticated, getNextFlashCard);
router.post("/reviewFlashCard/:id", isAuthenticated, reviewFlashCard); 

export default router;
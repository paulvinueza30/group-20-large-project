import express from "express";
import { createFlashCard, editFlashCard, deleteFlashCard  } from "../controllers/flashCardController";

const router = express.Router();

router.post("/createFlashCard", createFlashCard);
router.post("/editFlashCard", editFlashCard);
router.post("/deleteFlashcCard", deleteFlashCard);

export default router;
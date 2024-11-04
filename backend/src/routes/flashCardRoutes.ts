import express from "express";
import { 
    createFlashCard, 
    editFlashCard, 
    deleteFlashCard, 
    getNextFlashCard, 
    reviewFlashCard 
} from "../controllers/flashCardController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/createFlashCard", isAuthenticated, createFlashCard);
router.put("/editFlashCard", isAuthenticated, editFlashCard);
router.delete("/deleteFlashCard", isAuthenticated, deleteFlashCard);
router.get("/nextFlashCard", isAuthenticated, getNextFlashCard);
router.put("/reviewFlashCard/:id", isAuthenticated, reviewFlashCard); 

export default router;
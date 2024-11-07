import express from "express";
import { createToDo, editToDo, deleteToDo, toDoDone  } from "../controllers/toDoController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/createToDo", isAuthenticated, createToDo);
router.post("/editToDo", isAuthenticated, editToDo);
router.post("/deleteToDo", isAuthenticated, deleteToDo);
router.post("/toDoDone", isAuthenticated, toDoDone);

export default router;

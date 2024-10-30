import express from "express";
import { createToDo, editToDo, deleteToDo, toDoDone  } from "../controllers/toDoController";

const router = express.Router();

router.post("/createToDo", createToDo);
router.post("/editToDo", editToDo);
router.post("/deleteToDo", deleteToDo);
router.post("/toDoDone", toDoDone);

export default router;

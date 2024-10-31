import express from "express";
import { createToDo, editToDo, deleteToDo, toDoDone  } from "../controllers/toDoController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

<<<<<<< HEAD
router.post("/createToDo", isAuthenticated, createToDo);
router.post("/editToDo", isAuthenticated, editToDo);
router.post("/deleteToDo", isAuthenticated, deleteToDo);
router.post("/toDoDone", isAuthenticated, toDoDone);
=======
router.post("/createToDo", createToDo);
router.post("/editToDo", editToDo);
router.post("/deleteToDo", deleteToDo);
router.post("/toDoDone", toDoDone);
router.post("/getToDo", getToDo);
>>>>>>> 79d7ed4 (added retrieve to do list + toDoApi.ts)

export default router;

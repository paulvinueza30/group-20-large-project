import express from "express";
import {
  createToDo,
  editToDo,
  deleteToDo,
  toDoDone,
  getToDo,
} from "../controllers/toDoController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/createToDo", isAuthenticated, createToDo);
router.put("/editToDo/:id", isAuthenticated, editToDo);
router.delete("/deleteToDo/:id", deleteToDo);
router.put("/toDoDone/:id", isAuthenticated, toDoDone);
router.get("/getToDo", isAuthenticated, getToDo);

export default router;

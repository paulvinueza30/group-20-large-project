import express from "express";
import {
  createTodo,
  editTodo,
  deleteTodo,
  todoDone,
  getTodos,
} from "../controllers/todoController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/createTodo", isAuthenticated, createTodo);
router.put("/editTodo/:id", isAuthenticated, editTodo);
router.delete("/deleteTodo/:id", isAuthenticated, deleteTodo);
router.put("/todoDone/:id", isAuthenticated, todoDone);
router.get("/getTodos", isAuthenticated, getTodos);

export default router;
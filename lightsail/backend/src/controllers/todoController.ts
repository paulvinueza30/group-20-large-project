import { Request, Response } from "express";
import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import Todo from "../models/todoModel";

// Create new Todos
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { todo } = req.body;
    const user = req.user as IUser;

    if (!todo) {
      res.status(400).json({ message: "To Do task is required" });
      return;
    }

    if (!user) {
      res.status(401).json({ message: "Unauthorized: No user found." });
      return;
    }

    const newTodo = new Todo({ todo, userId: user._id });
    await newTodo.save();

    res
      .status(201)
      .json({ message: "To Do task added successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add To Do task", error });
  }
};

// Edit Todo
export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: todoId } = req.params; // Changed TodoId to todoId
    const { todo } = req.body;
    const user = req.user as IUser;

    // Validate input
    if (!todo) {
      res.status(400).json({ message: "Updated To Do task is required" });
      return;
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId: user._id }, // Changed TodoId to todoId
      { todo }, // Changed Todo to todo
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ message: "To Do task not found or unauthorized" });
      return;
    }

    res
      .status(200)
      .json({ message: "To Do task updated successfully", todo: updatedTodo }); // Changed Todo to todo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update To Do task", error });
  }
};

// Delete task from To Do list
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: todoId } = req.params; // Changed TodoId to todoId
    const user = req.user as IUser;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: todoId, // Changed TodoId to todoId
      userId: user._id,
    });

    if (!deletedTodo) {
      res.status(404).json({ message: "To Do task not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "To Do Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete To Do Task", error });
  }
};

// Toggle task as done / not done
export const todoDone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: todoId } = req.params; // Changed TodoId to todoId
    const user = req.user as IUser;

    // Validate the ObjectId format
    if (!mongoose.isValidObjectId(todoId)) {
      // Changed TodoId to todoId
      res.status(400).json({ message: "Invalid To Do ID format" });
      return;
    }

    const existTodo = await Todo.findOne({ _id: todoId, userId: user._id }); // Changed TodoId to todoId

    if (!existTodo) {
      res.status(404).json({ message: "To Do task not found or unauthorized" });
      return;
    }

    existTodo.markDone = !existTodo.markDone;
    await existTodo.save();

    res.status(200).json({ message: "To Do task toggled", todo: existTodo }); // Changed Todo to todo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle task", error });
  }
};

// Retrieve user Todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;

    const todoList = await Todo.find({ userId: user._id }); // Changed Todolist to todoList
    res.status(200).json({ message: "To Do list retrieved", todoList }); // Changed Todolist to todoList
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve To Do list", error });
  }
};

import { Request, Response } from "express";
import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";
import ToDo from "../models/toDoModel";

// Create new To Dos
export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { toDo } = req.body;
    const user = req.user as IUser;

    if (!toDo) {
      res.status(400).json({ message: "To Do task is required" });
      return;
    }

    if (!user) {
      res.status(401).json({ message: "Unauthorized: No user found." });
      return;
    }
    const newToDo = new ToDo({ toDo, userId: user._id });
    await newToDo.save();

    res
      .status(201)
      .json({ message: "To Do task added successfully", toDo: newToDo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add To Do task", error });
  }
};
// Edit todo
export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: todoId } = req.params;
    const { toDo } = req.body;
    const user = req.user as IUser;

    // Validate input
    if (!toDo) {
      res.status(400).json({ message: "Updated To Do task is required" });
      return;
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      { _id: todoId, userId: user._id },
      { toDo },
      { new: true }
    );

    if (!updatedToDo) {
      res.status(404).json({ message: "To Do task not found or unauthorized" });
      return;
    }

    res
      .status(200)
      .json({ message: "To Do task updated successfully", toDo: updatedToDo });
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
    const { id: todoId } = req.params;
    const user = req.user as IUser;

    const deletedToDo = await ToDo.findOneAndDelete({
      _id: todoId,
      userId: user._id,
    });

    if (!deletedToDo) {
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
    const { id: todoId } = req.params;
    const user = req.user as IUser;

    // Validate the ObjectId format
    if (!mongoose.isValidObjectId(todoId)) {
      res.status(400).json({ message: "Invalid To Do ID format" });
      return;
    }

    const existToDo = await ToDo.findOne({ _id: todoId, userId: user._id });

    if (!existToDo) {
      res.status(404).json({ message: "To Do task not found or unauthorized" });
      return;
    }

    existToDo.markDone = !existToDo.markDone;
    await existToDo.save();

    res.status(200).json({ message: "To Do task toggled", toDo: existToDo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle task", error });
  }
};
// Retrieve user todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;

    const toDolist = await ToDo.find({ userId: user._id });
    res.status(200).json({ message: "To Do list retrieved", toDolist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve To Do list", error });
  }
};

import { Request, Response } from "express";
import ToDo from "../models/toDoModel"; // Ensure this path is correct
import mongoose from "mongoose";

// Create new To Dos
export const createToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { toDo } = req.body; // Ensure the request body contains the 'toDo' field

    if (!toDo) {
      res.status(400).json({ message: "To Do task is required" });
      return;
    }

    const newToDo = new ToDo({ toDo }); // Use the correctly capitalized model
    await newToDo.save();

    res
      .status(201)
      .json({ message: "To Do task added successfully", toDo: newToDo });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Failed to add To Do task", error });
  }
};

// Edit To Do
export const editToDo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { toDo } = req.body;

    // Validate input
    if (!toDo) {
      res.status(400).json({ message: "Updated To Do task is required" });
      return;
    }

    const updatedToDo = await ToDo.findByIdAndUpdate(
      id,
      { toDo, editedAt: new Date() },
      { new: true }
    );

    if (!updatedToDo) {
      res.status(404).json({ message: "To Do task not found" });
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
export const deleteToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedToDo = await ToDo.findByIdAndDelete(id);

    if (!deletedToDo) {
      res.status(404).json({ message: "To Do Task not found" });
      return;
    }
    res.status(200).json({ message: "To Do Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete To Do Task", error });
  }
};

// Toggle task as done / not done
export const toDoDone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid To Do ID format" });
      return;
    }

    const existToDo = await ToDo.findById(id);

    if (!existToDo) {
      res.status(404).json({ message: "To Do task not found" });
      return;
    }

    // Toggle the markDone status
    existToDo.markDone = !existToDo.markDone;
    await existToDo.save();

    res.status(200).json({ message: "To Do task toggled", toDo: existToDo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle task", error });
  }
};
// Retrieve all To Dos
export const getToDo = async (req: Request, res: Response): Promise<void> => {
  try {
    const toDolist = await ToDo.find();
    res.status(200).json({ message: "To Do list retrieved", toDolist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve To Do list", error });
  }
};

import { Request, Response } from "express";
import toDo from "../models/toDoModel";

// Create new To Do
export const createToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { toDo, markDone, createdAt } = req.body;
    const newToDo = new toDo({ toDo, markDone, createdAt });
    await newToDo.save();
    res
      .status(201)
      .json({ message: "To Do task added successfully", toDo: newToDo });
  } catch (error) {
    res.status(500).json({ message: "Failed to add To Do task", error });
  }
};

// Edit toDo
export const editToDo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { toDo, markDone, createdAt } = req.body;
    const updatedToDo = await toDo.findByIdAndUpdate(
      id,
      { toDo, markDone, createdAt },
      { new: true }
    );

    if (!updatedToDo) {
      res.status(404).json({ message: "To Do task not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "To Do task updateed successfully", toDo: updatedToDo });
  } catch (error) {
    res.status(500).json({ message: "Failed to update To Do task", error });
  }
};

// delete task from to do list
export const deleteToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedToDo = await toDo.findByIdAndDelete(id);

    if (!deletedToDo) {
      res.status(404).json({ message: "To Do Task not found" });
      return;
    }
    res.status(200).json({ message: "To Do Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete To Do Task" });
  }
};

// mark task as done
export const toDoDone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const markedDone = await toDo.findByIdAndUpdate(
      id,
      { markDone: true },
      { new: true }
    );

    if (!markedDone) {
      res.status(404).json({ message: "To Do task not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "To Do task marked as done", toDo: markedDone });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark task as done", error });
  }
};

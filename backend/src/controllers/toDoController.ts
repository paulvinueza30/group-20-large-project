import { Request, Response } from "express";
import toDo from "../models/toDoModel";

// Create new To Do 
export const createToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { toDo } = req.body;
	const newToDo = new toDo({ toDo });
	await newToDo.save();
        res.status(201).json({ message: "To Do task added successfully", toDo: newToDo });
    } catch (error) {
	res.status(500).json({ message: "Failed to add To Do task", error });
    }
};

// Edit toDo
export const editToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
	const { toDo } = req.body;
	const updatedToDo = await toDo.findByIdAndUpdate(
	id,
	{ toDo, editedAt: new Date() },
	{ new: true }
	);

	if (!updatedToDo) {
	    res.status(404).json({ message: "To Do task not found" });
	    return;
	}
	res.status(200).json({ message: "To Do task updated successfully", toDo: updatedToDo });
    } catch (error) {
	res.status(500).json({ message: "Failed to update To Do task", error });
    }
};

// delete task from to do list
export const deleteToDo = async ( req: Request, res: Response ): Promise<void> => {
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

// toggle task as done / not done
export const toDoDone = async (req: Request, res: Response): Promise<void> => {
    try {
	const { id } = req.params;
	const existToDo = await toDo.findById(id);

	if (!existToDo) {
	    res.status(404).json({ message: "To Do task not found" });
	    return;
	}

	existToDo.markDone = !existToDo.markDone;
	await existToDo.save();

	res.status(200).json({ message: "To Do task toggled", toDo: existToDo });
    } catch (error) {
	res.status(500).json({ message: "Failed to toggle task", error });
    }
};

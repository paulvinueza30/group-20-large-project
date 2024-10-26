import { Request, Response } from "express";
import flashCard from "../models/flashCardModel";

//create flashCard
export const createFlashCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { frontSide, backSide, category, createdAt } = req.body;
        const newFlashCard = new flashCard({ frontSide, backSide, category, createdAt});
        await newFlashCard.save();
        res.status(201).json({ message: "Flashcard created successfully", flashCard: newFlashCard });
    } catch (error) {
        res.status(500).json({message: "Failed to create Flashcard", error});
    }
};
//edit flashCard
export const editFlashCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { frontSide, backSide, category, createdAt } = req.body;
        const updatedFlashCard = await flashCard.findByIdAndUpdate(
          id,
          { frontSide, backSide, category, createdAt },
          { new: true }
        );

        if (!updatedFlashCard) {
            res.status(404).json({ message: "Flashcard not found" });
            return;
        }
        res.status(200).json({ message: "FlashCard updated successfuly", flashCard: updatedFlashCard});
    } catch (error) {
        res.status(500).json({ message: "Failed to update flashcard", error });
    }
};

//delete flashCard
export const deleteFlashCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedFlashCard = await flashCard.findByIdAndDelete(id);

        if (!deletedFlashCard) {
            res.status(404).json({ message: "Flashcard not found" });
            return;
        }
        res.status(200).json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete flashcard", error });

    }
};
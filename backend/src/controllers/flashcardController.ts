import { Request, Response } from "express";
import flashcard from "../models/flashcardModel";
import Category from "../models/categoryModel";
import QueueController from "../services/queueController";
import { IUser } from "../interfaces/IUser";

const queueController = new QueueController();

// Create Flashcard
export const createFlashcard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { frontSide, backSide, category } = req.body;
        const user = req.user as IUser;
        const userId = user._id;

        // Verify the category exists and belongs to the user
        const categoryDoc = await Category.findOne({ _id: category, userId });
        if (!categoryDoc) {
            res.status(404).json({ message: "Category not found or does not belong to the user" });
            return;
        }

        const newFlashcard = new flashcard({
            frontSide,
            backSide,
            category: categoryDoc._id,
            userId,
        });

        await newFlashcard.save();
        res.status(201).json({
            message: "Flashcard created successfully",
            flashcard: newFlashcard,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create flashcard", error });
    }
};

// Edit Flashcard
export const editFlashcard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { frontSide, backSide } = req.body;
        const user = req.user as IUser;
        const userId = user._id;

        const updatedFlashcard = await flashcard.findOneAndUpdate(
            { _id: id, userId },
            { frontSide, backSide, editedAt: Date.now() },
            { new: true }
        );

        if (!updatedFlashcard) {
            res.status(404).json({ message: "Flashcard not found or does not belong to the user" });
            return;
        }

        res.status(200).json({ message: "Flashcard updated successfully", flashcard: updatedFlashcard });
    } catch (error) {
        res.status(500).json({ message: "Failed to update flashcard", error });
    }
};

// Delete Flashcard
export const deleteFlashcard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = req.user as IUser;
        const userId = user._id;

        const deletedFlashcard = await flashcard.findOneAndDelete({ _id: id, userId });

        if (!deletedFlashcard) {
            res.status(404).json({ message: "Flashcard not found or does not belong to the user" });
            return;
        }
        res.status(200).json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete flashcard", error });
    }
};

// Get Next Flashcard Due for Review
export const getNextFlashcard = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query;
    const user = req.user as IUser;
    const userId = user._id.toString();

    if (!category || typeof category !== "string") {
        res.status(400).json({ message: "Category is required and must be a string" });
        return;
    }

    try {
        await queueController.initializeQueue(category, userId);
        const nextCard = queueController.getNextCard();

        if (!nextCard) {
            res.status(404).json({ message: "No flashcards due for review in this category" });
            return;
        }

        res.json(nextCard);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flashcard", error });
    }
};

// Review Flashcard
export const reviewFlashcard = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { feedback } = req.body;

    // Validate feedback
    if (!['Forgot', 'Hard', 'Good', 'Easy'].includes(feedback)) {
        res.status(400).json({ message: "Invalid feedback" });
        return;
    }

    try {
        // Retrieve userId from req.user
        const user = req.user as IUser;
        const userId = user._id.toString();

        // Check if the flashcard exists and belongs to the user
        const card = await flashcard.findOne({ _id: id, userId });
        if (!card) {
            res.status(404).json({ message: "Flashcard not found or does not belong to the user" });
            return;
        }

        // Update due date based on feedback
        await queueController.reviewCard(id, feedback);
        res.json({ message: "Flashcard reviewed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error reviewing flashcard", error });
    }
};


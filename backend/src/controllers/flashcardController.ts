import { Request, Response } from "express";
import flashcard from "../models/flashcardModel";
import Category from "../models/categoryModel";
import QueueController from "../services/queueController";
import { IUser } from "../interfaces/IUser";
import mongoose from "mongoose";

const queueController = new QueueController();

// Create Flashcard
export const createFlashcard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { frontSide, backSide } = req.body;
    const categoryId = req.params.categoryId;
    const user = req.user as IUser;
    const userId = user._id;

    // Validate if categoryId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    // Verify the category exists and belongs to the user
    const categoryDoc = await Category.findOne({ _id: categoryId, userId });
    if (!categoryDoc) {
      res
        .status(404)
        .json({ message: "Category not found or does not belong to the user" });
      return;
    }

    // Create the flashcard
    const newFlashcard = new flashcard({
      frontSide,
      backSide,
      category: categoryDoc._id,
      userId,
    });

    await newFlashcard.save();

    // Increment the cardCount in the associated category
    categoryDoc.cardCount += 1;
    await categoryDoc.save();

    res.status(201).json({
      message: "Flashcard created successfully",
      flashcard: newFlashcard,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create flashcard", error });
  }
};

// Edit Flashcard
export const editFlashcard = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      res
        .status(404)
        .json({
          message: "Flashcard not found or does not belong to the user",
        });
      return;
    }

    res
      .status(200)
      .json({
        message: "Flashcard updated successfully",
        flashcard: updatedFlashcard,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to update flashcard", error });
  }
};

// Delete Flashcard
export const deleteFlashcard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.user as IUser;
    const userId = user._id;

    // Find and delete the flashcard
    const flashcardToDelete = await flashcard.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!flashcardToDelete) {
      res
        .status(404)
        .json({
          message: "Flashcard not found or does not belong to the user",
        });
      return;
    }

    // Decrement the cardCount in the associated category
    const categoryDoc = await Category.findById(flashcardToDelete.category);
    if (categoryDoc && categoryDoc.userId.toString() === userId.toString()) {
      categoryDoc.cardCount -= 1;
      await categoryDoc.save();
    }

    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete flashcard", error });
  }
};

// Get Next Flashcard Due for Review
export const getNextFlashcard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.categoryId;
  const user = req.user as IUser;
  const userId = user._id;

  try {
    // Validate if categoryId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    // Verify the category exists and belongs to the user
    const categoryDoc = await Category.findOne({ _id: categoryId, userId });
    if (!categoryDoc) {
      res
        .status(404)
        .json({ message: "Category not found or does not belong to the user" });
      return;
    }
    const strUserId = userId.toString();
    await queueController.initializeQueue(categoryId, strUserId);
    const nextCard = queueController.getNextCard();

    if (!nextCard) {
      res.status(204).json({ message: "No flashcards due for review in this category" });
      return;
  }
  

    res.json(nextCard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flashcard", error });
  }
};

// Review Flashcard
export const reviewFlashcard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { feedback } = req.body;
  const user = req.user as IUser;
  const userId = user._id;

  // Validate feedback
  if (!["Forgot", "Hard", "Good", "Easy"].includes(feedback)) {
    res.status(400).json({ message: "Invalid feedback" });
    return;
  }

  try {
    // Check if the flashcard exists and belongs to the user
    const card = await flashcard.findOne({ _id: id, userId });
    if (!card) {
      res
        .status(404)
        .json({
          message: "Flashcard not found or does not belong to the user",
        });
      return;
    }

    // Update due date based on feedback
    await queueController.reviewCard(id, feedback);
    res.json({ message: "Flashcard reviewed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error reviewing flashcard", error });
  }
};

// Get All Flashcards in a Category (Non-Review Mode)
export const getAllFlashcards = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.categoryId;
    const user = req.user as IUser;
    const userId = user._id;

    // Validate if categoryId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    // Verify the category exists and belongs to the user
    const categoryDoc = await Category.findOne({ _id: categoryId, userId });
    if (!categoryDoc) {
      res.status(404).json({ message: "Category not found or does not belong to the user" });
      return;
    }

    // Find all flashcards in the category
    const flashcards = await flashcard.find({ category: categoryId, userId });
    console.log("Flashcards found for category:", flashcards); // Log the retrieved flashcards
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch flashcards", error });
  }
};
import { Request, Response } from "express";
import Category from "../models/categoryModel";
import flashcard from "../models/flashcardModel";
import { IUser } from "../interfaces/IUser";

// Create Category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("req.user:", req.user);
        const { name } = req.body;
        const user = req.user as IUser;
        const userId = user._id;  // Retrieve userId from req.user

        // Check if a category with the same name already exists for this user
        const existingCategory = await Category.findOne({ name: name.toLowerCase(), userId });
        if (existingCategory) {
            res.status(400).json({ message: `Category '${name}' already exists for this user.` });
            return;
        }

        // Create a new category if no duplicate was found
        const newCategory = new Category({
            name: name.toLowerCase(),  // Normalize name to lowercase for consistency
            userId,
        });

        await newCategory.save();
        res.status(201).json({
            message: "Category created successfully",
            category: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create category", error });
    }
};

// Get All Categories for the Logged-In User
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user as IUser;
        const userId = user._id;  // Retrieve userId from req.user

        const categories = await Category.find({ userId });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error });
    }
};

// Delete Category and associated flashcards
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.categoryId;
        const user = req.user as IUser;
        const userId = user._id;

        // Check if the category exists and belongs to the user
        const categoryDoc = await Category.findOneAndDelete({ _id: categoryId, userId });
        if (!categoryDoc) {
            res.status(404).json({ message: "Category not found or does not belong to the user" });
            return;
        }

        // Delete all flashcards associated with the category
        const deletedFlashcards = await flashcard.deleteMany({ category: categoryId, userId });

        res.status(200).json({
            message: "Category and associated flashcards deleted successfully",
            deletedFlashcards: deletedFlashcards.deletedCount
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category and flashcards", error });
    }
};

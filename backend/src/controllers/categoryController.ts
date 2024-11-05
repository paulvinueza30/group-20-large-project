import { Request, Response } from "express";
import Category from "../models/categoryModel";

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const normalizedCategory = name.toLowerCase();

        const existingCategory = await Category.findOne({ name: normalizedCategory });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }

        const newCategory = new Category({ name: normalizedCategory });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find().sort("name").exec();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error });
    }
};

//maybe also a delete category later

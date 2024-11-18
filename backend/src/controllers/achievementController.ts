import { Request, Response } from "express";
import Achievement from "../models/achievmentModel";

export const getPredefinedAchievements = async (req: Request, res: Response): Promise<void> => {
    try {
        const achievements = await Achievement.find({});
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch predefined achievements", error });
    }
};

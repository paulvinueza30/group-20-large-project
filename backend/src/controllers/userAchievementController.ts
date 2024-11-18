import { Request, Response } from "express";
import UserAchievement from "../models/userAchievementModel";
import Achievement from "../models/achievmentModel";
import { IUser } from "../interfaces/IUser";
import Category from "../models/categoryModel";

// Fetch all achievements for the logged-in user
export const getUserAchievements = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.user:", req.user);
    const user = req.user as IUser;
    const userId = user._id;  // Retrieve userId from req.user

    const userAchievements = await UserAchievement.find({ userId }).populate("achievementId");
    res.status(200).json(userAchievements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user achievements", error });
  }
};

export const incrementUserAchievement = async (
  userId: string,
  type: "Player" | "Deck" | "Streak",
  incrementBy: number,
  options: { categoryId?: string } = {}
): Promise<void> => {
  try {
    // Get the next incomplete achievement ID for the user and type
    const achievementId = await UserAchievement.getIncompleteAchievementId(userId, type);
    if (!achievementId) {
      console.log(`No incomplete achievement found for type '${type}'.`);
      return;
    }

    const userAchievement = await UserAchievement.findOne({ userId, achievementId });
    if (!userAchievement) {
      console.error(`UserAchievement for achievement ID '${achievementId}' not found for user ${userId}.`);
      return;
    }

    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      console.error(`Achievement with ID '${achievementId}' not found.`);
      return;
    }

    // Handle achievement types
    if (achievement.type === "Player") {
      userAchievement.progress += incrementBy;
    } else if (achievement.type === "Deck" && options.categoryId) {
      const category = await Category.findById(options.categoryId);
      if (!category) {
        console.error(`Category '${options.categoryId}' not found.`);
        return;
      }
      userAchievement.progress = Math.min(userAchievement.progress + category.categoryExperience, achievement.goal);
    } else if (achievement.type === "Streak" && options.categoryId) {
      const category = await Category.findById(options.categoryId);
      if (!category) {
        console.error(`Category '${options.categoryId}' not found.`);
        return;
      }
      if (category.streakCount > userAchievement.progress) {
        userAchievement.progress = category.streakCount;
      }
    }

    // Check if achievement is complete
    if (userAchievement.progress >= achievement.goal) {
      userAchievement.isCompleted = true;
    }

    await userAchievement.save();
  } catch (error) {
    console.error("Error incrementing user achievement:", error);
    throw error;
  }
};

// Update a specific achievement's progress manually
export const updateUserAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.user:", req.user);
    const user = req.user as IUser;
    const userId = user._id;  // Retrieve userId from req.userconst userId = req.user._id;
    const { achievementId } = req.params;
    const { progress } = req.body;

    const userAchievement = await UserAchievement.findOne({ userId, achievementId });
    if (!userAchievement) {
      res.status(404).json({ message: "User achievement not found" });
      return;
    }

    userAchievement.progress = progress;
    const achievement = await Achievement.findById(achievementId);

    if (achievement && progress >= achievement.goal) {
      userAchievement.isCompleted = true;
    }

    await userAchievement.save();
    res.status(200).json({ message: "Achievement updated successfully", userAchievement });
  } catch (error) {
    res.status(500).json({ message: "Failed to update achievement", error });
  }
};

import { Schema, model } from "mongoose";
import Achievement from "../models/achievmentModel";
import { IUserAchievement, IUserAchievementModel } from "../interfaces/IUserAchievement";

const userAchievementSchema = new Schema<IUserAchievement>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  achievementId: {
    type: Schema.Types.ObjectId,
    ref: "Achievement",
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

userAchievementSchema.statics.getIncompleteAchievementId = async function (
  userId: string,
  type: "Player" | "Deck" | "Streak"
): Promise<string | null> {
  try {
    let achievementName: string;

    if (type === "Player") {
      // Iterate levels (e.g., Reach Level {5, 10, 15, ...})
      for (let i = 1; ; i++) {
        const goal = i * 5; // Goals are multiples of 5
        achievementName = `Reach Level ${goal}`;
        const achievement = await Achievement.findOne({ name: achievementName });
        if (!achievement) break; // Stop if achievement not found

        const userAchievement = await UserAchievement.findOne({
          userId,
          achievementId: achievement._id,
          isCompleted: false, // Only look for incomplete achievements
        });

        if (userAchievement) {
          return userAchievement.achievementId.toString(); // Return the ID of the first incomplete achievement
        }
      }
    } else if (type === "Deck") {
      // XP in one deck (e.g., Gain {10, 50, 100, ...} XP in One Deck)
      const xpGoals = [10, 50, 100, 200, 500, 1000]; // Predefined XP milestones
      for (const goal of xpGoals) {
        achievementName = `Gain ${goal} XP in One Deck`;
        const achievement = await Achievement.findOne({ name: achievementName });
        if (!achievement) continue;

        const userAchievement = await UserAchievement.findOne({
          userId,
          achievementId: achievement._id,
          isCompleted: false, // Only look for incomplete achievements
        });

        if (userAchievement) {
          return userAchievement.achievementId.toString(); // Return the ID of the first incomplete achievement
        }
      }
    } else if (type === "Streak") {
      // Streak achievements (e.g., 1 Week Streak, 2 Weeks Streak, ...)
      const streakGoals = [
        "1 Week Streak",
        "2 Weeks Streak",
        "1 Month Streak",
        "3 Months Streak",
        "6 Months Streak",
        "1 Year Streak",
      ];
      for (const streakName of streakGoals) {
        const achievement = await Achievement.findOne({ name: streakName });
        if (!achievement) continue;

        const userAchievement = await UserAchievement.findOne({
          userId,
          achievementId: achievement._id,
          isCompleted: false, // Only look for incomplete achievements
        });

        if (userAchievement) {
          return userAchievement.achievementId.toString(); // Return the ID of the first incomplete achievement
        }
      }
    }

    return null; // No matching incomplete achievement found
  } catch (error) {
    console.error("Error in getIncompleteAchievementId:", error);
    throw error;
  }
};

const UserAchievement = model<IUserAchievement, IUserAchievementModel>("UserAchievement", userAchievementSchema);

export default UserAchievement
import { Document, Model, Types } from "mongoose";

export interface IUserAchievement extends Document {
  userId: Types.ObjectId;
  achievementId: Types.ObjectId;
  progress: number;
  isCompleted: boolean;
}

export interface IUserAchievementModel extends Model<IUserAchievement> {
  getIncompleteAchievementId(
    userId: string,
    type: "Player" | "Deck" | "Streak"
  ): Promise<string | null>;
}
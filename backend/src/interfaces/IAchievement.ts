import { Document, Types } from "mongoose";

export interface IAchievement extends Document {
    name: string;          // Name of the achievement
    description: string;   // What the achievement is about
    type: "Player" | "Deck" | "Streak"; // Category of the achievement
    goal: number;          // Target value (e.g., 10 XP, 2 decks)
  }
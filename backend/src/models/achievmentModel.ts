import { Schema, model, Types } from "mongoose";
import { IAchievement } from "../interfaces/IAchievement";

const achievementSchema = new Schema<IAchievement>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["Player", "Deck", "Streak"], required: true },
  goal: { type: Number, required: true },
});

const Achievement = model("Achievement", achievementSchema);

export default Achievement;

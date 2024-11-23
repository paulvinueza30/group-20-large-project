import { Schema, model } from "mongoose";
const achievementSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Player", "Deck", "Streak"], required: true },
    goal: { type: Number, required: true },
});
const Achievement = model("Achievement", achievementSchema);
export default Achievement;

import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  colorPreferences: {
    type: Object,
    default: {
      primary: "#5C0B86",
      secondary: "#BA72E2",
    },
  },
  userExperience: {
    type: Number,
    default: 0,
  },
  userLevel: {
    type: Number,
    default: 1,
  },
  profilePic: { type: String, default: "default_user.png" },
});

// Helper function to calculate level
userSchema.methods.calculateLevel = function (): number {
  // Define the XP threshold function
  const xpThreshold = (level: number) => 100 * level; // Each level requires 100 * current level XP

  let newLevel = this.userLevel; // Start from the current level
  while (this.userExperience >= xpThreshold(newLevel)) {
    newLevel++; // Increment the level as long as XP exceeds the threshold
  }

  return newLevel;
};

// Helper function to apply level up
userSchema.methods.levelUp = async function (): Promise<void> {
  const newLevel = this.calculateLevel(); // Calculate the new level
  if (newLevel > this.userLevel) { // Check if the user has leveled up
    this.userLevel = newLevel; // Update the level
    console.log("user is now level: " + newLevel);
    await this.save(); // Save the user with the updated level
  }
};


const User = model<IUser>("User", userSchema);

export default User;

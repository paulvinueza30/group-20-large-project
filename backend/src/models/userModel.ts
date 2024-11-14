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
    xpThreshold = (level: number) => 100 * level;

    let newLevel = this.level;
    while (this.userExperience >= xpThreshold(newLevel)) {
       newlevel++;
    }
    
    return newLevel;
}; 

// Helper function to apply level up
userSchema.methods.levelUp = async function (): Promise<void> {
    const newLevel = this.calculateLevel();
    if (newLevel > this.level) {
       this.level = newLevel;
       await this.save();
    }
};

const User = model<IUser>("User", userSchema);

export default User;

import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";
import { incrementUserAchievement } from "../controllers/userAchievementController";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cardCount: {
        type: Number,
        default: 0,
    },
    categoryExperience: {
        type: Number,
        default: 0,
    },
    streakCount: {
        type: Number,
        default: 0,
    },
    cardsStudied: {
        type: Number,
        default: 0,
    },
    streakLastUpdated: {
        type: Date,
        default: null,
    },

}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'editedAt' } // Enable automatic timestamps
});

// Compound index to enforce unique category names per user
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

// Pre-save hook to normalize category names to lowercase for consistency
categorySchema.pre("save", function (next) {
    this.name = this.name.toLowerCase();
    next();
});

// Define the updateExperience method
categorySchema.methods.updateExperience = function (feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<ICategory> {
    const intervals: { [key: string]: number } = { Forgot: 0.25, Hard: 0.5, Good: 0.75, Easy: 1 };
    let newPoints = intervals[feedback];
    if (this.streakCount)
        newPoints *= 1.2;
    this.experience += newPoints;
    return this.save();
};

// Define the dailyStreakCheck method
categorySchema.methods.dailyStreakCheck = async function () {
    const currDate = new Date();

    // Ensure cardsStudied meets the threshold to update the streak
    const streakThreshold = 5; // Replace 5 with your desired value
    if (this.cardsStudied == streakThreshold) {
        // If a new day, increment the streak and update streakLastUpdated
        if (!this.streakLastUpdated || currDate.toDateString() !== this.streakLastUpdated.toDateString()) {
            this.streakCount += 1; // Increment streak
            this.streakLastUpdated = currDate; // Update streakLastUpdated
            // Increment Streak-type achievements
            await incrementUserAchievement(this.userId, "Streak", 1, { categoryId: this._id });
        }
        // Reset cardsStudied after successful streak update
        this.cardsStudied = 0;
    } else if (
        this.streakLastUpdated &&
        currDate.getTime() - this.streakLastUpdated.getTime() > 2 * 24 * 60 * 60 * 1000
    ) {
        // Reset streak if more than 2 days have passed since streakLastUpdated
        this.streakCount = 0;
        this.streakLastUpdated = null;
    }

    await this.save();
};

categorySchema.methods.hasStreakUpdatedToday = function (): boolean {
    const currDate = new Date();

    // If streakLastUpdated exists and matches today's date, the streak has already been updated
    if (this.streakLastUpdated) {
        return currDate.toDateString() === this.streakLastUpdated.toDateString();
    }

    // If streakLastUpdated does not exist, the streak has not been updated today
    return false;
};

const Category = model<ICategory>("Category", categorySchema);

export default Category;

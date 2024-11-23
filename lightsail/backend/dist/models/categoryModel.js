import { Schema, model } from "mongoose";
const categorySchema = new Schema({
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
    experience: {
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
categorySchema.methods.updateExperience = function (feedback) {
    const intervals = { Forgot: 0.25, Hard: 0.5, Good: 0.75, Easy: 1 };
    let newPoints = intervals[feedback];
    if (this.streakCount)
        newPoints *= 1.2;
    this.experience += newPoints;
    return this.save();
};
// Define the dailyStreakCheck method
categorySchema.methods.dailyStreakCheck = async function () {
    const currDate = new Date();
    if (this.streakLastUpdated && (currDate.getTime() - this.streakLastUpdated.get()) > (24 * 60 * 60 * 1000)) {
        this.streakCount = 0;
        this.streakLastUpdated = currDate;
        await this.save();
    }
};
const Category = model("Category", categorySchema);
export default Category;

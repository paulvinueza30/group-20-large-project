import { Schema, model } from "mongoose";
const flashcardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    frontSide: {
        type: String,
        required: true,
    },
    backSide: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId, // Reference to the Category model
        ref: "Category",
        required: true,
    },
    dueDate: {
        type: Date,
        default: Date.now, // Due immediately upon creation
    },
    interval: {
        type: Number,
        default: 1, // Start with 1-day interval
    },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "editedAt" }, // Automatically manages createdAt and editedAt
});
// Define an index on userId for faster lookups
flashcardSchema.index({ userId: 1 });
// Define the updateDueDate method
flashcardSchema.methods.updateDueDate = function (feedback) {
    const intervals = { Forgot: 1, Hard: 1.2, Good: 2.5, Easy: 3 };
    const multiplier = intervals[feedback];
    this.interval *= multiplier || 1;
    this.dueDate = new Date(Date.now() + this.interval * 24 * 60 * 60 * 1000);
    return this.save();
};
const flashcard = model("Flashcard", flashcardSchema);
export default flashcard;

import { Schema, model } from "mongoose";
import { IFlashcard } from "../interfaces/IFlashcard";

const flashcardSchema = new Schema<IFlashcard>(
    {
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
            type: Schema.Types.ObjectId,  // Reference to the Category model
            ref: "Category",
            required: true,
        },
        dueDate: {
            type: Date,
            default: Date.now,  // Due immediately upon creation
        },
        interval: {
            type: Number,
            default: 1,  // Start with 1-day interval
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "editedAt" },  // Automatically manages createdAt and editedAt
    }
);

// Define an index on userId for faster lookups
flashcardSchema.index({ userId: 1 });

// Define the updateDueDate method
flashcardSchema.methods.updateDueDate = function (feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<IFlashcard> {
    const intervals: { [key: string]: number } = { Forgot: 1, Hard: 1.2, Good: 2.5, Easy: 3 };
    const multiplier = intervals[feedback];
    this.interval = multiplier || 1;

    const now = new Date();
    const tentativeDueDate = new Date(now.getTime() + this.interval * 24 * 60 * 60 * 1000); // Calculate initial due date

    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDateDay = new Date(tentativeDueDate.getFullYear(), tentativeDueDate.getMonth(), tentativeDueDate.getDate());

    // Ensure dueDate is not within the same calendar day
    if (dueDateDay.getTime() === currentDate.getTime()) {
        this.dueDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Move to midnight of the next day
    } else {
        this.dueDate = tentativeDueDate;
    }

    return this.save();
};

const flashcard = model<IFlashcard>("Flashcard", flashcardSchema);

export default flashcard;

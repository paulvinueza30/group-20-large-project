import { Schema, model } from "mongoose";
import { IFlashCard } from "../interfaces/IFlashCard";

const flashCardSchema = new Schema<IFlashCard>({
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
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    editedAt: {
        type: Date,
        default: null,
    },
    dueDate: {
        type: Date,
        default: Date.now,  // Due immediately upon creation
    },
    interval: {
        type: Number,
        default: 1,  // Start with 1-day interval
    },
});

// Define the updateDueDate method (kept here in order to be called upon inside controller)
flashCardSchema.methods.updateDueDate = function(feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<IFlashCard> {
    const intervals: { [key: string]: number } = { Forgot: 1, Hard: 1.2, Good: 2.5, Easy: 3 };
    const multiplier = intervals[feedback];
    this.interval *= multiplier || 1;
    this.dueDate = new Date(Date.now() + this.interval * 24 * 60 * 60 * 1000);
    return this.save();
};

const flashCard = model<IFlashCard>("flashCard", flashCardSchema);

export default flashCard;

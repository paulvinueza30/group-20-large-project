import { Schema, model } from "mongoose";
import { IFlashCard } from "../interfaces/IFlashCard";

const flashCardSchema = new Schema<IFlashCard>({
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
});

const flashCard = model<IFlashCard>("flashCard", flashCardSchema);

export default flashCard;
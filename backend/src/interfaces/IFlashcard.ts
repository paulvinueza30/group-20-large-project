import { Document, Types } from "mongoose";

export interface IFlashcard extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    frontSide: string;
    backSide: string;
    category: Types.ObjectId;
    createdAt?: Date;
    editedAt?: Date;
    dueDate: Date;
    interval?: number;
    updateDueDate(feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<IFlashcard>;
}

import { Document, Types } from "mongoose";

export interface IFlashCard extends Document {
    userId: Types.ObjectId;
    frontSide: string;
    backSide: string;
    category: string;
    createdAt?: Date;
    editedAt?: Date;
    dueDate: Date;
    interval?: Number;
    updateDueDate(feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<IFlashCard>;
}
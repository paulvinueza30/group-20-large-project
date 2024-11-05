import { Document, Types } from "mongoose";

export interface IFlashCard extends Document {
    userId: Types.ObjectId;
    frontSide: string;
    backSide: string;
    category: Types.ObjectId;
    createdAt?: Date;
    editedAt?: Date;
    dueDate: Date;
    interval?: number;
    updateDueDate(feedback: 'Forgot' | 'Hard' | 'Good' | 'Easy'): Promise<IFlashCard>;
}

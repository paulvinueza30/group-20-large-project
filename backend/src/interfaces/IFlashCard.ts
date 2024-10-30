import { Document } from "mongoose";

export interface IFlashCard extends Document {
    frontSide: string;
    backSide: string;
    category: string;
    createdAt: Date;
    editedAt: Date;
    dueDate: Date;
    interval: Number;
}
import { Document } from "mongoose";

export interface IFlashCard extends Document {
    frontSide: string;
    backSide: string;
    category: string;
    createdAt: Date;
}
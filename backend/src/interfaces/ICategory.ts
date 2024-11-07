import { Document, Types } from "mongoose";

export interface ICategory extends Document {
    userId: Types.ObjectId;
    name: string;
    cardCount: number;
    streakCount?: number;
    experience?: number;
    cardsStudied?: number;
    streakLastUpdated?: Date;
    createdAt?: Date;
    editedAt?: Date;

}


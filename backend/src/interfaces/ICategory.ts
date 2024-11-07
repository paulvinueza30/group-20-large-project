import { Document, Types } from "mongoose";

export interface ICategory extends Document {
    userId: Types.ObjectId;
    name: string;
    cardCount: number;
    createdAt?: Date;
    editedAt?: Date;
}


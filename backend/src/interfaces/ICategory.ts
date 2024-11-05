import { Document, Types } from "mongoose";

export interface ICategory extends Document {
    userId: Types.ObjectId;
    name: string;
    createdAt?: Date;
    editedAt?: Date;
}

import { Document, Types } from "mongoose";

export interface ITodo extends Document {
  userId: Types.ObjectId;
  todo: string;
  markDone?: boolean;
  createdAt?: Date;
  editedAt?: Date | null;
}

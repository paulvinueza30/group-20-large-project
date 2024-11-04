import { Document, Types } from "mongoose";

export interface IToDo extends Document {
  userId: Types.ObjectId;
  toDo: string;
  markDone?: boolean;
  createdAt?: Date;
  editedAt?: Date | null;
}

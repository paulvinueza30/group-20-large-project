import { Document } from "mongoose";

export interface IToDo extends Document {
  toDo: string;
  markDone: boolean;
  createdAt: Date;
}

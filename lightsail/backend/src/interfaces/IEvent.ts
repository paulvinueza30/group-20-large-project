import { Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  description?: string;
  status?: "upcoming" | "completed";
  userId: Types.ObjectId;
}

import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
}

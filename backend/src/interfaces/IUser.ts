import { Document } from "mongoose";
interface IColorPreferences {
  primary: string;
  secondary: string;
}

export interface IUser extends Document {
  name: string;
  userName: string;
  email: string;
  password: string;
  colorPreferences: IColorPreferences;
  profilePic: string;
  createdAt: Date;
  userExperience: number;
  userLevel: number;
  calculateLevel(): number;
  levelUp(): Promise<void>;
}

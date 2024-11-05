import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  colorPreferences: {
    type: Object,
    default: {
      primary: "#5C0B86",
      secondary: "#BA72E2",
    },
  },
  profilePic: { type: String, default: "" },
});

const User = model<IUser>("User", userSchema);

export default User;

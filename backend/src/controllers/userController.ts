// TODO: Add login and other user funcs

import { Request, Response } from "express";
import User from "../models/userModel";

// Register user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, userName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, userName, email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

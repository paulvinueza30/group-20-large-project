// TODO: More user funcs?

import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import passport from "passport";

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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error in register user: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
export const loginUser = (
  req: Request,
  res: Response,
  next: Function
): void => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

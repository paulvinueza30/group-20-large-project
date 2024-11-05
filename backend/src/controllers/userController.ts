import { Request, Response } from "express";
import User from "../models/userModel";

import bcrypt from "bcrypt";
import passport from "../config/passport-config";
import { IUser } from "../interfaces/IUser";

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

    // Automatically log in the user after registration
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in user: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
      });
    });
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

      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          userName: user.userName,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    });
  })(req, res, next);
};

// Get user info
export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as IUser;

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    message: "User data fetched successfully",
    user: {
      _id: user._id.toString(),
      name: user.name,
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
      colorPreferences: user.colorPreferences,
      profilePic: user.profilePic,
    },
  });
};

// Preferences

// Update user color preferences
export const updateColorPreferences = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params; // Assuming userId is passed in the URL
  const { primary, secondary } = req.body; // Colors sent in the request body

  try {
    // Find the user by ID and update the color preferences
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { colorPreferences: { primary, secondary } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Color preferences updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update color preferences", error });
  }
};

import { Request, Response } from "express";
import User from "../models/userModel";
import Category from "../models/categoryModel";
import UserAchievement from "../models/userAchievementModel";
import Achievement from "../models/achievmentModel";
import bcrypt from "bcrypt";
import passport from "../config/passport-config";
import { IUser } from "../interfaces/IUser";
import upload from "../config/multer-config";

// ** Register User **
export const registerUser = async (req: Request, res: Response): Promise<any> => {
  const { name, userName, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    // Fetch predefined achievements
    const achievements = await Achievement.find({});

    // Initialize user achievements
    const userAchievements = achievements.map((achievement) => ({
      userId: user._id,
      achievementId: achievement._id,
      progress: 0,
      isCompleted: false,
    }));
    await UserAchievement.insertMany(userAchievements);

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

// ** Login User **
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

    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }

      try {
        const categories = await Category.find({ userId: user._id });
        await Promise.all(categories.map((category) => category.dailyStreakCheck()));
      } catch (error) {
        console.error("Error in login user:", error);
        return res.status(500).json({ message: "Internal server error" });
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

// ** Logout User **
export const logoutUser = (req: Request, res: Response): void => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out user:", err);
      return res.status(500).json({ message: "Internal server error during logout" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

// ** Get User Info **
export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as IUser;

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  if (user.profilePic && !user.profilePic.startsWith("/uploads/")) {
    user.profilePic = `/uploads/${user.profilePic}`;
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
      userExperience: user.userExperience,
      userLevel: user.userLevel,
    },
  });
};

// ** Update User Color Preferences **
export const updateColorPreferences = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as IUser;
  const userId = user._id;
  const { primary, secondary } = req.body;

  try {
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
    res.status(500).json({ message: "Failed to update color preferences", error });
  }
};

// ** Upload Profile Picture **
export const uploadProfilePic = async (
  req: Request,
  res: Response
): Promise<void> => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading file", error: err.message });
    }

    const user = req.user as IUser;
    const userId = user._id;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: `/uploads/${req.file?.filename}` },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile picture updated successfully",
        profilePic: updatedUser.profilePic,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile picture", error });
    }
  });
};

// ** Increment User Experience **
export const incrementUserExperience = async (
  userId: string,
  incrementBy: number
): Promise<void> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    user.userExperience += incrementBy;
    await user.levelUp(); // Automatically handles leveling up if necessary
    await user.save();
    console.log(`User ${userId} experience incremented by ${incrementBy}.`);
  } catch (error) {
    console.error("Error incrementing user experience:", error);
    throw error;
  }
};

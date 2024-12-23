import User from "../models/userModel";
import Category from "../models/categoryModel";
import bcrypt from "bcrypt";
import passport from "../config/passport-config";
import upload from "../config/multer-config";
// Register user
export const registerUser = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error in register user: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Login user
export const loginUser = (req, res, next) => {
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
                await Promise.all(categories.map(category => category.dailyStreakCheck()));
            }
            catch (error) {
                console.error("Error in login user", error);
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
// Logout user
export const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Error logging out user: ", err);
            return res.status(500).json({ message: "Internal server error during logout" });
        }
        res.status(200).json({ message: "Logout successful" });
    });
};
// Get user info
export const getUserInfo = async (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    if (user.profilePic && !user.profilePic.startsWith("/uploads/")) {
        user.profilePic = `/uploads/${user.profilePic}`; // Add /uploads/ to the default image
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
export const updateColorPreferences = async (req, res) => {
    const user = req.user;
    const userId = user._id; // Assuming userId is passed in the URL
    const { primary, secondary } = req.body; // Colors sent in the request body
    try {
        // Find the user by ID and update the color preferences
        const updatedUser = await User.findByIdAndUpdate(userId, { colorPreferences: { primary, secondary } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Color preferences updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Failed to update color preferences", error });
    }
};
// Profile picture upload handler
export const uploadProfilePic = async (req, res) => {
    // Upload the image
    upload(req, res, async (err) => {
        if (err) {
            return res
                .status(400)
                .json({ message: "Error uploading file", error: err.message });
        }
        // If file is uploaded, update user's profile picture URL
        const user = req.user;
        const userId = user._id;
        try {
            // Update the user with the new profile picture
            const updatedUser = await User.findByIdAndUpdate(userId, {
                profilePic: `/uploads/${req.file?.filename}`, // Update profilePic field
            }, { new: true } // Ensure it returns the updated user
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            // Respond with the full updated user object
            res.status(200).json({
                message: "Profile picture updated successfully",
                profilePic: updatedUser.profilePic,
            });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "Error updating profile picture", error });
        }
    });
};

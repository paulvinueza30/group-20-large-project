import { Schema, model } from "mongoose";
const userSchema = new Schema({
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
    userExperience: {
        type: Number,
        default: 0,
    },
    profilePic: { type: String, default: "default_user.png" },
});
const User = model("User", userSchema);
export default User;

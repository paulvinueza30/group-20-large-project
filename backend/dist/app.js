import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import flashcardRoutes from "./routes/flashcardRoutes";
import todoRoutes from "./routes/todoRoutes";
import eventRoutes from "./routes/eventRoutes";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables
dotenv.config({ path: "./src/.env" });
// const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // If you want to allow cookies or HTTP authentication
}));
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session management
app.use(session({
    secret: process.env.SESSION_SECRET || "PUTAKEYINTHEENVFILEEEEEE",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(passport.initialize());
app.use(passport.session());
// User,  flashcard, toDo routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/events", eventRoutes);
// Get URI from environment variables
const mongoURI = process.env.MONGODB_URI || "";
mongoose
    .connect(mongoURI)
    .then(() => {
    console.log("Connected to MongoDB");
    import("./cron/eventCleanup");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error("Database connection error:", err));

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import flashCardRoutes from "./routes/flashCardRoutes";
import toDoRoutes from "./routes/toDoRoutes";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

// Load environment variables
dotenv.config({ path: "./src/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "PUTAKEYINTHEENVFILEEEEEE",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// User, flashCard, toDo routes
app.use("/api/users", userRoutes);
app.use("/api/flashcards", flashCardRoutes);
app.use("/api/todos", toDoRoutes);

// Get URI from environment variables
const mongoURI = process.env.MONGODB_URI || "";

// Connect to MongoDB using URI
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connection successful");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

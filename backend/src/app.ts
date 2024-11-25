import https from "https";
import fs from "fs";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import flashcardRoutes from "./routes/flashcardRoutes";
import todoRoutes from "./routes/todoRoutes";
import eventRoutes from "./routes/eventRoutes";
import achievementRoutes from "./routes/achievementRoutes";
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
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);

// CORS setup - adapted to check for both development and production
const corsOptions = {
  origin:
    NODE_ENV === "production"
      ? process.env.CORS_ORIGIN
      : "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "PUTAKEYINTHEENVFILEEEEEE",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === "production",
    },
  })
);

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/achievements", achievementRoutes);

// Database connection
const mongoURI = process.env.MONGODB_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    if (NODE_ENV === "production") {
      // Use HTTPS for production
      const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
      const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
      const ca = fs.readFileSync(process.env.SSL_CA_BUNDLE_PATH, "utf8");

      const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca,
      };

      const server = https.createServer(credentials, app);
      server.listen(PORT, () => {
        console.log(`HTTPS Server running on port ${PORT}`);
      });
    } else {
      // Use HTTP for development
      app.listen(PORT, () => {
        console.log(`HTTP Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => console.error("Database connection error:", err));

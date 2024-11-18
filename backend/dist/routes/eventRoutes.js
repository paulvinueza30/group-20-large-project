import express from "express";
import { createEvent, editEvent, deleteEvent, toggleEventStatus, getEvents, } from "../controllers/eventController";
import { isAuthenticated } from "../middlewares/authMiddleware"; // Middleware for user authentication
const router = express.Router();
// Protected routes
router.post("/", isAuthenticated, createEvent);
router.put("/:id", isAuthenticated, editEvent);
router.delete("/:id", isAuthenticated, deleteEvent);
router.patch("/:id/status", isAuthenticated, toggleEventStatus);
router.get("/", isAuthenticated, getEvents);
export default router;

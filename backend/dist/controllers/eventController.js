import mongoose from "mongoose";
import Event from "../models/eventModel"; // Assuming your Event model is located here
// Create new Event
export const createEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const user = req.user; // Assuming user is attached to req
        if (!title || !date) {
            res.status(400).json({ message: "Title and Date are required" });
            return;
        }
        if (!user) {
            res.status(401).json({ message: "Unauthorized: No user found." });
            return;
        }
        const newEvent = new Event({
            title,
            date,
            description,
            userId: user._id, // Attach the user's ID to the event
        });
        await newEvent.save();
        res.status(201).json({
            message: "Event created successfully",
            event: newEvent,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create event", error });
    }
};
// Edit Event
export const editEvent = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const { title, date, description } = req.body;
        const user = req.user;
        if (!title || !date) {
            res
                .status(400)
                .json({ message: "Title and Date are required to update the event" });
            return;
        }
        const updatedEvent = await Event.findOneAndUpdate({ _id: eventId, userId: user._id }, { title, date, description }, { new: true });
        if (!updatedEvent) {
            res.status(404).json({ message: "Event not found or unauthorized" });
            return;
        }
        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update event", error });
    }
};
// Delete Event
export const deleteEvent = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const user = req.user;
        const deletedEvent = await Event.findOneAndDelete({
            _id: eventId,
            userId: user._id,
        });
        if (!deletedEvent) {
            res.status(404).json({ message: "Event not found or unauthorized" });
            return;
        }
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete event", error });
    }
};
// Toggle event status (e.g., from "upcoming" to "completed")
export const toggleEventStatus = async (req, res) => {
    try {
        const { id: eventId } = req.params;
        const user = req.user;
        // Validate ObjectId format
        if (!mongoose.isValidObjectId(eventId)) {
            res.status(400).json({ message: "Invalid Event ID format" });
            return;
        }
        const event = await Event.findOne({ _id: eventId, userId: user._id });
        if (!event) {
            res.status(404).json({ message: "Event not found or unauthorized" });
            return;
        }
        // Toggle the event status (you can customize this part)
        event.status = event.status === "upcoming" ? "completed" : "upcoming"; // Example toggle logic
        await event.save();
        res.status(200).json({
            message: "Event status toggled",
            event: event,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to toggle event status", error });
    }
};
// Retrieve user's events
export const getEvents = async (req, res) => {
    try {
        const user = req.user;
        const events = await Event.find({ userId: user._id });
        res.status(200).json({
            message: "Events retrieved successfully",
            events,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve events", error });
    }
};

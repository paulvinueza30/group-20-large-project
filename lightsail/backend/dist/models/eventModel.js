import mongoose, { Schema } from "mongoose";
const eventSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: false },
    status: {
        type: String,
        enum: ["upcoming", "completed"],
        default: "upcoming",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
// Create the Event model
const Event = mongoose.model("Event", eventSchema);
export default Event;

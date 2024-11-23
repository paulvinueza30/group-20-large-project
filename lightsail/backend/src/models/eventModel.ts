import mongoose, { Schema, Types } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

const eventSchema = new Schema<IEvent>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Create the Event model
const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;

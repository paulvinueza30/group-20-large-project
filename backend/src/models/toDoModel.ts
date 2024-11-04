import { Schema, model } from "mongoose";
import { IToDo } from "../interfaces/IToDo";
const toDoSchema = new Schema<IToDo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toDo: {
      type: String,
      required: [true, "To-do item content is required."],
    },
    markDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "editedAt" } }
);
// Add an index on userId for faster queries
toDoSchema.index({ userId: 1 });

const ToDo = model<IToDo>("ToDo", toDoSchema);
export default ToDo;

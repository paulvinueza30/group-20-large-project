import { Schema, model } from "mongoose";
import { ITodo } from "../interfaces/ITodo";
const toDoSchema = new Schema<ITodo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todo: {
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

const ToDo = model<ITodo>("ToDo", toDoSchema);
export default ToDo;

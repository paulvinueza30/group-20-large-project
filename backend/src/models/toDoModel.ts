import { Schema, model } from "mongoose";
import { IToDo } from "../interfaces/IToDo";

const toDoSchema = new Schema<IToDo>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toDo: {
    type: String,
    required: true,
  },
  markDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt: {
    type: Date,
    default: null,
  },
});

const ToDo = model<IToDo>("ToDo", toDoSchema);
export default ToDo;

import { Schema, model } from "mongoose";
import {IToDo} from "../interfaces/IToDo";

const toDoSchema = new Schema<IToDo>({
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

const toDo = model<IToDo>("toDo", toDoSchema);

export default toDo;

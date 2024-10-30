import { Schema, model } from "mongoose";
import {IToDo} from "../interfaces/IToDo";

const toDoSchema = new Schema<IToDo>({
  toDo: {
    type: String,
    required: true,
  },
  markDone: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const toDo = model<IToDo>("toDo", toDoSchema);

export default toDo;


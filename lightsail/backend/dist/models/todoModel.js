import { Schema, model } from "mongoose";
const toDoSchema = new Schema({
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
}, { timestamps: { createdAt: "createdAt", updatedAt: "editedAt" } });
// Add an index on userId for faster queries
toDoSchema.index({ userId: 1 });
const ToDo = model("ToDo", toDoSchema);
export default ToDo;

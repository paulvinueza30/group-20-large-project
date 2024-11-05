import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema = new Schema<ICategory>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "editedAt" },  // Automatically manages createdAt and editedAt
    }
);

// Pre-save hook to normalize category names to lowercase for consistency
categorySchema.pre("save", function (next) {
    this.name = this.name.toLowerCase();
    next();
});

const category = model<ICategory>("Category", categorySchema);

export default category;

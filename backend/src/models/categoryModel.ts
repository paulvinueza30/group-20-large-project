import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cardCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'editedAt' } // Enable automatic timestamps
});

// Compound index to enforce unique category names per user
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

// Pre-save hook to normalize category names to lowercase for consistency
categorySchema.pre("save", function (next) {
    this.name = this.name.toLowerCase();
    next();
});

const Category = model<ICategory>("Category", categorySchema);

export default Category;

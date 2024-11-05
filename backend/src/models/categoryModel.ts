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
});

// Set a unique index on the combination of `name` and `userId`
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

// Pre-save hook to normalize category names to lowercase for consistency
categorySchema.pre("save", function (next) {
    this.name = this.name.toLowerCase();
    next();
});

const Category = model<ICategory>("Category", categorySchema);

export default Category;

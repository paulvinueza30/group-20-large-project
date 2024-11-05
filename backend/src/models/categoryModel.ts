import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,  
    }
});

// Pre-save hook to normalize category names to lowercase for consistency
categorySchema.pre("save", function(next) {
    this.name = this.name.toLowerCase();
    next();
});

const category = model<ICategory>("Category", categorySchema);

export default category;
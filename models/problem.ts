import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema(
    {
        title: String,
        description: String
    },
    {
        timestamps: true,
    }
);

const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);

export default Problem;
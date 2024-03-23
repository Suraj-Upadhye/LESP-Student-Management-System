import mongoose, { Schema } from "mongoose";

const SubjectsSchema = new Schema(
    {
        year: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        semester: {
            type: Number,
            required: true
        },
        subject: {
            type: String,
            required: true,
        },
        mode: {
            type: Array,
            enum: [
                ["Lecture", "Tutorial"],
                ["Lecture", "Practical"],
                ["N/A"],
                ["Lecture", "Tutorial", "Practical"],
                ["Lecture"],
                ["Practical"]
            ],
            required: true
        }
        
    },

    {
        timestamps: true
    }
);

export const Subject = mongoose.model("Subject", SubjectsSchema);
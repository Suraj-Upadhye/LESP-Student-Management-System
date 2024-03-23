import mongoose, { Schema } from "mongoose";

const SubjectsSchema = new Schema(
    {
        year: {
            type: Number,
            required: [true, 'Year field is required']
        },
        branch: {
            type: String,
            required: [true, 'Branch field is required'],
        },
        semester: {
            type: Number,
            required: [true, 'Semester field is required'],
        },
        subject: {
            type: String,
            required: [true, 'Subject field is required'],
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
            required: [true, 'Mode of teaching field is required']
        },
        applicableBatchNames: {
            type: Array,
            required: [true, 'List of batches field is required']
        }
    },

    {
        timestamps: true
    }
);

export const Subject = mongoose.model("Subject", SubjectsSchema);
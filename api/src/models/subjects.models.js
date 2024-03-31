// subjects.models.js

import mongoose, { Schema } from "mongoose";

const SubjectsSchema = new Schema(
    {
        year: {
            type: String,
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
            type: [[String]],
            validate: {
                validator: function(value) {
                    const validModes = [
                        ["Lecture", "Tutorial"],
                        ["Lecture", "Practical"],
                        ["N/A"],
                        ["Lecture", "Tutorial", "Practical"],
                        ["Lecture"],
                        ["Practical"],
                        ["Tutorial"]
                    ];

                    // Check if each sub-array in the value matches one of the valid modes
                    return value.every(subArray => validModes.some(validMode => JSON.stringify(subArray) === JSON.stringify(validMode)));
                },
                message: props => `${props.value} is not a valid mode combination`
            },
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
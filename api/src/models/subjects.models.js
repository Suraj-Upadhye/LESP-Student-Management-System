import mongoose, { Schema } from "mongoose";

const SubjectsSchema = mongoose.Schema(
    {
        SubjectList:
        {
            year: {
                type: String,
                required: true
            },
            branch: {
                type: String,
                required: true
            },
            sem: {
                type: String,
                required: true
            },
            subjects:{

            }
        }
    },

    {
        timestamps: true
    }
);

export const Subjects = mongoose.model("Subjects", SubjectsSchema);
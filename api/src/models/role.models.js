import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['HOD', 'Teacher', 'Student'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Role = mongoose.model("Role", roleSchema);
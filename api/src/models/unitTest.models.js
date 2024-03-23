import mongoose, { Schema } from "mongoose";

const unitTestSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        },
        subject: {
            type: String,
            required: [true, "Subject field is required"]
        },
        ut1: {
            type: Number,
            required: false,
            default: 0
        },
        ut2: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const UnitTest = mongoose.model("UnitTest", unitTestSchema);

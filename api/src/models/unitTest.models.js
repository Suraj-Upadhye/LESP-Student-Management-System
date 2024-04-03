// unitTest.models.js


import mongoose, { Schema } from "mongoose";

const unitTestSchema = new Schema(
    {
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        },
        studentList: [
            {
                student: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
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
            }
        ]
    },
    {
        timestamps: true
    }
);

export const UnitTest = mongoose.model("UnitTest", unitTestSchema);

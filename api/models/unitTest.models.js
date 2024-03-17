import mongoose from "mongoose";

const unitTestSchema = mongoose.Schema(
    {
        UnitTest: {
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
    },
    {
        timestamps: true
    }
);

export const UnitTest = mongoose.model("UnitTest", unitTestSchema);

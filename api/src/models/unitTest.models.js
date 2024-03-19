import mongoose, { trusted } from "mongoose";

const unitTestSchema = mongoose.Schema(
    {
        subject: {
          type: String,
          required: true  
        },
        marks: {
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

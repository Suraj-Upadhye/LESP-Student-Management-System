import mongoose, { Schema } from "mongoose";

const SubjectsSchema = mongoose.Schema(
    {
        Subjects: [
            {
                Department:{
                    type: String,
                    required: true
                }
            },
            {
                Sem1: {
                    type: Schema.Types.Array,
                    required: false,
                    default: [0]
                },
                Sem2: {
                    type: Schema.Types.Array,
                    required: false,
                    default: [0]
                },
                Sem3: {
                    type: Schema.Types.Array,
                    required: false,
                    default: [0]
                },
                Sem4: {
                    type: Schema.Types.Array,
                    required: false,
                    default: [0]
                },
                Sem5: {
                    type: Schema.Types.Array,
                    required: false,
                    default: [0]
                },
                Sem6: {
                    type: Schema.Types.Array,
                    required: false,
                    default: [0]
                },
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Subjects = mongoose.model("Subjects", SubjectsSchema);
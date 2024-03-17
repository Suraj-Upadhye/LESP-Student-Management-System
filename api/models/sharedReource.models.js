import mongoose from "mongoose";

const sharedResourceSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        subjectName: {
            type: String,
            required: true,
            default: 'none'
        },
    resource: [
        {
            resourceType: {
                type: String,
                enum: ["image", "video", "pdf"],
                required: true
            },
            resourceUrl: {
                type: String,
                required: true
            },
            fileName: {
                type: String,
                required: true
            }
        }
    ]
    },

    {
        timestamps: true
    }
);


export const SharedResource = mongoose.model("SharedResource", sharedResourceSchema);


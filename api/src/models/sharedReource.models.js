import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
                    type: String,        //cloudinary url 
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

sharedResourceSchema.plugin(mongoose.mongooseAggregatePaginate)

export const SharedResource = mongoose.model("SharedResource", sharedResourceSchema);


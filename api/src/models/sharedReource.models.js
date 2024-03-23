import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const sharedResourceSchema = new Schema(
    {
        resourceFile: {
            type: {
                url: String,
                public_id: String
            },       // cloudinary url
            required: true
        },
        description: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            default: 'Notice'
        },
        resourceType: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        }
    },

    {
        timestamps: true
    }
);

sharedResourceSchema.plugin(mongoose.mongooseAggregatePaginate)

export const SharedResource = mongoose.model("SharedResource", sharedResourceSchema);


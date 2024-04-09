// sharedResource.models.js


import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const sharedResourceSchema = new Schema(
    {
        resourceFile: {
            type: String,
            required: [true, 'Please provide a file']
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        title: {
            type: String,
            required: [true, 'title field is required'],
            default: 'Notice'
        },
        resourceType: {
            type: String,
            required: [true, 'resourceType field is required'],
        },
        subject:{
            type: String,
            required: [true, 'subject name is required']
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


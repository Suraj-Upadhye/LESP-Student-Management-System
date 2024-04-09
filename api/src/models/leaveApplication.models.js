// leaveApplication.models.js

import mongoose, { Schema } from 'mongoose';

const leaveSchema = new Schema(
    {

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: "Admin"
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        },
        userType: {
            type: String,
            enum: ["Student", "Teacher"]
        }
    },
    {
        timestamps: true
    }
)

export const Leave = mongoose.model("Leave", leaveSchema);
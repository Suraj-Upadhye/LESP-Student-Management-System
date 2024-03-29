// otp.models.js

import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }, // The generated OTP
        expiresAt: {
            type: Date,
            required: true
        }, // When the OTP will be invalidated (10 minutes)
        used: {
            type: Boolean,
            required: true
        }, // Whether or not this OTP has been used
    },
    {
        timestamps: true
    }
)


export const Otp = mongoose.model("Otp", otpSchema)
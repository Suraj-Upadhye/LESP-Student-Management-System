// otp.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Otp } from "../models/otp.models.js";

// Done
// create a random otp and store it in database with expiry of 10 minutes and with email
// send the generated OTP to user's email id  using nodemailer or any other mailing service
const createAndStoreOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError("Email is missing", 400);
    }

    // if the otp is expired then remove them
    const removedOtps = removeAllExpiredOTP()
    console.log(removedOtps)

    const existingOtp = await Otp.findOne({ email });
    // if otp  already exists for this email then delete that entry first
    if (existingOtp) {
        await existingOtp.remove();
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Calculate expiry time for OTP (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    try {
        // Store the OTP in the database
        await Otp.create({
            email,
            otp: otp.toString(),
            expiresAt,
            used: false
        });

        // Send the generated OTP to the user's email using nodemailer or any other mailing service
        
        // call sendemailfuncton here

        // Respond with success message
        res.status(200).json({ success: true, message: "OTP created and sent successfully." });
    } catch (error) {
        // Handle errors
        console.error("Error creating and storing OTP:", error);
        res.status(500).json({ success: false, message: "Failed to create and store OTP." });
    }
});

// Done
// compare  the entered OTP with stored one in DB
// If matched then proceed further otherwise show error message
const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;

    try {
        // Find the OTP record in the database based on the email
        const otpRecord = await Otp.findOne({ email });

        // Check if OTP record exists and is not expired
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "OTP not found or expired." });
        }

        // Check if the entered OTP matches the stored OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }

        // If OTP is valid, proceed to the next middleware
        next();
    } catch (error) {
        // Handle errors
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Failed to verify OTP." });
    }
});

// Done
const removeAllExpiredOTP = asyncHandler(async (req, res) => {
    // Get the current date and time
    const currentDate = new Date();

    // Find all OTPs with an expiration time earlier than the current date
    const expiredOtps = await Otp.find({ expiresAt: { $lt: currentDate } });

    // Delete the expired OTPs
    const removedOtps = await Otp.deleteMany({ expiresAt: { $lt: currentDate } });

    res.status(200).json({ success: true, data: `Deleted ${removedOtps.deletedCount} expired OTPs` });
});



export {
    createAndStoreOTP,
    verifyOTP,
    removeAllExpiredOTP,

}
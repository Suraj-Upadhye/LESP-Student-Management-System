// otp.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Otp } from "../models/otp.models.js";
import { sendOTPEmail } from "../utils/sendEmail.js";

// Done
const createAndStoreOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError("Email is missing", 400);
    }

    // Remove all expired OTPs
    const removedOtps = await removeExpiredOTP();
    console.log(`Deleted ${removedOtps} expired OTPs`);

    const existingOtp = await Otp.findOne({ email });
    // if otp  already exists for this email then delete that entry first
    if (existingOtp) {
        await Otp.deleteOne(existingOtp)
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
        sendOTPEmail(email, otp);
        // Respond with success message
        res.status(200).json({ success: true, message: "OTP created and sent successfully." });
    } catch (error) {
        // Handle errors
        console.error("Error creating and storing OTP:", error);
        res.status(500).json({ success: false, message: "Failed to create and store OTP." });
    }
});

// Done
const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the OTP record in the database based on the email
        const otpRecord = await Otp.findOne({ email });

        // Check if OTP record exists and is not expired
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            throw new ApiError(400, "OTP not found or expired.");
        }

        // Check if the entered OTP matches the stored OTP
        if (otpRecord.otp !== otp) {
            throw new ApiError(400, "Invalid OTP.");
        }

        // If OTP is valid, you can mark it as used or delete it from the database
        // For example:
        // otpRecord.used = true;
        // await otpRecord.save();

        // Return success response
        res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        // Throw the error to be caught by the error handling middleware
        throw new ApiError(500, "Failed to verify OTP.");
    }
});

// Done
const removeExpiredOTP = async () => {
    // Get the current date and time
    const currentDate = new Date();

    // Find all OTPs with an expiration time earlier than the current date
    const expiredOtps = await Otp.find({ expiresAt: { $lt: currentDate } });

    // Delete the expired OTPs
    const removedOtps = await Otp.deleteMany({ expiresAt: { $lt: currentDate } });

    return removedOtps.deletedCount;
};


export {
    createAndStoreOTP,
    verifyOTP,
}
// otp.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// create a random otp and store it in database with expiry of 10 minutes and with email
// send the generated OTP to user's email id  using nodemailer or any other mailing service
const createAndStoreOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Calculate expiry time for OTP (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    try {
        // Store the OTP in the database
        await Otp.create({
            email,
            token: otp.toString(),
            expiresAt,
            used: false
        });

        // Send the generated OTP to the user's email using nodemailer or any other mailing service

        // Respond with success message
        res.status(200).json({ success: true, message: "OTP created and sent successfully." });
    } catch (error) {
        // Handle errors
        console.error("Error creating and storing OTP:", error);
        res.status(500).json({ success: false, message: "Failed to create and store OTP." });
    }
});


// compare  the entered OTP with stored one in DB
// If matched then proceed further otherwise show error message
const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, token } = req.body;

    try {
        // Find the OTP record in the database based on the email
        const otpRecord = await Otp.findOne({ email });

        // Check if OTP record exists and is not expired
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "OTP not found or expired." });
        }

        // Check if the entered OTP matches the stored OTP
        if (otpRecord.token !== token) {
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


// compare  both the fields i.e., OTP and Email
// If they are valid then call the '/verifyotp/:id' API
// Else send an error response

// email and generated otp from req.body compare with otp database
const verifyOTPAndEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the OTP record in the database based on the email
        const otpRecord = await Otp.findOne({ email });

        // Check if OTP record exists and is not expired
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "OTP not found or expired." });
        }

        // Check if the entered OTP matches the stored OTP
        if (otpRecord.token !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }

        // If OTP is valid, proceed to call the '/verifyotp/:id' API
        // Assuming the '/verifyotp/:id' API is called with the user ID
        res.redirect(`/verifyotp/${otpRecord._id}`);
    } catch (error) {
        // Handle errors
        console.error("Error verifying OTP and Email:", error);
        res.status(500).json({ success: false, message: "Failed to verify OTP and Email." });
    }
});


export {
    createAndStoreOTP,
    verifyOTP,
    verifyOTPAndEmail,
}
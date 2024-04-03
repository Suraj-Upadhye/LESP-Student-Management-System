import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

// Done
const sendOTPEmail = async (email, otp) => {
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailDetails = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Email ID Verification for Registration",
        html: `<html>
            <head>
                <title>Verifying your Email Address</title>
            </head>
            <body>
                <h1>Email ID Verification</h1>
                <p>Dear User,</p>
                <p>We have received your request for registration in our LESP Student Management System. To complete the registration process, please use the OTP below:</p>
                <h2>${otp}</h2>
                <p>Please note that this OTP is only valid for 10 minutes. If you did not request a registration, please disregard this message.</p>
                <p>Thank you,</p>
                <p>Team LESP, Sangli</p>
            </body>
        </html>`
    };

    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.error(err);
                reject(new ApiError(500, "Something went wrong while sending the email"));
            } else {
                resolve();
            }
        });
    });
};

export { sendOTPEmail };

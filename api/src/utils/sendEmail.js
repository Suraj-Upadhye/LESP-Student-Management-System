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


const sendNewUserAcceptedEmail = async (email, userType, firstName) => {
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
        subject: `New ${userType} Registration Accepted`,
        html: `<html>
            <head>
                <title>New ${userType} Registration Accepted</title>
            </head>
            <body>
                <h1>Registration Accepted</h1>
                <p>Dear ${firstName},</p>
                <p>We have received your request for registration in our LESP Student Management System. We have verified that its real account. To Login, please go to our website:</p>
                <p>If you have recieved email already, please disregard this message.</p>
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
                console.log("Your Email has been sent successfully.");
            }
        });
    });
};


const sendResetPasswordEmail = async(email,userName, token) =>{
    const mailTransporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS, // generated ethereal email
          pass: process.env.EMAIL_PASSWORD // generated ethereal password
        }
    });

    let mailDetails = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Reset Password",
        html: `<html>
        <head>
            <title>Password Reset Request</title>
        </head>
        <body>
            <h1>Password Reset Request</h1>
            <p>Dear ${userName},</p>
            <p>We have received a request to reset your password for your account with LESP Student Management System. To complete the password reset process, please click on the button below:</p>
            <a href=${process.env.LIVE_URL}/reset-password/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4ox;">Reset Password</button></a>
            <p>Please note that this link is only valid for a 5 mins. If you did not request a password reset, please disregard this message.</p>
            <p>Thank you,</p>
            <p>Team LESP, Sangli</p>
        </body>
    </html>`,
    };

    return new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.error(err);
                reject(new ApiError(500, "Something went wrong while sending the email"));
            } else {
                resolve();
                console.log("Your Email has been sent successfully.");
            }
        });
    });

};

export {
    sendOTPEmail,
    sendNewUserAcceptedEmail,
    sendResetPasswordEmail,
};

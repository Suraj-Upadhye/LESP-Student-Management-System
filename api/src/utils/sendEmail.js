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

// Done
const sendResetPasswordEmail = async (email, userName, token) => {
    const mailTransporter = nodemailer.createTransport({
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

// Done
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

const sendNewUserRejectedEmail = async (email, userType, firstName) => {
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
        subject: `New ${userType} Registration Rejected`,
        html: `<html>
            <head>
                <title>New ${userType} Registration Rejected</title>
            </head>
            <body>
                <h1>Registration Rejected</h1>
                <p>Dear ${firstName},</p>
                <p>We have received your request for registration in our LESP Student Management System. We have checked that its fake account. To Register our system, please use correct credientials:</p>
                <p>If you haven't requested to register our system, please disregard this message.</p>
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

// Done
const sendLeaveAcceptedEmail = async (email, userType, firstName) => {
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
        subject: `${userType} Leave Request Accepted`,
        html: `<html>
            <head>
                <title>${userType} Leave Request Accepted</title>
            </head>
            <body>
                <h1>Leave Request Accepted</h1>
                <p>Dear ${firstName},</p>
                <p>We have received your leave request. We have verified your reason and we found it geniune so we have accepted your leave request.</p>
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

const sendLeaveRejectedEmail = async (email, userType, firstName) => {
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
        subject: `${userType} Leave Request Rejected`,
        html: `<html>
            <head>
                <title>${userType} Leave Request Rejected</title>
            </head>
            <body>
                <h1>Leave Request Rejected</h1>
                <p>Dear ${firstName},</p>
                <p>We have received your leave request. We have checked your reason and we found it's not geniune so we have rejected your leave request.</p>
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

const sendUserRemovedEmail = async (email, userType, firstName) => {
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
        subject: `${userType} Removed`,
        html: `<html>
            <head>
                <title>${userType} Removed</title>
            </head>
            <body>
                <h1>${userType} Removed</h1>
                <p>Dear ${firstName},</p>
                <p>We have checked your account. It's bad to say, we have noticed your account is not needed to our system now for some reason so we have removed your account from our system. Furthermore, you can't login to system at all.</p>
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

const sendNewResourceEmail = async (email, firstName, lastName, userName) => {
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailDetails = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "New Resource received",
        html: `<html>
        <head>
            <title>New Resource received</title>
        </head>
        <body>
            <h1>New Resource Received</h1>
            <p>Dear ${userName},</p>
            <p>You have received a resource from ${firstName} ${lastName}. To see the resource, please click on the button below:</p>
            <a href=${process.env.LIVE_URL}/previousResource/><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4ox;">See Resource</button></a>
            <p>If you have recieved email already, please disregard this message.</p>
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
    sendResetPasswordEmail,

    sendNewUserAcceptedEmail,
    sendNewUserRejectedEmail,

    sendLeaveAcceptedEmail,
    sendLeaveRejectedEmail,

    sendUserRemovedEmail,

    sendNewResourceEmail,

};

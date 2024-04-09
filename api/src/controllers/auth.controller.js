// auth.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.models.js";
import { sendResetPasswordEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";

// Done
const generateAccessAndRefreshTokens = async (userId, userType) => {
    try {
        let user;
        if (userType === 'user') {
            user = await User.findById(userId);
        } else if (userType === 'admin') {
            user = await Admin.findById(userId);
        } else {
            throw new Error('Invalid user type');
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        console.log(accessToken, refreshToken);

        user.refreshToken = refreshToken;
        await user.save(); // Save the refresh token to the database

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

// Done
// it will simply refreshes  the access token by using the existing refresh token 
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        console.log(decodedToken);
        console.log(decodedToken.email);
        console.log(decodedToken.userType);
        let user;
        if (decodedToken.userType === 'user') {
            user = await User.findById(decodedToken._id);
        } else if (decodedToken.userType === 'admin') {
            user = await Admin.findById(decodedToken._id);
        } else {
            throw new ApiError(401, 'Invalid user type');
        }

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        // Generate new access token and refresh token
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, decodedToken.userType);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

// Done
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }


    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!user && !admin) {
        throw new ApiError(401, 'Invalid email or password');
    }

    if (user) {
        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Invalid email or password');
        }

        if (user.isEmailVerified) {

            const loggedInUser = await User.findById(user._id).
                select("-password -refreshToken")

            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, 'user');

            const options = {
                httpOnly: true,
                secure: true
            }

            return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user: loggedInUser, accessToken,
                            refreshToken
                        },
                        "User logged In Successfully"
                    )
                )
        }
        else {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "User is not Verified Yet"
                    )
                )
        }
    }

    if (admin) {
        const isPasswordCorrect = await admin.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Invalid email or password');
        }

        if (admin.isEmailVerified) {

            const loggedInUser = await Admin.findById(admin._id).
                select("-password -refreshToken")

            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id, 'admin');

            const options = {
                httpOnly: true,
                secure: true
            }

            return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            admin: loggedInUser, accessToken,
                            refreshToken
                        },
                        "Admin logged In Successfully"
                    )
                )
        }
        else {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "Admin is not Verified Yet"
                    )
                )
        }

    }
});

// Done
const loginByEmail = asyncHandler(async (req, res) => {

    const email = req.body.email;

    if (!email) {
        throw new ApiError(400, 'Email is required');
    }

    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!user && !admin) {
        throw new ApiError(401, 'Invalid email or password');
    }

    if (user) {
        if (user.isEmailVerified) {

            const loggedInUser = await User.findById(user._id).
                select("-password -refreshToken")

            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, 'user');

            const options = {
                httpOnly: true,
                secure: true
            }

            return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user: loggedInUser, accessToken,
                            refreshToken
                        },
                        "User logged In Successfully"
                    )
                )
        }
        else {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "User is not Verified Yet"
                    )
                )
        }
    }

    if (admin) {
        if (admin.isEmailVerified) {

            const loggedInUser = await Admin.findById(admin._id).
                select("-password -refreshToken")

            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id, 'admin');

            const options = {
                httpOnly: true,
                secure: true
            }

            return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            admin: loggedInUser, accessToken,
                            refreshToken
                        },
                        "Admin logged In Successfully"
                    )
                )
        }
        else {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "Admin is not Verified Yet"
                    )
                )
        }

    }
});

// Done 
const logout = asyncHandler(async (req, res) => {
    // Check if the user is logged in
    if (!req.user) {
        throw new ApiError(401, 'User not authenticated');
    }

    // Clear the refresh token in the user or admin document
    if (req.user.role === 'Student') {
        // For students
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )
    } else {
        // For teachers and HOD
        await Admin.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    // Send response
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
});

// Done
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, 'Email is required');
    }

    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!user && !admin) {
        throw new ApiError(401, 'Invalid email or password');
    }

    if (user) {

        if (user.isEmailVerified) {
            const payload = {
                email: user.email
            }
            const expiryTime = 300;
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });

            const newToken = new Token({
                userId: user._id,
                token: token
            });

            // Send a notification email to the user registered email address
            sendResetPasswordEmail(user.email, user.firstName, token);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                        },
                        "Email Sent Successfully"
                    )
                )
        }
        else {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "User is not Verified Yet"
                    )
                )
        }
    }

    if (admin) {
        if (admin.isEmailVerified) {

            const payload = {
                email: admin.email
            }
            const expiryTime = 300;
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });

            const newToken = new Token({
                adminId: admin._id,
                token: token
            });

            // Send a notification email to the user registered email address
            sendResetPasswordEmail(admin.email, admin.firstName, token);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                        },
                        "Email Sent Successfully"
                    )
                )
        }
        else {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {},
                        "Admin is not Verified Yet"
                    )
                )
        }

    }
});

// Done
const resetPassword = async (req, res) => {
    const token = req.params.token; // Corrected
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(new ApiResponse(500, {}, "Reset Link is Expired!")); // Return response for expired token
        } else {
            const response = data;
            const email = response.email; // Moved email declaration inside else block
            if (!email) {
                return res.status(400).json(new ApiResponse(400, {}, "Email is required")); // Return response for missing email
            }

            const user = await User.findOne({ email });
            const admin = await Admin.findOne({ email });

            if (!user && !admin) {
                return res.status(401).json(new ApiResponse(401, {}, "Invalid email or password")); // Return response for invalid email or password
            }

            if (user) {
                if (user.isEmailVerified) {
                    const salt = await bcrypt.genSalt(10);
                    const encryptedpassword = await bcrypt.hash(newPassword, salt);
                    user.password = encryptedpassword;
                    try {
                        const updatedUser = await User.findOneAndUpdate(
                            { _id: user._id },
                            { $set: user },
                            { new: true }
                        );
                        return res.status(200).json(new ApiResponse(200, { data: updatedUser }, "Password Reset Success!"));
                    } catch (error) {
                        return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while resetting the password!"));
                    }
                }
            }

            if (admin) {
                if (admin.isEmailVerified) {
                    const salt = await bcrypt.genSalt(10);
                    const encryptedpassword = await bcrypt.hash(newPassword, salt);
                    admin.password = encryptedpassword;
                    try {
                        const updatedAdmin = await Admin.findOneAndUpdate(
                            { _id: admin._id },
                            { $set: admin },
                            { new: true }
                        );
                        return res.status(200).json(new ApiResponse(200, { data: updatedAdmin }, "Password Reset Success!"));
                    } catch (error) {
                        return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while resetting the password!"));
                    }
                }
            }
        }
    });
}

// Done
const skipResetPassword = asyncHandler(async (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(new ApiResponse(500, {}, "Reset Link is Expired!"));
        } else {
            const response = data;
            const email = response.email;
            if (!email) {
                return res.status(400).json(new ApiResponse(400, {}, "Email is required"));
            }

            const user = await User.findOne({ email });
            const admin = await Admin.findOne({ email });

            if (!user && !admin) {
                return res.status(401).json(new ApiResponse(401, {}, "Invalid email"));
            }

            if (user) {
                if (user.isEmailVerified) {
                    return res.status(200).json(new ApiResponse(200, { email: user.email }, "User Reset Skipped Successfully!"));
                } else {
                    return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while skipping the reset password!"));
                }
            } else if (admin) { // Corrected this line
                if (admin.isEmailVerified) {
                    return res.status(200).json(new ApiResponse(200, { email: admin.email }, "Admin Reset Skipped Successfully!"));
                } else {
                    return res.status(500).json(new ApiResponse(500, {}, "Something went wrong while skipping the reset password!"));
                }
            }
        }
    });
});

// Done
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const admin = await Admin.findOne(req.user?._id);

    if (!user && !admin) {
        throw new ApiError(401, 'Invalid email or password');
    } 

    if (user) {
        if (user.isEmailVerified) {

            const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

            if (!isPasswordCorrect) {
                throw new ApiError(400, "Invalid old password")
            }

            user.password = newPassword
            await user.save({ validateBeforeSave: false })

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                        },
                        "Password changed Successfully"
                    )
                )
        }
        else {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Something Went Wrong"
                    )
                )
        }
    }

    if (admin) {
        if (admin.isEmailVerified) {

            const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword)

            if (!isPasswordCorrect) {
                throw new ApiError(400, "Invalid old password")
            }

            admin.password = newPassword
            await admin.save({ validateBeforeSave: false })

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                        },
                        "Password changed Successfully"
                    )
                )
        }
        else {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        500,
                        {},
                        "Something went wrong"
                    )
                )
        }

    }

})

export {
    login,
    logout,
    // refreshAccessToken,
    forgetPassword,
    resetPassword,
    skipResetPassword,
    loginByEmail,
    changeCurrentPassword,
}
// auth.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";


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

    if (admin) {
        const isPasswordCorrect = await admin.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Invalid email or password');
        }

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
                "User logged In Successfully"
            )
        )

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


const getEmailPassword = asyncHandler(async (req, res) => {
    // Check if the user is logged in
    if (!req.user) {
        throw new ApiError(401, 'User not authenticated');
    }

    // Retrieve email and password based on user type
    let email, password;
    if (req.user.role === 'Student') {
        // For students
        const user = await User.findById(req.user._id).select('email password');
        email = user.email;
        password = user.password;
    } else {
        // For teachers and HOD
        const admin = await Admin.findById(req.user._id).select('email password');
        email = admin.email;
        password = admin.password;
    }

    // Send response
    return res.status(200).json({ success: true, email, password });
});


export {
    login,
    logout,
    refreshAccessToken
    // getEmailPassword,
}
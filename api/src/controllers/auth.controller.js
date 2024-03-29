// auth.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// chatgpt
const login = asyncHandler(async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    // Check if the user exists in the admin collection
    const admin = await Admin.findOne({ email });

    if (!user && !admin) {
        throw new ApiError(401, 'Invalid email or password');
    }

    if (user) {
        // If user is found, check if the provided password matches the hashed password in the database
        const isPasswordCorrect = await user.isPasswordCorrect(password);

        // If password is incorrect, throw an error
        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Invalid email or password');
        }

        // Generate access token
        const accessToken = user.generateAccessToken();

        // Generate refresh token
        const refreshToken = user.generateRefreshToken();

        // Save refresh token in the user document
        user.refreshToken = refreshToken;
        await user.save();

        // Send response with access token and refresh token
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
                // Include other relevant user information here
            }
        });
    }

    if (admin) {
        // If admin is found, check if the provided password matches the hashed password in the database
        const isPasswordCorrect = await admin.isPasswordCorrect(password);

        // If password is incorrect, throw an error
        if (!isPasswordCorrect) {
            throw new ApiError(401, 'Invalid email or password');
        }

        // Generate access token
        const accessToken = admin.generateAccessToken();

        // Generate refresh token
        const refreshToken = admin.generateRefreshToken();

        // Save refresh token in the admin document
        admin.refreshToken = refreshToken;
        await admin.save();

        // Send response with access token and refresh token
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            admin: {
                _id: admin._id,
                email: admin.email,
                role: admin.role
                // Include other relevant admin information here
            }
        });
    }
});


// chatgpt
const logout = asyncHandler(async (req, res) => {
    // Check if the user is logged in
    if (!req.user) {
        throw new ApiError(401, 'User not authenticated');
    }

    // Clear the refresh token in the user or admin document
    if (req.user.role === 'Student') {
        // For students
        const user = await User.findById(req.user._id);
        user.refreshToken = null;
        await user.save();
    } else {
        // For teachers and HOD
        const admin = await Admin.findById(req.user._id);
        admin.refreshToken = null;
        await admin.save();
    }

    // Send response
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// chatgpt
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
    getEmailPassword,
    
}
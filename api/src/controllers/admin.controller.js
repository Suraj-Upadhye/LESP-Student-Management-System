// admin.controller.js

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from '../models/admin.models.js';

const generateAccessAndRefereshTokens = asyncHandler(async (req, res) => {

})

const registerAdmin = asyncHandler(async (req, res) => {

    const {
        // Personal Details :-
        firstName, middleName, lastName, gender, address, pincode, qualification, teachingExperience,

        // profilePhoto,

        // Academic Details :-
        year, branch, division, enrollmentNo, rollNo,

        // Security Details :-
        mobileNumber, email, otp, password
    } = req.body;

    console.log("Email :", email)

    if (
        [firstName, middleName, lastName, gender,
            year, branch, division, enrollmentNo, rollNo,
            studentMobileNumber, email, otp, password
        ].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Admin.findOne({
        $or: [{ email }, { adminCode }]
    })

    if (existedAdmin) {
        throw new ApiError(409, "User with email and rollNo already exists.")
    }


    // console.log(req.files);

    // const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path
    let profilePhotoLocalPath;
    if (req.files && Array.isArray(req.files.profilePhoto) && req.files.profilePhoto.length > 0) {
        profilePhotoLocalPath = req.files.profilePhoto[0].path
    }

    console.log("local path :", profilePhotoLocalPath);

    if (!profilePhotoLocalPath) {
        const profilePhoto = ""
    }
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath)


    console.log("cloudinary obj :", profilePhoto);

    if (!profilePhoto) {
        throw new ApiError(400, "Profile photo is not uploaded properly.");
    }

    const user = await User.create({
        firstName,
        middleName,
        lastName,
        gender,
        address,
        pincode,
        profilePhoto: profilePhoto?.url || "",
        year,
        branch,
        division,
        enrollmentNo,
        rollNo,
        mobileNumber,
        email: email.toLowerCase(),
        otp,
        password
    })

    const createAdmin = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createAdmin) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createAdmin, "Admin registered successfully")
    )



})

const refreshAccessToken = asyncHandler(async (req, res) => {

})

const changeCurrentPassword = asyncHandler(async (req, res) => {

})

const getCurrentAdmin = asyncHandler(async (req, res) => {

})

const updateAccountDetails = asyncHandler(async (req, res) => {

})

const updateAdminProfilePhoto = asyncHandler(async (req, res) => {

})

// chatgpt
const updateAdminCode = asyncHandler(async (req, res) => {
    const { newAdminCode } = req.body;
    const adminId = req.user._id; // Assuming admin ID is available in the request

    if (!newAdminCode) {
        throw new ApiError(400, "New admin code is required");
    }

    // Check if the new admin code is unique
    const isExistingAdminCode = await Admin.findOne({ adminCode: newAdminCode });
    if (isExistingAdminCode) {
        throw new ApiError(409, "New admin code already exists");
    }

    // Update admin code
    const admin = await Admin.findByIdAndUpdate(
        adminId,
        { adminCode: newAdminCode },
        { new: true }
    );

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    res.status(200).json(new ApiResponse(200, admin, "Admin code updated successfully"));
});


const getAdminCode = asyncHandler(async (req, res) => {
    const adminId = req.user._id; // Assuming admin ID is available in the request

    // Find admin by ID and select only the admin code
    const admin = await Admin.findById(adminId).select("adminCode");

    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    res.status(200).json(new ApiResponse(200, admin, "Admin code fetched successfully"));
});

// chatgpt
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Set reset token and expiry time
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds
        await user.save();

        // Send email to user with reset link
        const resetUrl = `${req.protocol}://${req.get('host')}/api/resetpassword/${resetToken}`;
        const message = `To reset your password, click on this link: ${resetUrl}`;

        // Code to send email (replace this with your email sending logic)
        await sendEmail(user.email, 'Password Reset', message);

        res.status(200).json(new ApiResponse(200, {}, "Password reset link sent successfully"));
    } catch (error) {
        throw new ApiError(500, "Error sending password reset link");
    }
});


// chatgpt
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, password, confirmPassword } = req.body;

    try {
        // Find user by reset token and check if reset token is valid
        const user = await User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } });

        // If user not found or reset token expired, throw error
        if (!user) {
            throw new ApiError(400, "Invalid or expired reset token");
        }

        // Validate password and confirmPassword match
        if (password !== confirmPassword) {
            throw new ApiError(400, "Passwords do not match");
        }

        // Set new password and clear reset token fields
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        // Save updated user
        await user.save();

        // Send success response
        res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
    } catch (error) {
        throw new ApiError(500, "Error resetting password");
    }
});

// chatgpt
const getCurrentAdminEssentials = asyncHandler(async (req, res) => {
    try {
        // Find the current admin by ID and select essential fields
        const admin = await Admin.findById(req.user.id).select("firstName lastName profilePhoto email");

        // Send response with admin essentials
        res.json({
            success: true,
            data: admin
        });
    } catch (error) {
        throw new ApiError(500, "Error fetching admin essentials");
    }
});



// high security
// chatgpt
const acceptNewStudent = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params;

        // Find the student by ID and update their status to accepted
        const student = await User.findByIdAndUpdate(
            studentId,
            { $set: { isEmailVerified: true } },
            { new: true }
        );

        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        res.status(200).json(new ApiResponse(200, student, "Student accepted successfully"));
    } catch (error) {
        throw new ApiError(500, "Error accepting student");
    }
});

// chatgpt
const acceptNewTeacher = asyncHandler(async (req, res) => {
    try {
        const { teacherId } = req.params;

        // Find the teacher by ID and update their status to accepted
        const teacher = await Admin.findByIdAndUpdate(
            teacherId,
            { $set: { isEmailVerified: true } },
            { new: true }
        );

        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        res.status(200).json(new ApiResponse(200, teacher, "Teacher accepted successfully"));
    } catch (error) {
        throw new ApiError(500, "Error accepting teacher");
    }
});

// chatgpt
const studentBatchAllocation = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params;
        const { batch } = req.body;

        // Find the student by ID and update their batch
        const student = await User.findByIdAndUpdate(
            studentId,
            { $set: { batch: batch, isBatchAllocated: true } },
            { new: true }
        );

        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        res.status(200).json(new ApiResponse(200, student, "Student batch allocated successfully"));
    } catch (error) {
        throw new ApiError(500, "Error allocating student batch");
    }
});

// chatgpt
const classTeacherAllocation = asyncHandler(async (req, res) => {
    try {
        const { teacherId } = req.params;

        // Find the teacher by ID and update their class teacher status
        const teacher = await Admin.findByIdAndUpdate(
            teacherId,
            { $set: { isClassTeacher: true } },
            { new: true }
        );

        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        res.status(200).json(new ApiResponse(200, teacher, "Class teacher allocated successfully"));
    } catch (error) {
        throw new ApiError(500, "Error allocating class teacher");
    }
});

// chatgpt
// const allowToChangeAcademicDetails = asyncHandler(async (req, res) => {

//     // allow user to change their academic details if the academic year is completed

// })

const allowToChangeAcademicDetails = asyncHandler(async (req, res) => {
    try {
        // Assuming the user's ID is obtained from the request
        const userId = req.user._id;

        // Assuming you have a method to check if the academic year is completed for the user
        const isAcademicYearCompleted = await checkAcademicYearCompletion(userId);

        if (isAcademicYearCompleted) {
            return res.status(200).json(new ApiResponse(200, { allowChange: true }, "User can change academic details"));
        } else {
            return res.status(200).json(new ApiResponse(200, { allowChange: false }, "User cannot change academic details yet"));
        }
    } catch (error) {
        throw new ApiError(500, "Error checking academic year completion");
    }
});



export {
    registerAdmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    updateAccountDetails,
    updateAdminCode,    
    getAdminCode,     
    updateAdminProfilePhoto,
    forgetPassword, 
    resetPassword,
    getCurrentAdminEssentials,
    
    acceptNewStudent,
    acceptNewTeacher,
    studentBatchAllocation,
    classTeacherAllocation,
    allowToChangeAcademicDetails,

}
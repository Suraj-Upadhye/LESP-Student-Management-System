// user.controller.js

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// tested
const registerUser = asyncHandler(async (req, res) => {

    const {
        // Personal Details :-
        firstName, middleName, lastName, gender, address, pincode,

        // profilePhoto,

        // Academic Details :-
        year, branch, division, enrollmentNo, rollNo,

        // Security Details :-
        studentMobileNumber, fatherMobileNumber, motherMobileNumber, email, otp, password
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

    const existedUser = await User.findOne({
        $or: [{ email }, { rollNo }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email and rollNo already exists.")
    }


    // console.log(req.files);
    // const profilePhotoLocalPath = req.files?.profilePhoto[0]?.path
    let profilePhoto = "";
    let profilePhotoLocalPath;
    if (req.files && Array.isArray(req.files.profilePhoto) && req.files.profilePhoto.length > 0) {
        profilePhotoLocalPath = req.files.profilePhoto[0].path


        console.log("local path :", profilePhotoLocalPath);

        // if (!profilePhotoLocalPath) {
        //     const profilePhoto = ""
        // }
        profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath)


        console.log("cloudinary obj :", profilePhoto);

        if (!profilePhoto) {
            throw new ApiError(400, "Profile photo is not uploaded properly.");
        }
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
        studentMobileNumber,
        fatherMobileNumber,
        motherMobileNumber,
        email: email.toLowerCase(),
        otp,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



})


// tested
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})


// tested
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
});


// bug in update account details
const updateAccountDetails = asyncHandler(async (req, res) => {

    // data to be received may be : 
    //(normal) gender, address, pincode, studentMobileNumber, fatherMobileNumber, motherMobileNumber,
    // high security : (hod permission) // year, rollNo, division, batch
    let updatedFields = {}
    for (let key in req.body) {
        if (req.body[key] !== undefined && req.body[key] != null) {
            updatedFields[key] = req.body[key]
        }
    }
    console.log(updatedFields)

    if (!updatedFields) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const updateObject = {
        $set: {}
    };

    for (let key in updatedFields) {
        updateObject.$set[key] = updatedFields[key];
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        updateObject,
        { new: true }
    ).select("-password")  // this returns updated data/information of the user without password information

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))

});

const updateRollNo = asyncHandler(async (req, res) => {
    const { rollNo } = req.body;

    // Check if the user is authorized to perform this action (e.g., HOD permission)
    // You need to implement your authorization logic here

    // Example: Assuming only HODs can update roll numbers
    if (req.user.role !== 'HOD') {
        throw new ApiError(403, 'You are not authorized to perform this action');
    }

    // Check if the roll number is provided in the request body
    if (!rollNo) {
        throw new ApiError(400, 'Roll number is required');
    }

    // Update the roll number for the current user
    const user = await User.findByIdAndUpdate(
        req.user._id, // Assuming you have the user ID in the request object
        { $set: { rollNo: rollNo } },
        { new: true }
    );

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Send a success response
    res.status(200).json({ success: true, message: 'Roll number updated successfully', data: user });
});
         // only can change when hod allows to all future scope


// bug in update user profile photo
const updateUserProfilePhoto = asyncHandler(async(req, res) => {

    const profilePhotoLocalPath = req.file?.path

    if (!profilePhotoLocalPath) {
        throw new ApiError(400, "profilePhoto file is missing")
    }

    //TODO: delete old image - assignment
console.log(profilePhotoLocalPath)
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath)

    if (!profilePhoto.url) {
        throw new ApiError(400, "Error while uploading on profilePhoto")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                profilePhoto: profilePhoto.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "ProfilePhoto image updated successfully")
    )
})

const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Validation: Check if email is provided
    if (!email) {
        throw new ApiError(400, 'Email is required');
    }

    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, 'User with this email does not exist');
    }

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Update user document with reset token and expiration time
    user.resetToken = resetToken;
    user.resetTokenExpire = resetTokenExpire;
    await user.save();

    // Construct the reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`;

    // Send reset password instructions to the user's email
    const message = `Please click on the following link to reset your password: ${resetPasswordUrl}`;
    // You need to implement your email sending logic here

    res.status(200).json({ success: true, message: 'Reset password instructions sent to your email' });
});


const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, password, confirmPassword } = req.body;

    // Validation: Check if reset token, password, and confirmPassword are provided
    if (!resetToken || !password || !confirmPassword) {
        throw new ApiError(400, 'Reset token, password, and confirmPassword are required');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match');
    }

    // Find user by reset token and check if it's valid
    const user = await User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } });
    if (!user) {
        throw new ApiError(400, 'Invalid or expired reset token');
    }

    // Reset user's password and clear reset token
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    // Send response indicating successful password reset
    res.status(200).json({ success: true, message: 'Password reset successfully' });
});


//   name profile photo email 
const getCurrentUserEssentials = asyncHandler(async (req, res) => {
    try {
        // Assuming req.user contains the current user's details
        const user = req.user;

        // Extracting essential user details
        const essentials = {
            name: `${user.firstName} ${user.middleName} ${user.lastName}`,
            profilePhoto: user.profilePhoto,
            email: user.email
        };

        res.status(200).json({
            success: true,
            data: essentials
        });
    } catch (error) {
        // Handle any errors
        console.error("Error fetching current user essentials:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



const getAdminProfile = asyncHandler( async( req, res) =>{

});




export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateRollNo,       
    updateUserProfilePhoto,
    forgetPassword,
    resetPassword,
    getCurrentUserEssentials, 

}
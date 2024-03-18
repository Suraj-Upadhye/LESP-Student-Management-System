import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

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
    let profilePhotoLocalPath;
    if (req.files && Array.isArray(req.files.profilePhoto) && req.files.profilePhoto.length > 0) {
        profilePhotoLocalPath = req.files.profilePhoto[0].path
    }

    console.log("local path :",profilePhotoLocalPath);
    
    if (!profilePhotoLocalPath) {
        const profilePhoto = ""
    }
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath)
   

    console.log("cloudinary obj :",profilePhoto);

    if (!profilePhoto) {
        throw new ApiError(400, "Profile photo is not uploaded properly.");
    }

    const user =  await User.create({
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

    if (!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



})


export {
    registerUser,
}
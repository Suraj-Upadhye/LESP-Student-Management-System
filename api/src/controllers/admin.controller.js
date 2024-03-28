import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Admin } from '../models/admin.models.js';

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
        mobileNumber, 
        email: email.toLowerCase(), 
        otp, 
        password
    })

    const createAdmin = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createAdmin){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createAdmin, "Admin registered successfully")
    )



})

const acceptNewStudent = asyncHandler( async( req, res)=>{

})

const acceptNewTeacher = asyncHandler( async( req, res)=>{

})


const batchAllocation = asyncHandler( async( req, res)=>{

})


export {
    registerAdmin,
}
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { Admin } from '../models/admin.models.js';


const generateAccessAndRefereshTokens = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
})

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
// move to auth controller
const loginUser = asyncHandler(async (req, res) => {

    const { email, rollNo, password } = req.body;

    if (!(email || rollNo)) {
        throw new ApiError(400, "rollNo or email is required");
    }

    const user = await User.findOne(
        {
            $or: [{ rollNo }, { email }]
        }
    )

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)


    const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")

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

})

// tested
// move to auth controller
const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            // $set: {
            //     refreshToken: undefined
            // }
            // or 
            $unset: {
                refreshToken: 1     // this removes the field from document this is better  option as it does not save any unnecessary data to db
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

// failed
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = res.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }


        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

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

});         // only can change when hod allows to all future scope


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


const forgetPassword = asyncHandler( async( req, res) =>{

    const  resetToken = crypto.randomBytes(32).toString('hex');
    
    let user = await User.findOne({email : req.body.email});
    if(!user){
        throw new ApiError(400,"Email does not exist");
    }

    const expireTime = Date.now() + 10*60;   //expires in 10 mins from now
    user.resetToken = resetToken ;
    user.resetTokenExpire= expireTime ;
    await user.save();

    const url = `${req.protocol}://${req.get('host')}/api/users/resetpassword/${resetToken}`;

    const message = `Follow this link to reset your password ${url}`;

    try{
       await emailService.sendEmail(req.body.email ,message);
       res.status(200).json(
           new ApiResponse(200,'Email has been sent',"Please check your email id for further instructions")
       );
    }catch(error){
        console.log(`Error occurred while sending Email`, error);
        user.resetToken = undefined;
        user.resetTokenExpire=undefined;
        await user.save();
    }

});


const resetPassword = asyncHandler(async (req,res)=>{

    const  {resetToken, password, confirmPassword} = req.body;
    if(password !== confirmPassword )
    {
         throw new ApiError(400,"Passwords do not match");
    }

    const user =await User.findOneAndUpdate(
                            {resetToken:resetToken},
                            {password:password, 
                             resetToken:undefined, 
                             resetTokenExpire:undefined, 
                             role:"user"},
                            {new:true}
                          ).select("-resetToken -resetTokenExpire -__v");

   // Saving the updated user document in the database
    await user.save();
    
    sendTokenResponse(user,200, "Password reset successfully",res);
});

//   name profile photo email 
const getCurrentUserEssentials = asyncHandler(async (req,res)=>{

    const  user = await User.findById(req.user.id).select("name profilePhoto email");

    res.json({
       success: true,
       data : user
    });

});



const getAdminProfile = asyncHandler( async( req, res) =>{

    const {adminCode} = req.params

    if( !adminCode?.trim()){
        throw new ApiError(400,"Admin code is missing");
    }

    const admin = await Admin.aggregate([
        {
            $match:{
                adminCode: adminCode
            }
        },
        {
            $lookup:{
                from: "",
                localField: "",
                foreignField: "",
                as: "teachers"
            }
        },
        {
            $lookup:{
                from: "",
                localField: "",
                foreignField: "",
                as: ""
            }
        },
        {
            $addFields: {
                teachersCount: {
                    $size: "$teachers"
                },

            }
        },
        {

        }
    ])


    // console.log(getAdminrProfile)
    if(!getAdminProfile?.length){
        throw new ApiError(404, "Admin does not exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, getAdminrProfile,  'Admin profile fetched successfully')
    )

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
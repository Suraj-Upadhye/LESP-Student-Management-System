// otp.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAndStoreOTP = asyncHandler(async (req, res) => {
    // create a random otp and store it in database with expiry of 10 minutes and with email
    // send the generated OTP to user's email id  using nodemailer or any other mailing service
    const { email } = req.body;
});

    // let otp = Math.floor(1000 + Math.random() * (9999 - 1000));
    // await User.findByIdAndUpdate(userId, { otp: otp });
    // return new ApiResponse('Success', 200, "One Time Password Sent to your Email Id").send(res);

const verifyOTP = asyncHandler(async (req, res, next) => {
    // compare  the entered OTP with stored one in DB
    // If matched then proceed further otherwise show error message

    const userId = req.params.id;
    const providedOtp = parseInt(req.body.otp);
    console.log(providedOtp);
    const user = await User.findById(userId).select({ password: 0, otp: 0 });
    if (!user || user.otp != providedOtp) {
        //return the error response and end the middleware execution chain
        return new ApiError("Invalid OTP or User not found", 400).send(res);
    } else {

        //set the 'isVerified' flag of the user as true so that he can now login with his email id & password
        user.isEmailVerified = true;
        user.save();
        //remove the 'otp' field from the user object before sending it in the response
        user.password = '';
        user.otp = undefined;
        return new ApiResponse('User Verification Successful', 200, 'User has been verified').sendData(res, user);
    }
})

const verifyOTPAndEmail = asyncHandler( async(req,res)=>{
    // compare  both the fields i.e., OTP and Email
    // If they are valid then call the '/verifyotp/:id' API
    // Else send an error response
    
    const {email , otp} = req.body;
    if(!email || !otp){
        return new ApiError('Please provide all details',400).send(res)
    }else{
        const user=await User.findById(req.params.id)
        .select(['email','otp']);
        
        if(user.email===email && user.otp===otp){
            verifyOTP(req,res)
        }else{
            new ApiError('Invalid Credentials',400).send(res)
        }
    }
    // email and generated otp from req.body compare with otp database
})

export {
    createOTP,
    verifyOTP,
    verifyOTPAndEmail,
}
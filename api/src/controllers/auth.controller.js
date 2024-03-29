// auth.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const login = asyncHandler(async (req, res) => {

    // email, password

    const { email, password } = req.body;
    if (!email && !password)
        return res.status(400).json({ message: 'Please provide an email and a password' });

})


const logout = asyncHandler(async (req, res) => {

    // email, current user
});

const getEmailPassword = asyncHandler(async (req, res) => {

    // by refreshToken or accessToken 

});

export {
    login,
    logout,
    getEmailPassword,
    
}
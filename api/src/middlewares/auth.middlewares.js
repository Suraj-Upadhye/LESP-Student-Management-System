import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
import { Admin } from "../models/admin.models.js";

// Done
export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log(token);

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("decodedToken:", decodedToken);
        console.log(decodedToken.email)
        console.log(decodedToken.userType);
    
        let user;
        if (decodedToken.userType === 'user') {
            user = await User.findById(decodedToken._id).select("-password -refreshToken");
        } else if (decodedToken.userType === 'admin') {
            user = await Admin.findById(decodedToken._id).select("-password -refreshToken");
        } else {
            throw new ApiError(401, 'Invalid user type');
        }
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});


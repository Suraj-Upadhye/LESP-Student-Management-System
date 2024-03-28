import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const collegeNameFormatAttendance = asyncHandler( async(req, res)=>{

})

const collegeNameAndDescription = asyncHandler( async(req, res)=>{

})

export {
    collegeNameFormatAttendance,
    collegeNameAndDescription,
}



// also possible
// export {
//     collegeNameFormatAttendance as checkCollegeNameFormatForAttendance,
//     collegeNameAndDescription as checkCollegeNameAndDescription
// }
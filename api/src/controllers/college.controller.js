// college.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addcollegeNameFormatAttendance = asyncHandler( async(req, res)=>{

})

const addcollegeNameAndDescription = asyncHandler( async(req, res)=>{

})

const getcollegeNameFormatAttendance = asyncHandler( async(req, res)=>{

})

const getcollegeNameAndDescription = asyncHandler( async(req, res)=>{

})

export {
    addcollegeNameFormatAttendance,
    addcollegeNameAndDescription,
}



// also possible
// export {
//     collegeNameFormatAttendance as checkCollegeNameFormatForAttendance,
//     collegeNameAndDescription as checkCollegeNameAndDescription
// }
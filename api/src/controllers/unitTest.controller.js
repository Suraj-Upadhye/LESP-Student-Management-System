import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// remaining :-
const viewUTMarks =  asyncHandler(async (req,res)=>{

    const courseId = req.params.courseId;
    const semester = req.body.semester;
    const year = req.body.year;

    // Check user is authorized to access this data or not
    const auth = await UserCourseAuthorization.findOne({userId:req.user.id , courseId : courseId}).catch(err => console.log(err))
});
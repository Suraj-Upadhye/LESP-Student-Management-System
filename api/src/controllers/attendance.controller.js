import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// remaining :-
const viewAttendanceBySubjectAll = asyncHandler(async (req,res)=>{

    const  pageSize = +req.query.size || 10;
    const  currentPage =  +req.query.page || 0;
    const sortBy = req.query.sortBy || 'date';
    let sortQuery= {};

    /* Sorting */
    if (sortBy) {
        sortQuery =  eval(`'sortQuery.'+sortBy`)
    } else {
        sortQuery="date"
    }

    const totalDoc =await Attendance.countDocuments({userId:req.user.id})

    const attendances = await Attendance.find(
      {userId:req.user.id},
      null,
      {
         skip: currentPage * pageSize,
         limit: pageSize,
         sort: sortQuery
     },
   );


   return res.status(200).json({success:true , count:totalDoc, pages: Math.ceil(totalDoc/pageSize), data:attendances })
});


// remaining
const viewAttendanceBySubject = asyncHandler( async(req, res)=>{

});



import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const addLeaveApplication = asyncHandler(async(req, res)=>{

    // userId or adminId, start date, end date, reason, status(pending, approved, rejected)

})

const getLeaveApplication = asyncHandler(async(req, res)=>{

    // returns start date, end date, user, rollno, valid for leave or not
})

const updateLeaveApplication = asyncHandler(async(req, res)=>{

})

const deleteLeaveApplication = asyncHandler(async(req, res)=>{

})

const approveLeaveApplication = asyncHandler( async(req, res)=>{

})

const rejectLeaveApplication = asyncHandler(async(req, res)=>{

})

const listPendingLeaveApplication = asyncHandler(async(req, res)=>{

    // returns string with all specification, rollno, user
})

const listApprovedLeaveApplication = asyncHandler(async(req, res)=>{

    // returns string with all specification, rollno, user
})


export {
    addLeaveApplication,
    getLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication,
    approveLeaveApplication,
    rejectLeaveApplication,
    listPendingLeaveApplication,
    listApprovedLeaveApplication,
    
}
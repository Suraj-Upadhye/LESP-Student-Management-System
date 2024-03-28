import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addAttendanceSubjectWiseAllStudents = asyncHandler(async (req, res) => {

})

const getAttendanceSubjectWiseAllStudents = asyncHandler(async (req, res) => {

    // admin sends mode(theory/practical/tutorial)
    // if practical/tutorial then also sends batch
})

const updateAttendanceBySubjectAllStudents = asyncHandler(async (req, res) => {

})

const deleteAttendanceBySubjectAllStudents = asyncHandler(async (req, res) => {

})

const getAttendanceSubjectWiseSingle = asyncHandler(async (req, res) => {

})

const getAttendanceAllSubjectsSingle = asyncHandler(async (req, res) => {

})


export {
    addAttendanceSubjectWiseAllStudents,
    getAttendanceSubjectWiseAllStudents,
    updateAttendanceBySubjectAllStudents,
    deleteAttendanceBySubjectAllStudents,
    getAttendanceSubjectWiseSingle,
    getAttendanceAllSubjectsSingle,
    
}

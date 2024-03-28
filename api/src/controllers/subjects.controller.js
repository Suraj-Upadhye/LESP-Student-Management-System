import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../models/subjects.models.js";


const addSubject = asyncHandler(async (req, res) => {

})

const getSubject = asyncHandler(async (req, res) => {

})

const updateSubject = asyncHandler(async (req, res) => {

})


const deleteSubject = asyncHandler(async (req, res) => {

})


const getSubjectListBy = asyncHandler(async (req, res) => {

    // year, sem, branch

    // return subject list array
})


const getSubjectSwitchOptionList = asyncHandler( async(req, res)=>{

    // returns subjects list assigned to teacher/hod(admin) along with year, sem , branch, theory/practical/tutorial, batch options
})

export {
    addSubject,
    getSubject,
    updateSubject,
    deleteSubject,
    getSubjectListBy,
    getSubjectSwitchOptionList,
    
}
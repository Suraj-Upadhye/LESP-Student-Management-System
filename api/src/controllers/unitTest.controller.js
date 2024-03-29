// unitTest.controller.js

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UnitTest } from '../models/unitTest.models.js';


// @desc    Get all users marks 
// @route   GET /api/v1/marks/:classId?subject=:subject&section=:section
// @access  Public

// in front end display changed ut marks fields (student name - rollno - marks (ut1, ut2))

const addAndUpdateMarksSubjectWise = asyncHandler(async (req, res) => {

    // subject wise adding ut1 and ut2

    // return success msg with object

    // if-else

     // update subject marks which is changed


    // return success msg with object
})

const getUserMarksSubjectWise = asyncHandler(async (req, res) => {

    // subject wise ut1 and ut2 single user

    // return rollno, name, ut1 marks, ut2 marks, average, class ranking
})

const getUserMarksAllSubjectsCombined = asyncHandler(async (req, res) => {

    // All subjects marks ut1 and ut2 single user

    // return rollno, name, subjectname (ut2 marks, ut2 marks), average of all, class ranking
})


const getAllUserMarksSubjectWise = asyncHandler(async (req, res) => {

    // subject wise ut1 and ut2

    // return rollno, name, ut1 marks, ut2 marks, average, class ranking
})

const getAllUserMarksAllSubjectsCombined = asyncHandler(async (req, res) => {

    // All subjects marks ut1 and ut2

    // return rollno, name, subjectname (ut2 marks, ut2 marks), average of all, class ranking
})


const deleteAllUserMarksSubjectWise = asyncHandler(async (req, res) => {
    
    // deletion of ut1 or ut2 of that subject

    // return success
})

export {
    addAndUpdateMarksSubjectWise,
    getUserMarksSubjectWise,
    getUserMarksAllSubjectsCombined,
    getAllUserMarksSubjectWise,
    getAllUserMarksAllSubjectsCombined,
    deleteAllUserMarksSubjectWise,
};
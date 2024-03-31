// subjects.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../models/subjects.models.js";
import { Admin } from "../models/admin.models.js";

// Done
const addSubject = asyncHandler(async (req, res) => {
    try {
        // Extract subject details from the request body
        const { year, branch, semester, subject, mode, applicableBatchNames } = req.body;

        // Create a new subject object
        const newSubject = new Subject({
            year,
            branch,
            semester,
            subject,
            mode,
            applicableBatchNames
        });

        // Save the new subject to the database
        const savedSubject = await newSubject.save();

        // Return success response with the saved subject
        res.status(201).json({ success: true, data: savedSubject });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});

// Done
const getAllSubject = asyncHandler(async (req, res) => {
    try {
        // Retrieve subject details from the database
        const subjects = await Subject.find();

        // Return success response with the list of subjects
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});


const updateSubject = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; // Extract subject id from request parameters
        const { year, branch, semester, subject, mode, applicableBatchNames } = req.body; // Extract updated subject details from request body

        // Find the subject by id and update its details
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { year, branch, semester, subject, mode, applicableBatchNames },
            { new: true }
        );

        // If subject is not found, return 404 error
        if (!updatedSubject) {
            return res.status(404).json({ success: false, error: "Subject not found" });
        }

        // Return success response with the updated subject details
        res.status(200).json({ success: true, data: updatedSubject });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});


const deleteSubject = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; // Extract subject id from request parameters

        // Find the subject by id and delete it
        const deletedSubject = await Subject.findByIdAndDelete(id);

        // If subject is not found, return 404 error
        if (!deletedSubject) {
            return res.status(404).json({ success: false, error: "Subject not found" });
        }

        // Return success response with the deleted subject details
        res.status(200).json({ success: true, data: deletedSubject });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});


// Done
// by year, semester, branch, subjectname find out subjectid
const getSubjectIDByOther = asyncHandler(async (req, res) => {
    const { year, semester, branch, subjectName } = req.body;

    // Step 1: Find the subject document
    const subject = await Subject.findOne({
        year: year,
        semester: semester,
        branch: branch,
        subject: subjectName
    });

    if (!subject) {
        return res.status(404).json({ success: false, message: 'Subject not found' });
    }

    // Step 2: Return the ID of the found subject
    res.status(200).json({ success: true, subjectID: subject._id });
});


// Done
const getSubjectDetailsBySubjectID = asyncHandler(async (req, res) => {
    const subjectID = req.body.subjectID;

    try {
        // Step 1: Find the subject document by ID
        const subject = await Subject.findById(subjectID);

        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }

        // Step 2: Return the details of the found subject
        res.status(200).json({ success: true, subject: subject });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, error: error.message });
    }
});

// Done
// step 1 :
const getSemByYearBranch = asyncHandler(async (req, res) => {
    const { year, branch } = req.body;

    try {
        // Use aggregation pipeline to group by semester
        const result = await Subject.aggregate([
            { $match: { year, branch } }, // Match documents with the specified year and branch
            { $group: { _id: "$semester" } }, // Group by semester
            { $sort: { _id: 1 } } // Sort the result by semester in ascending order
        ]);

        // Extract the semesters from the result
        const semesters = result.map(item => item._id);

        // Return the list of semesters
        res.status(200).json({ success: true, semesters });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, error: error.message });
    }
});




// Done
// step 2:
// year, sem, branch
// return subject list array of of that year sem branch
const getSubjectListByYSB = asyncHandler(async (req, res) => {
    try {
        const { year, semester, branch } = req.body; // Extract query parameters
        console.log(year, semester, branch)

        // Ensure that all required parameters are provided
        if (!year || !semester || !branch) {
            return res.status(400).json({ success: false, error: 'Missing required query parameters' });
        }

        // Find subjects based on the provided year, sem, and branch
        const subjects = await Subject.find({ year, semester, branch });

        // Return the list of subjects
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});


// Done
// step 3 :
const getModeListAndBatchListByYSBSub = asyncHandler(async (req, res) => {
    const { year, semester, branch, subject } = req.body;

    try {
        // Aggregation pipeline to match the subject based on provided parameters
        const pipeline = [
            {
                $match: {
                    year,
                    semester: parseInt(semester), // Convert semester to integer
                    branch,
                    subject
                }
            },
            {
                $project: {
                    _id: 0,
                    mode: 1,
                    applicableBatchNames: 1
                }
            }
        ];

        // Perform aggregation
        const result = await Subject.aggregate(pipeline);

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }

        // Return mode list and batch list in the response
        const { mode, applicableBatchNames } = result[0];
        res.status(200).json({ success: true, mode, applicableBatchNames });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, error: error.message });
    }
});




// pending
// req.body contains Admin ID 
// fetch the working details array of Admin and list all subjects from it
const getSubjectListByAdminID = asyncHandler(async (req, res) => {
    const { adminID } = req.body;

    // Step 1: Find the admin document
    const admin = await Admin.findById(adminID).select('workingDetails').populate('workingDetails.subject', 'subject');

    if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Step 2: Extract subject IDs from workingDetails
    const subjectIDs = admin.workingDetails.map(detail => detail.subject._id);

    // Step 3: Fetch subject details from the database
    const subjects = await Subject.find({ _id: { $in: subjectIDs } });

    // Step 4: Extract subject names from the fetched subjects
    const subjectNames = subjects.map(subject => subject.subject);

    // Step 5: Return the list of subject names
    res.status(200).json({ success: true, subjects: subjectNames });
});


// returns subjects list assigned to teacher/hod(admin) along with year, sem , branch, theory/practical/tutorial, batch options
const getSubjectSwitchOptionList = asyncHandler(async (req, res) => {
    try {
        const { role, _id } = req.user; // Extract user role and ID from request user object

        let subjects = []; // Initialize subjects array

        // Check user role to determine the type of subjects to fetch
        if (role === 'Teacher' || role === 'HOD') {
            // Fetch subjects assigned to the teacher or HOD based on their ID
            subjects = await Subject.find({ "workingDetails.teacher": _id })
                .populate('workingDetails.subject', 'subject year semester branch mode applicableBatchNames');
        }

        // Return the list of subjects with relevant details
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});


// for resource sharing
const getAdminsAllSubjectList = asyncHandler( async(req, res)=>{

})


export {
    addSubject,
    getAllSubject,
    updateSubject,
    deleteSubject,
    getSubjectListByAdminID,
    getSubjectIDByOther,
    getSubjectDetailsBySubjectID,
    
    getSemByYearBranch,
    getSubjectListByYSB,
    getModeListAndBatchListByYSBSub,

    getSubjectSwitchOptionList,


    getAdminsAllSubjectList,
}
// subjects.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../models/subjects.models.js";

// chatgpt
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

// chatgpt
const getSubject = asyncHandler(async (req, res) => {
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

// chatgpt
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

// chatgpt
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


// chatgpt
// year, sem, branch
// return subject list array
const getSubjectListBy = asyncHandler(async (req, res) => {
    try {
        const { year, sem, branch } = req.query; // Extract query parameters

        // Build query object based on provided parameters
        const query = {};
        if (year) query.year = year;
        if (sem) query.semester = sem;
        if (branch) query.branch = branch;

        // Find subjects based on the query object
        const subjects = await Subject.find(query);

        // Return the list of subjects
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        // Handle errors and send appropriate response
        res.status(500).json({ success: false, error: error.message });
    }
});


// chatgpt
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


export {
    addSubject,
    getSubject,
    updateSubject,
    deleteSubject,
    getSubjectListBy,
    getSubjectSwitchOptionList,

}
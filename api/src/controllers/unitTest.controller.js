// unitTest.controller.js

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UnitTest } from '../models/unitTest.models.js';


// @desc    Get all users marks 
// @route   GET /api/v1/marks/:classId?subject=:subject&section=:section
// @access  Public


// chatgpt
// in front end display changed ut marks fields (student name - rollno - marks (ut1, ut2))
// subject wise adding ut1 and ut2

// return success msg with object

// if-else

// update subject marks which is changed

// return success msg with object
const addAndUpdateMarksSubjectWise = asyncHandler(async (req, res) => {
    // Extracting data from request body
    const { subject, marks } = req.body;

    // Checking if the subject and marks are provided
    if (!subject || !marks) {
        throw new ApiError(400, "Subject and marks are required.");
    }

    // Assuming marks is an array of objects containing student details and their UT marks
    // Structure: [{ studentName: string, rollNo: string, ut1: number, ut2: number }]
    // You can adjust this structure as per your data model

    // Perform validation if needed

    // For each student, add or update the UT marks for the given subject
    marks.forEach(async (mark) => {
        const { studentName, rollNo, ut1, ut2 } = mark;

        // Assuming you have a model named UnitTest to store UT marks
        // You may need to adjust this based on your actual schema
        const existingMarks = await UnitTest.findOne({ student: rollNo, subject });

        if (existingMarks) {
            // Update existing UT marks
            existingMarks.ut1 = ut1;
            existingMarks.ut2 = ut2;
            await existingMarks.save();
        } else {
            // Create new UT marks entry
            await UnitTest.create({
                student: rollNo,
                subject,
                ut1,
                ut2
            });
        }
    });

    // Sending success response
    res.status(200).json({
        success: true,
        message: "UT marks added/updated successfully."
    });
});


// chatgpt
// subject wise ut1 and ut2 single user

// return rollno, name, ut1 marks, ut2 marks, average, class ranking
const getUserMarksSubjectWise = asyncHandler(async (req, res) => {
    // Extracting data from request parameters
    const { rollNo, subject } = req.params;

    // Fetching UT marks for the given subject and user
    const userMarks = await UnitTest.findOne({ student: rollNo, subject });

    // Assuming you have logic to calculate average marks and class ranking
    // You may need to adjust this based on your actual implementation

    // Calculate average marks
    const averageMarks = (userMarks.ut1 + userMarks.ut2) / 2;

    // Calculate class ranking
    // For simplicity, let's assume the ranking is stored in a separate model named UserRanking
    const classRanking = await UserRanking.findOne({ subject, user: rollNo });

    // Sending response with user marks, average, and class ranking
    res.status(200).json({
        rollNo,
        name: userMarks.studentName,
        ut1: userMarks.ut1,
        ut2: userMarks.ut2,
        average: averageMarks,
        classRanking
    });
});



// chatgpt
// All subjects marks ut1 and ut2 single user

// return rollno, name, subjectname (ut2 marks, ut2 marks), average of all, class ranking
const getUserMarksAllSubjectsCombined = asyncHandler(async (req, res) => {
    // Extracting data from request parameters
    const { rollNo } = req.params;

    // Fetching all subjects marks for the given user
    const userMarks = await UnitTest.find({ student: rollNo }).populate('subject');

    // Assuming you have logic to calculate average marks and class ranking
    // You may need to adjust this based on your actual implementation

    // Calculate total marks for each subject and average marks across all subjects
    let totalMarks = 0;
    let totalSubjects = 0;
    const subjectMarks = userMarks.map(mark => {
        const subjectName = mark.subject.subject;
        const averageMarks = (mark.ut1 + mark.ut2) / 2;
        totalMarks += averageMarks;
        totalSubjects++;
        return { subjectName, ut1: mark.ut1, ut2: mark.ut2, averageMarks };
    });

    // Calculate average marks across all subjects
    const averageAcrossSubjects = totalMarks / totalSubjects;

    // Calculate class ranking
    // For simplicity, let's assume the ranking is stored in a separate model named UserRanking
    const classRanking = await UserRanking.findOne({ user: rollNo });

    // Sending response with user marks for all subjects, average across all subjects, and class ranking
    res.status(200).json({
        rollNo,
        name: userMarks[0].studentName, // Assuming all marks belong to the same user
        subjectMarks,
        averageAcrossSubjects,
        classRanking
    });
});



// chatgpt
// subject wise ut1 and ut2

// return rollno, name, ut1 marks, ut2 marks, average, class ranking
const getAllUserMarksSubjectWise = asyncHandler(async (req, res) => {
    // Fetching all user marks for the specified subject
    const { subjectId } = req.params;
    const userMarks = await UnitTest.find({ subject: subjectId }).populate('student');

    // Assuming you have logic to calculate average marks and class ranking
    // You may need to adjust this based on your actual implementation

    // Calculate total marks for each user and average marks across all users
    let totalMarks = 0;
    let totalUsers = 0;
    const userWiseMarks = userMarks.map(mark => {
        const userName = `${mark.student.firstName} ${mark.student.lastName}`;
        const averageMarks = (mark.ut1 + mark.ut2) / 2;
        totalMarks += averageMarks;
        totalUsers++;
        return { userName, ut1: mark.ut1, ut2: mark.ut2, averageMarks };
    });

    // Calculate average marks across all users
    const averageAcrossUsers = totalMarks / totalUsers;

    // Calculate class ranking
    // For simplicity, let's assume the ranking is stored in a separate model named UserRanking
    const classRanking = await UserRanking.find({ subject: subjectId });

    // Sending response with user marks for the specified subject, average across all users, and class ranking
    res.status(200).json({
        subjectId,
        subjectName: userMarks[0].subject, // Assuming all marks belong to the same subject
        userWiseMarks,
        averageAcrossUsers,
        classRanking
    });
});


// chatgpt
// All subjects marks ut1 and ut2

// return rollno, name, subjectname (ut2 marks, ut2 marks), average of all, class ranking
const getAllUserMarksAllSubjectsCombined = asyncHandler(async (req, res) => {
    // Fetching all user marks for all subjects
    const userMarks = await UnitTest.find().populate('student').populate('subject');

    // Assuming you have logic to calculate average marks and class ranking
    // You may need to adjust this based on your actual implementation

    // Calculate total marks for each user and average marks across all users
    let totalMarks = 0;
    let totalUsers = 0;
    const userWiseMarks = {};
    userMarks.forEach(mark => {
        const userId = mark.student._id;
        const userName = `${mark.student.firstName} ${mark.student.lastName}`;
        const subjectName = mark.subject.subject;
        const averageMarks = (mark.ut1 + mark.ut2) / 2;
        totalMarks += averageMarks;
        totalUsers++;
        if (!userWiseMarks[userId]) {
            userWiseMarks[userId] = { userName, marks: [] };
        }
        userWiseMarks[userId].marks.push({ subjectName, ut1: mark.ut1, ut2: mark.ut2, averageMarks });
    });

    // Calculate average marks across all users
    const averageAcrossUsers = totalMarks / totalUsers;

    // Calculate class ranking
    // For simplicity, let's assume the ranking is stored in a separate model named UserRanking
    const classRanking = await UserRanking.find();

    // Sending response with user marks for all subjects, average across all users, and class ranking
    res.status(200).json({
        userWiseMarks,
        averageAcrossUsers,
        classRanking
    });
});


// chatgpt
// deletion of ut1 or ut2 of that subject

// return success
const deleteAllUserMarksSubjectWise = asyncHandler(async (req, res) => {
    const { subjectId } = req.params;

    // Assuming you have logic to delete all marks for a specific subject
    await UnitTest.deleteMany({ subject: subjectId });

    // Sending success response
    res.status(200).json({ success: true, message: 'All marks for the subject have been deleted successfully.' });
});


export {
    addAndUpdateMarksSubjectWise,
    getUserMarksSubjectWise,
    getUserMarksAllSubjectsCombined,
    getAllUserMarksSubjectWise,
    getAllUserMarksAllSubjectsCombined,
    deleteAllUserMarksSubjectWise,
};
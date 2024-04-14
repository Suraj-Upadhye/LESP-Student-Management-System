// unitTest.controller.js

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UnitTest } from '../models/unitTest.models.js';
import { User } from '../models/user.models.js';
import axios from 'axios';


const getStudentDataForFillUTMarks = asyncHandler(async (req, res) => {

    const { year, semester, branch, division } = req.body;

    console.log(req.body)

    let aggregationPipeline = [];

    // Match stage to filter documents based on session type and other criteria
    aggregationPipeline.push({
        $match: {
            year,
            semester: String(semester),
            branch,
            division,
            role: "Student",
            isEmailVerified: true
        }
    });

    // Project stage to include specific fields in the output
    aggregationPipeline.push({
        $project: {
            _id: 1,
            firstName: 1,
            middleName: 1,
            lastName: 1,
            rollNo: 1
        }
    });

    // Perform aggregation
    let userData = await User.aggregate(aggregationPipeline);
    console.log(userData);

    // Return the list of students
    res.status(200).json(new ApiResponse(200, "Success", userData));

});


// one subject all student
// 1. main      // for teacher and hod only
const addAndUpdateMarksSubjectWise = asyncHandler(async (req, res) => {
    // Extracting data from request body
    const { teacher, year, semester, division, branch, subjectName, studentList } = req.body;

    const { _id } = req.user;

    // Get the subject ID based on the subject name
    const subjectResponse = await axios.post('http://localhost:8000/api/v1/subject/getSubjectIDByOther', {
        year,
        branch,
        semester,
        subjectName
    });
    const subjectId = subjectResponse.data.subjectID;

    try {
        // Check if UT marks entry already exists for this subject
        let existingMarks = await UnitTest.findOne({ subject: subjectId });

        if (existingMarks) {
            // Update existing UT marks for this subject
            for (const student of studentList) {
                const { student: studentId, ut1, ut2 } = student;
                const studentIndex = existingMarks.studentList.findIndex(student => student.student.toString() === studentId);

                if (studentIndex !== -1) {
                    existingMarks.studentList[studentIndex].ut1 = ut1;
                    existingMarks.studentList[studentIndex].ut2 = ut2;
                } else {
                    // If student not found in existing marks, add them to the list
                    existingMarks.studentList.push({ student: studentId, ut1, ut2 });
                }
            }
            await existingMarks.save();
        } else {
            // Create new UT marks entry
            const newUnitTest = new UnitTest({
                teacher,
                subject: subjectId,
                division,
                studentList: studentList.map(student => ({ student: student.student, ut1: student.ut1, ut2: student.ut2 }))
            });
            await newUnitTest.save();
        }

        // Sending success response
        res.status(200).json({
            success: true,
            message: "UT marks added/updated successfully."
        });
    } catch (error) {
        // Handle any errors
        console.error(`Error adding/updating UT marks: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding/updating UT marks."
        });
    }
});



// All subjects marks ut1 and ut2 single user
// return rollno, name, subjectname (ut2 marks, ut2 marks), average of all, class ranking

// all subjects one student
// 2. main      // for student only
const getUserMarksAllSubjectsCombined = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    // Fetching all subjects marks for the given user
    const userMarks = await UnitTest.find({ 'studentList.student': _id }).populate('subject');

    // Formatting the marks for each subject
    const formattedMarks = userMarks.map(mark => {
        const subjectName = mark.subject.subject;
        const ut1 = mark.studentList.find(student => String(student.student) === String(_id)).ut1;
        const ut2 = mark.studentList.find(student => String(student.student) === String(_id)).ut2;
        const averageMarks = (ut1 + ut2) / 2;
        return { s_name: subjectName, ut1, ut2, averageMarks };
    });

    // Adding serial numbers
    formattedMarks.forEach((mark, index) => {
        mark.sr_no = (index + 1).toString();
    });

    res.status(200).json(formattedMarks);
});

// subject wise ut1 and ut2
// return rollno, name, ut1 marks, ut2 marks, average, class ranking

// one subject all student
// 3. main          // for teacher and hod only
const getAllUserMarksSubjectWise = asyncHandler(async (req, res) => {
    // Fetching all user marks for the specified subject

    const { year, branch, semester, division, subjectName } = req.body; // subject finding

    const { subjectId } = req.params;       // not needed
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


// Done  
// deletion of ut1 or ut2 of that subject
// return success
// one subject all student
// 4. maintainance
const deleteAllUserMarksSubjectWise = asyncHandler(async (req, res) => {
    const { subjectId } = req.body;

    // Assuming you have logic to delete all marks for a specific subject
    await UnitTest.deleteMany({ subject: subjectId });

    // Sending success response
    res.status(200).json({ success: true, message: 'All marks for the subject have been deleted successfully.' });
});



// future scope

// subject wise ut1 and ut2 single user
// return rollno, name, ut1 marks, ut2 marks, average, class ranking

// one subject one student
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

// All subjects marks ut1 and ut2
// return rollno, name, subjectname (ut2 marks, ut2 marks), average of all, class ranking

// all subject all student
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

export {
    addAndUpdateMarksSubjectWise,
    getUserMarksAllSubjectsCombined,
    getAllUserMarksSubjectWise,
    deleteAllUserMarksSubjectWise,

    getStudentDataForFillUTMarks
};
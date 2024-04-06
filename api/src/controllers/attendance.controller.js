// attendance.controller.js
import { Attendance } from '../models/attendance.models.js';
import { User } from '../models/user.models.js';
import { Admin } from '../models/admin.models.js';
import { Subject } from '../models/subjects.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from 'axios';

// Done
const getStudentsDataListForAttendance = asyncHandler(async (req, res) => {
    const { year, branch, semester, division, sessionType, batch } = req.body;

    console.log(req.body)

    let aggregationPipeline = [];

    // Match stage to filter documents based on session type and other criteria
    if (sessionType === "Lecture") {
        aggregationPipeline.push({
            $match: {
                year,
                branch,
                semester: String(semester),
                division,
                role: "Student",
                isEmailVerified: true
            }
        });
    } else if (sessionType === "Practical" || sessionType === "Tutorial") {
        aggregationPipeline.push({
            $match: {
                year,
                branch,
                semester: String(semester),
                division,
                role: "Student",
                batch
            }
        });
    } else {
        // If session type is invalid, throw an error
        throw new ApiError(400, "Invalid session type");
    }

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




// Done
const fillAttendance = asyncHandler(async (req, res) => {
    const { date, teacherId, year, semester, branch, subjectName, studentList, sessionType, batchBelongs, remark } = req.body;

    try {
        // Get the subject ID based on the subject name
        const subjectResponse = await axios.post('http://localhost:8000/api/v1/subject/getSubjectIDByOther', {
            year,
            branch,
            semester,
            subjectName
        });
        const subjectId = subjectResponse.data.subjectID;

        // Find or create attendance record for the given date
        let attendanceRecord = await Attendance.findOne({ date });

        if (!attendanceRecord) {
            // Create a new attendance record if it doesn't exist for the given date
            attendanceRecord = new Attendance({ date });
        }

        // Push new attendance data into attendanceData array
        attendanceRecord.attendanceData.push({
            teacherId,
            subjectId,
            studentList,
            sessionType,
            batchBelongs,
            remark
        });

        // Save the updated attendance record
        await attendanceRecord.save();

        res.status(200).json({ success: true, message: 'Attendance filled successfully' });
    } catch (error) {
        throw new ApiError(500, 'Failed to fill attendance', error);
    }
});


// pending 
// something missing or wrong approach
// data from frontend teacherId, year, branch, division, sessionType, batch(if sessionType is practical or tutorial), subject name
// get attendance data of one subject at a time 
// if lecture then return all students data without filteration of batch and also return name of teacher, subject name, semester, class, academic year, roll no of student, student name, lecture no, date, total present, total absent , remark, content carried out lecture wise
// if practical or tutorial then return only that batch student data and also return batch, name of teacher, subject name, semester, class, academic year, roll no of student, student name, lecture no, date, total present, total absent , remark, Experiment carried out practical wise

const getAttendanceData = asyncHandler(async (req, res) => {
    try {
        // Extract request parameters
        const { subjectName, sessionType, batch } = req.body;

        // Find the subject
        const subject = await Subject.findOne({ subject: subjectName });
        if (!subject) {
            return res.status(404).json({ success: false, error: "Subject not found" });
        }

        // Fetch attendance data based on sessionType
        let attendanceData;
        if (sessionType === "Lecture") {
            attendanceData = await Attendance.find({
                "attendanceData.subjectId": subject._id,
                "attendanceData.sessionType": "Lecture"
            }).populate({
                path: "attendanceData.studentList.studentId",
                select: "firstName lastName middleName rollNo year semester branch"
            }).select("date attendanceData.studentList.state");
        } else if (sessionType === "Practical" || sessionType === "Tutorial") {
            attendanceData = await Attendance.find({
                "attendanceData.subjectId": subject._id,
                "attendanceData.sessionType": sessionType,
                "attendanceData.batchBelongs": batch
            }).populate({
                path: "attendanceData.studentList.studentId",
                select: "firstName lastName middleName rollNo year semester branch"
            }).select("date attendanceData.studentList.state attendanceData.batchBelongs");
        } else {
            return res.status(400).json({ success: false, error: "Invalid sessionType" });
        }

        // Prepare formatted attendance data
        const formattedAttendance = {};
        for (const data of attendanceData) {
            const key = data.date.toISOString().split('T')[0]; // Extract date without time
            if (!formattedAttendance[key]) {
                formattedAttendance[key] = [];
            }
            for (const item of data.attendanceData) {
                for (const student of item.studentList) {
                    formattedAttendance[key].push({
                        date: key,
                        subjectName: subjectName,
                        studentName: `${student.studentId.firstName} ${student.studentId.middleName} ${student.studentId.lastName}`,
                        rollNo: student.studentId.rollNo,
                        status: student.state,
                        batch: item.batchBelongs || "",
                        sessionType: item.sessionType,
                        year: student.studentId.year,
                        semester: student.studentId.semester,
                        branch: student.studentId.branch,
                        // You can add teacherName here if it's available in your schema
                    });
                }
            }
        }

        // Return the useful attendance data
        res.status(200).json({ success: true, data: formattedAttendance });

    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch attendance data." });
    }
});









// future scope
const updateAttendanceBySubjectAllStudents = asyncHandler(async (req, res) => {
    // Extract necessary data from request body
    const { subject, date, attendanceData } = req.body;

    // Validate required fields
    if (!subject || !date || !attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
        throw new ApiError(400, "Subject, date, and attendance data are required");
    }

    // Perform bulk update of attendance records
    const bulkOperations = attendanceData.map(data => ({
        updateOne: {
            filter: { student: data.student, subject, date },
            update: { state: data.state }
        }
    }));

    // Execute bulk update
    const result = await Attendance.bulkWrite(bulkOperations);

    return res.status(200).json(
        new ApiResponse(200, result, "Attendance records updated successfully")
    );
});

// future scope
const deleteAttendanceBySubjectAllStudents = asyncHandler(async (req, res) => {
    // Extract subject and date from request body
    const { subject, date } = req.body;

    // Validate required fields
    if (!subject || !date) {
        throw new ApiError(400, "Subject and date are required");
    }

    // Delete attendance records for the given subject and date
    const result = await Attendance.deleteMany({ subject, date });

    return res.status(200).json(
        new ApiResponse(200, result, "Attendance records deleted successfully")
    );
});

const getAttendanceSubjectWiseSingleStudent = asyncHandler(async (req, res) => {
    // Extract mode and batch from request body
    const { mode, batch } = req.body;

    // Validate required fields
    if (!mode) {
        throw new ApiError(400, "Mode (theory/practical/tutorial) is required");
    }

    // Define query object
    const query = { sessionType: mode };

    // If mode is practical or tutorial, add batch to the query
    if (mode !== 'theory' && batch) {
        query.batchBelongs = batch;
    }

    // Find attendance records matching the query
    const attendanceRecords = await Attendance.find(query);

    // Return the attendance records
    res.status(200).json(attendanceRecords);
});

const getAttendanceAllSubjectsSingleStudent = asyncHandler(async (req, res) => {
    // Extract mode and batch from request body
    const { mode, batch } = req.body;

    // Validate required fields
    if (!mode) {
        throw new ApiError(400, "Mode (theory/practical/tutorial) is required");
    }

    // Define query object
    const query = { sessionType: mode };

    // If mode is practical or tutorial, add batch to the query
    if (mode !== 'theory' && batch) {
        query.batchBelongs = batch;
    }

    // Find attendance records matching the query
    const attendanceRecords = await Attendance.find(query);

    // Return the attendance records
    res.status(200).json(attendanceRecords);
});



export {
    getStudentsDataListForAttendance,
    fillAttendance,
    getAttendanceData,
    // getAttendanceSubjectWiseAllStudents,
    getAttendanceSubjectWiseSingleStudent,
    getAttendanceAllSubjectsSingleStudent,

}

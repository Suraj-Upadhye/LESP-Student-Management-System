// attendance.controller.js
import { Attendance } from '../models/attendance.models.js';
import { User } from '../models/user.models.js';
import { Admin } from '../models/admin.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const takeAttendanceEssentials = asyncHandler(async (req, res) => {
    // Extract teacher data from request body
    const { teacher } = req.body;

    // Validate required fields
    if (!teacher) {
        throw new ApiError(400, "Teacher data is required");
    }

    // Perform necessary actions with the teacher data

    // Send response
    res.status(200).json({ message: "Attendance essentials received successfully" });
});

// Done
const fillAttendance = asyncHandler(async (req, res) => {
    const { date, attendanceData } = req.body;

    try {
        // Find or create attendance record for the given date
        let attendanceRecord = await Attendance.findOne({ date });

        if (!attendanceRecord) {
            // Create a new attendance record if it doesn't exist for the given date
            attendanceRecord = new Attendance({ date });
        }

        // Append attendance data to the attendance record
        attendanceRecord.attendanceData.push(...attendanceData);

        // Save the updated attendance record
        await attendanceRecord.save();

        res.status(200).json({ success: true, message: 'Attendance filled successfully' });
    } catch (error) {
        throw new ApiError(500, 'Failed to fill attendance', error);
    }
});

// pending 
// something missing or wrong approach
const getAttendanceSubjectWiseAllStudents = asyncHandler(async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { subjectId } = req.body;

        // Find attendance records for the given teacher and subject
        const attendanceRecords = await Attendance.find({
            "attendanceData.teacherId": teacherId,
            "attendanceData.subjectId": subjectId
        });

        console.log(attendanceRecords)

        // Extract attendance data subject-wise for all students
        const subjectWiseAttendance = {};
        attendanceRecords.forEach(record => {
            record.attendanceData.forEach(data => {
                const { subjectId, studentList } = data;
                if (!subjectWiseAttendance[subjectId]) {
                    subjectWiseAttendance[subjectId] = [];
                }
                subjectWiseAttendance[subjectId].push(...studentList);
            });
        });

        res.status(200).json({ success: true, data: subjectWiseAttendance });
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
    // addAttendanceSubjectWiseAllStudents,
    fillAttendance,
    getAttendanceSubjectWiseAllStudents,
    getAttendanceSubjectWiseSingleStudent,
    getAttendanceAllSubjectsSingleStudent,

}

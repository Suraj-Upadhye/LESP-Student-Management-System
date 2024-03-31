// attendance.controller.js
import { Attendance } from '../models/attendance.models';
import { User } from '../models/user.models';
import { Admin } from '../models/admin.models';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// chatgpt
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

// chatgpt
const addAttendanceSubjectWiseAllStudents = asyncHandler(async (req, res) => {
    const { subject, date } = req.body;

    // Check if subject and date are provided
    if (!subject || !date) {
        throw new ApiError(400, "Subject and date of attendance are required");
    }

    // Fetch all students
    const students = await User.find({ role: "Student" });

    // Fetch admin/teacher details
    const teacher = await Admin.findOne({ _id: req.user._id });

    // Create attendance records for each student
    const attendanceData = students.map(student => ({
        student: student._id,
        teacher: teacher._id,
        subject,
        state: "Absent", // Default to absent
        sessionType: "Theory", // Default session type
        remark: "", // Default remark
        date
    }));

    // Bulk insert attendance records
    const createdAttendance = await Attendance.insertMany(attendanceData);

    return res.status(201).json(
        new ApiResponse(201, createdAttendance, "Attendance records added successfully")
    );
});

// chatgpt
const getAttendanceSubjectWiseAllStudents = asyncHandler(async (req, res) => {
    const { mode, batch } = req.body;

    // Check if mode is provided
    if (!mode) {
        throw new ApiError(400, "Mode of teaching (theory/practical/tutorial) is required");
    }

    // Fetch admin/teacher details
    const teacher = await Admin.findOne({ _id: req.user._id });

    // Query to find attendance records based on mode and batch (if provided)
    const query = { teacher: teacher._id, sessionType: mode };
    if (mode !== "Theory" && batch) {
        query.batchBelongs = batch;
    }

    // Fetch attendance records
    const attendanceRecords = await Attendance.find(query).populate('student');

    return res.status(200).json(
        new ApiResponse(200, attendanceRecords, "Attendance records fetched successfully")
    );
});

// chatgpt
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

// chatgpt
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

// chatgpt
const getAttendanceSubjectWiseSingle = asyncHandler(async (req, res) => {
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

// chatgpt
const getAttendanceAllSubjectsSingle = asyncHandler(async (req, res) => {
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


const subjectSelection = asyncHandler(async (req, res) => {

})



export {
    addAttendanceSubjectWiseAllStudents,
    getAttendanceSubjectWiseAllStudents,
    updateAttendanceBySubjectAllStudents,
    deleteAttendanceBySubjectAllStudents,
    getAttendanceSubjectWiseSingle,
    getAttendanceAllSubjectsSingle,

}

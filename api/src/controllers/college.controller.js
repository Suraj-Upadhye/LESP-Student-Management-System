// college.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// future scope
const addcollegeNameFormatAttendance = asyncHandler(async (req, res) => {
    // Process the request body to extract attendance data and college name
    const { collegeName, attendanceData } = req.body;

    // Validate if collegeName and attendanceData are provided
    if (!collegeName || !attendanceData) {
        throw new ApiError(400, 'College name and attendance data are required');
    }

    // Format the attendance data by adding collegeName to each entry
    const formattedAttendanceData = attendanceData.map(entry => ({
        ...entry,
        collegeName: collegeName
    }));

    // Respond with the formatted attendance data
    res.status(200).json({ success: true, formattedAttendanceData });
});

// future scope
const getcollegeNameFormatAttendance = asyncHandler(async (req, res) => {
    try {
        // Fetch attendance data from the database with college names
        const attendanceData = await Attendance.find().populate('college', 'name');

        // Format the data to include college names
        const formattedData = attendanceData.map(attendance => ({
            collegeName: attendance.college.name,
            date: attendance.date,
            attendanceData: attendance.attendanceData.map(data => ({
                student: data.student,
                state: data.state
            }))
        }));

        // Send the formatted data as a response
        res.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// future scope
const addcollegeNameAndDescription = asyncHandler(async (req, res) => {
    // Extract collegeName and description from the request body
    const { collegeName, description } = req.body;

    // Check if collegeName and description are provided
    if (!collegeName || !description) {
        throw new ApiError(400, 'College name and description are required');
    }

    // Process the data or perform any necessary operations here

    // Send a success response
    res.status(200).json({ success: true, message: 'College name and description added successfully' });
});

// future scope
const getcollegeNameAndDescription = asyncHandler(async (req, res) => {
    try {
        // Fetch college data from the database
        const colleges = await College.find();

        // Format the data to include only name and description
        const formattedData = colleges.map(college => ({
            name: college.name,
            description: college.description
        }));

        // Send the formatted data as a response
        res.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


export {
    addcollegeNameFormatAttendance,
    addcollegeNameAndDescription,
    getcollegeNameFormatAttendance,
    getcollegeNameAndDescription,
}



// also possible
// export {
//     collegeNameFormatAttendance as checkCollegeNameFormatForAttendance,
//     collegeNameAndDescription as checkCollegeNameAndDescription
// }
// leaveApplication.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Leave } from '../models/leaveApplication.models.js';
import { User } from '../models/user.models.js';
import { Admin } from "../models/admin.models.js";
import { sendLeaveAcceptedEmail, sendLeaveRejectedEmail } from "../utils/sendEmail.js";
import { assign } from "nodemailer/lib/shared/index.js";

// student // teacher
// Done
const addLeaveApplicationStudentTeacher = asyncHandler(async (req, res) => {
    const { _id, role } = req.user;

    const { startDate, endDate, reason } = req.body;

    let userId, adminId;
    console.log(startDate, endDate, reason, _id, role);
    if (role === "Student") {
        userId = _id.toString();
        // Create a new leave application
        const leave = await Leave.create({
            userId,
            startDate,
            endDate,
            reason,
            userType: role
        });
        // Send response
        res.status(201).json({
            success: true,
            data: leave,
            message: 'Leave application added successfully'
        });
    }
    if (role === "Teacher") {
        adminId = _id.toString();
        const leave = await Leave.create({
            adminId,
            startDate,
            endDate,
            reason,
            userType: role
        });
        // Send response
        res.status(201).json({
            success: true,
            data: leave,
            message: 'Leave application added successfully'
        });
    }

});

// Done
// class teacher hod
const getLeaveApplicationListStudentTeacher = asyncHandler(async (req, res) => {
    try {
        const { userType } = req.body;
        if (!userType) {
            console.log("its null");
        }
        else {
            console.log("ok")
        }
        console.log(userType);
        let leaveApplications;
        let userField;

        if (userType === "Student") {
            leaveApplications = await Leave.find({ userType: userType, status: "Pending" })
                .sort('-createdAt')
                .select('userId startDate endDate reason');
            userField = 'userId';
            await removeRejectedAndOutdatedLeaves();
            console.log("here1");
        } else if (userType === "Teacher") {
            leaveApplications = await Leave.find({ userType: userType, status: "Pending" })
                .sort('-createdAt')
                .select('adminId startDate endDate reason');
            userField = 'adminId';
            await removeRejectedAndOutdatedLeaves();
            console.log("here1");
        } else {
            return res.status(400).json({ success: false, message: "Invalid user type" });
        }

        const leaveDetails = await Promise.all(leaveApplications.map(async (leave) => {
            const user = await (userType === "Student" ? User.findById(leave[userField]) : Admin.findById(leave[userField]));
            if (!user) return null; // Handle case where user is not found
            const currentDate = new Date();
            const validForLeave = currentDate >= leave.startDate && currentDate <= leave.endDate;

            return {
                startDate: formatDate(leave.startDate),
                endDate: formatDate(leave.endDate),
                reason: leave.reason,
                _id: leave.adminId || leave.userId,
                userType: userType,
                user: `${user.firstName} ${user.middleName} ${user.lastName}`,
                rollNo: user.rollNo || '', // Assuming rollNo is specific to students
                validForLeave
            };
        }));

        // Filter out null values from leaveDetails array
        const filteredLeaveDetails = leaveDetails.filter(detail => detail !== null);

        res.status(200).json({
            success: true,
            data: filteredLeaveDetails,
            message: 'Leave applications retrieved successfully'
        });
    } catch (error) {
        console.error("Error fetching leave applications:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Done  
// class teacher hod
const approveLeaveApplicationStudentTeacher = asyncHandler(async (req, res) => {
    const { _id, userType } = req.body;

    console.log(_id, userType);
    if (userType === "Student") {
        try {

            // Find the leave application by ID and update its status to 'Approved'
            const leave = await Leave.findOneAndUpdate(
                { userId: _id, status: 'Pending' }, // Filter criteria
                { status: 'Approved' }, // Update
                { new: true } // Options
            ).populate('userId');

            if (!leave) {
                return res.status(404).json({ success: false, message: 'Leave application not found' });
            }
            console.log("approved request student")

            const user = await User.findById(leave.userId).select("email firstName");
            if (!user) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }

            //email
            await sendLeaveAcceptedEmail(user.email, userType, user.firstName);
            await removeRejectedAndOutdatedLeaves();
            // then delete that leave application
            // Send success response with updated leave application
            res.status(200).json({ success: true, data: leave, message: 'Leave application approved successfully' });
        } catch (error) {
            // Handle errors
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    if (userType === "Teacher") {
        try {
            console.log(_id)
            // Find the leave application by ID and update its status to 'Approved'
            const leave = await Leave.findOneAndUpdate(
                { adminId: _id, status: 'Pending' }, // Filter criteria
                { status: 'Approved' }, // Update
                { new: true } // Options
            ).populate('adminId');

            if (!leave) {
                return res.status(404).json({ success: false, message: 'Leave application not found' });
            }
            console.log("approved request teacher")

            const admin = await Admin.findById(leave.adminId).select("email firstName");
            if (!admin) {
                return res.status(404).json({ success: false, message: 'Teacher not found' });
            }

            //email
            await sendLeaveAcceptedEmail(admin.email, userType, admin.firstName);
            await removeRejectedAndOutdatedLeaves();
            // then delete that leave application
            // Send success response with updated leave application
            res.status(200).json({ success: true, data: leave, message: 'Leave application approved successfully' });
        } catch (error) {
            // Handle errors
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }


});

// Done
// class teacher hod
const rejectLeaveApplicationStudentTeacher = asyncHandler(async (req, res) => {
    const { _id, userType } = req.body;

    if (userType === "Student") {
        try {

            // Find the leave application by ID and update its status to 'Rejected'
            const leave = await Leave.findOneAndUpdate(
                { userId: _id, status: 'Pending' }, // Filter criteria
                { status: 'Rejected' }, // Update
                { new: true } // Options
            ).populate('userId'); 

            if (!leave) {
                return res.status(404).json({ success: false, message: 'Leave application not found' });
            }

            const user = await User.findById(leave.userId).select("email firstName");
            if (!user) {
                return res.status(404).json({ success: false, message: 'Student not found' });
            }

            //email
            await sendLeaveRejectedEmail(user.email, userType, user.firstName);
            await removeRejectedAndOutdatedLeaves();
            // then delete that leave application
            // Send success response with updated leave application
            res.status(200).json({ success: true, data: leave, message: 'Leave application rejected!' });
        } catch (error) {
            // Handle errors
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    if (userType === "Teacher") {
        try {
            // Find the leave application by ID and update its status to 'Rejected'
            const leave = await Leave.findOneAndUpdate(
                { adminId: _id, status: 'Pending' }, // Filter criteria
                { status: 'Rejected' }, // Update
                { new: true } // Options
            ).populate('adminId');

            if (!leave) {
                return res.status(404).json({ success: false, message: 'Leave application not found' });
            }

            const admin = await Admin.findById(leave.adminId).select("email firstName");
            if (!admin) {
                return res.status(404).json({ success: false, message: 'Teacher not found' });
            }

            //email
            await sendLeaveRejectedEmail(admin.email, userType, admin.firstName);
            await removeRejectedAndOutdatedLeaves();
            // then delete that leave application
            // Send success response with updated leave application
            res.status(200).json({ success: true, data: leave, message: 'Leave application rejected!' });
        } catch (error) {
            // Handle errors
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

});

// Done
// class teacher and  hod
const removeRejectedAndOutdatedLeaves = async () => {
    try {
        // Define filter conditions
        const filter = {
            $or: [
                { status: 'Rejected' }, // Rejected leave requests
                { endDate: { $lt: new Date() } } // Outdated leave requests (end date is before current date)
            ]
        };

        // Delete rejected and outdated leave requests
        const result = await Leave.deleteMany(filter);

        console.log(`${result.deletedCount} leave requests have been deleted.`);
    } catch (error) {
        console.error('Error occurred while deleting leave requests:', error);
    }
};




// future scope
const listApprovedLeaveApplication = asyncHandler(async (req, res) => {
    try {
        // Find all approved leave applications
        const approvedLeaveApplications = await Leave.find({ status: 'Approved' }).populate('userId', 'firstName lastName rollNo');

        // Prepare response data
        const data = approvedLeaveApplications.map(leave => ({
            id: leave._id,
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            user: `${leave.userId.firstName} ${leave.userId.lastName}`,
            rollNo: leave.userId.rollNo
        }));

        // Send success response with approved leave applications
        res.status(200).json({ success: true, data });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// future scope
const updateLeaveApplication = asyncHandler(async (req, res) => {
    // Extract leave application ID from request parameters
    const { id } = req.params;

    // Extract update fields from request body
    const { status } = req.body;

    try {
        // Find the leave application by ID and update its status
        const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }

        // Send success response with updated leave application
        res.status(200).json({ success: true, data: leave, message: 'Leave application updated successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// future scope
const deleteLeaveApplication = asyncHandler(async (req, res) => {
    // Extract leave application ID from request parameters
    const { id } = req.params;

    try {
        // Find the leave application by ID and delete it
        const leave = await Leave.findByIdAndDelete(id);

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }

        // Send success response with deleted leave application
        res.status(200).json({ success: true, data: leave, message: 'Leave application deleted successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


export {
    addLeaveApplicationStudentTeacher,

    getLeaveApplicationListStudentTeacher,

    approveLeaveApplicationStudentTeacher,

    rejectLeaveApplicationStudentTeacher,

    removeRejectedAndOutdatedLeaves,
}
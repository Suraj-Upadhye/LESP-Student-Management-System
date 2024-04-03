// leaveApplication.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Leave } from '../models/leaveApplication.models.js';
import { User } from '../models/user.models.js';



// All Future Scope

const addLeaveApplication = asyncHandler(async (req, res) => {
    const { userId, adminId, startDate, endDate, reason, status } = req.body;

    // Create a new leave application
    const leave = await Leave.create({
        userId,
        adminId,
        startDate,
        endDate,
        reason,
        status
    });

    // Send response
    res.status(201).json({
        success: true,
        data: leave,
        message: 'Leave application added successfully'
    });
});

const getLeaveApplication = asyncHandler(async (req, res) => {
    // Find all leave applications
    const leaveApplications = await Leave.find();

    // Construct array to hold leave application details
    const leaveDetails = await Promise.all(leaveApplications.map(async (leave) => {
        // Find user details associated with the leave application
        const user = await User.findById(leave.userId).select('firstName lastName rollNo');

        // Check if leave is valid or not based on current date
        const currentDate = new Date();
        const validForLeave = currentDate >= leave.startDate && currentDate <= leave.endDate;

        // Return leave application details
        return {
            startDate: leave.startDate,
            endDate: leave.endDate,
            user: `${user.firstName} ${user.lastName}`,
            rollNo: user.rollNo,
            validForLeave
        };
    }));

    // Send response
    res.status(200).json({
        success: true,
        data: leaveDetails,
        message: 'Leave applications retrieved successfully'
    });
});

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

const approveLeaveApplication = asyncHandler(async (req, res) => {
    // Extract leave application ID from request parameters
    const { id } = req.params;

    try {
        // Find the leave application by ID and update its status to 'Approved'
        const leave = await Leave.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }

        // Send success response with updated leave application
        res.status(200).json({ success: true, data: leave, message: 'Leave application approved successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


const rejectLeaveApplication = asyncHandler(async (req, res) => {
    // Extract leave application ID from request parameters
    const { id } = req.params;

    try {
        // Find the leave application by ID and update its status to 'Rejected'
        const leave = await Leave.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave application not found' });
        }

        // Send success response with updated leave application
        res.status(200).json({ success: true, data: leave, message: 'Leave application rejected successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const listPendingLeaveApplication = asyncHandler(async (req, res) => {
    try {
        // Find all pending leave applications
        const pendingLeaveApplications = await Leave.find({ status: 'Pending' }).populate('userId', 'firstName lastName rollNo');

        // Prepare response data
        const data = pendingLeaveApplications.map(leave => ({
            id: leave._id,
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            user: `${leave.userId.firstName} ${leave.userId.lastName}`,
            rollNo: leave.userId.rollNo
        }));

        // Send success response with pending leave applications
        res.status(200).json({ success: true, data });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

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



export {
    addLeaveApplication,
    getLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication,
    approveLeaveApplication,
    rejectLeaveApplication,
    listPendingLeaveApplication,
    listApprovedLeaveApplication,
    
}
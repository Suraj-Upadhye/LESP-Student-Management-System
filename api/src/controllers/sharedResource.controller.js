// sharedResource.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SharedResource } from "../models/sharedResource.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendNewResourceEmail } from "../utils/sendEmail.js";
import { User } from "../models/user.models.js";


// Done
// getSubjectListByCurrentAdmin useful to send which subject resource or which not
// send email to all students
const addSharedResource = asyncHandler(async (req, res) => {
    try {
        const { description, subject } = req.body;
        const { _id, email, firstName, lastName } = req.user; // Assuming user authentication is implemented and user ID is available in req.user
        console.log(_id);
        let resourceFile = "";
        let resourceFileLocalPath;
        if (req.files && Array.isArray(req.files.resourceFile) && req.files.resourceFile.length > 0) {
            resourceFileLocalPath = req.files.resourceFile[0].path


            console.log("local path :", resourceFileLocalPath);

            // if (!resourceFileLocalPath) {
            //     const resourceFile = ""
            // }
            resourceFile = await uploadOnCloudinary(resourceFileLocalPath)


            console.log("cloudinary obj :", resourceFile);

            if (!resourceFile) {
                throw new ApiError(400, "File is not uploaded properly.");
            }
        }

        // Create new shared resource
        const sharedResource = await SharedResource.create({
            resourceFile: resourceFile?.url || "",
            description,
            subject,
            owner: _id
        });


        const { classTeacher } = req.user;
        console.log(classTeacher);
        // only teacher teaching and hod can see this

        const students = await User.find({ year: classTeacher.year, department: classTeacher.branch, semester: classTeacher.semester, division: classTeacher.division, isEmailVerified: true, role: "Student" }).select("_id firstName middleName lastName rollNo");

        console.log(students)
        // // res.status(200).json(students);
        // for (const student of students) {
        //     await sendNewResourceEmail(email, firstName, lastName, student.firstName);
        // }

        res.status(201).json({
            success: true,
            message: 'Shared resource added successfully',
            data: sharedResource
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Done
const getSharedResourcesListSubjectWise = asyncHandler(async (req, res) => {
    try {
        const { subject } = req.body;

        // Query shared resources based on the subject
        const sharedResources = await SharedResource.find({ subject });

        res.status(200).json({
            success: true,
            message: 'Shared resources fetched successfully',
            data: sharedResources
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Done
const getSingleSharedResource = asyncHandler(async (req, res) => {
    try {
        const { resourceId } = req.body;

        // Find the shared resource by its ID
        const resource = await SharedResource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Shared resource not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Shared resource fetched successfully',
            data: resource
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Done
// teacher who sent
// getSubjectListByCurrentAdmin useful to delete which data or which not
const deleteSharedResource = asyncHandler(async (req, res, next) => {
    try {
        const { resourceId } = req.body;
        const { _id } = req.user;

        // Check if the resource exists
        let resource = await SharedResource.find({_id:resourceId, owner: _id});

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Shared resource not found'
            });
        }

        // Delete the resource
        await SharedResource.findByIdAndDelete(resourceId);

        res.status(200).json({
            success: true,
            message: 'Shared resource deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});



// Future Scope

// future scope
const addSharedResources = asyncHandler(async (req, res) => {
    try {
        const { resources } = req.body;
        const { _id: owner } = req.user; // Assuming user authentication is implemented and user ID is available in req.user

        // Create an array to store created shared resources
        const createdResources = [];

        // Iterate over each resource in the request body and create a shared resource
        for (const resourceData of resources) {
            const { resourceFile, description } = resourceData;

            // Create new shared resource
            const sharedResource = await SharedResource.create({
                resourceFile,
                description,
                owner
            });

            createdResources.push(sharedResource);
        }

        res.status(201).json({
            success: true,
            message: 'Shared resources added successfully',
            data: createdResources
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// future scope
const updateSharedResource = asyncHandler(async (req, res, next) => {
    try {
        const { resourceId } = req.params;
        const { resourceFile, description } = req.body;

        // Check if the resource exists
        let resource = await SharedResource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Shared resource not found'
            });
        }

        // Update the resource fields
        resource.resourceFile = resourceFile;
        resource.description = description;

        // Save the updated resource
        await resource.save();

        res.status(200).json({
            success: true,
            message: 'Shared resource updated successfully',
            data: resource
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// future scope
const getSharedResourcesListAllSubjectsMerged = asyncHandler(async (req, res) => {
    try {
        // Query all shared resources
        const sharedResources = await SharedResource.find();

        res.status(200).json({
            success: true,
            message: 'Shared resources fetched successfully',
            data: sharedResources
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});


export {
    addSharedResource,
    getSharedResourcesListSubjectWise,
    getSingleSharedResource,
    deleteSharedResource,
}
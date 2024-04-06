// sharedResource.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SharedResource } from "../models/sharedResource.models.js";


const addSharedResource = asyncHandler(async (req, res) => {
    try {
        const { resourceFile, description, title, resourceType } = req.body;
        const { _id: owner } = req.user; // Assuming user authentication is implemented and user ID is available in req.user

        // Create new shared resource
        const sharedResource = await SharedResource.create({
            resourceFile,
            description,
            title,
            resourceType,
            owner
        });

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

const getSharedResourcesListSubjectWise = asyncHandler(async (req, res) => {
    try {
        const { subject } = req.query;

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

const getSharedResourcesListAllSubjects = asyncHandler(async (req, res) => {
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

const getSharedResourcesListNoticesOnly = asyncHandler(async (req, res) => {
    try {
        // Query only the shared resources with resourceType as "Notice"
        const notices = await SharedResource.find({ resourceType: "Notice" });

        res.status(200).json({
            success: true,
            message: 'Notice shared resources fetched successfully',
            data: notices
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

const getSingleSharedResource = asyncHandler(async (req, res) => {
    try {
        const { resourceId } = req.params;

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

const deleteSharedResource = asyncHandler(async (req, res, next) => {
    try {
        const { resourceId } = req.params;

        // Check if the resource exists
        let resource = await SharedResource.findById(resourceId);

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

// future scope
const addSharedResources = asyncHandler(async (req, res) => {
    try {
        const { resources } = req.body;
        const { _id: owner } = req.user; // Assuming user authentication is implemented and user ID is available in req.user

        // Create an array to store created shared resources
        const createdResources = [];

        // Iterate over each resource in the request body and create a shared resource
        for (const resourceData of resources) {
            const { resourceFile, description, title, resourceType } = resourceData;

            // Create new shared resource
            const sharedResource = await SharedResource.create({
                resourceFile,
                description,
                title,
                resourceType,
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
        const { resourceFile, description, title, resourceType } = req.body;

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
        resource.title = title;
        resource.resourceType = resourceType;

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



export {
    addSharedResource,
    getSharedResourcesListSubjectWise,
    getSharedResourcesListAllSubjects,
    getSharedResourcesListNoticesOnly,
    getSingleSharedResource,
    deleteSharedResource,
}
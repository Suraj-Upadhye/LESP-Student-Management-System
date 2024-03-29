// sharedResource.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SharedResource } from "../models/sharedResource.models.js";


const addSharedResource = asyncHandler(async (req, res) => {

})

// future scope
const addSharedResources = asyncHandler(async (req, res) => {

})

// @desc    Get all shared resources
// @route   GET /api/v1/sharedresources
// @access  Public
const  getSharedResourcesListSubjectWise = asyncHandler(async (req, res) => {

})

const  getSharedResourcesListAllSubjects = asyncHandler(async (req, res) => {

})

const  getSharedResourcesListNoticesOnly = asyncHandler(async (req, res) => {

})

const  getSingleSharedResource = asyncHandler(async (req, res) =>{

})

const  updateSharedResource = asyncHandler(async (req, res, next)=>{

})

const  deleteSharedResource= asyncHandler(async (req,res,next)=> {
    const { id: resourceId } = req.params;
    const resource = await SharedResource.findById(resourceId);
    
    if (!resource) {
        return next(new ErrorResponse(`No Resource with the ID ${resourceId}`,  404));
    }

    // Make sure User is owner of Project
    if (resource.owner != req.admin.id && (req.admin.role !== 'Teacher' || req.admin.role !== 'HOD')) {
      return next(
          new ErrorResponse(
              `User not authorized to perform this action on the Resource`,
              401
          )
      );
  }

    await SharedResource.remove(resourceId);
    res.status(200).json({ success: true, data: {} });
});


export {
    addSharedResource,
    getSharedResourcesListSubjectWise,
    getSharedResourcesListAllSubjects,
    getSharedResourcesListNoticesOnly,
    getSingleSharedResource,
    updateSharedResource,
    deleteSharedResource,
}
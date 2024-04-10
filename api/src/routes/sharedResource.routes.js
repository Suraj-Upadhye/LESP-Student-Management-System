import { Router } from 'express';
import {
    addSharedResource,
    getSharedResourcesListSubjectWise,
    getSingleSharedResource,
    deleteSharedResource,
} 
from '../controllers/sharedResource.controller.js'
const router = Router();

// addSharedResource,
// getSharedResourcesListSubjectWise,
// getSingleSharedResource,
// deleteSharedResource,

router.route("/addSharedResource").post(addSharedResource);
router.route("/getSharedResourcesListSubjectWise").post(getSharedResourcesListSubjectWise);
router.route("/getSingleSharedResource").post(getSingleSharedResource);
router.route("/deleteSharedResource").post(deleteSharedResource);

export default router;
import { Router } from 'express';
import {
    addSharedResource,
    getSharedResourcesListSubjectWise,
    getSingleSharedResource,
    deleteSharedResource,
} 
from '../controllers/sharedResource.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewares.js';
const router = Router();

// addSharedResource,
// getSharedResourcesListSubjectWise,
// getSingleSharedResource,
// deleteSharedResource,

router.route("/addSharedResource").post(verifyJWT,addSharedResource);
router.route("/getSharedResourcesListSubjectWise").post(getSharedResourcesListSubjectWise);
router.route("/getSingleSharedResource").post(getSingleSharedResource);
router.route("/deleteSharedResource").post(deleteSharedResource);

export default router;
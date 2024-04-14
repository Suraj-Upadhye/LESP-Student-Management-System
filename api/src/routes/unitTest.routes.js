import { Router } from 'express';
import {
    addAndUpdateMarksSubjectWise,
    getUserMarksAllSubjectsCombined,
    getAllUserMarksSubjectWise,
    deleteAllUserMarksSubjectWise,
    getStudentDataForFillUTMarks
}
from '../controllers/unitTest.controller.js';
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/addAndUpdateMarksSubjectWise").post(verifyJWT,addAndUpdateMarksSubjectWise);
router.route("/getUserMarksAllSubjectsCombined").get(getUserMarksAllSubjectsCombined);
router.route("/getAllUserMarksSubjectWise").post(getAllUserMarksSubjectWise);
router.route("/deleteAllUserMarksSubjectWise").post(deleteAllUserMarksSubjectWise);
router.route("/getStudentDataForFillUTMarks").post(getStudentDataForFillUTMarks);

export default router;
import { Router } from 'express';
import {
    addAndUpdateMarksSubjectWise,
    getUserMarksAllSubjectsCombined,
    getAllUserMarksSubjectWise,
    deleteAllUserMarksSubjectWise
}
from '../controllers/unitTest.controller.js';

const router = Router();

router.route("/addAndUpdateMarksSubjectWise").post(addAndUpdateMarksSubjectWise);
router.route("/getUserMarksAllSubjectsCombined").get(getUserMarksAllSubjectsCombined);
router.route("/getAllUserMarksSubjectWise").post(getAllUserMarksSubjectWise);
router.route("/deleteAllUserMarksSubjectWise").post(deleteAllUserMarksSubjectWise);

export default router;
import { Router } from 'express';
import {
    addSubject,
    getSubject,
    updateSubject,
    getSubjectIDByOther,
    getSubjectDetailsBySubjectID,
    deleteSubject,
    getSubjectListBy,
    getSubjectSwitchOptionList,
} from '../controllers/subjects.controller.js';

const router = Router();

router.route("/addSubject").post(addSubject);
router.route("/getSubject").get(getSubject);
router.route("/getSubjectListBy").post(getSubjectListBy);
router.route("/getSubjectIDByOther").post(getSubjectIDByOther)
router.route("/getSubjectDetailsBySubjectID").post(getSubjectDetailsBySubjectID);


export default router
import { Router } from 'express';
import {
    addSubject,
    getAllSubject,
    updateSubject,
    getSubjectIDByOther,
    getSubjectDetailsBySubjectID,
    deleteSubject,
    getSemByYearBranch,
    getSubjectListByYSB,
    getModeListAndBatchListByYSBSub,
    getSubjectSwitchOptionList,
} from '../controllers/subjects.controller.js';

const router = Router();

router.route("/addSubject").post(addSubject);
router.route("/getSubject").get(getAllSubject);
router.route("/getSubjectIDByOther").post(getSubjectIDByOther)
router.route("/getSubjectDetailsBySubjectID").post(getSubjectDetailsBySubjectID);

router.route("/getSemByYearBranch").post(getSemByYearBranch);
router.route("/getSubjectListByYSB").post(getSubjectListByYSB);
router.route("/getModeListAndBatchListByYSBSub").post(getModeListAndBatchListByYSBSub);


export default router
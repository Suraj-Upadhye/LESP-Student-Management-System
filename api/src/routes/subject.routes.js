import { Router } from 'express';
import {
    addSubject,
    getAllSubject,
    updateSubject,
    deleteSubject,

    getSubjectIDByOther,
    getSubjectDetailsBySubjectID,

    getSemByYearBranch,
    getSubjectListByYSB,
    getModeListAndBatchListByYSBSub,

    getSubjectListByAdminID,
    getSubjectSwitchOptionList,
    getAdminsAllSubjectList,
}
    from '../controllers/subjects.controller.js';

const router = Router();

router.route("/addSubject").post(addSubject);
router.route("/getSubject").get(getAllSubject);
router.route("/getSubject").post(updateSubject);
router.route("/getSubject").post(deleteSubject);

router.route("/getSubjectIDByOther").post(getSubjectIDByOther)
router.route("/getSubjectDetailsBySubjectID").post(getSubjectDetailsBySubjectID);

router.route("/getSemByYearBranch").post(getSemByYearBranch);
router.route("/getSubjectListByYSB").post(getSubjectListByYSB);
router.route("/getModeListAndBatchListByYSBSub").post(getModeListAndBatchListByYSBSub);

router.route("/getSubjectListByAdminID").post(getSubjectListByAdminID);
router.route("/getSubjectSwitchOptionList").post(getSubjectSwitchOptionList)
router.route("/getAdminsAllSubjectList").post(getAdminsAllSubjectList)


export default router
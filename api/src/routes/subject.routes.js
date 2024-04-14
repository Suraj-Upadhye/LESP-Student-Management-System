import { Router } from 'express';
import {
    addSubject,
    getAllSubject,

    getSubjectIDByOther,
    getSubjectDetailsBySubjectID,

    getSemByYearBranch,
    getSubjectListByYSB,
    getModeListAndBatchListByYSBSub,

    getSubjectListByCurrentAdmin,
    getBatchListByYSBSub,
    getSubjectListByCurrentUser
}
    from '../controllers/subjects.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/addSubject").post(addSubject);
router.route("/getSubject").get(getAllSubject);

router.route("/getSubjectIDByOther").post(getSubjectIDByOther)
router.route("/getSubjectDetailsBySubjectID").post(getSubjectDetailsBySubjectID);

router.route("/getSemByYearBranch").post(getSemByYearBranch);
router.route("/getSubjectListByYSB").post(getSubjectListByYSB);
router.route("/getSubjectListByCurrentUser").post(verifyJWT, getSubjectListByCurrentUser);
router.route("/getModeListAndBatchListByYSBSub").post(getModeListAndBatchListByYSBSub);

router.route("/getSubjectListByCurrentAdmin").post(verifyJWT, getSubjectListByCurrentAdmin);
router.route("/getBatchListByYSBSub").post(getBatchListByYSBSub);



export default router;
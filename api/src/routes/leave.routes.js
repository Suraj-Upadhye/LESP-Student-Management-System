import {Router} from 'express';
import {
    addLeaveApplicationStudentTeacher,

    getLeaveApplicationListStudentTeacher,

    approveLeaveApplicationStudentTeacher,

    rejectLeaveApplicationStudentTeacher,

    removeRejectedAndOutdatedLeaves,
} 
from '../controllers/leaveApplication.controller.js'
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/addLeaveApplicationStudentTeacher").post(verifyJWT,addLeaveApplicationStudentTeacher);
router.route("/getLeaveApplicationListStudentTeacher").post(getLeaveApplicationListStudentTeacher);
router.route("/approveLeaveApplicationStudentTeacher").post(approveLeaveApplicationStudentTeacher);
router.route("/rejectLeaveApplicationStudentTeacher").post(rejectLeaveApplicationStudentTeacher);
router.route("/removeRejectedAndOutdatedLeaves").delete(removeRejectedAndOutdatedLeaves)

export default router;
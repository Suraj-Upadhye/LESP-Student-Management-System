import {Router} from 'express';
import {
    addLeaveApplicationStudentTeacher,

    getLeaveApplicationListStudentTeacher,

    approveLeaveApplicationStudentTeacher,

    rejectLeaveApplicationStudentTeacher,

    removeRejectedAndOutdatedLeaves,
} 
from '../controllers/leaveApplication.controller.js'

const router = Router();

router.route("/addLeaveApplicationStudentTeacher").post(addLeaveApplicationStudentTeacher);
router.route("/getLeaveApplicationListStudentTeacher").post(getLeaveApplicationListStudentTeacher);
router.route("/approveLeaveApplicationStudentTeacher").post(approveLeaveApplicationStudentTeacher);
router.route("/rejectLeaveApplicationStudentTeacher").post(rejectLeaveApplicationStudentTeacher);
router.route("/removeRejectedAndOutdatedLeaves").delete(removeRejectedAndOutdatedLeaves)

export default router;
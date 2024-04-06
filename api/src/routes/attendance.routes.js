import {Router} from "express";
import { fillAttendance, getAttendanceData, getAttendanceSubjectWiseSingleStudent, getStudentsDataListForAttendance, 
    // getAttendanceSubjectWiseAllStudents
 } from "../controllers/attendance.controller.js";

const router = Router();

router.route("/fillAttendance").post(fillAttendance)
router.route("/getStudentsDataListForAttendance").post(getStudentsDataListForAttendance)
router.route("/getAttendanceData").post(getAttendanceData);
router.route("/getAttendanceSubjectWiseSingleStudent").post(getAttendanceSubjectWiseSingleStudent)
// router.route("/getAttendanceSubjectWiseAllStudents/:teacherId").get(getAttendanceSubjectWiseAllStudents)


export default router;
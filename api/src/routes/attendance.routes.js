import {Router} from "express";
import { fillAttendance, getAttendanceData, getAttendanceSubjectWiseSingleStudent, getStudentsDataListForAttendance, 
    // getAttendanceSubjectWiseAllStudents
 } from "../controllers/attendance.controller.js";
 import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/getStudentsDataListForAttendance").post(getStudentsDataListForAttendance)
router.route("/fillAttendance").post(fillAttendance)
router.route("/getAttendanceData").post(getAttendanceData);
router.route("/getAttendanceSubjectWiseSingleStudent").post(verifyJWT,getAttendanceSubjectWiseSingleStudent)
// router.route("/getAttendanceSubjectWiseAllStudents/:teacherId").get(getAttendanceSubjectWiseAllStudents)


export default router;
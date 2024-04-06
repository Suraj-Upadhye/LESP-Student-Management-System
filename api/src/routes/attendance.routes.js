import {Router} from "express";
import { fillAttendance, getAttendanceData, getStudentsDataListForAttendance, 
    // getAttendanceSubjectWiseAllStudents
 } from "../controllers/attendance.controller.js";

const router = Router();

router.route("/fillAttendance").post(fillAttendance)
router.route("/getStudentsDataListForAttendance").post(getStudentsDataListForAttendance)
router.route("/getAttendanceData").post(getAttendanceData);
// router.route("/getAttendanceSubjectWiseAllStudents/:teacherId").get(getAttendanceSubjectWiseAllStudents)


export default router;
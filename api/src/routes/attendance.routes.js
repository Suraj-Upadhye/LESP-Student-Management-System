import {Router} from "express";
import { fillAttendance, 
    // getAttendanceSubjectWiseAllStudents
 } from "../controllers/attendance.controller.js";

const router = Router();

router.route("/fillAttendance").post(fillAttendance)
// router.route("/getAttendanceSubjectWiseAllStudents/:teacherId").get(getAttendanceSubjectWiseAllStudents)


export default router;
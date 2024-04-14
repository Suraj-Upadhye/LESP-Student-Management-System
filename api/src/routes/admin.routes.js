import { Router } from "express";
import {
    registerAdmin,
    newTeacherList,
    acceptNewTeacher,
    newStudentList,
    acceptNewStudent,
    studentBatchAllocation,
    classTeacherAllocation,
    getSubjectSwitchOptionList,
    getSubjectSwitchOptionListForViewAttendance,

    allStudentsList,
    allTeachersList,
    removeStudent,
    removeTeacher,
    viewTeacherProfile,
    viewHODProfile,
    viewStudentProfile,
    rejectNewStudent,
    rejectNewTeacher
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

// Done
router.route("/registerAdmin").post(
    upload.fields([
        {
            name: "profilePhoto",
            maxCount: 1
        },
    ]),  // name of the input  field in form (<input type="file" name="profilePhoto">)
    registerAdmin
)

router.route("/newTeacherList").get(verifyJWT, newTeacherList)
router.route("/acceptNewTeacher").post(acceptNewTeacher)

router.route("/newStudentList").get(verifyJWT, newStudentList)
router.route("/acceptNewStudent").post(acceptNewStudent)

// rejectNewStudent
// rejectNewTeacher
router.route("/rejectNewStudent").post(rejectNewStudent)
router.route("/rejectNewTeacher").post(rejectNewTeacher)

// router.route("/studentBatchAllocation/:studentId").post(studentBatchAllocation)
// router.route("/classTeacherAllocation/:teacherId").post(classTeacherAllocation)

router.route("/getSubjectSwitchOptionList").get(verifyJWT, getSubjectSwitchOptionList)
router.route("/getSubjectSwitchOptionListForViewAttendance").get(verifyJWT, getSubjectSwitchOptionListForViewAttendance);


// allStudentsList,
// allTeachersList,
// removeStudent,
// removeTeacher,
// viewTeacherProfile,
// viewHODProfile,
// viewStudentProfile,

router.route("/allStudentsList").get(verifyJWT, allStudentsList);
router.route("/allTeachersList").get(verifyJWT, allTeachersList);

router.route("/removeStudent").post(removeStudent);
router.route("/removeTeacher").post(removeTeacher);
router.route("/viewTeacherProfile").post(viewTeacherProfile);
router.route("/viewHODProfile").get(verifyJWT, viewHODProfile);
router.route("/viewStudentProfile").post(viewStudentProfile);


export default router;
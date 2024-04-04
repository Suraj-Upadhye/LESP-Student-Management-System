import {Router} from "express";
import { registerAdmin,
    changeCurrentPassword,
    newTeacherList,
    acceptNewTeacher,
    newStudentList,
    acceptNewStudent,
    studentBatchAllocation,
    classTeacherAllocation,
    getSubjectSwitchOptionList,
 } from "../controllers/admin.controller.js";
import {upload} from "../middlewares/multer.middlewares.js";
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
router.route("/acceptNewTeacher/:teacherId").post(acceptNewTeacher)

router.route("/newStudentList").get(verifyJWT, newStudentList)
router.route("/acceptNewStudent/:studentId").post(acceptNewStudent)

router.route("/studentBatchAllocation/:studentId").post(studentBatchAllocation)
router.route("/classTeacherAllocation/:teacherId").post(classTeacherAllocation)

router.route("/getSubjectSwitchOptionList").get(verifyJWT,getSubjectSwitchOptionList)

// not done    
router.route("/changeCurrentPassword").post(changeCurrentPassword)



export default router;
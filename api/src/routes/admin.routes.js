import {Router} from "express";
import { registerAdmin,
    changeCurrentPassword,
    newTeacherList,
    acceptNewTeacher
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

// not done    
router.route("/changeCurrentPassword").post(changeCurrentPassword)



export default router;
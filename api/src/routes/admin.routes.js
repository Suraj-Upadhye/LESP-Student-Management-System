import {Router} from "express";
import { registerAdmin,
    changeCurrentPassword
 } from "../controllers/admin.controller.js";
import {upload} from "../middlewares/multer.middlewares.js";


const router = Router();

router.route("/registerAdmin").post(
    upload.fields([
        {
            name: "profilePhoto",
            maxCount: 1
        }, 
    ]),  // name of the input  field in form (<input type="file" name="profilePhoto">)
    registerAdmin
    )

router.route("/changeCurrentPassword").post(changeCurrentPassword)

export default router;
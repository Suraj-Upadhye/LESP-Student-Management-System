import {Router} from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profilePhoto",
            maxCount: 1
        }, 
    ]),
    // upload.single("profilePhoto"),  // name of the input  field in form (<input type="file" name="profilePhoto">)
    registerUser
    )

router.route("/login").post(loginUser)

// secured routes 
router.route("/logout").post(verifyJWT,logoutUser)

export default router;
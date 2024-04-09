import { Router } from "express";
import {
    registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
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

// router.route("/login").post(loginUser)

// secured routes 
// router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// router.route("/profilePhoto").patch(verifyJWT, upload.single("profilePhoto"), updateUserProfilePhoto);
// router.route("/c/:adminCode").get(verifyJWT, getAdminProfile) //getAdmin profile

export default router;
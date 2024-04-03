import { Router } from "express";
import {
    login,
    logout,

} from "../controllers/auth.controller.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import { createAndStoreOTP, verifyOTP } from "../controllers/otp.controller.js";


const router = Router();

router.route("/login").post(login)

router.route("/logout").post(verifyJWT,logout)
router.route("/refresh-token").post(refreshAccessToken)


router.route("/createAndStoreOTP").post(createAndStoreOTP)
router.route("/verifyOTP").post(verifyOTP)


// trail
// router.route("/sendEmail").post(sendOTPEmail)


export default router;
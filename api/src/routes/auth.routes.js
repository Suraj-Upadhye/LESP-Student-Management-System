import { Router } from "express";
import {
    login,
    logout,
    forgetPassword,
    resetPassword,
    skipResetPassword,
    loginByEmail

} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import { createAndStoreOTP, verifyOTP } from "../controllers/otp.controller.js";



const router = Router();

router.route("/login").post(login)
router.route("/loginByEmail").post(loginByEmail)

router.route("/logout").post(verifyJWT,logout)


router.route("/createAndStoreOTP").post(createAndStoreOTP)
router.route("/verifyOTP").post(verifyOTP)
router.route("/forgetPassword").post(forgetPassword)
router.route("/resetPassword/:token").post(resetPassword)

router.route("/skipResetPassword/:token").post(skipResetPassword)


// trail
// router.route("/sendEmail").post(sendOTPEmail)


export default router;
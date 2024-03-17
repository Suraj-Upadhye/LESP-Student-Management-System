import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js";


const router = Router();

router.route("/register").post(
    upload.single("profilePhoto"),  // name of the input  field in form (<input type="file" name="profilePhoto">)
    registerUser
    )

export default router;
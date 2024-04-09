import Router from 'express';
import { addEmail, deleteEmail, getEmail, updateEmail } from '../controllers/hod.controller.js';

const router = Router();


router.route("/addEmail").post(addEmail);
router.route("/updateEmail").post(updateEmail);
router.route("/getEmail").post(getEmail);
router.route("/deleteEmail").post(deleteEmail);


export default router;
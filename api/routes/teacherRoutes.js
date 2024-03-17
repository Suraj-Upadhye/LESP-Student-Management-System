// routes/teacherRoutes.js
import  express from 'express';
import { loginTeacher, signupTeacher } from  "../controllers/teacherController.js";

const router = express.Router();

router.post('/signupTeacher', signupTeacher);
router.post('/loginTeacher', loginTeacher);

export default router;
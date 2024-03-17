// routes/teacherRoutes.js
import  express from 'express';
import { loginStudent, signupStudent } from '../controllers/studentController.js';


const router = express.Router();

router.post('/signupStudent', signupStudent);
router.post('/loginStudent', loginStudent);

export default router;

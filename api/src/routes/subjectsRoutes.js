// routes/teacherRoutes.js
import  express from 'express';
import { addSubjects } from  "../controllers/subjectsController.js";

const router = express.Router();

router.post('/addSubjects', addSubjects);

export default router;
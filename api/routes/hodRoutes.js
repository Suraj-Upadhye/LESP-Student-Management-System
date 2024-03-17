// routes/teacherRoutes.js
import  express from 'express';
import { loginHod, signupHod } from  "../controllers/hodController.js";

const router = express.Router();

router.post('/signupHod', signupHod);
router.post('/loginHod', loginHod);

export default router;
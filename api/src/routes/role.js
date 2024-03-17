import express from 'express';
// import Role from '../models/Role.js';       // always add .js to use roles i.e are in models or from any local
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';
// import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create anew role in DB
router.post('/create', createRole);


// Update role in DB
router.put('/update/:id', updateRole);


// Get all the roles from DB
router.get('/getAll', getAllRoles);

// Delete role in DB
router.delete('/delete/:id', deleteRole);

export default router;
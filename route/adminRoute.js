import express from 'express';
import { loginAdmin, registerAdmin } from '../controller/adminController.js'; // registerAdmin add kiya

const router = express.Router();

//admin
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

export default router;

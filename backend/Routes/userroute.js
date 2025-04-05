import express from 'express';
import { registerUser, loginUser, generateToken } from '../Controller/usercontroller.js';
import { authenticateToken } from '../Middleware/usermiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
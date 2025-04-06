import express from 'express';
import { registerUser, loginUser, generateToken,registerprofession,loginprofession,updateUser} from '../Controller/usercontroller.js';
import { authenticateToken } from '../Middleware/usermiddleware.js';

const router = express.Router();

router.post('/registeruser', registerUser);
router.post('/loginuser', loginUser);
router.post('/loginprofession', loginprofession);
router.post('/updateuser', updateUser);
router.post('/registerprofession', registerprofession);

export default router;
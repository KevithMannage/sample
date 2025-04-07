import express from 'express';
import { registerUser, loginUser, generateToken,registerprofession,loginprofession,updateUser,forgetPassword,sendResetLink,resetPassword} from '../Controller/usercontroller.js';
import { authenticateToken } from '../Middleware/usermiddleware.js';

const router = express.Router();

router.post('/registeruser', registerUser);
router.post('/loginuser', loginUser);
router.post('/loginprofession', loginprofession);
router.post('/updateuser', updateUser);
router.post('/registerprofession', registerprofession);
router.post('/forgetpassword', forgetPassword);
router.post('/sendresetlink', sendResetLink);
router.post('/resetpassword', resetPassword);


export default router;
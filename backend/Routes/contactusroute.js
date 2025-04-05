import express from 'express';
import {contactus} from '../Controller/contactcontroller.js'

const router = express.Router();

router.post('/contactus',contactus);

export default router;
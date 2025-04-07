import express from 'express';
import {getvancies} from '../Controller/jobvacancycontroller.js';

const router = express.Router();
router.get('/getvancies', getvancies);

export default router;

import express from 'express';
import {searchevents} from '../Controller/searchcontroller.js'
import { searchpost } from '../Controller/searchcontroller.js';
const router = express.Router();

router.get('/searchevent',searchevents);
router.get('/searchpost',searchpost);
export default router;
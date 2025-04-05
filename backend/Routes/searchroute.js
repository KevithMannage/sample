import express from 'express';
import {searchevents} from '../Controller/searchcontroller.js'

const router = express.Router();

router.get('/searchevent',searchevents);

export default router;
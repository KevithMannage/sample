import express from 'express';
import { uploadPhoto } from '../Controller/photoController.js';

const router = express.Router();

router.post('/upload', uploadPhoto);

export default router;
import express from 'express';
import { getSubscribedDiscussions } from '../Controller/notificationController.js';

const router = express.Router();

// Route to get subscribed discussions for a user
router.get('/:user_id', getSubscribedDiscussions);

export default router;
// import express from 'express';
// import { getSubscribedDiscussions, subscribeToDiscussion } from '../Controller/notificationController.js';

// const router = express.Router();

// // Route to get subscribed discussions for a user
// router.get('/:user_id', getSubscribedDiscussions);

// // Route to subscribe to a discussion
// router.post('/subscribe', subscribeToDiscussion);

// export default router;


import express from 'express';
import { getSubscribedDiscussions, subscribeToDiscussion, unsubscribeFromDiscussion } from '../Controller/notificationController.js';

const router = express.Router();

// Route to get subscribed discussions for a user
router.get('/:user_id', getSubscribedDiscussions);

// Route to subscribe to a discussion
router.post('/subscribe', subscribeToDiscussion);

// Route to unsubscribe from a discussion
router.post('/unsubscribe', unsubscribeFromDiscussion);

export default router;
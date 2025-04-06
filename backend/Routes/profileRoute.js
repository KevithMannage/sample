import express from 'express';
import { getProfile, updateUser } from '../Controller/profileController.js';

const router = express.Router();

// Get the logged-in user's profile (protected route)
router.get('/grtprofile', getProfile);

// Update the logged-in user's profile (protected route)
router.put('/addprofile', updateUser);

export default router;

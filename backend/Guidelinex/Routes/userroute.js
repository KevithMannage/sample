// routes/authRoutes.js
const express = require('express');
const { registerUser,loginUser} = require('../Controller/usercontroller');
const {authenticateToken}=require("../Middleware/usermiddleware");

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);



module.exports = router;


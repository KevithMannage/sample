import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Import the User model
import User from '../Models/User.js';

dotenv.config();

const JWT_SECRET = process.env.ACESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Controller for user registration
export const registerUser = async (req, res) => {
  const { username, password, role, mobile, email } = req.body;

  // Ensure both username and password are provided
  if (!username || !password || !email || !mobile) {
    return res.status(400).json({ message: 'Username, password, email, and mobile are required' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the default role if not provided
    const userRole = role || 'user'; // Default to 'user' if no role is provided

    // Create the new user
    const user = new User({
      username,
      password: hashedPassword,
      role: userRole,
      mobile,
      email,
    });
    console.log(user);

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully', status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateToken(user);
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      status: 'ok',
      id: user.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Helper function to generate tokens
const generateToken = (user) => {
  const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};
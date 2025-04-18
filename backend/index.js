import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Users from './Models/User.js'; // Import the User model

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './Config/connectDB.js'
import { createServer } from 'http';
import UserRoutes from './Routes/userroute.js';
import Searchroute from './Routes/searchroute.js';
import Contactroute from './Routes/contactusroute.js';
import { Server } from 'socket.io';
import Messageroute from './Routes/messageroute.js';
import Postroute from './Routes/postroute.js';
import Discussionroute from './Routes/discussionroute.js';
import profile from './Routes/profileRoute.js';
import notificationRoute from './Routes/notificationRoute.js';
import Vacancyroute from './Routes/vacancyroute.js';
import Photoroute from './Routes/photoRoutes.js';
dotenv.config();
connectDB();

const app = express();

// Create HTTP server before initializing socket.io
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', // Replace with your frontend URL for better security
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);

    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// Configure session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Add this to your .env file
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Add this to your .env file
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists in the database
    let user = await Users.findOne({ email: profile.emails[0].value });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await Users.create({
        username: profile.displayName,
        email: profile.emails[0].value, // Use the first email from the profile
        profileImage: profile.photos[0]?.value || '',
        role: 'student', // Default role
        password: 'google-login', // Default password for Google login users
        mobile: 'N/A', // Default mobile for Google login users
      });
    }

    // Pass the user to the done callback
    return done(null, user);
  } catch (error) {
    console.error('Error during Google login:', error);
    return done(error, null);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;
    console.log('Authenticated user:', user); // Debugging: Log the user object

    // Redirect to the frontend with user details as query parameters
    res.redirect(`http://localhost:5173/googlelogin/?userid=${user._id}&role=${user.role}&username=${user.username}&profileimage=${user.profileImage}`);
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/'); // Redirect to the dashboard or any other page after logout
  });
});


// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Routes
app.use('/user', UserRoutes);
app.use('/search', Searchroute);
app.use('/contact', Contactroute);
app.use('/message', Messageroute);
app.use('/post', Postroute);
app.use('/discussion', Discussionroute);
app.use('/photo', Photoroute);
app.use('/profile', profile);
app.use('/notifications', notificationRoute);
app.use('/job', Vacancyroute);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  httpServer.listen(PORT, '0.0.0.0', () => console.log(`🖥️  GuidelineX Backend running at port http://localhost:${PORT} ✅`));
});

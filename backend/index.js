import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/dbConn.js';
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
import { handleChat } from './services/chatService.js'; // Import chat service
import { connectMongo } from './services/mongoService.js'; // Import MongoDB connection for chatbot

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

// Chatbot route
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: 'Message is required' });

    const response = await handleChat(userMessage);
    res.json({ response });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect MongoDB for chatbot
await connectMongo();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  httpServer.listen(PORT, '0.0.0.0', () => console.log(`🖥️  GuidelineX Backend running at port http://localhost:${PORT} ✅`));
});

// Chatbot server port
app.listen(PORT, () => {
  console.log(`🤖 GuidelineX chatbot Server running at http://localhost:${PORT} ✅`);
});
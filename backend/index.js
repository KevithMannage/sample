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
dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
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
// Routes
app.use('/user', UserRoutes);
app.use('/search',Searchroute);
app.use('/contact',Contactroute);
app.use('/message',Messageroute);
app.use('/post',Postroute);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  httpServer.listen(PORT, '0.0.0.0', () => console.log(`🖥️  GuidelineX Backend running at port http://localhost:${PORT} ✅`));
});
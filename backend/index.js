import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/dbConn.js';
import UserRoutes from './Routes/userroute.js';

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

// Routes
app.use('/user', UserRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  httpServer.listen(PORT, '0.0.0.0', () => console.log(`🖥️  GuidelineX Backend running at port http://localhost:${PORT} ✅`));
});
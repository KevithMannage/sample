const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');


// Import custom modules
const connectDB = require('./config/dbConn');

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

const UserRoutes = require('./Routes/userroute');
app.use("/user",UserRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  httpServer.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
});

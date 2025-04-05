const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.DATABASE_URI ;
    console.log('Connecting to MongoDB:', uri);

    try {
        await mongoose.connect(uri);
        console.log('🖥️  GuidelineX Backend is connected to the database ✅');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }
};

module.exports = connectDB;

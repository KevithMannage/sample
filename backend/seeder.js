import mongoose from 'mongoose';
import SubscribedDiscussions from './Models/subscribedDiscussions.js'; // Import the SubscribedDiscussions model

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://induwara:induwara123@devthon.lcgboaa.mongodb.net/?retryWrites=true&w=majority&appName=DevThon', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await SubscribedDiscussions.deleteMany();

    // Add new data
    const data = {
      _id: new mongoose.Types.ObjectId("67f2817a55dccf48e825213f"),
      user_id: new mongoose.Types.ObjectId("67f1333e490eb6509094292c"),
      discussion_ids: [
        {
          _id: new mongoose.Types.ObjectId("67f2817a55dccf48e8252140"),
          discussion_id: new mongoose.Types.ObjectId("6612d007f1d5a2f7c5a9d107"),
          last_viewed: new Date("2025-04-06T10:00:00.000Z"),
        },
        {
          _id: new mongoose.Types.ObjectId("67f2817a55dccf48e8252141"),
          discussion_id: new mongoose.Types.ObjectId("6612d009f1d5a2f7c5a9d109"),
          last_viewed: new Date("2025-04-06T10:30:00.000Z"),
        },
        {
          _id: new mongoose.Types.ObjectId("67f2817a55dccf48e8252142"),
          discussion_id: new mongoose.Types.ObjectId("6612d011f1d5a2f7c5a9d111"),
          last_viewed: new Date("2025-04-06T11:00:00.000Z"),
        },
      ],
    };

    await SubscribedDiscussions.create(data);
    console.log('Seed data added successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder();
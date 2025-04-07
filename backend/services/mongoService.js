import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export let db;
const mongoClient = new MongoClient(process.env.CHAT_DATABASE_URI);

export async function connectMongo() {
  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DB_NAME);
    console.log('🤖  GuidelineX chatbot is connected to the database ✅');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

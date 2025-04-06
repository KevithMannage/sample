import mongoose from 'mongoose';

// User Schema
const DiscussionsSchema = new mongoose.Schema({
 topic: { type: String, required: true },
 messages: { type: String, required: true },
  
});

const Discussions = mongoose.model('Discussion', DiscussionsSchema);

export default Discussions; // Use ES module export
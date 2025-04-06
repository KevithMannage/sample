// import mongoose from 'mongoose';

// // User Schema
// const DiscussionsSchema = new mongoose.Schema({
//  topic: { type: String, required: true },
//  related_areas: { type: String, default: []},
//  user_id: { type: String, required: true },
//  starting_message: { type: String, required: true },
//  replies: [{ type: Object, default: { message: String, user_id: String, created_at:Date.now()} }], default: [],
//  current_holding:  {  type: Boolean,default: true  },
//  created_at:{type:Date ,default:Date.now()},
//  username: { type: String, default: [] },
//  participants: {type:Number},
//  role: {type: String, default:"student"}
// });

// const Discussions = mongoose.model('Discussion', DiscussionsSchema);

// export default Discussions; // Use ES module export


import mongoose from 'mongoose';

// Define Reply Schema separately for better structure
const ReplySchema = new mongoose.Schema({
  message: { type: String, required: true },
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Main Discussions Schema
const DiscussionsSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  related_areas: { type: [String], default: [] }, // Array of strings
  user_id: { type: String, required: true },
  starting_message: { type: String, required: true },
  replies: { type: [ReplySchema], default: [] }, // Array of Reply objects
  current_holding: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  username: { type: String, required: false, default: "Anonymous" }, // Single string
  participants: { type: Number, default: 1 },
  role: { type: String, default: "student" }
});

const Discussions = mongoose.model('Discussion', DiscussionsSchema);

export default Discussions;
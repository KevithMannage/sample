// Models/profileModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_name: String,
  email: String,
  contact_number: String,
  role: String,
  about_me: String,
  interest_area: [String],
  university: String,
  degree: String,
  job: String,
  Skills: [String],
});

const User = mongoose.model('User', userSchema);
export default User;

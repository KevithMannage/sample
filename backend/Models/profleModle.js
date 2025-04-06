// Models/profileModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_name: {
        type: String
      },
      email: {
        type: String,
        required: true,
      },
      contact_number: {
        type: String
      },
      role: {
        type: String
      },
      about_me: {
        type: String
      },
      interest_area: {
        type: [String]
      },
      university: {
        type: String
      },
      degree: {
        type: String
      },
      job: {
        type: String
      },
      Skills: {
        type: [String]
      },
      name: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      }
});

const User = mongoose.model('User', userSchema);
export default User;

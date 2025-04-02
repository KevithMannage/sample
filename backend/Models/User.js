const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  mobile: { type: String, required: true, match: /^[0-9]{10}$/ }, // Ensure mobile is a 10-digit number
  email: { type: String, required: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ } ,// Email format validation
  resetPasswordToken:{type: String, default:"undefined"},
  resetPasswordExpires:{type: String, default:"undefined"}
});

module.exports = mongoose.model('User', UserSchema);
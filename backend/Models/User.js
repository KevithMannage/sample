import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  mobile: { type: String, required: true }, // Ensure mobile is a 10-digit number
  email: { type: String, required: true }, // Email format validation
  aboutme: { type: String, required: false }, 
  interest_area:{ type: [String], default: []  },
  university:{type: String, required: false }, 
  degree:{type: String, required: false }, 
  job:{type: String, required: false }, 
  skills:{ type: [String], default: []  },
  interestArea:{ type: [String], default: []  },
  resetPasswordToken: { type: String, default: "undefined" },
  resetPasswordExpires: { type: String, default: "undefined" }
});

const Users = mongoose.models.User || mongoose.model('Users', UserSchema);

export default Users; // Use ES module export
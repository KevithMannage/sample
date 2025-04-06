import User from '../Models/profleModle.js'; // Your user model (mongoose schema)

// Get the user's profile
export const getProfile = async (req, res) => {
  try {
    // Extract userId from query params - req.query is an object, so you need to specify the parameter name
    const { userId } = req.query; // Assuming the URL is like /profile?userId=123
    
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// // Update user profile (example)
// export const updateUser = async (req, res) => {
//   try {
//     const userId = req.body.id; // You can send the user ID in the request body
//     const updatedData = req.body;

//     const user = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,  // return the updated document
//       runValidators: true, // Ensure validations on the updated fields
//     });

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'Profile updated successfully', user });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating profile', error: err.message });
//   }
// };

import Message from "../Models/Message.js";
import User from '../Models/User.js'; // Adjust the path to your User model

export const sendMessage= async (req, res) => {
const { sender, receiver, text } = req.body;

  const message = new Message({
    sender,
    receiver,
    text,
  });

  try {
    await message.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

// GET endpoint for getting messages between two users
 export const getMessages= async (req, res) => {
  const { sender, receiver } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};
  


  export const usercontacts = async (req, res) => {
    const { user } = req.body; // Expecting `user` to be an ID or unique identifier
  
    try {
      // Fetch all users except the current user
      const allUsers = await User.find({ username: { $ne: user } }).select('-password'); // Exclude sensitive fields like password
  
      res.status(200).json({
        success: true,
        contacts: allUsers,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
  };
  

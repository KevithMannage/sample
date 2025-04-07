import Photo from '../Models/Photo.js';
import multer from 'multer';
import path from 'path';
import User from '../Models/User.js';
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb('Error: Images only!');
    }
  }).single('photo');
  
  export const uploadPhoto = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err });
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
      const userId = req.body.userId;
      if (!userId) return res.status(400).json({ message: 'User ID is required' });
  
      console.log("File uploaded:", req.file); // Debug file
      console.log("User ID:", userId); // Debug userId
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profileImage: req.file.path },
          { new: true }
        );
        console.log("Updated User:", updatedUser); // Debug DB response
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  
        res.json({ 
          message: 'Profile photo uploaded successfully', 
          photo: { path: req.file.path }
        });
      } catch (error) {
        console.error("Database Error:", error); // Log full error
        res.status(500).json({ message: 'Error saving to database', error: error.message });
      }
    });
  };
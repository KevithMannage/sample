import Post from "../Models/Post.js";
import multer from 'multer';
import path from 'path';

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images only!');
  },
}).single('image'); // Field name for image upload

// Safe JSON parsing helper
const tryParseJSON = (data) => {
  try {
    return data && typeof data === 'string' ? JSON.parse(data) : data;
  } catch (e) {
    return [];
  }
};

export const deletepost = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", status: "ok" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};



export const getuserpost = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const posts = await Post.find({ username });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json({ status: "ok", posts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Error fetching user posts", error: error.message });
  }
};



export const createpost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const {
      title,
      related_area,
      content,
      author_name,
      reference_links,
      replies,
      username,
    } = req.body;

    // Validate required fields
    if (!title || !content || !author_name || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log incoming body for debugging
    // console.log('Incoming body:', req.body);

    // Safely parse arrays
    const parsedRelatedArea = tryParseJSON(related_area);
    const parsedReferenceLinks = tryParseJSON(reference_links);
    const parsedReplies = tryParseJSON(replies);

    // Create new post
    const post1 = new Post({
      title,
      related_area: parsedRelatedArea || [],
      content,
      author_name,
      reference_links: parsedReferenceLinks || [],
      replies: parsedReplies || [],
      username,
      image: req.file ? req.file.path : null,
    });

    try {
      await post1.save();
      res.status(200).json({ message: 'Post created successfully!', status: 'ok', post: post1 });
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ message: 'Error creating post', error: error.message });
    }
  });
};

// export const createpost = async (req, res) => {
//   const { title, related_area, content, author_name, reference_links, replies, username } = req.body;

//   // Validate required fields
//   if (!title || !related_area || !content || !author_name || !reference_links || !username) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   const post1 = new Post({
//     title,
//     related_area,
//     content,
//     author_name,
//     reference_links,
//     replies,
//     username,
//   });

//   try {
//     await post1.save();
//     res.status(200).json({ message: 'Post created successfully!',status: 'ok' });
//   } catch (error) {
//     console.error('Error saving post:', error); // Log the error for debugging
//     res.status(500).json({ message: 'Error creating post', error: error.message });
//   }
// };




export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find();

    // Check if there are no posts
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    // Return the posts
    res.status(200).json({ posts, status: 'ok' });
  } catch (error) {
    console.error('Error fetching posts:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};


  export const addReply = async (req, res) => {
    try {
      console.log("Request body:", req.body); // Debug: Log incoming request
     
  
      console.log("Finding discussion with ID:", req.params.id); // Debug: Log ID
      const discussion = await Post.findById(req.params.id);
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found." });
      }

  
      res.status(200).json(discussion);
    } catch (error) {
      console.error("Error adding reply:", error); // Detailed error logging
      res.status(500).json({ error: "Internal server error.", details: error.message });
    }
  };

  export const searchpost = async (req, res) => {
    console.log("Query received:", req.query); // Add this
  
    try {
      const { title } = req.query;
      if (!title) {
        return res.status(400).json({ error: "topic name is required." });
      }
  
      const events1 = await Post.find({ title: { $regex:title, $options: "i" } });
      if (events1.length === 0) {
        return res.status(404).json({ message: "No events found." });
      }
  
      res.status(200).json(events1);
    } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  

  
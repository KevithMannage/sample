import Post from "../Models/Post.js";

export const createpost = async (req, res) => {
  const { title, related_area, content, author_name, reference_links, replies, username } = req.body;

  // Validate required fields
  if (!title || !related_area || !content || !author_name || !reference_links || !username) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const post1 = new Post({
    title,
    related_area,
    content,
    author_name,
    reference_links,
    replies,
    username,
  });

  try {
    await post1.save();
    res.status(200).json({ message: 'Post created successfully!',status: 'ok' });
  } catch (error) {
    console.error('Error saving post:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};




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
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found." });
      }
  
      res.status(200).json(events1);
    } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
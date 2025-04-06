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

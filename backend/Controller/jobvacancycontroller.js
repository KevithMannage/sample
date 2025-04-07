import jobvacancy from "../Models/Jobvacancy.js";
export const getvancies = async (req, res) => {
    try {
      // Fetch all posts from the database
      const vacancy = await jobvacancy.find();
  
      // Check if there are no posts
      if (vacancy.length === 0) {
        return res.status(404).json({ message: 'No posts found' });
      }
  
      // Return the posts
      res.status(200).json({ vacancy, status: 'ok' });
    } catch (error) {
      console.error('Error fetching posts:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error fetching vacancy', error: error.message });
    }
  };
  
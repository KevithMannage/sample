import Discussions from "../Models/Discussions.js";
import User from "../Models/User.js";
import Post from '../Models/Post.js';
// export const searchevents = async (req, res) => {
//     console.log("Query received:", req.query); // Add this
  
//     try {
//       const { topic } = req.query;
//       if (!topic) {
//         return res.status(400).json({ error: "topic name is required." });
//       }
  
//       const events = await Discussions.find({ topic: { $regex:topic, $options: "i" } });
//       if (events.length === 0) {
//         return res.status(404).json({ message: "No events found." });
//       }
  
//       res.status(200).json(events);
//     } catch (error) {
//       console.error("Error searching events:", error);
//       res.status(500).json({ error: "Internal server error." });
//     }
//   };
  

//     export const searchpost = async (req, res) => {
//       console.log("Query received:", req.query); // Add this
    
//       try {
//         const { title } = req.query;
//         if (!title) {
//           return res.status(400).json({ error: "topic name is required." });
//         }
    
//         const events1 = await Post.find({ title: { $regex:title, $options: "i" } });
//         if (events1.length === 0) {
//           return res.status(404).json({ message: "No events found." });
//         }
    
//         res.status(200).json(events1);
//       } catch (error) {
//         console.error("Error searching events:", error);
//         res.status(500).json({ error: "Internal server error." });
//       }
//     };
    

// Search Events
export const searchevents = async (req, res) => {
  console.log("Query received for events:", req.query);

  try {
      const { topic } = req.query;
      if (!topic) {
          return res.status(400).json({ 
              error: "Topic is required for event search." 
          });
      }

      // Use a more permissive search with regex
      const events = await Discussions.find({ 
          topic: { 
              $regex: topic, 
              $options: "i" 
          }
      }).select('topic description organizer date createdAt'); // Select specific fields if needed
      
      if (!events || events.length === 0) {
          return res.status(404).json({ 
              message: "No events found matching the topic." 
          });
      }

      res.status(200).json(events);
  } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ 
          error: "Internal server error while searching events.",
          details: error.message 
      });
  }
};

// Search Posts
export const searchpost = async (req, res) => {
  console.log("Query received for posts:", req.query);
  
  try {
      const { title } = req.query;
      if (!title) {
          return res.status(400).json({ 
              error: "Title is required for post search." 
          });
      }

      const posts = await Post.find({ 
          title: { 
              $regex: title, 
              $options: "i" 
          }
      }).select('title content author_name createdAt'); // Select specific fields if needed
      
      if (!posts || posts.length === 0) {
          return res.status(404).json({ 
              message: "No posts found matching the title." 
          });
      }

      res.status(200).json(posts);
  } catch (error) {
      console.error("Error searching posts:", error);
      res.status(500).json({ 
          error: "Internal server error while searching posts.",
          details: error.message 
      });
  }
};
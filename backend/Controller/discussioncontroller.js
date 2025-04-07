// import Discussions from "../Models/Discussions.js";

// export const getdiscussions = async (req, res) => {
//     console.log("Query received:", req.query); // This will still log any query parameters
    
//     try {
//         // Remove the filter to get all discussions
//         const discussions = await Discussions.find({});
        
//         if (discussions.length === 0) {
//             return res.status(404).json({ message: "No discussions found." });
//         }

//         res.status(200).json(discussions);
//     } catch (error) {
//         console.error("Error fetching discussions:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// };

// export const trendingdiscussions = async (req, res) => {
//     console.log("Query received:", req.query); // This will still log any query parameters
    
//     try {
//         // Use aggregation to get top 7 discussions by reply count
//         const discussions = await Discussions.aggregate([
//             {
//                 // Project all fields and add replyCount
//                 $project: {
//                     topic: 1,
//                     related_areas: 1,
//                     user_id: 1,
//                     starting_message: 1,
//                     replies: 1,
//                     current_holding: 1,
//                     created_at: 1,
//                     username: 1,
//                     participants: 1,
//                     role: 1,
//                     replyCount: { $size: "$replies" } // Count number of replies
//                 }
//             },
//             {
//                 // Sort by replyCount (descending) and created_at (descending) as tiebreaker
//                 $sort: { 
//                     replyCount: -1,
//                     created_at: -1 
//                 }
//             },
//             {
//                 // Limit to top 7
//                 $limit: 7
//             }
//         ]);

//         if (discussions.length === 0) {
//             return res.status(404).json({ message: "No discussions found." });
//         }

//         res.status(200).json(discussions);
//     } catch (error) {
//         console.error("Error fetching trending discussions:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// };

// export const getDiscussion = async (req, res) => {
//     try {
//       const discussion = await Discussions.findById(req.params.id);
//       if (!discussion) {
//         return res.status(404).json({ message: "Discussion not found." });
//       }
//       res.status(200).json(discussion);
//     } catch (error) {
//       console.error("Error fetching discussion:", error);
//       res.status(500).json({ error: "Internal server error." });
//     }
//   };
  
//   // Controller to add a reply to the discussion
//   export const addReply = async (req, res) => {
//     try {
//       console.log("Request body:", req.body); // Debug: Log incoming request
//       const { message, user_id, username } = req.body;
//       if (!message || !user_id ) {
//         return res.status(400).json({ message: "Message and user_id are required." });
//       }
  
//       console.log("Finding discussion with ID:", req.params.id); // Debug: Log ID
//       const discussion = await Discussions.findById(req.params.id);
//       if (!discussion) {
//         return res.status(404).json({ message: "Discussion not found." });
//       }
  
//       const newReply = {
//         message,
//         user_id,
//         username,
//         created_at: new Date(), // Schema default will apply if omitted
//       };
  
//       console.log("Adding reply:", newReply); // Debug: Log new reply
//       discussion.replies.push(newReply);
  
//       // Check if user_id is already a participant
//       const isNewParticipant = !discussion.replies.some(r => r.user_id === user_id);
//       discussion.participants = (discussion.participants || 1) + (isNewParticipant ? 1 : 0);
  
//       console.log("Saving discussion:", discussion); // Debug: Log before save
//       await discussion.save();
  
//       res.status(200).json(discussion);
//     } catch (error) {
//       console.error("Error adding reply:", error); // Detailed error logging
//       res.status(500).json({ error: "Internal server error.", details: error.message });
//     }
//   };

import Discussions from "../Models/Discussions.js";

export const getdiscussions = async (req, res) => {
    console.log("Query received:", req.query); // This will still log any query parameters
    
    try {
        // Remove the filter to get all discussions
        const discussions = await Discussions.find({});
        
        if (discussions.length === 0) {
            return res.status(404).json({ message: "No discussions found." });
        }

        res.status(200).json(discussions);
    } catch (error) {
        console.error("Error fetching discussions:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const trendingdiscussions = async (req, res) => {
    console.log("Query received:", req.query); // This will still log any query parameters
    
    try {
        // Use aggregation to get top 7 discussions by reply count
        const discussions = await Discussions.aggregate([
            {
                // Project all fields and add replyCount
                $project: {
                    topic: 1,
                    related_areas: 1,
                    user_id: 1,
                    starting_message: 1,
                    replies: 1,
                    current_holding: 1,
                    created_at: 1,
                    username: 1,
                    participants: 1,
                    role: 1,
                    replyCount: { $size: "$replies" } // Count number of replies
                }
            },
            {
                // Sort by replyCount (descending) and created_at (descending) as tiebreaker
                $sort: { 
                    replyCount: -1,
                    created_at: -1 
                }
            },
            {
                // Limit to top 7
                $limit: 7
            }
        ]);

        if (discussions.length === 0) {
            return res.status(404).json({ message: "No discussions found." });
        }

        res.status(200).json(discussions);
    } catch (error) {
        console.error("Error fetching trending discussions:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const getDiscussion = async (req, res) => {
    try {
      const discussion = await Discussions.findById(req.params.id);
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found." });
      }
      res.status(200).json(discussion);
    } catch (error) {
      console.error("Error fetching discussion:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
  // Controller to add a reply to the discussion
  export const addReply = async (req, res) => {
    try {
      console.log("Request body:", req.body); // Debug: Log incoming request
      const { message, user_id, username } = req.body;
      if (!message || !user_id ) {
        return res.status(400).json({ message: "Message and user_id are required." });
      }
  
      console.log("Finding discussion with ID:", req.params.id); // Debug: Log ID
      const discussion = await Discussions.findById(req.params.id);
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found." });
      }
  
      const newReply = {
        message,
        user_id,
        username,
        created_at: new Date(), // Schema default will apply if omitted
      };
  
      console.log("Adding reply:", newReply); // Debug: Log new reply
      discussion.replies.push(newReply);
      console.log(discussion);
      // Check if user_id is already a participant
      const isNewParticipant = !discussion.replies.some(r => r.username=== username);
      console.log(isNewParticipant);
      if(!isNewParticipant){
      discussion.participants = discussion.participants +1;
      }
  
      console.log("Saving discussion:", discussion); // Debug: Log before save
      await discussion.save();
  
      res.status(200).json(discussion);
    } catch (error) {
      console.error("Error adding reply:", error); // Detailed error logging
      res.status(500).json({ error: "Internal server error.", details: error.message });
    }
  };

  export const createDiscussion = async (req, res) => {
    try {
      const {
        topic,
        related_areas,
        user_id,
        starting_message,
        username,
        role
      } = req.body;
  
      const newDiscussion = new Discussions({
        topic,
        related_areas,
        user_id,
        starting_message,
        username: username || "Anonymous",
        role: role || "student"
      });
  
      const savedDiscussion = await newDiscussion.save();
      res.status(201).json(savedDiscussion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
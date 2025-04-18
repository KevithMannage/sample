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


export const getRelatedDiscussions = async (req, res) => {
  try {
    const { topicId } = req.body;

    // Validate topicId as a valid ObjectId
    if (!topicId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ status: false, error: 'Invalid discussion ID' });
    }

    // Find the discussion by ID
    const discussion = await Discussions.findById(topicId);
    if (!discussion) {
      return res.status(404).json({ status: false, error: 'Discussion not found' });
    }

    // Get related_areas
    const { related_areas } = discussion;
    console.log(related_areas);
    if (!related_areas || related_areas.length === 0) {
      return res.status(200).json({ status: true, data: [] });
    }

    // Find discussions with matching related_areas, excluding the current discussion
    const relatedDiscussions = await Discussions.find({
      _id: { $ne: topicId },
      related_areas: { $in: related_areas },
    }).select('topic related_areas username participants created_at');

    res.json({
      status: true,
      data: relatedDiscussions,
    });
  } catch (error) {
    console.error('Error fetching related discussions:', error);
    res.status(500).json({ status: false, error: 'Server error' });
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

import User from "../Models/User.js";

export const userrelateddiscussion = async (req, res) => {
  try {
    const {username} = req.body;

    // Step 1: Find user and get their interest areas
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const interestAreas = user.interestArea;

    if (!interestAreas || interestAreas.length === 0) {
      return res.status(400).json({ message: "User has no interest areas defined" });
    }

    // Step 2: Find discussions related to those interest areas
    const matchingDiscussions = await Discussions.find({
      related_areas: { $in: interestAreas }
    });

    res.status(200).json(matchingDiscussions);
  } catch (error) {
    console.error("Error fetching user-related discussions:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getuserDiscussion = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch only discussions where this user is the creator
    const discussions = await Discussions.find({ username: username })
      .select('-__v') // Exclude Mongoose version key
      .lean();

    if (!discussions || discussions.length === 0) {
      return res.status(404).json({ message: 'No discussions found for this user' });
    }

    // Optional: If you want to also remove replies from others
    const userOnlyDiscussions = discussions.map(discussion => ({
      ...discussion,
      replies: discussion.replies?.filter(reply => reply.username === username) || []
    }));

    res.status(200).json({ discussions: userOnlyDiscussions, status: 'ok' });
  } catch (error) {
    console.error('Error fetching user discussions:', error);
    res.status(500).json({
      message: 'Error fetching user discussions',
      error: error.message
    });
  }
};



export const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.body; // Now getting ID from request body

    if (!id) {
      return res.status(400).json({ message: 'Discussion ID is required' });
    }

    // First check if the discussion exists
    const discussion = await Discussions.findById(id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Optional: Add authorization check
    // Example: Only allow creator or admin to delete
    // const { username, isAdmin } = req.user; // Assuming you have user data
    // if (discussion.username !== username && !isAdmin) {
    //   return res.status(403).json({ message: 'Not authorized to delete this discussion' });
    // }

    // Delete the discussion
    await Discussions.findByIdAndDelete(id);

    res.status(200).json({ 
      message: 'Discussion deleted successfully',
      status: 'ok',
      deletedId: id // Optionally return the deleted ID
    });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    res.status(500).json({
      message: 'Error deleting discussion',
      error: error.message
    });
  }
};
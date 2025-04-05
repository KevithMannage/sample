import Discussions from "../Models/Discussions.js";
import User from "../Models/User.js"
export const searchevents = async (req, res) => {
    console.log("Query received:", req.query); // Add this
  
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(400).json({ error: "Event name is required." });
      }
  
      const events = await Discussions.find({ name: { $regex: name, $options: "i" } });
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found." });
      }
  
      res.status(200).json(events);
    } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
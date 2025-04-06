import express from 'express';
import {getdiscussions,trendingdiscussions,getDiscussion,addReply} from "../Controller/discussioncontroller.js";
const router=express.Router();

router.get("/getdiscussion",getdiscussions);
router.get("/trendingdiscussion",trendingdiscussions);
router.get("/:id", getDiscussion);

// POST: Add a reply to the discussion
router.post("/:id/reply", addReply);
export default router;

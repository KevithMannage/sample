import express from 'express';
import {getdiscussions,trendingdiscussions,getDiscussion,addReply,createDiscussion} from "../Controller/discussioncontroller.js";
const router=express.Router();

router.get("/getdiscussion",getdiscussions);
router.get("/trendingdiscussion",trendingdiscussions);
router.get("/:id", getDiscussion);

// POST: Add a reply to the discussion
router.post("/:id/reply", addReply);
router.post("/creatediscussion",createDiscussion);
export default router;

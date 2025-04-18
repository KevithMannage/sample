import express from 'express';
import {getdiscussions,trendingdiscussions,getDiscussion,addReply,createDiscussion,deleteDiscussion,getRelatedDiscussions,getuserDiscussion,userrelateddiscussion} from "../Controller/discussioncontroller.js";
const router=express.Router();

router.get("/getdiscussion",getdiscussions);
router.get("/trendingdiscussion",trendingdiscussions);
router.get("/:id", getDiscussion);

// POST: Add a reply to the discussion
router.post("/:id/reply", addReply);
router.post("/creatediscussion",createDiscussion);
router.post('/related/', getRelatedDiscussions);
router.post('/userrelateddiscussion', userrelateddiscussion);
router.post("/getuserdiscussion",getuserDiscussion);
router.post('/delete', deleteDiscussion); 
export default router;

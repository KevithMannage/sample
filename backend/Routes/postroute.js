import express from 'express';
import {createpost,getAllPosts,addReply,searchpost,getuserpost,deletepost,getRelatedposts} from "../Controller/postcontroller.js";
const router = express.Router();

router.post("/createpost",createpost);
router.get("/getpost",getAllPosts);
router.get("/:id", addReply);
router.get('/searchpost',searchpost);
router.post('/getuserpost',getuserpost);
router.post('/deletepost',deletepost)
router.post('/getrelatedpost',getRelatedposts);
export default router;
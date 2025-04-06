import express from 'express';
import {createpost,getAllPosts,addReply,searchpost} from "../Controller/postcontroller.js";
const router = express.Router();

router.post("/createpost",createpost);
router.get("/getpost",getAllPosts);
router.get("/:id", addReply);
router.get('/searchpost',searchpost);

export default router;
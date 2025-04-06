import express from 'express';
import {sendMessage,getMessages,usercontacts} from "../Controller/messagecontroller.js";
const router = express.Router();

router.post("/sendMessage",sendMessage);
router.post("/getMessages",getMessages);
router.post("/usercontacts",usercontacts);

export default router;
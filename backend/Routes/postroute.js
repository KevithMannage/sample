import express from 'express';
import {createpost} from "../Controller/postcontroller.js";
const router = express.Router();

router.post("/createpost",createpost);


export default router;
import express from "express";
import { acceptReq, allPendingRequests, friendList, getAllUser, sendFriendReq } from "../controllers/friendController.js";
import { requiredSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();







router.get("/all-users" , requiredSignIn, getAllUser);
router.put("/send-req" , requiredSignIn, sendFriendReq);
router.put("/accept-req" , requiredSignIn, acceptReq);
router.get("/pending-req" , requiredSignIn, allPendingRequests);
router.get("/friend-list" , requiredSignIn, friendList);

export default router;
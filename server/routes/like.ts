import express from "express";
import { handleLikeDislike, getLikedDisLiked } from "../controller/like";

const router = express.Router();

router.post("/trigger-like-dislike", handleLikeDislike);
router.get("/get-like-dislike", getLikedDisLiked);

export default router;

import express from "express";
import { deleteChat, getMatchChats } from "../controller/chat";

const router = express.Router();

router.delete("/delete/:id", deleteChat);
router.get("/match/:id", getMatchChats);

export default router;

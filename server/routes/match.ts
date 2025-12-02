import express from "express";
import { getMatchedUser } from "../controller/match";

const router = express.Router();

router.get("/my-matches", getMatchedUser);

export default router;

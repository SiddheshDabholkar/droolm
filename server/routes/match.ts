import express from "express";
import { getMatchedUser, findSuggestions } from "../controller/match";

const router = express.Router();

router.get("/my-matches", getMatchedUser);
router.get("/get-suggestions", findSuggestions);

export default router;

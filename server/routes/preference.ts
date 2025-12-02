import express from "express";
import { updatePreference } from "../controller/preference";

const router = express.Router();

router.put("/update", updatePreference);

export default router;

import express from "express";
import {
  updatePreference,
  getUserOnPreferences,
} from "../controller/preference";

const router = express.Router();

router.put("/update", updatePreference);
router.get("/suggested", getUserOnPreferences);

export default router;

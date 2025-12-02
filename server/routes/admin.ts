import express from "express";
import { seedTravelCategories } from "../controller/admin";

const router = express.Router();

router.get("/seed-travel", seedTravelCategories);

export default router;

import express from "express";
import { login, register, generateOtp, verifyOtp } from "../controller/auth";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/generate-otp", authMiddleware, generateOtp);
router.post("/verify-otp", authMiddleware, verifyOtp);

export default router;

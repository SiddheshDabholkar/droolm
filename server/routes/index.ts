import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import adminRoutes from "./admin";
import preferenceRoutes from "./preference";
import matchRoutes from "./match";
import likeRoutes from "./like";
import chatRoutes from "./chat";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});
router.use("/auth", authRoutes);
router.use("/user", authMiddleware, userRoutes);
router.use("/admin", authMiddleware, adminRoutes);
router.use("/preference", authMiddleware, preferenceRoutes);
router.use("/match", authMiddleware, matchRoutes);
router.use("/like", authMiddleware, likeRoutes);
router.use("/chat", authMiddleware, chatRoutes);

export default router;

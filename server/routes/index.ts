import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import adminRoutes from "./admin";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export default router;

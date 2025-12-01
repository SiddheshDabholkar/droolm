import express from "express";
import authRoutes from "./auth";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});
router.use("/auth", authRoutes);

export default router;

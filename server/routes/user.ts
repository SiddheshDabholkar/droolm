import express from "express";
import { getUser, updateUser, deleteUser } from "../controller/user";

const router = express.Router();

router.get("/:id", getUser);
router.post("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;

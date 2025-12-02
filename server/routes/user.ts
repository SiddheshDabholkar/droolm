import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  generateUrlToUploadImage,
  uploadProfileSuccess,
} from "../controller/user";

const router = express.Router();

router.get("/get", getUser);
router.post("/update", updateUser);
router.delete("/delete", deleteUser);
router.post("/generate-url-profile-img", generateUrlToUploadImage);
router.post("/profile-img-success", uploadProfileSuccess);

export default router;

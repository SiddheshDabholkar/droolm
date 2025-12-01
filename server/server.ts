import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ENVS } from "./constant/envs";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(ENVS.PORT, () => {
  console.log(`Server listening on port ${ENVS.PORT}`);
});

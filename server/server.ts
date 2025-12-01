import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ENVS } from "./constant/envs";
import routes from "./routes";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { limiter } from "./middleware/rateLimitMiddleware";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ENVS.FRONTEND_URLS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(limiter);
app.use("/api", routes);
app.use(errorMiddleware);

app.listen(ENVS.PORT, () => {
  console.log(`Server listening on port ${ENVS.PORT}`);
});

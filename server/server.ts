import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import { ENVS } from "./constant/envs";
import routes from "./routes";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { limiter } from "./middleware/rateLimitMiddleware";
import { configureSocket } from "./socket";
import { createServer } from "http";

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

const server = createServer(app);
const io = new Server(server);

mongoose
  .connect(ENVS.MONGODB_URL!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(ENVS.PORT, () => {
      configureSocket(io);
      console.log("Listening on port", ENVS.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

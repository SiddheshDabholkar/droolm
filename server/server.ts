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

const server = createServer(app);
const io = new Server(server);

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

mongoose
  .connect(ENVS.MONGODB_URL!)
  .then(() => {
    console.log("Connected to MongoDB");
    return server
      .listen({ port: ENVS.PORT })
      .addListener("listening", () => {
        configureSocket(io);
        console.log(`Server running at http://localhost:${ENVS.PORT}/`);
      })
      .addListener("error", (err) => {
        console.log("err", err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

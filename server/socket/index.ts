import { Server } from "socket.io";
import { matchChat } from "./matchChat";
import { socketAuthMiddleware } from "./socketAuthMiddleware";

export const configureSocket = (io: Server) => {
  io.use(socketAuthMiddleware);

  matchChat(io);
};

import { Server, Socket } from "socket.io";
import { User } from "../models/user";

const matchChat = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const userId = socket.user._id.toString();
    console.log(`Socket connected: ${socket.id}, User: ${userId}`);

    socket.on("setOnline", async () => {
      try {
        await User.findByIdAndUpdate(userId, { isOnline: true });
        console.log(`User ${userId} is now online`);
        socket.broadcast.emit("userOnline", { userId });
      } catch (error) {
        console.error("Error setting user online:", error);
      }
    });

    socket.on("disconnect", async () => {
      try {
        await User.findByIdAndUpdate(userId, { isOnline: false });
        console.log(`User ${userId} disconnected and is now offline`);
        socket.broadcast.emit("userOffline", { userId });
      } catch (error) {
        console.error("Error handling disconnect:", error);
      }
    });
  });
};

export { matchChat };

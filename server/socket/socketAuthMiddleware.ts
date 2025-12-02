import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { ENVS } from "../constant/envs";
import { User } from "../models/user";
import { UserType } from "../types/models";

declare module "socket.io" {
  interface Socket {
    user: UserType;
  }
}

type SocketNextFunction = (err?: Error) => void;

const socketAuthMiddleware = async (
  socket: Socket,
  next: SocketNextFunction
) => {
  try {
    const token = socket.handshake.headers?.token;
    if (!token) {
      return next(new Error("Authentication error: Token not provided"));
    }
    const decoded = jwt.verify(token, ENVS.JWT_SECRET) as { userId: string };
    if (!decoded?.userId) {
      return next(new Error("Authentication error: Invalid token"));
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }
    socket.user = user as UserType;
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    return next(new Error("Authentication error: Invalid token"));
  }
};

export { socketAuthMiddleware };

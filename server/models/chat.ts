import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";

const chatSchema = new Schema(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: Schemas.MATCH,
      required: true,
    },
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Chat = model(Schemas.CHAT, chatSchema);

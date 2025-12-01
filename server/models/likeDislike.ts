import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";

const likeDislikeSchema = new Schema(
  {
    byUserId: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
      required: true,
    },
    forUserId: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
      required: true,
    },
    isLike: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const LikeDislike = model(Schemas.OTP, likeDislikeSchema);

import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";

const otpSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
    },
    otp: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Otp = model(Schemas.OTP, otpSchema);

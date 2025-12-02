import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";
import { GENDERS } from "../constant/common";
import { UserType } from "../types/models";

const userSchema = new Schema<UserType>(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    gender: {
      type: String,
      enum: GENDERS,
    },
    profilePictureUrl: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    age: {
      type: Number,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    preferenceId: {
      type: Schema.Types.ObjectId,
      ref: Schemas.PREFERENCE,
    },
    dateOfBirth: {
      type: Date,
    },
    verifiedOtp: {
      type: Schema.Types.ObjectId,
      ref: Schemas.OTP,
    },
  },
  { timestamps: true }
);

export const User = model(Schemas.USER, userSchema);

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
      required: false,
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
    isOnline: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model(Schemas.USER, userSchema);

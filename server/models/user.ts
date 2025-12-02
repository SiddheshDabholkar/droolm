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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

// Create 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

export const User = model(Schemas.USER, userSchema);

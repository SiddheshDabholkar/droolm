import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";
import { GENDERS } from "../constant/common";

const preferenceSchema = new Schema(
  {
    ageAbove: {
      type: Number,
      default: 18,
    },
    ageBelow: {
      type: Number,
      default: 60,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
    },
    gender: {
      type: String,
      enum: GENDERS,
    },
    travelInterests: [
      {
        type: Schema.Types.ObjectId,
        ref: Schemas.TRAVEL_CATEGORY,
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

preferenceSchema.index({ location: "2dsphere" });

export const Preference = model(Schemas.PREFERENCE, preferenceSchema);

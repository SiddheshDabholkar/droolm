import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";

const matchSchema = new Schema(
  {
    userOne: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
      required: true,
    },
    userSecond: {
      type: Schema.Types.ObjectId,
      ref: Schemas.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Match = model(Schemas.MATCH, matchSchema);

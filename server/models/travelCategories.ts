import { Schema, model } from "mongoose";
import { Schemas } from "../constant/schemas";

const travelCategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TravelCategories = model(
  Schemas.TRAVEL_CATEGORY,
  travelCategoriesSchema
);

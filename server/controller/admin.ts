import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { TravelCategories } from "../models/travelCategories";
import { travelCategoryData } from "../constant/travelCategories";

const seedTravelCategories = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const createdData = await TravelCategories.insertMany(travelCategoryData);

  return res.status(200).json(
    formatRes({
      data: createdData,
      message: "Travel categories created",
      isError: false,
    })
  );
};

export { seedTravelCategories };

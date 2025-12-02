import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { Preference } from "../models/preference";

const updatePreference = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { ageAbove, ageBelow, gender, travelInterests } = req.body;
  const updatedPreference = await Preference.findOneAndUpdate(
    {
      preferenceId: userDetails.preferenceId,
      userId: userDetails._id,
    },
    {
      ageAbove,
      ageBelow,
      gender,
      travelInterests,
    },
    { new: true }
  );
  return res.status(200).json(
    formatRes({
      data: updatedPreference,
      isError: false,
      message: "Preference updated successfully",
    })
  );
};

export { updatePreference };

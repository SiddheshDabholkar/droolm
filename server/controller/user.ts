import { Request, Response } from "express";
import { UserType } from "../types/models";
import { formatRes } from "../utils/formatRes";
import { User } from "../models/user";

const getUser = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  return res.status(200).json(
    formatRes({
      data: userDetails,
      isError: false,
      message: "User details fetched successfully",
    })
  );
};

const updateUser = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const {
    fullName,
    gender,
    profilePictureUrl,
    phoneNumber,
    age,
    latitude,
    longitude,
  } = req.body;

  const updateData: Record<string, unknown> = {
    fullName,
    gender,
    profilePictureUrl,
    phoneNumber,
    age,
  };

  // Update location if both latitude and longitude are provided
  if (latitude !== undefined && longitude !== undefined) {
    updateData.location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    userDetails._id,
    updateData,
    {
      new: true,
    }
  );
  return res.status(200).json(
    formatRes({
      data: updatedUser,
      isError: false,
      message: "Updated the user successfully",
    })
  );
};

const deleteUser = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const deletedUser = await User.findByIdAndDelete(userDetails._id);
  return res.status(202).json(
    formatRes({
      data: deletedUser,
      isError: false,
      message: "Updated the user successfully",
    })
  );
};

export { getUser, updateUser, deleteUser };

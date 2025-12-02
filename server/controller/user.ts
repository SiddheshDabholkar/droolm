import { Request, Response } from "express";
import { UserType } from "../types/models";
import { formatRes } from "../utils/formatRes";
import { User } from "../models/user";
import { getSignedUrlToUpload } from "../utils/aws";
import { AWS } from "../constant/envs";

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
  const { fullName, gender, phoneNumber, age } = req.body;

  const updateData: Record<string, unknown> = {
    fullName,
    gender,
    phoneNumber,
    age,
  };

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

const generateUrlToUploadImage = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { name, mimeType } = req.body;

  const ext = name.split(".").pop();
  const key = `profile-images/${userDetails._id}.${ext}`;

  const { data, isError } = await getSignedUrlToUpload(key, mimeType);
  if (isError) {
    return res.status(500).json(
      formatRes({
        data: null,
        isError: true,
        message: "Something went wrong in generateUrlToUploadImage",
      })
    );
  }
  return res.status(200).json(
    formatRes({
      data: {
        url: data,
        key,
      },
      isError: false,
      message: "Signed url generated successfully",
    })
  );
};

const uploadProfileSuccess = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { key } = req.body;
  const profilePictureUrl = `https://${AWS.CLOUDFRONT}/${key}`;
  const updatedUser = await User.findByIdAndUpdate(
    userDetails._id,
    {
      profilePictureUrl,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(
    formatRes({
      data: updatedUser,
      isError: false,
      message: "Profile picture updated successfully",
    })
  );
};

export {
  getUser,
  updateUser,
  deleteUser,
  generateUrlToUploadImage,
  uploadProfileSuccess,
};

import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { Preference } from "../models/preference";
import { MAX_DISTANCE_KM, METERS_PER_KM } from "../constant/common";
import { LikeDislike } from "../models/likeDislike";

const updatePreference = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { ageAbove, ageBelow, gender, travelInterests, lat, lon } = req.body;
  let location = {
    type: "Point",
    coordinates: [parseFloat(lon), parseFloat(lat)],
  };
  const payload = {
    ageAbove: 0,
    ageBelow: 0,
    gender: null,
    location: null,
    travelInterests: [],
  };
  if (gender) {
    payload.gender = gender;
  }
  if (lon && lat) {
    payload.location = location as any;
  }
  if (travelInterests.length > 0) {
    payload.travelInterests = travelInterests;
  }
  if (ageBelow > 0) {
    payload.ageBelow = ageBelow;
  }
  if (ageAbove > 0) {
    payload.ageAbove = ageAbove;
  }

  const updatedPreference = await Preference.findByIdAndUpdate(
    userDetails.preferenceId,
    payload,
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

const getUserOnPreferences = async (
  req: Request<{ skip: string; limit: string }>,
  res: Response
) => {
  const userDetails = req.user as UserType;
  const { skip = 0, limit = 10 } = req.query;

  const userPreferences = await Preference.findById(userDetails.preferenceId);

  if (!userPreferences || !userDetails.preferenceId) {
    return res.status(400).json(
      formatRes({
        data: [],
        isError: true,
        message: "User details not found. Please update your preferences.",
      })
    );
  }

  const alreadyInteractedUsers = await LikeDislike.find({
    byUserId: userDetails._id,
  }).select("forUserId");

  const sanitize = (obj: Record<string, any>) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
    );

  const excludedUserIds = [
    userDetails._id,
    ...alreadyInteractedUsers.map((interaction) => interaction.forUserId),
  ];

  let matchPayload: any = {
    userId: { $nin: excludedUserIds },
  };

  if (userPreferences.gender) {
    matchPayload.gender = userPreferences.gender;
  }

  if (userPreferences.ageBelow) {
    matchPayload.ageAbove = { $lte: userPreferences.ageBelow };
  }

  if (userPreferences.ageAbove) {
    matchPayload.ageBelow = { $gte: userPreferences.ageAbove };
  }

  if (
    Array.isArray(userPreferences.travelInterests) &&
    userPreferences.travelInterests.length
  ) {
    matchPayload.travelInterests = { $in: userPreferences.travelInterests };
  }

  if (userPreferences?.location?.coordinates) {
    matchPayload.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userPreferences.location.coordinates,
        },
        $maxDistance: MAX_DISTANCE_KM * METERS_PER_KM,
      },
    };
  }

  matchPayload = sanitize(matchPayload);
  const preferences = await Preference.find(matchPayload)
    .populate("userId")
    .skip(skip ? +skip : 0)
    .limit(limit ? +limit : 10);

  return res.status(200).json(
    formatRes({
      data: preferences,
      isError: false,
      message: "Preferences fetched successfully",
    })
  );
};

export { updatePreference, getUserOnPreferences };

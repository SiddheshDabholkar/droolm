import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { Match } from "../models/match";
import { User } from "../models/user";
import { LikeDislike } from "../models/likeDislike";
import { Preference } from "../models/preference";
import { MAX_DISTANCE_KM, METERS_PER_KM } from "../constant/common";

const getMatchedUser = async (
  req: Request<{ skip: string; limit: string }>,
  res: Response
) => {
  const { skip = 0, limit = 10 } = req.query;
  const userDetails = req.user as UserType;
  const matchedUsers = await Match.find({
    $or: [{ userOne: userDetails._id }, { userSecond: userDetails._id }],
  })
    .skip(skip ? +skip : 0)
    .limit(limit ? +limit : 10);
  return res.status(200).json(
    formatRes({
      data: matchedUsers,
      isError: false,
      message: "Fetched the matched users successfully",
    })
  );
};

const findSuggestions = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10 } = req.query;
  const userDetails = req.user as UserType;
  const typedSkip = skip ? +skip : 0;
  const typedLimit = limit ? +limit : 10;

  if (!userDetails || !userDetails.preferenceId) {
    return res.status(400).json(
      formatRes({
        data: [],
        isError: true,
        message: "User details not found. Please update your preferences.",
      })
    );
  }

  if (!userDetails || !userDetails.location?.coordinates) {
    return res.status(400).json(
      formatRes({
        data: [],
        isError: true,
        message: "User location not set. Please update your location.",
      })
    );
  }

  const userPreferences = await Preference.findById(userDetails.preferenceId);
  const alreadyInteractedUsers = await LikeDislike.find({
    byUserId: userDetails._id,
  }).select("forUserId");

  const excludedUserIds = [
    userDetails._id,
    ...alreadyInteractedUsers.map((interaction) => interaction.forUserId),
  ];

  const matchQuery: Record<string, unknown> = {
    _id: { $nin: excludedUserIds },

    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userDetails.location.coordinates,
        },
        $maxDistance: MAX_DISTANCE_KM * METERS_PER_KM,
      },
    },
  };

  if (userPreferences) {
    if (userPreferences.gender) {
      matchQuery.gender = userPreferences.gender;
    }

    if (userPreferences.ageAbove || userPreferences.ageBelow) {
      matchQuery.age = {};
      if (userPreferences.ageAbove) {
        (matchQuery.age as Record<string, number>).$gte =
          userPreferences.ageAbove;
      }
      if (userPreferences.ageBelow) {
        (matchQuery.age as Record<string, number>).$lte =
          userPreferences.ageBelow;
      }
    }
  }

  const suggestedUsers = await User.find(matchQuery)
    .select("-token -googleId")
    .skip(typedSkip)
    .limit(typedLimit);

  return res.status(200).json(
    formatRes({
      data: suggestedUsers,
      isError: false,
      message: "Fetched suggestions successfully",
    })
  );
};

export { getMatchedUser, findSuggestions };

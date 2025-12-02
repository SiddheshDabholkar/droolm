import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { LikeDislike } from "../models/likeDislike";
import { Match } from "../models/match";

const handleLikeDislike = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { isLiked, userId } = req.body;
  const isLikedType = isLiked === "true";
  const createdEntry = await LikeDislike.create({
    forUserId: userId,
    isLiked: isLikedType,
    byUserId: userDetails._id,
  });
  if (isLikedType) {
    const hasUserLiked = await LikeDislike.findOne({
      forUserId: userDetails._id,
      byUserId: userId,
      isLiked: true,
    });
    if (hasUserLiked) {
      const matchCreation = await Match.create({
        userOne: userId,
        userTwo: userDetails._id,
      });
      return res.json(201).json(
        formatRes({
          data: matchCreation,
          message: "Match created successfully",
          isError: false,
        })
      );
    }
  }
  return res.json(201).json(
    formatRes({
      data: createdEntry,
      message: "Progress stored successfully",
      isError: false,
    })
  );
};

const getLikedDisLiked = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { isLike } = req.query;
  const isLikeType = isLike === "true";

  const likedDisliked = await LikeDislike.find({
    byUserId: userDetails._id,
    isLiked: isLikeType,
  }).populate("forUserId");

  return res.json(200).json(
    formatRes({
      data: likedDisliked,
      message: "Liked/Disliked users fetched successfully",
      isError: false,
    })
  );
};

export { handleLikeDislike, getLikedDisLiked };

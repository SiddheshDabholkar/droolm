import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { LikeDislike } from "../models/likeDislike";
import { Match } from "../models/match";
import { sendMatchNotification } from "../utils/firebaseNotification";

const handleLikeDislike = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { isLiked, userId } = req.body;

  const existingEntry = await LikeDislike.findOneAndUpdate(
    {
      forUserId: userId,
      byUserId: userDetails._id,
    },
    {
      forUserId: userId,
      isLike: isLiked,
      byUserId: userDetails._id,
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (isLiked) {
    const hasUserLiked = await LikeDislike.findOne({
      forUserId: userDetails._id,
      byUserId: userId,
      isLike: isLiked,
    });
    if (hasUserLiked) {
      const matchCreation = await Match.create({
        userOne: userId,
        userSecond: userDetails._id,
      });

      await sendMatchNotification({
        userOneId: userId,
        userTwoId: userDetails._id.toString(),
        matchId: matchCreation._id.toString(),
      });

      return res.status(201).send(
        formatRes({
          data: matchCreation,
          message: "Match created successfully",
          isError: false,
        })
      );
    }
  }
  return res.status(201).send(
    formatRes({
      data: existingEntry,
      message: "Progress stored successfully",
      isError: false,
    })
  );
};

const getLikedDisLiked = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { isLike } = req.query;

  const likedDisliked = await LikeDislike.find({
    byUserId: userDetails._id,
    isLike,
  }).populate("forUserId");

  return res.status(200).send(
    formatRes({
      data: likedDisliked,
      message: "Liked/Disliked users fetched successfully",
      isError: false,
    })
  );
};

export { handleLikeDislike, getLikedDisLiked };

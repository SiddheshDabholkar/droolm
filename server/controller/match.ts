import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { Match } from "../models/match";

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

export { getMatchedUser };

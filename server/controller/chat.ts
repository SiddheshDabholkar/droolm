import { Request, Response } from "express";
import { formatRes } from "../utils/formatRes";
import { UserType } from "../types/models";
import { Chat } from "../models/chat";

const deleteChat = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { id } = req.params;
  const chatDetails = await Chat.findOneAndDelete({
    _id: id,
    sender: userDetails._id,
  });
  return res.status(200).json(
    formatRes({
      data: chatDetails,
      isError: false,
      message: "Chat deleted successfully",
    })
  );
};

const getMatchChats = async (req: Request, res: Response) => {
  const userDetails = req.user as UserType;
  const { id, skip, limit } = req.params;

  const typedSkip = skip ? +skip : 0;
  const typedLimit = limit ? +limit : 10;

  const chats = await Chat.find({
    matchId: id,
    $or: [{ sender: userDetails._id }, { receiver: userDetails._id }],
  })
    .populate("sender")
    .populate("receiver")
    .skip(typedSkip)
    .limit(typedLimit);

  return res.status(200).json(
    formatRes({
      data: chats,
      isError: false,
      message: "Chats fetched successfully",
    })
  );
};

export { deleteChat, getMatchChats };

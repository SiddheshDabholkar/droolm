import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { formatRes } from "../utils/formatRes";
import { ENVS } from "../constant/envs";
import { User } from "../models/user";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(
      formatRes({
        message: "Authorization header is missing",
        isError: true,
        data: null,
      })
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(
      formatRes({
        message: "Invalid token",
        isError: true,
        data: null,
      })
    );
  }
  try {
    const user = jwt.verify(token, ENVS.JWT_SECRET);
    const userId = user?.userId;
    if (userId) {
      const userDetails = await User.findOne({ _id: userId });
      if (!userDetails) {
        return res.status(401).json(
          formatRes({
            message: "Invalid token",
            isError: true,
            data: null,
          })
        );
      }
      const excludeUrls = ["/generate-otp", "/verify-otp"];
      if (userDetails.isPhoneVerified) {
        req.user = userDetails;
        next();
      } else if (excludeUrls.includes(req.url)) {
        req.user = userDetails;
        next();
      } else {
        return res.status(401).json(
          formatRes({
            message: "Please verify your phone number",
            isError: true,
            data: null,
          })
        );
      }
    } else {
      return res.status(401).json(
        formatRes({
          message: "Invalid Expired or Invalid token",
          isError: true,
          data: null,
        })
      );
    }
  } catch (err) {
    console.log("Something went wrong in authMiddleware", err);
    return res.status(401).json(
      formatRes({
        message: "Invalid token",
        isError: true,
        data: null,
      })
    );
  }
};

export { authMiddleware };

import { ObjectId } from "mongoose";
import { Otp } from "../models/otp";
import { Preference } from "../models/preference";
import { formatRes } from "../utils/formatRes";
import { getUserDetails } from "../utils/google";
import { generateToken } from "../utils/token";
import { User } from "./../models/user";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  const { googleToken } = req.body;
  const { email: emailId, googleId } = await getUserDetails({
    token: String(googleToken),
  });
  const doesUserEists = await User.findOne({
    emailId,
    googleId,
  });
  if (!doesUserEists) {
    return res.status(400).send(
      formatRes({
        message: "User does'nt exists.Please try again.",
        data: null,
        isError: true,
      })
    );
  }
  const { token } = generateToken({
    userId: String(doesUserEists._id),
  });
  const updatedUser = await User.findOneAndUpdate(
    {
      emailId,
      googleId,
    },
    {
      token,
    },
    { new: true }
  );
  return res.status(200).send(
    formatRes({
      message: "User logged in successfully.",
      data: updatedUser,
      isError: false,
    })
  );
};

const register = async (req: Request, res: Response) => {
  const { googleToken } = req.body;
  const { email, googleId, fullName } = await getUserDetails({
    token: String(googleToken),
  });
  const doesUserEists = await User.findOne({
    emailId: email,
    googleId,
  });
  if (doesUserEists) {
    return res.status(400).send(
      formatRes({
        message: "User already exists.Please try to login",
        data: null,
        isError: true,
      })
    );
  }
  const createdUser = await User.create({
    emailId: email,
    googleId,
    fullName,
  });
  const { token } = generateToken({
    userId: String(createdUser._id),
  });
  const createdPreference = await Preference.create({
    userId: createdUser._id,
  });
  const updatedUser = await User.findOneAndUpdate(
    {
      emailId: email,
      googleId,
    },
    {
      token,
      preferenceId: createdPreference._id,
    },
    { new: true }
  );
  await handleGenerateOtp(createdUser._id);
  return res.status(201).send(
    formatRes({
      message: "User created successfully.Please verify your phone number",
      data: updatedUser,
      isError: false,
    })
  );
};

const handleGenerateOtp = async (userId: ObjectId) => {
  // const otp = Math.floor(100000 + Math.random() * 900000);
  const otp = 123456;
  const expiredAt = new Date(Date.now() + 5 * 60 * 1000);
  const createdOtp = await Otp.create({
    userId,
    otp,
    expiredAt,
    isUsed: false,
  });
  return createdOtp;
};

const generateOtp = async (req: Request, res: Response) => {
  const generatedData = await handleGenerateOtp(req.user._id);
  return res.status(200).send(
    formatRes({
      message: "OTP generated successfully.",
      data: generatedData,
      isError: false,
    })
  );
};

const verifyOtp = async (req: Request, res: Response) => {
  const { otp } = req.body;
  const { _id } = req.user;
  const isValidOtp = await Otp.findOneAndUpdate(
    {
      userId: _id,
      otp,
      isUsed: false,
      expiredAt: { $gte: new Date() },
    },
    {
      isUsed: true,
    }
  );
  if (!isValidOtp) {
    return res.status(400).send(
      formatRes({
        message: "Invalid OTP",
        data: null,
        isError: true,
      })
    );
  }
  const updatedUser = await User.findOneAndUpdate(
    {
      _id,
    },
    {
      isPhoneVerified: true,
      verifiedOtp: isValidOtp._id,
    },
    { new: true }
  );
  return res.status(200).send(
    formatRes({
      message: "Phone number verified successfully.",
      data: updatedUser,
      isError: false,
    })
  );
};

export { login, register, generateOtp, verifyOtp };

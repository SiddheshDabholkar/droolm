import { GENDERS } from "../constant/common";

type UserType = {
  emailId: string;
  googleId: string;
  fullName: string;
  token: string;
  gender: GENDERS;
  profilePictureUrl: string;
  phoneNumber: string;
  isOnline: boolean;
  isPhoneVerified: boolean;
};

export { UserType };

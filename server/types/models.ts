import { GENDERS } from "../constant/common";
import { MaybeArray, MaybeObjectId, TimeStampsAndId } from "./common";

type TravelCategoryType = {
  name: string;
  image: string;
  description: string;
} & TimeStampsAndId;

type LocationType = {
  type: "Point";
  coordinates: [number, number];
};

type OtpType = {
  userId: MaybeObjectId<UserType>;
  otp: string;
  isUsed: boolean;
  expiredAt: Date;
} & TimeStampsAndId;

type PreferenceType = {
  ageAbove: number;
  ageBelow: number;
  gender: GENDERS;
  location: LocationType;
  userId: MaybeObjectId<UserType>;
  travelInterests: MaybeArray<MaybeObjectId<TravelCategoryType>>;
} & TimeStampsAndId;

type UserType = {
  emailId: string;
  googleId: string;
  fullName: string;
  token: string;
  gender: GENDERS;
  profilePictureUrl: string;
  phoneNumber: string;
  age: number;
  isOnline: boolean;
  dateOfBirth: Date;
  isPhoneVerified: boolean;
  verifiedOtp: MaybeObjectId<OtpType>;
  preferenceId: MaybeObjectId<PreferenceType>;
} & TimeStampsAndId;

export { UserType, PreferenceType, LocationType, OtpType };

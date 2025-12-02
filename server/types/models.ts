import { GENDERS } from "../constant/common";
import { MaybeArray, MaybeObjectId, TimeStampsAndId } from "./common";

type TravelCategoryType = {
  name: string;
  image: string;
  description: string;
} & TimeStampsAndId;

type PreferenceType = {
  ageAbove: number;
  ageBelow: number;
  gender: GENDERS;
  userId: MaybeObjectId<UserType>;
  travelInterests: MaybeArray<MaybeObjectId<TravelCategoryType>>;
} & TimeStampsAndId;

type LocationType = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

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
  isPhoneVerified: boolean;
  preferenceId: MaybeObjectId<PreferenceType>;
  location: LocationType;
} & TimeStampsAndId;

export { UserType, PreferenceType, LocationType };

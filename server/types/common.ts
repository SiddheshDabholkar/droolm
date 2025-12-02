import { UserType } from "./models";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

type Maybe<T> = T | null | undefined;
type MaybeArray<T> = T | T[];
type MaybeObjectId<T> = Maybe<ObjectId | T>;

export type { Maybe, MaybeArray, MaybeObjectId };

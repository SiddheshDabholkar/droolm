import jwt from "jsonwebtoken";
import { ENVS } from "../constant/envs";

type generateTokenProps = {
  userId: String;
};
const generateToken = ({ userId }: generateTokenProps) => {
  const token = jwt.sign({ userId }, ENVS.JWT_SECRET, {
    expiresIn: "12d",
  });
  const expiresAt = new Date(Date.now() + 12 * 24 * 60 * 60 * 1000);
  return {
    token,
    expiresAt,
  };
};

export { generateToken };

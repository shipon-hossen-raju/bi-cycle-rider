import config from "../../config";
import { createToken } from "../auth/auth.utils";
import { User } from "./user.model";
import { TUser } from "./user.type";

const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: "2m" },
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: "30d" },
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userService = {
  createUserIntoDB,
};

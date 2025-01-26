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
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userService = {
  createUserIntoDB,
};

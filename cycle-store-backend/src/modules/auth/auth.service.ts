import config from "../../config";
import AppError from "../../errors/AppError";
import statusCode from "../../utils/status.code";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.type";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(statusCode.notFound, "User not found!");
  }

  const status = user.status;
  if (status === "blocked") {
    throw new AppError(statusCode.serviceUnavailable, "user already blocked");
  }

  if (status === "deleted") {
    throw new AppError(statusCode.serviceUnavailable, "user already deleted!");
  }

  const isPWM = await User.isPasswordMatched(payload.password, user.password);
  if (!isPWM)
    throw new AppError(statusCode.forbidden, "Password do not matched!");

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

export const authService = { loginUser };

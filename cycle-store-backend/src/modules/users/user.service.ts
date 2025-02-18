import QueryBuilder from "../../builder/QueryBuilder";
import config from "../../config";
import { createToken } from "../auth/auth.utils";
import { userSearchFields } from "./user.constant";
import { User } from "./user.model";
import { TUser } from "./user.type";

const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);

  const jwtPayload = {
    _id: user._id,
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

const getAllUsers = async (query: Record<string, unknown> = {}) => {
  const usersQuery = new QueryBuilder(User.find(), query)
    .search(userSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await usersQuery.modelQuery;
  const meta = await usersQuery.countTotal();

  return { result, meta };
};

const getSingleUser = async (id: string) => {
  return await User.findById(id);
};

export const userService = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
};

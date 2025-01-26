import { User } from "./user.model";
import { TUser } from "./user.type";

const createUserIntoDB = async (userData: TUser) => {
  return await User.create(userData);
};

export const userService = {
  createUserIntoDB,
};

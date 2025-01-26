import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
  status: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<boolean>;
}

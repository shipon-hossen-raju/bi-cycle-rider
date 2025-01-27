import config from "../config";
import { User } from "../modules/users/user.model";

const superUser = {
  name: config.super_name,
  email: config.super_email,
  password: config.super_password,
  role: config.super_role,
  address: config.super_address,
  phone: config.super_phone,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: config.super_role });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;

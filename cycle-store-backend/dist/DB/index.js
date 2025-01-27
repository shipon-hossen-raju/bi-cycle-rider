"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/users/user.model");
const superUser = {
    name: config_1.default.super_name,
    email: config_1.default.super_email,
    password: config_1.default.super_password,
    role: config_1.default.super_role,
    address: config_1.default.super_address,
    phone: config_1.default.super_phone,
};
const seedSuperAdmin = async () => {
    const isSuperAdminExits = await user_model_1.User.findOne({ role: config_1.default.super_role });
    if (!isSuperAdminExits) {
        await user_model_1.User.create(superUser);
    }
};
exports.default = seedSuperAdmin;

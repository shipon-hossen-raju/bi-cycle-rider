"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("../auth/auth.utils");
const user_model_1 = require("./user.model");
const createUserIntoDB = async (userData) => {
    const user = await user_model_1.User.create(userData);
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: "2m" });
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: "30d" });
    return {
        accessToken,
        refreshToken,
    };
};
exports.userService = {
    createUserIntoDB,
};

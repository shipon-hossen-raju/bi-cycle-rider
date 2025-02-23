"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const user_model_1 = require("../users/user.model");
const auth_utils_1 = require("./auth.utils");
const loginUser = async (payload) => {
    const user = await user_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(status_code_1.default.notFound, "User not found!");
    }
    const status = user.status;
    if (status === "blocked") {
        throw new AppError_1.default(status_code_1.default.serviceUnavailable, "user already blocked");
    }
    if (status === "deleted") {
        throw new AppError_1.default(status_code_1.default.serviceUnavailable, "user already deleted!");
    }
    const isPWM = await user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPWM)
        throw new AppError_1.default(status_code_1.default.forbidden, "Password do not matched!");
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, 
    // config.jwt_access_expires_in as string,
    { expiresIn: "2m" });
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, 
    // config.jwt_refresh_expires_in as string,
    { expiresIn: "30d" });
    return {
        accessToken,
        refreshToken,
    };
};
exports.authService = { loginUser };
